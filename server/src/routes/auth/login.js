const router = require('express').Router();

const { verify, verifyOrCreate } = require('../../repositories/users/index');
const dbModels = require('../../models/index');
const { RES_MSGS, USER_TYPES } = require('../../utils/constants');
const Utils = require('../../utils/index');
const { logger, formatLog } = require('../../utils/logger');
const { twilioVerify } = require('@src/utils/twilio-verify');

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
  verifyOrCreate(dbModels)(creds)
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

router.post('/verification-code', (request, response) => {
  logger.info(formatLog(request.method, request.originalUrl, 'request', 'body', request.body));
  const {
    body: { contact },
  } = request;
  if (!contact) {
    response.status(400).send(RES_MSGS.phoneNumberMissing);
  }
  return twilioVerify()
    .sendVerificationCode({ to: contact })
    .then(console.log)
    .then(() => response.sendStatus(204))
    .catch((error) => {
      console.log(error);
      const twilioErrorStatuses = [403, 429];
      if (twilioErrorStatuses.includes(error.status)) {
        logger.info(formatLog(request.method, request.originalUrl, 'response', 'error', RES_MSGS.tooManyRequests));
        response.sendStatus(500);
      }
    });
});

module.exports = router;
