$(function () {
  $(".tw_face").click(function (el) {
    $("#guess").attr("value", el.toElement.id);
    $("#guess_form").submit();
  });
});
