const express = require('express');
const app = express();

let count = 0;

// Middleware: Log and count visits
app.use((req, res, next) => {
  count++;
  console.log("Visited", req.url, "| Total:", count);
  next();
});

app.get('/', (req, res) => {
  res.send('Welcome! Visit Count: ' + count);
});

app.listen(3000, () => {
  console.log('http://localhost:3000');
});