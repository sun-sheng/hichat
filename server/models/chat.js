var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var base     = require('./plugins/base');

var ChatSchema = new Schema({
  type: { type: String, default: 'p2p' },
  icon: String,
  title: String,
  user_ids: [String],
  users: Object
});
ChatSchema.plugin(base);

module.exports = mongoose.model('Chat', ChatSchema);
