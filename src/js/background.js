// background.js


// chrome.runtime.onMessage.addListener( function(response, sender, sendResponse) {
// 	// response -> whatever response is sent by the content script
// 	// sender -> information about the tab which is sending the information to the background script
// 	// sendResponse -> to send back the response to the content script

// 	alert(response);
// });

// alert('hello');

// connect to popup.js

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete' && tab.active) {

    alert('Status: Complete!');

  }
});