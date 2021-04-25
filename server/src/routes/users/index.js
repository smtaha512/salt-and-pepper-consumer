const router = require('express').Router();

const repositories = require('../../repositories/index');
const middlewares = require('../../middlewares/index');
const dbModels = require('../../models/index');

router.put('/users/:id/polled', middlewares.isReqParamValidID, (request, response) => {
  const { id } = request.params;
  repositories.users
    .updateLastPolledAt(dbModels)(id)
    .then(() => response.status(204));
});
