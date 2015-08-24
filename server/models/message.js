var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var base     = require('./plugins/base');

var MessageSchema = new Schema({
  chat_id: String,
  user_id: String,
  receiver_id: String,
  client_id: String,
  type: String,
  content: String
});
MessageSchema.plugin(base);

module.exports = mongoose.model('Message', MessageSchema);
