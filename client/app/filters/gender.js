/*@ngInject*/
module.exports = function () {
  var dict = {
    '0' : '女',
    '1' : '男'
  };
  return function (value) {
    return dict[value];
  }
};