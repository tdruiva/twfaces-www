$(function () {
  $(".tw_face").click(function (el) {
    debugger;
    $("#guess").attr("value", el.toElement.id);
    $("#guess_form").submit();
  });
});
