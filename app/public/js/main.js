jQuery.fn.shake = function() {
  this.each(function(i) {
    $(this).css({ "position": "relative" });
    for (var x = 1; x <= 2; x++) {
      $(this).animate({ left: -25 }, 10).animate({ left: 0 }, 50).animate({ left: 25 }, 10).animate({ left: 0 }, 50);
    }
  });
  return this;
};

$(function () {
  $("#content").load("/quiz", bindFaces);
});

function bindFaces() {
  $(".tw_face").click(function (el) {
    $("#guess").attr("value", el.toElement.id);
    $.ajax({
      type: "POST",
      url: "/guess",
      data: $("#guess_form").serialize(),
      success: function (data, status, request) {
        var correct = request.getResponseHeader("correctnes");
        if (correct === "y") {
          $("#content").html(data);
          bindFaces();
        } else {
          $("#content").shake();
        }
      }
    });
  });
};

