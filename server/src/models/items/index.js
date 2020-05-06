const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const ItemSchemaObj = {
  description: { maxlength: 240, trim: true, type: String },
  image: { trim: true, type: String },
  menuId: { ref: 'menu', type: Schema.Types.ObjectId },
  name: {
    maxlength: [20, 'Item title must be less than 20 characters'],
    trim: true,
    type: String,
  },
  preferences: {
    default: ['hot', 'mild', 'spicy'],
    type: [{ type: String }],
  },
  price: {
    min: [0, 'Item price cannot be less than 0'],
    required: [true, 'Item price is required'],
    type: Number,
  },
  timeToCook: { maxlength: 240, trim: true, type: String },
};
const ItemSchema = new Schema(ItemSchemaObj, {
  timestamps: true,
});

const ItemModel = Mongoose.model('item', ItemSchema);

module.exports.ItemSchemaObj = ItemSchemaObj;
module.exports = ItemModel;
