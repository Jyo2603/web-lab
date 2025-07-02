const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Serve HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index1b.html'));
});

// Connect to MongoDB
MongoClient.connect('mongodb://localhost:27017').then(client => {
  const db = client.db('complaintsDB').collection('c');

  // Add complaint
  app.post('/c', (req, res) => {
    db.insertOne({ ...req.body, status: 'Pending' }).then(() => res.send('Added'));
  });

  // Update complaint status
  app.post('/c/update', (req, res) => {
    db.updateOne(
      { id: req.body.id },
      { $set: { status: req.body.status } }
    ).then(() => res.send('Updated'));
  });

  // View pending complaints
  app.get('/c', (req, res) => {
    db.find({ status: /pending/i }).toArray()
      .then(data => res.json(data));
  });

  // Start server
  app.listen(3000, () => {
    console.log('http://localhost:3000');
  });
});
