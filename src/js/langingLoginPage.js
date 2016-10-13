
$(function(){
	//利用cookies，在文档最顶部的”你好“，后面显示用户名
	var sayhallo;
	if(getcookie("halloname")){
		$("#hallo").html(getcookie("halloname")).css("color","red");
	}
	//利用cookies，在文档顶部显示购物车中的商品数量
	if(getcookie("shopCarNum")){
		$(".car_number").html(getcookie("shopCarNum"));		
	}
	
	//登录页 、 注册页
	//同样利用cookies，将注册时的用户名和密码等信息存到cookies中，
	//在登陆时：拿输入的用户名和密码和cookies中的用户名和密码相比较相同则可以登录。
	
	var Oregister = document.getElementById("register");//获取左边注册页的大框
	var Oinput = Oregister.getElementsByTagName("input");//取到注册页的输入框
	var Obold = Oregister.getElementsByClassName("bold");//取到注册页输入框后面的提示框（提示文字）
	var Oright_denglu = document.getElementById("cooker");//取到右边登录页的大盒子
	var Omygad = Oright_denglu.getElementsByTagName("input");//取到登录页的输入框
	var Ojump = document.getElementById("jump");//登录页的form的id
	
	//定义一个存放cookies的全局变量
 	var cookie2;
	//定义一个变量存放获取到的cookie2
	var nameWord;
	
 	//注册页
 	//给邮箱的输入框添加获得焦点事件
 	Oinput[0].onfocus = function(){
 		//获得焦点后在其后面的信息提示栏显示内容
 		Obold[0].innerHTML = "填写正确的邮箱";
 	}
 	//给用户名的输入框添加获得焦点事件
 	Oinput[1].onfocus = function(){
 		//获得焦点后在其后面的信息提示栏显示内容
 		Obold[1].innerHTML = "4-20英文字符、数字、“_”的组合。";
 	}
 	//给密码的输入框添加获得焦点事件
 	Oinput[2].onfocus = function(){
 		//获得焦点后在其后面的信息提示栏显示内容
 		Obold[2].innerHTML = "6-16位字符";
 	}
 	//给重复输入密码的输入框添加获得焦点事件
 	Oinput[3].onfocus = function(){
 		//获得焦点后在其后面的信息提示栏显示内容
 		Obold[3].innerHTML = "两次密码必须一致";
 	}
 	
 	//给邮箱的输入框添加失去焦点事件，失去焦点后检测输入框的值是否符合相应的正则表达式，然后在其后面的信息提示栏输出相应文字
	Oinput[0].onblur = function(){
		var fuck = this.value;
		var isture = /^([a-z0-9_\.-]+)@([\d a-z\.-]+)\.([a-z\.]{2,6})$/.test(fuck);
		if(isture){
			Obold[0].innerHTML = "填写对了";
		}else{
			Obold[0].innerHTML = "邮箱不正确";
		}
	}
	
 	
	//给用户名的输入框添加失去焦点事件，失去焦点后检测输入框的值是否符合相应的正则表达式，然后在其后面的信息提示栏输出相应文字
 	Oinput[1].onblur = function(){
		var fuck = this.value;
		var isture = /^\w{4,20}$/.test(fuck);
	 	if(getcookie("cookie2")){
	 		//如果存在cookie2,那么就获取cookies，用JSON.parse将其转成对象数组
	 		nameWord = JSON.parse(getcookie("cookie2"));
	 		//遍历nameWord
	 		$.each(nameWord,function(idx,item){
				//判断输入框中的用户名是否已经存在cookie2中
	 			if(fuck == item.username){
	 				//如果用户名重复了
					Obold[1].innerHTML = "该用户名已注册";
					return false;//跳出遍历，如果没有这句，那么它一会一直检测下去，检测到cookie2中最后一个username，相当于cookie2中只有最后一个username
				}else if(isture){
					Obold[1].innerHTML = "用户名可以注册";
				}else{
					Obold[1].innerHTML = "你输入的用户名不符合规则";
				}
	 		});
	 	//如果一开始没有cookie2就不去检测了	
	 	}else if(isture){
			Obold[1].innerHTML = "用户名可以注册";
		}else{
			Obold[1].innerHTML = "你输入的用户名不符合规则";
		}
 	}
	
	//给密码的输入框添加失去焦点事件，失去焦点后检测输入框的值是否符合相应的正则表达式，然后在其后面的信息提示栏输出相应文字
	Oinput[2].onblur = function(){
		var fuck = this.value;
		var isture = /^.{6,16}$/.test(fuck);
		if(isture){
			Obold[2].innerHTML = "密码合法";
		}else{
			Obold[2].innerHTML = "密码不合法,请确认";
		}
	}
	
	//给重复输入密码的输入框添加失去焦点事件，失去焦点后检测输入框的值是否符合相应的正则表达式，然后在其后面的信息提示栏输出相应文字
	Oinput[3].onblur = function(){
		var fuck = this.value;
		if(fuck == Oinput[2].value){
			Obold[3].innerHTML = "密码一致";
		}else{
			Obold[3].innerHTML = "密码不一致,请确认";
		}
	}
	
	num();//产生随机验证码的函数
	//给存放验证码的盒子添加点击事件，每点一次验证码改变一次
	Oinput[5].onclick = function(){
		num();
	}
	//给注册按钮添加点击事件
	Oinput[6].onclick = function(){
//		比较验证码是否正确
		if(Oinput[4].value != Oinput[5].value){
			alert("验证码不对");
			return false;
		}
		
		//获取用户名和密码，设置cookies		
		var username = Oinput[1].value;
		var pwd = Oinput[2].value; 
		if(getcookie("cookie2")){
			//如果原来的cookie2中有数据，为字符串形式，就获取原来的cookie2并将其转成对象数组，然后再将其赋给cookie2
			cookie2 = JSON.parse(getcookie("cookie2"));
			//往cookie1后追加获取到的用户名和密码
			cookie2.push({"username":username,"password":pwd});
		}else{
			//如果原来的cookie2中没有数据，则让cookie2等于一个空数组
			cookie2 = [];
			//往cookie2后追加获取到的用户名和密码
			cookie2.push({"username":username,"password":pwd});
		}
		var d = new Date;
		d.setDate(d.getDate() + 365);//cookies存放的时间
		//设置cookies，因为cookies中的数据只能以字符串的形式存放，所以要用JSON.stringify将cookie2转成字符串形式
		//后面那一杠是为了防止跨域时出现错误
	    setcookie("cookie2",JSON.stringify(cookie2),d,"/");	
		
		//检测所有信息是否已经填写完毕
		if(Obold[0].innerHTML=="填写对了"&&Obold[1].innerHTML=="用户名可以注册"&&Obold[2].innerHTML=="密码合法"&&Obold[3].innerHTML=="密码一致"){
			Oinput[0].value="";
			Oinput[1].value="";
			Oinput[2].value="";
			Oinput[3].value="";
			Oinput[4].value="";
			alert("恭喜你，注册成功啦");
			return false;
		}else{
			onclick = null;
			ob.innerHTML = "请填写完整的信息";
			return false;
		}
		
	}	
	
	//产生随机四位数字验证码
	function num(){
		var s = "";
		for(var i = 0;i < 4;i++){
			s += parseInt(Math.random() * 10);
		}
		Oinput[5].value = s;
	}
	
	//登录页
 	//给 “我要登陆” 按钮添加点击事件
 	Omygad[2].onclick = function(){
 		//判断是否有注册用户在cookie2中
 		if(getcookie("cookie2")){
 			//如果存在cookie2,那么就获取cookies，用JSON.parse将其转成对象数组
 			nameWord = JSON.parse(getcookie("cookie2"));
 			//遍历
 			$.each(nameWord, function(idx,item) {
 				//检测输入的用户名和密码是否与cookies中的用户名和密码一样。
	 			if(Omygad[0].value == item.username && Omygad[1].value == item.password){	
	 				Ojump.setAttribute("action","../index.html"); 				
	 				var d = new Date;
	 				d.setDate(d.getDate() + 365);//cookies存放的时间
	 				setcookie("halloname",Omygad[0].value,d,"/");//取到刚刚登录的用户名
		 			return false;
				}else if(Omygad[0].value != item.username){
					//当用户名不一样时
					alert("该用户名不存在");	
					return false;
				}else if(Omygad[1].value != item.password){
					//当密码不一样时
					alert("密码不正确");			
					return false;
				}
 			});
 		}else{
 			alert("请先注册用户，谢谢");
 			return false;
 		}
 	}
});
