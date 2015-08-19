module.exports = function ()
{
    var local = '' || 'zh-cn';
    var lang = 'lang.' + local;
    return angular.injector(['lang', 'ng']).get(lang);
};