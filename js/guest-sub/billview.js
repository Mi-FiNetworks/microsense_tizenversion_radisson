	var elementcount = 0;
	var widgetAPI = new Common.API.Widget();
	var tvKey = new Common.API.TVKeyValue();
	
	
	
$(document).keydown(function(e) {
	
				var keyCode = e.keyCode;
			
				if (keyCode == tvKey.KEY_RIGHT) {
				
						var totalsubmenu = $("#pagination a").size();   
					$("#pagination ul li").removeClass("paginationon");   		
            		if (elementcount + 1 >= totalsubmenu) {
                		elementcount = 0;
					}else{
						elementcount++;
					}	
				
						$("#pagination ul li").eq(elementcount).addClass("paginationon");
						$tr.hide();
						var page=$("#pagination a").eq(elementcount).text();
						//alert(page);
						var temp=page-1;
						var start=temp*req_num_row;
						//alert(start);
						
						for(var i=0; i< req_num_row; i++){
							
							$tr.eq(start+i).show();
						
						}
				}
				 if (keyCode == tvKey.KEY_LEFT) {
				
					var totalsubmenu = $("#pagination a").size();
            		$("#pagination ul li").removeClass("paginationon");   		
            		if (elementcount - 1 < 0) {
                		elementcount = totalsubmenu-1;
					}else
					{
					elementcount--;
					}
					$("#pagination ul li").eq(elementcount).addClass("paginationon");
					$tr.hide();
					var page=$("#pagination a").eq(elementcount).text();
					var temp=page-1;
					var start=temp*req_num_row;
					//alert(start);
					
					for(var i=0; i< req_num_row; i++){
						
						$tr.eq(start+i).show();
					
					}
				}
               
				if (keyCode == tvKey.KEY_HOME || keyCode == tvKey.KEY_EXIT) {
				//if (keyCode == 72) {  // H key for HOME
					
					window.location = "index.html?fromurl=billview";
				}
				
				if (keyCode == tvKey.KEY_RETURN) {
				//if (keyCode == 82) {   //R key for Return
				
					widgetAPI.blockNavigation(e);
					window.location = "index.html?fromurl=billview";
					 //window.history.back();
				}
				
			
				
		
});
	
