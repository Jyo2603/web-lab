const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index3b.html'));
});

MongoClient.connect('mongodb://localhost:27017').then(client => {
  const db = client.db('HR').collection('employees');

  app.post('/addEmployee', (req, res) => {
  req.body.salary = +req.body.salary; // Convert to number
  db.insertOne(req.body)
    .then(() => res.send('Employee added'));
});

  app.get('/highSalary', (req, res) => 
    db.find({ salary: { $gt: 50000 } }).toArray()
      .then(data => res.json(data))
  );

  app.listen(3000, () => 
    console.log('http://localhost:3000')
  );
});