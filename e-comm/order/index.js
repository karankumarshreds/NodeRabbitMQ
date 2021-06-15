const express = require('express');
const app = express();

const mongoose = require('mongoose');

mongoose.connect(
  'mongodb://localhost/order-service',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log('Order DB connected');
  }
);

app.use(express.json());

app.listen(5002, () => {
  console.log('Order started at 5002');
});
