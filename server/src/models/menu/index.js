const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const MenuSchema = new Schema(
  {
    description: { maxlength: 240, trim: true, type: String },
    image: { trim: true, type: String },
    items: [{ ref: 'items', type: Schema.Types.ObjectId }],
    title: {
      maxlength: [20, 'Menu title must be less than 20 characters'],
      trim: true,
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const MenuModel = Mongoose.model('menu', MenuSchema);

module.exports = MenuModel;
