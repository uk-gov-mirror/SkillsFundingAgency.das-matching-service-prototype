module.exports = function(router, myData) {

    var version = "0-1-0";

    // Start page
    router.get('/' + version + '/start', function (req, res) {
        res.render(version + '/start', {
          })
    });

    router.post('/' + version + '/start', function (req, res){
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

}
