
$(function() {
	$('button[name="create"]').click(function() {
		chrome.runtime.sendMessage({
			action: "create",
			name: $('input[name="name"]').val()
		});
		window.close();
	});
});