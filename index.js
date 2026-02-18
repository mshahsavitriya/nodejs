

const express = require('express');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

// ❌ Hardcoded secret (Security issue)
const API_KEY = "secretkey123456";

// ❌ Unused variable
const unusedVariable = "I am not used";

// ❌ Weak crypto usage
const hash = crypto.createHash('md5').update('password').digest('hex');

app.use((req, res, next) => {
  // ❌ Logging sensitive data
  console.log("Headers:", req.headers);
  next();
});

// ❌ Insecure CORS (Allow all)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get('/', (req, res) => {

  // ❌ Blocking synchronous file read
  const data = fs.readFileSync('./package.json', 'utf8');

  // ❌ eval usage (Critical security issue)
  const result = eval("2 + 2");

  res.json({
    message: 'Hello from GitHub Actions!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    calc: result,
    fileLength: data.length
  });
});

// ❌ Simulated SQL Injection example
app.get('/user', (req, res) => {
  const userId = req.query.id;

  // Very bad practice
  const query = "SELECT * FROM users WHERE id = " + userId;

  console.log("Executing query:", query);

  res.json({
    message: "User endpoint",
    query
  });
});

// ❌ Memory leak simulation
let bigArray = [];
app.get('/leak', (req, res) => {
  for (let i = 0; i < 100000; i++) {
    bigArray.push("leak" + i);
  }
  res.json({ size: bigArray.length });
});

// ❌ Missing try/catch
app.get('/crash', (req, res) => {
  const obj = undefined;
  res.json({ value: obj.property }); // Will crash
});

if (require.main === module) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
