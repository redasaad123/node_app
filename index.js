const mongoose = require('mongoose');
const express = require('express');
const redis = require("redis");
const os = require('os');
const app = express();


// connect to Redis
const redisClient = redis.createClient({
    url: 'redis://redis:6379',
});
redisClient.connect().catch(console.error); // تجنب unhandled promise

// connect to MongoDB
mongoose.connect('mongodb://root:example@mongo:27017/?authSource=admin')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// routes
app.get('/', async (req, res) => {
  await redisClient.set('products', JSON.stringify({ name: 'Product 1', price: 100 }));
  console.log("Hostname: " + os.hostname());
  res.send('Hello from Node thanks ya bao ryad');
});

app.get('/data1', async (req, res) => {
  const products = await redisClient.get('products');
  res.send(`Hello from Node + MongoDB!\nProducts: ${products}`);
});

// start server
app.listen(3000 ,"0.0.0.0",() => {
  console.log("Server running on 0.0.0.0:3000");
});
