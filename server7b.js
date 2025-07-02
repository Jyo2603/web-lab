const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Serve HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index7b.html'));
});

// Connect to MongoDB
MongoClient.connect('mongodb://localhost:27017').then(client => {
  const db = client.db('courseDB').collection('enrollments');

  // Add enrollment
  app.post('/add', async (req, res) => {
    const entry = {
      Student_ID: req.body.Student_ID,
      Name: req.body.Name,
      Course_Name: req.body.Course_Name,
      Duration: req.body.Duration,
      Status: req.body.Status
    };
    await db.insertOne(entry);
    res.send('Enrollment added');
  });

  // Show only active enrollments
  app.get('/active', async (req, res) => {
    const activeList = await db.find({ Status: 'active' }).toArray();
    res.json(activeList);
  });

  // Mark status as completed (by ID or Course Name)
  app.put('/complete/:key', async (req, res) => {
    const key = req.params.key;
    const update = await db.updateOne(
      { $or: [ { Student_ID: key }, { Course_Name: key } ] },
      { $set: { Status: 'completed' } }
    );
    res.send(update.modifiedCount ? 'Marked as completed' : 'Not found');
  });

  app.listen(3000, () => console.log('http://localhost:3000'));
});
