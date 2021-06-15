const express = require('express');
const app = express();
const mongoose = require('mongoose');
const UserRoutes = require('./routes');

app.use(express.json());

app.use(UserRoutes);

mongoose.connect(
  'mongodb://localhost/auth-service',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log('Auth DB connected');
  }
);

app.listen(5000, () => {
  console.log('Auth started at 5000');
});
