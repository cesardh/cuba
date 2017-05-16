function toggleFullScreen() {
  if ((document.fullScreenElement && document.fullScreenElement !== null) ||
   (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if (document.documentElement.requestFullScreen) {
      document.documentElement.requestFullScreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullScreen) {
      document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  }
}
var muted = false
var $aMuted = $("#muted")
function toggleMuted(){
  muted = !muted
  var audios = $("audio, video")
  for (var i = 0; i < audios.length; i++) {
    $(audios[i])[0].muted = muted
  }
  $aMuted.toggleClass('mute');
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

  $("#in").click(function(event) {
    event.preventDefault()
    $("#info").stop().slideDown(500)
  });
  $("#info").mouseleave(function(event) {
    $(this).stop().slideUp(500)
  });
  $("#sh").click(function(event) {
    event.preventDefault()
    $("#share").stop().slideDown(500)
  });
  $("#share").mouseleave(function(event) {
    $(this).stop().slideUp(500)
  });
  var $capBtn = $('nav>ul>li'),
      $sec = $('#principal>.seccion'),
      enAnim = false,
      videoPaisaje = $("#paisaje")[0],
      videoViaje = $("#viajeVid")[0],
      audioCantar = $("#cantando")[0]
      videoTimelapse = $("#timelapse")[0]
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

      if (index != 7 && index > 1 && !$audioFondo.paused) {
        apagarAudio($audioFondo)
      }else if($audioFondo.paused && (index <= 1 || index == 7)){
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
      if (index == 7) {
        $(cita[0]).delay(200).fadeIn(1000)
        $(".pantalla", "#cap7").delay(2500).animate({opacity: 0}, {
          duration: 2000,
          start: function(){
            videoTimelapse.currentTime = 0
            videoTimelapse.play()
          },
          complete: function(){
            $(this).css('background', 'white');

            $(".efecto", "#cap7").delay(2000).animate({opacity: 0.5}, {
              duration: 2000,
              complete: function(){
                $(".foto", "#cap7").delay(500).fadeIn(1500);
                $(continuar[0]).fadeIn(500);
              }
            })
            $(this).delay(2000).animate({opacity: 1}, 2500)
          }
        })
      }
    }
  });

  //LEARNING
  var cita = $(".frase", "#cap7")
  var continuar = $(".continuar", "#cap7")
  var final = $("#final")
  $(continuar[0]).click(function(event) {
    $(cita[0]).fadeOut({
      duration:500,
      complete: function(){
        $(this).remove()
      }
    })
    $("#learning").delay(700).fadeIn({
      duration: 1000,
      complete: function(){
        $(this).addClass('animar')
      }
    });
    $(this).remove()
    $(continuar[1]).delay(4000).fadeIn(500)
  });
  $(continuar[1]).click(function(event) {
    $("#learning").fadeOut(500)
    $("#learning2").delay(700).fadeIn({
      duration: 500,
      complete: function(){
        $(this).addClass('animar')
      }
    })
    $(this).fadeOut(500)
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

  //FORMULA
  var $dibujo = $(".elem", "#cap3")
  var $resultado = $(".resultado", "#cap3")
  var cerrarFotos = $(".cerrar", "#cap3")
  var $slideFotos = $(".slide", "#cap3" )
  var indexFotos = 0
  cerrarFotos.hide()
  $dibujo.click(function(event) {
    indexFotos = $dibujo.index(this);
    $($resultado[indexFotos]).addClass('mostrar');
    $capBtn.fadeOut('fast');
    cerrarFotos.fadeIn("fast")
  });
  var interScroll
  var mx
  var d = 25
  var $slideBtn = $(".slide>span", "#cap3")
  $slideBtn.mousedown(function(event) {
    var sl = $($slideFotos[indexFotos]).scrollLeft()
    var index = $slideBtn.index(this)
    interScroll = setInterval(function(){

      if (index % 2 == 0) {
        sl -= d
      } else {
        sl += d
      }
      $($slideFotos[indexFotos]).scrollLeft(sl)
      sl = $($slideFotos[indexFotos]).scrollLeft()
    }, 1000/25)
  });
    $slideBtn.mouseup(function(event) {
      clearInterval(interScroll)
    });

  cerrarFotos.click(function(event) {
    $($resultado[indexFotos]).removeClass('mostrar');
    $capBtn.fadeIn('fast');
    cerrarFotos.fadeOut("fast")
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
      $(this).click(function(event) {
        countOpacity[index] += 0.55
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

  var linka = $("a", "#cap4")
  $(linka[1]).click(function(event) {
    $("audio", "#cap4").css('display', 'block');
  });
  $(linka[0]).click(function(event) {
    $(".texto", "#cap4").css('display', 'block');
  });

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
      $detalle = $(".detalle", "#cap6")
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
    $detalle.delay(500).fadeIn(500)
  });
  $base.on("click", function(event) {
    var index = $base.index(this)
    indexActual = index
    tCerrar.delay(500).fadeIn(500)
    $(this).addClass('abrir')
    $($secTesoro[index]).fadeIn(500).css('display', 'flex');
    if (index == 5) {
      $($secTesoro[5]).fadeIn(500).css('display', 'block');
    }
    $capBtn.fadeOut("fast")
    $detalle.fadeOut(500)
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
      $($ok[0]).find('span').html(items)
      if (!$($ok[0]).hasClass('bloq')) {
        $($ok[0]).addClass('bloq')
        $inputFeliz.attr('disabled', false);
      }
    });

    if (items > 9) {
      $($ok[0]).removeClass('bloq')
      $inputFeliz.attr('disabled', true).click();
    }
  });

  var $ppf = $("input", "#ppf")
      ppfLleno = []
  $ppf.keyup(function(event) {
    for (var i = 0; i < $ppf.length; i++) {
      ppfLleno[i] = $($ppf[i]).val()
    }
    if (ppfLleno[0] != "" && ppfLleno[1] != "" && ppfLleno[2] != "") {
      $($ok[indexActual]).removeClass('bloq')
    }
  });
  var $carta = $("textarea", "#carta")
      cartaEsctita = false
  $carta.keyup(function(event) {
    var letras = $(this).val().length
    if (letras > 100) {
      $($ok[indexActual]).removeClass('bloq')
    }
  });

  var $actividad = $(".actividad", "#cap6")
  $actividad.click(function(event) {
    var i = indexActual
    if ((i == 1 || i == 3) && okActivo) {
      $($ok[indexActual]).removeClass('bloq')
    }
    if(
      !$($ok[indexActual]).hasClass('bloq') &&
      !$($ok[indexActual]).hasClass('listo')
    ){
      $($ok[indexActual]).find('h1').html("Click to finish")
    }
  });

  var $ok = $(".ok", "#cap6")
      $apren = $(".aprendizaje", "#cap6")
      terminados = 0
      cosasFeliz = []
      dibujoComunidad = ""
      dibujoMundo = ""
      cartaTexto = ""
      palabrasTiempos = ["","",""]
  $ok.click(function(event) {
    $($apren[indexActual]).css('opacity', '1');
    $(this).addClass('listo')
    $(this).find('h1').html("Saved")
    $($base[indexActual]).addClass('terminado')
    $($base[indexActual]).removeClass('girar')
    terminados ++

    if (terminados == 5) {
      $($base[5]).show()
      canvasTesoro = true
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
        palabrasTiempos = ppfLleno
        $ppf.css('pointerEvents', 'none');
        break
      case 3:
        dibujoMundo = $("#defaultCanvas1")[0]
                            .getContext('2d')
                            .canvas
                            .toDataURL()
        $("#mapaMundo").html(
          "<img src='"+ dibujoMundo + "'>"
        )
        $($actividad[indexActual])
        .find('#mapaMundo')
        .css('cursor', 'default');
        okActivo[1] = false
        dibujoContar = 0
        break
      case 4:
        cartaTexto = $carta.val()
        $carta.css('pointerEvents', 'none');
        break;
      default:
    }
  });
  $("#descargar").click(function(event) {
    descargarCanvas = true
  });

});
