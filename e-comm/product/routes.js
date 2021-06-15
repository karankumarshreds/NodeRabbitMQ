const express = require('express');
const { Product } = require('./Product');
const authenticate = require('../common/authenticate');
const { channel } = require('./index');

const router = express();

router.post('/product', authenticate, async (req, res) => {
  const { name, description, price } = req.body;
  const product = new Product({
    name,
    description,
    price,
  });
  await product.save();
  return res.send(product);
});

router.post('/product/buy', authenticate, async (req, res) => {
  const { ids } = req.body;
  if (!ids || !ids.length) {
    return res.sendStatus(400);
  }
  const products = await Product.find({ _id: { $in: ids } });
  // calculate the sum for the total bill
  // send the amount and the array of ids to the order service
  const data = JSON.stringify({
    products,
    userEmail: req.user.email,
  });
  channel.sendToQueue('order', Buffer.from(data));
});

module.exports = ProductRoutes = router;
