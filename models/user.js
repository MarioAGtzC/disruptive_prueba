const { Schema, model } = require('mongoose');

const UserSchema = Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  role: {
    type: String,
    required: true,
    enum: ['ADMIN_ROLE', 'CREATOR_ROLE', 'USER_ROLE']
  }
});

module.exports = model('user', UserSchema);