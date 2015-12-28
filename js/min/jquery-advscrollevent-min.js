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
!function($){"use strict";$.fn.advScroll=function(o){var n=$.extend({},$.fn.advScroll.defaults,o),t=0,i=!0,e=0,l=!1,r=0,a=function(o){return o?"number"==typeof n.downUpDelayMillis?n.downUpDelayMillis:n.directionChangeDelayMillis:"number"==typeof n.upDownDelayMillis?n.upDownDelayMillis:n.directionChangeDelayMillis};return this.scroll(function(o){var c=t,f=n.horizontal?$(this).scrollLeft():$(this).scrollTop();t=f;var s=c>f,u=Date.now(),h=u-r>a(s);r=u;var p=h?s:i,y=h&&p!==i;if(y)i=p,e=c,l=!1;else{var D=n.oncePerDirection;p&&"boolean"==typeof n.oncePerUp&&(D=n.oncePerUp),p||"boolean"!=typeof n.oncePerDown||(D=n.oncePerDown);var d=!1,w=Math.abs(f-e);if(D&&l||w>(p?n.upBy:n.downBy)&&(l=!0,p?n.onUp.call(this,o,w,f):n.onDown.call(this,o,w,f),d=!0),!d){var v=null;if(p&&0===f&&n.onTop)v="function"==typeof n.onTop?n.onTop:n.onUp;else{var B=$(document,this);if(B){var M=n.horizontal?B.width()-$(this).width():B.height()-$(this).height();B&&!p&&n.onBottom&&f>=M&&(v="function"==typeof n.onBottom?n.onBottom:n.onDown)}}"function"==typeof v&&v.call(this,o,w,f)}}}),this},$.fn.advScroll.defaults={upBy:20,onUp:function(){},onTop:!1,downBy:20,onDown:function(){},onBottom:function(){},oncePerDirection:!1,horizontal:!1,directionChangeDelayMillis:50}}(jQuery);