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
!function($){"use strict";$.fn.advScroll=function(o){var n=$.extend({},$.fn.advScroll.defaults,o),t=0,i=!0,e=0,l=!1,r=0,a=function(o){return o?"number"==typeof n.downUpDelayMillis?n.downUpDelayMillis:n.directionChangeDelayMillis:"number"==typeof n.upDownDelayMillis?n.upDownDelayMillis:n.directionChangeDelayMillis};return this.scroll(function(o){var c=t,f=n.horizontal?$(this).scrollLeft():$(this).scrollTop();t=f;var s=c>f,u=Date.now(),h=u-r>a(s);r=u;var p=Math.abs(f-e),y=s&&e>f,D=!s&&f>e,d=h?s:y?!0:D?!1:i,w=h&&d!==i;if(w)i=d,e=c,l=!1;else{var v=n.oncePerDirection;d&&"boolean"==typeof n.oncePerUp&&(v=n.oncePerUp),d||"boolean"!=typeof n.oncePerDown||(v=n.oncePerDown);var B=!1;if(v&&l||p>(d?n.upBy:n.downBy)&&(l=!0,d?n.onUp.call(this,o,p,f):n.onDown.call(this,o,p,f),B=!0),!B){var M=null;if(d&&0===f&&n.onTop)M="function"==typeof n.onTop?n.onTop:n.onUp;else{var m=$(document,this);if(m){var U=n.horizontal?m.width()-$(this).width():m.height()-$(this).height();m&&!d&&n.onBottom&&f>=U&&(M="function"==typeof n.onBottom?n.onBottom:n.onDown)}}"function"==typeof M&&M.call(this,o,p,f)}}}),this},$.fn.advScroll.defaults={upBy:20,onUp:function(){},onTop:!1,downBy:20,onDown:function(){},onBottom:function(){},oncePerDirection:!1,horizontal:!1,directionChangeDelayMillis:50}}(jQuery);