var mcsWidth = $("#mapaComunidad").width()
    mcsHeight = $("#mapaComunidad").height()
    dibujoContar = 0
    okActivo = false
    canvasTesoro = false
    descargarCanvas = false

var s1 = function(p){

  p.setup = function(){
    var cnv = p.createCanvas(mcsWidth,mcsHeight)
    p.background(255)
  }

  p.mouseDragged = function(){
    lapiz(p.color(10,50,100))
    if(!okActivo[1]){
      dibujoContar += 0.18
    }
    if (dibujoContar>100) {
      okActivo = true
    }
  }

  var lapiz = function(color){
    p.stroke(color)
    p.strokeWeight(3)
    p.strokeJoin(p.ROUND)
    p.strokeCap(p.ROUND)
    p.line(
      p.pmouseX, p.pmouseY,
      p.mouseX, p.mouseY
    )
  }
}
var s2 = function(c){
  var img
  var textura
  var comunidad = new Image
  var mundo = new Image
  var mx, my, cnv, canvas1
  primeraVez = true

  c.preload = function(){
    img = c.loadImage("../images/tesororesultado.png")
    textura = c.loadImage("../images/tesororesultado-back.png")
  }

  c.setup = function(){
    canvas1 = c.createCanvas(1500,1000)
    cnv = document.getElementById("defaultCanvas2").getContext("2d")
  }
  var count = 0
  c.draw = function(){
    if (descargarCanvas == true) {
      c.saveCanvas(canvas1, "myTreasure", "jpg")
      descargarCanvas = false
    }
    if (canvasTesoro && primeraVez) {
      count ++
      if (count > 60) {
        primeraVez = false
      }
      mundo.src = dibujoMundo
      comunidad.src = dibujoComunidad
      mundo.onload = function(){
        c.push()
        c.translate(1167, 533)
        c.rotate(0.07)
        cnv.drawImage(mundo,0,0)
        c.pop()
        c.push()
        c.translate(841, 743)
        c.rotate(-0.19)
        c.scale(0.9)
        cnv.drawImage(comunidad,0,0)
        c.pop()
        c.image(img,0,0,1500,1000)
        c.textSize(22)
        c.fill(255, 215, 176)
        c.textFont("Open Sans")
        c.textAlign(c.LEFT)
        c.text(cartaTexto, 60, 316, 430, 940)
        for (var i = 0; i < cosasFeliz.length; i++) {
          var linea = i * 40
          c.text("- " + cosasFeliz[i], 530, 346 + linea)
        }
        c.textFont("Love Ya Like A Sister")
        c.textSize(35)
        c.textAlign(c.CENTER)
        c.text(palabrasTiempos[0], 1034, 322)
        c.text(palabrasTiempos[1], 1340, 322)
        c.text(palabrasTiempos[2], 1190, 450)
        c.image(textura,0,0,1500,1000)
      }
    }
  }
}


var sketch1 = new p5(s1, "mapaComunidad");
var sketch2 = new p5(s1, "mapaMundo");
var sketch3 = new p5 (s2, "tesoro")
