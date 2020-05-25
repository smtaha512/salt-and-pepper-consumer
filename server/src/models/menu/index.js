const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

<<<<<<< HEAD
const CategorySchema = new Schema(
  {
    description: { maxlength: 240, trim: true, type: String },
    image: { trim: true, type: String },
    items: [{ ref: 'Item', type: Schema.Types.ObjectId }],
    title: {
      lowercase: true,
      maxlength: [20, 'Menu title must be less than 20 characters'],
      trim: true,
      type: String,
    },
  },
  {
    timestamps: false,
  }
);

const MenuSchema = new Schema(
  {
    categories: [CategorySchema],
    description: { maxlength: 240, trim: true, type: String },
    image: { trim: true, type: String },
    title: {
      index: true,
      lowercase: true,
      maxlength: [20, 'Menu title must be less than 20 characters'],
      required: true,
      trim: true,
      type: String,
      unique: true, // to index by field, field must be unique.
=======
const MenuSchema = new Schema(
  {
    description: { maxlength: 240, trim: true, type: String },
    image: { trim: true, type: String },
    items: [{ ref: 'items', type: Schema.Types.ObjectId }],
    title: {
      maxlength: [20, 'Menu title must be less than 20 characters'],
      trim: true,
      type: String,
>>>>>>> 0e32fad9fc9305f0638c0c3cbdb43f6ace2a6fdf
    },
  },
  {
    timestamps: true,
  }
);

<<<<<<< HEAD
const MenuModel = Mongoose.model('Menu', MenuSchema);
=======
const MenuModel = Mongoose.model('item', MenuSchema);
>>>>>>> 0e32fad9fc9305f0638c0c3cbdb43f6ace2a6fdf

module.exports = MenuModel;
