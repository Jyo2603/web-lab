const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index9b.html'));
});

MongoClient.connect('mongodb://localhost:27017').then(client => {
  const db = client.db('studentDB').collection('students');

  app.post('/student', (req, res) => {
    req.body.Semester = parseInt(req.body.Semester);
    db.insertOne(req.body).then(() => res.send('Student Added'));
  });

  app.get('/student/6sem-cse', (req, res) => {
    db.find({ Branch: 'CSE', Semester: 6 }).toArray()
      .then(data => res.json(data));
  });

  app.listen(3000, () => console.log('http://localhost:3000'));
});
