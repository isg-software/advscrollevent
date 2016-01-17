# advscrollevent

jQuery plug-in providing advanced scroll events. These might, for example, trigger an event, whenever a window or frame content has been scrolled up or down by at least a certain amount of pixels, optionally only after a change of the scroll direction.

[Project home page][projectHome]

## What is this?

This software module contains a [jQuery][jQuery] plug-in building on jQuery's native `scroll` event: By applying jQuery's [.scroll()][jQuery.scroll] method to selected scrollable content (typically, but not limited to, `$(window)`), you may register an event handler wich gets called whenever the content is scrolled. With jQuery's methods [scrollTop][jQuery.scrollTop] resp. [scrollLeft][jQuery.scrollLeft] the event handler may then determine the acutal position of the viewport.

For many purposes, those native functions are ‘a bit low-level’, and this plug-in builds upon them in order to define ‘higher-level’ events such as: User has scrolled upwards for at least 20px for the first time after scrolling downwards. The plug-in provides a couple of options (like the 20px threshold in the previous example) which, among others, help prevent accidentally triggering events only due un impreciseness (such as minimal scrolling movements caused by a user just laying his finger onto a touch screen with a little, unintended movement).

## Examples

This project contains one demo page named `demo.html`, which contains some demonstrations. As one possible use-case, it shows how tool bars or panels may be hidden (e.g. on a mobile site layout) when the user scrolls down, probably reading the text of the page, whereas the panels are shown again, whenever the user scrolls upwards or reaches the bottom of the page, assuming that in both cases he doesn't read the main content any more and should be provided with more means of interaction.

Open the demo page in a browser to try out the example configuration, see the html source (including embedded javascript) to see how the configuration was done.

Feel encouraged to make copies of the demo file play around with the options to see what happens.

## JavaScripts

* `js/jquery-advscrollevent.js` is the original, uncompressed script file. It also contains comments to document its usage.
* `js/min/jquery-advscrollevent-min.js` is a minified (compressed) version of the previous script for production use.

## Usage

### Basics

* Include jQuery (tested with jQuery 2.1.14, but should work with newer versions, too, as well as with current jQuery 1 versions) and one of the two script files of this package into the head of your HTML file. (For production on a web server, the minified version is recommended, while the source version might be better for development, since it's easier to debug and contains a short usage reference.)
* Write and include some script code that gets executed after rendering the HTML (generating the DOM). This code is to select a scrollable element and apply the plug-in function `advScroll()` to the jQuery resultset in order to register one or more event handlers. Usually, the scrollable element is the whole web page, selected by `$(window)`, but you may select any scrollable node where the original [scroll()][jQuery.scroll] function is applicable.
* The `advScroll` function takes one object as an argument, which should at least contain one event handler function for at least one of the advanced events this plug-in provides. Example:
	    
	    <script type="text/javascript">
	        $(function() {
	            $(window).advScroll({
	                onUp: function(evt, px, top) {...},
	                onDown: function(evt, px, top) {...}
	                oncePerDirection: true
	            });
	        });
	    </script>

* For each selected element (a jQuery resultset can contains more than one) the plug-in registers a [scroll][jQuery.scroll] event handler which guards any scroll movement in order to trigger its own event(s) whenever the conditions are met.

### Options

As already established above, the `advScroll()` function takes exactly one argument, which has to be a JavaScript object defining options via its properties. The following option properties are defined:

#### Options for event handler function

* `onUp(event, diff, scrollTop)`: function (default: `null`)    
	Event handler function called when user has scrolled up for at least `upBy` pixels (see option `upBy` in the next section). (In _horizontal mode_—see `horizontal`—this event is triggered upon scrolling to the left instead of upwards.)    
	Arguments:
	* `event` is the original scroll event,
	* `diff` is the amount of pixels scrolled up since last scrolling down, 
	* `scrollTop` is the element's new absolute scrollTop value.
	* `this` is bound to the sender object, e.g. `window`.
* `onDown(event, diff, scrollTop)`: function (default: `null`)   
	Event handler function called when user has scrolled down (or to the right in _horizontal mode_) for at least `downBy` pixels, see `onUp`.
* `onTop`: boolean or function (default: `false`)   
	If `true`, the `onUp`-function gets called upon reaching the top (resp. left end) of the page.   
	If a `function`, this very function gets called upon reaching the top of the page. (The function's arguments are the same as those of `onUp`.)
* `onBottom`: boolean or function (default: `false`)   
	See `onTop`, just referring to the bottom (resp. right end) of the page. If `true`, the `onDown` handler is re-used, if a function is assigned, that will be used as event handler.   
	**Important**: The `onBottom` event needs to find the element containing the scrollable content in order to calculate its height (or width in horizontal mode). If the jQuery plug-in is _not_ applied to `$(window)`, but to some other scrollable content like a DIV with CSS `overflow:scroll`, the content of that container has to be specified in the `scrollableContent` property in order for the `onBottom` event to work properly!   
	**Note:** This event is not guaranteed to work precisely in every browser, at least not in the current state of the plug-in!

#### Other options

* `upBy`: number (default: 20)   
	Amount of pixels to at least scroll up since last scrolling down before the `onUp`-Event is fired.
* `downBy`: number (default: 20)   
	Amound of pixels to at least scroll down since loading doc or scrolling up before the `onDown`-Event is fired.
* `scrollableContent`: jQuery resultset or (selector-)string (default: `$(document)`)   
	Currently only needed if the `onBottom` event is used and ony when applied to something other than `$(window)`.   
	If the plug-in function is called on `$(window)`, the default (`$(document)`) is correct, but if you call the plug-in e.g. on some DIV elements with CSS `overflow: scroll` or `overflow: auto`, the content of those DIVs have to be wrapped in another element which is then to be selected as `scrollableContent`. If this is exactly one element, you may "preselect" it and assign the jQuery resultset to this property (as is the default `$(document)`). Otherwise you may simply assign a jQuery selector _string_ which will then be executed locally inside the container element. See demo.
* `oncePerDirection`: boolean (default: false)   
	If `false`, the events `onUp` resp. `onDown` fire continuously once the `upBy` resp. `downBy` threshold has been crossed.   
	If true, an `onUp` or `onDown` event is fired at most once until changing the direction.
* `directionChangeDelayMillis`: number (default: 50)   
	If zero (0), any change of scroll direction will immediately be treated as a “direction change”, meaning the corresponding `onUp` or `onDown` event will fire after scrolling `upBy` resp. `downBy` pixels into	the new direction.   
	If greater than zero, this defines a delay in milli seconds which the page needs to stand still before a direction change.   
	Example: You are scrolling downwards, then suddenly you scroll upwards for a bit without waiting for at least `directionChangeDelayMillis` milli seconds: This will not trigger a `onUp`-event,	in _‘continuous mode’_ (i.e. `oncePerDirection==false`) it will still trigger the `onDown` event even though you're scrolling upwards, as this is still regarded as part of the same scrolling movement, a small irregularity, so to speek.
	However, if you keep scrolling up further and reach the point again, where you started to scroll down or you scroll up for at least `directionChangeThreshold` pixels (see below), this upwards movement is no longer regarded as probably unintended irregularity, but as an intended direction change despite the page not having	stood still for `directionChangeDelayMillis`!
* `directionChangeThreshold`: number (default: 500)   
	If `directionChangeDelayMillis` is > 0, this threshold describes the maximum number of pixels a scrolling movement into the opposite direction without waiting for the specified timeout will not be regarded as direction change. In other words: When suddenly changing the scrolling direction and scrolling back for more pixels than specified here, a direction change will be recognised even if the `directionChangeDelayMillis` timeout has not yet been exceeded and even if the initial scrolling motion had begun in a greater distance, i.e you didn't scroll back to where the motion started.    
	If zero (0), this setting will be ignored.
* `horizontal`: boolean (default: false)   
	If set to true, the plugin works for horizontal instead of vertical scrolling. All properties keep their names, `onUp` refers to scrolling to the left, `onDown` to	scrolling to the right etc.
 
If you want to configure the `oncePerDirection` or `directionChangeDelayMillis` settings separately for both scrolling directions, you may use the following options:

* `oncePerUp`: boolean (default: `undefined`)    
	If defined, this setting overrides the `oncePerDirection` setting for scrolling upwards.
* `oncePerDown`: boolean (default: `undefined`)    
	If defined, this setting overrides the `oncePerDirection` setting for scrolling downwards.
* `downUpDelayMillis`: number (default: `undefined`)    
	If defined, this setting overrides the `directionChangeDelayMillis` setting for the transition from scrolling downwards to scrolling upwards.
* `upDownDelayMillis`: number (default: `undefined`)    
	If defined, this setting overrides the `directionChangeDelayMillis` setting for the transition from scrolling upwards to scrolling downwards.

### Overwriting default options

The descriptions for the options above contain default values wich apply, if you don't add that option key to the argument object you pass to the plug-in function.

Any defaults (except the `undefined` ones) are taken from the object `$.fn.advScroll.defaults`.

It is possible for you to override these defaults by simply modifying said object before first calling the plug-in function.


## License: BSD 2-clause

Copyright (c) 2016, Immo Schulz-Gerlach, www.isg-software.de   
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

[projectHome]: http://www.isg-software.de/advscrollevent/indexe.html
[jQuery]: https://jquery.com
[jQuery.scroll]: http://api.jquery.com/scroll/
[jQuery.scrollTop]: http://api.jquery.com/scrollTop/
[jQuery.scrollLeft]: http://api.jquery.com/scrollLeft/