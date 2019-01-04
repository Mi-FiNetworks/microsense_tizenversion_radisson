
var colateral ={
	
	KeyHandler: function(e) {
				var keyCode = e.keyCode;
			
				if (keyCode == tvKey.KEY_RIGHT) {
				//if (keyCode == 39) {
				
					slider.next();
				}
				if (keyCode == tvKey.KEY_LEFT) {
				//if (keyCode == 37) {	 
				
					slider.prev();
				}
               
				if (keyCode == tvKey.KEY_HOME || keyCode == tvKey.KEY_EXIT) {
				//if (keyCode == 72) {  // H key for HOME
					
					startindexpage();
				}
				
				if (keyCode == tvKey.KEY_RETURN) {
				//if (keyCode == 82) {   //R key for Return
				
				widgetAPI.blockNavigation(e);
				  if ($('#slider_spa').is(':visible')){						
						startindexpage();		
				  }else
					  showirdmenu();
					
				}
				
			
				
	}
};
	
