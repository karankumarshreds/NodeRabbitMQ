const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = { Product: mongoose.model('Product', schema) };
