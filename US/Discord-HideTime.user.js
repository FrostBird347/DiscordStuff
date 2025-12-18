// ==UserScript==
// @name         Discord-HideTime
// @namespace    http://tampermonkey.net/
// @version      1.1.1
// @description  Hides the timestamps of recent posts, allowing you to take screenshots without giving away your timezone.
// @author       FrostBird347
// @match        https://discord.com/channels/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=discord.com
// @downloadURL  https://raw.githubusercontent.com/FrostBird347/DiscordStuff/refs/heads/master/US/Discord-HideTime.user.js
// @updateURL    https://raw.githubusercontent.com/FrostBird347/DiscordStuff/refs/heads/master/US/Discord-HideTime.user.js
// @grant        none
// ==/UserScript==

(function() {
	'use strict';
	
	window.BrowserCodeLoader({
		
		getName() {return "HideTime";},
		
		getDescription() {return "Hides the timestamps of recent posts, allowing you to take screenshots without giving away your timezone.";},
		
		getVersion() {return "1.1.1";},
		
		getAuthor() {return "FrostBird347";},
		
		getMem() {return window.BrowserCodeIds[this.getName()].memory;},
		
		stop() {
			window.clearInterval(this.getMem().SlowSearchID);
		},
		
		start() {
			this.getMem().TryHideTime = function(el) {
				try {
					if (!el.classList.contains("HTAlreadyDone")) {
						if (el.innerText.replace(" — \n", "").startsWith("Today at ") && !el.innerText.replace(" — \n", "").startsWith("Today at --:--")) {
							el.innerText = "Today at --:--";
						} else if (el.innerText.replace(" — \n", "").startsWith("Yesterday at ") && !el.innerText.replace(" — \n", "").startsWith("Yesterday at --:--")) {
							el.innerText = "Yesterday at --:--";
						} else if (el.innerText.replace(" — \n", "").split(" ").length > 1) {
							el.innerText = el.innerText.replace(" — \n", "").split(" ")[0];
						} else if ((/^[0-9][0-9]:[0-9][0-9]$/).exec(el.innerText.replace(" — \n", "")) != null) {
							el.innerText = "Today at --:--";
						}
						el.classList.add("HTAlreadyDone");
					}
				} catch {}
			};
			
			this.getMem().SlowSearchID = window.setInterval(function(memory){
				let TimeList = document.body.getElementsByTagName("TIME");
				for (let i = 0; i < TimeList.length; i++) {
					memory.TryHideTime(TimeList[i]);
				}
			}, 5000, this.getMem());
		},
		
		observer(changes) {
			//window.console.log(changes);
			for (let i = 0; i < changes.addedNodes.length; i++) {
				try {
					//window.console.log(changes.addedNodes[i]);
					if (!["LI", "SPAN", "MAIN"].includes(changes.addedNodes[i].tagName) && !changes.addedNodes[i].classList.contains("backgroundFlash")) {
						throw "Skipped, element likely isn't a new timestamp";
					}
					//window.console.log("^ PASSED");
					Array.prototype.forEach.call(changes.addedNodes[i].getElementsByTagName("TIME"), function(el) {
						this.getMem().TryHideTime(el);
					})
				} catch {}
			}
		}
		
	});
	
})();
