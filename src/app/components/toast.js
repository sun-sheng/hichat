/*@ngInject*/
module.exports = function ()
{

    var $$toasts = $$('<ul id="app-toasts" class="toasts"></ul>');

    $$body.append($$toasts);

    var toast_duration = 3000;

    var msgMixes = [];

    return {

        success: function (msg, position, duration)
        {
            this.show({
                msg: msg,
                type: 'success',
                position: position,
                duration: duration
            });
        },
        error: function (msg, position, duration)
        {
            this.show({
                msg: msg,
                type: 'error',
                position: position,
                duration: duration
            });
        },
        warn: function (msg, position, duration)
        {
            this.show({
                msg: msg,
                type: 'warning',
                position: position,
                duration: duration
            });
        },
        info: function (msg, position, duration)
        {
            this.show({
                msg: msg,
                type: 'info',
                position: position,
                duration: duration
            });
        },
        text: function (msg, position, duration)
        {
            this.show({
                msg: msg,
                position: position,
                duration: duration
            });
        },

        show: function (options)
        {
            var msg = options.msg;
            var type = options.type ? 'type-' + options.type : 'type-default';
            var duration = options.duration || toast_duration;
            var position = options.position || 'bottom';
            position = 'position-' + position;
            var className = 'toast ' + type;
            var $$toast = $$('<li class="' + className + '"><div class="toast-msg">' + msg + '</div></li>');
            $$toasts.append($$toast);
            var mix = {
                $dom: $$toast
            };
            msgMixes.push(mix);
            $$toasts.removeClass('position-top position-center position-bottom').addClass(position).show();
            $$toast.addClass('toast-in');
            mix.timeout = setTimeout(_.bind(this.hide, null, mix), duration);
            return mix;
        },

        hide: function (mix)
        {
            clearTimeout(mix.timeout);
            mix.$dom.addClass('toast-out').transitionEnd(function ()
            {
                mix.$dom.remove();
                _.remove(msgMixes, mix);
                mix = null;
                if (msgMixes.length === 0) $$toasts.hide();
            });
        }

    };

};