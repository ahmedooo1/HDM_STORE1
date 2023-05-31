// models/Category.js

const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subcategories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SubCategory',
    },
  ],
});

module.exports = mongoose.model('Category', CategorySchema);