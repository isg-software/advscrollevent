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
!function($){"use strict";$.fn.advScroll=function(o){var n=$.extend({},$.fn.advScroll.defaults,o),t=0,e=!0,l=0,i=!1,r=!1,a=!1,c=0,s=function(o){return o?"number"==typeof n.downUpDelayMillis?n.downUpDelayMillis:n.directionChangeDelayMillis:"number"==typeof n.upDownDelayMillis?n.upDownDelayMillis:n.directionChangeDelayMillis},f,p=function(o,n,t,l,c,s){var p=null;if(o&&0>=n&&l.onTop)p="function"==typeof l.onTop?l.onTop:l.onUp,e=!0;else if(!o&&l.onBottom&&l.scrollableContent){var u="string"==typeof l.scrollableContent?$(l.scrollableContent,f):l.scrollableContent;if(u.length){var h=l.horizontal?u.width()-f.width():u.height()-f.height();n>=h&&(p="function"==typeof l.onBottom?l.onBottom:l.onDown,e=!1)}}return"function"==typeof p?((!c||o&&!r||!o&&!a)&&p.call(this,s,t,n),i=!1,r=e,a=!e,!0):(r=a=!1,!1)};return this.scroll(function(o){f=$(this);var r=t,a=n.horizontal?$(this).scrollLeft():$(this).scrollTop();t=a;var u=r>a,h=Date.now(),y=h-c>s(u);c=h;var D=Math.abs(a-l),d=u&&l>a,w=!u&&a>l,v=y?u:d?!0:w?!1:e,b=y&&v!==e;if(b)e=v,l=r,i=!1;else{var B=n.oncePerDirection;v&&"boolean"==typeof n.oncePerUp&&(B=n.oncePerUp),v||"boolean"!=typeof n.oncePerDown||(B=n.oncePerDown),p(v,a,D,n,B,o)||B&&i||D>(v?n.upBy:n.downBy)&&(i=!0,v?"function"==typeof n.onUp&&n.onUp.call(this,o,D,a):"function"==typeof n.onDown&&n.onDown.call(this,o,D,a))}}),this},$.fn.advScroll.defaults={upBy:20,onUp:null,onTop:!1,downBy:20,onDown:null,onBottom:!1,oncePerDirection:!1,horizontal:!1,directionChangeDelayMillis:50,scrollableContent:$(document)}}(jQuery);