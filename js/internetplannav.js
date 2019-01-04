	//debugger;
	var elementcount = 0;
	var widgetAPI = new Common.API.Widget();
	var tvKey = new Common.API.TVKeyValue();
	var str_from = 0;
	var elementofnumber = 0;
	var levelIndicator = [0, 0];
	$("#pln_details div").eq(levelIndicator[elementofnumber]).addClass("interplanlistbtnhover");
	var planchoosed =""
	var result ="";
	
$(document).keydown(function(e) {
	
				var keyCode = e.keyCode;
				//alert(keyCode);

              if (keyCode == tvKey.KEY_LEFT) {
				//if (keyCode == 37) {  //LEFT arrow key	
				//debugger;
					if (elementofnumber==2)
					{	
							if( $('#dialog_box').css("display") != 'none' )  {
								$("#dialog_box a").removeClass("interplanlistbtnhover");
								var totalsubmenu = $("#dialog_box a").size();
								if (levelIndicator[elementofnumber] - 1 < 0)
								{
									levelIndicator[elementofnumber]=totalsubmenu-1;
								}
								else
								{
									levelIndicator[elementofnumber]--;	
								}
							
								$("#dialog_box a").eq(levelIndicator[elementofnumber]).addClass("interplanlistbtnhover");
							}
					}
					else
					{
					elementofnumber=1;
					levelIndicator[elementofnumber]=0;
					$("#pln_details div").removeClass("interplanlistbtnhover");
					$("#btn_panel a").eq(levelIndicator[elementofnumber]).addClass("btn_hover");	
					}
				}
       			if (keyCode == tvKey.KEY_RIGHT) {
				//if (keyCode == 39) {    //RIGHT arrow key
					//debugger;
					if (elementofnumber==2)
					{	
							if( $('#dialog_box').css("display") != 'none' )  {
								$("#dialog_box a").removeClass("interplanlistbtnhover");
								var totalsubmenu = $("#dialog_box a").size();
								if (levelIndicator[elementofnumber] + 1 >= totalsubmenu)
								{
									levelIndicator[elementofnumber]=0;
								}
								else
								{
									levelIndicator[elementofnumber]++;	
								}
							
								$("#dialog_box a").eq(levelIndicator[elementofnumber]).addClass("interplanlistbtnhover");
							}
					}
					else
					{
					elementofnumber=0;
					levelIndicator[elementofnumber]=0;
					$("#btn_panel a").removeClass("btn_hover");
					$("#pln_details div").eq(levelIndicator[elementofnumber]).addClass("interplanlistbtnhover");
					}
					
				}
				if (keyCode == tvKey.KEY_DOWN) {
				//if (keyCode == 40) {   //DOWN key
				//debugger;
					if (elementofnumber==1)
					{				
					var totalsubmenu = $("#btn_panel a").size();
            		$("#btn_panel a").removeClass("btn_hover");
            		if (levelIndicator[elementofnumber] + 1 >= totalsubmenu) {	
						levelIndicator[elementofnumber] = 0;
					}else{
						levelIndicator[elementofnumber]++;
					}	
		
						$("#btn_panel a").eq(levelIndicator[elementofnumber]).addClass("btn_hover");
					}
					
					else if (elementofnumber==0)
					{
						var totalsubmenu = $("#pln_details div").size();
            			$("#pln_details div").removeClass("interplanlistbtnhover");
            			if (levelIndicator[elementofnumber] + 1 >= totalsubmenu) {
							
							if( $('#dialog_box').css("display") != 'none' )  {
							$("#dialog_box a").removeClass("interplanlistbtnhover");
							elementofnumber=2;
							levelIndicator[elementofnumber]=0;
							levelIndicator[0]=0;
							$("#dialog_box a").eq(levelIndicator[elementofnumber]).addClass("interplanlistbtnhover");
							return
							}
							else
							{
								levelIndicator[elementofnumber] = 0;
							}	
						}else{
							levelIndicator[elementofnumber]++;
						}	
		
						$("#pln_details div").eq(levelIndicator[elementofnumber]).addClass("interplanlistbtnhover");
					}
					else if (elementofnumber==2)
					{
						
					}
				
				}
				
				if (keyCode == tvKey.KEY_UP) {
				//if (keyCode == 38) {   //UP key
		
					if (elementofnumber==1)
					{
					var totalsubmenu = $("#btn_panel a").size();
            		$("#btn_panel a").removeClass("btn_hover");
            		if (levelIndicator[elementofnumber] - 1 < 0) {
                		levelIndicator[elementofnumber] = totalsubmenu-1;
					}else
					{
					levelIndicator[elementofnumber]--;
					}
					$("#btn_panel a").eq(levelIndicator[elementofnumber]).addClass("btn_hover");
					}
					else
					{
						var totalsubmenu = $("#pln_details div").size();
            			$("#pln_details div").removeClass("interplanlistbtnhover");
            			if (levelIndicator[elementofnumber] - 1 < 0) {
							
							if( $('#dialog_box').css("display") != 'none' && elementofnumber == 2)  {
								$("#dialog_box a").removeClass("interplanlistbtnhover");
								elementofnumber =0;
								levelIndicator[elementofnumber] = totalsubmenu-1;
								$("").dialog_hide();
							}
							else
							{
                			levelIndicator[elementofnumber] = totalsubmenu-1;
							}
						}
						else
						{
						levelIndicator[elementofnumber]--;
						}
		
						$("#pln_details div").eq(levelIndicator[elementofnumber]).addClass("interplanlistbtnhover");
					}
				}
				if (keyCode == tvKey.KEY_HOME || keyCode == tvKey.KEY_EXIT) {
				//if (keyCode == 72) {
					widgetAPI.blockNavigation(e);
					window.location = "index.html?fromurl=internet";
				}
				
				if (keyCode == tvKey.KEY_RETURN) {
				//if (keyCode == 68) {   //R key
					widgetAPI.blockNavigation(e);
					window.location = "index.html?fromurl=internet";
				}
	
				if (keyCode == tvKey.KEY_ENTER) {
				//if (keyCode == 13) {
					var levelName="";
					if (elementofnumber==1)
					{
						levelName = $("#btn_panel a").eq(levelIndicator[elementofnumber]).text().trim();
					}
					else if (elementofnumber==0)
					{
						levelName = $("#pln_details div").eq(levelIndicator[elementofnumber]).text().trim();
					}
					else if (elementofnumber==2)
					{
						levelName = $("#dialog_box a").eq(levelIndicator[elementofnumber]).text().trim();
					}
				//alert(levelName);
				//debugger;
				
					if (levelName == "menu") {
                        window.location = "../index.html?url_from_1=internet";
                    }
                    if (levelName == "internetmenu") {
						 window.location = "internet_menu.htm";
					}
					if (levelName == "tvmenu") {
						 window.location = "tv_menu.htm";
					}
					if (levelName == "back") {                      
						//window.history.go(-1);
						//window.history.back();
						window.location = "../index.html?url_from_1=internet";
                    }
					
				if( $('#dialog_box').css("display") == 'none' )  {
					//alert("display none");
				}
				if( $('#dialog_box').css("display") != 'none' )  {
					//alert("display");
				}
      
				if (levelName == "1 hour  Rs.100") { // 1 hour plan	
					document.getElementById("id_plan_select").innerHTML=levelName;
	 				planchoosed="5";
					$("").dialog_show();
	 			}
				if (levelName == "6 hours  Rs.300") { // 6 hour plan	
					document.getElementById("id_plan_select").innerHTML=levelName;
	 				planchoosed="6";
					$("").dialog_show();
	 			}
				if (levelName == "24 hours Rs.600") { // 24 hour plan	
					document.getElementById("id_plan_select").innerHTML=levelName;
	 				planchoosed="7";
					$("").dialog_show();
	 			}
				
				if (levelName == "Agree") { // Agree
	 				//alert(planchoosed);
					 result = getTextSync(planchoosed);
					//addusertonomdix(planchoosed, mycallback); //passing mycallback as a method
					 
					if (result=="SUCCESS")
					{
						//window.location ="internet_menu.htm";
						widgetAPI.runSearchWidget("29_fullbrowser", "http://www.google.com");
						window.location = "index.html?fromurl=internet";
					}
					else
					{
						$("").dialog_hide();
						$("#Ndx_message").show();
					}
					
	 			}
				if (levelName == "Disagree") { // Disagree
					$("#dialog_box a").removeClass("interplanlistbtnhover");
	 				elementofnumber=0;
					levelIndicator[elementofnumber]=0;				
					$("#pln_details div").eq(levelIndicator[elementofnumber]).addClass("interplanlistbtnhover");
					$("").dialog_hide();
	 			}
				
				
			}
		
});

function mycallback(data) {
	
   					if (data=="SUCCESS")
					{
						//window.location ="internet_menu.htm";
						//widgetAPI.runSearchWidget("29_fullbrowser", "http://www.google.com");
						window.location = "index.html?fromurl=internet";
					}
					else
					{
						$("").dialog_hide();
						$("#Ndx_message").show();
					}
}
var ndx_username ="";
function ndx_query_user() {
	
	queryusernomdix(response_user);
}

function response_user(ndx_user_name) {
					if (ndx_user_name!="")
					{
						//window.location ="internet_menu.htm";
						widgetAPI.runSearchWidget("29_fullbrowser", "http://www.google.com");
						window.location = "index.html?fromurl=internet";
					}
}
	
