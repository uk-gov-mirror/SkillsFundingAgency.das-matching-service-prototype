const express = require('express')
const router = express.Router()

var _myData = {
  "industry-categories": require(__dirname + '/data/industry-categories.json')
}

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

// Add your routes here - above the module.exports line
require('./routes/0-1-0/routing.js')(router, JSON.parse(JSON.stringify(_myData)));
require('./routes/0-2-0/routing.js')(router, JSON.parse(JSON.stringify(_myData)));
require('./routes/0-3-0/routing.js')(router, JSON.parse(JSON.stringify(_myData)));
require('./routes/0-4-0/routing.js')(router, JSON.parse(JSON.stringify(_myData)));


module.exports = router
