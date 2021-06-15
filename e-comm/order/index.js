const express = require('express');
const app = express();
const mongoose = require('mongoose');
const amqp = require('amqplib');
// const ProductRoutes = require('./routes');

app.use(express.json());
// app.use(ProductRoutes);
let connection, channel;

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

const connect = async () => {
  try {
    const amqpServer = 'amqp://localhost:5672';
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue('order');
    console.log('Order service connected to RABBITMQ');
  } catch (error) {
    console.log(error);
  }
};
connect().then(() => {
  channel.consume('order', (data) => {
    const { products, userEmail } = JSON.parse(data.content);
    console.log('Data recieved from order queue', products, userEmail);
  });
});

app.listen(5002, () => {
  console.log('Product started at 5002');
});

module.exports = connection;
module.exports = channel;
