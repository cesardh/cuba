var mcsWidth = $("#mapaComunidad").width()
    mcsHeight = $("#mapaComunidad").height()
    dibujoContar = 0
    okActivo = [false,false,false,false,false,false]

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
      okActivo[1] = true
      okActivo[3] = true
    }
  }

  var lapiz = function(color){
    p.stroke(color)
    p.strokeWeight(5)
    p.strokeJoin(p.ROUND)
    p.strokeCap(p.ROUND)
    p.line(
      p.pmouseX, p.pmouseY,
      p.mouseX, p.mouseY
    )
  }
}


var sketch1 = new p5(s1, "mapaComunidad");
var sketch2 = new p5(s1, "mapaMundo");
