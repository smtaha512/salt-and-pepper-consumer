const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const UserSchema = new Schema(
  {
    avatar: { default: '', trim: true, type: String },
    contact: { default: '', trim: true, type: String },
    email: { required: true, trim: true, type: String, unique: true },
    password: { required: true, type: String },
    type: { enum: ['root', 'admin', 'user'], lowercase: true, required: true, type: String },
<<<<<<< HEAD
    username: { trim: true, type: String, unique: true },
=======
    username: { required: true, trim: true, type: String, unique: true },
>>>>>>> 0e32fad9fc9305f0638c0c3cbdb43f6ace2a6fdf
  },
  {
    timestamps: true,
  }
);

<<<<<<< HEAD
const UserModel = Mongoose.model('User', UserSchema);
=======
const UserModel = Mongoose.model('user', UserSchema);
>>>>>>> 0e32fad9fc9305f0638c0c3cbdb43f6ace2a6fdf

module.exports = UserModel;
