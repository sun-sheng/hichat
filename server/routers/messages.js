var _ = require('lodash');

module.exports = function (app)
{
    app.get('/messages/:contact_id', function (req, res)
    {
        setTimeout(function ()
        {
            res.json({
                code: 200,
                msg: '',
                data: {
                    1: {
                        id: 1,
                        count: 300,
                        name: '餐厅中心',
                        icon: 'images/icons/msg-rst-center.png',
                        latest: {
                            title: '',
                            content: '餐厅 XX 被关闭了',
                            created_at: Date.now()
                        }
                    },
                    2: {
                        id: 2,
                        count: 1,
                        name: '开店申请',
                        icon: 'images/icons/msg-rst-add-apply.png',
                        latest: {
                            title: '',
                            content: '餐厅 XX 申请开店',
                            created_at: Date.now()
                        }
                    },
                    3: {
                        id: 3,
                        count: 0,
                        name: '订单中心',
                        icon: 'images/icons/msg-order-center.png'
                    },
                    4: {
                        id: 4,
                        count: 0,
                        name: '无效订单',
                        icon: 'images/icons/msg-order-invalid.png'
                    },
                    5: {
                        id: 5,
                        count: 0,
                        name: '活动中心',
                        icon: 'images/icons/msg-act-center.png'
                    },
                    6: {
                        id: 6,
                        count: 0,
                        name: '移动经分',
                        icon: 'images/icons/msg-3rd-dt.png'
                    },
                    7: {
                        id: 7,
                        count: 0,
                        name: '签到',
                        icon: 'images/icons/msg-checkin.png'
                    }
                }
            });
        }, 3000);

    });

};