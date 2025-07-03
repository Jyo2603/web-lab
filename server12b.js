const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Serve HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index12b.html'));
});

// Connect to MongoDB
MongoClient.connect('mongodb://localhost:27017').then(client => {
  const db = client.db('examDB').collection('students');

  // Add student with eligibility status
  app.post('/student', (req, res) => {
    const data = req.body;
    data.Marks = parseInt(data.Marks);
    data.Eligibility_Status = data.Marks < 20 ? 'Not Eligible' : 'Eligible';
    db.insertOne(data).then(() => res.send('Student Added'));
  });

  // Get not eligible students
  app.get('/student/not-eligible', (req, res) => {
    db.find({ Eligibility_Status: 'Not Eligible' }).toArray()
      .then(data => res.json(data));
  });

  // Start server
  app.listen(3000, () => {
    console.log('http://localhost:3000');
  });
});
