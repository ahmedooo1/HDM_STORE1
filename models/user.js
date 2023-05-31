const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  name: {type: String, required: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String,enum: ['user', 'redacteur', 'admin'], default: 'user' },
  resetToken: { type: String, default: undefined }

});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);