module.exports = function(router, _myData) {

    var version = "0-2-0";

    router.all('/' + version + '/*', function(req, res, next){
      if(!req.session.myData || req.query.resetSession){
        // resetting
        req.session.myData = JSON.parse(JSON.stringify(_myData))
      }
      next()
    });

    // Start page
    router.get('/' + version + '/start', function (req, res) {
        res.render(version + '/start', {
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

    // location
    router.get('/' + version + '/location', function (req, res) {
        res.render(version + '/location', {
          })
    });

    router.post('/' + version + '/location', function (req, res){
      res.redirect(301, './course');
    });

    // course
    router.get('/' + version + '/course', function (req, res) {
        res.render(version + '/course', {
          myData : req.session.myData
          })
    });

    router.post('/' + version + '/course', function (req, res){
      req.session.skill = req.body.skill;
      if(req.body.skill != "plumbing"){
        res.redirect(301, './provision-gap');
      }else {
        res.redirect(301, './provider-results');
      }
    });

    // sign-in
    router.get('/' + version + '/signin', function (req, res) {
        res.render(version + '/signin', {
          })
    });

    router.post('/' + version + '/signin', function (req, res){
      res.redirect(301, './start');
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

    // filter
    router.get('/' + version + '/filter', function (req, res) {
        res.render(version + '/filter', {
          'keyword':req.session.keyword
          })
    });

    router.post('/' + version + '/filter', function (req, res){
      req.session.keyword = req.body.keyword
      res.redirect(301, './search');
    });

    // provider-results
    router.get('/' + version + '/provider-results', function (req, res) {
        res.render(version + '/provider-results', {
          'radius':req.session.radius,
          'postcode':req.session.postcode,
          'route':req.session.radius
          })
    });

    router.post('/' + version + '/provider-results', function (req, res){
      if (req.body.resultsAction == "filter") {
        res.redirect(301, './provider-results');
      } else if (req.body.resultsAction== 'searchAgain') {
        res.redirect(301, './provider-results');
      } else {
        res.redirect(301, './placements');
      }
    });


    // one-provider
    router.get('/' + version + '/one-provider', function (req, res) {
        res.render(version + '/one-provider', {
          })
    });

    router.post('/' + version + '/one-provider', function (req, res){
      res.redirect(301, './employer-name');
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
          'extraReq':req.session.extraReq
          })
    });

    router.post('/' + version + '/check-answers', function (req, res){
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
          })
    });

    router.post('/' + version + '/emails-sent', function (req, res){
      res.redirect(301, './check-CRM');
    });

    // check-CRM
    router.get('/' + version + '/check-CRM', function (req, res) {
        res.render(version + '/check-CRM', {
          'businessName':req.session.businessName,
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
        res.render(version + '/employer-name', {
          })
    });

    router.post('/' + version + '/employer-name', function (req, res){
      req.session.businessName = req.body.businessName
      res.redirect(301, './confirm-employer-gap');
    });

    // confirm-employer
    router.get('/' + version + '/confirm-employer', function (req, res) {
        res.render(version + '/confirm-employer', {
          })
    });

    router.post('/' + version + '/confirm-employer', function (req, res){
      req.session.businessName = req.body.businessName
      res.redirect(301, './check-answers');
    });

    // confirm-employer-gap
    router.get('/' + version + '/confirm-employer-gap', function (req, res) {
        res.render(version + '/confirm-employer-gap', {
          })
    });

    router.post('/' + version + '/confirm-employer-gap', function (req, res){
      req.session.businessName = req.body.businessName
      res.redirect(301, './confirm-gap');
    });

    // enter-employer-name
    router.get('/' + version + '/enter-employer-name', function (req, res) {
        res.render(version + '/enter-employer-name', {
          })
    });

    router.post('/' + version + '/enter-employer-name', function (req, res){
      req.session.businessName = req.body.businessName
      res.redirect(301, './confirm-employer');
    });

    // add-edit-employer
    router.get('/' + version + '/add-edit-employer', function (req, res) {
        res.render(version + '/add-edit-employer', {
          })
    });

    router.post('/' + version + '/add-edit-employer', function (req, res){
      res.redirect(301, './confirm-employer-gap');
    });

    // edit-employer
    router.get('/' + version + '/edit-employer', function (req, res) {
        res.render(version + '/edit-employer', {
          })
    });

    router.post('/' + version + '/edit-employer', function (req, res){
      res.redirect(301, './confirm-employer');
    });

    // confirm-gap
    router.get('/' + version + '/confirm-gap', function (req, res) {
        res.render(version + '/confirm-gap', {
          })
    });

    router.post('/' + version + '/confirm-gap', function (req, res){
      res.redirect(301, './check-CRM');
    });

    // give-feedback
    router.get('/' + version + '/give-feedback', function (req, res) {
        res.render(version + '/give-feedback', {
          })
    });

    router.post('/' + version + '/give-feedback', function (req, res){
      res.redirect(301, './start');
    });




}
