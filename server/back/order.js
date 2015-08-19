var _ = require('lodash');
var mock = require("mock-data");
var faker = require('faker');
faker.locale = 'zh_CN';

module.exports = function (app)
{
    app.get('/webapi/order/search', function (req, res)
    {

        var count = 10;
        var limit = req.query.limit;
        var offset = req.query.offset;
        var times = count > (offset + limit) ? limit : (count - offset);
        var begin = req.query.begin_time;
        var end = req.query.end_time;

        setTimeout(function ()
        {
            res.json({
                code: 200,
                msg: '',
                data: {
                    count: count,
                    list: _.times(times, function ()
                    {
                        return {
                            rst_id: offset ++,
                            rst_name: faker.company.companyName(),
                            rst_admin_phone: faker.phone.phoneNumber(), //walle中餐厅管理员的电话
                            order_id: offset,
                            order_amount: 98 ,//饿单总金额
                            order_time: Date.now(),//下单时间(精确显示到时分)
                            user_phone: faker.phone.phoneNumber(),//用户电话
                            order_address: faker.address.streetName(),//收餐地址
                            comment: faker.lorem.sentences(2),//无效原因
                            order_status: 0 //订单状态 0 无效 1 有效
                        };
                    })
                }
            });
        }, 3000);
    });

    app.get('/webapi/order/zone_list', function (req, res)
    {
        res.json({
            code: 200,
            msg: '',
            data: []
            //data: [{
            //    id: 1,
            //    name: '上海交大',
            //    type: 1
            //}]
        });
    });

};