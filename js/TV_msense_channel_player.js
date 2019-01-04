function fn_IPTV_channel_player () {			
			
	/* http://www.samsungdforum.com/B2B/Guide/ref50004/file_api_iptv.html */
	/* Using above URL IPTV plugin can be set it up */
	fn_display_channel_name(currentchannel);
	//pluginIPTV = document.getElementById("pluginObjectSEF");
	widgetAPI.sendReadyEvent();
	document.getElementById("anchor").focus();
	/// ****************************IPTV sef create prob while close 
	//pluginIPTV = document.getElementById("pluginSefIPTV");	
	pluginIPTV = document.getElementById("pluginObjectSEF");
	pluginIPTV.Open("IPTV", "1.00", "IPTV");
	pluginIPTV.OnEvent = onEvent_SEF;	
	
	Audio.init();
	Display.init();
	Player.init();
	
	
	
	if ( Player.init() && Audio.init() && Display.init())
	{
		Display.setVolume( Audio.getVolume() );
		
	}
	
	//Player.SetTuneURL(fn_IPTV_channel_chooser(currentchannel), this.urlprotocol, this.urlPath);
	fn_play_channel_fromnumber(currentchannel);
	
		    //document.getElementById('spkmsg').innerHTML += "<br>current channel " + currentchannel;
			/* Try to Get power state */
			window.onShow = onShow;
			window.onHide = onHide;
			
			pluginAPI.unregistKey(tvKey.KEY_VOL_UP);
			pluginAPI.unregistKey(tvKey.KEY_VOL_DOWN);
			pluginAPI.unregistKey(tvKey.KEY_MUTE);
			pluginAPI.unregistKey(tvKey.KEY_TTX_MIX);
	
			pluginTV = document.getElementById("pluginTV");
			pluginTV.Open("TV","1.000","TV"); 
	
			pluginTV.Execute("SetEvent", 126); //126 event is received whenever source is changed
			pluginTV.Execute("SetEvent", PL_TV_EVENT_CHANGE_POWER_STATE); //
	
			pluginTV.OnEvent = TVEventHander;
			//document.getElementById('spkmsg').innerHTML += "<br>current channel end";
	
}

function onShow()
{
	//document.getElementById('spkmsg').innerHTML += "<br>onShow called";
	pluginAPI.unregistKey(tvKey.KEY_VOL_UP);
	pluginAPI.unregistKey(tvKey.KEY_VOL_DOWN);
	pluginAPI.unregistKey(tvKey.KEY_MUTE);
	pluginAPI.unregistKey(tvKey.KEY_TTX_MIX);
	
	powerState = pluginTV.Execute("GetPowerState"); 
	if(powerState == 1)
	{
		//play();
		//document.getElementById('spkmsg').innerHTML += "<br>power state 1";
		//Player.SetTuneURL(fn_IPTV_channel_chooser(currentchannel), this.urlprotocol, this.urlPath);
		fn_play_channel_fromnumber(currentchannel);
	}		
};

function onHide()
{
	//document.getElementById('spkmsg').innerHTML +="<br>onhide ";
	pluginIPTV.Execute("StopCurrentChannel",0);
	pluginIPTV.Execute("FreeNowPlayingInfo",0);
	isplaying = 0;
	powerState = 0;
	window.location = "index.html";
	
};

function TVEventHander(event, id, data) {
		switch(parseInt(id)) {
		
		case PL_TV_EVENT_CHANGE_POWER_STATE :
				/* To get current TV status */
			   powerState = pluginTV.Execute("GetPowerState"); 
			   	//document.getElementById('spkmsg').innerHTML += "<br>power state called == "+powerState;
			   if(powerState == 0) {
					isplaying = 0;
					pluginIPTV.Execute("StopCurrentChannel",0);
					pluginIPTV.Execute("FreeNowPlayingInfo",0);
					window.location = "index.html";
				}
			  if(powerState == 1 ) {
					//play();
					//Player.SetTuneURL(fn_IPTV_channel_chooser(currentchannel), this.urlprotocol, this.urlPath);
					fn_play_channel_fromnumber(currentchannel);
				}  		 
			 break;
			 
		case 126 :
			var sourceObj = eval ("(" + data + ")");  
			//to check if source change event i.e. 126 is received ans source changed is 48
			//document.getElementById('test').innerHTML += "<br>126 event received "+isplaying;
			if(parseInt(sourceObj.parm3, 10) == 48 && isplaying == 0 && powerState == 1) {
				
				//Player.SetTuneURL(fn_IPTV_channel_chooser(currentchannel), this.urlprotocol, this.urlPath);		
				fn_play_channel_fromnumber(currentchannel);
			}
		break;
		
		 default:
		 break;
		 
		}
}


function fn_IPTV_channel_chooser (channelnum1) {
	/* TAJ MOVIES */
	 	if(channelnum1== 1) 
		{
			return "rtp://225.0.0.1:1234|HW"; 
		}
		if(channelnum1== 2) 
		{
			return "rtp://225.0.0.2:1234|HW"; 
		}
		if(channelnum1== 3) 
		{
			return "rtp://225.0.0.3:1234|HW"; 
		}
	/* ENGLISH NEWS */	
		if(channelnum1== 4) 
		{
			return "rtp://225.0.0.5:1234|HW"; 
		}
		if(channelnum1== 5) 
		{
			return "rtp://225.0.0.4:1234|HW"; 
		}
		if(channelnum1== 6) 
		{
			return "rtp://225.0.0.6:1234|HW"; 
		}
	/* HINDI NEWS */
	if(channelnum1== 7) 
		{
			return "rtp://225.0.0.7:1234|HW"; 
		}
		if(channelnum1== 8) 
		{
			return "rtp://225.0.0.8:1234|HW"; 
		}
		if(channelnum1== 9) 
		{
			return "rtp://225.0.0.9:1234|HW"; 
		}
}



function choose_ip_from_channelname (channelname) {
		//alert(channelname);
				/* TAJ MOVIES */
            	if (channelname == "HOTEL INFO") {					
               		currentchannel=1;
					fn_display_channel_name (currentchannel);
					Player.SetTuneURL(fn_IPTV_channel_chooser(currentchannel), this.urlprotocol, this.urlPath);
            	}
				if (channelname == "DW TV") {   
					currentchannel=2;
					fn_display_channel_name (currentchannel);
					Player.SetTuneURL(fn_IPTV_channel_chooser(currentchannel), this.urlprotocol, this.urlPath);
            	}
				if (channelname == "NHK WORLD") { 
					currentchannel=3;
					fn_display_channel_name (currentchannel);
					Player.SetTuneURL(fn_IPTV_channel_chooser(currentchannel), this.urlprotocol, this.urlPath);
            	}
				/* ENGLISH NEWS */
            	if (channelname == "RUSSIA TODAY") {
					
               		currentchannel=4;
					fn_display_channel_name (currentchannel);
					Player.SetTuneURL(fn_IPTV_channel_chooser(currentchannel), this.urlprotocol, this.urlPath);
            	}
				if (channelname == "INDIA NEWS") {
               		currentchannel=5;
					fn_display_channel_name (currentchannel);
					Player.SetTuneURL(fn_IPTV_channel_chooser(currentchannel), this.urlprotocol, this.urlPath);
            	}
				if (channelname == "RISHTEY") {
               		currentchannel=6;
					fn_display_channel_name (currentchannel);
					Player.SetTuneURL(fn_IPTV_channel_chooser(currentchannel), this.urlprotocol, this.urlPath);
            	}
				if (channelname == "HEADLINES TODAY") {
               		currentchannel=7;
					fn_display_channel_name (currentchannel);
					Player.SetTuneURL(fn_IPTV_channel_chooser(currentchannel), this.urlprotocol, this.urlPath);
            	}
				if (channelname == "AL JAZEERA") {
               		//Player.SetTuneURL(url5, this.urlprotocol, this.urlPath);
            	}
				/* HINDI NEWS */
            	if (channelname == "NDTV INDIA") {
					
               		//Player.SetTuneURL(url5, this.urlprotocol, this.urlPath);
            	}
				if (channelname == "ABP NEWS") {
               		//Player.SetTuneURL(url5, this.urlprotocol, this.urlPath);
            	}
				if (channelname == "AAJ TAK") {
               		//Player.SetTuneURL(url5, this.urlprotocol, this.urlPath);
            	}
				if (channelname == "DD NEWS") {
               		//Player.SetTuneURL(url5, this.urlprotocol, this.urlPath);
            	}
				if (channelname == "ZEE NEWS") {
               		//Player.SetTuneURL(url5, this.urlprotocol, this.urlPath);
            	}
				/* BUSINESS NEWS */
            	if (channelname == "NDTV PROFIT") {
					
               		//Player.SetTuneURL(url5, this.urlprotocol, this.urlPath);
            	}
				if (channelname == "ZEE BUSINESS") {
               		//Player.SetTuneURL(url5, this.urlprotocol, this.urlPath);
            	}
				if (channelname == "CNBC 18") {
               		//Player.SetTuneURL(url5, this.urlprotocol, this.urlPath);
            	}
				



	}
