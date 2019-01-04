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
var var_category_name = "All";

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

var show_count=hide_count=0;

var levelIndices = [0, 0];

var activeLevel2Class = ""; 

	var arr_category_ch=[];
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
			TRACE("SEF_EVENT_TYPE.PL_EMP_PLAYER_EVENTS.");
			break;
		case 3: //Main.SEF_EVENT_TYPE.PL_EMP_IPTV_EVENTS:
			TRACE("SEF_EVENT_TYPE.PL_EMP_IPTV_EVENTS.");	
			if(data1 ==  1)//Main.SEF_IPTV_EVENT_PARAM.PL_EMP_IPTV_EVENT_AUDIO_ONLY)
			{
				TRACE("SEF_IPTV_EVENT_PARAM.PL_EMP_IPTV_EVENT_AUDIO_ONLY.");			
			}
			else if(data1 == 2)// Main.SEF_IPTV_EVENT_PARAM.PL_EMP_IPTV_EVENT_VIDEO_ONLY)
			{
				TRACE("SEF_IPTV_EVENT_PARAM.PL_EMP_IPTV_EVENT_VIDEO_ONLY.");			
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
						if ($(".content_right ul li").length <= 0)
						{
							fn_addlist_onview();
						}
						else
						{
							fn_display_rightcontent();
						}
									
						break;
				case tvKey.KEY_CH_UP: 
					//document.getElementById("spkmsg").innerHTML="CH UP KEY PRESSED";
					
					if ($('.content_right').css('opacity') == "0")					
					{	
						fn_show_banner();
						if (arr_category_ch.length>0)
						{
							 if (arr_category_ch.length - 1 <=c)
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
						
						fn_play_channel_fromnumber(currentchannel);
						
						}
					}
						break;				
				case tvKey.KEY_CH_DOWN:
				//document.getElementById("spkmsg").innerHTML="CH DOWN KEY PRESSED";
				
					if ($('.content_right').css('opacity') == "0")					
					{	
						fn_show_banner();
						if (arr_category_ch.length>0)
						{
							
							 if (c <= 0 )
		 					{
			 					c = arr_category_ch.length - 1;			 
		 					}		 
		 					else 
		 					{
			 					c--;
		 					}
		
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
				 		fn_tvkey_up_press();
					break;
				case tvKey.KEY_DOWN :
						//document.getElementById("spkmsg").innerHTML="DOWN KEY PRESSED";
				  		fn_tvkey_down_press();
						break;

				case tvKey.KEY_EXIT:
					//document.getElementById("spkmsg").innerHTML="EXIT KEY PRESSED";
						//// http://stackoverflow.com/questions/178325/testing-if-something-is-hidden-using-jquery **
						//if( $('.content_right').css("display") == 'none' )  
						if ($('.content_right').css('opacity') == "0")
						{							
							//Player.stopVideo();
							//window.location = "index.html";	
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
					c=levelIndices[elementLevel];
            	var levelName = $(".content_right ul li .chnl_name").eq(levelIndices[elementLevel]).text();
            	levelName = $.trim(levelName);
				choose_ip_from_channelname(levelName);
        		}
     			else if (elementLevel === 1) {
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
        	/*	if (levelName1 == 2) {    
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
            
        		}   */
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
			case tvKey.KEY_RETURN:			
					//document.getElementById("test").innerHTML ="HOME Key Pressed  ";
					//widgetAPI.blockNavigation(event);
					
						$('.content_right').hide();
						$('.flipbox-container').hide();
						//Player.stopVideo();
						//window.location = "index.html";
						fn_check_sivendorserver();
					
			break;

			default:
					widgetAPI.blockNavigation(event);
			break;
			
		}
		
}
//});

function fn_check_sivendorserver()
{
				var str_si_vendor_url='http://10.1.0.13:8080/Tajdwaraka-V3/index.html';
				var xmlhttp1 = new XMLHttpRequest();
				if (xmlhttp1) {
					xmlhttp1.onreadystatechange = function() {
						 if (xmlhttp1.readyState == 4 && xmlhttp1.status == 200) 						 
							{	
								Player.stopVideo();
								window.location = "http://10.1.0.13:8080/Tajdwaraka-V3/index.html";
							}
						 else
						 	{ 
							 		setTimeout(function() {
														document.getElementById("msg").innerHTML="";														
												},2000);
								document.getElementById("msg").innerHTML="Server not reachable !";
							}
					}
					//document.getElementById('test').innerHTML += "<br> <p> start the download file one by one.... </p>";					
					xmlhttp1.open("GET", str_si_vendor_url, true);
					xmlhttp1.send();
				}
}

function fn_display_channel_name (channelnumner1) {
	
			//if($(".channelnamenumber").not(':visible'))
			if( $('.channelnamenumber').css("display") == 'none' )
			{
    			$(".channelnamenumber").show();
		 		$(".cls_vertical_divider").show();
		 		$(".cls_ch_number").show();  
			}
	
	 	
		//alert(channelname);
		document.getElementById("id_sp_chnumber").innerHTML=channelnumner1;
		document.getElementById("id_sp_chname").innerHTML=arr_listofchannels[currentchannel-1][1];
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
            		levelName = $.trim(levelName);
					var_ip_port= $.trim(var_ip_port);
					//document.getElementById("spkmsg").innerHTML +="<br> IP   " + levelName;
					//document.getElementById("spkmsg").innerHTML +="<br> PORT   " + var_ip_port;
					currentchannel=parseInt($(".content_right ul li .serail_no").eq(channelnumner1).text());
					//document.getElementById("spkmsg").innerHTML +="<br> currentchannel   " + currentchannel;
					fn_display_channel_name (currentchannel);
					Player.SetTuneURL("rtp://" + levelName + ":" + var_ip_port + "|HW", this.urlprotocol, this.urlPath);
				
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
					
					var var_ch_IP =partsOfStr[3];
					var var_ip_port = partsOfStr[4];
            		var_ch_IP = $.trim(var_ch_IP);
					var_ip_port= $.trim(var_ip_port);
					
					currentchannel=partsOfStr[0];
					currentchannel= $.trim(currentchannel);					
					fn_display_channel_name (currentchannel);
					Player.SetTuneURL("rtp://" + var_ch_IP + ":" + var_ip_port + "|HW", this.urlprotocol, this.urlPath);
				
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


/**
 * @file Audio.js
 * @brief This file is for audio related events
 * @DATE Jan 11 2012
 * 
 * 
 * @author Ruchi Pandey
 * @author Vipulika Sharma
 * @version 1.1
 * 
 * Copyright 2010 by Samsung Electronics, Inc.,
 * 
 * This software is the confidential and proprietary information
 * of Samsung Electronics, Inc. ("Confidential Information").  You
 * shall not disclose such Confidential Information and shall use
 * it only in accordance with the terms of the license agreement
 * you entered into with Samsung.
 */
 
 
 var Audio =
{
    plugin : null
}

Audio.init = function()
{
    var success = true;
    
    this.plugin = document.getElementById("pluginAudio");
    
    if (!this.plugin)
    {
        success = false;
    }

    return success;
}

Audio.setRelativeVolume = function(delta)
{
    this.plugin.SetVolumeWithKey(delta);
    Display.setVolume( this.getVolume() );

}

Audio.getVolume = function()
{
    return this.plugin.GetVolume();
}


/**
 * @file Debug.js
 * @brief This file is for debugging the errors
 * @DATE Jan 11 2012
 * 
 * 
 * @author Ruchi Pandey
 * @author Vipulika Sharma
 * @version 1.1
 * 
 * Copyright 2010 by Samsung Electronics, Inc.,
 * 
 * This software is the confidential and proprietary information
 * of Samsung Electronics, Inc. ("Confidential Information").  You
 * shall not disclose such Confidential Information and shall use
 * it only in accordance with the terms of the license agreement
 * you entered into with Samsung.
 */
 
var DEBUG = true; 

function TRACE(message) {
	if(DEBUG) {
		//alert(message);
		//document.getElementById("msg").innerHTML="Error message: "+ message;
	}
}

/**
 * @file Display.js
 * @brief This file is for displaying different content in Widget
 * @DATE Jan 11 2012
 * 
 * 
 * @author Ruchi Pandey
 * @author Vipulika Sharma
 * @version 1.1
 * 
 * Copyright 2010 by Samsung Electronics, Inc.,
 * 
 * This software is the confidential and proprietary information
 * of Samsung Electronics, Inc. ("Confidential Information").  You
 * shall not disclose such Confidential Information and shall use
 * it only in accordance with the terms of the license agreement
 * you entered into with Samsung.
 */
 
 var Display =
{
    statusDiv : null,
    FIRSTIDX : 0,
    LASTIDX : 4,
    currentWindow : 0,

    SELECTOR : 0,
    LIST : 1,
    
    videoList : new Array()
}

Display.init = function()
{
    var success = true;
    
    this.statusDiv = document.getElementById("status");

    if (!this.statusDiv)
    {
        success = false;
    }
    
    return success;
}



Display.status = function(status)
{
    TRACE(status);
    widgetAPI.putInnerHTML(this.statusDiv, status);
}

Display.setVolume = function(level)
{
    document.getElementById("volumeBar").style.width = level + "%";
    
    var volumeElement = document.getElementById("volumeInfo");

    widgetAPI.putInnerHTML(volumeElement, "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + Audio.getVolume());
}

Display.setVolume1 = function(level)
{
    document.getElementById("volumeBar1").style.width = level + "%";
    
    var volumeElement = document.getElementById("volumeInfo1");

    widgetAPI.putInnerHTML(volumeElement, "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + Audio.getVolume());
}


Display.setDescription = function(description)
{
    var descriptionElement = document.getElementById("description");
    
    widgetAPI.putInnerHTML(descriptionElement, description);
}

Display.hide = function()
{
    document.getElementById("main").style.display="none";
}

Display.show = function()
{
    document.getElementById("main").style.display="block";
}


/* Player code */

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


/* Player code End */

/*  TV_msense_channel_player  JS file code */

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
	
	Player.SetTuneURL(fn_IPTV_channel_chooser(currentchannel), this.urlprotocol, this.urlPath);
	
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
		Player.SetTuneURL(fn_IPTV_channel_chooser(currentchannel), this.urlprotocol, this.urlPath);
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
					Player.SetTuneURL(fn_IPTV_channel_chooser(currentchannel), this.urlprotocol, this.urlPath);
				}  		 
			 break;
			 
		case 126 :
			var sourceObj = eval ("(" + data + ")");  
			//to check if source change event i.e. 126 is received ans source changed is 48
			//document.getElementById('test').innerHTML += "<br>126 event received "+isplaying;
			if(parseInt(sourceObj.parm3, 10) == 48 && isplaying == 0 && powerState == 1) {
				
				Player.SetTuneURL(fn_IPTV_channel_chooser(currentchannel), this.urlprotocol, this.urlPath);				
			}
		break;
		
		 default:
		 break;
		 
		}
}


function fn_IPTV_channel_chooser (channelnum1) {
	/* TAJ MOVIES */
	 	if(channelnum1=== 1) 
		{
			return "rtp://225.0.0.1:1234|HW"; 
		}
		if(channelnum1=== 2) 
		{
			return "rtp://225.0.0.2:1234|HW"; 
		}
		if(channelnum1=== 3) 
		{
			return "rtp://225.0.0.3:1234|HW"; 
		}
	/* ENGLISH NEWS */	
		if(channelnum1=== 4) 
		{
			return "rtp://225.0.0.5:1234|HW"; 
		}
		if(channelnum1=== 5) 
		{
			return "rtp://225.0.0.4:1234|HW"; 
		}
		if(channelnum1=== 6) 
		{
			return "rtp://225.0.0.6:1234|HW"; 
		}
	/* HINDI NEWS */
	if(channelnum1=== 7) 
		{
			return "rtp://225.0.0.7:1234|HW"; 
		}
		if(channelnum1=== 8) 
		{
			return "rtp://225.0.0.8:1234|HW"; 
		}
		if(channelnum1=== 9) 
		{
			return "rtp://225.0.0.9:1234|HW"; 
		}
}



function choose_ip_from_channelname (channelname) {
		//alert(channelname);
				/* TAJ MOVIES */
            	if (channelname === "HOTEL INFO") {					
               		currentchannel=1;
					fn_display_channel_name (currentchannel);
					Player.SetTuneURL(fn_IPTV_channel_chooser(currentchannel), this.urlprotocol, this.urlPath);
            	}
				if (channelname === "DW TV") {   
					currentchannel=2;
					fn_display_channel_name (currentchannel);
					Player.SetTuneURL(fn_IPTV_channel_chooser(currentchannel), this.urlprotocol, this.urlPath);
            	}
				if (channelname === "NHK WORLD") { 
					currentchannel=3;
					fn_display_channel_name (currentchannel);
					Player.SetTuneURL(fn_IPTV_channel_chooser(currentchannel), this.urlprotocol, this.urlPath);
            	}
				/* ENGLISH NEWS */
            	if (channelname === "RUSSIA TODAY") {
					
               		currentchannel=4;
					fn_display_channel_name (currentchannel);
					Player.SetTuneURL(fn_IPTV_channel_chooser(currentchannel), this.urlprotocol, this.urlPath);
            	}
				if (channelname === "INDIA NEWS") {
               		currentchannel=5;
					fn_display_channel_name (currentchannel);
					Player.SetTuneURL(fn_IPTV_channel_chooser(currentchannel), this.urlprotocol, this.urlPath);
            	}
				if (channelname === "RISHTEY") {
               		currentchannel=6;
					fn_display_channel_name (currentchannel);
					Player.SetTuneURL(fn_IPTV_channel_chooser(currentchannel), this.urlprotocol, this.urlPath);
            	}
				if (channelname === "HEADLINES TODAY") {
               		currentchannel=7;
					fn_display_channel_name (currentchannel);
					Player.SetTuneURL(fn_IPTV_channel_chooser(currentchannel), this.urlprotocol, this.urlPath);
            	}
				if (channelname === "AL JAZEERA") {
               		//Player.SetTuneURL(url5, this.urlprotocol, this.urlPath);
            	}
				/* HINDI NEWS */
            	if (channelname === "NDTV INDIA") {
					
               		//Player.SetTuneURL(url5, this.urlprotocol, this.urlPath);
            	}
				if (channelname === "ABP NEWS") {
               		//Player.SetTuneURL(url5, this.urlprotocol, this.urlPath);
            	}
				if (channelname === "AAJ TAK") {
               		//Player.SetTuneURL(url5, this.urlprotocol, this.urlPath);
            	}
				if (channelname === "DD NEWS") {
               		//Player.SetTuneURL(url5, this.urlprotocol, this.urlPath);
            	}
				if (channelname === "ZEE NEWS") {
               		//Player.SetTuneURL(url5, this.urlprotocol, this.urlPath);
            	}
				/* BUSINESS NEWS */
            	if (channelname === "NDTV PROFIT") {
					
               		//Player.SetTuneURL(url5, this.urlprotocol, this.urlPath);
            	}
				if (channelname === "ZEE BUSINESS") {
               		//Player.SetTuneURL(url5, this.urlprotocol, this.urlPath);
            	}
				if (channelname === "CNBC 18") {
               		//Player.SetTuneURL(url5, this.urlprotocol, this.urlPath);
            	}
				

	}

/*  End TV_msense_channel_player  JS file code */


// JavaScript Document

//https://suite.io/mark-alexander-bain/19by2aa    *************************** Site reference

var arr_listofchannels= [];
var arr_listofchannels_cp= [];
/*  var arr_listofchannels= [
    ["1", "HOTEL INFO", "TAJ TV"],["2", "DW TV", "INTERNATIONAL"],["3", "NHK WORLD", "INTERNATIONAL"],
	["4", "RUSSIA TODAY", "INTERNATIONAL"],["5", "INDIA NEWS", "NEWS"],["6", "RISHTEY", "REGIONAL"] ];   
 */ 
  arr_listofchannels_cp = arr_listofchannels;

function fn_rearrange_array () {
	
	arr_listofchannels= arr_listofchannels_cp;
 /*	arr_listofchannels= [
    					 ["1", "HOTEL INFO", "TAJ TV"],["2", "DW TV", "INTERNATIONAL"],["3", "NHK WORLD", "INTERNATIONAL"],
	["4", "RUSSIA TODAY", "INTERNATIONAL"],["5", "INDIA NEWS", "NEWS"],["6", "RISHTEY", "REGIONAL"] ];  */
}


var arr_sport1;

//document.getElementById('sel_planet').onchange = sel_category_onchange;

function fn_addlist_onview () {
			
			clear_list("id_chnl_list");
			var ul="";

			for(var i = 0; i < arr_listofchannels.length; i++) {
    		var cube = arr_listofchannels[i];
			var columns="";
			var str="";
			sArr = [];
    		for(var j = 0; j < cube.length; j++) {
      
				sArr[j] =cube[j];
		
    		}
			str = sArr.join(",");
			var partsOfStr = str.split(',');
	
	 		
	 		ul +=	'<li ><a href="#" id="chnl_tv1"><img src="images/spacer.png"  alt="" /></a><div class="serail_no">' + partsOfStr[0] + '</div> \
	        				<div class="chnl_name">' + partsOfStr[1] + '</div><div class="cls_cate_name">' + partsOfStr[2] + '</div> \
							<div class="cls_ip_address">' + partsOfStr[3] + '</div><div class="cls_ip_port">' + partsOfStr[4] + '</div><br /></li>';
	
			}


			$('.class_chnl_list').append(ul);
			elementLevel=0;
			levelIndices[elementLevel]=0;
			$( ".cls_cate_name" ).hide();
			$( ".cls_ip_address" ).hide();
			$( ".cls_ip_port" ).hide();
			$(".content_right ul li").removeClass("highlight2");
			$(".content_right ul li").eq(levelIndices[elementLevel]).addClass("highlight2");


			$(".content_right ul").each(function(){
  			var max = 7
  			if ($(this).find("li").length > max) {
    		$(this)
      			.find('li:gt('+max+')')
      			.hide() 
			} 
			});  


				$(".content_right").animate({ opacity: 0.9 }, 500, "swing");
				$(".content_right").animate({ right: "0.6%" }, 300);
				flipboxContent_hide_flag=1;

}

function clear_list (list) {

			var list = document.getElementById(list);
			while( list.hasChildNodes() ) {
					list.removeChild( list.lastChild );
			}

}


function sel_category_onchange (myselect) {

		clear_list("class_chnl_list");

		switch (myselect) {
			case 0:  //English News
				arr_sport1 = new Array ("NDTV", "CNN","IBN");
				fn_addlist_onview();
				break;
			case 1: //Hindi News
				arr_sport1 = new Array ("Hindi NDTV", "hindi news","hindi news1");
				fn_addlist_onview();
				break;
			case 2: //Sports
				arr_sport1 = new Array ("Star Sports", "Sony 6","Star Sports HD","Star Sports1","Sony Max");
				fn_addlist_onview();
				break;
			case 3: //Movies
				arr_sport1 = new Array ("star Movie", "Sony Fix","Sun Movies");
				fn_addlist_onview();
				break;
			case 10: //All channels
				fn_addlist_onview();
				break;
			case 22: //Sorting list view
				arr_sport1 = new Array ("Number", "Name");
				fn_add_sorting_list_onview();
				break;
		}

}

/* Dynamic Category page */
var arr_category;

function fn_addcategorylist_onview () {
			clear_list("id_category_ul");
			arr_category = new Array ("ALL CHANNELS", "TAJ TV","INTERNATIONAL","HINDI NEWS", "REGIONAL");

			var li_category="";
			for(var i=0; i < arr_category.length; i++) {
					li_category += '<li class="sub_highlight"> \
                                <div class="sub_serial"> \
                                    +</div> \
                                <div class="sub_chnl">' + arr_category[i] + '</div> \
                                <br /> \
                            </li>' ;
			}
			$('.class_category_ul').append(li_category);
			$( ".sub_serial" ).hide();
}

/* Function to Display Sorting list Item */

function fn_add_sorting_list_onview () {
			clear_list("id_sorting_ul");
			arr_sport1 = new Array ("Number", "Name");
			var ul_sorting="";
			for(var i=0; i < arr_sport1.length; i++) {
	       				ul_sorting += '<li class="sub_highlight"> \
                                		<div class="sub_serial"> \
                                    	+</div> \
                                		<div class="sub_chnl">' + arr_sport1[i] + '</div> \
                                		<br /> \
                            			</li>' ;
			}
			$('.class_sorting_ul').append(ul_sorting);
}
/* Search Category from list */
function searchCPL(what, find){
			clear_list("id_chnl_list");
			var ul_of_search_category="";
    		for(var i= 0, L= what.length; i<L; i++){
        		if(what[i][2]=== find) 
				{
		  			var cube = what[i];
					var columns="";
					var str="";
					sArr = [];
    				for(var j = 0; j < cube.length; j++) {
						sArr[j] =cube[j];
    				}
					str = sArr.join(",");
					var partsOfStr = str.split(',');
					arr_category_ch.push(partsOfStr[0]);
	 					ul_of_search_category +=	'<li ><a href="#" id="chnl_tv1"><img src="images/spacer.png"  alt="" /></a><div class="serail_no">' + partsOfStr[0] + '</div> \
	        										<div class="chnl_name">' + partsOfStr[1] + '</div><div class="cls_cate_name">' + partsOfStr[2] + '</div> \
													<div class="cls_ip_address">' + partsOfStr[3] + '</div><div class="cls_ip_port">' + partsOfStr[4] + '</div><br /></li>';
				}		
    }
   
				$('.class_chnl_list').append(ul_of_search_category);
			elementLevel=0;
			levelIndices[elementLevel]=0;
			$( ".cls_cate_name" ).hide();
			$( ".cls_ip_address" ).hide();
			$( ".cls_ip_port" ).hide();
			$(".content_right ul li").removeClass("highlight2");
			$(".content_right ul li").eq(levelIndices[elementLevel]).addClass("highlight2");
			$(".content_right").animate({ opacity: 0.9 }, 500, "swing");
			$(".content_right").animate({ right: "0.6%" }, 300);
			flipboxContent_hide_flag=1;
}

/* Sorting Array */

function fn_sorting_array (num1) {
	//WITH FIRST COLUMN (Number wise)
	  if(num1=== 1) 
		{
			//fn_rearrange_array();			
     		arr_listofchannels = arr_listofchannels.sort(function(a,b) {
      		return a[0] - b[0];	 
				
    		});
			//sel_category_onchange(10);
			fn_addlist_onview();
		}
		//WITH SECOND COLUMN (name wise)
	  if(num1=== 2) 
		{
			arr_listofchannels = arr_listofchannels.sort(function(a,b) {
 			//return a[1] > b[1];	
			return a[1] > b[1] ? 1 : -1;
 			});
			fn_addlist_onview();
			//sel_category_onchange(10);		
		}
	}
/* End sorting */	

/* Display Right content */

function fn_display_rightcontent () {
				$(".content_right").animate({ opacity: 0.9 }, 500, "swing");
				$(".content_right").animate({ right: "0.6%" }, 300);
				
}
	
/* Display HIDE RIGHT content */

function fn_hide_rightcontent () {
					$(".content_right").animate({ right: "-55%" }, 200, function() { 
																				 
					$(".content_right ul li").removeClass("highlight2");
            		$(".content_right ul li").eq(levelIndices[elementLevel]).addClass("highlight2");
            		$('.flipbox-container').css("opacity", 0);
				    $('.flipboxContent').css("opacity", 0);
					$('.content_right').css("opacity", 0);
            		elementLevel = 0;
            		levelIndices[1] = 0;
					flipboxContent_hide_flag=0;
        			});
					
				
				
}

/* HIDE channel banner */

function fn_hide_banner () {
			
			$(".bottom_pannel").hide();
				
}

/* DISPLAY channel banner */

function fn_show_banner () {
	
			if( $('.bottom_pannel').css("display") == 'none' )
			{			
			$(".bottom_pannel").show();
			}
				
}

/* Search Category from list */
function search_ch_num_fromlist(what, find){			
			
    		for(var i= 0, L= what.length; i<L; i++){
        		if(what[i][0]=== find) 
				{
		  			var cube = what[i];
					var columns="";
					var str="";
					sArr = [];
    				for(var j = 0; j < cube.length; j++) {
						sArr[j] =cube[j];
    				}
					str = sArr.join(",");					
					return str;
				}	
				
    	}
   
   return '';
			
}


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
				 
							 if (levelIndices[elementLevel] === 8)
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
				
				$(".content_right ul").each(function(){  
					var max = 7
  					if ($(this).find("li").length-1 > max) {
    					$('li').siblings(0).hide();
					}					
				});  
			
				
				$(".content_right ul").each(function(){
  					var max = 7
  					if ($(this).find("li").length >= max) {
    					$(this)
      					.find('li:gt('+max+')')
      					.show()
					}
				});  
				
				
				
            } else {
                levelIndices[elementLevel]--;
             
            }
			
			 if (levelIndices[elementLevel] <= 8) {
		    //if ((".content_right ul li:visible").length <= 8) {
				 
				 if (levelIndices[elementLevel] === 8)
				 {
					 show_count=levelIndices[elementLevel];
					 hide_count=totalsubmenu;
				 }
				 else
				 {
					$(".content_right ul").each(function(){
  						var max = 7
  						if ($(this).find("li:visible").length > max) {
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
        } else if (elementLevel === 1) {

            if (activeLevel2Class !== "") {
                $("." + activeLevel2Class + " ul li").removeClass("sub_highlight");
                if (levelIndices[elementLevel] - 1 < 0) {
                    levelIndices[elementLevel] = 0;
                } else {
                    levelIndices[elementLevel]--;
                }
                $("." + activeLevel2Class + " ul li").eq(levelIndices[elementLevel]).addClass("sub_highlight");
            }
        }
		else if (elementLevel === 2) {

            if (activeLevel2Class !== "") {
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