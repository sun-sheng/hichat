/*@ngInject*/
module.exports = function ()
{

    var ONE_DAY_TIME = 24 * 60 * 60 * 1000;

    return {

        bindEvents: function (bindings)
        {
            bindings.forEach(function (binding)
            {
                if (binding.selector)
                {
                    $$(binding.element).on(binding.event, binding.selector, binding.handler);
                }
                else
                {
                    $$(binding.element).on(binding.event, binding.handler);
                }
            });
        },

        unbindEvents: function (bindings)
        {
            bindings.forEach(function (binding)
            {
                if (binding.selector)
                {
                    $$(binding.element).off(binding.event, binding.selector, binding.handler);
                }
                else
                {
                    $$(binding.element).off(binding.event, binding.handler);
                }
            });
        },

        /**
         *
         * @param array
         * @param func string|number|object|function
         */
        indexOf: function (array, func)
        {
            if (array instanceof Array !== true)
            {
                return - 1;
            }
            var type = typeof func;
            if (type === 'string' || type === 'number')
            {
                return array.indexOf(func);
            }
            var index, item;
            if (type === 'object')
            {
                index = array.length;
                while (index --)
                {
                    item = array[index];
                    if (this.contain(item, func))
                    {
                        return index;
                    }
                }
            }
            if (type === 'function')
            {
                index = array.length;
                while (index --)
                {
                    item = array[index];
                    if (func(item))
                    {
                        return index;
                    }
                }
            }
            return - 1;
        },
        /**
         * 判断 是否 包含
         * @param host
         * @param item
         * @returns {boolean}
         */
        contain: function (host, item)
        {
            var invalid;
            for (var key in item)
            {
                invalid = host[key] !== item[key];
                if (invalid)
                {
                    break;
                }
            }
            return ! invalid;
        },
        /**
         * 格式化 timestamp
         * @param time {timestamp}
         * @param startOfToadyTime {timestamp}
         * @param formats {Array}
         */
        fromNow: function (time, startOfToadyTime, formats)
        {
            var text = '';
            if (!time)
            {
                return text;
            }
            if (!startOfToadyTime)
            {
                startOfToadyTime = moment().startOf('day').valueOf();
            }
            formats = formats || ['a H:mm','昨天 H:mm','前天 H:mm','YYYY年M月D日 H:mm'];
            var mom = moment(time);
            var time1 = startOfToadyTime - ONE_DAY_TIME;
            var time2 = time1 - ONE_DAY_TIME;
            if (time > startOfToadyTime)
            {
                text = mom.format(formats[0]);
            }
            else if (time > time1)
            {
                text = mom.format(formats[1]);
            }
            else if (time > time2)
            {
                text = mom.format(formats[2]);
            }
            else
            {
                text = mom.format(formats[3]);
            }
            return text;
        }

    };

};