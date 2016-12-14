var showCount = '100';

    $(".show").click(function() {
    	// console.log($(this));
    	$(".show").each(function() {
    		$(this).replaceWikth('<a href="#" class="show">'+ $(this).text() + '</a>')
    	});

    	console.log($(this).text());
    	$(this).replaceWith('<b class="show">TUR'+ $(this).text() + '</b>');
    });

      $.getJSON(
        "http://www.reddit.com/r/gamedeals/new/.json?jsonp=?",
        function foo(data)
        {
          $.each(
            data.data.children.slice(0, 30), //showCounty -- How can we do more then 30?
            function (i, post) {
            	var title = post.data.title
            	var platform = title.match(/\s*\[.*?\]\s*/g, '');
            	var newtitle = title.replace(/\s*\[.*?\]\s*/g, '');
            	var discount = title.match(/\s*\(.*?\)\s*/g, '');
            	if (discount == null) {
            		discount = '';
            	}

              console.log("FARTS");

            	var newtitle = newtitle.replace(/\s*\(.*?\)\s*/g, '');

            	var linkflair = '';
            	if (post.data.link_flair_text != null) {
            		linkflair = post.data.link_flair_text
            	}

            	if (post.data.thumbnail == 'nsfw') {
            		$("#reddit-content").append( ' <b style="color:red; fonze-size:10px">'+ platform +' <a href="' + post.data.url + '">' + newtitle +'</a> '+ discount+'</b><br>');            
            	} else if (title.toLowerCase().indexOf("free") >= 0 ) {
            		$("#reddit-content").append( ' <b style="color:green; font-size:20px" size="20px">'+ platform +' <a href="' + post.data.url + '">' + newtitle +'</a> '+ discount+'</b><br>');  
            	} else {
                $("#reddit-content").append( platform +' <a href="' + post.data.url + '">' + newtitle +'</a> '+ discount+'<br>' );
              }
              // $("#reddit-content").append( post.data.link_flair_text +' <a href="' + post.data.url + '">' + newtitle +'</a> '+ discount+'<br>' );
              // $("#reddit-content").append( '<br>' + post.data.url );
              // $("#reddit-content").append( '<br>' + post.data.permalink );
              // $("#reddit-content").append( '<br>' + post.data.ups );
              // $("#reddit-content").append( '<br>' + post.data.downs );
            }
          )
        }
      )
      .success(function() { /*alert("second success");*/ })
      .error(function() { /*alert("error");*/ })
      .complete(function() { /*alert("complete");*/ });