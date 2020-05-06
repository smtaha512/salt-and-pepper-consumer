const router = require('express').Router();

const { verify } = require('@src/repositories/users');
const { RES_MSGS, USER_TYPES } = require('@src/utils/constants');
const Utils = require('@src/utils');

router.post('/login/admin', (request, response) => {
  response.status(200).send(request.body);
});

router.post('/login/user', (request, response) => {
  verify(request.body)
    .then((foodie = {}) => {
      const token = Utils.signJWT();
      response.setHeader('Authorization', token);
      response.status(200).send(foodie);
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
