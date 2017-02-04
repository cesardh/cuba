function launchFullScreen(element) {
  if(element.requestFullScreen) {
    element.requestFullScreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen();
  }
}

function apagarAudio(audio){
  var reducir = setInterval(function(){
    audio.volume -= 0.03;
    if (audio.volume <= 0.09) {
      audio.pause()
      clearInterval(reducir)
    }
  }, 70)
}
function encenderAudio(audio, maxVol = 1){
  audio.play();
  var aumentar = setInterval(function(){
    audio.volume += 0.04;
    if (audio.volume >= maxVol - 0.08) {
      clearInterval(aumentar)
      audio.volume = maxVol;
    }
  }, 70)
}

$(document).ready(function() {
  var $audioFondo = $("audio")[0];
  $(window).load(function(){
    $("#load").delay(1000).fadeOut(1000);
    $audioFondo.play();
    $("#principal").css('opacity', 1);
  });
  animaciones()
  var arrSeccion = [$("#cap1"), $("#d1"), $("#d2")];
  for (var i = 0; i < arrSeccion.length; i++) {
    arrSeccion[i].niceScroll({
      scrollspeed: 200, mousescrollstep: 20, horizrailenabled: false, zindex: -1
    });
  }

  var $capBtn = $('nav>ul>li'),
      $sec = $('#principal>.seccion'),
      enAnim = false,
      videoPaisaje = $("#paisaje")[0],
      videoViaje = $("#viajeVid")[0],
      audioCantar = $("#cantando")[0]
  audioCantar.volume = 0
  videoPaisaje.volume = 0

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
      if(index == 1){videoViaje.play()}else{videoViaje.pause()}

      if(index == 2){encenderAudio(audioCantar)}
      else if (!audioCantar.paused){
        apagarAudio(audioCantar)
      }

      if((index == 3 || index == 4 )&& videoPaisaje.paused){encenderAudio(videoPaisaje, 1)}
      else if ((index < 3 || index > 4) && !videoPaisaje.paused){
        apagarAudio(videoPaisaje)
      }
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

  var $explorar = $(".intro .mns-auxiliar");
  $explorar.click(function(event) {
    $(this).parent().fadeOut('slow');
  });

  var $loc = $(".locacion", "#cap2")
  var $inv = $(".invest", "#cap2")
  $(".cerrar", "#cap2").click(function(event) {
    $loc.removeClass('abrir');
    $inv.removeClass('mostrar');
  });
  $loc.click(function(event) {
    var index = $loc.index(this)
    $loc.removeClass('abrir');
    $inv.removeClass('mostrar');
    $(this).addClass('abrir');
    $($inv[index]).addClass('mostrar')
  })


  var $dibujo = $(".elem", "#cap3")
  var $resultado = $(".resultado", "#cap3")
  $dibujo.click(function(event) {
    var index = $dibujo.index(this);
    $($resultado[index]).addClass('mostrar');
    $capBtn.fadeOut('fast');
  });
  $resultado.click(function(event) {
    $(this).removeClass('mostrar')
    $capBtn.fadeIn('fast');
  });

  //CHINITO
  var $punto = $(".punto"),
      $mask = $(".fondo"),
      revelable = [true, true, true],
      countOpacity = [0,0,0]

  $punto.mouseenter(function(event) {
    var estePunto = $(this),
        index = $punto.index(this),
        target = $mask[index+1]

    if( revelable[index] === true) {
      $(this).mousemove(function(event) {
        countOpacity[index] += 0.002
        $(target).css('opacity', countOpacity[index])
        var llenar = $(target).css('opacity')
        if (llenar >= 1) {
          $(target).css('filter', 'grayscale(0)');
          $(target).css('-webkit-filter', 'grayscale(0)');
          estePunto.css({
            pointerEvents: 'none',
            opacity: 0
          });
          revelable[index] = false
        }
      });
    }
  })
  $punto.mouseleave(function(event) {
    if (!revelable[0] && !revelable[1] && !revelable[2]) {
      mostrarHistoria()
    }
  });
  function mostrarHistoria(){
    $($mask[0]).css('-webkit-filter', 'grayscale(0)');
    $($mask[0]).css('filter', 'grayscale(0)');
    $(".inicial").css('-webkit-filter', 'brightness(0.5)');
    $(".inicial").css('-webkit-filter', 'brightness(0.5)');
    $(".historia", "#cap4").delay(2000).fadeIn(3000)
  }

  //DEBATE
  var $debateBtn = $(".titulo", "#cap5")
  var debateSlide = $(".contenedor", "#cap5")
  $debateBtn.click(function(event) {
    var index = $debateBtn.index(this)
    switch (index) {
      case 0:
        debateSlide.toggleClass('izquierda');;
        break;
      case 1:
        debateSlide.toggleClass('derecha');
        break;

    }
  });

//TESORO
  var tCerrar = $(".cerrar", "#cap6")
      $base = $(".indicador", "#cap6")
      $secTesoro = $(".envoltura", "#cap6")
      $inputFeliz = $("input[name=feliz]", "#cap6")
      $listaFeliz = $("ul", "#feliz")
      $agregarFeliz = $(".agregar", "#cap6")
  var $fCerrar = $("nada");
      indexActual = 0
      items = 0

  $($base[5]).hide()
  tCerrar.hide()
  $secTesoro.hide()
  tCerrar.click(function(event) {
    $($secTesoro, ".indicador .abrir").hide()
    $base.removeClass('abrir')
    $(this).hide()
    $secTesoro.hide()
    $capBtn.fadeIn("fast")
  });
  $base.on("click", function(event) {
    var index = $base.index(this)
    indexActual = index
    tCerrar.delay(500).fadeIn(500)
    $(this).addClass('abrir')
    $($secTesoro[index]).fadeIn(500).css('display', 'flex');
    $capBtn.fadeOut("fast")
  });
  var $li
  $inputFeliz.keypress(function(event) {
    if (event.key == "Enter") {
      $agregarFeliz.click();
    }
  }).focus()

  $agregarFeliz.click(function(event) {
    var val = $($inputFeliz[0]).val()

    if (items < 10 && val != "") {
      $listaFeliz.append('<li>' + val + '<span>X</span></li>')
      $($inputFeliz[0]).val("").focus()
      $li = $("li", "#feliz")
      items = $li.length
    }

    $fCerrar = $("li span", "#feliz")
    $($ok[0]).find('span').html(items)

    $fCerrar.one("click", function(event) {
      $(this).parent().remove()
      items = $("li", "#feliz").length
      console.log(items);
      $($ok[0]).find('span').html(items)
      if (!$($ok[0]).hasClass('bloq')) {
        $($ok[0]).addClass('bloq')
        $inputFeliz.attr('disabled', false);
      }
    });

    if (items > 9) {
      $($ok[0]).removeClass('bloq')
      $inputFeliz.attr('disabled', true);
    }
  });

  var $actividad = $(".actividad", "#cap6")
  // $actividad.click(function(event) {
  //   if (okActivo[indexActual] && $($ok[indexActual]).hasClass('bloq')) {
  //     $($ok[indexActual]).removeClass('bloq')
  //     .find('h1').html("Click to finish")
  //   }
  // });

  var $ok = $(".ok", "#cap6")
      $apren = $(".aprendizaje", "#cap6")
      terminados = 0
      cosasFeliz = []
      dibujoComunidad = ""
      dibujoMundo = ""
  $ok.click(function(event) {
    $($apren[indexActual]).css('opacity', '1');
    $(this).addClass('listo')
    $(this).find('h1').html("Saved")
    $($base[indexActual]).addClass('terminado')
    $($base[indexActual]).removeClass('girar')
    terminados ++

    if (terminados == 5) {
      $($(base)[5]).show()
    }

    switch (indexActual) {
      case 0:
        $agregarFeliz.fadeOut(500)
        $inputFeliz.animate({opacity: 0}, 500)
        $($listaFeliz).css('pointerEvents', 'none');
        $li = $("li", "#feliz")
        for (var i = 0; i < $li.length; i++)
        {
          var sCosa = $($li[i]).text().toString()
          cosasFeliz.push(sCosa.substr(0, sCosa.length - 1))
        }
        break;

      case 1:
        dibujoComunidad = $("#defaultCanvas0")[0]
                            .getContext('2d')
                            .canvas
                            .toDataURL()
        $("#mapaComunidad").html(
          "<img src='"+ dibujoComunidad + "'>"
        )
        $($actividad[indexActual])
        .find('#mapaComunidad')
        .css('cursor', 'default');
        okActivo[1] = false
        okActivo[3] = false
        dibujoContar = 0
        break

      case 2:
        break
      case 3:
        dibujoMundo = $("#defaultCanvas1")[0]
                            .getContext('2d')
                            .canvas
                            .toDataURL()
        $("#mapaMundo").html(
          "<img src='"+ dibujoMundo + "'>"
        )
        console.log(dibujoMundo);
        $($actividad[indexActual])
        .find('#mapaMundo')
        .css('cursor', 'default');
        okActivo[1] = false
        dibujoContar = 0
        break
      default:
    }

  });



});
