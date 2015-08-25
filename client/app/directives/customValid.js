module.exports = function ($parse) {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, elm, attrs, ctrl) {
      var validate = $parse(attrs['customValid']);
      scope.$watch(attrs['ngModel'], function () {
        if (validate(scope)) {
          ctrl.$setValidity('customValid', true);
        }
        else {
          ctrl.$setValidity('customValid', false);
        }
      });
    }
  };
};