const { RES_MSGS } = require('@utils/constants');
const Utils = require('@utils');

export function verify(creds = {}) {
  return new Promise((resolve, reject) => {
    let query;

    if (!query) {
      reject(new Error(RES_MSGS.invalidQuery));
      return;
    }
    query
      .exec()
      .then(async ({ _doc: user = undefined } = {}) => {
        if (!user) return reject(new Error(RES_MSGS.invalidCreds));
        const verified = await argon2.verify(user.password, creds.password);
        // ! Must not be sent on FE
        delete user.password;

        return verified ? resolve(user) : reject(new Error(RES_MSGS.invalidCreds));
      })
      .catch(() => void reject(new Error(RES_MSGS.notFound)));
  });
}
