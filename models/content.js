const { Schema, model } = require('mongoose');

const ContentSchema = Schema({
  title: {
    type: String,
    required: [true, 'title is required'],
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  theme: {
    type: Schema.Types.ObjectId,
    ref: 'Theme',
    required: true
  },
  url: {
    type: String,
    required: [true, 'title is required'],
  },
  uploadBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
});

module.exports = model('content', ContentSchema);