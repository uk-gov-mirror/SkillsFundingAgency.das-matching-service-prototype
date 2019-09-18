module.exports = function(router, _myData) {

    var version = "1-2-0";

    router.all('/' + version + '/*', function(req, res, next){
      if(!req.session.myData || req.query.resetSession){
        // resets myData object
        req.session.addopportunity = "no";
        req.session.addopportunity_gap = "no"
        // resets specific session variables ^
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
      // req.session.myData.user_type = req.body.user_type
      res.redirect(301, './login-help');
    });


    // Start page
    router.get('/' + version + '/start', function (req, res) {
        res.render(version + '/start', {
          // myData: req.session.myData
          'user_type':req.session.user_type
          })
    });

    router.post('/' + version + '/start', function (req, res){
      res.redirect(301, './search?resetSession=true');
    });

    // remove-employer
    router.get('/' + version + '/remove-employer', function (req, res) {
        res.render(version + '/remove-employer', {
        })
    });

    router.post('/' + version + '/remove-employer', function (req, res){
      res.redirect(301, './saved-opportunities');
    });

    // remove-opportunity
    router.get('/' + version + '/remove-opportunity', function (req, res) {
        res.render(version + '/remove-opportunity', {
        })
    });

    router.post('/' + version + '/remove-opportunity', function (req, res){
        res.redirect(301, './opportunity-basket?addopportunity=1');
    });


    // placements
    router.get('/' + version + '/placements', function (req, res) {
        res.render(version + '/placements', {
            'addopportunity': req.session.addopportunity,
            'businessName': req.session.businessName
          })
    });

    router.post('/' + version + '/placements', function (req, res){
      req.session.placements = req.body.placements,
      req.session.placementNumber = req.body.placementNumber,
      req.session.postcode = req.body.postcode,
      req.session.roleInfo = req.body.roleInfo,
      req.session.extra = req.body.extra,
      req.session.extraReq = req.body.extraReq
        if (req.session.addopportunity == "2") {
            res.redirect(301, 'check-answers');
        } else if (req.session.addopportunity == "existing") {
            res.redirect(301, 'check-answers-return');
        } else {
            res.redirect(301, 'enter-employer-name');
        }
    });

    // opportunity-basket
    router.get('/' + version + '/opportunity-basket', function (req, res) {
        res.render(version + '/opportunity-basket', {
            'addopportunity': req.session.addopportunity,
            'businessName': req.session.businessName,
            'postcode': req.session.postcode,
            'placementtype': req.session.placementtype
          })
    });

    router.post('/' + version + '/opportunity-basket', function (req, res) {
        req.session.basketcontinue = req.body.basketcontinue,
        req.session.addopportunity = req.body.addopportunity

        if (req.session.basketcontinue == "refer") {
            res.redirect(301, 'confirm-employer-permission');
        } else {
            res.redirect(301, 'search');
        }
    });

    // opportunity-basket-halt
    router.get('/' + version + '/opportunity-basket-halt', function (req, res) {
        res.render(version + '/opportunity-basket-halt', {
            'businessName': req.session.businessName,
        })
    });

    router.post('/' + version + '/opportunity-basket-halt', function (req, res) {
        req.session.basketcontinue = req.body.basketcontinue,
            req.session.addopportunity = req.body.addopportunity
        res.redirect(301, 'opportunity-basket-return');
    });

    // opportunity-basket-return
    router.get('/' + version + '/opportunity-basket-return', function (req, res) {
        res.render(version + '/opportunity-basket-return', {
            'addopportunity': req.session.addopportunity,
            'businessName': req.session.businessName,
            'postcode': req.session.postcode,
            'placementtype': req.session.placementtype
        })
    });

    router.post('/' + version + '/opportunity-basket-return', function (req, res) {
        req.session.basketcontinue = req.body.basketcontinue,
            req.session.addopportunity = req.body.addopportunity

        if (req.session.basketcontinue == "refer") {
            res.redirect(301, 'confirm-employer-permission');
        } else {
            res.redirect(301, 'search');
        }
    });

    // opportunity-basket50
    router.get('/' + version + '/opportunity-basket50', function (req, res) {
        res.render(version + '/opportunity-basket50', {
            'addopportunity': req.session.addopportunity,
            'businessName': req.session.businessName,
            'postcode': req.session.postcode,
            'placementtype': req.session.placementtype
          })
    });

    router.post('/' + version + '/opportunity-basket50', function (req, res) {
        req.session.basketcontinue = req.body.basketcontinue,
        req.session.addopportunity = req.body.addopportunity

        if (req.session.basketcontinue == "refer") {
            res.redirect(301, 'confirm-employer-permission');
        } else {
            res.redirect(301, 'search');
        }
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
            'addopportunity': req.session.addopportunity,
            'businessName': req.session.businessName
          })
    });

    router.post('/' + version + '/search', function (req, res){
      req.session.postcode = req.body.postcode,
      req.session.radius = req.body.radius,
      req.session.route = req.body.route,
      res.redirect(301, './provider-results');
    });

    // postcode
    router.get('/' + version + '/postcode', function (req, res) {
        res.render(version + '/postcode', {
          })
    });

    router.post('/' + version + '/postcode', function (req, res){
      req.session.postcode = req.body.postcode,
      res.redirect(301, './provider-results-geog-area');
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
          'keyword':req.session.keyword,
          'addopportunity': req.session.addopportunity
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

    // provider-results-return
    router.get('/' + version + '/provider-results-return', function (req, res) {
        res.render(version + '/provider-results-return', {
          'radius':req.session.radius,
          'postcode':req.session.postcode,
          'route':req.session.route,
          'keyword':req.session.keyword,
          'addopportunity': req.session.addopportunity
          })
    });

    router.post('/' + version + '/provider-results-return', function (req, res){
      req.session.route = req.body.route,
      req.session.radius = req.body.radius
      if (req.body.resultsAction == "filter" && req.body.keyword != "") {
        res.redirect(301, './provider-results-filter');
      } else if (req.body.resultsAction == "filter" && req.body.keyword == "") {
          res.redirect(301, 'provider-results-return');
      } else if (req.body.resultsAction== "searchAgain") {
        res.redirect(301, './provider-results-return');
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

    router.post('/' + version + '/check-answers', function (req, res) {
        req.session.placementtype = req.body.placementtype,
      res.redirect(301, './opportunity-basket');
    });

    // confirm-employer-permission
    router.get('/' + version + '/confirm-employer-permission', function (req, res) {
        res.render(version + '/confirm-employer-permission', {
            'addopportunity': req.session.addopportunity,
            'placements': req.session.placements,
            'placementNumber': req.session.placementNumber,
            'postcode': req.session.postcode,
            'businessName': req.session.businessName,
            'roleInfo': req.session.rollInfo,
            'extra': req.session.extra,
            'extraReq': req.session.extraReq,
            'route': req.session.route,
            'provider': req.session.provider,
        })
    });

    router.post('/' + version + '/confirm-employer-permission', function (req, res) {
        res.redirect(301, 'emails-sent');
    });


    // final-contacts-check
    router.get('/' + version + '/final-contacts-check', function (req, res) {
        res.render(version + '/final-contacts-check', {
          'addopportunity': req.session.addopportunity,
          'placements': req.session.placements,
          'placementNumber': req.session.placementNumber,
          'postcode': req.session.postcode,
          'businessName': req.session.businessName,
          'roleInfo': req.session.rollInfo,
          'extra': req.session.extra,
          'extraReq': req.session.extraReq,
          'route': req.session.route,
          'provider': req.session.provider,
        })
    });

    router.post('/' + version + '/final-contacts-check', function (req, res) {
        res.redirect(301, 'confirm-employer-permission');
    });

    // addanother
    router.get('/' + version + '/addanother', function (req, res) {
        res.render(version + '/addanother', {
            'businessName': req.session.businessName
          })
    });

    router.post('/' + version + '/addanother', function (req, res){
      req.session.addopportunity = req.body.addopportunity
      if (req.body.addopportunity == "yes") {
        res.redirect(301, './search');
      } else {
          res.redirect(301, './gdpr');
      }
    });

    // // gdpr
    // router.get('/' + version + '/gdpr', function (req, res) {
    //     res.render(version + '/gdpr', {
    //       'businessName': req.session.businessName,
    //       'contact_name': req.session.contact_name
    //       })
    // });
    //
    // router.post('/' + version + '/gdpr', function (req, res){
    //   res.redirect(301, './emails-sent');
    // });

    // // check-providers
    // router.get('/' + version + '/check-providers', function (req, res) {
    //     res.render(version + '/check-providers', {
    //       })
    // });
    //
    // router.post('/' + version + '/check-providers', function (req, res){
    //   res.redirect(301, './emails-sent');
    // });

    // emails-sent
    router.get('/' + version + '/emails-sent', function (req, res) {
        res.render(version + '/emails-sent', {
          'businessName': req.session.businessName,
          'contact_name': req.session.contact_name
          })
    });

    router.post('/' + version + '/emails-sent', function (req, res) {
        req.session.addopportunity = req.body.addopportunity,
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
        req.session.businessName = req.body.businessName,
      res.redirect(301, './confirm-employer');
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
            'contact_email': req.session.contact_email,
            'placementtype': req.session.placementtype
          })
    });

    router.post('/' + version + '/confirm-employer', function (req, res) {
        if (req.session.placementtype == "gap") {
            res.redirect(301, 'opportunity-basket');
        } else {
            res.redirect(301, 'check-answers');
        }
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
        req.session.businessName = req.body.businessName,
            req.session.placementtype = req.body.placementtype
      res.redirect(301, './confirm-employer');
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
      res.redirect(301, './confirm-employer-permission');
    });

    // placement-gap
    router.get('/' + version + '/placement-gap', function (req, res) {
      req.session.myData.employers.employers.sort(function(a, b){
               return a.name.toUpperCase() > b.name.toUpperCase() ? 1 : b.name.toUpperCase() > a.name.toUpperCase() ? -1 : 0;
           });
        res.render(version + '/placement-gap', {
          'addopportunity': req.session.addopportunity,
          myData : req.session.myData
          })
    });

    router.post('/' + version + '/placement-gap', function (req, res) {
        if (req.session.addopportunity == "2") {
            res.redirect(301, 'opportunity-basket');
        } else if (req.session.addopportunity == "50") {
            res.redirect(301, 'opportunity-basket50');
        } else {
            req.session.placementtype = req.body.placementtype
            res.redirect(301, 'employer-name');
        }
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
      if (req.session.addopportunity == "yes" && req.body.addopportunity_gap == "yes"){
        res.redirect(301, './provider-results');
      } else if (req.session.addopportunity == "yes" && req.body.addopportunity_gap == "no") {
        res.redirect(301, './opportunity-basket');
      } else if (req.session.addopportunity == "no" && req.body.addopportunity_gap == "yes") {
        req.session.addopportunity = req.body.addopportunity_gap
        res.redirect(301, './provider-results');
      } else {
        res.redirect(301, './start');
      }
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

    // provider-data-find
    router.get('/' + version + '/provider-data-find', function (req, res) {
        res.render(version + '/provider-data-find', {
          'UKPRN': req.session.UKPRN
        })
    });

    router.post('/' + version + '/provider-data-find', function (req, res) {
        req.session.provider_find_UKPRN = req.body.provider_find_UKPRN
        res.redirect(301, './provider-data-find');
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
      if (req.body.providerAction == "save" && req.body.CDF == "yes") {
        res.redirect(301, './provider-data-providerview');
      } else {
          res.redirect(301, './provider-data-find');
      }
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

    // provider-data-venue-add
    router.get('/' + version + '/provider-data-venue-add', function (req, res) {
        res.render(version + '/provider-data-venue-add', {
          'venuePostcode':req.session.venuePostcode
          })
    });

    router.post('/' + version + '/provider-data-venue-add', function (req, res){
      res.redirect(301, './provider-data-providerview');
    });

    // provider-data-addqual
    router.get('/' + version + '/provider-data-addqual', function (req, res) {
        res.render(version + '/provider-data-addqual', {
        })

    });

    router.post('/' + version + '/provider-data-addqual', function (req, res) {
        console.log(req)
        if (req.body.QualLAR === "12345678") {
            res.redirect(301, './provider-data-missingqual');
        }
        else {
            res.redirect(301, './provider-data-venue');
        }

    });

    // provider-data-missingqual
    router.get('/' + version + '/provider-data-missingqual', function (req, res) {
        res.render(version + '/provider-data-missingqual', {
        })
    });

    router.post('/' + version + '/provider-data-missingqual', function (req, res) {
        res.redirect(301, './provider-data-venue');
    });

    // provider-data-addvenue
    router.get('/' + version + '/provider-data-addvenue', function (req, res) {
        res.render(version + '/provider-data-addvenue', {
          })
    });

    router.post('/' + version + '/provider-data-addvenue', function (req, res){
      req.session.venuePostcode = req.body.venuePostcode
      res.redirect(301, './provider-data-venue-add');
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
