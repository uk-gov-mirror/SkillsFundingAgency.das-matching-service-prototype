/* global $ */




//Cookie Banner
(function () {
    "use strict"
    var root = this;
    if (typeof root.GOVUK === 'undefined') { root.GOVUK = {}; }

    /*
      Cookie methods
      ==============
  
      Usage:
  
        Setting a cookie:
        GOVUK.cookie('hobnob', 'tasty', { days: 30 });
  
        Reading a cookie:
        GOVUK.cookie('hobnob');
  
        Deleting a cookie:
        GOVUK.cookie('hobnob', null);
    */
    GOVUK.cookie = function (name, value, options) {
        if (typeof value !== 'undefined') {
            if (value === false || value === null) {
                return GOVUK.setCookie(name, '', { days: -1 });
            } else {
                return GOVUK.setCookie(name, value, options);
            }
        } else {
            return GOVUK.getCookie(name);
        };
    };
    GOVUK.setCookie = function (name, value, options) {
        if (typeof options === 'undefined') {
            options = {};
        }
        var cookieString = name + "=" + value + "; path=/";
        if (options.days) {
            var date = new Date();
            date.setTime(date.getTime() + (options.days * 24 * 60 * 60 * 1000));
            cookieString = cookieString + "; expires=" + date.toGMTString();
        }
        if (document.location.protocol == 'https:') {
            cookieString = cookieString + "; Secure";
        }
        document.cookie = cookieString;
    };
    GOVUK.getCookie = function (name) {
        var nameEQ = name + "=";
        var cookies = document.cookie.split(';');
        for (var i = 0, len = cookies.length; i < len; i++) {
            var cookie = cookies[i];
            while (cookie.charAt(0) == ' ') {
                cookie = cookie.substring(1, cookie.length);
            }
            if (cookie.indexOf(nameEQ) === 0) {
                return decodeURIComponent(cookie.substring(nameEQ.length));
            }
        }
        return null;
    };
}).call(this);
(function () {
    "use strict"
    var root = this;
    if (typeof root.GOVUK === 'undefined') { root.GOVUK = {}; }

    GOVUK.addCookieMessage = function () {
        var message = document.getElementById('global-cookie-message'),
            hasCookieMessage = (message && GOVUK.cookie('seen_cookie_message2') === null);

        if (hasCookieMessage) {
            message.style.display = 'block';

            $('#global-cookie-message-dismiss').click(function (e) {
                GOVUK.cookie('seen_cookie_message2', 'yes', { days: 28 });
                message.style.display = 'none';
                e.preventDefault();
            });
        }
    };
}).call(this);
(function () {
    "use strict"

    // add cookie message
    if (window.GOVUK && GOVUK.addCookieMessage) {
        GOVUK.addCookieMessage();
    }
}).call(this);






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

        else if ($("#provider-search-main").val().length === 0) {
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
        $('.tl-upload-bar-progress-error').animate({
            width: '80%',
        }, 15000, 'linear');

        $({ Counter: 0 }).animate({
            Counter: $('#tl-upload-count-error').text()
        }, {
                duration: 15000,
                easing: 'linear',
                step: function () {
                    $('#tl-upload-count-error').text(Math.ceil(this.Counter));
                }
            });
        $("#tl-upload-stage2").removeClass("tl-hidden").delay(20000).queue(function (next) {
            $("#tl-upload-stage2").addClass("tl-hidden");
            $("#tl-upload-stage3").removeClass("tl-hidden");
            next()
        });
    });



    var percent = $('.tl-upload-bar-progress').width() / $('.tl-upload-bar').width() * 100;
});



