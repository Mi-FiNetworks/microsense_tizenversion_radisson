	var elementcount = 0;
	var widgetAPI =new Common.API.Widget() ;
	var tvKey = new Common.API.TVKeyValue();

	var pluginNetwork = document.getElementById('pluginNetwork');
	pluginNetwork.Open("Network", "1.000", "Network");
	isSoftAPEnabled = pluginNetwork.Execute("IsSoftAPEnabled");
	//document.getElementById("test").innerHTML+="<br> isSoftAPEnabled: " + isSoftAPEnabled ; 
	if (isSoftAPEnabled)
	{
		var ret2 = pluginNetwork.Execute("GetSoftAPSSID");
		var ret4 = pluginNetwork.Execute("GetSoftAPSecurityKey");
		document.getElementById("tvsoftuname").innerHTML=ret2;
		document.getElementById("tvsoftpwd").innerHTML=ret4;	
	}
	else
	{
		pluginNetwork.Execute("EnableSoftAP");
		var ret2 = pluginNetwork.Execute("GetSoftAPSSID");
		var ret4 = pluginNetwork.Execute("GetSoftAPSecurityKey");
		document.getElementById("tvsoftuname").innerHTML=ret2;
		document.getElementById("tvsoftpwd").innerHTML=ret4;	
		
	}
//var mac =pluginNetwork.Execute("GetMAC" ,"1"); //1: wired, 0: wireless 
//var mac =pluginNetwork.Execute("GetIPAddress" ,"1");
//document.getElementById("tvsoftpwd").innerHTML=mac;
					
//	$(".section .middle_pannel").eq(elementcount).addClass("hover_bg");
	
$(document).keydown(function(e) {
	
				var keyCode = e.keyCode;

				if (keyCode == tvKey.KEY_HOME || keyCode == tvKey.KEY_EXIT) {
				//if (keyCode == 72) {
					
					window.location = "index.html?fromurl=content";
				}
				
				if (keyCode == tvKey.KEY_RETURN) {
				//if (keyCode == 68) {   //R key
					widgetAPI.blockNavigation(e);
					window.location = "contentsharing.htm?fromurl=guest";
					 //window.history.back();
				}
		
});
	
