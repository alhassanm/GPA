window.addEventListener('DOMContentLoaded', function() {
    QueryLoader2(document.querySelector("body"), {
      barColor: "#efefef",
      backgroundColor: "#111",
      percentage: true,
      barHeight: 1,
      minimumTime: 0,
      fadeOutTime: 2000
    });
  });
  
  $(document).ready(function($){
    $("body").queryLoader2({
            percentage: false,
            backgroundColor: '#465EA6',
            barColor: '#F9F9F9',
            maxTime: 3000,
            barHeight: 3,
            onComplete : function(){
                $("#qLtempOverlay").fadeOut();
            }
    });
});