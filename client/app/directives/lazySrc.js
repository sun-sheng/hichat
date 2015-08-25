module.exports = function () {
  return {
    restrict: 'A',
    link: function ($scope, $element, $attrs) {

      var element = $element[0];

      function load(src) {
        var img;
        img        = new Image();
        img.src    = src;
        $element.addClass('lazy-loading');
        img.onload = function () {
          element.src = src;
          $element.removeClass('lazy-loading');
        };
      }

      $scope.$watch((function () {
        return $attrs.lazySrc;
      }), function (value) {
        if (value !== element.src) {
          load(value);
        }
      });
    }
  };
};