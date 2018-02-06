// content script js content.js

// chrome.runtime.sendMessage("Hello World!");
chrome.runtime.sendMessage(document.getElementsByTagName('title')[0].innerText);