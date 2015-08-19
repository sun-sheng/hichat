/*@ngInject*/
module.exports = function (toast, device)
{

    var element_stack = [];
    var _timeout = Date.now();

    return {

        init: function ()
        {

            if (! device.isAndroid()) return false;

            $$document.on('opened', '.popup', function (e)
            {
                var popupId = e.target.id;
                var element = {
                    id: popupId,
                    do_back: function ()
                    {
                        f7.closeModal('#' + popupId);
                    }
                };
                element_stack.push(element);
            });
            $$document.on('closed', '.popup', function ()
            {
                element_stack.pop();
            });
            $$document.on('pageAfterAnimation', function (e)
            {
                var from = e.detail.page.from;
                var name = e.detail.page.name;

                if (from === 'right')
                {
                    if (name === 'login' || name === 'verify')
                    {
                        return true;
                    }
                    var page = e.detail.page;
                    var element = {
                        page: page,
                        do_back: function ()
                        {
                            this.page.view.back();
                        }
                    };
                    element_stack.push(element);
                }
                else
                {
                    element_stack.pop();
                }
                //alert('the element_stack length is : ' + element_stack.length);
            });

            document.addEventListener("backbutton", function ()
            {
                if (element_stack.length > 1)
                {
                    var last = _.last(element_stack);
                    if (last.page.container.getAttribute('data-stop-back') === 'true')
                    {
                        return true;
                    }
                    last.do_back();
                    f7.closeModal();
                    return true;
                }
                else
                {
                    if (Date.now() - _timeout > 3000)
                    {
                        _timeout = Date.now();
                        toast.text('再按一次退出', 'bottom', 3000);
                    }
                    else
                    {
                        //android 部分机型 用 navigator.app.exitApp(); 退出时内存没有清空，用 close 清内存
                        window.close();
                        navigator.app.exitApp();
                    }
                }
            }, false);

        }

    };

};