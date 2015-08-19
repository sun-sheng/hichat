/*@ngInject*/
module.exports = function ()
{
    var logger;
    if (window.console)
    {
        logger = window.console;
    }
    else
    {
        logger = {
            log: function ()
            {

            },
            warn: function ()
            {

            },
            error: function ()
            {

            }
        };
    }
    return logger;
};