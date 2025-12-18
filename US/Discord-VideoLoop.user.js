// ==UserScript==
// @name         Discord-VideoLoop
// @namespace    http://tampermonkey.net/
// @version      1.2.1
// @description  Adds a replay button next to the pause button in discord video and audio files.
// @author       FrostBird347
// @match        https://discord.com/channels/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=discord.com
// @downloadURL  https://raw.githubusercontent.com/FrostBird347/DiscordStuff/refs/heads/master/US/Discord-VideoLoop.user.js
// @updateURL    https://raw.githubusercontent.com/FrostBird347/DiscordStuff/refs/heads/master/US/Discord-VideoLoop.user.js
// @grant        none
// ==/UserScript==

(function() {
	'use strict';
	
	window.BrowserCodeLoader({
		
		getName() {return "VideoLoop";},
		
		getDescription() {return "Adds a replay button next to the pause button in discord video and audio files.";},
		
		getVersion() {return "1.2.1";},
		
		getAuthor() {return "FrostBird347";},
		
		getMem() {return window.BrowserCodeIds[this.getName()].memory;},
		
		stop() {},
		
		start() {},
		
		observer(changes) {
			document.querySelectorAll("[class*=audioControls],[class*=videoControls]").forEach((el) => {
				try {
					if (!el.classList.contains("AddedLoop")) {
						el.classList.add("AddedLoop");
						
						let type = el.className.includes("video") ? "Video" : "Audio";
						let controlIcon = el.firstElementChild.firstElementChild.classList.value
						
						el.insertBefore(document.createElement("div"), el.children[1]);
						el.children[1].innerHTML = '<svg class="' + controlIcon + '" aria-hidden="false" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="m 17.673205,7.3499186 2.828428,-2.8284271 h -7.071068 v 7.0710675 l 2.828427,-2.8284268 c 2.340523,2.3405238 2.340523,6.1447578 -2e-6,8.4852828 -2.340524,2.340524 -6.144758,2.340524 -8.4852815,1e-6 -2.3405235,-2.340524 -2.3405234,-6.144758 5e-7,-8.4852824 L 6.3594955,7.34992 c -3.1254128,3.125413 -3.1254126,8.188297 -7e-7,11.313709 3.125412,3.125412 8.1882962,3.125412 11.3137092,0 3.125413,-3.125414 3.125413,-8.188298 1e-6,-11.3137104 z M 6.3267946,18.696329 3.4983675,21.524757 h 7.0710675 v -7.071068 l -2.8284268,2.828427 c -2.3405235,-2.340524 -2.3405235,-6.144758 0,-8.4852815 2.3405238,-2.3405235 6.1447578,-2.3405235 8.4852818,0 2.340523,2.3405235 2.340523,6.1447575 0,8.4852815 l 1.414213,1.414213 c 3.125412,-3.125412 3.125412,-8.188296 0,-11.3137081 -3.125412,-3.125412 -8.1882964,-3.125412 -11.3137084,0 -3.125412,3.1254121 -3.125412,8.1882961 0,11.3137081 z"></path></svg>';
						el.children[1].id = type + "LoopButton";
						el.children[1].dataset.type = type.toUpperCase();
						
						el.children[1].onclick = function(preEl) {
							let el = preEl.srcElement;
							if (el.tagName.toLowerCase() == "path") {
								el = el.parentElement;
							}
							if (!el.parentElement.classList.contains("ChangingLoop")) {
								el.parentElement.classList.add("ChangingLoop");
								let mediaEl = el;
								mediaEl = el.parentElement.parentElement.parentElement.parentElement.querySelector(this.dataset.type);
								if (mediaEl.tagName != this.dataset.type) {
									el.remove();
								} else {
									if (mediaEl.loop) {
										el.style.color = "white";
										mediaEl.loop = false;
									} else {
										el.style.color = "cornflowerblue";
										mediaEl.loop = true;
									}
								}
								el.parentElement.classList.remove("ChangingLoop");
							}
						}
					}
				} catch {}
			});
		}
		
	});
	
})();
