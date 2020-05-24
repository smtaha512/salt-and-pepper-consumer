const { USER_TYPES } = require('../utils/constants');
const { validator } = require('../utils/libs/index');

/**
 * @param {'user'|'admin'} usertype
 * @returns middleware function
 */
function validateUser(usertype) {
  return function (request, response, next) {
    const errors = [];
    const user = request.body;

    if (!validator.isEmail(user.email)) errors.push('Invalid Email');
    if (!user.password) errors.push('Password Required');
    if (usertype === USER_TYPES.user && !/[0-9a-zA-Z]{4,16}/.test(user.username)) {
      errors.push('Invalid Username');
    }

    if (errors.length > 0) {
      response.status(400).send(errors);
      return;
    }
    next();
  };
}

module.exports.validateUser = validateUser;
