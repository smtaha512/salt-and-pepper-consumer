const Mongoose = require('mongoose');

const { ItemSchemaObj } = require('../../models/items/index');
const { ITEM_PREFERENCES, ORDER_STATUSES } = require('../../utils/constants');
const Schema = Mongoose.Schema;

const OrderSchema = new Schema(
  {
    finalisedAt: { type: Date },
    items: [
      new Schema(
        {
          ...ItemSchemaObj,
          notes: { default: '', maxlength: 240, trim: true, type: String },
          preference: {
            enum: ITEM_PREFERENCES,
            lowercase: true,
            required: false,
            type: String,
          },
          quantity: { default: 1, required: true, type: Number },
        },
        { timestamps: false }
      ),
    ],
    notes: { default: '', maxlength: 240, trim: true, type: String },
    paymentIntent: { select: false, type: Object },
    status: {
      default: 'payment pending',
      enum: ORDER_STATUSES,
      trim: true,
      type: String,
    },
    tip: { default: 0, min: 0, required: true, type: Number },
    total: { max: 100000, min: 0, required: true, type: Number },
    userId: { ref: 'User', type: Schema.Types.ObjectId },
  },
  {
    timestamps: true,
  }
);

const OrderModel = Mongoose.model('Order', OrderSchema);

module.exports = OrderModel;
