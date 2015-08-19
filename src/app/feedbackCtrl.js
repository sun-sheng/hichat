/*@ngInject*/
module.exports = function ($scope, commonService, modal, toast)
{
    $scope.content = '';
    var loading = false;
    $scope.submit = function ()
    {

        if (! $scope.content)
        {
            toast.warn('请输入反馈内容');
            return false;
        }
        if (loading) return false;
        loading = true;
        modal.showIndicator();
        commonService.feedback({
            content: $scope.content
        }).then(function ()
        {
            modal.alert('感谢您的反馈', function ()
            {
                $scope.f7page.view.router.back();
            });
        }, function ()
        {
            toast.error('反馈失败');
        }).finally(function ()
        {
            modal.hideIndicator();
            loading = false;
        });
    }
};