const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const UserSchema = new Schema(
  {
    avatar: { default: '', trim: true, type: String },
    contact: { default: '', trim: true, type: String },
    email: { required: true, trim: true, type: String, unique: true },
    password: { required: true, type: String },
    type: { enum: ['root', 'admin', 'user'], lowercase: true, required: true, type: String },
    username: { required: true, trim: true, type: String, unique: true },
  },
  {
    timestamps: true,
  }
);

const UserModel = Mongoose.model('user', UserSchema);

module.exports = UserModel;
