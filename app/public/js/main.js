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
      success: function (data) {
        $("#content").html(data);
        bindFaces();
      }
    });
  });
};

