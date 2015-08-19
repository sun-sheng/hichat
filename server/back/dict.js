
var _ = require('lodash');
var mock = require("mock-data");
var faker = require('faker');
faker.locale = 'zh_CN';

var bu_dict = require('../dict/bu');
var bu_type_dict = require('../dict/bu_type');
var role_dict = require('../dict/role');

module.exports = function (app) {
    app.get('/webapi/base/dict/bu_dict', function (req, res) {
        res.json({
            code: 200,
            msg: '',
            data: bu_dict
        });
    });
    app.get('/webapi/base/dict/bu_type_dict', function (req, res) {
        res.json({
            code: 200,
            msg: '',
            data: bu_type_dict
        });
    });
    app.get('/webapi/base/dict/role_dict', function (req, res) {
        res.json({
            code: 200,
            msg: '',
            data: role_dict
        });
    });
    app.get('/webapi/base/dict/role_list_for_bu_type/:id', function (req, res) {
        res.json({
            code: 200,
            msg: '',
            data: []
        });
    });
};