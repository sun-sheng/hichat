/*@ngInject*/
module.exports = function (i18n, device)
{
    var $$eleLoader = $$('<div class="ele-loader"><div class="loader-content"><div class="loader-text"></div></div></div>');
    $$body.append($$eleLoader);
    var $$eleLoaderText = $$eleLoader.find('.loader-text');

    function convert_arguments (args)
    {
        if (args.length === 0)
        {
            return false;
        }
        else if (args.length === 1)
        {
            args[3] = function () {};
            args[2] = function () {};
            args[1] = i18n.global.text.modal_title;
        }
        if (typeof args[1] === 'string')
        {
            args[3] = args[3] || function () {};
            args[2] = args[2] || function () {};
        }
        else if (typeof args[1] === 'function')
        {
            args[3] = args[2] || function () {};
            args[2] = args[1];
            args[1] = i18n.global.text.modal_title;
        }
        else
        {
            return false;
        }
        return args;
    }

    /**
     * 自定义 modal 参考 framework7 的 api
     * @param options
     */
    var modal = function (options)
    {
        return f7.modal(options);
    };

    /**
     * 显示加载指示器
     */
    modal.showIndicator = function (text)
    {
        f7.showIndicator();
        //$$eleLoaderText.text(text);
        //$$eleLoader.show();
    };
    /**
     * 关闭加载指示器
     */
    modal.hideIndicator = function ()
    {
        f7.hideIndicator();
        //$$eleLoaderText.text('');
        //$$eleLoader.hide();
    };

    /**
     * 显示带文本的加载指示器
     * @param title
     */
    modal.showPreloader = function (title)
    {
        f7.showPreloader(title);
    };
    /**
     * 关闭带文本的加载指示器
     */
    modal.hidePreloader = function ()
    {
        f7.hidePreloader();
    };
    /**
     * 弹出提醒框
     */
    modal.alert = function (text, title, okFunc)
    {
        if (device.isCordova())
        {
            var args = convert_arguments(arguments);
            if (args === false)
            {
                return false;
            }
            text = args[0];
            title = args[1];
            okFunc = args[2];
            navigator.notification.alert(text, okFunc, title, i18n.global.text.ok);
        }
        else
        {
            f7.alert(text, title, okFunc);
        }
    };
    /**
     * 弹出确认框
     */
    modal.confirm = function (text, title, okFunc, cancelFunc)
    {

        if (device.isCordova())
        {
            var args = convert_arguments(arguments);
            if (args === false)
            {
                return false;
            }
            text = args[0];
            title = args[1];
            okFunc = args[2];
            cancelFunc = args[3];
            navigator.notification.confirm(text, function (btnIndex)
            {
                // no button = 0, 'OK' = 1, 'Cancel' = 2
                if (btnIndex === 1)
                {
                    okFunc();
                }
                else if (btnIndex === 2)
                {
                    cancelFunc();
                }
            }, title, [i18n.global.text.ok, i18n.global.text.cancel]);
        }
        else
        {
            f7.confirm(text, title, okFunc, cancelFunc);
        }
    };
    /**
     * 弹出文本输入框
     */
    modal.prompt = function (text, title, okFunc, cancelFunc)
    {

        if (device.isCordova())
        {
            var args = convert_arguments(arguments);
            if (args === false)
            {
                return false;
            }
            text = args[0];
            title = args[1];
            okFunc = args[2];
            cancelFunc = args[3];
            navigator.notification.prompt(text, function (result)
            {
                var input = result.input1;
                // no button = 0, 'OK' = 1, 'Cancel' = 2
                var btnIndex = result.buttonIndex;
                if (btnIndex === 1)
                {
                    okFunc(input);
                }
                else if (btnIndex === 2)
                {
                    cancelFunc(input);
                }
            }, title, [i18n.global.text.ok, i18n.global.text.cancel]);
        }
        else
        {
            f7.prompt(text, title, okFunc, cancelFunc);
        }
    };
    /**
     * 参照 framework7 api
     */
    modal.f7actions = function (options)
    {
        f7.actions(options);
    };
    /**
     * 封装 f7 actions
     * @param actions
     * @param options
     */
    modal.showActions = function (actions, options)
    {
        var actionGroups = [
            [
                {
                    text: options.title || '操作',
                    label: true
                }
            ],
            [
                {
                    text: options.cancelText || '取消',
                    color: options.cancelColor || 'red'
                }
            ]
        ];
        _.each(actions, function (action)
        {
            actionGroups[0].push(action);
        });
        f7.actions(actionGroups);
    };

    /**
     * 关闭 打开的 modal
     */
    modal.close = function (selector)
    {
        f7.closeModal(selector);
    };
    /**
     * 发出蜂鸣声
     * @param times {number} 蜂鸣次数
     */
    modal.beep = function (times)
    {
        navigator.notification.beep(times);
    };
    /**
     * 图片浏览器 参阅 framework7 api
     * @param options
     */
    modal.createPhotoBrowser = function (options)
    {
        if (!angular.isObject(options)) return false;
        options.backLinkText = options.backLinkText || '关闭';
        options.ofText = options.ofText || ' / ';
        return f7.photoBrowser(options);
    };
    /**
     * picker 参阅 framework7 picker，注意当 scope 销毁时，调用返回 picker 对象的 destroy 方法
     * @param options
     */
    modal.createPicker = function (options)
    {
        return f7.picker(options);
    };
    /**
     * picker 参阅 framework7 calendar，注意当 scope 销毁时，调用返回 calendar 对象的 destroy 方法
     * @param options
     */
    modal.createCalendar = function (options)
    {
        return f7.calendar(options);
    };

    return modal;

};