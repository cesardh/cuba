var mcsWidth = $("#mapaComunidad").width()
var mcsHeight = $("#mapaComunidad").height()
var okActivo1 = false


var s1 = function(p){
  var count = 0

  p.setup = function(){
    p.createCanvas(mcsWidth,mcsHeight)
    p.background(255)
  }

  p.draw = function(){
  }

  p.mouseDragged = function(){
    lapiz(p.color(10,50,100))
    if(!okActivo1){
      count += 0.1
    }
    if (count>100) {
      okActivo1 = true
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

var sketch1 = new p5(s1, "mapaComunidad")
