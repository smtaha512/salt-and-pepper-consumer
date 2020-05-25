const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const ItemSchemaObj = {
<<<<<<< HEAD
  categoryId: { ref: 'Menu.categories', type: Schema.Types.ObjectId },
  description: { maxlength: 240, trim: true, type: String },
  eta: { match: /^[0-9]{1,4} [M|H]$/, required: true, type: String },
  image: { trim: true, type: String },
  menuId: { ref: 'Menu', type: Schema.Types.ObjectId },
=======
  description: { maxlength: 240, trim: true, type: String },
  image: { trim: true, type: String },
  menuId: { ref: 'menu', type: Schema.Types.ObjectId },
  name: {
    maxlength: [20, 'Item title must be less than 20 characters'],
    trim: true,
    type: String,
  },
>>>>>>> 0e32fad9fc9305f0638c0c3cbdb43f6ace2a6fdf
  preferences: {
    default: ['hot', 'mild', 'spicy'],
    type: [{ type: String }],
  },
  price: {
    min: [0, 'Item price cannot be less than 0'],
    required: [true, 'Item price is required'],
    type: Number,
  },
<<<<<<< HEAD
  title: {
    index: true,
    maxlength: [20, 'Item title must be less than 20 characters'],
    trim: true,
    type: String,
  },
};

=======
  timeToCook: { maxlength: 240, trim: true, type: String },
};
>>>>>>> 0e32fad9fc9305f0638c0c3cbdb43f6ace2a6fdf
const ItemSchema = new Schema(ItemSchemaObj, {
  timestamps: true,
});

<<<<<<< HEAD
const ItemModel = Mongoose.model('Item', ItemSchema);

module.exports.ItemSchemaObj = ItemSchemaObj;
module.exports.ItemModel = ItemModel;
=======
const ItemModel = Mongoose.model('item', ItemSchema);

module.exports.ItemSchemaObj = ItemSchemaObj;
module.exports = ItemModel;
>>>>>>> 0e32fad9fc9305f0638c0c3cbdb43f6ace2a6fdf
