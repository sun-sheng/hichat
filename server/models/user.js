var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;
var base = require('./plugins/base');

var UserSchema = new Schema({
  nickname: String,
  name: String,
  password: String,
  email: String,
  avatar: String,
  signature: String,
  city: String,
  gender: Number,
  mobile: String,
  chat_ids: [String],
  contact_ids: [String],
  bg_image: String,
  access_token: String,
  expired_time: Date
});
UserSchema.plugin(base);

module.exports = mongoose.model('User', UserSchema);
