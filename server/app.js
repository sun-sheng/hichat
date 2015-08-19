var express = require('express');
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var cors = require('cors');
var _ = require('lodash');

var OnlineUser = require('./services/OnlineUser');
var Chat = require('./services/Chat');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(7001);

//--------------------configure app----------------------

//app.use(express.methodOverride());
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(morgan('short'));
app.use(serveStatic('./src', {'index': ['index.html']}));

require('./routers').loadRoute(app);

app.on('error', function (err) {
    console.error('app on error:' + err.stack);
});

//--------------------configure socket ----------------------
io.on('connection', function (socket)
{
    socket.on('register', function (data)
    {
        var user = OnlineUser.get(data.user_id);
        if (user) user.socket = socket;
    });
    socket.on('message', function (data)
    {
        var chat_id = data.chat_id;
        //查找到 chat 对象
        var chat = Chat.get(chat_id);
        var user_ids = chat.user_ids;
        _.each(user_ids, function (id)
        {
            var user = OnlineUser.get(id);
            if (user && user.socket) user.socket.emit('message', data);
        });
    });
});