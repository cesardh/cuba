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

  $(window).load(function(){
    $("#load").delay(1000).fadeOut(1000);
  });
  
  var $capBtn = $('nav>ul>li')
  var $sec = $('#principal>.seccion')

  $capBtn.click(function(e) {
    var index = $capBtn.index(this);
    $capBtn.removeClass('activo')
    $(this).addClass('activo')
    $(".seccion.activo").stop().slideUp(2000).toggleClass('activo');
    $($sec[index]).stop().slideDown(2000).toggleClass('activo');

  });

});
