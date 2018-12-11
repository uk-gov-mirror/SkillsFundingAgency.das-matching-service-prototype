module.exports = function(router, _myData) {

    var version = "0-1-0";

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
      res.redirect(301, './placements');
    });

    // placements
    router.get('/' + version + '/placements', function (req, res) {
        res.render(version + '/placements', {
          })
    });

    router.post('/' + version + '/placements', function (req, res){
      req.session.placementNumber = req.body.placementNumber,
      req.session.postcode = req.body.postcode
      res.redirect(301, './location');
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
      res.redirect(301, './results');
    });

    // results
    router.get('/' + version + '/results', function (req, res) {
        res.render(version + '/results', {
          })
    });

    router.post('/' + version + '/results', function (req, res){
      res.redirect(301, './employer-name');
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
          'placementNumber':req.session.placementNumber,
          'postcode':req.session.postcode,
          'businessName':req.session.businessName
          })
    });

    router.post('/' + version + '/check-answers', function (req, res){
      res.redirect(301, './check-providers');
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
          })
    });

    router.post('/' + version + '/check-CRM', function (req, res){
      res.redirect(301, './start');
    });


    // provision-gap
    router.get('/' + version + '/provision-gap', function (req, res) {
        res.render(version + '/provision-gap', {
          })
    });

    router.post('/' + version + '/provision-gap', function (req, res){
      req.session.no_results = req.body.no_results;
        if(req.body.no_results == "postcode"){
          res.redirect(301, './location');
        }else if (req.body.no_results == "skill"){
          res.redirect(301, './course');
        }else {
          res.redirect(301, './employer-name');
        }
    });


    // employer-name
    router.get('/' + version + '/employer-name', function (req, res) {
        res.render(version + '/employer-name', {
          })
    });

    router.post('/' + version + '/employer-name', function (req, res){
      req.session.businessName = req.body.businessName
      res.redirect(301, './check-answers');
    });

    // confirm-gap
    router.get('/' + version + '/confirm-gap', function (req, res) {
        res.render(version + '/confirm-gap', {
          })
    });

    router.post('/' + version + '/confirm-gap', function (req, res){
      res.redirect(301, './check-CRM');
    });


}
