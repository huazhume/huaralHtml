{

	var t = n = 0,
		count;
	$(document).ready(function() {
			// 获取图片标签长度
			count = $("#banner_list a").length;
			// 不是当前显示的图片隐藏
			$("#banner_list a:not(:first-child)").hide();
			// 点击下面的1234按钮，切换图片
			$("#banner li").click(function() {
				var i = $(this).text() - 1;
				n = i;
				if(i >= count) return;
				// 淡入淡出效果
				$("#banner_list a").filter(":visible").fadeOut(500).parent().children().eq(i).fadeIn(1000);
				// 响应点击
				$(this).toggleClass("on");
				// 切换按钮的时候让上一个按钮回归原来的样式
				$(this).siblings().removeAttr("class");
			});
			t = setInterval("showAuto()", 6000);
			// $("#banner").hover(function() {
			//         clearInterval(t)
			//     },
			//     function() {
			//         t = setInterval("showAuto()", 3000);
			//     });
		})
		// 自动轮播
	function showAuto() {
		n = n >= (count - 1) ? 0 : ++n;
		$("#banner li").eq(n).trigger('click');
	}
	var searchState = 0;
	window.onload = function() {
		//search
		document.getElementById('searchBtn').onclick = function() {
				var search = document.getElementById('searchdiv');
				search.style.visibility = (searchState ? "hidden" : "visible")
				searchState = !searchState;
				document.getElementById('searchValue').focus();
				var rightBar = document.getElementById('rightBar');

		};
			//rightBar
		var rightBarState = 0;
		document.getElementById('rightBarBtn').onclick = function() {
			var rightBar = document.getElementById('rightBar');
			//  			rightBar.style.marginLeft = rightBarState?'92%':'100%';
			//  			rightBarState = !rightBarState;
			rightBar.style.animationDuration = '0.7s';
			rightBar.style.animationFillMode = 'forwards';
			if(rightBarState) {
				rightBar.style.animationName = 'rightBarToRight';
				console.log("i am coming");
				if(isIE()){
					rightBar.style.marginLeft = '100%';
				}

			} else {
				rightBar.style.animationName = 'rightBarToLeft';
				console.log("i am coming");
				if(isIE()){
					rightBar.style.marginLeft = '92%';
				}
			}
			rightBarState = !rightBarState;
		};
		function isIE() { //ie?
			if(!!window.ActiveXObject || "ActiveXObject" in window)
				return true;
			else
				return false;
		}
		//点击navgationBarTag
		var tagState = 0;
		var tagsArr = new Array();
		tagsArr = document.getElementsByClassName('nav_tag');
		var nav_tag = tagsArr[0];
		nav_tag.style.backgroundColor = '#000';
		for(var i = 0;i<tagsArr.length;i++){
			var tag = tagsArr[i];
			tag.index = i;
			tag.onclick = function(){
				if(this.index >0){
//					alert("进来了1");
					if(!tagState){
						tagState = 1;
					}
				}else{
					tagState = 0;
				}
				document.getElementById('tag_content').style.display = (tagState ? 'block' : 'none');
				document.getElementById('index_content').style.display = (tagState ? 'none' : 'block');
				nav_tag.style.backgroundColor = '#333';
				this.style.backgroundColor = '#000';
				nav_tag = this;
			}
		}
	}
}