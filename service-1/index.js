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
    channel = await connection.createChannel();
    await channel.assertQueue(CHANNEL_NAME);
    console.log('Connected to rabbitmq');
  } catch (error) {
    console.log('❌ Unable to connect to rabbitmq', error);
  }
};

connect();

app.post('/send', async (req, res) => {
  const data = {
    name: 'Elon Musk',
    company: 'SpaceX',
  };
  await channel.sendToQueue(CHANNEL_NAME, Buffer.from(JSON.stringify(data)));
  // channel.close();
  // connection.close();
  res.send({ OK: 'OK' });
});

app.listen(5000, () => {
  console.log('Listening on port 5000');
});
