var socket = io.connect('http://localhost:3003');
var panel_tab_id;

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		socket.emit(request.action, request.name);
	}
);

socket.on('created', function (data) {
	chrome.windows.create(
		{url: "http://localhost:3003/",type: "panel"},
		function(window) {
		chrome.tabs.query(
			{windowId:window.id},
			function(tabs) {
				panel_tab_id = tabs[0].id;
			}
		)
	})
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
	console.log(JSON.stringify(request));
    if (request.greeting == "hello")
      sendResponse({farewell: "goodbye"});
  });


//do when recieved UID
if (false) {

}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo) {
	if (changeInfo.url) {
		socket.emit('new_url', changeInfo.url);
	}
});

socket.on('new_url', function (data) {
	chrome.tabs.query(
		{
			active: true,
			currentWindow: true
		},
		function(tabs) {
			if (tabs.length) {
				var tab_id = tabs[0].id;
				chrome.tabs.update(tab_id, {url: data})
			}
		}
	)
});





