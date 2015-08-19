/*@ngInject*/
module.exports = function ($scope, router, constants, userService, modal, toast, $forage)
{
    $scope.password = {
        current: '',
        new: '',
        confirm: ''
    };
    $scope.loading = false;
    $scope.submit = function ()
    {
        if ($scope.password.new !== $scope.password.confirm)
        {
            toast.error('输入的新密码不一致');
            return false;
        }
        if ($scope.loading)
        {
            return false;
        }
        $scope.loading = true;
        modal.showIndicator();
        userService.changePassword($scope.password).then(function ()
        {
            modal.alert('修改密码成功,请重新登录', function ()
            {
                $forage.remove(constants.FORAGE_KEY.CURRENT_USER).then(router.reload);
            });
        }, function (err)
        {
            var msg = err.msg;
            if (err.code === 'HR_USER_AUTHENTICATION_FAILED')
            {
                msg = '原密码不正确';
            }
            toast.error('重置密码失败：' + msg);
        }).finally(function ()
        {
            modal.hideIndicator();
            $scope.loading = false;
        });
    }
};