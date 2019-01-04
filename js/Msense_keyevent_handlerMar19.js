	var elementcount = 0;
	var widgetAPI = new Common.API.Widget();
	var tvKey = new Common.API.TVKeyValue();
	
	var str_fromurl1 = queryString('fromurl').trim();
	
	if (str_fromurl1=='guest')
	{
		elementcount = 1;
	}
	if (str_fromurl1=='content')
	{
		elementcount = 2;
	}
	if (str_fromurl1=='internet')
	{
		//elementcount = 1;
	}
	if (str_fromurl1=='billview')
	{
		elementcount = 3;
	}
	$('#ServerloadDiv').hide();
	$(".middle_pannelN a").eq(elementcount).addClass("test123");
	
var indexpage ={
	KeyHandler: function(e) {
		var keyCode = e.keyCode;
	
		if (keyCode == tvKey.KEY_RETURN) {
		//if (keyCode == 82) {
			 widgetAPI.blockNavigation(e); /* To Block Return key */
  				
				if ($('.Privacy_info').is(':visible')){
					  $('.Privacy_info').hide();
				}
				/*if ($('#irdmenu').is(':visible')){
					 startindexpage();
				}
				 if ($('#banner_tiqri').is(':visible')){
					 showirdmenu();
				}  */
				
			
			}

               if (keyCode == tvKey.KEY_LEFT) {
				//if (keyCode == 37) {
					debugger;
				 	var totalsubmenu = $(".middle_pannelN a").size();
            		$(".middle_pannelN a").removeClass("test123");
					var varhidevalue=0;
					var noofcount=1;
					var max = 6;
					
            		if (elementcount - 1 < 0) {
						
						if (totalsubmenu<7)
						{
							varhidevalue=0;
						}
						else
						{
							var icount=Math.floor(totalsubmenu/7);
							
							for (j=1;j<=1000;j++)
								{
									if (icount<=j)
									{
										noofcount=j;
										break;
									}
									
								}
							
							if (noofcount>=1)
							{
							varhidevalue= ((noofcount-1)*7 ) + ((totalsubmenu-1) -(noofcount*7));
							}
						}
												
                		elementcount = totalsubmenu-1;
						
						if ($(".middle_pannelN ul li").length -1 > max)
						{
						$(".middle_pannelN ul").each(function(){  
						if ($(this).find("li").length > max)
						{
							$(".middle_pannelN ul li").siblings(0).hide();
						}					
						}); 
					
						}
						$(".middle_pannelN ul").each(function(){
							if ($(this).find("li").length > max) {
								$(this)
								.find('li:gt('+varhidevalue+')')
								.show()
							}
						});  
						
						
					}else
					{
					elementcount--;
					}
					
					if ( !$(".middle_pannelN ul li").eq(elementcount).is(':visible') )
					{
						$(".middle_pannelN ul li").eq(elementcount).show();
						
						if ($(".middle_pannelN ul").find("li:visible").length > max) 
						{
							$(".middle_pannelN ul").find('li:visible:last').hide();
						}
						
					}
					$(".middle_pannelN a").eq(elementcount).addClass("test123");
					if (elementcount <= 1) {
               			$("#idprev").show();
					} else {

						$("#idprev").hide();
					}
					
				}
       			if (keyCode == tvKey.KEY_RIGHT) {
				//if (keyCode == 39) {
					//debugger;
					var max = 6;
					var totalsubmenu = $(".middle_pannelN a").size();
            		$(".middle_pannelN a").removeClass("test123");
            		if (elementcount + 1 >= totalsubmenu) {
						
						elementcount = 0;
           				$(".middle_pannelN ul li").siblings(0).show();
						
						$(".middle_pannelN ul").each(function(){  							
  							if ($(this).find("li").length > max) {
    							$(this)
      							.find('li:gt('+max+')')
      							.hide()
							}
						});  
						
					}else{
						elementcount++;
					}	
					
						if ( !$(".middle_pannelN ul li").eq(elementcount).is(':visible') )
						{
							$(".middle_pannelN ul li").eq(elementcount).show();
				
							if ($(".middle_pannelN ul").find("li:visible").length > max) 
								{
    								$(".middle_pannelN ul").find('li:visible:first').hide();
								}
				
						}
					
					if (elementcount <= 6) {
               			$("#idnext").show();
					} else {

						$("#idnext").hide();
					}
		
					$(".middle_pannelN a").eq(elementcount).addClass("test123");
					
				}
				if (keyCode == tvKey.KEY_CH_UP) {
					window.location = "tv.html";
				}
				if (keyCode == tvKey.KEY_CH_DOWN) {
					window.location = "tv.html";
				}
				
				if (keyCode == tvKey.KEY_EXIT) {
					widgetAPI.blockNavigation(event); /* To Block Return key  */
					startindexpage();
				}               
			if (keyCode == tvKey.KEY_ENTER) {				
			//if (keyCode == 13) {
					if ($('.Privacy_info').is(':visible')){
					  $('.Privacy_info').hide();
					  return;
					}
					
				var levelName = $(".middle_pannelN .txt_info").eq(elementcount).text().trim();				
				
			
				if (levelName == "TV CHANNELS") { // Channels		
	 				window.location = "tv.html";
					//window.location = "downloadfile/offline.html";
	 			}
				
				if (levelName == "HOTEL INFO") {					
					showirdmenu();
	 			}
				/*if (levelName == "SPA") { 
	 				showspaslides();
	 			}*/
				if (levelName == "CONTENT SHARING") { // content sharing
					window.location = "contentsharing.htm";
	 			}
			/*	if (levelName == "VIEW BILL") { // Bill view
	 				window.location = "billview.aspx";
	 			} */
				if (levelName == "APPS") { // Apps
	 				//window.location = "apps.html";
					showappspage();
	 			}
				if (levelName == "INTERNET") { // INTERNET		
	 				widgetAPI.runSearchWidget("29_fullbrowser", "https://www.radissonblu.com/en/resort-karjat");
					//window.location = "internetPlan.html";
					
	 			}				
			/*	if (levelName == "BT PLAYER") { // Blue tooth player
	 				var BTPlugin =  document.getElementById("pluginObjectSEF");
					BTPlugin.Open("HOTEL","1.000","HOTEL");
					BTPlugin.Execute("RunHotelApp","BtApp","1");
					BTPlugin.Close();
	 			} */
		
		}
	}
};
	
	var colateralopened=0;
	
	function startindexpage(){ 
	
		$('#myNav').hide();
		$('.clspromomessage').hide();
		$("#banner").css('visibility', 'visible');
		$('#indexpage_Anchor').focus();	
		$("#banner").show();
		$("#indexpagemenu").show();		
		//in room dining page
		$('#banner_tiqri').hide();		
		$("#tiqri_service_photo").css('visibility', 'hidden');
		$('#appsitem1').hide();
		$('#indexpagemenu').show();
		$('#irdmenu').hide();
		//setTimeout(showappspage, 1000);
		
			
		
		
		 /*colateralopened=0;	
		$("#position li").removeClass("on");		
		$("#position").each(function(){
  			var max = 0
  			if ($(this).find("li").length > max) {
    		$(this)
      			.find('li:gt('+max+')')
      			.hide() 
			} 
		}); */
	
	}
	
	function showappspage(){ 
		//index page
		$('#banner').show();
		$("#banner").css('visibility', 'visible');
		//in room dining page
		$('#banner_tiqri').hide();
		$("#tiqri_service_photo").css('visibility', 'hidden');		
		$('#apps_Anchor').focus();	
		$('#appsitem1').show();
		$('#indexpagemenu').hide();
		$('.clspromomessage').hide();
		$("#indexpagemenu").hide();		
		$("#irdmenu").hide();	
		$("#hsmenu").hide();	
	
	}
	
	//**** Date related Fn **/
	var datestrold = "";

	function startdate() {       
			//var t = new Date(datestrold);
			var t = new Date();
			t = new Date(t.getTime() + 1000);
			datestrold = t;
			var datesplit = t.toString().split(" ");
			var dstr = formatAMPM(t);		
			$('.date_display').text(datesplit[0]+ " " +datesplit[1]+ " " +datesplit[2]+ " " +datesplit[3]+ "  " +dstr);
    }	
	/* JS function to convert AM/PM) */
	function formatAMPM(date) {
		  var hours = date.getHours();
		  var minutes = date.getMinutes();
		  var ampm = hours >= 12 ? 'PM' : 'AM';
		  hours = hours % 12;
		  hours = hours ? hours : 12; // the hour '0' should be '12'
		  minutes = minutes < 10 ? '0'+minutes : minutes;
		  var strTime = hours + ':' + minutes + ' ' + ampm;
		  return strTime;
	}
function andazsimpleWeather() {
$.simpleWeather({
    location: 'Karjat',
    woeid: '',
    unit: 'c',
    success: function(weather) {
      html = '<h2><i class="icon-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h2>';
      html += '<ul><li>'+weather.city+', '+weather.region+'</li>';
      html += '<li class="currently">'+weather.currently+'</li>';
      html += '<li>'+weather.wind.direction+' '+weather.wind.speed+' '+weather.units.speed+'</li></ul>';
  
      $("#weather").html(html);
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
	});
}