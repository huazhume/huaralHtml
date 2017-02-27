{
	$(document).ready(function() {

		//		$.ajax({
		//			type: "get",
		//			url: "http://huaral.tech:9000/huaralserver/index.php",
		//			async: true,
		////			data: {
		////				'url': "url"
		////			}
		//			dataType : "JSON",
		//			success: function(data, status, xhl) {
		//				console.log(data);
		//				console.log(data.msg_code);
		//				var arrs = data.msg_data;
		//				console.log(arrs);
		//				var siderbar = $(".sidebar");
		//				var div = siderbar.find("div").clone(false);
		//				for(var i = 0;i<arrs.length;i++){
		//					console.log(arrs[i].bookname);
		//					var dom = div.clone(false);
		//					dom.text(arrs[i].bookname);
		//					siderbar.append(dom);
		//				}
		//			}
		//		});
		tagsArr = document.getElementsByClassName('nav_tag');
		$('.nav_tag').click(function() {
			var siderbar = $(".sidebar");
			siderbar.empty();
			var bookname = "";
			switch(this) {
				case tagsArr[0]:

					break;
				case tagsArr[1]:
					bookname = "ios";
					break;
				case tagsArr[2]:
					bookname = "android";
					break;
				case tagsArr[3]:
					bookname = "html5";
					break;
				case tagsArr[4]:
					bookname = "javaee";
					break;
				case tagsArr[5]:
					bookname = "php";
					break;
				case tagsArr[6]:
					bookname = "aboutours";
					break;
			}
			console.log("afsdfadfasd");
			$.ajax({
				type: "get",
				url: "http://221.219.150.145:9000/huaralserver/interface/Booktags.php",
				async: true,
				data: {
					'bookname': bookname
				},
				dataType: "JSON",
				success: function(data, status, xhl) {
					var arrs = data.msg_data[0].booktags;
					console.log(arrs);
					var siderbar = $(".sidebar");
					var box = $('<div class="bookid"></div>');
					box.css({
						'height': '34px',
						'font-size': '13px',
						'color': '#333',
						'vertical-align': 'middle',
						'line-height': '34px',
						'cursor': 'pointer',
						//					'border-radius': '5px'
					});
					selected = 0;
					
					for(var i = 0; i < arrs.length; i++) {
						console.log(arrs[i]);
						var dom = box.clone(true);
						if(i == 0) {
							dom.css({
								'background-color': '#FFF'
							});
						}
						dom.text(arrs[i].description);
						dom[0].index = i;
						siderbar.append(dom);
						
						dom.click(function() {
							$('.bookid')[selected].style.background = '#DCDCDC';
							selected = this.index;
							tagcontent(arrs[this.index].title,bookname);

						});
						dom.hover(function() {
							$(this).css({
								'background-color': '#FFF'
							});
						}, function() {
							//						alert(this.index);
							if(selected != this.index) {
								$(this).css({
									'background-color': '#DCDCDC'
								});
							} else {
								$(this).css({
									'background-color': '#FFF'
								});
							}
						});
					}
					
					//执行默认点击
					tagcontent(arrs[0].title,bookname);
				},
				error: function(data) {

				}

			});

		});

	});

	function tagcontent(tag, name) {
		var sider = $("#tag_content .list");
		var iframe = $(sider[0].contentWindow.document.body);
		iframe.empty();
		$.ajax({
			type: "get",
			url: "http://221.219.150.145:9000/huaralserver/interface/tagcontent.php",
			async: true,
			data: {
				"bookname": name,
				"booktag": tag
			},
			dataType: "JSON",
			success: function(data, status, xhl) {
//				console.log("start");
//				console.log(data);
				var inhtml = data.msg_data[0].bookcontent;
				var box = $(inhtml);
				iframe.append(box);
			},
			error: function(data) {
			console.log(data);
				}

		});
	}

}