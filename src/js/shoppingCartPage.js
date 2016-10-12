$(function(){
	//利用cookies，在文档最顶部的”你好“，后面显示用户名
	var sayhallo;
	if(getcookie("halloname")){
		$("#hallo").html(getcookie("halloname")).css("color","red");
	}
	//利用cookies，在文档顶部显示购物车中的商品数量
	//获取cookies，用JSON.parse将其转成对象数组
	var shopCarNum;
	if(getcookie("cookie1")){
		shopCarNum = JSON.parse(getcookie("cookie1"));
		$(".car_number").html(shopCarNum.length);		
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
	//问题：如果var goods_data = JSON.parse(getcookie("cookie1"));回报错（"Uncaught SyntaxError: Unexpected end of input"）为啥呢？？？
	
	//遍历获取到的cookies
	$.each(goods_data, function(idx,item) {
		//创建tr,用来显示cookies中的商品信息
		var $tr = $("<tr/>");
		//问题：在上面已经给table中的td添加过样式了，为什么在这里（不行）用不上？？？
		$("<td/>").css({"width":"360px"}).html(item.title).appendTo($tr);
		$("<td/>").css({"width":"100px"}).html(item.price).appendTo($tr);
		$("<td/>").css({"width":"100px","color":"rgb(217,0,0)"}).html(item.price2).appendTo($tr);
		$("<td/>").css({"width":"169px"}).html(item.goodsNum).appendTo($tr);
		$("<td/>").css({"width":"100px","color":"red","font-weight":"bold"}).html(item.price2).appendTo($tr);
		//创建一个a标签，存放“取消订购”，给其添加id,后面点击 “取消订购” 时，会将其所对应的商品删除掉。
		var $a = $("<a/>").attr({href:"#",id:"remove"}).html("取消订购");
		$("<td/>").css({"width":"100px","border-right":"none"}).html($a).appendTo($tr);
		//将创建的tr添加到table中，让其能在页面中显示
		$tr.appendTo("#otab");
	});
	
	//取到清空购物车按钮，添加点击事件
	$("#null").on("click",function(){
		//选中购物车中所有商品，将其删除
		$("#otab tr").eq("0").siblings("tr").empty();	
	});
	//取消订购单个商品。取到 “取消订购” 按钮，添加点击事件
	$("#remove").on("click",function(){
		//选中对应的商品并删除。
		$(this).parents("tr").empty();
	});
	
});
