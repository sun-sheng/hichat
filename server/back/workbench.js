
var _ = require('lodash');
var mock = require("mock-data");
var faker = require('faker');
faker.locale = 'zh_CN';

module.exports = function (app) {
    app.get('/webapi/workbench/checkin_data', function (req, res) {
        var count = 26;
        var limit = req.query.limit;
        var index = 0;
        var temp = 1000 * 3600 * 12;
        res.json({
            code: 200,
            msg: '',
            data: {
                count: count,
                list: _.times(limit, function () {
                    index ++ ;
                    return {
                        id: Number(_.uniqueId()),
                        longitude: faker.address.longitude(),
                        latitude: faker.address.latitude(),
                        address: faker.address.streetAddress(),
                        status: 1,
                        created_at: Date.now() - index * temp
                    }
                })
            }
        });
    });
    app.post('/webapi/workbench/checkin', function (req, res) {
        var hint = req.body.hint;
        res.json({
            code: 200,
            msg: '',
            data: {
                longitude: req.body.longitude,
                latitude: req.body.latitude,
                address: hint,
                status: 1,
                created_at: Date.now()
            }
        });
    });
    app.get('/webapi/workbench/info_for_thirdparty', function (req, res) {
        var party = [{
            id: 1,
            num: 1,
            url: 'http://app.dt.ele.me/#/token/[token]',
            name: '移动经分',
            icon: 'ico-equalizer',
            version: '1.0.0',
            handle_back: 0
        }, {
            id: 2,
            num: 2,
            url: 'http://172.16.28.151:88/#/?token=[token]',
            name: '饿小贤',
            icon: 'ico-3rd-action',
            version: '1.0.0',
            handle_back: 1
        }, {
            id: 3,
            num: 3,
            url: 'http://10.97.192.156:5010/src/demo.html',
            name: 'Test Bridge',
            icon: 'ico-3rd-action',
            version: '1.0.0'
        }];
        res.json({
            code: 200,
            msg: '',
            data: party
        });
    });
};