<<<<<<< HEAD
const { ItemModel } = require('../models/items/index');
const MenuModel = require('../models/menu/index');
const OrderModel = require('../models/order/index');
const UsersModel = require('../models/users/index');

module.exports = {
  ItemModel,
=======
const ItemsModel = require('@src/models/items');
const MenuModel = require('@src/models/menu');
const OrderModel = require('@src/models/order');
const UsersModel = require('@src/models/users');

module.exports = {
  ItemsModel,
>>>>>>> 0e32fad9fc9305f0638c0c3cbdb43f6ace2a6fdf
  MenuModel,
  OrderModel,
  UsersModel,
};
