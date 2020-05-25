const Mongoose = require('mongoose');

<<<<<<< HEAD
const { ItemSchemaObj } = require('../../models/items/index');
=======
const { ItemSchemaObj } = require('@src/models/items');
>>>>>>> 0e32fad9fc9305f0638c0c3cbdb43f6ace2a6fdf

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
<<<<<<< HEAD
      enum: ['preparing', 'prepared', 'picked', 'cancelled'],
=======
      enum: ['preparing', 'prepared', 'picked'],
>>>>>>> 0e32fad9fc9305f0638c0c3cbdb43f6ace2a6fdf
      trim: true,
      type: String,
    },
    total: { max: 100000, min: 100, requried: true, type: Number },
<<<<<<< HEAD
    userId: { ref: 'User', type: Schema.Types.ObjectId },
=======
    userId: { ref: 'users', type: Schema.Types.ObjectId },
>>>>>>> 0e32fad9fc9305f0638c0c3cbdb43f6ace2a6fdf
  },
  {
    timestamps: true,
  }
);

<<<<<<< HEAD
const OrderModel = Mongoose.model('Order', OrderSchema);
=======
const OrderModel = Mongoose.model('order', OrderSchema);
>>>>>>> 0e32fad9fc9305f0638c0c3cbdb43f6ace2a6fdf

module.exports = OrderModel;
