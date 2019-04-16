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
})


