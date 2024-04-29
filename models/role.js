const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
  role: {
    type: String,
    required: [true, 'Role is required'],
    unique: true
  }
});

module.exports = model('role', RoleSchema);