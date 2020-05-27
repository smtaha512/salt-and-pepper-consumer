const router = require('express').Router();

const { verify } = require('../../repositories/users/index');
const dbModels = require('../../models/index');
const { RES_MSGS, USER_TYPES } = require('../../utils/constants');
const Utils = require('../../utils/index');
const { logger, formatLog } = require('../../utils/logger');

router.post('/login/admin', (request, response) => {
  logger.info(formatLog(request.method, request.originalUrl, 'request', 'body', request.body));
  logger.info(formatLog(request.method, request.originalUrl, 'request', 'headers', request.headers));
  const creds = { ...request.body, type: USER_TYPES.admin };
  verify(dbModels)(creds)
    .then((user = {}) => {
      const token = Utils.signJWT();
      response.setHeader('Authorization', token);
      logger.info(formatLog(request.method, request.originalUrl, 'response', 'headers', { Authorization: token }));
      response.status(200).send(user);
    })
    .catch((e) => {
      logger.error(formatLog(request.method, request.originalUrl, 'response', 'error', e.message));
      response.status(400).send('Invalid credentials');
    });
});

router.post('/login/user', (request, response) => {
  const creds = { ...request.body, type: USER_TYPES.user };
  verify(dbModels)(creds)
    .then((user = {}) => {
      const token = Utils.signJWT();
      response.setHeader('Authorization', token);
      logger.info(formatLog(request.method, request.originalUrl, 'response', 'headers', { Authorization: token }));
      response.status(200).send(user);
    })
    .catch((e) => {
      logger.error(formatLog(request.method, request.originalUrl, 'response', 'error', e.message));
      response.status(400).send('Invalid credentials');
    });
});

router.post('/login', (request, response) => {
  logger.info(formatLog(request.method, request.originalUrl, 'request', 'query-string', request.query));
  if (!request.query.t) {
    response.status(400).send(RES_MSGS.specifyUserType);
  }

  switch (request.query.t) {
    case USER_TYPES.admin: {
      return response.redirect(307, '/auth/login/admin');
    }

    case USER_TYPES.user:
      return response.redirect(307, '/auth/login/user');
    default: {
      logger.info(formatLog(request.method, request.originalUrl, 'response', 'error', RES_MSGS.invalidQuery));
      return response.send(RES_MSGS.invalidQuery);
    }
  }
});

module.exports = router;
