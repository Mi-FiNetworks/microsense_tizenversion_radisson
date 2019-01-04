	//debugger;
	var elementcount = 0;
	var widgetAPI = new Common.API.Widget();
	var tvKey = new Common.API.TVKeyValue();
	var str_from = queryString('from').trim();
	var elementofnumber = 0;
	var levelIndicator = [0, 0];
	/* Dining sub menu */
	if (str_from =="tigri")
	{
		$(".middle_pannelN a").removeClass("test123");
		elementofnumber = 1;
		levelIndicator[elementofnumber]=0;		
		$(".middle_image_pannel a").eq(levelIndicator[elementofnumber]).addClass("workout123");
	}
	if (str_from =="rivea")
	{
		$(".middle_pannelN a").removeClass("test123");
		elementofnumber = 1;
		levelIndicator[elementofnumber]=1;		
		$(".middle_image_pannel a").eq(levelIndicator[elementofnumber]).addClass("workout123");
	}
	if (str_from =="bar")
	{
		$(".middle_pannelN a").removeClass("test123");
		elementofnumber = 1;
		levelIndicator[elementofnumber]=2;		
		$(".middle_image_pannel a").eq(levelIndicator[elementofnumber]).addClass("workout123");
	}
	if (str_from =="chinainn")
	{
		$(".middle_pannelN a").removeClass("test123");
		elementofnumber = 1;
		levelIndicator[elementofnumber]=3;		
		$(".middle_image_pannel a").eq(levelIndicator[elementofnumber]).addClass("workout123");
	}
	/* Banquet sub menu */
	if (str_from =="ballroom")
	{
		$(".middle_pannelN a").removeClass("test123");
		elementofnumber = 1;
		levelIndicator[elementofnumber]=0;		
		$(".middle_image_pannel a").eq(levelIndicator[elementofnumber]).addClass("workout123");
	}
	if (str_from =="imperial")
	{
		$(".middle_pannelN a").removeClass("test123");
		elementofnumber = 1;
		levelIndicator[elementofnumber]=1;		
		$(".middle_image_pannel a").eq(levelIndicator[elementofnumber]).addClass("workout123");
	}
	/* Banquet sub menu */
	if (str_from =="gym")
	{
		$(".middle_pannelN a").removeClass("test123");
		elementofnumber = 1;
		levelIndicator[elementofnumber]=1;		
		$(".middle_image_pannel a").eq(levelIndicator[elementofnumber]).addClass("workout123");
	}
	if (str_from =="spool")
	{
		$(".middle_pannelN a").removeClass("test123");
		elementofnumber = 1;
		levelIndicator[elementofnumber]=0;		
		$(".middle_image_pannel a").eq(levelIndicator[elementofnumber]).addClass("workout123");
	}
	if (str_from =="jivaspa")
	{
		$(".middle_pannelN a").removeClass("test123");
		elementofnumber = 1;
		levelIndicator[elementofnumber]=2;		
		$(".middle_image_pannel a").eq(levelIndicator[elementofnumber]).addClass("workout123");
	}
	if (str_from =="salon")
	{
		$(".middle_pannelN a").removeClass("test123");
		elementofnumber = 1;
		levelIndicator[elementofnumber]=3;		
		$(".middle_image_pannel a").eq(levelIndicator[elementofnumber]).addClass("workout123");
	}
	
	
	
	
$(document).keydown(function(e) {
	
				var keyCode = e.keyCode;
				//alert(keyCode);

               if (keyCode == tvKey.KEY_LEFT) {
					//if (keyCode == 37) {
						
					if (elementofnumber==1)
					{

				 	var totalsubmenu = $(".middle_image_pannel a").size();
            		$(".middle_image_pannel a").removeClass("workout123");
            		if (levelIndicator[elementofnumber] - 1 < 0) {
                		levelIndicator[elementofnumber] = totalsubmenu-1;
					}else
					{
					levelIndicator[elementofnumber]--;
					}
		
		
					$(".middle_image_pannel a").eq(levelIndicator[elementofnumber]).addClass("workout123");
					
					}
					else
					{
						var totalsubmenu = $(".middle_pannelN a").size();
            			$(".middle_pannelN a").removeClass("test123");
            			if (levelIndicator[elementofnumber] - 1 < 0) {
                			levelIndicator[elementofnumber] = totalsubmenu-1;
						}else
						{
						levelIndicator[elementofnumber]--;
						}
		
						$(".middle_pannelN a").eq(levelIndicator[elementofnumber]).addClass("test123");
					}
					
				}
       			if (keyCode == tvKey.KEY_RIGHT) {
				//if (keyCode == 39) {
					//debugger;
					if (elementofnumber==1)
					{
				
					var totalsubmenu = $(".middle_image_pannel a").size();
            		$(".middle_image_pannel a").removeClass("workout123");
            		if (levelIndicator[elementofnumber] + 1 >= totalsubmenu) {
                		levelIndicator[elementofnumber] = 0;
					}else{
						levelIndicator[elementofnumber]++;
					}	
		
						$(".middle_image_pannel a").eq(levelIndicator[elementofnumber]).addClass("workout123");
					}
					else
					{
						var totalsubmenu = $(".middle_pannelN a").size();
            			$(".middle_pannelN a").removeClass("test123");
            			if (levelIndicator[elementofnumber] + 1 >= totalsubmenu) {
                			levelIndicator[elementofnumber] = 0;
						}else{
							levelIndicator[elementofnumber]++;
						}	
		
						$(".middle_pannelN a").eq(levelIndicator[elementofnumber]).addClass("test123");
					}
					
					
				}
				if (keyCode == tvKey.KEY_UP) {
			//if (keyCode == 38) {   //UP key
				
				elementofnumber=1;
				levelIndicator[elementofnumber]=0;
				$(".middle_pannelN a").removeClass("test123");
				$(".middle_image_pannel a").eq(levelIndicator[elementofnumber]).addClass("workout123");
				}
				
			if (keyCode == tvKey.KEY_DOWN) {
		   //if (keyCode == 40) {   //DOWN key
				
				elementofnumber=0;
				levelIndicator[elementofnumber]=0;
				$(".middle_image_pannel a").removeClass("workout123");
				$(".middle_pannelN a").eq(levelIndicator[elementofnumber]).addClass("test123");
				
				}
				
				if (keyCode == tvKey.KEY_HOME || keyCode == tvKey.KEY_EXIT) {
				//if (keyCode == 72) {
					
					window.location = "index.html?fromurl=guest";
				}
				
				if (keyCode == tvKey.KEY_RETURN) {
				//if (keyCode == 68) {   //R key
					widgetAPI.blockNavigation(e);
					window.location = "index.html?fromurl=guest";
					 //window.history.back();
				}
				
			
				if (keyCode == tvKey.KEY_ENTER) {
				//if (keyCode == 13) {
				
					var levelName="";
					if (elementofnumber==1)
					{
						levelName = $(".middle_image_pannel div span").eq(levelIndicator[elementofnumber]).text();
					}
					else if (elementofnumber==0)
					{
						var levelName = $(".middle_pannelN a").eq(levelIndicator[elementofnumber]).text().trim();	
					}
		//alert(levelName);
				if (levelName === "TIQRI") { // Channels		
	 				window.location = "tigri.html"
	 			}
				if (levelName === "RIVEA") { // Channels		
	 				window.location = "rivea.html"
	 			}
				if (levelName === "TIQRI BAR & LOUNGE") { // Channels		
	 				window.location = "tigribar.html"
	 			}
				if (levelName === "CHINA.INC") { // Channels		
	 				window.location = "chinainc.html"
	 			}
				
				if (levelName === "Hotel Info") { // GUEST SERVICES
	 				window.location = "hotelinfo.html"
	 			}
				
				if (levelName === "Health & Wellness") { // GUEST SERVICES
	 				window.location = "healthandwelfare.html"
	 			}
				if (levelName === "Banquets") { // GUEST SERVICES
	 				window.location = "banquet.html"
	 			}
				if (levelName === "GRAND BALLROOM") { // Grand Ballroom
	 				window.location = "grandballroom.html"
	 			}
				if (levelName === "IMPERIAL ROOM") { // Imperial Room
	 				window.location = "imperialroom.html"
	 			}
				if (levelName === "Restaurants") { // GUEST SERVICES
	 				window.location = "dining.html"
	 			}
				if (levelName === "SWIMMING POOL") { // Swimming Pool
	 				window.location = "spool.html"
	 			}
				if (levelName === "FITNESS CENTRE") { // Swimming Pool
	 				window.location = "gym.html"
	 			}
				if (levelName === "JIVA SPA") { // Swimming Pool
	 				window.location = "jivaspa.html"
	 			}
				if (levelName === "SALON") { // Swimming Pool
	 				window.location = "salon.html"
	 			}
				if (levelName === "Room service") { // GUEST SERVICES
	 				window.location = "colateral.html";
	 			}
		
				}
		
});
	
