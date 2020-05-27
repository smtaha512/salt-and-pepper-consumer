const Mongoose = require('mongoose');

const { ItemSchemaObj } = require('../../models/items/index');
const { ITEM_PREFERENCES, ORDER_STATUSES } = require('../../utils/constants');
const Schema = Mongoose.Schema;

const ItemSchema = JSON.parse(JSON.stringify(ItemSchemaObj));
delete ItemSchema.preferences;

const OrderSchema = new Schema(
  {
    eta: { match: /^[0-9]{1,4} [M]$/, required: true, type: String },
    finalisedAt: { type: Date },
    items: [
      new Schema(
        {
          ...ItemSchemaObj,
          preference: {
            enum: ITEM_PREFERENCES,
            lowercase: true,
            required: true,
            type: String,
          },
        },
        { timestamps: false }
      ),
    ],
    notes: { default: '', maxlength: 240, trim: true, type: String },
    status: {
      default: 'preparing',
      enum: ORDER_STATUSES,
      trim: true,
      type: String,
    },
    total: { max: 100000, min: 100, requried: true, type: String },
    userId: { ref: 'User', type: Schema.Types.ObjectId },
  },
  {
    timestamps: true,
  }
);

const OrderModel = Mongoose.model('Order', OrderSchema);

module.exports = OrderModel;