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
		$("#change").html("退出！")
	}
	
		//1/懒加载
		
		var $ul = $("<ul/>");
		// 全局配置
		// 页面所有ajax请求都使用这个配置
		$.ajaxSetup({
			url:"../json/listPage2.json",//ajax请求地址
			dataType:'json',
			success:function(res){
				console.log(res);
				//遍历成功返回的数组对象
				$.each(res, function(idx,item) {
					var $li = $("<li/>");//创建li
					$("<a/>").attr({href:"goodsDetailsPage.html"}).append($("<img/>").attr({src:item.url})).appendTo($li);
					$("<p/>").addClass("p1").html("市场价："+item.marketPrice+"元").appendTo($li);
					$("<p/>").addClass("p2").html(item.price+"元").appendTo($li);
					$("<a/>").attr({href:"#"}).addClass("aLink").html(item.name).appendTo($li);
					$("<p/>").addClass("p3").html(item.sellnumber).appendTo($li);
					$li.appendTo($ul);//li添加到ul
				});
				$ul.appendTo($(".rightPage").children(".longList"));//ul添加到文档中的空盒子
			}
		});
		
		$.ajax();
		
//		实现懒加载部分
		$(window).on('scroll',function(){
			// 获取滚动条滚动过的距离
			var scrollTop = $(window).scrollTop();

			// 当差不多滚动到底部时加载更多内容
			if(scrollTop >= $(document).height() - $(window).height() - 100){
				$.ajax();
			}
		});
			
			
			
			//2.分页加载
			// 全局配置
			// 页面所有ajax请求都使用这个配置
//			$.ajaxSetup({
//				url:"/ajax/listPage",
//				dataType:'json',
//				data:{pageNo:1},
//
//				// 同步请求
//				// async:false,
//				success:function(res){
//					console.log(res);
//
//					// 显示分页
//					// 21==>3,52=>6
//					var page = Math.ceil(res.total/res.pageCount);
//					$('#page').empty();
//					for(var i=1;i<=page;i++){
//						var $span = $('<span/>');
//
//						// 添加当前页高亮效果
//						if(i===res.pageNo){
//							$span.addClass('active');
//						}
//
//						$span.html(i).appendTo('#page');
//					}
//
//					// 遍历数据，并写入页面
//					var $ul = $('<ul/>');
//					$.each(res.data,function(idx,item){
//						console.log(item);
//						var $li = $("<li/>");
//						$("<a/>").attr({href:"goodsDetailsPage.html"}).append($("<img/>").attr({src:item.url})).appendTo($li);
//						$("<p/>").addClass("p1").html("市场价："+item.marketPrice+"元").appendTo($li);
//						$("<p/>").addClass("p2").html(item.price+"元").appendTo($li);
//						$("<a/>").attr({href:"#"}).addClass("aLink").html(item.name).appendTo($li);
//						$("<p/>").addClass("p3").html(item.sellnumber).appendTo($li);
//						$li.appendTo($ul);
//					});
//					$('#datalist').empty();
//					$ul.appendTo('#datalist');
//				}
//			});
//
//			$.ajax();
//
//			$('#page').on('click','span',function(){
//				// console.log($(this).text());
//				$.ajax({
//					data:{pageNo:$(this).text()}
//				});
//			});




});
