	var manual1 = 0;
	
	$(".manual_pannelN a").eq(manual1).addClass("test123");
	//alert("keyCode");

var manual_desc ={
	KeyHandler: function(e) {
		var keyCode = e.keyCode; 
		
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

				    var totalsubmenu = $(".manual_pannelN a").size();
				    $(".manual_pannelN a").removeClass("test123");
            		if (manual1 - 1 < 0) {
            		    manual1 = totalsubmenu - 1;
					}else
					{
            		    manual1--;
					}
		
		
            		$(".manual_pannelN a").eq(manual1).addClass("test123");
					
				}
       		

		if (keyCode == tvKey.KEY_RIGHT) {
		        //if (keyCode == 39) {
             
				    var totalsubmenu = $(".manual_pannelN a").size();
				    $(".manual_pannelN a").removeClass("test123");
            		if (manual1 + 1 >= totalsubmenu) {
            		    manual1 = 0;
					}else{
            		    manual1++;
					}	
		
            		$(".manual_pannelN a").eq(manual1).addClass("test123");
					
				}
	
				
				 if (keyCode == tvKey.KEY_EXIT) {
					widgetAPI.blockNavigation(event);  
					 startindexpage();
				}  
				 if (keyCode == tvKey.KEY_HOME || keyCode == tvKey.KEY_EXIT) {
				 
					
					startindexpage();
				}  
				
			if (keyCode == tvKey.KEY_ENTER) {				
				//if (keyCode == 13) {
					if ($('.Privacy_info').is(':visible')){
					  $('.Privacy_info').hide();
					  return;
					}
					
					var levelName = $(".manual_pannelN .txt_info").eq(manual1).text().trim();
				
			
					if (levelName == "WASHER") {

					   
	 				washer();
	 			}
				/*if (levelName == "ALL DAY DINING") { 
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
	 			} */
			
		
		}
	}
};
	

	///Colateral
	var slider ='';
	var bullets = document.getElementById('position').getElementsByTagName('li');
	
	
	function manual_submenu() {
		//index page
		$('#banner').show();
		$("#banner").css('visibility', 'visible');
		//in room dining page
		$('#banner_tiqri').hide();
		$("#tiqri_service_photo").css('visibility', 'hidden');		
		$('#manual_Anchor').focus();
		$('#appsitem1').hide();
		$('#indexpagemenu').hide();
		$('.clspromomessage').hide();		
		$("#irdmenu").hide();
		$("#manual_info").show();
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
 



	function washer() {
	    //index page
	    $('#banner').hide();
	    $("#banner").css('visibility', 'hidden');
	    //in room dining page
	    $('#banner_tiqri').show();
	    $("#tiqri_service_photo").css('visibility', 'visible');
	    if (colateralopened == 0) {
	        setTimeout(washer_sliders, 500);
	        colateralopened = 1;
	    }
	    $('#colateral_Anchor').focus();
	    $('.clspromomessage').hide();

	    $('#slider_breakfast').hide();
	    $('#slider_alldaydining').hide();
	    $('#slider_nightdining').hide();
	    $('#slider_desserts').hide();
	    $('#slider_beverages').hide();
	    $('#slider_spa').hide();


	    $('#manual_pics').show();
	    

	    $("#position li").removeClass("on");
	    $("#position li").eq(0).addClass("on");
	    $("#position").each(function () {
	        var max = 8;
	        console.log("li length :" + $(this).find("li").length);
	        if ($(this).find("li").length > max) {
	            $(this)
                    .find('li:gt(' + max + ')')
                    .hide()
	        }
	    });

	}

	function washer_sliders() {
	 

	    if ($('.Privacy_info').is(':visible')) {
	        $('.Privacy_info').hide();
	    }

	    slider =
                Swipe(document.getElementById('manual_pics'), {
                    auto: 1000000,
                    continuous: true,
                    callback: function (pos) {

                        var i = bullets.length;
                        while (i--) {
                            bullets[i].className = ' ';
                        }
                        bullets[pos].className = 'on';
                    }

                });

	}