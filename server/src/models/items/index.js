const Mongoose = require('mongoose');
const { ITEM_PREFERENCES, ETAPattern } = require('../../utils/constants');
const Schema = Mongoose.Schema;

const ItemSchemaObj = {
  categoryId: { ref: 'Menu.categories', type: Schema.Types.ObjectId },
  description: { maxlength: 240, trim: true, type: String },
  eta: { default: 30, type: Number },
  image: { trim: true, type: String },
  menuId: { ref: 'Menu', type: Schema.Types.ObjectId },
  preferences: {
    default: [],
    type: [{ type: String }],
  },
  price: {
    min: [0, 'Item price cannot be less than 0'],
    required: [true, 'Item price is required'],
    type: Number,
  },
  title: {
    index: true,
    maxlength: [60, 'Item title must be less than 60 characters'],
    trim: true,
    type: String,
  },
};

const ItemSchema = new Schema(ItemSchemaObj, {
  timestamps: true,
});

const ItemModel = Mongoose.model('Item', ItemSchema);

module.exports.ItemSchemaObj = ItemSchemaObj;
module.exports.ItemModel = ItemModel;
