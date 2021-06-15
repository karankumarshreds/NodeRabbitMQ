const express = require('express');
const app = express();
const mongoose = require('mongoose');
const amqp = require('amqplib');
const ProductRoutes = require('./routes');

app.use(express.json());
app.use(ProductRoutes);
let connection, channel;

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

const connect = async () => {
  try {
    const amqpServer = 'amqp://localhost:5672';
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue('product');
    console.log('Product service connected to RABBITMQ');
  } catch (error) {
    console.log(error);
  }
};
connect();

module.exports = { connection: connection };
module.exports = { channel: channel };

app.listen(5001, () => {
  console.log('Product started at 5001');
});
