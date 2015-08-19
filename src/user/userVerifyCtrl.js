/*@ngInject*/
module.exports = function ($rootScope, $scope, $interval, constants, settings, router, temp, userService, modal, toast, $forage)
{

    $scope.code = '';

    var loading = false;
    //
    var _interval = null;
    $scope.cooling = false;
    $scope.cooldown = 0;

    $scope.$on('$destroy', function ()
    {
        $interval.cancel(_interval);
    });

    $scope.back = function ()
    {
        $forage.remove(constants.FORAGE_KEY.CURRENT_USER).then(router.reload);
    };

    $scope.getCode = function (type)
    {
        if (loading)
        {
            return false;
        }
        loading = true;
        userService.getVerifyCode(type).then(function ()
        {
            cooling(settings.get_verify_code_cooldown_seconds);
        }, function ()
        {
            toast.error('验证码获取失败');
        }).finally(function ()
        {
            loading = false;
        });
    };
    $scope.verify = function ()
    {
        modal.showIndicator();
        userService.verify($rootScope.currentUser, $scope.code).then(function (user)
        {
            modal.hideIndicator();
            router.afterVerify(user);
        }, function ()
        {
            modal.hideIndicator();
            toast.error('验证失败');
        });
    };

    function cooling (seconds)
    {
        $scope.cooling = true;
        $scope.cooldown = seconds;
        _interval = $interval(function ()
        {
            $scope.cooldown --;
            //
            if ($scope.cooldown === 0)
            {
                $scope.cooling = false;
                $interval.cancel(_interval);
            }
        }, 1000);
    }
};