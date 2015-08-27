/*@ngInject*/
module.exports = function () {

  this.config = $toast.config;

  this.$get = function () {
    return $toast;
  }
};