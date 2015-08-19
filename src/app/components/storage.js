/*@ngInject*/
module.exports = function ()
{
    return {
        set: function (key, value)
        {
            localStorage.setItem(key, JSON.stringify(value));
        },
        get: function (key)
        {
            var item = localStorage.getItem(key);
            if (item) item = JSON.parse(item);
            return item;
        },
        remove: function (key)
        {
            localStorage.removeItem(key);
        },
        clear: function ()
        {
            localStorage.clear();
        }
    };
};