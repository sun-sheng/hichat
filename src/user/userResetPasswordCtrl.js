/*@ngInject*/
module.exports = function ($scope, settings, userService, modal, toast)
{
    $scope.email = '';
    $scope.loading = false;
    $scope.submit = function ()
    {
        if ($scope.loading)
        {
            return false;
        }
        $scope.loading = true;
        modal.showIndicator();
        var email = $scope.email + settings.user_email_postfix;
        userService.resetPassword(email).then(function ()
        {
            modal.alert('请前往邮箱完成重置密码操作', function ()
            {
                $scope.f7page.view.router.back();
            });
        }, function (err)
        {
            if (err.code === 'SESSION_USER_EMAIL_USER_NOT_FOUND')
            {
                err.msg = '邮箱不存在';
            }
            toast.error('重置密码失败：' + err.msg);
        }).finally(function ()
        {
            modal.hideIndicator();
            $scope.loading = false;
        });
    }
};