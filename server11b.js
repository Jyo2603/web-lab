const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // to serve HTML

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index11b.html'));
});

MongoClient.connect('mongodb://127.0.0.1:27017').then(client => {
  const db = client.db('examDB').collection('attendance');

  // Add student with % calculation
  app.post('/student', (req, res) => {
    const data = req.body;
    data.Total_Attendance = parseInt(data.Total_Attendance);
    data.Classes_Attended = parseInt(data.Classes_Attended);
    data.Attendance_Percentage = (data.Classes_Attended / data.Total_Attendance) * 100;
    db.insertOne(data).then(() => res.send('Student Added'));
  });

  // GET students < 75% attendance
  app.get('/student/low-attendance', (req, res) => {
    db.find({ Attendance_Percentage: { $lt: 75 } }).toArray()
      .then(data => res.json(data));
  });

  app.listen(3000, () => console.log('http://localhost:3000'));
});