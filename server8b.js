const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // to serve HTML

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index8b.html'));
});

MongoClient.connect('mongodb://127.0.0.1:27017')
  .then(client => {
    const db = client.db('examDB').collection('products');

    // Add product with Final Price calculation
    app.post('/product', (req, res) => {
      const data = req.body;
      data.Price = parseFloat(data.Price);
      data.Discount = parseFloat(data.Discount);
      data.Final_Price = data.Price - (data.Price * data.Discount / 100);
      db.insertOne(data).then(() => res.send('Product Added'));
    });

    // GET products with Final_Price < 1000
    app.get('/product/cheap', (req, res) => {
      db.find({ Final_Price: { $lt: 1000 } }).toArray()
        .then(data => res.json(data));
    });

    app.listen(3000, () => console.log('http://localhost:3000'));
  });