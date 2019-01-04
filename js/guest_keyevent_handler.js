	var elementcount = 0;
	var widgetAPI = new Common.API.Widget();
	var tvKey = new Common.API.TVKeyValue();
	
	
	$(".middle_pannelN a").eq(elementcount).addClass("test123");
	
$(document).keydown(function(e) {
	
				var keyCode = e.keyCode;

               if (keyCode == tvKey.KEY_LEFT) {
		//if (keyCode == 37) {

				 	var totalsubmenu = $(".middle_pannelN a").size();
            		$(".middle_pannelN a").removeClass("test123");
            		if (elementcount - 1 < 0) {
                		elementcount = totalsubmenu-1;
					}else
					{
					elementcount--;
					}
		
		
					$(".middle_pannelN a").eq(elementcount).addClass("test123");
					
				}
       		if (keyCode == tvKey.KEY_RIGHT) {
				//if (keyCode == 39) {
				
					var totalsubmenu = $(".middle_pannelN a").size();
            		$(".middle_pannelN a").removeClass("test123");
            		if (elementcount + 1 >= totalsubmenu) {
                		elementcount = 0;
					}else{
						elementcount++;
					}	
		
						$(".middle_pannelN a").eq(elementcount).addClass("test123");
					
				}
				
			
				if (keyCode == tvKey.KEY_ENTER) {
				//if (keyCode == 13) {
							//var levelName = $(".middle_pannelN div p").eq(elementcount).text();
							var levelName = $(".middle_pannelN a").eq(elementcount).text().trim();	
							//alert(levelName);
					
							if (levelName === "Room service") { // Food colateral
								window.location = "colateral.html";
							}
							
							if (levelName === "Restaurants") { // dining
								window.location = "dining.html"
							}
							if (levelName === "Banquets") { // MEET
								window.location = "banquet.html"
							}
							if (levelName === "Health & Wellness") { // WORKOUT
								window.location = "healthandwelfare.html"
							}
							
		
				}
				if (keyCode == tvKey.KEY_HOME || keyCode == tvKey.KEY_EXIT) {
					//if (keyCode == 72) {
					widgetAPI.blockNavigation(e);
					window.location = "index.html?fromurl=guest";
				}
				if (keyCode == tvKey.KEY_RETURN) {
					//if (keyCode == 72) {
					widgetAPI.blockNavigation(e);
					window.location = "index.html?fromurl=guest";
				}
		
});
	
