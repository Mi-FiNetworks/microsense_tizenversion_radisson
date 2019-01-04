	var hselementcount = 0;
	$(".hs_middle_pannelN a").eq(hselementcount).addClass("test123");

var hsmain ={

	KeyHandler: function(e) {

			var keyCode = e.keyCode;
				//alert(keyCode);
			if (keyCode == tvKey.KEY_RETURN) {			
			//if (keyCode == 82) {	
				  widgetAPI.blockNavigation(e);
				  startindexpage();
			}
			if (keyCode == tvKey.KEY_EXIT || keyCode == tvKey.KEY_HOME) {
					widgetAPI.blockNavigation(e);
					 startindexpage();
			} 

			if (keyCode == tvKey.KEY_LEFT) {
			//if (keyCode == 37) {   ///LEFT Arrow
					//rightcontentidleFrom = new Date();  ////Idle time show TV full screen
				 	var totalsubmenu = $(".hs_middle_pannelN a").size();
            		$(".hs_middle_pannelN a").removeClass("test123");
            		if (hselementcount - 1 < 0) {
                		hselementcount = totalsubmenu-1;
					}else
					{
					hselementcount--;
					}


					$(".hs_middle_pannelN a").eq(hselementcount).addClass("test123");

				}
       		if (keyCode == tvKey.KEY_RIGHT) {
			//if (keyCode == 39) {  ////RIGHT arrow
					//rightcontentidleFrom = new Date();  ////Idle time show TV full screen
					var totalsubmenu = $(".hs_middle_pannelN a").size();
            		$(".hs_middle_pannelN a").removeClass("test123");
            		if (hselementcount + 1 >= totalsubmenu) {
                		hselementcount = 0;
					}else{
						hselementcount++;
					}

						$(".hs_middle_pannelN a").eq(hselementcount).addClass("test123");

				}
					///LG TV remote portal key

			if (keyCode == tvKey.KEY_ENTER) {
			//if (keyCode == 13) {
				var levelName = $(".hs_middle_pannelN .txt_info").eq(hselementcount).text().trim();
				//document.getElementById("spkmsg").innerHTML ="Key pressed: " + levelName;
				//alert(levelName);
				if (levelName == "IN ROOM DINING") { 	
	 				showirdmenu();
	 			}
				if (levelName == "SPA") { 
	 				showspaslides();
	 			}


			}
		 e.preventDefault();
	}
};
	// SHOWING HOTEL SERVICES MENU
	function showhsmenu(){ 
		//index page
		$('#banner').show();
		$("#banner").css('visibility', 'visible');
		//in room dining page
		$('#banner_tiqri').hide();
		$("#tiqri_service_photo").css('visibility', 'hidden');		
		$('#hsmain_Anchor').focus();	
		$('#appsitem1').hide();
		$('#indexpagemenu').hide();
		$('.clspromomessage').hide();		
		$("#irdmenu").hide();	
		$("#hsmenu").show();	
		colateralopened=0;		
		$("#position li").removeClass("on");		
		$("#position").each(function(){
  			var max = 0
  			if ($(this).find("li").length > max) {
    		$(this)
      			.find('li:gt('+max+')')
      			.show() 
			} 
		}); 
	}	
	// SHOWING SPA SLIDES
	function showspaslides(){ 
		//index page
		$('#banner').hide();
		$("#banner").css('visibility', 'hidden');
		//in room dining page
		$('#banner_tiqri').show();
		$("#tiqri_service_photo").css('visibility', 'visible');
		if (colateralopened==0)
		{
			setTimeout(doslidespaslides, 500);
			colateralopened=1;
		}
		$('#colateral_Anchor').focus();			
		$('.clspromomessage').hide();
		
		$('#slider_breakfast').hide();
		$('#slider_alldaydining').hide(); 
		$('#slider_nightdining').hide();
		$('#slider_desserts').hide();
		$('#slider_beverages').hide();
		$('#slider_spa').show();
		
		$("#position li").removeClass("on");
		$("#position li").eq(0).addClass("on");
		$("#position").each(function(){
  			var max = 5;
			
  			if ($(this).find("li").length > max) {
    		$(this)
      			.find('li:gt('+max+')')
      			.hide() 
			} 
		});  
	
	}
	// DO SLIDE SPA SLIDES
	function doslidespaslides(){ 
	
			if ($('.Privacy_info').is(':visible')){
					$('.Privacy_info').hide();
				}
		
			slider =
					Swipe(document.getElementById('slider_spa'), {
					  auto: 1000000,
					  continuous: true,
					  callback: function(pos) {
			
						var i = bullets.length;
						while (i--) {
						  bullets[i].className = ' ';
						}
						  bullets[pos].className = 'on';
					  }
			
			});	
	
	}