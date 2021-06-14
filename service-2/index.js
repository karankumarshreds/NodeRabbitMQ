const express = require('express');
const amqp = require('amqplib');

const app = express();

let channel;
const CHANNEL_NAME = 'rabbit';

// connection with rabbitmq
const connect = async () => {
  try {
    connection = await amqp.connect('amqp://localhost:5672');
    // create a channel
    const channel = await connection.createChannel();
    await channel.assertQueue(CHANNEL_NAME);
    console.log('Connected to rabbitmq');
    channel.consume(CHANNEL_NAME, (data) => {
      console.log(`🎉 Data Received, `, JSON.parse(Buffer.from(data.content)));
      channel.ack(data);
    });
  } catch (error) {
    console.log('❌ Unable to connect to rabbitmq', error);
  }
};

connect();

app.get('/send', (req, res) => {});

app.listen(5001, () => {
  console.log('Listening on port 5001');
});
