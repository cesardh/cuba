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
function apagarAudio(audio){
  var reducir = setInterval(function(){
    audio.volume -= 0.02;
    if (audio.volume <= 0.05) {
      audio.pause()
      clearInterval(reducir)
    }
  }, 100)
}
function encenderAudio(audio){
  audio.play();
  var aumentar = setInterval(function(){
    audio.volume += 0.02;
    if (audio.volume >= 0.95) {
      clearInterval(aumentar)
      audio.volume = 1;
    }
  }, 100)
}

$(document).ready(function() {
  var $audioFondo = $("audio")[0];
  $(window).load(function(){
    $("#load").delay(1000).fadeOut(1000);
    $audioFondo.play();
  });
  animaciones()

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
      $($sec[index]).stop()
      .slideDown(2000, function(){
        enAnim=false
      })
      .toggleClass('activo');
      if (index > 1 && !$audioFondo.paused) {
        apagarAudio($audioFondo)
      }else if($audioFondo.paused && index <= 1){
        encenderAudio($audioFondo)
      }
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
  });

  var $video_p3 = $('#cap1-p3 video')[0]
  $video_p3.volume = 0;
  $("#cap1").scroll(function(){
    var vol = $video_p3.volume
    if ($("#cap1-p3").hasClass('actAudio') && vol < 0.3) {
      vol += 0.005
    }else if (vol >= 0.05) {
      vol -= 0.005
      if (vol <= 0.05) {vol = 0}
    }
    $video_p3.volume = vol
  });

});
