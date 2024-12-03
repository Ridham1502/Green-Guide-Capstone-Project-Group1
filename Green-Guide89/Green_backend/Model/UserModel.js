  const mongoose = require('mongoose');

  const userSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        maxlength: 255,
        default: '',
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      password: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  );

  userSchema.methods.getAbsoluteUrl = function () {
    return `/users/detail/${this._id}`;
  };

  const User = mongoose.model('User', userSchema);

  module.exports = User;
