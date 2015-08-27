module.exports = angular.module(
  'app.components', []
).factory(
  'backButton', require('./backButton')
).factory(
  'camera', require('./camera')
).factory(
  'device', require('./device')
).factory(
  'fileTransfer', require('./fileTransfer')
).factory(
  'location', require('./location')
).factory(
  'logger', require('./logger')
).factory(
  'modal', require('./modal')
).factory(
  'storage', require('./storage')
).factory(
  'temp', require('./temp')
).provider(
  'toast', require('./toast')
).factory(
  'util', require('./util')
).name;
