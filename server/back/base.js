
var _ = require('lodash');
var mock = require("mock-data");
var faker = require('faker');
faker.locale = 'zh_CN';

module.exports = function (app) {
    app.post('/webapi/base/check_version_info', function (req, res) {
        res.json({
            code: 200,
            msg: '',
            data: {
                latest_version: '2.0.0',
                need_update: 0,
                need_forced_update: 0,
                url: 'http://ele.me',
                description: '更新部门数据'
            }
        });
    });
};