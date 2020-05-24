const router = require('express').Router();

const { verify } = require('../../repositories/users/index');
const dbModels = require('../../models/index');
const { RES_MSGS, USER_TYPES } = require('../../utils/constants');
const Utils = require('../../utils/index');

router.post('/login/admin', (request, response) => {
  const creds = { ...request.body, type: USER_TYPES.admin };
  verify(dbModels)(creds)
    .then((user = {}) => {
      const token = Utils.signJWT();
      response.setHeader('Authorization', token);
      response.status(200).send(user);
    })
    .catch((err) => void response.send(err.message));
});

router.post('/login/user', (request, response) => {
  const creds = { ...request.body, type: USER_TYPES.user };
  verify(dbModels)(creds)
    .then((user = {}) => {
      const token = Utils.signJWT();
      response.setHeader('Authorization', token);
      response.status(200).send(user);
    })
    .catch((err) => void response.send(err.message));
});

router.post('/login', (request, response) => {
  if (!(request && request.query && request.query.t)) {
    response.status(400).send(RES_MSGS.specifyUserType);
  }

  switch (request.query.t) {
    case USER_TYPES.admin: {
      return response.redirect(307, '/auth/login/admin');
    }

    case USER_TYPES.user:
      return response.redirect(307, '/auth/login/user');
    default: {
      return response.send(RES_MSGS.invalidQuery);
    }
  }
});

module.exports = router;
