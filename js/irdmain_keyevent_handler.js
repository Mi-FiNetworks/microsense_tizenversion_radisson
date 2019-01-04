	var irdelementcount = 0;
	
	$(".IRDmiddle_pannelN a").eq(irdelementcount).addClass("test123");
	
var irdmain ={
	KeyHandler: function(e) {
		var keyCode = e.keyCode; 
		//alert(keyCode);
		if (keyCode == tvKey.KEY_RETURN) {
				//if (keyCode == 82) {
					widgetAPI.blockNavigation(e); /* To Block Return key */
					
					if ($('.Privacy_info').is(':visible')){
						  $('.Privacy_info').hide();
					}
					
					 startindexpage();
					
				
				}

		if (keyCode == tvKey.KEY_LEFT) {
				//if (keyCode == 37) {

				 	var totalsubmenu = $(".IRDmiddle_pannelN a").size();
            		$(".IRDmiddle_pannelN a").removeClass("test123");
            		if (irdelementcount - 1 < 0) {
                		irdelementcount = totalsubmenu-1;
					}else
					{
					irdelementcount--;
					}
		
		
					$(".IRDmiddle_pannelN a").eq(irdelementcount).addClass("test123");
					
				}
		if (keyCode == tvKey.KEY_RIGHT) {
				//if (keyCode == 39) {
				
					var totalsubmenu = $(".IRDmiddle_pannelN a").size();
            		$(".IRDmiddle_pannelN a").removeClass("test123");
            		if (irdelementcount + 1 >= totalsubmenu) {
                		irdelementcount = 0;
					}else{
						irdelementcount++;
					}	
		
						$(".IRDmiddle_pannelN a").eq(irdelementcount).addClass("test123");
					
				}
	
				
		if (keyCode == tvKey.KEY_EXIT) {
		    widgetAPI.blockNavigation(event); /* To Block Return key */
		    startindexpage();
		}
		if (keyCode == tvKey.KEY_HOME || keyCode == tvKey.KEY_EXIT) {
		    //if (keyCode == 72) {  // H key for HOME

		    startindexpage();
		}
				
			if (keyCode == tvKey.KEY_ENTER) {				
				//if (keyCode == 13) {
					if ($('.Privacy_info').is(':visible')){
					  $('.Privacy_info').hide();
					  return;
					}
					
				var levelName = $(".IRDmiddle_pannelN .txt_info").eq(irdelementcount).text().trim();				
				
			
				if (levelName == "BREAKFAST") { 	
	 				startinroomdining();
	 			}
				if (levelName == "ALL DAY DINING") { 
	 				start_alldaydining();
	 			}
				if (levelName == "NIGHT DINING") { 
					start_nightdining();
	 			}
				if (levelName == "DESSERTS") { 
					start_dessert();
	 			}
				if (levelName == "BEVERAGES") { 
	 				start_beverages();
	 			}
			
		
		}
	}
};
	

	///Colateral
	var slider ='';
	var bullets = document.getElementById('position').getElementsByTagName('li');
	
	
	function showirdmenu(){ 
		//index page
		$('#banner').show();
		$("#banner").css('visibility', 'visible');
		//in room dining page
		$('#banner_tiqri').hide();
		$("#tiqri_service_photo").css('visibility', 'hidden');		
		$('#irdmain_Anchor').focus();	
		$('#appsitem1').hide();
		$('#indexpagemenu').hide();
		$('.clspromomessage').hide();		
		$("#irdmenu").show();	
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

	
function startinroomdining(){ 
		//index page
		$('#banner').hide();
		$("#banner").css('visibility', 'hidden');
		//in room dining page
		$('#banner_tiqri').show();
		$("#tiqri_service_photo").css('visibility', 'visible');
		if (colateralopened==0)
		{
			setTimeout(startbreakfast, 500);
			colateralopened=1;
		}
		$('#colateral_Anchor').focus();			
		$('.clspromomessage').hide();
		
		$('#slider_breakfast').show();
		$('#slider_alldaydining').hide();
		$('#slider_nightdining').hide();
		$('#slider_desserts').hide();
		$('#slider_beverages').hide();
		$('#slider_spa').hide();
		
		$("#position li").removeClass("on");
		$("#position li").eq(0).addClass("on");
		$("#position").each(function(){
  			var max = 9;
			console.log("li length :" + $(this).find("li").length);
  			if ($(this).find("li").length > max) {
    		$(this)
      			.find('li:gt('+max+')')
      			.hide() 
			} 
		});  
	
	}
function start_alldaydining(){ 
		//index page
		$('#banner').hide();
		$("#banner").css('visibility', 'hidden');
		//in room dining page
		$('#banner_tiqri').show();
		$("#tiqri_service_photo").css('visibility', 'visible');
		if (colateralopened==0)
		{
			setTimeout(startalldaydining, 500);
			colateralopened=1;
		}
		$('#colateral_Anchor').focus();
		$('.clspromomessage').hide();
		
		$('#slider_breakfast').hide();
		$('#slider_alldaydining').show();
		$('#slider_nightdining').hide();
		$('#slider_desserts').hide();
		$('#slider_beverages').hide();
		$('#slider_spa').hide();
		
		$("#position li").removeClass("on");
		$("#position li").eq(0).addClass("on");
		$("#position").each(function(){
  			var max = 8;
			
  			if ($(this).find("li").length > max) {
    		$(this)
      			.find('li:gt('+max+')')
      			.hide() 
			} 
		});  
		
	}
		
	
function start_nightdining(){ 
		//index page
		$('#banner').hide();
		$("#banner").css('visibility', 'hidden');
		//in room dining page
		$('#banner_tiqri').show();
		$("#tiqri_service_photo").css('visibility', 'visible');
		if (colateralopened==0)
		{
			setTimeout(startnightdining, 1000);
			colateralopened=1;
		}
		$('#colateral_Anchor').focus();			
		$('.clspromomessage').hide();
		
		$('#slider_breakfast').hide();
		$('#slider_alldaydining').hide();
		$('#slider_nightdining').show();
		$('#slider_desserts').hide();
		$('#slider_beverages').hide();
		$('#slider_spa').hide();
		
		$("#position li").removeClass("on");
		$("#position li").eq(0).addClass("on");
		$("#position").each(function(){
  			var max = 5
  			if ($(this).find("li").length > max) {
    		$(this)
      			.find('li:gt('+max+')')
      			.hide() 
			} 
		}); 
	
	}
function start_dessert(){ 
		//index page
		$('#banner').hide();
		$("#banner").css('visibility', 'hidden');
		//in room dining page
		$('#banner_tiqri').show();
		$("#tiqri_service_photo").css('visibility', 'visible');
		if (colateralopened==0)
		{
			setTimeout(startdesserts, 500);
			colateralopened=1;
		}
		$('#colateral_Anchor').focus();			
		$('.clspromomessage').hide();
		
		$('#slider_breakfast').hide();
		$('#slider_alldaydining').hide();
		$('#slider_nightdining').hide();
		$('#slider_desserts').show();
		$('#slider_beverages').hide();
		$('#slider_spa').hide();
		
		$("#position li").removeClass("on");
		$("#position li").eq(0).addClass("on");
		$("#position").each(function(){
  			var max = 3
  			if ($(this).find("li").length > max) {
    		$(this)
      			.find('li:gt('+max+')')
      			.hide() 
			} 
		}); 
	
	}	
function start_beverages(){ 
		//index page
		$('#banner').hide();
		$("#banner").css('visibility', 'hidden');
		//in room dining page
		$('#banner_tiqri').show();
		$("#tiqri_service_photo").css('visibility', 'visible');
		if (colateralopened==0)
		{
			setTimeout(startbeverages, 500);
			colateralopened=1;
		}
		$('#colateral_Anchor').focus();			
		$('.clspromomessage').hide();
		
		$('#slider_breakfast').hide();
		$('#slider_alldaydining').hide();
		$('#slider_nightdining').hide();
		$('#slider_desserts').hide();
		$('#slider_beverages').show();
		$('#slider_spa').hide();
		
		$("#position li").removeClass("on");
		$("#position li").eq(0).addClass("on");
		$("#position").each(function(){
  			var max = 14			
  			if ($(this).find("li").length > max) {
    		$(this)
      			.find('li:gt('+max+')')
      			.hide() 
			} 
		}); 
	
	}		
	
	function startbreakfast(){ 
	
			if ($('.Privacy_info').is(':visible')){
					$('.Privacy_info').hide();
				}
		
			slider =
					Swipe(document.getElementById('slider_breakfast'), {
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
	function startalldaydining(){ 
	
		if ($('.Privacy_info').is(':visible')){
					$('.Privacy_info').hide();
		}
		
			slider =
					Swipe(document.getElementById('slider_alldaydining'), {
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
		//	alert(slider);
	
	}
	function startnightdining(){ 
	
			if ($('.Privacy_info').is(':visible')){
					$('.Privacy_info').hide();
				}
		
			slider =
					Swipe(document.getElementById('slider_nightdining'), {
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
	function startdesserts(){ 
	
			if ($('.Privacy_info').is(':visible')){
					$('.Privacy_info').hide();
				}
		
			slider =
					Swipe(document.getElementById('slider_desserts'), {
					  auto:1000000,
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
	function startbeverages(){ 
	
			if ($('.Privacy_info').is(':visible')){
					$('.Privacy_info').hide();
				}
		
			slider =
					Swipe(document.getElementById('slider_beverages'), {
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
