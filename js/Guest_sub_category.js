	
	//var widgetAPI = new Common.API.Widget();
	//var tvKey = new Common.API.TVKeyValue();
	
	
	
$(document).keydown(function(e) {
	
				var keyCode = e.keyCode;
				//alert(keyCode);

               
				//if (keyCode == tvKey.KEY_HOME || keyCode == tvKey.KEY_EXIT) {
				if (keyCode == 72) {
					
					window.location = "index.html";
				}
				
				//if (keyCode == tvKey.KEY_RETURN) {
				if (keyCode == 82) {   //R key for Return
					
					var str="";
					str =window.location;
					//alert(str);
					var n = String(str).search("Buzz");
					//alert(n);
					//window.location = "index.html";
					 //window.history.back();
				}
				
			
				
		
});
	
