/*@ngInject*/
module.exports = function ($rootScope, $scope, router) {

  $scope.chat = router.getF7pageQuery($scope.f7page);

};