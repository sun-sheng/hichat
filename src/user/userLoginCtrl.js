/*@ngInject*/
module.exports = function ($rootScope, $scope, settings, constants, router, userService, modal, toast, device)
{
    $scope.initialized = true;
    $scope.loading = false;
    $scope.user = {};
    $scope.login = function ()
    {
        $scope.loading = true;
        var user = {
            email: $scope.user.email + settings.user_email_postfix,
            password: $scope.user.password
        };
        userService.login(user).then(function (user)
        {
            router.afterLogin(user);
        }, function (err)
        {
            toast.error('登录失败：' + err.msg);
        }).finally(function ()
        {
            $scope.loading = false;
        });
    };
};