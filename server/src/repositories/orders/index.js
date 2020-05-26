/**
 * @param {import('../../models/index')} models
 * @returns
 */
function getOrders(models) {
  return function (orderId) {
    if (orderId) {
      return models.OrderModel.findById(orderId).exec();
    }
    return models.OrderModel.find({}).exec();
  };
}

/**
 * @param {import('../../models/index')} models
 * @returns
 */
function createOrder(models) {
  return function (orderDetails) {
    const order = new models.OrderModel(orderDetails);
    return order.save();
  };
}

/**
 * @param {import('../../models/index')} models
 * @param {{
 *  new?: boolean,
 *  session?: import('mongoose').ClientSession,
 * }} [options]
 * @returns
 */
function updateOrder(models, options) {
  return function (orderId, orderDetails) {
    return models.OrderModel.findByIdAndUpdate(orderId, { $set: orderDetails }, options);
  };
}

module.exports.createOrder = createOrder;
module.exports.getOrders = getOrders;
module.exports.updateOrder = updateOrder;
