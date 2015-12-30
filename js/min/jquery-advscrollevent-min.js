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
!function($){"use strict";$.fn.advScroll=function(o){var n=$.extend({},$.fn.advScroll.defaults,o),t=0,e=!0,l=0,i=!1,r=0,a=function(o){return o?"number"==typeof n.downUpDelayMillis?n.downUpDelayMillis:n.directionChangeDelayMillis:"number"==typeof n.upDownDelayMillis?n.upDownDelayMillis:n.directionChangeDelayMillis},c,f=function(o,n,t,e,l){var i=null;if(o&&0===n&&e.onTop)i="function"==typeof e.onTop?e.onTop:e.onUp;else if(!o&&e.onBottom&&e.scrollableContent){var r="string"==typeof e.scrollableContent?$(e.scrollableContent,c):e.scrollableContent;if(r.length){var a=e.horizontal?r.width()-c.width():r.height()-c.height();n>=a&&(i="function"==typeof e.onBottom?e.onBottom:e.onDown)}}return"function"==typeof i?(i.call(this,l,t,n),!0):!1};return this.scroll(function(o){c=$(this);var s=t,p=n.horizontal?$(this).scrollLeft():$(this).scrollTop();t=p;var u=s>p,h=Date.now(),y=h-r>a(u);r=h;var D=Math.abs(p-l),d=u&&l>p,w=!u&&p>l,v=y?u:d?!0:w?!1:e,b=y&&v!==e;if(b)e=v,l=s,i=!1;else if(!f(v,p,D,n,o)){var B=n.oncePerDirection;v&&"boolean"==typeof n.oncePerUp&&(B=n.oncePerUp),v||"boolean"!=typeof n.oncePerDown||(B=n.oncePerDown),B&&i||D>(v?n.upBy:n.downBy)&&(i=!0,v?"function"==typeof n.onUp&&n.onUp.call(this,o,D,p):"function"==typeof n.onDown&&n.onDown.call(this,o,D,p))}}),this},$.fn.advScroll.defaults={upBy:20,onUp:null,onTop:!1,downBy:20,onDown:null,onBottom:!1,oncePerDirection:!1,horizontal:!1,directionChangeDelayMillis:50,scrollableContent:$(document)}}(jQuery);