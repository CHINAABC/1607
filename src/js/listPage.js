$(function(){
	//利用cookies，在文档最顶部的”你好“，后面显示用户名
		var sayhallo = getcookie("halloname");
		if(sayhallo){
			$("#hallo").html(sayhallo).css("color","red");
		}
	//利用cookies，在文档顶部显示购物车中的商品数量
	//获取cookies，用JSON.parse将其转成对象数组
	var shopCarNum = JSON.parse(getcookie("cookie1"));
	if(shopCarNum){
		$(".car_number").html(shopCarNum.length);		
	}


		//1/懒加载
//		// 全局配置
//		// 页面所有ajax请求都使用这个配置
//		var $ul = $("<ul/>");
//		$.ajaxSetup({
//			url:"../json/listPage.json",
//			dataType:'json',
//			data:{pageNo:1},
//			success:function(res){
//				console.log(res);
//				$.each(res, function(idx,item) {
//					var $li = $("<li/>");
//					$("<a/>").attr({href:"#"}).append($("<img/>").attr({src:item.url})).appendTo($li);
//					$("<p/>").addClass("p1").html("市场价："+item.marketPrice+"元").appendTo($li);
//					$("<p/>").addClass("p2").html(item.price+"元").appendTo($li);
//					$("<a/>").attr({href:"#"}).addClass("aLink").html(item.name).appendTo($li);
//					$("<p/>").addClass("p3").html(item.sellnumber).appendTo($li);
//					$li.appendTo($ul);
//				});
//				$ul.appendTo($(".rightPage").children(".longList"));
//			}
//		});
//		$.ajax();
//		$(window).on('scroll',function(){
//			// 获取滚动条滚动过的距离
//			var scrollTop = $(window).scrollTop();
//
//			// 当差不多滚动到底部是加载更多内容
//			if(scrollTop >= $(document).height() - $(window).height() - 100){
//				$.ajax();
//			}
//		});
			
			
			
			//2.分页加载
			// 全局配置
			// 页面所有ajax请求都使用这个配置
			$.ajaxSetup({
				url:"/ajax/listPage",
				dataType:'json',
				data:{pageNo:1},

				// 同步请求
				// async:false,
				success:function(res){
					console.log(res);

					// 显示分页
					// 21==>3,52=>6
					var page = Math.ceil(res.total/res.pageCount);
					$('#page').empty();
					for(var i=1;i<=page;i++){
						var $span = $('<span/>');

						// 添加当前页高亮效果
						if(i===res.pageNo){
							$span.addClass('active');
						}

						$span.html(i).appendTo('#page');
					}

					// 遍历数据，并写入页面
					var $ul = $('<ul/>');
					$.each(res.data,function(idx,item){
						console.log(item);
						var $li = $("<li/>");
						$("<a/>").attr({href:"goodsDetailsPage.html"}).append($("<img/>").attr({src:item.url})).appendTo($li);
						$("<p/>").addClass("p1").html("市场价："+item.marketPrice+"元").appendTo($li);
						$("<p/>").addClass("p2").html(item.price+"元").appendTo($li);
						$("<a/>").attr({href:"#"}).addClass("aLink").html(item.name).appendTo($li);
						$("<p/>").addClass("p3").html(item.sellnumber).appendTo($li);
						$li.appendTo($ul);
					});
					$('#datalist').empty();
					$ul.appendTo('#datalist');
				}
			});

			$.ajax();

			$('#page').on('click','span',function(){
				// console.log($(this).text());
				$.ajax({
					data:{pageNo:$(this).text()}
				});
			});




});
