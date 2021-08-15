/**
 * @typedef {import('mongoose').Document} Doc
 * @param {import('../../models/index')} models
 * @returns {(
 *  orderId: string,
 *  query: {from: Date, to: Date, userId: string, populateUser: boolean}
 * ) => Promise<Doc | Doc[]>}
 **/
function getOrders(models) {
  return function (orderId, query) {
    const { populateUser, userId, ...dateRange } = query;
    if (orderId) {
      return models.OrderModel.findById(orderId).populate('userId').exec();
    }

    if (query.from || query.to) {
      const baseQuery = models.OrderModel.find({
        createdAt: {
          ...(dateRange.from && { $gte: new Date(dateRange.from) }),
          ...(dateRange.to && { $lt: new Date(dateRange.to) }),
        },
        ...(userId && { userId }),
        status: { $ne: 'payment pending' },
      });
      if (populateUser) {
        baseQuery.populate('userId').exec();
        return baseQuery.populate('userId').exec();
      }
      return baseQuery.exec();
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

/**
 * @param {import('../../models/index')} models
 */
function updateOrderStatusByPaymentIntentId(models) {
  /**
   * @typedef {import('bson').ObjectID} ObjectID
   * @param orderId {ObjectID}
   */
  return function updateOrderStatusByOrderId(orderId) {
    return models.OrderModel.findOneAndUpdate({ _id: orderId }, { $set: { status: 'preparing' } }, { new: true }).exec();
  };
}

/**
 * @param {import('../../models/index')} models
 */
function bulkUpdateOrders(models) {
  /**
   * @typedef {import('../../models/order')} order
   * @param orderIds {Array<string>}
   * @param update {order}
   */
  return function bulkUpdateOrdersByIds(orderIds, update) {
    return models.OrderModel.updateMany({ _id: { $in: orderIds } }, { $set: update }, { new: true }).exec();
  };
}

module.exports.bulkUpdateOrders = bulkUpdateOrders;
module.exports.createOrder = createOrder;
module.exports.getOrders = getOrders;
module.exports.updateOrder = updateOrder;
module.exports.updateOrderStatusByOrderId = updateOrderStatusByPaymentIntentId;
