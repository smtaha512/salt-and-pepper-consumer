const { ORDER_STATUSES } = require('@src/utils/constants');

/**
 * @typedef {import('mongoose').Document} Doc
 * @param {import('../../models/index')} models
 * @returns {(
 *  orderId: string,
 *  query: {from: Date, to: Date, userId: string}
 * ) => Promise<Doc | Doc[]>}
 **/
function getOrders(models) {
  return function (orderId, query) {
    const { userId, ...dateRange } = query;
    if (orderId) return models.OrderModel.findById(orderId).exec();

    if (query.from && query.to) {
      return models.OrderModel.find({
        createdAt: {
          $gte: dateRange.from,
          $lt: dateRange.to,
        },
      }).exec();
    }

    if (query.userId) return models.OrderModel.find({ userId }).exec();

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

function updateOrderStatusByPaymentIntentId(models) {
  return function updateOrderStatusByPaymentIntentId(paymentIntentId) {
    return models.OrderModel.findOneAndUpdate({ paymentIntent: { id: paymentIntentId } }, { $set: { status: 'preparing' } });
  };
}

module.exports.createOrder = createOrder;
module.exports.getOrders = getOrders;
module.exports.updateOrder = updateOrder;
module.exports.updateOrderStatusByPaymentIntentId = updateOrderStatusByPaymentIntentId;
