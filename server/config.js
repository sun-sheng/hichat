
var config = {
  db: 'mongodb://127.0.0.1/hichat_dev',
  error: {
    unknown: {
      code: 440,
      message: '未知异常'
    },
    mongoose: {
      code: 450,
      message: '数据库异常'
    },
    service: {
      code: 460,
      message: '系统服务异常'
    }
  }
};

if (process.env.NODE_ENV === 'test') {
  config.db = 'mongodb://127.0.0.1/hichat_test';
}

module.exports = config;