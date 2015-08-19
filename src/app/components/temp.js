/**
 * 定义临时存储空间
 */
/*@ngInject*/
module.exports = function ()
{
    return {
        get_verify_code: {
            cooldown: 0
        },
        checkin: {
            interval_time: 0
        },
        messageMainPage: {},
        contactListPage: {},
        rstMainPage: {},
        worktablePage: {}
    };
};