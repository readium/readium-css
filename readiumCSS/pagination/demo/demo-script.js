document.addEventListener("DOMContentLoaded", function(event) {
  var frame = document.getElementById("page");
  // gap = 40px
  var scrollLeft = function() {
    frame.contentWindow.scrollTo(frame.contentWindow.scrollX - frame.contentWindow.innerWidth - 40, 0);
  };

  var scrollRight = function() {
    frame.contentWindow.scrollTo(frame.contentWindow.scrollX + frame.contentWindow.innerWidth + 40, 0);
  };

  document.body.addEventListener('click', function(e) {
    e.preventDefault();
    if (e.clientX > (window.innerWidth / 2)) {
      scrollRight();
    } else {
      scrollLeft();
    }
  });
  document.body.addEventListener('keydown', function(e) {
    if (e.keyCode == "39") {
      scrollRight();
    } else if (e.keyCode == "37") {
      scrollLeft();
    }
  });
})