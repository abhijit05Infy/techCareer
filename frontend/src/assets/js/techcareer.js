
$(".click-video").click(function(){
  console.log("video clicked");
                $(this).fadeOut();
                $( ".feature iframe").delay( 400 ).fadeIn();
});


$("#myNavmenu ul a").click(function(){ $('#myNavmenu').offcanvas('hide'); });