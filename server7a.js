const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send(`
    <body style="background-color: white; color: black; font-family: sans-serif; text-align: center; padding-top: 100px;">
      <h1>Welcome to Engineering College</h1>
      <p><a href="/cse">CSE Department</a></p>
      <p><a href="/mech">MECH Department</a></p>
      <p><a href="/ece">ECE Department</a></p>
    </body>
  `);
});

app.get("/cse", (req, res) => {
  res.send(`
    <body style="background-color: lightblue; color: black; font-family: Arial; text-align: center; padding-top: 100px;">
      <h1>CSE Department</h1>
    </body>
  `);
});

app.get("/mech", (req, res) => {
  res.send(`
    <body style="background-color: lightcoral; color: white; font-family: Courier New; text-align: center; padding-top: 100px;">
      <h1>MECH Department</h1>
    </body>
  `);
});

app.get("/ece", (req, res) => {
  res.send(`
    <body style="background-color: lightgreen; color: black; font-family: Georgia; text-align: center; padding-top: 100px;">
      <h1>ECE Department</h1>
    </body>
  `);
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
