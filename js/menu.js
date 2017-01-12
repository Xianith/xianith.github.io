//  $(document).ready(function(){
//     $("#nav-mobile").html($("#nav-main").html());
//     $("#nav-trigger span").click(function(){
//         if ($("nav#nav-mobile ul").hasClass("expanded")) {
//             $("nav#nav-mobile ul.expanded").removeClass("expanded").slideUp(250);
//             $(this).removeClass("open");
//         } else {
//             $("nav#nav-mobile ul").addClass("expanded").slideDown(250);
//             $(this).addClass("open");
//         }
//     });
// });

$('#navbar a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
})

$(document).ready(function(){
  $("#free").click(function() {

      console.log('lolz');
    	// console.log($(this));
    	$(".show").each(function() {
    		$(this).replaceWikth('<a href="#" class="show">'+ $(this).text() + '</a>')
    	});

    	console.log($(this).text());
    	$(this).replaceWith('<b class="show">TUR'+ $(this).text() + '</b>');
    });
});

