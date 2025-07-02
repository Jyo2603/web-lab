const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Serve the form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index8b.html'));
});

MongoClient.connect('mongodb://localhost:27017').then(client => {
  const db = client.db('shopDB').collection('products');

  // Add product
  app.post('/add', async (req, res) => {
    const price = parseFloat(req.body.Price);
    const discount = parseFloat(req.body.Discount);
    const stock = parseInt(req.body.Stock);
    const final = price - (price * discount / 100);

    const product = {
      Product_ID: req.body.Product_ID,
      Name: req.body.Name,
      Price: price,
      Discount: discount,
      Stock: stock,
      Final_Price: final
    };

    await db.insertOne(product);
    res.send('Product added');
  });

  // Get products with Final_Price < 1000
  app.get('/cheap', async (req, res) => {
    const result = await db.find({ Final_Price: { $lt: 1000 } }).toArray();
    res.json(result);
  });

  app.listen(3000, () => console.log('http://localhost:3000'));
});
