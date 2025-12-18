// ==UserScript==
// @name         Discord-HideNameSize
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @description  Randomly changes the font size of usernames
// @author       FrostBird347
// @match        https://discord.com/channels/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=discord.com
// @downloadURL  https://raw.githubusercontent.com/FrostBird347/DiscordStuff/refs/heads/master/US/Discord-HideNameSize.user.js
// @updateURL    https://raw.githubusercontent.com/FrostBird347/DiscordStuff/refs/heads/master/US/Discord-HideNameSize.user.js
// @grant        none
// ==/UserScript==

(function() {
	'use strict';
	
	window.BrowserCodeLoader({
		
		getName() {return "HideNameSize";},
		
		getDescription() {return "Randomly changes the font size of usernames";},
		
		getVersion() {return "1.0.1";},
		
		getAuthor() {return "FrostBird347";},
		
		getMem() {return window.BrowserCodeIds[this.getName()].memory;},
		
		stop() {
			clearInterval(this.getMem().interval);
		},
		
		start() {
			window.document.documentElement.style.setProperty('--name-size-custom', (0.85 + (window.Math.random() * 0.3)) + 'rem');
			this.getMem().interval = setInterval(function(){ window.document.documentElement.style.setProperty('--name-size-custom', (0.85 + (window.Math.random() * 0.3)) + 'rem'); }, 120000);
		},
		
		getStyle() {
			return `
				:root {
					--name-size-custom: 1.1rem;
				}
				span[class*="username"] {
					font-size: var(--name-size-custom) !important
				}
			`;
		}
		
	});
	
})();
