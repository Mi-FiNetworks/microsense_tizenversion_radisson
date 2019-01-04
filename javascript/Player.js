var Player = {
	plugin : null,
	state : -1,
	skipState : -1,
	originalSource : null,

	playbackSpeed : 1.0,

	STOPPED : 0,
	PLAYING : 1,
	PAUSED : 2,
	FORWARD : 3,
	REWIND : 4,
	TRICKPLAY : 5
};

String.prototype.getBytesLength = function() {
	return this.replace(/[^\x00-\xff]/gi, "--").length;
};

Player.init = function() {
	var success = true;

	this.state = this.STOPPED;

	if (Main.channelManagerPlugin == true) {
		if (!pluginIPTV) {
			success = false;
		} else {
			
		}
		
		
		var pluginTVMW = document.getElementById("pluginObjectTVMW");	
		
		if(parseInt(pluginTVMW.GetSource(),10) != PL_ISP_SOURCE) {
			//document.getElementById('spkmsg').innerHTML += "<br>play called changing source";
			pluginTVMW.SetSource(PL_ISP_SOURCE);
		}	
		//this.originalSource = pluginTVMW.Execute("GetSource");
		//TRACE("Player.init SetSource originalSource: " + this.originalSource);
		//pluginTVMW.Execute("SetSource",PL_ISP_SOURCE); // PL_TVMW_SOURCE_ISP
		//pluginTVMW.SetSource(48);
		//TRACE("Player.init SetSource 48: // PL_TVMW_SOURCE_ISP " + pluginTVMW.Execute("GetSource")); // PL_TVMW_SOURCE_ISP

	} else {
		
	}
	this.setWindow();
	return success;
};

Player.StreamNotFound = function() {
	Main.MesgPopUp("Stream Not Found.");
};

Player.deinit = function() {
	if (Main.channelManagerPlugin == true) {
		TRACE("Player.deinit Main.channelManagerPlugin: " + Main.channelManagerPlugin );
	} else {
		TRACE("Player.deinit Main.channelManagerPlugin: " + Main.channelManagerPlugin );
	}
};
Player.setFullscreen = function() {
	if (Main.channelManagerPlugin == true) {
		pluginIPTV.Execute("SetPlayerWindow", 0, 0, 0, 1920, 1080);
	} else {
		TRACE("Player.setFullscreen Main.channelManagerPlugin: " + Main.channelManagerPlugin );
	}
};

Player.setWindow = function() {
	if (Main.channelManagerPlugin == true) {
		pluginIPTV.Execute("SetPlayerWindow", 0, 10, 40, 920, 80);
	} else {
		TRACE("Player.setWindow Main.channelManagerPlugin: " + Main.channelManagerPlugin );
	}
};

Player.setVideoURL = function(url) {
	TRACE("URL Playing..." + url);
	this.url = url;
}



Player.SetTuneURL = function(url, protocol, path) {
	if (protocol == "http" || path == "|CAM") {
		if (Main.configWindow == false)
			Main.MesgPopUp("URL not supported");
	} else {
		
		/* if(parseInt(pluginTVMW.GetSource(),10) != PL_ISP_SOURCE) {
			//document.getElementById('spkmsg').innerHTML += "<br>play called changing source";
			pluginTVMW.SetSource(PL_ISP_SOURCE);
		}	
		else {	 */
		pluginIPTV.Execute("SIInit");
		pluginIPTV.Open("IPTV", "1.000", "IPTV");
		var flag = pluginIPTV.Execute("SetTuneURL", url, 0);
		TRACE("Player.init SetTuneURL flag: " + flag);
		this.setFullscreen();
		isplaying = 1;
	//	}
		
	}
};


Player.stopVideo = function() {
 	pluginIPTV.Execute("StopCurrentChannel", 0);
	pluginIPTV.Execute("FreeNowPlayingInfo", 0);
	pluginIPTV.Close();
}

Player.getState = function() {
	return this.state;
}
