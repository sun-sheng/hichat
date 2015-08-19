var _ = require('lodash');
var mock = require("mock-data");
var faker = require('faker');
faker.locale = 'zh_CN';

module.exports = function (app)
{
    app.post('/webapi/permission/is_permitted_to_these', function (req, res)
    {

        var codes = req.body.codes;
        var data = {};
        codes.forEach(function (code)
        {
            data[code] = 1;
        });

        res.json({
            code: 200,
            msg: '',
            data: data
        });
    });
};