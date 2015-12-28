/**
 * @license 
 * Copyright (c) 2015, Immo Schulz-Gerlach, www.isg-software.de 
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are 
 * permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT 
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, 
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED 
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; 
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN 
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY
 * WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/*
 * Usage:
 * Register Event Handler for Scroll-Up- and Scroll-Down-Event on windows (or other object):
 * $(window).advScroll({ options });
 * options may include:
 *	onUp(event, diff, scrollTop): function (default: function(){})
 *			 Event handler called when user has scrolled up for at least "upBy" pixels.
 *			"event" is the original scroll event, "diff" is the amount of pixels scrolled up since last scrolling down, 
 *			"scrollTop" is the element's new absolute scrollTop value.
 *			"this" is bound to the sender object, e.g. window.
 *	upBy: int (default: 20)
 *			Amount of pixels to at least scroll up since last scrolling down before the onUp-Event is fired.
 *	onDown(event, diff): function (default: function(){})
 *			Event handler called when user has scrolled down for at least "downBy" pixels, see onUp.
 *	downBy: int (default: 20)
 *			Amound of pixels to at least scroll down since loading doc or scrolling up before the onDown-Event is fired.
 *	oncePerDirection: boolean (default: false)
 *			If false, the events onUp resp. onDown fire continuously once the upBy resp. downBy threshold has been crossed.
 *			If true, each event is fired at most once per changing the direction.
 * If you want to configure the "oncePerDirection" setting differently for the scrolling directions, you may use the
 * following options:
 *	oncePerUp: boolean (default: undefined) 
 *			If defined, this setting overrides the "oncePerDirection" setting for scrolling upwards.
 *	oncePerDown: boolean (default: undefined) 
 *			If defined, this setting overrides the "oncePerDirection" setting for scrolling downwards. 
 */

(function( $ ) {
	"use strict";
 
	$.fn.advScroll = function( options ) {
	
		var settings = $.extend({}, $.fn.advScroll.defaults, options);
		
		var lastTop = 0;
		var lastUp = true;
		var lastDirChangePos = 0;
		var calledHandlerSinceDirChange = false;
		var lastScrollTimestamp = 0;
		
		var getDelay = function(up) {
			if (up) {
				return typeof settings.downUpDelayMillis === "number" ? settings.downUpDelayMillis : settings.directionChangeDelayMillis;
			} else {
				return typeof settings.upDownDelayMillis === "number" ? settings.upDownDelayMillis : settings.directionChangeDelayMillis;
			}
		};
 
		this.scroll(function(evt) {
			var _lastTop = lastTop;
			var nowTop = settings.horizontal ? $(this).scrollLeft() : $(this).scrollTop();
			lastTop = nowTop;

			var realUp = nowTop < _lastTop;
			var nowTS = Date.now();
			var isMinDirChangeDelay = nowTS - lastScrollTimestamp > getDelay(realUp);
			lastScrollTimestamp = nowTS;
			
			var up = isMinDirChangeDelay ? realUp : lastUp;
			var dirchanged = isMinDirChangeDelay && up !== lastUp;
			if (dirchanged) {
				lastUp = up;
				lastDirChangePos = _lastTop;
				calledHandlerSinceDirChange = false;
			} else {
				var onlyOnce = settings.oncePerDirection;
				//Override der allgemeinen Regel für spezifische Richtung definiert?
				if (up && typeof settings.oncePerUp === "boolean") {
					onlyOnce = settings.oncePerUp;
				}
				if (!up && typeof settings.oncePerDown === "boolean") {
					onlyOnce = settings.oncePerDown;					
				}
				var called = false;
				var diff = Math.abs(nowTop - lastDirChangePos);
				if (!onlyOnce || !calledHandlerSinceDirChange) {
					if (diff > (up ? settings.upBy : settings.downBy)) {
						calledHandlerSinceDirChange = true;
						if (up) {
							settings.onUp.call(this, evt, diff, nowTop);
						} else {
							settings.onDown.call(this, evt, diff, nowTop);
						}
						called = true;
					}
				}
				if (!called) {
					var handler = null;
					if (up && nowTop === 0 && settings.onTop) {
						handler = typeof settings.onTop === "function" ? settings.onTop : settings.onUp;
					} else {
						//try to find the right document.
						var d = $(document, this);
						if (d) {
							var bott = settings.horizontal ? d.width() - $(this).width() : d.height () - $(this).height();
							if (d && !up && settings.onBottom && nowTop >= bott) {
								handler = typeof settings.onBottom === "function" ? settings.onBottom : settings.onDown;
							}
						}
					}
					if (typeof handler === "function") {
						handler.call(this, evt, diff, nowTop);
					}
				}
			}
		});
		
		return this;
	};
	
	$.fn.advScroll.defaults = {
		//Defaults
		upBy: 20,
		onUp: function() {},
		onTop: false, //TODO: function oder truthy für Aufruf von onUp.
		downBy: 20,
		onDown: function() {},
		onBottom: function() {}, //TODO: dito
		oncePerDirection: false,
		horizontal: false, //TODO test/doc, ggf. rename von up/down zu backwards/forwards
		directionChangeDelayMillis: 50 //TODO documentation
	};
 
}( jQuery )); 

//TODO: Kleinere Ungenauigkeiten wie minimales Scrollen in "falsche" Richtung haben derzeit ein Problem:
//Will ich z.B: hochscrollen und scrolle aber beim Anfassen des Touchscreens zunächst wenige Pixel nach unten, wird
//ggf. die Scrollrichtung "down" erkannt und durch Ausbleiben einer Pause beibehalten, also "negativ nach down" gescrollt
//und kein onUp-Event ausgelöst.
//Da sollte noch ein Threshold für DirChange-Erkennung eingebaut werden.
//Entweder DirChange nicht sofort auslösen, sondern erst ab einer Mindestscrolldistanz (Threshold), oder zwar sofort
//ein DirChange-Event auslösen, jedoch bei zum Überschreiten des Thresholds in die Richtung die Delays deaktivieren?