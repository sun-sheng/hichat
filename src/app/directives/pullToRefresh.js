module.exports = function ()
{
    return {
        restrict: 'A',
        compile: function (element)
        {
            element.prepend('<div class="pull-to-refresh-layer with-text"><div class="preloader"></div><div class="pull-to-refresh-arrow"></div></div>');
        },
        controller: [
            '$scope',
            '$element',
            '$attrs',
            '$parse',
            'constants',
            function ($scope, $element, $attrs, $parse, constants)
            {
                var action = $parse($attrs['pullToRefresh']);
                var distance = $attrs['ptrDistance'] || 64;
                var readyAction = $parse($attrs['ptrReady']);
                var $$element = $$($element[0]);
                $$element.addClass('pull-to-refresh-content');
                $$element.attr('data-ptr-distance', distance);
                //init
                f7.initPullToRefresh($$element);
                //refresh
                $$element.on('refresh', function ()
                {
                    var result = action($scope);
                    if (angular.isDefined(result) && angular.isFunction(result.then) && angular.isFunction(result.finally))
                    {
                        result.finally(function ()
                        {
                            f7.pullToRefreshDone($$element);
                        });
                    }
                    else
                    {
                        f7.pullToRefreshDone($$element);
                    }
                });
                //destroy
                $scope.$on('$destroy', function ()
                {
                    f7.destroyPullToRefresh($$element);
                });
                //trigger
                $scope.$on(constants.EVENT_NAME.PULL_TO_REFRESH, function ()
                {
                    f7.pullToRefreshTrigger($$element);
                });
                //i am ready and do ready action
                readyAction($scope);
            }
        ]
    };
};