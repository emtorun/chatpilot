chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
	chrome.runtime.sendMessage({greeting: "message_recieved"});
});

var socket = io.connect('http://localhost:3003');

socket.on('message', function (data) {
	$('#chat-area').append($("<p>"+ data +"</p>"));
	document.getElementById('chat-area').scrollTop = document.getElementById('chat-area').scrollHeight;
});

$(function() {
	 
	 // watch textarea for key presses
	 $("#sendie").keydown(function(event) {  
	 
		 var key = event.which;  
   
		 //all keys including return.  
		 if (key >= 33) {
		   
			 var maxLength = $(this).attr("maxlength");  
			 var length = this.value.length;  
			 
			 // don't allow new content if length is maxed out
			 if (length >= maxLength) {  
				 event.preventDefault();  
			 }  
		  }  
																																																	});
	 // watch textarea for release of key press
	 $('#sendie').keyup(function(e) {	
						 
		  if (e.keyCode == 13) { 
		  
			var text = $(this).val();
			var maxLength = $(this).attr("maxlength");  
			var length = text.length; 
			 
			// send 
			if (length <= maxLength + 1) { 
			 
				socket.emit('message', text);
				$(this).val("");
				
			} else {
			
				$(this).val(text.substring(0, maxLength));
				
			}	
			
			
		  }
	 });
	
});