module.exports = angular.module(
  'app.filters', []
).filter(
  'fromNow', require('./fromNow')
).filter(
  'gender', require('./gender')
).name;