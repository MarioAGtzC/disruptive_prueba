const { Schema, model } = require('mongoose');

const ThemeSchema = Schema({
  theme: {
    type: String,
    required: [true, 'Theme is required'],
    unique: true
  },
  permissions: {
    type: Array,
    required: [true, 'Permissions is required']
  }
});

module.exports = model('theme', ThemeSchema);