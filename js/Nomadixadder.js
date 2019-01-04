	

	function createRequestObject() {
			var request_o; //declare the variable to hold the object.
			
			if (window.XMLHttpRequest){
				// If IE7, Mozilla, Safari, etc: Use native object
				request_o = new XMLHttpRequest()
				//request_o = new XMLHttpRequest({mozSystem: true});
			}
			else{
				if (window.ActiveXObject){
				// ...otherwise, use the ActiveX control for IE5.x and IE6
				request_o = new ActiveXObject("Microsoft.XMLHTTP");
				}
			}		
			return request_o; //return the object
		}
		
		//Asyncronous call XMLHttpRequest
			addusertonomdix = function (planid, callback){
				var sd_data, URL, XMLObj
				var result1 = "";
				XMLObj = createRequestObject();
				/*if (window.ActiveXObject)
					XMLObj = new ActiveXObject("Microsoft.XMLHTTP");
				else if (window.XMLHttpRequest)
					XMLObj = new XMLHttpRequest();*/
				sd_data = "MA=001D7DBDDA9E&planid1=" + planid;
				//URL = "http://192.168.2.11/Dotnet2010/web_project/TajV6.1.1/TVadduser.aspx?" + sd_data
				//URL = "../../TVadduser.aspx?" + sd_data
				URL = "http://192.168.2.13:8080/Tajdwaraka2-V1/TVadduser.aspx?" + sd_data
				
				//URL = "http://192.168.2.11/Dotnet2010/web_project/TajV6.1.1/SndRevBytes.aspx?" + sd_data				
				XMLObj.onreadystatechange = function() 
				{
					//document.getElementById("spkmsg").innerHTML = "Loading...";
					if (XMLObj.readyState == 4 && XMLObj.status == 200)
					{
						//result1 = XMLObj.responseText;
						//document.getElementById("spkmsg").innerHTML += "<br> response" + result1;
						//return result1.trim();	
						callback(XMLObj.responseText); // Another callback here
					}
				}
				XMLObj.open("GET",URL,true);
				XMLObj.send();
				//sleep(3000)
				//document.getElementById("spkmsg").innerHTML += "<br> before return" + result1;
				//return result1.trim();	
				
			}
			//Syncronous call XMLHttpRequest
			function getTextSync(planid) {
    			var request = new XMLHttpRequest();  // Create new request
				
				///**** TV MAC ID 
				sd_data = "MA=78ABBB39F2E2&&ueryuser=false&planid1=" + planid;
				////**** TV MAC ID 
				//sd_data = "MA=001D7DBDDA9E&ueryuser=false&planid1=" + planid;
				
				//URL = "../../TVadduser.aspx?" + sd_data
				URL = "http://192.168.2.13:8080/Tajdwaraka2-V1/TVadduser.aspx?" + sd_data
    			request.open("GET", URL, false);     // Pass false for synchronous
    			request.send(null);                  // Send the request now

    			// Throw an error if the request was not 200 OK 
    			if (request.status !== 200){
				document.getElementById("spkmsg").innerHTML += "<br> error" + request.statusText;
				//throw new Error(request.statusText);
				}
    
    			// Throw an error if the type was wrong
    			var type = request.getResponseHeader("Content-Type");
    			if (!type.match(/^text/)) 
				{
					document.getElementById("spkmsg").innerHTML += "<br> type" + request.statusText;
        		//throw new Error("Expected textual response; got: " + type);
				}
    
    			return request.responseText;
			}
			
			
			//Asyncronous call XMLHttpRequest
			queryusernomdix = function (callback){
				var sd_data, URL, XMLObj
				var result1 = "";
				XMLObj = createRequestObject();
				/*if (window.ActiveXObject)
					XMLObj = new ActiveXObject("Microsoft.XMLHTTP");
				else if (window.XMLHttpRequest)
					XMLObj = new XMLHttpRequest();*/
					//PC
				//sd_data = "MA=001D7DBDDA9E&ueryuser=true";
				//TV
				sd_data = "MA=78ABBB39F2E2&ueryuser=true";
				//URL = "http://192.168.2.11/Dotnet2010/web_project/TajV6.1.1/TVadduser.aspx?" + sd_data
				//URL = "../../TVadduser.aspx?" + sd_data
				URL = "http://192.168.2.13:8080/Tajdwaraka2-V1/TVadduser.aspx?" + sd_data
				//URL = "http://192.168.2.11/Dotnet2010/web_project/TajV6.1.1/SndRevBytes.aspx?" + sd_data				
				XMLObj.onreadystatechange = function() 
				{
					//document.getElementById("spkmsg").innerHTML = "Loading...";
					if (XMLObj.readyState == 4 && XMLObj.status == 200)
					{
						//result1 = XMLObj.responseText;
						//document.getElementById("spkmsg").innerHTML += "<br> response" + result1;
						//return result1.trim();	
						callback(XMLObj.responseText); // Another callback here
					}
				}
				XMLObj.open("GET",URL,true);
				XMLObj.send();
				//sleep(3000)
				//document.getElementById("spkmsg").innerHTML += "<br> before return" + result1;
				//return result1.trim();	
				
			}