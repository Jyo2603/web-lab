const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('<body style="font-family:sans-serif;text-align:center;background:#f0f0f0;"><h2>Welcome</h2><a href="/cse">CSE</a> | <a href="/ece">ECE</a> | <a href="/mech">MECH</a></body>');
});

app.get('/cse', (req, res) => {
  res.send('<body style="background:lightblue;font-family:Arial;text-align:center;"><h2>CSE Dept</h2></body>');
});

app.get('/ece', (req, res) => {
  res.send('<body style="background:lightgreen;font-family:Georgia;text-align:center;"><h2>ECE Dept</h2></body>');
});

app.get('/mech', (req, res) => {
  res.send('<body style="background:lightcoral;font-family:Courier;text-align:center;"><h2>MECH Dept</h2></body>');
});

app.listen(3000, () => console.log('http://localhost:3000'));
