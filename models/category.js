const { Schema, model } = require('mongoose');

const CategorySchema = Schema({
  category: {
    type: String,
    required: [true, 'Category is required'],
    unique: true
  }
});

module.exports = model('category', CategorySchema);