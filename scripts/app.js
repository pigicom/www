( function( $ ) {
	
  var CONFIG = {
			PUSHER: {
		    APP_KEY: '8c88ab666b4a1cf78714',
		    presenceChannelName:'presence-puzzlechannel'
			}
	};
	
	document.addEventListener("deviceready", onDeviceReady, false);

  function onDeviceReady() {
  	  	
  	
		  	// Connect
		  	var pusher = new Pusher(CONFIG.PUSHER.APP_KEY);
		    pusher.connection.bind('state_change', connectionStateChange);
		  	
		  	function connectionStateChange(state) {
		  		$('#connectionStatus').html(state.current);
		  	}
		  	
		  	// Subscribe
		  	var channel = pusher.subscribe(CONFIG.PUSHER.presenceChannelName);
		  	channel.bind('pusher:subscription_succeeded', subscriptionSucceeded);
		  	
		  	function subscriptionSucceeded() {
		  		$('#subscriptionStatus').html('succeeded');
		  	}
		  	
		  	channel.bind('my-event', handleMyEvent);
		  	
		  	function handleMyEvent( data ) {
		  		$('#connectionStatus').append('<pre>' + JSON.stringify(data, null, 2) + '</pre>' + channel.members.count.);
		  	}
  	
  }
  
} )( jQuery );

Pusher.log = function( msg ) {
	if( window.console && window.console.log ) {
		window.console.log( msg );
	}
};