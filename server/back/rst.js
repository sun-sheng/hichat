var _               = require('lodash');
var mock            = require("mock-data");
var faker           = require('faker');
faker.locale        = 'zh_CN';
var rst_group_dict  = require('../dict/rst_group');
var rst_status_dict = require('../dict/rst_status');
var rst_status_ids  = _.keys(rst_status_dict);

module.exports = function (app) {
  app.get('/webapi/rst/search', function (req, res) {

    var count     = 100;
    var limit     = req.query.limit;
    var offset    = req.query.offset;
    var keyword   = req.query.keyword || '';
    var status_id = req.query.status_id;
    var group_id  = req.query.group_id;

    res.json({
      code: 200,
      msg: '',
      data: {
        count: count,
        list: _.times(limit, function () {
          var busy_level = faker.random.array_element(rst_status_ids);
          if (status_id) {
            busy_level = status_id;
          }
          return {
            id: offset++,
            image_url: faker.image.food(),
            name: faker.company.companyName() + keyword,
            phone: faker.phone.phoneNumber(), //walle中餐厅管理员的电话
            status: faker.random.array_element([0, 1]),
            busy_level: busy_level
          };
        })
      }
    });
  });
  app.get('/webapi/rst/rst_detail/:id', function (req, res) {
    var id           = req.params.id;
    var status_id    = faker.random.array_element([0, 1]);
    var come_from_id = faker.random.array_element([0, 1]);
    var busy_level_id;
    res.json({
      code: 200,
      msg: '',
      data: {
        id: id,
        name: faker.company.companyName(), //餐厅名称
        service_time: [['09:00:00', '21:00:00']],
        phone: faker.phone.phoneNumber(), //walle中餐厅管理员的电话
        mobile: faker.phone.phoneNumber(), //短信电话
        address_text: faker.address.streetName(),
        name_for_url: faker.internet.domainName(), //网店地址
        description: faker.lorem.sentences(15), //简介
        status_name: faker.random.array_element(['正常营业', '暂时关闭']),
        come_from: faker.random.array_element([0, 1]), //开店方式 offline：0 ,online：1
        come_from_name: faker.random.array_element(['线上', '线下']),
        busy_level: faker.random.array_element(rst_status_ids), //营业状态
        busy_level_name: faker.random.array_element(['正常营业', '暂时关闭']),
        cer_status: faker.random.array_element([-2, -1, 0, 1]), //认证状态 －2 未提交认证 －1认证失败  0待审核 1 通过审核
        cer_status_name: faker.random.array_element(['未提交认证', '认证失败', '待审核', '通过审核']),
        admin_status: faker.random.array_element([0, 1]), //管理员状态 0 未绑定 1 已绑定
        admin_status_name: faker.random.array_element(['未绑定', '已绑定']),
        online_payment: faker.random.array_element([0, 1]), //是否开通在线支付 0：未开通，1：开通
        online_payment_name: faker.random.array_element(['未开通', '已开通'])
      }
    });
  });
  app.get('/webapi/rst/rst_group_list', function (req, res) {
    res.json({
      code: 200,
      msg: '',
      data: _.values(rst_group_dict)
    });
  });
  //
  app.get('/webapi/rst/status_dict', function (req, res) {
    res.json({
      code: 200,
      msg: '',
      data: rst_status_dict
    });
  });
  app.post('/webapi/rst/status_change', function (req, res) {
    res.json({
      code: 200,
      msg: '',
      data: {}
    });
  });
};