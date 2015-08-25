module.exports = function () {
  return {
    restrict: 'A',
    link: function ($scope, $element, $attrs) {

      var element = $element[0];

      function load(src) {
        var img;
        img        = new Image();
        img.src    = src;
        img.onload = function () {
          element.src = src;
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