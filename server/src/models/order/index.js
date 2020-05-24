const Mongoose = require('mongoose');

const { ItemSchemaObj } = require('../../models/items/index');

const Schema = Mongoose.Schema;

const OrderSchema = new Schema(
  {
    eta: { required: true, type: Date },
    finalisedAt: { type: Date },
    items: [
      {
        ...ItemSchemaObj,
        pereference: {
          enum: ['hot', 'mild', 'spicy'],
          lowercase: true,
          required: true,
          type: String,
        },
      },
    ],
    notes: { maxlength: 240, trim: true, type: String },
    status: {
      enum: ['preparing', 'prepared', 'picked', 'cancelled'],
      trim: true,
      type: String,
    },
    total: { max: 100000, min: 100, requried: true, type: Number },
    userId: { ref: 'users', type: Schema.Types.ObjectId },
  },
  {
    timestamps: true,
  }
);

const OrderModel = Mongoose.model('order', OrderSchema);

module.exports = OrderModel;
