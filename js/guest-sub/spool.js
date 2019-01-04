	
	var widgetAPI = new Common.API.Widget();
	var tvKey = new Common.API.TVKeyValue();
	
	
	
$(document).keydown(function(e) {
	
				var keyCode = e.keyCode;
				//alert(keyCode);

               
				if (keyCode == tvKey.KEY_HOME || keyCode == tvKey.KEY_EXIT) {
				//if (keyCode == 72) {  // H key for HOME
					
					window.location = "index.html?fromurl=guest";
				}
				
				if (keyCode == tvKey.KEY_RETURN) {
				//if (keyCode == 82) {   //R key for Return
					
					//var str="";
					//str =window.location;
					//alert(str);
					//var n = String(str).search("Buzz");
					//alert(n);
					widgetAPI.blockNavigation(e);
					window.location = "healthandwelfare.html?from=spool";
					 //window.history.back();
				}
				
			
				
		
});
	
