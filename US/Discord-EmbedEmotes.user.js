// ==UserScript==
// @name         Discord-EmbedEmotes
// @namespace    http://tampermonkey.net/
// @version      1.0.2
// @description  Really, really shitty emote embed plugin
// @author       FrostBird347
// @match        https://discord.com/channels/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=discord.com
// @downloadURL  https://raw.githubusercontent.com/FrostBird347/DiscordStuff/refs/heads/master/US/Discord-EmbedEmotes.user.js
// @updateURL    https://raw.githubusercontent.com/FrostBird347/DiscordStuff/refs/heads/master/US/Discord-EmbedEmotes.user.js
// @grant        none
// ==/UserScript==

(function() {
	'use strict';
	
	window.BrowserCodeLoader({
		
		getName() {return "EmbedEmotes";},
		
		getDescription() {return "Really, really shitty emote embed plugin";},
		
		getVersion() {return "1.0.2";},
		
		getAuthor() {return "FrostBird347";},
		
		getMem() {return window.BrowserCodeIds[this.getName()].memory;},
		
		stop() {},
		
		start() {
			this.getMem().lastClickTime = Date.now();
		},
		
		observer(changes) {
			document.querySelectorAll("[class*=emojiItem]").forEach((el) => {
				try {
					if (!el.parentElement.classList.contains("AddedEmbed")) {
						el.parentElement.classList.add("AddedEmbed");
						el.parentElement.dataset.UsName = this.getName();
						el.parentElement.addEventListener("click", function() {
							let memory = window.BrowserCodeIds[this.dataset.UsName].memory;
							if (Date.now() - memory.lastClickTime > 500) {
								let imgURL = this.firstElementChild.src;
								let format = ".png";
								if (imgURL.includes("animated=true")) {
									format = ".gif";
								}
								imgURL = imgURL.split("?")[0].replace(".webp", format) + "?size=48&quality=lossless";
								
								window.alert(imgURL);
								memory.lastClickTime = Date.now();
							}
						});
					}
				} catch {}
			});
		},
		
		getStyle() {
			return `
				button[class*='emojiItemSelected'] {
					filter: none !important
				}
				
				[class*="mainContentWithChannelEmoji"] > [class*="channelEmojiRightOfIcon"] {
					display: none;
					padding: 6px 0;
				}
			`;
		}
		
	});
	
})();
