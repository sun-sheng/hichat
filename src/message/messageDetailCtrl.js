/*@ngInject*/
module.exports = function ($scope, $rootScope, $templateCache, settings, temp, messageService, modal, util)
{
    var contact = $scope.f7page.query;
    var query = {
        limit: settings.page_size,
        offset: 0,
        contact_id: contact.id
    };
    var loading = false;
    var data = {
        title: contact.name,
        end: false
    };
    $scope.data = data;
    var $msgList = $$($scope.f7page.container).find('.msg-list');
    var compileMsgList = Template7.compile($templateCache.get('msg-item-t7.html'));

    $scope.load = function (more, showIndicator)
    {
        if (loading || (more && data.end))
        {
            return false;
        }
        loading = true;
        if (showIndicator) modal.showIndicator();
        if (!more)
        {
            query.offset = 0;
        }
        return messageService.search(query).then(function (res)
        {
            var results = res.results;
            var startOfTodayTime = moment().startOf('day').valueOf();
            _.each(results, function (item)
            {
                item.created_at_text = util.fromNow(item.created_at, startOfTodayTime);
            });
            query.offset += results.length;
            data.count = res.count;
            data.end = query.offset >= data.count && data.count > 0;
            var html = compileMsgList(res);
            if (more) {
                $msgList.prepend(html);
            } else {
                $msgList.html(html);
            }
        }).finally(function ()
        {
            loading = false;
            if (showIndicator) modal.hideIndicator();
        });
    };

    $scope.load();

};