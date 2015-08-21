module.exports = function () {
  return {
    restrict: 'EA',
    replace: true,
    compile: function (element) {
      var $ele = $$(element);
      $ele.find('.navbar-title').text($ele.attr('title'));
    },
    templateUrl: 'navbar.html'
  };
};