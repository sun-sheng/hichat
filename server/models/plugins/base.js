/**
 * 给所有的 Model 扩展功能
 * http://mongoosejs.com/docs/plugins.html
 */
var uuid = require('node-uuid');

module.exports = function (schema) {

  schema.set('toJSON', {virtuals: true});
  schema.add({
    id: {type: String, default: uuid.v1},
    created_at: {type: Number, default: Date.now},
    updated_at: {type: Number, default: Date.now},
    deleted: {type: Boolean, default: false}
  });
  /*
  schema.pre('save', function (next) {
    var now         = Date.now();
    var root        = this;
    root.updated_at = now;
    if (!root.created_at) root.created_at = now;
    if (!root.id) root.id = uuid.v1();
    next();
  });
  */
};
