/*@ngInject*/
module.exports = function ($scope, $rootScope, constants, settings, messageService, util)
{
    var loading = false;
    var data = {
        results: [],
        count: 0
    };
    $scope.data = data;

    $scope.load = function ()
    {
        if (loading) return false;
        loading = true;
    };

    $scope.refresh = function ()
    {
        $scope.$broadcast(constants.EVENT_NAME.PULL_TO_REFRESH);
    };

};