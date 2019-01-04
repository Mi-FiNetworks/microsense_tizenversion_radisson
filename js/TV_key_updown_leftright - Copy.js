/* TV Key down pressed */

function fn_tvkey_down_press () {
	
	 if (elementLevel === 0) {
            			var totalsubmenu = $(".content_right ul li").size();
            			$(".content_right ul li").removeClass("highlight2");
            			if (levelIndices[elementLevel] + 1 >= totalsubmenu) {
                		levelIndices[elementLevel] = 0;
           
						$(".content_right ul").each(function(){  
							$('li').siblings(0).show();
					
						});  
						$(".content_right ul").each(function(){
  							var max = 7
  							if ($(this).find("li").length > max) {
    							$(this)
      							.find('li:gt('+max+')')
      							.hide()
							}
						});  
			
            			} else {
                				levelIndices[elementLevel]++;

            			}
			
			 			if (levelIndices[elementLevel] >= 8) {
				 
							 if (levelIndices[elementLevel] == 8)
				 			{
					 			show_count=levelIndices[elementLevel];
					 			hide_count=0;
				 			}
				 			else
				 				{
									show_count++;					
					 				hide_count++;
				 				}
				
							$(".content_right ul li").eq(show_count).show();			
                			$(".content_right ul li").eq(hide_count).hide();
            			}
			

            			$(".content_right ul li").eq(levelIndices[elementLevel]).addClass("highlight2");

            			if (levelIndices[elementLevel] >= "7") {
               				 $(".nav_bottom").show();
						} else {

            				$(".nav_bottom").hide();
            			}
						 } else if (elementLevel === 1) {
            var totalLevel2Menu = $("." + activeLevel2Class + " ul li").size();
            if (activeLevel2Class !== "") {
                $("." + activeLevel2Class + " ul li").removeClass("sub_highlight");
                if (levelIndices[elementLevel] + 1 >= totalLevel2Menu) {
                    levelIndices[elementLevel] = 0;
                } else {
                    levelIndices[elementLevel]++;
                }
                $("." + activeLevel2Class + " ul li").eq(levelIndices[elementLevel]).addClass("sub_highlight");
            }
        }
		else if (elementLevel === 2) {
            var totalLevel2Menu = $("." + activeLevel2Class + " ul li").size();
            if (activeLevel2Class !== "") {
                $("." + activeLevel2Class + " ul li").removeClass("sub_highlight");
                if (levelIndices[elementLevel] + 1 >= totalLevel2Menu) {
                    levelIndices[elementLevel] = 0;
                } else {
                    levelIndices[elementLevel]++;
                }
                $("." + activeLevel2Class + " ul li").eq(levelIndices[elementLevel]).addClass("sub_highlight");
            }
        }
		
		
}

/*  TV key up key pressed */

function fn_tvkey_up_press () {
	
	
	  if (elementLevel === 0) {
			var totalsubmenu = $(".content_right ul li").size();
            $(".content_right ul li").removeClass("highlight2");
			
            if (levelIndices[elementLevel] - 1 < 0) {
                levelIndices[elementLevel] = totalsubmenu-1;
				var max = 7;
				if ($(".content_right ul li").length -1 > max)
				{
				$(".content_right ul").each(function(){  
					//var max = 7
  					if ($(this).find("li").length-1 > max) {
    					$('li').siblings(0).hide();
					}					
				});  
			
				}
				$(".content_right ul").each(function(){
  					//var max = 7
  					if ($(this).find("li").length >= max) {
    					$(this)
      					.find('li:gt('+max+')')
      					.show()
					}
				});  
				
				//document.getElementById("spkmsg").innerHTML +="<br> levelIndices[elementLevel  " + levelIndices[elementLevel];
				
            } else {
                levelIndices[elementLevel]--;
             
            }
			
			 if (levelIndices[elementLevel] <= 8) {
		    //if ((".content_right ul li:visible").length <= 8) {
				 
				 if (levelIndices[elementLevel] == 8)
				 {
					 show_count=levelIndices[elementLevel];
					 hide_count=totalsubmenu;
				 }
				 else
				 {
					$(".content_right ul").each(function(){
  						var max = 7
  						if ($(this).find("li:visible").length -1 > max) {
    						show_count--;					
					 		hide_count--;
						}
						else
						{
							hide_count=2000;							
						}
						
					});  
					//$('ul li:visible').size()
				 }
				
				$(".content_right ul li").eq(show_count).show();			
                $(".content_right ul li").eq(hide_count).hide();
            	}

            $(".content_right ul li").eq(levelIndices[elementLevel]).addClass("highlight2");
			
			/* 	if (levelIndices[elementLevel] <= show_count) {
            		$(".nav_top").show();
        		} else {
            		$(".nav_top").hide();
        		}
			*/
        } else if (elementLevel == 1) {

            if (activeLevel2Class != "") {
                $("." + activeLevel2Class + " ul li").removeClass("sub_highlight");
                if (levelIndices[elementLevel] - 1 < 0) {
                    levelIndices[elementLevel] = 0;
                } else {
                    levelIndices[elementLevel]--;
                }
                $("." + activeLevel2Class + " ul li").eq(levelIndices[elementLevel]).addClass("sub_highlight");
            }
        }
		else if (elementLevel == 2) {

            if (activeLevel2Class != "") {
                $("." + activeLevel2Class + " ul li").removeClass("sub_highlight");
                if (levelIndices[elementLevel] - 1 < 0) {
                    levelIndices[elementLevel] = 0;
                } else {
                    levelIndices[elementLevel]--;
                }
                $("." + activeLevel2Class + " ul li").eq(levelIndices[elementLevel]).addClass("sub_highlight");
            }
        }

}


/*  TV key LEFT key pressed */

function fn_tvkey_left_press () {
	
					categoryContent_UP_flag=0;
	   				show_count=0;
					hide_count=0;
		
       			 if (elementLevel === 0) {
            		elementLevel = 2;			
					fn_add_sorting_list_onview();
            		activeLevel2Class = "sorting_Entertainment";
			
			 		if (levelIndices[elementLevel]  > 0) {
                  
				 		 $(".sub_serial").eq(levelIndices[elementLevel]).show();
					 }else 
			 		{
				 		levelIndices[elementLevel] = 0;
			 		}
          

            		$('.sorting-container').animate({ "opacity": "1" }, "slow");
			
					//alert(levelIndices[elementLevel]);
			
            		$("." + activeLevel2Class + " ul li").removeClass("sub_highlight");
            		$("." + activeLevel2Class + " ul li").eq(levelIndices[elementLevel]).addClass("sub_highlight");
					//$(".sub_serial").eq(1).show();
            		$("." + activeLevel2Class).css("opacity", 1);
			
        			} else if (elementLevel === 1) {
						$("").myPlugin();
			
		
       				 }   else if (elementLevel === 2) {
            				elementLevel = 0;			
            				//document.getElementById("lbl_msg").innerHTML = levelIndices.join(',');

            				$('.sorting-container').animate({ "opacity": "0" }, "fast");

            				$("." + activeLevel2Class + " ul li").removeClass("sub_highlight");
            				$("." + activeLevel2Class + " ul li").eq(levelIndices[elementLevel]).addClass("sub_highlight");
            				$("." + activeLevel2Class).css("opacity", 0);
       				 }
	
}


/*  TV key RIGHT key pressed */

function fn_tvkey_right_press () {
	
		show_count=0;
		hide_count=0;
		//debugger;
		//document.getElementById("spkmsg").innerHTML="right key";
        if (elementLevel === 0) {	
		//document.getElementById("spkmsg").innerHTML="elemtn 0";
            elementLevel = 1;
			fn_rearrange_array();
			fn_addcategorylist_onview();
            activeLevel2Class = "flipbox_Entertainment";
			
			 if (levelIndices[elementLevel]  > 0) {
                  //  $("." + activeLevel2Class + " ul li sub_serial").eq(levelIndices[elementLevel]).show();
				  $(".sub_serial").eq(levelIndices[elementLevel]).show();
			 }else 
			 {
				 levelIndices[elementLevel] = 0;
			 }
         
            $('.flipbox-container').animate({ "opacity": "0.9" }, "slow");
			
			//alert(levelIndices[elementLevel]);
			
            $("." + activeLevel2Class + " ul li").removeClass("sub_highlight");
            $("." + activeLevel2Class + " ul li").eq(levelIndices[elementLevel]).addClass("sub_highlight");
			//$(".sub_serial").eq(1).show();
            $("." + activeLevel2Class).css("opacity", 1);
        }
        else if (elementLevel === 1) {
			//document.getElementById("spkmsg").innerHTML="elemtn 1";
            elementLevel = 0;
            //document.getElementById("lbl_msg").innerHTML = levelIndices.join(',');

            $('.flipbox-container').animate({ "opacity": "0" }, "fast");

            $("." + activeLevel2Class + " ul li").removeClass("sub_highlight");
            $("." + activeLevel2Class + " ul li").eq(levelIndices[elementLevel]).addClass("sub_highlight");
            $("." + activeLevel2Class).css("opacity", 0);
        }
		 else if (elementLevel === 2) {  
		// document.getElementById("spkmsg").innerHTML="elemtn 2";
			$("").mysorting();
		
        }

		
	
}