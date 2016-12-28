// function launchFullScreen(element) {
//   if(element.requestFullScreen) {
//     element.requestFullScreen();
//   } else if(element.mozRequestFullScreen) {
//     element.mozRequestFullScreen();
//   } else if(element.webkitRequestFullScreen) {
//     element.webkitRequestFullScreen();
//   }
// }
// launchFullScreen(document.documentElement);

$(document).ready(function() {
  var $capBtn = $('nav>ul>li')
  var $sec = $('#principal>.seccion')
  console.log($sec);

  $capBtn.click(function(e) {
    var index = $capBtn.index(this);
    $(".activo").stop().slideUp(2000).toggleClass('activo');
    $($sec[index]).stop().slideDown(2000).toggleClass('activo');

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
