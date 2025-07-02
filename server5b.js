const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index5b.html'));
});

MongoClient.connect('mongodb://localhost:27017').then(client => {
  const db = client.db('studentDB').collection('records');

  // POST: Add student
  app.post('/add', async (req, res) => {
    const existing = await db.findOne({ usn: req.body.usn });
    if (existing) {
      res.send('Student with that USN already exists');
    } else {
      await db.insertOne(req.body);
      res.send('Student Added');
    }
  });

  // PUT: Update grade by USN (not name)
  app.put('/update/:usn', async (req, res) => {
    const result = await db.updateOne(
      { usn: req.params.usn },
      { $set: { grade: req.body.grade } }
    );
    res.send(result.modifiedCount ? 'Grade Updated' : 'No student found with that USN');
  });

  // GET: View all students
  app.get('/view', (req, res) => {
    db.find().toArray().then(data => res.json(data));
  });

  app.listen(3000, () => console.log('http://localhost:3000'));
});
