module.exports = angular.module(
  'app.filters', []
).filter(
  'fromNow', require('./fromNow')
).name;