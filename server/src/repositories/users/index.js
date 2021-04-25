const bcrypt = require('bcryptjs');

const utils = require('../../utils/index');
const { lodash: _ } = require('../../utils/libs/index');
const { twilioVerify } = require('../../utils/twilio-verify');
const { RES_MSGS } = require('../../utils/constants');
/**
 * @param {import('../../models/index')} models
 * @returns
 */
function addUser(models) {
  return function (userDetails) {
    const hash = utils.generateHash(userDetails.password);
    if (hash instanceof Error && hash.message === 'Missing Salt') {
      return Promise.reject(hash);
    }
    const user = new models.UsersModel({ ...userDetails, password: hash });
    return user.save();
  };
}
/**
 * @param {import('../../models/index')} models
 * @returns
 */
function verify(models) {
  return function (creds = {}) {
    return new Promise((resolve, reject) => {
      const query = {
        type: creds.type,
        ...(creds.username && { username: creds.username }),
        ...(creds.email && { email: creds.email }),
      };
      if (!query.email && !query.username) {
        reject(new Error(RES_MSGS.invalidCreds));
        return;
      }
      models.UsersModel.findOne(query)
        .exec()
        .then(async (user) => {
          if (!user) return reject(new Error(RES_MSGS.invalidCreds));
          user = user.toObject();
          const verified = bcrypt.compareSync(creds.password, user.password);
          delete user.password;

          return verified ? resolve(user) : reject(new Error(RES_MSGS.invalidCreds));
        })
        .catch(() => void reject(new Error(RES_MSGS.noUserFound)));
    });
  };
}

function verifyOrCreate(models) {
  return function (creds = {}) {
    return new Promise((resolve, reject) =>
      twilioVerify()
        .verifyCode({ code: creds.code, to: creds.contact.toString() })
        .then((verificationCheckInstance) => verificationCheckInstance.status !== 'approved' && reject(RES_MSGS.invalidVerificationCode))
        .then(() => {
          const query = {
            type: creds.type,
            ...(creds.username && { username: creds.username }),
            ...(creds.email && { email: creds.email }),
          };
          if (!query.email) {
            return reject(new Error(RES_MSGS.invalidCreds));
          }
          return models.UsersModel.findOne(query)
            .exec()
            .then(async (user) => {
              if (_.isEmpty(user)) {
                const userToSave = new models.UsersModel({ ...creds });
                const savedUser = await userToSave.save();
                return resolve(savedUser.toObject());
              }
              return resolve(user.toObject());
            })
            .catch((e) => console.log(e));
        })
        .catch(() => reject(new Error(RES_MSGS.invalidCreds)))
    );
  };
}

function getUserById(models) {
  return function getUserById(id = '') {
    return models.UsersModel.findById(id);
  };
}

module.exports.addUser = addUser;
module.exports.verify = verify;
module.exports.verifyOrCreate = verifyOrCreate;
module.exports.getUserById = getUserById;
