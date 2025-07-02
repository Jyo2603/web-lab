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
  const db = client.db('students').collection('records');

  // Add or Update Student
  app.post('/add', (req, res) => {
    db.updateOne(
      { usn: req.body.usn },
      { $set: req.body },
      { upsert: true }
    ).then(() => res.redirect('/'));
  });

  // Update Grade
  app.put('/update/:usn', (req, res) => {
    db.updateOne(
      { usn: req.params.usn },
      { $set: { grade: req.body.grade } }
    ).then(() => res.send('Grade updated'));
  });

  // View All Students
  app.get('/all', async (req, res) => {
    const list = await db.find().toArray();
    const html = list
      .map(s => `<p>${s.name} : ${s.usn} - ${s.grade}</p>`)
      .join('');
    res.send(html + '<a href="/">Back</a>');
  });

  app.listen(3000, () => {
    console.log('http://localhost:3000');
  });
});