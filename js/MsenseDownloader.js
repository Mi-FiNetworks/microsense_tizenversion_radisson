
		//declare an array which can take any input from server and download in the destination url.
		var  fileList = [];
		//var  fileList = ["offline.html","style.css","TV_key_css.css","MsenseTVfn.js","jquery-1.9.1.min.js"];
		//var  fileList = ["offline.html","MsenseTVfn.js","MsenseChannelMap.xml"];
		var plugin = null;
		var currentIndex =0;
		var destPath = null;
		var srcURL = null;
		var errorCount = 0;
		var xmlhttp1;

		function Download_onLoad() {
			//document.getElementById("anchor").focus();
			widgetAPI.sendReadyEvent();
			pluginSef = document.getElementById('pluginOjectSef');
			init();
		}
		function init() {
		 plugin = pluginSef;
		 //the onComplete event is a callback function for download result.
		 plugin.OnComplete = 'OnDownloadEvent';
		 currentIndex = 0;
		 //destination place where we can store downloaded files.
		 destPath ="/mtd_down/common/HospitalityBrowser/";
         //source folder (download_files) which we can take input from server
		 srcURL = "http://"+(location.href.split("/"))[2]+ "/Tajdwaraka-V3/downloadfile/";
		 errorCount = 0;
		};


		function fetchServer() {


			if(currentIndex < fileList.length)
			{
				xmlhttp1 = null;
				//document.getElementById('test').innerHTML += "<br> <p> Fetch server..... </p>";

					if (xmlhttp1) {
						xmlhttp1.destroy();
						xmlhttp1 = null;
					}

				xmlhttp1 = new XMLHttpRequest();
				if (xmlhttp1) {
					xmlhttp1.onreadystatechange = function() {
						 if (xmlhttp1.readyState == 4 && xmlhttp1.status == 200)
							{

								if(xmlhttp1.status==404)
								{//url is not found so increment the index and fetch next file contents to be downloaded.
								//document.getElementById('test').innerHTML += "<br> <p> i am in 404..... </p>";
								currentIndex++;
								fetchServer();
								}
								//If url is found ,download the file.
							   startDownloading(fileList);
							}
						 else
						 	{
								///May be Need to to give meesage not success
								tvFunctionUtil._load_end();
							}
					}
					//document.getElementById('test').innerHTML += "<br> <p> start the download file one by one.... </p>";
					xmlhttp1.open("GET", srcURL+fileList[currentIndex], true);
					xmlhttp1.send();
				}
			} else {
				//this.log("[Downloader] Downloading Complete!!!");
				tvFunctionUtil._load_end();
				//document.getElementById('test').innerHTML += "<br> <p> Downloading Complete!!!...." +destPath+"</p>";
			}
	}

	function OnDownloadEvent(param1) {
		//document.getElementById('test').innerHTML += "   OnDownloadEvent....   " ;
	var strList = param1.split('?');

	if (strList[0]=='1000')
		{
			//document.getElementById('test').innerHTML += "<br> <p> Downloading : "+fileList[currentIndex]+"</p>";
			if(strList[1] == '1')
			{
				 //document.getElementById('test').innerHTML += "<p> Downloaded : "+fileList[currentIndex]+"</p>";

				 setTimeout(function() {
						currentIndex++;
						fetchServer();
					},1000);
			}
			else {
				//document.getElementById('test').innerHTML = "DOWNLOAD is FAIled!";
				if(++errorCount == 3) currentIndex++;
				fetchServer();
			}

		}
		// DownRatio : 0~100
		else if (strList[0]==1001 )
		{
		  //document.getElementById('DownReturn').innerHTML = strList[1];
		  //document.getElementById('test').innerHTML += "<br>" + strList[1];
		}
		// Down Speed : Bytes/Sec : It will be reach after Ratio
		else if (strList[0]==1002 )
		{
		 // document.getElementById('DownReturn').innerHTML = strList[1];
		 //document.getElementById('test').innerHTML += "<br>" + strList[1];
		}
	}



	function startDownloading(list) {
		//document.getElementById('test').innerHTML += "<br> <p> i am in downloaing....</p>";
		fileList = list;
		downloadFile();
	}

	function downloadFile() {
		//document.getElementById('test').innerHTML += "<br><p> current index = "+currentIndex+"</p>";
		var fileName = fileList[currentIndex];
        plugin.StartDownFile(srcURL+fileName, destPath+fileName); //This API downloads file asynchronously to the Hotel TV using HTTP or HTTPS protocol.
	}


