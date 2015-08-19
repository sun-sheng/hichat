/*@ngInject*/
module.exports = function ($q, $interval, $scope, settings, temp, userService, modal, toast, location)
{

    var number_labels = ['', '一', '二', '三', '四', '五', '六'];

    var loading = false;

    var limit = settings.page_size;

    $scope.data = {
        length: 0,
        count: 0,
        page: 0,
        end: false,
        groups: []
    };
    $scope.checking = false;

    var checkin_cooldown_ms = settings.checkin_cooldown_seconds * 1000;

    var animation_frame_id;

    function requestAnimationFrame (func)
    {
        if (window.requestAnimationFrame)
        {
            return (window.requestAnimationFrame(func));
        }
        else
        {
            return setTimeout(func, 50);
        }
    }

    function cancelAnimationFrame (id)
    {
        if (window.cancelAnimationFrame)
        {
            window.cancelAnimationFrame(id);
        }
        else
        {
            clearTimeout(id);
        }
    }

    if (temp.checkin.interval_time !== 0)
    {
        cooling(temp.checkin.interval_time);
    }
    else
    {
        $scope.cooling = false;
    }

    var $page = $$($scope.f7page.container);

    var $coolingText = $page.find('.stopwatch-text');
    var $coolingLoaderBefore = $page.find('.cooling-loader-before');
    var $coolingLoaderAfter = $page.find('.cooling-loader-after');
    var $coolingLoaderInner = $page.find('.cooling-loader-inner');

    $scope.$on('$destroy', function ()
    {
        cancelAnimationFrame(animation_frame_id);
    });

    //定位
    $scope.checkin = function ()
    {
        if ($scope.checking || $scope.cooling)
        {
            return false;
        }
        $scope.checking = true;
        location.getBaiduPosition().then(function (position)
        {

            return userService.checkin({
                latitude: position.latitude,
                longitude: position.longitude,
                hint: position.address
            });
        }).then(function (result)
        {
            modal.alert(result.moment.format('HH:mm') + result.address, '签到成功');
            cooling();
            group_new_item(result);
        }, function ()
        {
            toast.error('签到失败');
        }).finally(function ()
        {
            $scope.checking = false;
        });
    };
    $scope.loadMore = function ()
    {
        if (loading || $scope.data.end)
        {
            return false;
        }
        loading = true;
        modal.showIndicator();
        var page = $scope.data.page + 1;
        userService.loadCheckinHistoryList({
            offset: (page - 1) * limit,
            limit: limit
        }).then(function (data)
        {
            $scope.data.length += data.list.length;
            if (data.count !== 0 && data.count <= $scope.data.length)
            {
                $scope.data.end = true;
            }
            $scope.data.count = data.count;
            $scope.data.page = page;

            group(data.list);
        }, function ()
        {
            toast.error('加载历史记录失败');
        }).finally(function ()
        {
            loading = false;
            modal.hideIndicator();
        });
    };

    $scope.loadMore();

    function cooling (interval_time)
    {
        $scope.cooling = true;
        if (interval_time)
        {
            temp.checkin.interval_time = interval_time;
        }
        else
        {
            temp.checkin.interval_time = Date.now();
        }
        animation_frame_id = requestAnimationFrame(cooling_step);
    }

    function cooling_step ()
    {
        var offset = Date.now() - temp.checkin.interval_time;
        if (offset >= checkin_cooldown_ms)
        {
            cancelAnimationFrame(animation_frame_id);
            temp.checkin.interval_time = 0;
            $scope.cooling = false;
            $coolingLoaderBefore[0].style.display = 'block';
            $coolingLoaderAfter[0].style.display = 'none';
            $scope.$apply();
            return true;
        }
        if (offset >= checkin_cooldown_ms / 2)
        {
            $coolingLoaderBefore[0].style.display = 'none';
            $coolingLoaderAfter[0].style.display = 'block';
        }
        var seconds = parseInt((checkin_cooldown_ms - offset) / 1000);
        var minutes = parseInt(seconds / 60);
        seconds = seconds % 60;
        if (seconds < 10)
        {
            seconds = '0' + seconds;
        }
        $coolingText.html(minutes + ':' + seconds);
        var deg = 45 + (offset) * 360 / checkin_cooldown_ms;
        var rotate = 'rotate(' + deg + 'deg)';
        $coolingLoaderInner.transform(rotate);
        animation_frame_id = requestAnimationFrame(cooling_step);
    }

    function group_new_item (item)
    {
        var groups = $scope.data.groups;
        var group;
        if (groups.length === 0)
        {
            group = {
                title: item.moment.month() + 1 + '月 第' + number_labels[item.week_of_month] + '周',
                list: [item]
            };
            groups.push(group);
            return true;
        }
        var prev_first_list = _.first(groups).list;
        var prev_first_item = _.first(prev_first_list);
        if (item.moment.week() === prev_first_item.moment.week())
        {
            prev_first_list.unshift(item);
        }
        else
        {
            group = {
                title: item.moment.month() + 1 + '月 第' + number_labels[item.week_of_month] + '周',
                list: [item]
            };
            groups.unshift(group);
        }
    }

    function group (list)
    {
        var groups = $scope.data.groups;
        _.forEach(list, function (item)
        {
            var group;
            if (groups.length === 0)
            {
                group = {
                    title: item.moment.month() + 1 + '月 第' + number_labels[item.week_of_month] + '周',
                    list: [item]
                };
                groups.push(group);
                return true;
            }
            var prev_last_list = _.last(groups).list;
            var prev_last_item = _.last(prev_last_list);

            if (item.week_of_month === prev_last_item.week_of_month && item.month === prev_last_item.month)
            {
                prev_last_list.push(item);
            }
            else
            {
                group = {
                    title: item.moment.month() + 1 + '月 第' + number_labels[item.week_of_month] + '周',
                    list: [item]
                };
                groups.push(group);
            }
        });
    }

};