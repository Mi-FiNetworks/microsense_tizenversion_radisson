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

