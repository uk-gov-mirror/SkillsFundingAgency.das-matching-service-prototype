const express = require('express')
const router = express.Router()

var _myData = {
  "industry-categories": require(__dirname + '/data/industry-categories.json'),
  "employers": require(__dirname + '/data/employers.json')

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
require('./routes/MVS/routing.js')(router, JSON.parse(JSON.stringify(_myData)));
require('./routes/0-5-0/routing.js')(router, JSON.parse(JSON.stringify(_myData)));
require('./routes/0-5-5/routing.js')(router, JSON.parse(JSON.stringify(_myData)));
require('./routes/0-6-0/routing.js')(router, JSON.parse(JSON.stringify(_myData)));
require('./routes/0-7-0/routing.js')(router, JSON.parse(JSON.stringify(_myData)));
require('./routes/0-8-0/routing.js')(router, JSON.parse(JSON.stringify(_myData)));
require('./routes/0-9-0/routing.js')(router, JSON.parse(JSON.stringify(_myData)));
require('./routes/1-0-0/routing.js')(router, JSON.parse(JSON.stringify(_myData)));
require('./routes/1-0-5/routing.js')(router, JSON.parse(JSON.stringify(_myData)));
require('./routes/1-1-0/routing.js')(router, JSON.parse(JSON.stringify(_myData)));




module.exports = router
