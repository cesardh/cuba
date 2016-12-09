$(document).ready(function() {
  var $capBtn = $('nav>ul>li')
  var $pr = $('#principal')
  var $sec = $('.seccion')

  $capBtn.click(function(e) {

    if(this == $capBtn[0]){
      $($sec[0]).slideDown(1500)
      $($sec[1]).slideUp(2000)
    }else if (this == $capBtn[1]) {
      $($sec[1]).slideDown(1500)
      $($sec[0]).slideUp(2000)
    }

  });
});
