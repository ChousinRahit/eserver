const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please provide your first name'],
  },
  role: {
    type: String,
    enum: ['admin', 'customer'],
    default: 'customer',
  },
  lastName: {
    type: String,
    required: [true, 'Please provide your last name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  phone: {
    type: Number,
    required: [true, 'Please provide your Phone number'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//#region ~ Encrypt Password Before Saveing  :-}
// Using function key-word insted of arrow function to use "this" to get Users properties
UserSchema.pre('save', async function (next) {
  // The below step usefull in update if password has modified then bcrypt it or
  // leave it if password has not changed
  if (!this.isModified('password')) next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
//#endregion

//#region ~ Sign JWT and return :-}
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, '35wcu4@$WYUJ5y6rg', {
    expiresIn: '3600000',
  });
};

//#endregion

//#region ~ Match Password :-}
UserSchema.methods.matchPassword = async function (enterdPassword) {
  return await bcrypt.compare(enterdPassword, this.password);
};
//#endregion

//#region ~ Generate and hash password token
UserSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};
//#endregion

module.exports = mongoose.model('User', UserSchema);
