const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());

mongoose.connect(
  'mongodb://localhost/product-service',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log('Product DB connected');
  }
);

app.listen(5001, () => {
  console.log('Product started at 5001');
});
