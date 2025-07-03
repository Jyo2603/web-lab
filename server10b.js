const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Serve HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index10b.html'));
});

// DB connect
MongoClient.connect('mongodb://localhost:27017').then(client => {
  const db = client.db('startupDB').collection('ideas');

  // Add startup idea
  app.post('/startup', (req, res) => {
    const data = req.body;
    data.Funding_Required = parseInt(data.Funding_Required);
    db.insertOne(data).then(() => res.send('Added'));
  });

  // Show EdTech startups needing > ₹5L
  app.get('/startup/edtech', (req, res) => {
    db.find({ Domain: 'EdTech', Funding_Required: { $gt: 500000 } }).toArray()
      .then(data => res.json(data));
  });

  // Start server
  app.listen(3000, () => {
    console.log('http://localhost:3000');
  });
});
