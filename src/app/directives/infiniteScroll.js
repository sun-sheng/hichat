module.exports = function ()
{
    return {
        restrict: 'A',
        compile: function (element)
        {
            var html = '<div class="infinite-scroll-preloader"><div class="preloader"></div><div class="preloader-text">';
            html += '</div></div>';
            if (element.hasClass('infinite-scroll-top'))
            {
                element.prepend(html);
            }
            else
            {
                element.append(html);
            }
        },
        scope: {
            infiniteScrollDisabled: '=',
            infiniteScrollHidden: '=',
            infiniteScroll: '&'
        },
        controller: [
            '$scope',
            '$element',
            '$attrs',
            '$parse',
            function ($scope, $element, $attrs, $parse)
            {
                //var action = $parse($attrs['infiniteScroll']);
                var $$element = $$($element[0]);
                var $preloader = $$element.find('.infinite-scroll-preloader');
                var $preloaderText = $preloader.find('.preloader-text');
                var scrollText = $attrs['infiniteScrollText'] || '正在加载中';
                var scrollDisabledText = $attrs['infiniteScrollDisabledText'] || '暂无更多数据';
                $$element.addClass('infinite-scroll');
                f7.attachInfiniteScroll($$element);
                $$element.on('infinite', function ()
                {
                    if ($scope.infiniteScrollDisabled)
                    {
                        return false;
                    }
                    $scope.infiniteScroll();
                    //action($scope);
                });
                $scope.$on('$destroy', function ()
                {
                    f7.detachInfiniteScroll($$element);
                });
                $scope.$watch('infiniteScrollDisabled', function (value)
                {
                    if (value)
                    {
                        $preloader.addClass('disabled');
                        $preloaderText.text(scrollDisabledText);
                    }
                    else
                    {
                        $preloader.removeClass('disabled');
                        $preloaderText.text(scrollText);
                    }
                });
                $scope.$watch('infiniteScrollHidden', function (value)
                {
                    if (value)
                    {
                        $preloader.addClass('hidden');
                    }
                    else
                    {
                        $preloader.removeClass('hidden');
                    }
                });
            }
        ]
    };
};