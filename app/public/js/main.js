$(function () {
  $(".tw_face").click(function (el) {
    $("#guess").attr("value", el.id);
    $("#guess_form").submit();
  });
});
