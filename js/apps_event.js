	var appselementcount = 0;
	$(".middle_pannelAPPS a").eq(appselementcount).addClass("test123");

var apps ={

	KeyHandler: function(e) {

			var keyCode = e.keyCode;
				//alert(keyCode);
			/* if (keyCode == tvKey.KEY_RETURN) {
				  widgetAPI.blockNavigation(e);
				  startindexpage();
			}
			if (keyCode == tvKey.KEY_EXIT || keyCode == tvKey.KEY_HOME) {
					widgetAPI.blockNavigation(e);
					 startindexpage();
			} */

			//if (keyCode == tvKey.KEY_LEFT) {
				if (keyCode == 37) {   ///LEFT Arrow
					//rightcontentidleFrom = new Date();  ////Idle time show TV full screen
				 	var totalsubmenu = $(".middle_pannelAPPS a").size();
            		$(".middle_pannelAPPS a").removeClass("test123");
            		if (appselementcount - 1 < 0) {
                		appselementcount = totalsubmenu-1;
					}else
					{
					appselementcount--;
					}


					$(".middle_pannelAPPS a").eq(appselementcount).addClass("test123");

				}
       		//if (keyCode == tvKey.KEY_RIGHT) {
			if (keyCode == 39) {  ////RIGHT arrow
					//rightcontentidleFrom = new Date();  ////Idle time show TV full screen
					var totalsubmenu = $(".middle_pannelAPPS a").size();
            		$(".middle_pannelAPPS a").removeClass("test123");
            		if (appselementcount + 1 >= totalsubmenu) {
                		appselementcount = 0;
					}else{
						appselementcount++;
					}

						$(".middle_pannelAPPS a").eq(appselementcount).addClass("test123");

				}
					///LG TV remote portal key

			//if (keyCode == tvKey.KEY_ENTER) {
			if (keyCode == 13) {
				var levelName = $(".middle_pannelAPPS .txt_info").eq(appselementcount).text().trim();
				//document.getElementById("spkmsg").innerHTML ="Key pressed: " + levelName;
				//alert(levelName);
				if (levelName == "YOUTUBE") { // youtube
					$(".clspromomessage").show();
					$('.clstext').text("Please wait .....");
					checkinternetconnected("YOUTUBE");
	 			}
				if (levelName == "FACEBOOK") { // facebook
				//window.location = "https://www.facebook.com";
				widgetAPI.runSearchWidget("29_fullbrowser", "https://www.facebook.com");
					//widgetAPI.runSearchWidget("111399001366", "");
	 			}
			}
		 e.preventDefault();
	}
};

function checkinternetconnected(argappstype) {

  var flickerAPI = "http://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&titles=&format=json&callback=?";
  var isneedtoKillAjax = true; // set this true
        // Fire the checkajaxkill method after 10 seonds
        setTimeout(function() {
            checkajaxkill();
        }, 5000); // 10 seconds

        // For testing purpose set the sleep for 12 seconds in php page
        var myAjaxCall = $.getJSON(flickerAPI, function(data){
            isneedtoKillAjax = false; // set to false
        });
        function checkajaxkill(){
            if(isneedtoKillAjax){
				$(".clspromomessage").show();
				$('.clstext').html("It seems there is no internet on TV <br> Please go to home --> Internet --> Login to internet");
                myAjaxCall.abort();
            }else{
               	// document.getElementById("spkmsg").innerHTML+="<br>  connection exists";
				if (argappstype=="YOUTUBE")
				{
					$('.clspromomessage').hide();
					widgetAPI.runSearchWidget("111299001912", "");
				}
            }
        }
}

