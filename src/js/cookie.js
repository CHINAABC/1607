			//设置cookie
			function setcookie(name,value,expires,path,domain,secure){
				//name = value
				var cookietext = name+"="+value;
				//失效时间expires=date
				if(expires instanceof Date){
					cookietext +=";expires="+expires;
				}
				//path=路径
				if(path){
					cookietext +=";path="+path;
				}
				//domain=域名
				if(domain){
					cookietext +=";domain="+domain;
				}
				//secure=安全设置
				if(secure){
					cookietext +=";secure";
				}
				document.cookie = cookietext;
				return document.cookie;
			}
			//获取cookie
			function getcookie(name){
				var cookie = document.cookie;
				var arr = cookie.split("; ");
				for(var i = 0;i < arr.length;i++){
					var arr2 = arr[i].split("=");
					if(arr2.length >= 2){
						if(arr2[0] == name){
							return arr2[1];
						}
					}
				}
				return "";
			}
			//删除cookie
			function removecookie(name){
				var d = new Date();
				document.cookie=name+"=;expires="+d;
				return document.cookie;
			}