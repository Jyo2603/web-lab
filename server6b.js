const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Serve index6b.html on root "/"
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index6b.html'));
});

// Connect to MongoDB
MongoClient.connect('mongodb://localhost:27017').then(client => {
  const db = client.db('hospitalDB').collection('hospitals');

  // Add new hospital
  app.post('/add', async (req, res) => {
    const hospital = {
      Hospital_ID: req.body.Hospital_ID,
      Name: req.body.Name,
      Location: req.body.Location,
      Total_Beds: parseInt(req.body.Total_Beds),
      Occupied_Beds: parseInt(req.body.Occupied_Beds)
    };

    const exists = await db.findOne({ Hospital_ID: hospital.Hospital_ID });
    if (exists) return res.send('Hospital ID already exists');

    await db.insertOne(hospital);
    res.send('Hospital added');
  });

  // Show hospitals with < 10 available beds
  app.get('/lowbeds', async (req, res) => {
    const result = await db.find({
      $expr: { $lt: [{ $subtract: ['$Total_Beds', '$Occupied_Beds'] }, 10] }
    }).toArray();
    res.json(result);
  });

  // Admit a patient by Hospital_ID
  app.post('/admit/:id', async (req, res) => {
    const id = req.params.id;
    const hospital = await db.findOne({ Hospital_ID: id });

    if (!hospital) return res.send('Hospital not found');
    if (hospital.Occupied_Beds >= hospital.Total_Beds) return res.send('No beds available');

    await db.updateOne({ Hospital_ID: id }, { $inc: { Occupied_Beds: 1 } });
    res.send('Patient admitted');
  });


  app.listen(3000, () => console.log('http://localhost:3000'));
});
