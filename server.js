/*
	cmpe 239 realy-yelp - main server
*/

var app = require('express')()
	, http = require('http')
	, https = require('https')
	, sharedEnv = require('./config/environment')
	, fs = require('fs')
	, validator = require('validator')
	, logger = require('util')
	, express = require('express')
	, ejs = require('ejs')
	, bodyParser = require('body-parser');
;

// Set loggig to env
sharedEnv.logger = logger;

//App configruation, environment configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//var router = express.Router(); 

// old config
// app.use(express.cookieParser());
// app.use(express.favicon());
// app.use(express.bodyParser());
// app.use(express.methodOverride());
// app.use(app.router);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', ejs.__express);
app.use(express.static(__dirname + '/views'));

//Set init configuration
require('./config/init/config')(app, sharedEnv);
require('./config/init/errorHandler')(app, sharedEnv);
require('./config/init/mongodb')(app, sharedEnv);
require('./config/init/routes')(app, sharedEnv);
require('./config/init/util')(app, sharedEnv);
require('./config/init/compileSchemas')(app, sharedEnv);

// logger has, logger.log, logger.debug, logger.error
// debug Level boolean from shareEnv.config.debug
server = http.createServer(app);

var port = process.env.OPENSHIFT_NODEJS_PORT || 8000
    , ip = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
server.listen(port, ip);
sharedEnv.logger.log("CMPE 239 Server listening on port " + port);
