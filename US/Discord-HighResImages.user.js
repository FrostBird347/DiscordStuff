// ==UserScript==
// @name         Discord-HighResImages
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Improves focused image quality
// @author       FrostBird347
// @match        https://discord.com/channels/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=discord.com
// @downloadURL  https://raw.githubusercontent.com/FrostBird347/DiscordStuff/refs/heads/master/US/Discord-HighResImages.user.js
// @grant        none
// ==/UserScript==

(function() {
	'use strict';
	
	window.BrowserCodeLoader({
		
		getName() {return "HighResImages";},
		
		getDescription() {return "Improves focused image quality";},
		
		getVersion() {return "1.0.0";},
	
		getAuthor() {return "FrostBird347";},
		
		getMem() {return window.BrowserCodeIds[this.getName()].memory;},
		
		stop() {
			window.clearInterval(this.getMem().FixFocusedImageID);
		},
		
		start() {
			this.getMem().FixFocusedImage = function() {
				try {
					let images = document.querySelectorAll('div[class*="focusLock_"] > div[class*="fullscreenOnMobile_"] div[class*="loadingOverlay_"] > img, div[class*="focusLock_"] > div[class*="carouselModal_"] div[class*="loadingOverlay_"] > img');
					for (let i = 0; i < images.length; i++) {
						let newSrc = images[i].src
						if (newSrc.startsWith("https://media.discordapp.net")) {
							newSrc = newSrc.replace("media.discordapp.net", "cdn.discordapp.com")
						}
						if (newSrc.split("&format=webp&").length > 1) {
							newSrc = newSrc.replace("&format=webp&", "&").split("&width=")[0];
						}
						
						if (newSrc.split("?format=webp").length > 1) {
							newSrc = newSrc.split("?format=webp&")[0];
						}
						
						if (images[i].src != newSrc) {
							images[i].src = newSrc;
						}
						
						if (images[i].parentElement.previousElementSibling != null && images[i].parentElement.previousElementSibling.tagName == 'A') {
							images[i].parentElement.previousElementSibling.remove();
						}
					}
				} catch {}
			}
			
			this.getMem().FixFocusedImageID = window.setInterval(this.getMem().FixFocusedImage, 5000);
		},
		
		getStyle() {
			return `
				div[class*="pannable_"] div[class*="loadingOverlay_"] > img, div[class*="zoomed_"] div[class*="loadingOverlay_"] > img {
					image-rendering: pixelated;
				}
			`;
		}
		
	});
	
})();