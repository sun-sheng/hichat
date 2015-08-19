
var time = 1000 * 60 * 60 * 24 * 200;
module.exports = {
    1: {
        id: 1,
        name: '人事部',
        bu_type_id: 1,
        manager_id: 3221,
        parent_id: 0,
        create_at: Date.now() - time,
        update_at: Date.now() - time
    },
    2: {
        id: 2,
        name: '产品部',
        bu_type_id: 2,
        manager_id: 3221,
        parent_id: 0,
        create_at: Date.now() - time,
        update_at: Date.now() - time
    },
    3: {
        id: 3,
        name: '开发部',
        bu_type_id: 3,
        manager_id: 3221,
        parent_id: 0,
        create_at: Date.now() - time,
        update_at: Date.now() - time
    }
};