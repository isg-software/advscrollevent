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
!function($){"use strict";$.fn.advScroll=function(o){var n=$.extend({},$.fn.advScroll.defaults,o),e=0,t=!0,l=0,i=!0,r=0,a=!1,c=!1,s=!1,h=0,f=function(o){return o?"number"==typeof n.downUpDelayMillis?n.downUpDelayMillis:n.directionChangeDelayMillis:"number"==typeof n.upDownDelayMillis?n.upDownDelayMillis:n.directionChangeDelayMillis},u,p=function(o,n,e,l,i,r){var h=null;if(o&&0>=n&&l.onTop)h="function"==typeof l.onTop?l.onTop:l.onUp,t=!0;else if(!o&&l.onBottom&&l.scrollableContent){var f="string"==typeof l.scrollableContent?$(l.scrollableContent,u):l.scrollableContent;if(f.length){var p=l.horizontal?f.width()-u.width():f.height()-u.height();n>=p&&(h="function"==typeof l.onBottom?l.onBottom:l.onDown,t=!1)}}return"function"==typeof h?((!i||o&&!c||!o&&!s)&&h.call(this,r,e,n),a=!1,c=t,s=!t,!0):(c=s=!1,!1)},d=function(o,e){return n.directionChangeThreshold<=0?!1:o&&e<r-n.directionChangeThreshold||!o&&e>r+n.directionChangeThreshold};return this.scroll(function(o){u=$(this);var c=e,s=n.horizontal?$(this).scrollLeft():$(this).scrollTop();e=s;var y=c>s,D=Date.now(),w=D-h>f(y);h=D;var v=y!==i;v&&(i=y,r=c);var C=Math.abs(s-l),g=y&&(l>s||d(!0,s)),b=!y&&(s>l||d(!1,s)),T=w?y:g?!0:b?!1:t,B=T!==t;if(B)t=T,l=c,a=!1;else{var M=n.oncePerDirection;T&&"boolean"==typeof n.oncePerUp&&(M=n.oncePerUp),T||"boolean"!=typeof n.oncePerDown||(M=n.oncePerDown),p(T,s,C,n,M,o)||M&&a||C>(T?n.upBy:n.downBy)&&(a=!0,T?"function"==typeof n.onUp&&n.onUp.call(this,o,C,s):"function"==typeof n.onDown&&n.onDown.call(this,o,C,s))}}),this},$.fn.advScroll.defaults={upBy:20,onUp:null,onTop:!1,downBy:20,onDown:null,onBottom:!1,oncePerDirection:!1,horizontal:!1,directionChangeDelayMillis:50,directionChangeThreshold:500,scrollableContent:$(document)}}(jQuery);