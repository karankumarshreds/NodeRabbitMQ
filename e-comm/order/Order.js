const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  products: [
    {
      productId: String,
    },
  ],
  user: String,
  total: Number,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = { Order: mongoose.model('Order', schema) };
