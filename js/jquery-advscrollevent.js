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
 *	onUp(event, diff, scrollTop): function (default: null)
 *			Event handler function called when user has scrolled up for at least "upBy" pixels.
 *			"event" is the original scroll event, 
 *			"diff" is the amount of pixels scrolled up since last scrolling down, 
 *			"scrollTop" is the element's new absolute scrollTop value.
 *			"this" is bound to the sender object, e.g. window.
 *	upBy: int (default: 20)
 *			Amount of pixels to at least scroll up since last scrolling down before the onUp-Event is fired.
 *	onTop: boolean or function (default: false)
 *			If true, the onUp-function gets called upon reaching the top of the page.
 *			If a function, this very function gets called upon reaching the top of the page. 
 *			(The function's arguments are the same as those of onUp.)
 *	onDown(event, diff, scrollTop): function (default: null)
 *			Event handler called when user has scrolled down for at least "downBy" pixels, see onUp.
 *	downBy: int (default: 20)
 *			Amound of pixels to at least scroll down since loading doc or scrolling up before the onDown-Event is fired.
 *	onBottom: boolean or function (default: false)
 *			See "onTop", just referring to the bottom of the page. If "true", the onDown handler is re-used.
 *			Important: The onBottom event needs to find the element containing the scrollable content in order
 *			to calculate its height (or width in horizontal mode). If the jQuery plug-in is not applied to
 *			$(window), but to some other scrollable content like a DIV with CSS "overflow:scroll", the content
 *			of that container has to be specified in the "scrollableContent" property in order for
 *			the onBottom event to work properly!
 *	scrollableContent: jQuery resultset or (selector-)string (default: $(document))
 *			Currently only needed if the "onBottom" event is used.
 *			If the plug-in function is called on $(window), the default $(document) is correct, but if you
 *			call the plug-in e.g. on some DIV elements with CSS "overflow: scroll" or "overflow: auto",
 *			the content of those DIVs have to be wrapped in another element which is then to be selected
 *			as scrollableContent. If this is exactly one element, you may "preselect" it and assign the jQuery
 *			resultset to this property (as is the default $(document)). Otherwise you may simply assign a
 *			jQuery selector string which will then be executed locally inside the container element.
 *	oncePerDirection: boolean (default: false)
 *			If false, the events onUp resp. onDown fire continuously once the upBy resp. downBy threshold has been crossed.
 *			If true, each event is fired at most once per changing the direction.
 *	directionChangeDelayMillis: number (default: 50)
 *			If zero (0), any change of scroll direction will immediately trigger a "direction change", meaning
 *			the corresponding "onUp" or "onDown" event will fire after scrolling "upBy" resp. "downBy" pixels into
 *			the new direction.
 *			If greater than zero, this defines a delay in milli seconds which the page needs to stand still befor
 *			a direction change. Example: You are scrolling downwards, suddenly you scroll upwards for a bit without
 *			waiting for at least directionChangeDelayMillis milli seconds: This will not trigger a onUp-event,
 *			in continuous mode (oncePerDirection==false) it will still trigger the onDown event even though you're scrolling
 *			up, as this is still regarded as part of the same scrolling movement, a small irregularity, so to speek.
 *			However, if you keep scrolling up further and reach the point again, where you started to scroll down, this
 *			is no longer regarded as irregularity, but as an intended direction change despite the page not having
 *			stood still for this delay.
 *	horizontal: boolean (default: false)
 *			If set to true, the plugin works for horizontal instead of vertical scrolling.
 *			All properties keep their names, "onUp" refers to scrolling to the left, "onDown" to
 *			scrolling to the right etc.
 *
 * If you want to configure the "oncePerDirection" or "directionChangeDelayMillis" settings differently 
 * for the scrolling directions, you may use the following options:
 *	oncePerUp: boolean (default: undefined) 
 *			If defined, this setting overrides the "oncePerDirection" setting for scrolling upwards.
 *	oncePerDown: boolean (default: undefined) 
 *			If defined, this setting overrides the "oncePerDirection" setting for scrolling downwards. 
 *	downUpDelayMillis: number (default: undefined)
 *			If defined, this setting overrides the "directionChangeDelayMillis" setting for 
 *			the transition from scrolling downwards to scrolling upwards.
 *	upDownDelayMillis: number (default: undefined)
 *			If defined, this setting overrides the "directionChangeDelayMillis" setting for 
 *			the transition from scrolling upwards to scrolling downwards.
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
		
		var me;
		
		var handleTopOrBottom = function(up, nowTop, diff, settings, evt) {
			var handler = null;
			if (up && nowTop === 0 && settings.onTop) {
				handler = typeof settings.onTop === "function" ? settings.onTop : settings.onUp;
			} else if (!up && settings.onBottom && settings.scrollableContent) {
				var sc = typeof settings.scrollableContent === "string" ? 
					  $(settings.scrollableContent, me) 
					: settings.scrollableContent;
				if (sc.length) {
					var bott = settings.horizontal ?
							  sc.width()  - me.width() 
							: sc.height() - me.height();
					if (nowTop >= bott) {
						handler = typeof settings.onBottom === "function" ? settings.onBottom : settings.onDown;
					}
				}
			}
			if (typeof handler === "function") {
				handler.call(this, evt, diff, nowTop);
				return true;
			} else {
				return false;
			}
		};
 
		this.scroll(function(evt) {
			me = $(this);
			var _lastTop = lastTop;
			var nowTop = settings.horizontal ? $(this).scrollLeft() : $(this).scrollTop();
			lastTop = nowTop;

			var realUp = nowTop < _lastTop;
			var nowTS = Date.now();
			var isMinDirChangeDelay = nowTS - lastScrollTimestamp > getDelay(realUp);
			lastScrollTimestamp = nowTS;
			
			var diff = Math.abs(nowTop - lastDirChangePos);
			var forceUp = realUp && nowTop < lastDirChangePos;
			var forceDown = !realUp && nowTop > lastDirChangePos;
			
			var up = isMinDirChangeDelay ? realUp : forceUp ? true : forceDown ? false : lastUp;
			var dirchanged = isMinDirChangeDelay && up !== lastUp;
			if (dirchanged) {
				lastUp = up;
				lastDirChangePos = _lastTop;
				calledHandlerSinceDirChange = false;
			} else if (!handleTopOrBottom(up, nowTop, diff, settings, evt)) {
				var onlyOnce = settings.oncePerDirection;
				//Override der allgemeinen Regel für spezifische Richtung definiert?
				if (up && typeof settings.oncePerUp === "boolean") {
					onlyOnce = settings.oncePerUp;
				}
				if (!up && typeof settings.oncePerDown === "boolean") {
					onlyOnce = settings.oncePerDown;					
				}
				if (!onlyOnce || !calledHandlerSinceDirChange) {
					if (diff > (up ? settings.upBy : settings.downBy)) {
						calledHandlerSinceDirChange = true;
						if (up) {
							if (typeof settings.onUp === "function") {
								settings.onUp.call(this, evt, diff, nowTop);
							}
						} else {
							if (typeof settings.onDown === "function") {
								settings.onDown.call(this, evt, diff, nowTop);
							}
						}
					}
				}
			}
		});
		
		return this;
	};
	
	$.fn.advScroll.defaults = {
		//Defaults
		upBy: 20,
		onUp: null,
		onTop: false,
		downBy: 20,
		onDown: null,
		onBottom: false,
		oncePerDirection: false,
		horizontal: false, //TODO test/doc
		directionChangeDelayMillis: 50,
		scrollableContent: $(document) //TODO documentation
	};
 
}( jQuery )); 