var showCount = '100';

      $.getJSON(
        "http://www.reddit.com/r/gamedeals/new/.json?jsonp=?",
        function foo(data)
        {
          $.each(
            data.data.children.slice(0, 25), //showCounty -- How can we do more then 30?
            function (i, post) {
            	var title = post.data.title
            	var platform = title.match(/\s*\[.*?\]\s*/g, '');
            	var newtitle = title.replace(/\s*\[.*?\]\s*/g, '');
            	var discount = title.match(/\s*\(.*?\)\s*/g, '');
            	if (discount == null) {
            		discount = '';
            	}

            	var newtitle = newtitle.replace(/\s*\(.*?\)\s*/g, '');

            	var linkflair = '';
            	if (post.data.link_flair_text != null) {
            		linkflair = post.data.link_flair_text
            	}

            	if (post.data.thumbnail == 'nsfw') {
            		$("#reddit-content").append(' <div class="thing"><p class="title"><a class="title old" href="' + post.data.url + '">' + newtitle +'</a></p></div><br></hr>');            
            	} else if (title.toLowerCase().indexOf("free") >= 0 ) {
            		$("#reddit-content").append(' <div class="thing"><p class="title"><a class="title free" href="' + post.data.url + '">' + newtitle +'</a></p></div><br></hr>');  
            	} else {
                $("#reddit-content").append(' <div class="thing"><p class="title"><a class="title" href="' + post.data.url + '">' + newtitle +'</a><div class="discount">' + discount +'</div></p></div><br></hr>' );
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