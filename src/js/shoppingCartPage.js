$(function(){

	//利用cookies，在文档最顶部的”你好“，后面显示用户名
	var sayhallo;
	if(getcookie("halloname")){
		$("#hallo").html(getcookie("halloname")).css("color","red");
	}

	var shopCarNum = 0;//存放购物车总数量的变量
	//当有人登陆时，把之前“请登录”改为退出
	if($("#hallo").html()){
		$("#change").html("退出！");
	}
		
	
	//获取cookies
	//用table表格列出购物车中的商品
	//找到table下的所有td并对应给上一些样式。因为td的样式不一样，感觉在css那边不好写，在js相对简单点
	var $otd = $("#otab tr").children("td");
	$otd.eq("0").css({"width":"360px"});
	$otd.eq("1").css({"width":"100px"});
	$otd.eq("2").css({"width":"100px"});
	$otd.eq("3").css({"width":"169px"});
	$otd.eq("4").css({"width":"100px"});
	//因为在css中第一行中所有td都给了右边框，并且tr也给了边框，所以在这将最后的td的右边框去掉，
	$otd.eq("5").css({"width":"100px","border-right":"none"});
	
	//获取cookies，用JSON.parse将其转成对象数组
	var goods_data;
	if(getcookie("cookie1")){
		goods_data = JSON.parse(getcookie("cookie1"));		
	}
	//问题：如果var goods_data = JSON.parse(getcookie("cookie1"));会报错（"Uncaught SyntaxError: Unexpected end of input"）为啥呢？？？
	
	var totprice = 0;//存放总价格的变量
	//遍历获取到的cookies
	$.each(goods_data, function(idx,item) {
		//创建tr,用来显示cookies中的商品信息
		var $tr = $("<tr/>");
		//问题：在上面已经给table中的td添加过样式了，为什么在这里（不行）用不上？？？
		$("<td/>").css({"width":"360px"}).html(item.title).appendTo($tr);
		$("<td/>").css({"width":"100px"}).html(item.price).appendTo($tr);
		$("<td/>").css({"width":"100px","color":"rgb(217,0,0)"}).html(item.price2).appendTo($tr);
		$("<td/>").css({"width":"169px"}).html(item.goodsNum).appendTo($tr);
		var subtotal = parseInt(item.price2)*parseInt(item.goodsNum);
		totprice = totprice + subtotal;//计算购物车中总价格
		shopCarNum = shopCarNum + parseInt(item.goodsNum);//设置购物车中商品数量
		$("<td/>").css({"width":"100px","color":"red","font-weight":"bold"}).html(subtotal).appendTo($tr);
		//创建一个td标签,给其添加id,后面点击 “取消订购” 时，会将其所对应的商品删除掉。
		$("<td/>").css({"width":"100px","border-right":"none"}).html("取消订购").css({"cursor":"pointer"}).addClass("removeDoods").appendTo($tr);
		//将创建的tr添加到table中，让其能在页面中显示
		$tr.appendTo("#otab");
	});
	//计算购物车中总价格
	$("#totalPrices").html(totprice);
	//设置购物车中商品数量
	$(".car_number").html(shopCarNum);
	
	var d = new Date;//新建日期
	d.setDate(d.getDate() + 365);//设置cookies存放的时间
	setcookie("shopCarNum",shopCarNum,d,"/");//将shopCarNum存到cookies中
	
	//设置折后价格
	$("#discountPrice").html(0.8*totprice);
	//用一个随机数来给购买商品获得的积分。
	if(totprice == 0){
		$("#integral").html("0");
	}else{
		var inter = parseInt(Math.random()*200+5);
		$("#integral").html(inter);
	}
	
	
	//取到清空购物车按钮，添加点击事件
	$("#null").on("click",function(){
		//选中购物车中所有商品，将其删除
		$("#otab tr").eq(0).siblings("tr").empty();
		//removecookie("cookie1");//用上面的方法删除商品是不能彻底删除的，刷新后会回来。
		//如果用removecookie("cookie1");是能删除的，但是当再添加到购物车就不行了，而且查看cookie时，看到两个cookie1，一个有值，一个没值
		//有值的那个cookie1里面只有你最后加入购物车的值。为啥呢？
	});
	//取消订购单个商品。取到 “取消订购” 按钮，添加点击事件
	$(".removeDoods").on("click",function(){
		//选中对应的商品并删除。
		$(this).closest("tr").empty();
	});
	
});
