// ==UserScript==
// @name         Discord-pluginloader
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Loads discord plugin userscripts, based on betterdiscord plugins because I was too lazy to fully rewrite my userscripts
// @author       FrostBird347
// @match        https://discord.com/channels/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=discord.com
// @downloadURL  https://raw.githubusercontent.com/FrostBird347/DiscordStuff/refs/heads/master/US/Discord-pluginloader.user.js
// @run-at document-start
// @grant        none
// ==/UserScript==

(function() {
	'use strict';
	
	window.BrowserCodeIds = {};
	
	window.BrowserCodeLoader = function(browserCode) {
		if (window.BrowserCodeIds[browserCode.getName()] != undefined) {
			console.log('%c[BrowserScriptLoader] ', 'color: #4488FF', '\'Reloading\' ' + browserCode.getName());
			
			//If it fails to reload we continue on regardless and hope that nothing else breaks
			try {
				window.BrowserCodeIds[browserCode.getName()].plugin.stop();
			} catch(err) {
				console.error(err);
			}
			
			//Turn off observer
			if (window.BrowserCodeIds[browserCode.getName()].observer != undefined) {
				window.BrowserCodeIds[browserCode.getName()].observer.disconnect();
			}
			
			//Remove style
			if (window.BrowserCodeIds[browserCode.getName()].style != undefined) {
				window.BrowserCodeIds[browserCode.getName()].style.remove();
			}
		}
		window.BrowserCodeIds[browserCode.getName()] = { plugin: browserCode, memory: {} };
		console.log('%c[BrowserScriptLoader] ', 'color: #4488FF', '\'Loaded\' ' + browserCode.getName());
		
		setTimeout(function(plugin) {
			console.log('%c[BrowserScriptLoader] ', 'color: #4488FF', 'Starting ' + browserCode.getName() + '(v' + browserCode.getVersion() + ')...');
			plugin.start();
			
			//Start observer
			if (plugin.observer != undefined) {
				let mutationObserver = new MutationObserver(function(mutations) {
					for (let i = 0; i < mutations.length; i++) {
						plugin.observer(mutations[i]);
					}
				});
				mutationObserver.observe(document.body, { attributes: true, childList: true, subtree: true });
				window.BrowserCodeIds[plugin.getName()].observer = mutationObserver;
			}
			
			//Add style
			if (plugin.getStyle != undefined) {
				let style = document.createElement('style');
				style.textContent = plugin.getStyle();
				window.BrowserCodeIds[plugin.getName()].style = style;
				document.head.appendChild(style);
			}
			
		}, 5000, browserCode);
	};
	
})();