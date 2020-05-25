const mongoose = require('mongoose');

function isReqParamValidID(request, response, next) {
  const id = request.params.id;
  const errors = [];

  if (id && !mongoose.isValidObjectId(id)) errors.push('Invalid item id');

  if (errors.length > 0) {
    response.status(400).send(errors);
    return;
  }
  next();
}

module.exports.isReqParamValidID = isReqParamValidID;
