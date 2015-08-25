module.exports = function () {
  return {
    restrict: 'A',
    scope: {
      f7route: '=',
      f7routeOptions: '=',
      f7routeQuery: '='
    },
    controller: [
      '$scope',
      '$element',
      '$templateCache',
      'settings',
      'logger',
      function ($scope, $element, $templateCache, settings, logger) {
        var $$element = $$($element);
        $$element.addClass(settings.f7externalClass);

        function fireRoute(e) {
          e.preventDefault();
          var viewDom = $$element.parents('.view')[0];
          var f7view  = viewDom && viewDom.f7View ? viewDom.f7View : window.f7MainView;
          var options = $scope.f7routeOptions || {};
          var content = $templateCache.get($scope.f7route);
          if (!content) {
            logger.error('f7route 不存在！');
            return false;
          }
          options = angular.extend(options, {
            content: content,
            query: $scope.f7routeQuery
          });
          f7view.router.load(options);
        }

        $$element.on('click', fireRoute);

        $scope.$on('$destroy', function () {
          $$element.off('click', fireRoute);
        });
      }
    ]
  };
};