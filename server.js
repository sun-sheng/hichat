var express      = require('express');
var serveStatic  = require('serve-static');
var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan       = require('morgan');
var cors         = require('cors');
var _            = require('lodash');

var app    = express();
var server = require('http').Server(app);

server.listen(process.env.PORT);

//--------------------configure app----------------------

//app.use(express.methodOverride());
//app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(morgan('short'));
app.use(serveStatic('./www', {'index': ['index.html']}));

//require('./server/routers').route(app);
app.use('/api', cors(), require('./server/api'));

app.on('error', function (err) {
  console.error('app on error:' + err.stack);
});

//--------------------configure socket ----------------------
require('./server/sockets')(server);