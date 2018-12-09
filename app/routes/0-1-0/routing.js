module.exports = function(router, myData) {

    var version = "0-1-0";

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

    // results
    router.get('/' + version + '/course', function (req, res) {
        res.render(version + '/course', {
          })
    });

    router.post('/' + version + '/course', function (req, res){
      res.redirect(301, './results');
    });

    // one-provider
    router.get('/' + version + '/one-provider', function (req, res) {
        res.render(version + '/one-provider', {
          })
    });

    router.post('/' + version + '/one-provider', function (req, res){
      res.redirect(301, './employer-name');
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
      res.redirect(301, './confirm-gap');
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
