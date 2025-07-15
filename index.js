const mongoose = require('mongoose');
const express = require('express');
const redis = require("redis");
const { url } = require('inspector');
const app = express();


//connect redis

const redisClient = redis.createClient({
    url: 'redis://redis:6379',
});
redisClient.connect();

mongoose.connect('mongodb://root:example@mongo:27017/?authSource=admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

app.get('/', (req, res) => {
  redisClient.set('products', JSON.stringify({ name: 'Product 1', price: 100 }));
    
  
  res.send('Hello from Node + MongoDB!');
});

app.get('/data1', async(req, res) => {
    const products = await redisClient.get('products');
  res.send(`Hello from Node + MongoDB!` + `\nProducts: ${products}`);
});

app.listen(3000, () => {
  console.log('🚀 Server running on http://localhost:3000');
});