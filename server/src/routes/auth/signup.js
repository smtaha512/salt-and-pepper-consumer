const router = require('express').Router();

const { users: userRespository } = require('../../repositories/index');
const { validateUser } = require('../../middlewares/index');
const DBModels = require('../../models/index');
const { USER_TYPES, RES_MSGS } = require('../../utils/constants');
const { generateRandomString } = require('../../utils/index');

router.post('/signup/admin', validateUser('admin'), (request, response) => {
  const user = {
    ...request.body,
    type: USER_TYPES.admin,
    username: generateRandomString(),
  };
  userRespository
    .addUser(DBModels)(user)
    .then(() => void response.sendStatus(201))
    .catch((e) => {
      let msg = 'Unable to register user';
      if (e.message.includes('E11000')) msg = 'Email already exists';
      response.status(400).send(msg);
    });
});

router.post('/signup/user', validateUser('user'), (request, response) => {
  const user = { ...request.body, type: USER_TYPES.user };
  userRespository
    .addUser(DBModels)(user)
    .then(() => void response.sendStatus(201))
    .catch((e) => {
      let msg = 'Unable to register user';
      if (e.message.includes('E11000')) msg = 'Username or email already exists';
      response.status(400).send(msg);
    });
});

router.post('/signup', (request, response) => {
  if (!(request && request.query && request.query.t)) {
    response.status(400).send(RES_MSGS.specifyUserType);
  }

  switch (request.query.t) {
    case USER_TYPES.admin: {
      return response.redirect(307, '/auth/signup/admin');
    }

    case USER_TYPES.user:
      return response.redirect(307, '/auth/signup/user');
    default: {
      return response.send(RES_MSGS.invalidQuery);
    }
  }
});

module.exports = router;
