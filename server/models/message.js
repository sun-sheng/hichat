var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;
var base = require('./plugins/base');

var MessageSchema = new Schema({
  user_id: { type: String },
  chat_id: { type: String },
  type: String,
  content: String
});
MessageSchema.plugin(base);

module.exports = mongoose.model('Message', MessageSchema);
