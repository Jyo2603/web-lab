const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index4b.html'));
});

MongoClient.connect('mongodb://localhost:27017').then(client => {
  const db = client.db('interns').collection('data');

  app.post('/add', (req, res) => {
    db.insertOne(req.body)
      .then(() => res.redirect('/'));
  });

  app.put('/done/:id', (req, res) => {
    db.updateOne(
      { id: req.params.id },
      { $set: { status: 'Completed' } }
    );
    res.send('Status Updated');
  });

  app.get('/infosys', async (req, res) => {
    const list = await db.find({ company: 'Infosys' }).toArray();
    const html = list.map(i => `<p>${i.name} - ${i.status}</p>`).join('');
    res.send(html + '<a href="/">Back</a>');
  });

  app.listen(3000, () => {
    console.log('http://localhost:3000');
  });
});
