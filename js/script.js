$(document).ready(function() {
  var $capBtn = $('nav>ul>li')
  var $pr = $('#principal')
  $capBtn.click(function(e) {
    if(this == $capBtn[0]){
      $pr.scrollTop(0)
    }else if (this == $capBtn[1]) {
      var w = $(window).height()
      $pr.scrollTop(w)
    }
  });
});
