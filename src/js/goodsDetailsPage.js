jQuery(function($){
	//选中要放大镜功能的div 调用放大镜插件
	$('#fdImg').xzoom({position:"right"});
	
	//利用cookies，在文档最顶部的”你好“，后面显示用户名
	var sayhallo;
	if(getcookie("halloname")){
		$("#hallo").html(getcookie("halloname")).css("color","red");
	}
	//利用cookies，在文档顶部显示购物车中的商品数量
	if(getcookie("shopCarNum")){
		$(".car_number").html(getcookie("shopCarNum"));		
	}
	
	$("#PCar").css("cursor","pointer");
	
	//实现加入购物车功能    用cookie方法    当点击立即购买或者加入购物车时就设置cookies
	//购物车中要显示商品的：商品名称、商品的市场价格、商品在本商城价格、数量等
	var oshop = document.getElementById("shop");//获取（要加点击事件）存放立即购买的盒子
	var opcar = document.getElementById("PCar");//获取（要加点击事件）存放加入购物车的盒子
	var oyaya = document.getElementsByClassName("yaya");//获取存放商品名称的盒子
	var otprice = document.getElementById("tprice");//获取存放商品的市场价格的盒子
	var obprice = document.getElementById("bprice");//获取存放商品在本商城价格的盒子
	var ogoodsNum = document.getElementById("goodsNum");//获取购买商品的数量的盒子
	
	//定义一个存放cookies的变量
	var cookie1;
	
	//给加入购物车添加点击事件
	opcar.onclick = function(){
		var goodsname = oyaya[0].innerHTML;//获取商品名称
		var goodstprice = otprice.innerHTML;//获取该商品的市场价格
		var goodsbprice = obprice.innerHTML;//获取该商品在本商城的价格
		var goodsNum = ogoodsNum.value;//获取购买商品的数量
		
		//在设置cookies前，先判断原来有没有cookies
		if(getcookie("cookie1")){
			//如果原来的cookie1中有数据，就获取原来的cookie1并将其转成对象数组，然后再将其赋给cookie1
			cookie1 =JSON.parse(getcookie("cookie1"));
			//往cookie1后追加获取到的商品的数据
			cookie1.push({"title":goodsname,"price":goodstprice,"price2":goodsbprice,"goodsNum":goodsNum});
		}else{
			//如果原来的cookie1中没有数据，则让cookie1等于一个空数组
			cookie1 = [];
			//往cookie1后追加获取到的商品的数据
			cookie1.push({"title":goodsname,"price":goodstprice,"price2":goodsbprice,"goodsNum":goodsNum});
		}
		//设置cookies
		var d = new Date;//新建日期
		d.setDate(d.getDate() + 365);//设置cookies存放的时间
		//设置cookies，因为cookies中的数据只能以字符串的形式存放，所以要用JSON.stringify将cookie1装成字符串形式
		//后面那一杠是为了防止跨域时出现错误
	    setcookie("cookie1",JSON.stringify(cookie1),d,"/");
	}
	
	//立即购买按钮
	oshop.onclick = function(){
		var goodsname = oyaya[0].innerHTML;//获取商品名称
		var goodstprice = otprice.innerHTML;//获取该商品的市场价格
		var goodsbprice = obprice.innerHTML;//获取该商品在本商城的价格
		var goodsNum = ogoodsNum.value;//获取购买商品的数量
		
		//在设置cookies前，先判断原来有没有cookies
		if(getcookie("cookie1")){
			//如果原来的cookie1中有数据，就获取原来的cookie1并将其转成对象数组，然后再将其赋给cookie1
			cookie1 =JSON.parse(getcookie("cookie1"));
			//往cookie1后追加获取到的商品的数据
			cookie1.push({"title":goodsname,"price":goodstprice,"price2":goodsbprice,"goodsNum":goodsNum});
		}else{
			//如果原来的cookie1中没有数据，则让cookie1等于一个空数组
			cookie1 = [];
			//往cookie1后追加获取到的商品的数据
			cookie1.push({"title":goodsname,"price":goodstprice,"price2":goodsbprice,"goodsNum":goodsNum});
		}
		//设置cookies
		var d = new Date;//新建日期
		d.setDate(d.getDate() + 365);//设置cookies存放的时间
		//设置cookies，因为cookies中的数据只能以字符串的形式存放，所以要用JSON.stringify将cookie1装成字符串形式
		//后面那一杠是为了防止跨域时出现错误
	    setcookie("cookie1",JSON.stringify(cookie1),d,"/");
	}
	//选择商品颜色
	$(".color").children("p").on('click',function(){
		$(this).css({"background":"red","color":"white"}).siblings("p").css({"background":"","color":""});
	});
	//选择商品尺码
	$(".size").children("p").on('click',function(){
		$(this).css({"background":"red","color":"white"}).siblings("p").css({"background":"","color":""});
	});
	//右边底部的东西
	$(".ourList").children("li").on("click",function(){
		$(this).addClass("comeon").siblings().removeClass();
		$(".question").children("div").eq($(this).index()).css({"display":"block"}).siblings("div").css({"display":"none"});
	});
	
});