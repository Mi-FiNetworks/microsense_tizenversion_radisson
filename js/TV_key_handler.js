var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();
var pluginAPI = new Common.API.Plugin();

	
		var PL_TV_EVENT_CHANGE_POWER_STATE = 211;
		var EMP_TV_POWER_STATE_STANDBY = 0 //TV is turned on for executing certain operation. But In the user position , TV is off state because AV is mute state. 
		var EMP_TV_POWER_STATE_NORMAL = 1  //Power On state of rendering AV.
		var EMP_TV_POWER_STATE_AGING = 2   // The power state in Agning mode
		var EMP_TV_POWER_STATE_FACTORY = 3 // The power state in Factory State
		var EMP_TV_POWER_STATE_OFF = 4  //This state means TV is in power-off state because of Power.


var pluginTVMW = null;
var pluginIPTV = null;
var powerState = 1;
var isplaying = 0;
var PL_ISP_SOURCE = 48;
var pluginTV;
var urlprotocol ='rtp';
var urlPath ='rtp';
/*
var url1 = "rtp://225.0.0.1:1234|HW";
var url2 = "rtp://225.0.0.2:1234|HW";
var url3 = "rtp://225.0.0.3:1234|HW";
var url4 = "rtp://225.0.0.4:1234|HW";
var url5 = "rtp://225.0.0.6:1234|HW";    */


/* FROM TEST APP TO HERE */
var i = 1;
var submenuIndex = -1;
var totalsubmenu = 8;
chosen = 0;
var totalchannelnumber = 6;
var currentchannel = 1;
var var_category_name = "ALL CHANNELS";

var winheight = $(window).height() - 5;

$('.content_right').height(winheight);

$('.flipbox-container').height(winheight)  ;

var idleTimeoutDuration = 2500;
var idleFrom = new Date();

var rightcontentidleTimeoutDuration = 10000;
var rightcontentidleFrom = new Date();

var bannershow = 2500;
var banneridleFrom = new Date();

var elementLevel = 0;

var flipboxContent_hide_flag =0;

var categoryContent_UP_flag =0;

var show_count = hide_count = 0;

var levelIndices = [0, 0];

var activeLevel2Class = ""; 

	var arr_category_ch=[]; ////Specific category choosed means while ch+ and CH- keep rotatin on that category
 	var c=0;
	var c_d=0;
 	var flag_up=0;
	var flag_down=0;
	var mychannel='';	
	var boolchannel=false;	
	



var idleInterval = undefined;
var rightcontentidleInterval = undefined;
var banneridleInterval = undefined;

function timerIncrement() {
    var timeElapsed = (new Date()).getTime() - idleFrom.getTime();
    if (timeElapsed > idleTimeoutDuration) {
        $(".content_right").animate({ right: "-55%" }, 300, function() {
            $(".content_right ul li").removeClass("highlight2");
            $(".content_right ul li").eq(levelIndices[elementLevel]).addClass("highlight2");
           // $('.flipbox-container').css("opacity", 0);
           // $('.flipboxContent').css("opacity", 0);

            $('.jspDrag').css({ top: "0px" });
            $('.jspPane').css({ top: "0px" });

            elementLevel = 0;
            levelIndices[1] = 0;
			
        });
        if (idleInterval !== undefined) {
            clearInterval(idleInterval);
        }
    }

}

function Fn_hide_channelname() {
    var timeElapsed = (new Date()).getTime() - idleFrom.getTime();
    if (timeElapsed > idleTimeoutDuration) {
		
      	 $(".channelnamenumber").hide();
		 $(".cls_vertical_divider").hide();
		 $(".cls_ch_number").hide();
		 
     /*   if (idleInterval !== undefined) {
            clearInterval(idleInterval);
        }
	*/	
    }

}

idleInterval = setInterval(Fn_hide_channelname, idleTimeoutDuration);

function Fn_timer_hiderightcontent() {
    var timeElapsed = (new Date()).getTime() - rightcontentidleFrom.getTime();
    if (timeElapsed > rightcontentidleTimeoutDuration) {
		fn_hide_rightcontent();
    }

}

rightcontentidleInterval = setInterval(Fn_timer_hiderightcontent, rightcontentidleTimeoutDuration);

function Fn_hide_channelbanner() {
    var timeElapsed = (new Date()).getTime() - banneridleFrom.getTime();
    if (timeElapsed > bannershow) {
		fn_hide_banner();
    }

}

banneridleInterval=setInterval(Fn_hide_channelbanner, bannershow);

jQuery.fn.myPlugin = function() {

  			elementLevel = 0;
           // document.getElementById("lbl_msg").innerHTML = levelIndices.join(',');

            $('.flipbox-container').animate({ "opacity": "0" }, "fast");

            //$("." + activeLevel2Class + " ul li").removeClass("sub_highlight");
           // $("." + activeLevel2Class + " ul li").eq(levelIndices[elementLevel]).addClass("sub_highlight");
            $("." + activeLevel2Class).css("opacity", 0);


};

jQuery.fn.mysorting = function() {

  			elementLevel = 0;
            //document.getElementById("lbl_msg").innerHTML = levelIndices.join(',');

            $('.sorting-container').animate({ "opacity": "0" }, "fast");

            //$("." + activeLevel2Class + " ul li").removeClass("sub_highlight");
           // $("." + activeLevel2Class + " ul li").eq(levelIndices[elementLevel]).addClass("sub_highlight");
            $("." + activeLevel2Class).css("opacity", 0);


};


/* END HERE     */


function onEvent_SEF(event, data1, data2) {
	alert("onEvent_SEF"+event+" param1 : "+data1+" param2 : "+data2);
	switch (event)
	{
		case 1: //Main.SEF_EVENT_TYPE.PL_EMP_IPTV_EVENT_MESSAGE:
			TRACE("SEF_EVENT_TYPE.PL_EMP_IPTV_EVENT_MESSAGE.");
			break;
		case 2: //Main.SEF_EVENT_TYPE.PL_EMP_PLAYER_EVENTS:
			//TRACE("SEF_EVENT_TYPE.PL_EMP_PLAYER_EVENTS.");
			if(data1 ==  6)
			{
				document.getElementById("msg").innerHTML="Weak or No Signal !";
			}
			if(data1 ==  7)
			{
				document.getElementById("msg").innerHTML="";
			}
			break;
		case 3: //Main.SEF_EVENT_TYPE.PL_EMP_IPTV_EVENTS:
			TRACE("SEF_EVENT_TYPE.PL_EMP_IPTV_EVENTS.");	
			if(data1 ==  1)//Main.SEF_IPTV_EVENT_PARAM.PL_EMP_IPTV_EVENT_AUDIO_ONLY)
			{
				TRACE("SEF_IPTV_EVENT_PARAM.PL_EMP_IPTV_EVENT_AUDIO_ONLY.");			
			}
			else if(data1 == 2)// Main.SEF_IPTV_EVENT_PARAM.PL_EMP_IPTV_EVENT_VIDEO_ONLY)
			{
				//TRACE("SEF_IPTV_EVENT_PARAM.PL_EMP_IPTV_EVENT_VIDEO_ONLY.");			
			}
			else if(data1 == 3)// Main.SEF_IPTV_EVENT_PARAM.PL_EMP_IPTV_EVENT_AUDIO_AND_VIDEO)
			{
				TRACE("SEF_IPTV_EVENT_PARAM.PL_EMP_IPTV_EVENT_AUDIO_AND_VIDEO.");			
			}
			else if(data1 ==  4)//Main.SEF_IPTV_EVENT_PARAM.PL_EMP_IPTV_EVENT_NO_STREAMINPUT :4)
			{
				document.getElementById("msg").innerHTML="Weak or No Signal !";

				TRACE("SEF_IPTV_EVENT_PARAM.PL_EMP_IPTV_EVENT_NO_STREAMINPUT.");			
			}
			else if(data1 == 5)// Main.SEF_IPTV_EVENT_PARAM.PL_EMP_IPTV_EVENT_STREAM_RECOVERED)
			{
				document.getElementById("msg").innerHTML = "";
				TRACE("SEF_IPTV_EVENT_PARAM.PL_EMP_IPTV_EVENT_STREAM_RECOVERED.");			
			}
			break;

		default:
			break;
	}
}

/* Main variable Declare */
var Main = {
		
	
	/* Callback function to be set by client */
	channelManagerPlugin : true, // Use Channel Manager Plugin -- set to true
	
	configWindow : false,
	mode : 0,
	mute : 0,
	NMUTE : 0,
	YMUTE : 1,
	PL_TVMW_SOURCE_ISP : 48
}

 

/**
 * @brief Called on lauch of the Widget
 * @remarks Called on lauch of the Widget
 */
Main.onLoad = function() {
	
	
	setTimeout(fn_IPTV_channel_player, 1500);
	//fn_IPTV_channel_player ();
		pluginAppCommon = document.getElementById('pluginSEFAppCommon');
		pluginAppCommon.Open("AppCommon","1.000","AppCommon")
		pluginAppCommon.Execute('RegisterKey',1118);
	
}


Main.onUnload = function() {
	//pluginIPTV.Close();
}

//Main.enableKeys = function()
//{
//	document.getElementById("anchor").focus();
//}

/**
 * @brief remocon keys handler
 * @remarks remocon keys handler
 */
Main.MainKeyHandler = function() {
	
//$(document).keydown(function(event) {
	//alert("hi");
	var keyCode = event.keyCode;
	//document.getElementById("spkmsg").innerHTML ="Key pressed: " + keyCode;
	idleFrom = new Date();
	rightcontentidleFrom = new Date();
	banneridleFrom = new Date();
	
		switch (keyCode)
		{
			
				case tvKey.KEY_CHLIST:
				//case 72:   // H key for Hiding list items
				
					//document.getElementById("spkmsg").innerHTML="CHANNEL LIST KEY PRESSED";
						fn_hide_banner();
					if ($('.content_right').css('opacity') > "0")					
					{	
						fn_hide_rightcontent();
					}
					else {
						if ($(".content_right ul li").length <= 0)
						{
							fn_addlist_onview();
							totalchannelnumber=$(".content_right ul li").length;
						}
						else
						{
							fn_display_rightcontent();
						}
					}
						break;
				case tvKey.KEY_CH_UP: 
					//document.getElementById("spkmsg").innerHTML="CH UP KEY PRESSED";
					
					if ($('.content_right').css('opacity') == "0")					
					{	
						fn_show_banner();
						if (arr_category_ch.length>0)
						{
							 if (arr_category_ch.length - 1 <=c) ////Specific category choosed means while ch+ keep rotatin on that category
		 						{
			 					c=0;			 
		 						}
		 					else if (c==0 && flag_up==0)
		 						{
			  					flag_up=1;
								 }
		 					else 
		 						{
								 c++;
		 						}
		
								//alert(numbers1[c]);
								currentchannel=arr_category_ch[c];
								fn_play_channel_numpress(currentchannel);
							
								
						} else
						{
					
						if (currentchannel  >= totalchannelnumber) {
                			currentchannel = 1;
						}
						else
						{
							currentchannel ++;
						}	
						//document.getElementById("spkmsg").innerHTML=fn_IPTV_channel_chooser(currentchannel);
					/*	Player.SetTuneURL(fn_IPTV_channel_chooser(currentchannel), this.urlprotocol, this.urlPath);
						fn_display_channel_name(currentchannel); */
						fn_play_channel_fromnumber(currentchannel);
						
						}
					}
						break;				
				case tvKey.KEY_CH_DOWN:
				//document.getElementById("spkmsg").innerHTML="CH DOWN KEY PRESSED";
				
					if ($('.content_right').css('opacity') == "0")					
					{	
						fn_show_banner();
						if (arr_category_ch.length>0)      ////Specific category choosed means while ch- keep rotatin on that category
						{
							
							 if (c <= 0 )
		 					{
			 					c = arr_category_ch.length - 1;			 
		 					}		 
		 					else 
		 					{
			 					c--;
		 					}
		
							//alert(numbers1[c_d]);
								currentchannel=arr_category_ch[c];
								fn_play_channel_numpress(currentchannel);
							
						}else
						{
					
					
						if (currentchannel -1 <= 0 ) {
                		currentchannel = totalchannelnumber;
						}
						else
						{
							currentchannel--;
						}	
						//document.getElementById("spkmsg").innerHTML=fn_IPTV_channel_chooser(currentchannel);
					/*	Player.SetTuneURL(fn_IPTV_channel_chooser(currentchannel), this.urlprotocol, this.urlPath);
						fn_display_channel_name(currentchannel);  */
						fn_play_channel_fromnumber(currentchannel);
						
						}
					}
						break;
			
				case tvKey.KEY_LEFT:	
				 		//fn_tvkey_left_press();
						//document.getElementById("spkmsg").innerHTML="LEFT KEY PRESSED";
						break;
       
				case tvKey.KEY_RIGHT:
						//document.getElementById("spkmsg").innerHTML="RIGHT KEY PRESSED";
						if ($('.content_right').css('opacity') > "0")					
						{	
						fn_tvkey_right_press();
						}
						break;
						
				case tvKey.KEY_UP:
						//document.getElementById("spkmsg").innerHTML="UP KEY PRESSED";
						if ($('.content_right').css('opacity') > "0")					
						{	
				 		fn_tvkey_up_press();
						}
					break;
				case tvKey.KEY_DOWN :
						//document.getElementById("spkmsg").innerHTML="DOWN KEY PRESSED";
						if ($('.content_right').css('opacity') > "0")					
						{	
				  		fn_tvkey_down_press();
						}
						break;
				case tvKey.KEY_RETURN :
  						widgetAPI.blockNavigation(event); /* To Block Return key */
						
						
						if ($('.content_right').css('opacity') > "0")					
						{	
						fn_hide_rightcontent();
						}
					else {
						$('.content_right').hide();
						$('.flipbox-container').hide();
						if (httpvideoisplaying==1)
						{
							stophttpvideo();
						}
						else
							Player.stopVideo();

						window.location = "index.html?fromurl=tv";
						}
  						break;			
				case tvKey.KEY_EXIT:
					//document.getElementById("spkmsg").innerHTML="EXIT KEY PRESSED";
						//// http://stackoverflow.com/questions/178325/testing-if-something-is-hidden-using-jquery **
						//if( $('.content_right').css("display") == 'none' ) 
						widgetAPI.blockNavigation(event); /* To Block Return key */ 
						if ($('.content_right').css('opacity') == "0")
						{							
							if (httpvideoisplaying==1)
							{
								stophttpvideo();
							}
							else
								Player.stopVideo();
							window.location = "index.html?fromurl=tv";	
							//document.getElementById("spkmsg").innerHTML="content_right visible false ";
						}
						else
						{
    						fn_hide_rightcontent();
							//document.getElementById("spkmsg").innerHTML="content_right visible true ";
						}
					
					break;	
				case tvKey.KEY_ENTER:
				
				if (elementLevel === 0) {
					if ($('.content_right').css('opacity') > "0")					
					{	
					c=levelIndices[elementLevel];
					var levelName = $(".content_right ul li .cls_ip_address").eq(levelIndices[elementLevel]).text();
					var var_ip_port = $(".content_right ul li .cls_ip_port").eq(levelIndices[elementLevel]).text();
					var var_ch_name = $(".content_right ul li .chnl_name").eq(levelIndices[elementLevel]).text();
            		levelName = $.trim(levelName);
					var_ip_port= $.trim(var_ip_port);
					
					currentchannel=parseInt($(".content_right ul li .serail_no").eq(levelIndices[elementLevel]).text());
					fn_display_channel_name (currentchannel,var_ch_name);
					/* HTTP VIDEO PLAYING HANDLER */
					document.getElementById("msg").innerHTML="";
					if (httpvideoisplaying == 1)
					{
						stophttpvideo();					
					}

					if (var_ch_name.trim()=='Hotel Information')
					{
						if (isplaying == 1)
							Player.stopVideo();

						fn_play_httpurl('http://192.168.25.2/browser2/samsungdemo.mp4');
						return;
					}				
					httpvideoisplaying=0;
					/* END HTTP VIDEO PLAYING HANDLER */
					Player.SetTuneURL("rtp://" + levelName + ":" + var_ip_port + "|HW", urlprotocol, urlPath);
					}
        		}
     			else if (elementLevel === 1) {
        		//var levelName1 = levelIndices[elementLevel];
				var int_categoryval='';
				var levelName = $(".flipbox-container ul li .sub_chnl").eq(levelIndices[elementLevel]).text();
				levelName=$.trim(levelName);
				int_categoryval=levelIndices[elementLevel];
				//document.getElementById("spkmsg").innerHTML +="<br> CATEGORY   " + levelIndices[elementLevel];				
				
				if (levelName == "ALL CHANNELS") {   
					arr_category_ch=[];
					fn_addlist_onview();					
					$("").myPlugin();					
					$("#all_list").text(levelName);
					categoryContent_UP_flag=1;
					var_category_name=levelName;
        		}
				else  {
					arr_category_ch=[];
					searchCPL(arr_listofchannels, levelName);
					$("").myPlugin();
					levelIndices[1]=int_categoryval;
					//document.getElementById("spkmsg").innerHTML +="<br> value   " + levelIndices[1];		
					$("#all_list").text(levelName);
					var_category_name=levelName;
        		}
        /*		if (levelName1 == 2) {    
					arr_category_ch=[];
					searchCPL(arr_listofchannels, "INTERNATIONAL");
					$("").myPlugin();
					levelIndices[1]=2;			
					$("#all_list").text("INTERNATIONAL");
					var_category_name="INTERNATIONAL";
        		}
        		if (levelName1 == 3) { 
					arr_category_ch=[];
					searchCPL(arr_listofchannels, "NEWS");
					$("").myPlugin();
					levelIndices[1]=3;
					$("#all_list").text("NEWS");
					var_category_name="NEWS";
        		}
        		if (levelName1 == 4) {  
					arr_category_ch=[];
					searchCPL(arr_listofchannels, "REGIONAL");
					$("").myPlugin();
					levelIndices[1]=4;
					$("#all_list").text("REGIONAL");
					var_category_name="REGIONAL";
        		}
        		if (levelName1 == 5) {
            		// Player.SetTuneURL(url4, this.urlprotocol, this.urlPath);
        		}
        		if (levelName1 == 6) {
            
        		}
		*/		
				
			}			
			else if (elementLevel === 2) {
				//fn_rearrange_array();	
        		var levelName1 = levelIndices[elementLevel];
				if (levelName1 == 0) {           
					fn_sorting_array(1);
					$("").mysorting();
					
        		}
				if (levelName1 == 1) {    				
					fn_sorting_array(2);
					$("").mysorting();
					//document.getElementById("msg").innerHTML="Name wise shorting END !!!!: ";
        		}
			}
										
				break;			
			
			case tvKey.KEY_1:
					fn_hide_rightcontent();	
					if (fn_getlength_digit(mychannel)>2)
					{
						break;
					}
					channelnumberidleFrom = new Date();
					mychannel= "" + mychannel + 1 ;
					document.getElementById("id_sp_chnumber").innerHTML=mychannel;
					fn_callfn_setInterval();
				break;

			case tvKey.KEY_2:
					fn_hide_rightcontent();
					if (fn_getlength_digit(mychannel)>2)
					{
						break;
					}
					channelnumberidleFrom = new Date();
					mychannel= "" + mychannel + 2 ;
					document.getElementById("id_sp_chnumber").innerHTML=mychannel;
					fn_callfn_setInterval();
				break;

			case tvKey.KEY_3:
					fn_hide_rightcontent();
					//document.getElementById("spkmsg").innerHTML +="<br> channel    " + mychannel;
					if (fn_getlength_digit(mychannel)>2)
					{
						break;
					}
					channelnumberidleFrom = new Date();
					mychannel= "" + mychannel + 3 ;
					document.getElementById("id_sp_chnumber").innerHTML=mychannel;
					fn_callfn_setInterval();
					//fn_play_channel_fromnumber(currentchannel);
				break;

			case tvKey.KEY_4:
					fn_hide_rightcontent();
					if (fn_getlength_digit(mychannel)>2)
					{
						break;
					}
					channelnumberidleFrom = new Date();
					mychannel= "" + mychannel + 4 ;
					document.getElementById("id_sp_chnumber").innerHTML=mychannel;
					fn_callfn_setInterval();
				break;

			case tvKey.KEY_5:
					fn_hide_rightcontent();
					if (fn_getlength_digit(mychannel)>2)
					{
						break;
					}
					channelnumberidleFrom = new Date();
					mychannel= "" + mychannel + 5 ;
					document.getElementById("id_sp_chnumber").innerHTML=mychannel;
					fn_callfn_setInterval();
				break;
			case tvKey.KEY_6:
					fn_hide_rightcontent();
					if (fn_getlength_digit(mychannel)>2)
					{
						break;
					}
					channelnumberidleFrom = new Date();
					mychannel= "" + mychannel + 6 ;
					document.getElementById("id_sp_chnumber").innerHTML=mychannel;
					fn_callfn_setInterval();
				break;
			case tvKey.KEY_7:
					fn_hide_rightcontent();
					if (fn_getlength_digit(mychannel)>2)
					{
						break;
					}
					channelnumberidleFrom = new Date();
					mychannel= "" + mychannel + 7 ;
					document.getElementById("id_sp_chnumber").innerHTML=mychannel;
					fn_callfn_setInterval();
				break;
			case tvKey.KEY_8:
					fn_hide_rightcontent();
					if (fn_getlength_digit(mychannel)>2)
					{
						break;
					}
					channelnumberidleFrom = new Date();
					mychannel= "" + mychannel + 8 ;
					document.getElementById("id_sp_chnumber").innerHTML=mychannel;
					fn_callfn_setInterval();
				break;
			case tvKey.KEY_9:
					fn_hide_rightcontent();
					if (fn_getlength_digit(mychannel)>2)
					{
						break;
					}
					channelnumberidleFrom = new Date();
					mychannel= "" + mychannel + 9 ;
					document.getElementById("id_sp_chnumber").innerHTML=mychannel;
					fn_callfn_setInterval();
				break;
			case tvKey.KEY_0:
					fn_hide_rightcontent();
					if (fn_getlength_digit(mychannel)>2)
					{
						break;
					}
					channelnumberidleFrom = new Date();
					mychannel= "" + mychannel + 0 ;					
					fn_callfn_setInterval();
					document.getElementById("id_sp_chnumber").innerHTML=mychannel;
				break;		
			
			case tvKey.KEY_HOME:			
					//document.getElementById("test").innerHTML ="HOME Key Pressed  ";
					widgetAPI.blockNavigation(event);
			
					
						$('.content_right').hide();
						$('.flipbox-container').hide();
						if (httpvideoisplaying==1)
						{
							stophttpvideo();
						}
						else
							Player.stopVideo();

						window.location = "index.html?fromurl=tv";					
			break;

			default:
					widgetAPI.blockNavigation(event);
			break;
			
		}
		
}
//});

function fn_display_channel_name (channelnumner1,nameofthechannel) {
	
			//if($(".channelnamenumber").not(':visible'))
			if( $('.channelnamenumber').css("display") == 'none' )
			{
    			$(".channelnamenumber").show();
		 		$(".cls_vertical_divider").show();
		 		$(".cls_ch_number").show();  
			}
	
	 	
		//alert(channelname);		
		document.getElementById("id_sp_chnumber").innerHTML=parseInt(channelnumner1,10);
		//document.getElementById("spkmsg").innerHTML +="<br> fn_display_channel_name currentchannel  " + currentchannel;
		document.getElementById("id_sp_chname").innerHTML=nameofthechannel;//arr_listofchannels[currentchannel-1][1];		
		document.getElementById("id_sp_chcategory").innerHTML=var_category_name;
		
}

function fn_play_channel_fromnumber (channelnumner1) {
	
					if ($(".content_right ul li").length <= 0)
						{
							fn_addlist_onview('add');
							totalchannelnumber=$(".content_right ul li").length;
						}
					
					if (channelnumner1 > totalchannelnumber || channelnumner1 < 0)
					{
						setTimeout(function(){ document.getElementById("msg").innerHTML="";														
												},2000);
								document.getElementById("msg").innerHTML="Channel Not Available!";
						return;
					}
					if (channelnumner1 > 0)
					{
						channelnumner1= channelnumner1 -1;
					}
					
					//document.getElementById("spkmsg").innerHTML +="<br> channelnumner1   " + channelnumner1;
					var levelName = $(".content_right ul li .cls_ip_address").eq(channelnumner1).text();
					var var_ip_port = $(".content_right ul li .cls_ip_port").eq(channelnumner1).text();
					var var_ch_name = $(".content_right ul li .chnl_name").eq(channelnumner1).text();
            		levelName = $.trim(levelName);
					var_ip_port= $.trim(var_ip_port);
					//document.getElementById("spkmsg").innerHTML +="<br> IP   " + levelName;
					//document.getElementById("spkmsg").innerHTML +="<br> PORT   " + var_ip_port;
					var var_ch_number=parseInt($(".content_right ul li .serail_no").eq(channelnumner1).text());
					//document.getElementById("spkmsg").innerHTML +="<br> currentchannel   " + currentchannel;
					fn_display_channel_name (var_ch_number,var_ch_name);
				
					/* HTTP VIDEO PLAYING HANDLER */
					document.getElementById("msg").innerHTML="";
					if (httpvideoisplaying == 1)
					{
						stophttpvideo();					
					}

					if (var_ch_name.trim()=='Hotel Information')
					{
						if (isplaying == 1)
							Player.stopVideo();

						fn_play_httpurl('http://192.168.25.2/browser2/samsungdemo.mp4');
						return;
					}				
					httpvideoisplaying=0;
					/* END HTTP VIDEO PLAYING HANDLER */
					
					Player.SetTuneURL("rtp://" + levelName + ":" + var_ip_port + "|HW", urlprotocol, urlPath);
				
}
var pluginhttp = document.getElementById("pluginSefTV");
var httpvideoisplaying =0;
function fn_play_httpurl(httpurl)
{
//document.getElementById("spkmsg").innerHTML +="<br>http url  "+httpurl;

stophttpvideo(); 
 pluginhttp.Open('Player', '1.112', 'Player');
//pluginhttp.Execute("InitPlayer", 'http://192.168.25.2/browser2/samsungdemo.mp4');
pluginhttp.Execute("InitPlayer", httpurl);
pluginhttp.Execute("SetDisplayArea", 0, 0, 1920, 1080);
pluginhttp.Execute("SetInitialBufferSize", 400*1024);
pluginhttp.Execute("StartPlayback");
httpvideoisplaying=1;
}
function stophttpvideo() {
 	pluginhttp.Execute("Stop");
	pluginhttp.Close();
}
function fn_play_channel_numpress (channelnumner1) {
					
					var var_ch_list = search_ch_num_fromlist(arr_listofchannels, channelnumner1);
					
					if (var_ch_list=='')
					{
						setTimeout(function(){ document.getElementById("msg").innerHTML="";														
												},2000);
								document.getElementById("msg").innerHTML="Channel Not Available!";
						return;
					}
					
					var partsOfStr = var_ch_list.split(',');
					
					var var_ch_name =partsOfStr[1];
					var var_ch_IP =partsOfStr[3];
					var var_ip_port = partsOfStr[4];
            		var_ch_IP = $.trim(var_ch_IP);
					var_ip_port= $.trim(var_ip_port);
					
					currentchannel=partsOfStr[0];
					currentchannel= $.trim(currentchannel);					
					fn_display_channel_name (currentchannel,var_ch_name);
					/* HTTP VIDEO PLAYING HANDLER */
					document.getElementById("msg").innerHTML="";
					if (httpvideoisplaying == 1)
					{
						stophttpvideo();					
					}

					if (var_ch_name.trim()=='Hotel Information')
					{
						if (isplaying == 1)
							Player.stopVideo();

						fn_play_httpurl('http://192.168.25.2/browser2/samsungdemo.mp4');
						return;
					}				
					httpvideoisplaying=0;
					/* END HTTP VIDEO PLAYING HANDLER */
					Player.SetTuneURL("rtp://" + var_ch_IP + ":" + var_ip_port + "|HW", urlprotocol, urlPath);
				
}

function fn_getlength_digit(number) {
    return number.toString().length;
}

function fn_callfn_setInterval() {
	
					if( $('.cls_ch_number').css("display") == 'none' )
					{
    					//$(".channelnamenumber").show();
		 				//$(".cls_vertical_divider").show();
		 				$(".cls_ch_number").show();  
					}
	
					if (boolchannel==true)
					{
						boolchannel=true;							
						clearInterval(chnumberidleInterval);
						chnumberidleInterval=setInterval(Fn_timer_checknumberchannel, channelnumber);
						//document.getElementById("spkmsg").innerHTML +=" ch true   " + chnumberidleInterval;
					}
					else
					{
						boolchannel=true;	
						chnumberidleInterval=setInterval(Fn_timer_checknumberchannel, channelnumber);
						//document.getElementById("spkmsg").innerHTML +=" chnumberidleInterval   " + chnumberidleInterval;
					}

}

var channelnumber = 2000;
var channelnumberidleFrom;
var chnumberidleInterval = undefined;

function Fn_timer_checknumberchannel() {
    var timeElapsed = (new Date()).getTime() - channelnumberidleFrom.getTime();	
    if (timeElapsed >= channelnumber) {
		boolchannel=false;		
		clearInterval(chnumberidleInterval);
		fn_play_channel_numpress(mychannel);
		mychannel='';
    }
	
}

/* Http video playing programs starts here */

	var pluginhttp = document.getElementById("pluginSefTV");
	var httpvideoisplaying =0;
function fn_play_httpurl(httpurl)
{
	stophttpvideo();
	pluginhttp.Open('Player', '1.112', 'Player');
	//pluginhttp.Execute("InitPlayer", 'http://192.168.25.2/browser2/samsungdemo.mp4');
	pluginhttp.OnEvent = onEvent_player;
	pluginhttp.Execute("InitPlayer", httpurl);
	pluginhttp.Execute("SetDisplayArea", 0, 0, 1920, 1080);
	pluginhttp.Execute("SetInitialBufferSize", 400*1024);
	pluginhttp.Execute("StartPlayback");
	httpvideoisplaying=1;
}

function stophttpvideo() {
 	pluginhttp.Execute("Stop");
	pluginhttp.Close();
}
function onEvent_player(event, data1, data2){
	/*if (event != 14)
   		document.getElementById("spkmsg").innerHTML +="<br>onEvent= "+event+" param1: "+data1+" param2: " +data2;*/

   	if (event == 8)
   	{
   		fn_play_httpurl('http://192.168.25.2/browser2/samsungdemo.mp4');
   		return;
	}

   }
/* Http video playing programs End here */

