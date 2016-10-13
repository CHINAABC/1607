$(function(){

	
	//利用cookies，在文档最顶部的”你好“，后面显示用户名
	var sayhallo = getcookie("halloname");
	if(sayhallo){
		$("#hallo").html(sayhallo).css("color","red");
	}
	//利用cookies，在文档顶部显示购物车中的商品数量
	if(getcookie("shopCarNum")){
		$(".car_number").html(getcookie("shopCarNum"));		
	}
	//当有人登陆时，把之前“请登录”改为退出
	if($("#hallo").html()){
		$("#change").html("退出！");
	}	
	//调用轮播图插件，给导航栏下的大广告图添加轮播效果
	$('.bosscarousel').xcarousel({
		type:'fade',//轮播方式为透明度
		buttons:false//不显示前后按钮
	});
	
	//调用轮播图插件给厨具用品和电脑办公类商品中添加轮播图
	$(".temember .moveImg").xcarousel({
		type:'fade',//轮播方式为透明度
		width:560,//轮播图宽度
		height:150,//轮播图高度
		page:false,//不显示页码
		buttons:false//不显示前后按钮
	});
	//掉用轮播图插件给手机数码、礼品箱包、服饰鞋帽、个护化妆四个盒子添加轮播图
	$(".member .moveImgx").xcarousel({
		type:'fade',//轮播方式为透明度
		width:270,//轮播图宽度
		height:480,//轮播图高度
		page:false,//不显示页码
		buttons:false//不显示前后按钮
	});
	//当鼠标滑进所有商品分类下的列表时，其对应的二级菜单就显示出来
	//取到导航栏下的轮播图的左边的所有商品分类的列表，给其添加mouseenter事件
	$(".carousel").children(".biglist").children(".list").on("mouseenter",function(){
		//当鼠标移进li时，给这个li改变样式
		$(this).css({"background":"white","border":"3px solid rgb(227,0,29)","border-right":"3px solid white","z-index":"2"});
		//把对应的li中的字体改成红色
		$(this).children("span").css("color","rgb(148,2,6)");
		//让二级菜单显示
		$(this).children(".small_list").css("display","block");
	}).on("mouseleave",function(){//当鼠标离开li时
//		把之前加的样式去掉
		$(this).css({"background":"","border":"","width":"125px"});
		//把li中的字体颜色给回白色
		$(this).children("span").css("color","white");
		//让对应的二级菜单隐藏
		$(this).children(".small_list").css("display","none");
	});
	
	//给秒杀那一行li添加点击事件，当点击li时下面就显示其相应的商品
	$(".near").children(".left_tj").children(".miaosha").children("li").on("click",function(){
		//给点击的li添加样式，去掉未被点击的li的样式
		$(this).addClass("guanggao").siblings().removeClass();
		//让点击的li显示，它的兄弟隐藏
		$(".near").children(".left_tj").children(".neirong").eq($(this).index()).css("display","block").siblings(".neirong").css("display",'none');
	});
	
	//ajax请求
	$.ajax({
		//请求地址
		url:"json/guanggao.json",
		//请求成功发送并成功返回数据时
		success:function(res){
			//创建一个div和一个ul
			var $div = $("<div/>");
			var $ul = $("<ul/>");
			//遍历res对象中phone里的数据
			$.each(res.phone,function(idx,item){
				//创建新li
				var $li = $("<li/>");
				//创建a标签并添加href属性，a标签中包含创建的img，给img添加属性src，属性值为json文件中的图片地址，将a添加到li中
				$("<a/>").attr({href:"html/goodsDetailsPage.html"}).append($("<img/>").attr({src:item.url})).appendTo($("<dt/>")).appendTo($li);
				//创建dd标签存放json文件中的商品名称，将dd添加到li中
				$("<dd/>").html(item.name).appendTo($li);
				//创建span标签存放json文件中的商品价格，将span添加到li中
				$("<span/>").html(item.price).appendTo($li);
				//将li添加到ul中
				$li.appendTo($ul);
			});
			//将ul添加到div中
			$ul.appendTo($div);
			//给div添加一个id名，方便取到
			$div.attr({id:"right_blist"});
			//将div添加到手机数码的盒子中
			$div.appendTo($(".member").eq("1"));
			
			//创建一个div和一个ul
			var $div = $("<div/>");
			var $ul = $("<ul/>");
			//遍历res对象中phone里的数据
			$.each(res.phone,function(idx,item){
				//创建新li
				var $li = $("<li/>");
				//创建a标签并添加href属性，a标签中包含创建的img，给img添加属性src，属性值为json文件中的图片地址，将a添加到li中
				$("<a/>").attr({href:"html/goodsDetailsPage.html"}).append($("<img/>").attr({src:item.url})).appendTo($("<dt/>")).appendTo($li);
				//创建dd标签存放json文件中的商品名称，将dd添加到li中
				$("<dd/>").html(item.name).appendTo($li);
				//创建span标签存放json文件中的商品价格，将span添加到li中
				$("<span/>").html(item.price).appendTo($li);
				//将li添加到ul中
				$li.appendTo($ul);
			});
			//将ul添加到div中
			$ul.appendTo($div);
			//给div添加一个id名，方便取到
			$div.attr({id:"right_blist"});
			//将div添加到礼品箱包的盒子中
			$div.appendTo($(".member").eq("2"));
			
			//创建一个div和一个ul
			var $div1 = $("<div/>");
			var $ul1 = $("<ul/>");
			//遍历res对象中computer里的数据
			$.each(res.computer,function(idx,item){
				//创建新li
				var $li = $("<li/>");
				//创建a标签并添加href属性，a标签中包含创建的img，给img添加属性src，属性值为json文件中的图片地址，将a添加到li中
				$("<a/>").attr({href:"html/goodsDetailsPage.html"}).append($("<img/>").attr({src:item.url})).appendTo($("<dt/>")).appendTo($li);
				//创建dd标签存放json文件中的商品名称，将dd添加到li中
				$("<dd/>").html(item.name).appendTo($li);
				//创建span标签存放json文件中的商品价格，将span添加到li中
				$("<span/>").html(item.price).appendTo($li);
				//将li添加到ul中
				$li.appendTo($ul1);
			});
			//将ul添加到div中
			$ul1.appendTo($div1);
			//给div添加一个id名，方便取到
			$div1.attr({id:"right_blist2"});
			//将div添加到厨具用品的盒子中
			$div1.appendTo($(".temember").children(".member1"));
			
			//创建一个div和一个ul
			var $div1 = $("<div/>");
			var $ul1 = $("<ul/>");
			//遍历res对象中computer里的数据
			$.each(res.computer,function(idx,item){
				//创建新li
				var $li = $("<li/>");
				//创建a标签并添加href属性，a标签中包含创建的img，给img添加属性src，属性值为json文件中的图片地址，将a添加到li中
				$("<a/>").attr({href:"html/goodsDetailsPage.html"}).append($("<img/>").attr({src:item.url})).appendTo($("<dt/>")).appendTo($li);
				//创建dd标签存放json文件中的商品名称，将dd添加到li中
				$("<dd/>").html(item.name).appendTo($li);
				//创建span标签存放json文件中的商品价格，将span添加到li中
				$("<span/>").html(item.price).appendTo($li);
				//将li添加到ul中
				$li.appendTo($ul1);
			});
			//将ul添加到div中
			$ul1.appendTo($div1);
			//给div添加一个id名，方便取到
			$div1.attr({id:"right_blist2"});
			//将div添加到电脑办公的盒子中
			$div1.appendTo($(".temember").children(".member2"));
			
			//创建一个div和一个ul
			var $div1 = $("<div/>");
			var $ul1 = $("<ul/>");
			//遍历res对象中fushi里的数据
			$.each(res.fushi,function(idx,item){
				//创建新li
				var $li = $("<li/>");
				//创建a标签并添加href属性，a标签中包含创建的img，给img添加属性src，属性值为json文件中的图片地址，将a添加到li中
				$("<a/>").attr({href:"html/goodsDetailsPage.html"}).append($("<img/>").attr({src:item.url})).appendTo($("<dt/>")).appendTo($li);
				//创建dd标签存放json文件中的商品名称，将dd添加到li中
				$("<dd/>").html(item.name).appendTo($li);
				//创建span标签存放json文件中的商品价格，将span添加到li中
				$("<span/>").html(item.price).appendTo($li);
				//将li添加到ul中
				$li.appendTo($ul1);
			});
			//将ul添加到div中
			$ul1.appendTo($div1);
			//给div添加一个id名，方便取到
			$div1.attr({id:"right_blist"});
			//将div添加到服饰鞋帽的盒子中
			$div1.appendTo($(".member").eq("3"));
			
			//创建一个div和一个ul
			var $div1 = $("<div/>");
			var $ul1 = $("<ul/>");
			//遍历res对象中huazhuang里的数据
			$.each(res.huazhuang,function(idx,item){
				//创建新li
				var $li = $("<li/>");
				//创建a标签并添加href属性，a标签中包含创建的img，给img添加属性src，属性值为json文件中的图片地址，将a添加到li中
				$("<a/>").attr({href:"html/goodsDetailsPage.html"}).append($("<img/>").attr({src:item.url})).appendTo($("<dt/>")).appendTo($li);
				//创建dd标签存放json文件中的商品名称，将dd添加到li中
				$("<dd/>").html(item.name).appendTo($li);
				//创建span标签存放json文件中的商品价格，将span添加到li中
				$("<span/>").html(item.price).appendTo($li);
				//将li添加到ul中
				$li.appendTo($ul1);
			});
			//将ul添加到div中
			$ul1.appendTo($div1);
			//给div添加一个id名，方便取到
			$div1.attr({id:"right_blist"});
			//将div添加到个护化妆的盒子中
			$div1.appendTo($(".member").eq("4"));
		}
	});
});