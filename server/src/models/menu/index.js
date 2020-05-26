const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

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
    },
  },
  {
    timestamps: true,
  }
);

const MenuModel = Mongoose.model('Menu', MenuSchema);

module.exports = MenuModel;
