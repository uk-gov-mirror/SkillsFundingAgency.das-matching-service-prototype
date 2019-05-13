/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

$(document).ready(function () {
    window.GOVUKFrontend.initAll()


    $('#provider-search-form').submit(function () {
        if ($("#provider-search-main").val().indexOf("10001234") > -1) {
            $('#provider-search-results').removeClass('govuk-visually-hidden');
            $('#provider-search-no-results').addClass('govuk-visually-hidden')

        }

        else if($("#provider-search-main").val().length === 0) {
            $('#provider-search-results').removeClass('govuk-visually-hidden');
            $('#provider-search-no-results').addClass('govuk-visually-hidden')
        }
        else {
            $('#provider-search-results').addClass('govuk-visually-hidden');
            $('#provider-search-no-results').removeClass('govuk-visually-hidden')

        }
        return false;

    });

    $("#tl-upload").click(function () {
        $("#tl-upload-stage1").addClass("tl-hidden");
        $('.tl-upload-bar-progress').animate({
            width: '100%',
        }, 20000, 'linear');

        $({ Counter: 0 }).animate({
            Counter: $('#tl-upload-count').text()
        }, {
                duration: 20000,
                easing: 'linear',
                step: function () {
                    $('#tl-upload-count').text(Math.ceil(this.Counter));
                }
            });
        $("#tl-upload-stage2").removeClass("tl-hidden").delay(20000).queue(function (next) {
            $("#tl-upload-stage2").addClass("tl-hidden");
            $("#tl-upload-stage3").removeClass("tl-hidden");
            next()
            });
    });



    var percent = $('.tl-upload-bar-progress').width() / $('.tl-upload-bar').width() * 100;

    console.log(Math.round(percent).toFixed(2)); 
})




