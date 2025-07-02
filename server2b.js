const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Serve the frontend page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index2b.html'));
});

// Connect to MongoDB
MongoClient.connect('mongodb://localhost:27017')
  .then(client => {
    const db = client.db('studentDB').collection('students');

    // Add student
    app.post('/add', (req, res) => {
      db.insertOne(req.body)
        .then(() => res.send('Student Added'));
    });

    // Delete unpaid students (fee 0 or null)
    app.post('/delete', (req, res) => {
      db.deleteMany({
        $or: [
          { Exam_fee: null },
          { Exam_fee: "0" },
          { Exam_fee: 0 }
        ]
      }).then(() => res.send('Unpaid Students Deleted'));
    });

    // View all students
    app.get('/view', (req, res) => {
      db.find().toArray()
        .then(data => res.json(data));
    });

    // Start server
    app.listen(3000, () => {
      console.log('http://localhost:3000');
    });
  });
