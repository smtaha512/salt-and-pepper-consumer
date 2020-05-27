/**
 * @param {import('../../models/index')} models
 * @returns
 */
function getItem(models) {
  return function (itemId) {
    if (itemId) return models.ItemModel.findById(itemId).exec();
    return models.ItemModel.find({}).exec();
  };
}
/**
 * @param {import('../../models/index')} models
 * @param {{session?: import('mongoose').ClientSession}} [options]
 * @returns
 */
function deleteItem(models, options) {
  return function (itemId) {
    return models.ItemModel.findByIdAndRemove(itemId, options);
  };
}

/**
 * @param {import('../../models/index')} models
 * @returns
 */
function createItem(models) {
  return function (itemDetails) {
    const item = new models.ItemModel(itemDetails);
    return item.save();
  };
}

module.exports.createItem = createItem;
module.exports.deleteItem = deleteItem;
module.exports.getItem = getItem;
