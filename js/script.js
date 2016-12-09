$(document).ready(function() {
  var $capBtn = $('nav>ul>li')
  var $pr = $('#principal')
  var $sec = $('.seccion')

  $capBtn.click(function(e) {

    if(this == $capBtn[0]){
      $($sec[0]).stop().slideDown(1500)
      $($sec[1]).stop().slideUp(2000)
    }else if (this == $capBtn[1]) {
      $($sec[1]).stop().slideDown(1500)
      $($sec[0]).stop().slideUp(2000)
    }

  });

  // $("#cap1").scroll(function(){
  // 	var windowHeight = $('.seccion').scrollTop();
  // 	var contenido2 = $(".pruebascroll").offset();
  //   console.log(contenido2, windowHeight);
  // 	contenido2 = contenido2.top;
  //
  // 	if(windowHeight >= contenido2  ){
  // 	   console.log(contenido2)
  // 	}else{
  //     console.log("scroll no está sobre imágen")
  // 	}
	// });
});
