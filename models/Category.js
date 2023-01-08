const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide Category name'],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Category', CategorySchema);
