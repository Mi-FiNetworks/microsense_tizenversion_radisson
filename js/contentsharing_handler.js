	var elementcount = 0;
	var widgetAPI =new Common.API.Widget() ;
	var tvKey = new Common.API.TVKeyValue();
	
	var pluginMW = document.getElementById('pluginTVMW');
	pluginMW.SetSource(48); // 48 for IPTV, 0 for RF
	
	
	$(".section .middle_pannel").eq(elementcount).addClass("hover_bg");
	
$(document).keydown(function(e) {
	
			var keyCode = e.keyCode;

			 if (keyCode == tvKey.KEY_LEFT) {
			//if (keyCode == 37) {

				 	var totalsubmenu = $(".section .middle_pannel").size();
            		$(".section .middle_pannel").removeClass("hover_bg");
            		if (elementcount - 1 < 0) {
                		elementcount = totalsubmenu-1;
					}else
					{
					elementcount--;
					}
		
		
					$(".section .middle_pannel").eq(elementcount).addClass("hover_bg");
					
				}
       			if (keyCode == tvKey.KEY_RIGHT) {
			//	if (keyCode == 39) {
				
					var totalsubmenu = $(".section .middle_pannel").size();
            		$(".section .middle_pannel").removeClass("hover_bg");
            		if (elementcount + 1 >= totalsubmenu) {
                		elementcount = 0;
					}else{
						elementcount++;
					}	
		
						$(".section .middle_pannel").eq(elementcount).addClass("hover_bg");
					
				}
			
			if (keyCode == tvKey.KEY_ENTER) {				
			//if (keyCode == 13) {
				var levelName = $(".box1").eq(elementcount).text();
				
				//alert(levelName);
				if (levelName == "box1") {
					var pluginNetwork = document.getElementById('pluginNetwork');
                	pluginNetwork.Open("Network", "1.000", "Network");					
					isSoftAPEnabled = pluginNetwork.Execute("IsSoftAPEnabled");
					if (isSoftAPEnabled) {					
						//document.getElementById("test").innerHTML+="<br> isSoftAPEnabled: " + isSoftAPEnabled ; 
					
						var softAPDisabled = pluginNetwork.Execute("DisableSoftAP");
						if (softAPDisabled) {
							var pluginTaskManager = document.getElementById('pluginObjectSef4');
							pluginTaskManager.Open("TaskManager", "1.000", "TaskManager");					
							var returnval = pluginTaskManager.Execute('RunWIFIDisplay'); 
							//document.getElementById("test").innerHTML+="<br> returnval : " + returnval ; 
						}
					}
					else {
							var pluginTaskManager = document.getElementById('pluginObjectSef4');
							pluginTaskManager.Open("TaskManager", "1.000", "TaskManager");					
							var returnval = pluginTaskManager.Execute('RunWIFIDisplay'); 
							//document.getElementById("test").innerHTML+="<br> returnval : " + returnval ; 
					}
						
					
					
					//enterMobileScrinMirror = ScreenMirroring.run("saveStatus");
	 			}
				if (levelName == "box2") {
					
					var pluginNetwork = document.getElementById('pluginNetwork');
                	pluginNetwork.Open("Network", "1.000", "Network");					
					isSoftAPEnabled = pluginNetwork.Execute("IsSoftAPEnabled");
					if (isSoftAPEnabled) {					
						window.location = "smartviewpage.htm";
					}
					else {
							pluginNetwork.Execute("EnableSoftAP");
							window.location = "smartviewpage.htm";
					}
					
				}
					
				}
				
				if (keyCode == tvKey.KEY_HOME || keyCode == tvKey.KEY_EXIT) {
				//if (keyCode == 72) {
					
					window.location = "index.html?fromurl=content";
				}
				
				if (keyCode == tvKey.KEY_RETURN) {
				//if (keyCode == 68) {   //R key
					widgetAPI.blockNavigation(e);
					window.location = "index.html?fromurl=content";
					 //window.history.back();
				}
		
});
	
