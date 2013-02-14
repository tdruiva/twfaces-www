$(function () {
  $('#content').on('oanimationend animationend webkitAnimationEnd', function() {
    $(this).removeClass('error-animation');
  });

  $('#content').load('/quiz', function() {

    $('#content').delegate('.tw_face', 'click', function (e) {
      e.preventDefault();

      $('#guess').attr('value', $(this).attr('id'));

      $.ajax({
        type: 'POST',
        async: false,
        url: '/guess',
        data: $('#guess_form').serialize(),
        success: function (data, status, request) {
          var correct = request.getResponseHeader('correctnes');

          correct === 'y'
            ? $('#content').html(data)
            : $('#content').addClass('error-animation');
        }
      });
    });
  });
});
