
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();
var sql = require('mysql');
var poolObject = require('./routes/connectionpooling');

// all environments
var port = process.env.OPENSHIFT_NODEJS_PORT ||  process.env.OPENSHIFT_INTERNAL_PORT || 8080;  
var ipaddr = process.env.OPENSHIFT_NODEJS_IP || process.env.OPENSHIFT_INTERNAL_IP;
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


app.get('/', routes.index);
app.get('/dashboard', routes.dashboard);
app.get('/chart', routes.chart);
app.get('/uploadchart', routes.uploadchart);
app.get('/mark', routes.mark);

exports.poolObject = poolObject;
exports.sql = sql;
//creating pool of Database connections
poolObject.initializepool(10);



http.createServer(app).listen(port,ipaddr, function(){
  console.log('Express server listening on port ' +port);
});

