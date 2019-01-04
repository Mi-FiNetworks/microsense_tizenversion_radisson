	var widgetAPI = new Common.API.Widget();
	var tvKey = new Common.API.TVKeyValue();

$(document).keydown(function(e) {
	
				var keyCode = e.keyCode;
			
				//if (keyCode == 39) // Right arrow key
				 if (keyCode == tvKey.KEY_RIGHT) {
				
					slider.next();
				}
				 if (keyCode == tvKey.KEY_LEFT) {
				
					slider.prev();
				}
				
				if (keyCode == tvKey.KEY_HOME || keyCode == tvKey.KEY_EXIT) {
				//if (keyCode == 72) {  // H key for HOME
					
					window.location = "index.html?fromurl=guest";
				}
				
				if (keyCode == tvKey.KEY_RETURN) {
					window.location = "index.html?fromurl=guest";
				  widgetAPI.blockNavigation(e); /* To Block Return key */
  				//  break;

					}
				
			
				
		
});


	
