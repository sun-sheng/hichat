module.exports = function (server) {
  var io = require('socket.io')(server);
  var sockets = {};
  sockets.chat = io.on('connection', require('./chat'));
  return sockets;
};