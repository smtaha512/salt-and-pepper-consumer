const envConfig = require('../utils/configs/env.config');


function setEnvironment() {
  const env = process.env.ENV;
  global['app'] = {};
  global['app'].envConfig = envConfig[env];
}

module.exports = {
  setEnvironment
}
