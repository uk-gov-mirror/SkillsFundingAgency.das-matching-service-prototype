module.exports = function(router, _myData) {

    var version = "0-5-0";

    router.all('/' + version + '/*', function(req, res, next){
      if(!req.session.myData || req.query.resetSession){
        // resetting
        req.session.myData = JSON.parse(JSON.stringify(_myData))
      }
      next()
    });

    // setup
    router.get('/' + version + '/setup', function (req, res) {
        res.render(version + '/setup', {
          })
    });

    router.post('/' + version + '/setup', function (req, res){
      req.session.user_type = req.body.user_type
      res.redirect(301, './login-help');
    });


    // Start page
    router.get('/' + version + '/start', function (req, res) {
        res.render(version + '/start', {
          'user_type':req.session.user_type
          })
    });

    router.post('/' + version + '/start', function (req, res){
      res.redirect(301, './search');
    });

    // placements
    router.get('/' + version + '/placements', function (req, res) {
        res.render(version + '/placements', {
          })
    });

    router.post('/' + version + '/placements', function (req, res){
      req.session.placements = req.body.placements,
      req.session.placementNumber = req.body.placementNumber,
      req.session.postcode = req.body.postcode,
      req.session.roleInfo = req.body.roleInfo,
      req.session.extra = req.body.extra,
      req.session.extraReq = req.body.extraReq
      res.redirect(301, './enter-employer-name');
    });

    // // location
    // router.get('/' + version + '/location', function (req, res) {
    //     res.render(version + '/location', {
    //       })
    // });
    //
    // router.post('/' + version + '/location', function (req, res){
    //   res.redirect(301, './course');
    // });

    // // course
    // router.get('/' + version + '/course', function (req, res) {
    //     res.render(version + '/course', {
    //       myData : req.session.myData
    //       })
    // });
    //
    // router.post('/' + version + '/course', function (req, res){
    //   req.session.skill = req.body.skill;
    //   if(req.body.skill != "plumbing"){
    //     res.redirect(301, './provision-gap');
    //   }else {
    //     res.redirect(301, './provider-results');
    //   }
    // });

    // login-help
    router.get('/' + version + '/login-help', function (req, res) {
        res.render(version + '/login-help', {
          })
    });

    router.post('/' + version + '/login-help', function (req, res){
      res.redirect(301, './signin');
    });

    // sign-in
    router.get('/' + version + '/signin', function (req, res) {
        res.render(version + '/signin', {
          })
    });

    router.post('/' + version + '/signin', function (req, res){
      res.redirect(301, './start');
    });

    // failed-login
    router.get('/' + version + '/failed-login', function (req, res) {
        res.render(version + '/failed-login', {
          })
    });

    router.post('/' + version + '/failed-login', function (req, res){
      res.redirect(301, './login-help');
    });

    // system-error
    router.get('/' + version + '/system-error', function (req, res) {
        res.render(version + '/system-error', {
          })
    });

    router.post('/' + version + '/system-error', function (req, res){
      res.redirect(301, './login-help');
    });

    // page-not-found
    router.get('/' + version + '/page-not-found', function (req, res) {
        res.render(version + '/page-not-found', {
          })
    });

    router.post('/' + version + '/page-not-found', function (req, res){
      res.redirect(301, './login-help');
    });



    // search
    router.get('/' + version + '/search', function (req, res) {
        res.render(version + '/search', {
          })
    });

    router.post('/' + version + '/search', function (req, res){
      req.session.postcode = req.body.postcode,
      req.session.radius = req.body.radius,
      req.session.route = req.body.route
      res.redirect(301, './provider-results');
    });

    // // filter
    // router.get('/' + version + '/_includes/filter', function (req, res) {
    //     res.render(version + '/_includes/filter', {
    //       })
    // });
    //
    // router.post('/' + version + '/_includes/filter', function (req, res){
    //   req.session.keyword = req.body.keyword
    //   if (req.body.keyword != "") {
    //     res.redirect(301, './provider-results-filter');
    //   } else if (req.body.keyword == "") {
    //       res.redirect(301, './provider-results');
    //   }
    // });
    //
    // // filter-applied
    // router.get('/' + version + '/_includes/filter-applied', function (req, res) {
    //     res.render(version + '/_includes/filter-applied', {
    //       })
    // });
    //
    // router.post('/' + version + '/_includes/filter', function (req, res){
    //   req.session.keyword = req.body.keyword
    //   if (req.body.keyword != "") {
    //     res.redirect(301, './provider-results-filter');
    //   } else if (req.body.keyword == "") {
    //       res.redirect(301, './provider-results');
    //   }
    // });

    // provider-results
    router.get('/' + version + '/provider-results', function (req, res) {
        res.render(version + '/provider-results', {
          'radius':req.session.radius,
          'postcode':req.session.postcode,
          'route':req.session.route,
          'keyword':req.session.keyword
          })
    });

    router.post('/' + version + '/provider-results', function (req, res){
      req.session.route = req.body.route,
      req.session.radius = req.body.radius
      if (req.body.resultsAction == "filter" && req.body.keyword != "") {
        res.redirect(301, './provider-results-filter');
      } else if (req.body.resultsAction == "filter" && req.body.keyword == "") {
          res.redirect(301, 'provider-results');
      } else if (req.body.resultsAction== "searchAgain") {
        res.redirect(301, './provider-results');
      //     } else if (req.body.provider == "1") {
      //       res.redirect(301, './one-provider');
      //     } else if (req.body.provider == "2") {
      //       res.redirect(301, './one-provider');
      //     } else if (req.body.provider == "3") {
      //       res.redirect(301, './one-provider');
      //     } else if (req.body.provider == "4") {
      //       res.redirect(301, './one-provider');
      //     } else if (req.body.provider == "5") {
      //       res.redirect(301, './one-provider');
      //     } else if (req.body.provider == "6") {
      //       res.redirect(301, './one-provider');
      //     } else if (req.body.provider == "7") {
      //       res.redirect(301, './one-provider');
      //     } else if (req.body.provider == "8") {
      //       res.redirect(301, './one-provider');
      //     } else if (req.body.provider == "9") {
      //       res.redirect(301, './one-provider');
      //     } else if (req.body.provider == "10") {
      //       res.redirect(301, './one-provider');
      //     } else if (req.body.provider == "11") {
      //       res.redirect(301, './one-provider');
      //     } else if (req.body.provider == "12") {
      //       res.redirect(301, './one-provider');
      //     } else if (req.body.provider == "13") {
      //       res.redirect(301, './one-provider');
      //     } else if (req.body.provider == "14") {
      //       res.redirect(301, './one-provider');
      //     } else if (req.body.provider == "15") {
      //       res.redirect(301, './one-provider');
      //     } else if (req.body.provider == "16") {
      //       res.redirect(301, './one-provider');
      //     } else if (req.body.provider == "17") {
      //       res.redirect(301, './one-provider');
       } else {
        res.redirect(301, './placements');
      }
    });

    // provider-results-filter
    router.get('/' + version + '/provider-results-filter', function (req, res) {
        res.render(version + '/provider-results-filter', {
          'radius':req.session.radius,
          'postcode':req.session.postcode,
          'route':req.session.route,
          'keyword':req.session.keyword
          })
    });

    router.post('/' + version + '/provider-results-filter', function (req, res){
      req.session.provider = req.body.provider
      if (req.body.resultsAction == "filter" && req.body.keyword != "") {
        res.redirect(301, './provider-results-filter');
      } else if (req.body.resultsAction == "filter" && req.body.keyword == "") {
          res.redirect(301, './provider-results');
      } else if (req.body.resultsAction == "searchAgain") {
        res.redirect(301, './provider-results');
          } else if (req.body.provider == "1") {
            res.redirect(301, './one-provider');
          } else if (req.body.provider == "2") {
            res.redirect(301, './one-provider');
          } else if (req.body.provider == "5") {
            res.redirect(301, './one-provider');
          } else if (req.body.provider == "9") {
            res.redirect(301, './one-provider');
      } else {
        res.redirect(301, './placements');
      }

    });

    // download-halt
    router.get('/' + version + '/download-halt', function (req, res) {
        res.render(version + '/download-halt', {
          })
    });

    router.post('/' + version + '/download-halt', function (req, res){
      res.redirect(301, './placements');
    });

    // one-provider
    router.get('/' + version + '/one-provider', function (req, res) {
        res.render(version + '/one-provider', {
          'provider':req.session.provider
          })
    });

    router.post('/' + version + '/one-provider', function (req, res){
      res.redirect(301, './placements');
    });

    // check-answers
    router.get('/' + version + '/check-answers', function (req, res) {
        res.render(version + '/check-answers', {
          'placements':req.session.placements,
          'placementNumber':req.session.placementNumber,
          'postcode':req.session.postcode,
          'businessName':req.session.businessName,
          'roleInfo':req.session.rollInfo,
          'extra':req.session.extra,
          'extraReq':req.session.extraReq,
          'route':req.session.route,
          'provider':req.session.provider

          })
    });

    router.post('/' + version + '/check-answers', function (req, res){
      res.redirect(301, './send-employer-email');
    });

    // send-employer-email
    router.get('/' + version + '/send-employer-email', function (req, res) {
        res.render(version + '/send-employer-email', {
          })
    });

    router.post('/' + version + '/send-employer-email', function (req, res){
      req.session.employer_email = req.body.employer_email
      res.redirect(301, './emails-sent');
    });

    // check-providers
    router.get('/' + version + '/check-providers', function (req, res) {
        res.render(version + '/check-providers', {
          })
    });

    router.post('/' + version + '/check-providers', function (req, res){
      res.redirect(301, './emails-sent');
    });

    // emails-sent
    router.get('/' + version + '/emails-sent', function (req, res) {
        res.render(version + '/emails-sent', {
          'employer_email': req.session.employer_email
          })
    });

    router.post('/' + version + '/emails-sent', function (req, res){
      res.redirect(301, './start');
    });

    // check-CRM
    router.get('/' + version + '/check-CRM', function (req, res) {
        res.render(version + '/check-CRM', {
          'businessName':req.session.businessName,
          'route':req.session.route
          })
    });

    router.post('/' + version + '/check-CRM', function (req, res){
      res.redirect(301, './start');
    });




    // // provision-gap
    // router.get('/' + version + '/provision-gap', function (req, res) {
    //     res.render(version + '/provision-gap', {
    //       'postcode':req.session.postcode,
    //       })
    // });
    //
    // router.post('/' + version + '/provision-gap', function (req, res){
    //   req.session.no_results = req.body.no_results;
    //     if(req.body.no_results == "postcode"){
    //       res.redirect(301, './location');
    //     }else if (req.body.no_results == "skill"){
    //       res.redirect(301, './course');
    //     }else {
    //       res.redirect(301, './employer-name');
    //     }
    // });


    // employer-name
    router.get('/' + version + '/employer-name', function (req, res) {
      req.session.myData.employers.employers.sort(function(a, b){
               return a.name.toUpperCase() > b.name.toUpperCase() ? 1 : b.name.toUpperCase() > a.name.toUpperCase() ? -1 : 0;
           });
        res.render(version + '/employer-name', {
          myData : req.session.myData
          })
    });

    router.post('/' + version + '/employer-name', function (req, res){
      req.session.businessName = req.body.businessName
      res.redirect(301, './add-edit-employer');
    });

    // JSoff-employer-name
    router.get('/' + version + '/JSoff-employer-name', function (req, res) {
        res.render(version + '/JSoff-employer-name', {
          'postcode':req.session.postcode
          })
    });

    router.post('/' + version + '/JSoff-employer-name', function (req, res){
      req.session.postcode = req.body.postcode
      if (req.body.employerAction == "searchAgain") {
        res.redirect(301, './JSoff-employer-name');
      } else {
        res.redirect(301, './edit-employer');
      }
    });

    // add-employer-gap
    router.get('/' + version + '/add-employer-gap', function (req, res) {
        res.render(version + '/add-employer-gap', {
          })
    });

    router.post('/' + version + '/add-employer-gap', function (req, res){
      res.redirect(301, './confirm-employer-gap');
    });

    // add-employer
    router.get('/' + version + '/add-employer', function (req, res) {
        res.render(version + '/add-employer', {
          })
    });

    router.post('/' + version + '/add-employer', function (req, res){
      res.redirect(301, './confirm-employer');
    });

    // confirm-employer
    router.get('/' + version + '/confirm-employer', function (req, res) {
        res.render(version + '/confirm-employer', {
          'businessName':req.session.businessName,
          'contact_name':req.session.contact_name,
          'contact_phone':req.session.contact_phone,
          'contact_email':req.session.contact_email
          })
    });

    router.post('/' + version + '/confirm-employer', function (req, res){
      res.redirect(301, './check-answers');
    });

    // confirm-employer-gap
    router.get('/' + version + '/confirm-employer-gap', function (req, res) {
        res.render(version + '/confirm-employer-gap', {
          'businessName':req.session.businessName,
          'contact_name':req.session.contact_name,
          'contact_phone':req.session.contact_phone,
          'contact_email':req.session.contact_email
          })
    });

    router.post('/' + version + '/confirm-employer-gap', function (req, res){
      res.redirect(301, './confirm-gap');
    });

    // enter-employer-name
    router.get('/' + version + '/enter-employer-name', function (req, res) {
      req.session.myData.employers.employers.sort(function(a, b){
               return a.name.toUpperCase() > b.name.toUpperCase() ? 1 : b.name.toUpperCase() > a.name.toUpperCase() ? -1 : 0;
           });
        res.render(version + '/enter-employer-name', {
          myData : req.session.myData
          })
    });

    router.post('/' + version + '/enter-employer-name', function (req, res){
      req.session.businessName = req.body.businessName
      res.redirect(301, './edit-employer');
    });

    // add-edit-employer
    router.get('/' + version + '/add-edit-employer', function (req, res) {
        res.render(version + '/add-edit-employer', {
          'businessName':req.session.businessName,
          'contact_name':req.session.contact_name,
          'contact_phone':req.session.contact_phone,
          'contact_email':req.session.contact_email
          })
    });

    router.post('/' + version + '/add-edit-employer', function (req, res){
      req.session.contact_name = req.body.contact_name,
      req.session.contact_phone = req.body.contact_phone,
      req.session.contact_email = req.body.contact_email
      res.redirect(301, './confirm-gap');
    });

    // edit-employer
    router.get('/' + version + '/edit-employer', function (req, res) {
        res.render(version + '/edit-employer', {
          'businessName':req.session.businessName,
          'contact_name':req.session.contact_name,
          'contact_phone':req.session.contact_phone,
          'contact_email':req.session.contact_email
          })
    });

    router.post('/' + version + '/edit-employer', function (req, res){
      req.session.contact_name = req.body.contact_name,
      req.session.contact_phone = req.body.contact_phone,
      req.session.contact_email = req.body.contact_email
      res.redirect(301, './check-answers');
    });

    // placement-gap
    router.get('/' + version + '/placement-gap', function (req, res) {
        res.render(version + '/placement-gap', {
          })
    });

    router.post('/' + version + '/placement-gap', function (req, res){
      res.redirect(301, './employer-name');
    });

    // confirm-gap
    router.get('/' + version + '/confirm-gap', function (req, res) {
        res.render(version + '/confirm-gap', {
          'placements':req.session.placements,
          'placementNumber':req.session.placementNumber,
          'postcode':req.session.postcode,
          'businessName':req.session.businessName,
          'roleInfo':req.session.rollInfo,
          'extra':req.session.extra,
          'extraReq':req.session.extraReq,
          'route':req.session.route,
          'provider':req.session.provider
          })
    });

    router.post('/' + version + '/confirm-gap', function (req, res){
      res.redirect(301, './provision-report');
    });

    // provision-report
    router.get('/' + version + '/provision-report', function (req, res) {
        res.render(version + '/provision-report', {
          'businessName':req.session.businessName
          })
    });

    router.post('/' + version + '/provision-report', function (req, res){
      res.redirect(301, './start');
    });

    // give-feedback
    router.get('/' + version + '/give-feedback', function (req, res) {
        res.render(version + '/give-feedback', {
          })
    });

    router.post('/' + version + '/give-feedback', function (req, res){
      res.redirect(301, './start');
    });

    // provider-data-search
    router.get('/' + version + '/provider-data-search', function (req, res) {
        res.render(version + '/provider-data-search', {
          })
    });

    router.post('/' + version + '/provider-data-search', function (req, res){
      req.session.UKPRN = req.body.UKPRN
      res.redirect(301, './provider-data-providerview');
    });

    // provider-data-providerview
    router.get('/' + version + '/provider-data-providerview', function (req, res) {
        res.render(version + '/provider-data-providerview', {
          'data_contact_name':req.session.data_contact_name,
          'data_contact_email':req.session.data_contact_email,
          'data_contact_phone':req.session.data_contact_phone,
          'UKPRN':req.session.UKPRN
          })
    });

    router.post('/' + version + '/provider-data-providerview', function (req, res){
      req.session.data_contact_name = req.body.data_contact_name,
      req.session.data_contact_email = req.body.data_contact_email,
      req.session.data_contact_phone = req.body.data_contact_phone
      res.redirect(301, './provider-data-search');
    });

    // provider-data-venue
    router.get('/' + version + '/provider-data-venue', function (req, res) {
        res.render(version + '/provider-data-venue', {
          'venuePostcode':req.session.venuePostcode
          })
    });

    router.post('/' + version + '/provider-data-venue', function (req, res){
      res.redirect(301, './provider-data-providerview');
    });

    // provider-data-addqual
    router.get('/' + version + '/provider-data-addqual', function (req, res) {
        res.render(version + '/provider-data-addqual', {
          })
    });

    router.post('/' + version + '/provider-data-addqual', function (req, res){
      res.redirect(301, './provider-data-venue');
    });

    // provider-data-addvenue
    router.get('/' + version + '/provider-data-addvenue', function (req, res) {
        res.render(version + '/provider-data-addvenue', {
          })
    });

    router.post('/' + version + '/provider-data-addvenue', function (req, res){
      req.session.venuePostcode = req.body.venuePostcode
      res.redirect(301, './provider-data-venue');
    });

    // provider-data-sure
    router.get('/' + version + '/provider-data-sure', function (req, res) {
        res.render(version + '/provider-data-sure', {
          })
    });

    router.post('/' + version + '/provider-data-sure', function (req, res){
      res.redirect(301, './provider-data-search');
    });

    // provider-data-venue-sure
    router.get('/' + version + '/provider-data-venue-sure', function (req, res) {
        res.render(version + '/provider-data-venue-sure', {
          })
    });

    router.post('/' + version + '/provider-data-venue-sure', function (req, res){
      res.redirect(301, './provider-data-providerview');
    });


}
