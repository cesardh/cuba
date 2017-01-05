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

  $(".seccion").niceScroll({
    scrollspeed: 200, mousescrollstep: 20, horizrailenabled: false
  });

  var $capBtn = $('nav>ul>li');
  var $sec = $('#principal>.seccion');
  var enAnim = false;

  $capBtn.click(function(e) {
    if(!enAnim && !$(this).hasClass('activo'))
    {
      enAnim = true
      var index = $capBtn.index(this);
      $capBtn.removeClass('activo');
      $(this).addClass('activo');
      $(".seccion.activo").stop().slideUp(2000).toggleClass('activo');
      $($sec[index]).stop().slideDown(2000, function(){enAnim=false}).toggleClass('activo');
    //   $(".seccion.activo")
    //     .toggleClass('activo')
    //     .velocity({
    //       scaleX: 0,
    //       opacity: 0
    //     }, {
    //       duration: 2000,
    //       display: "none"
    //     });
    //
    //   $("#cap"+index+"")
    //     .velocity({
    //       scaleX: 1,
    //       opacity: 1
    //     }, {
    //       duration: 2000,
    //       display: "block",
    //       complete: function(){enAnim=false}
    //     })
    //     .toggleClass('activo');
    }
  });

  $("#retratos div").click(function(event) {
    $(this).find('p').css({
      opacity: 1,
      top: "0%"
    });
  })
  .mouseleave(function(event) {
    $(this).find('p').css({
      opacity: 0,
      top: "-100%"
    });
  });;

});
