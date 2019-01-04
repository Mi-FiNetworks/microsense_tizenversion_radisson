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


