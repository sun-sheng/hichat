/**
 * 给所有的 Model 扩展功能
 * http://mongoosejs.com/docs/plugins.html
 */
module.exports = function (schema) {

  schema.add({
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false }
  });

};
