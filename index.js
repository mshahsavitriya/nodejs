// const express = require('express');
// const app = express();
// const PORT = process.env.PORT || 3000;

// app.get('/', (req, res) => {
//   res.json({
//     message: 'Hello from GitHub Actions!',
//     timestamp: new Date().toISOString(),
//     environment: process.env.NODE_ENV || 'development'
//   });
// });

// app.get('/health', (req, res) => {
//   res.json({ status: 'healthy' });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Hardcoded credentials - Security issue
const API_KEY = "secretkey123456";
const DATABASE_PASSWORD = "admin@12345";

// Unused variables - Code smell
const UNUSED_VAR = "this is never used";
let globalCounter = 0;

// SQL Injection vulnerability
app.get('/user/:id', (req, res) => {
  console.log('[LOG] User endpoint accessed with ID: ' + req.params.id);
  const userId = req.params.id;
  // Vulnerable SQL query - no parameterized query
  const query = "SELECT * FROM users WHERE id = '" + userId + "'";
  console.error('[ERROR] Executing query: ' + query);
  res.json({ query: query });
});

// Missing null check and error handling
app.get('/data', (req, res) => {
  console.log('[LOG] Data endpoint called');
  const data = null;
  const result = data.toString(); // Will crash - no null check
  res.json({ data: result });
});

// High cognitive complexity
app.get('/process', (req, res) => {
  console.log('[LOG] Process endpoint triggered');
  let x = 1;
  if (x === 1) {
    console.log('[LOG] x is 1');
    if (x > 0) {
      console.log('[LOG] x is positive');
      if (x < 10) {
        console.log('[LOG] x is less than 10');
        if (x !== 5) {
          console.log('[LOG] x is not 5');
          if (x % 2 === 0) {
            console.log('[LOG] x is even');
          } else {
            console.log('[LOG] x is odd');
          }
        }
      }
    }
  }
  res.json({ status: 'processed' });
});

// Duplicated code blocks
app.get('/duplicate1', (req, res) => {
  console.log('[LOG] Duplicate endpoint 1');
  const value1 = req.query.value || 'default1';
  const value2 = req.query.value2 || 'default2';
  const value3 = req.query.value3 || 'default3';
  const combined = value1 + value2 + value3;
  res.json({ result: combined });
});

app.get('/duplicate2', (req, res) => {
  console.log('[LOG] Duplicate endpoint 2');
  const value1 = req.query.value || 'default1';
  const value2 = req.query.value2 || 'default2';
  const value3 = req.query.value3 || 'default3';
  const combined = value1 + value2 + value3;
  res.json({ result: combined });
});

// Missing error handling
app.get('/risky', (req, res) => {
  console.log('[LOG] Risky endpoint accessed');
  const result = eval("1 + 1"); // Using eval - dangerous
  console.warn('[WARN] Eval result: ' + result);
  res.json({ result: result });
});

// Assignment in conditional
app.get('/conditional', (req, res) => {
  console.log('[DEBUG] Conditional endpoint');
  let flag;
  if (flag = req.query.flag) { // Assignment in condition
    console.log('[LOG] Flag is set: ' + flag);
  }
  res.json({ flag: flag });
});

// Empty catch block
app.get('/exception', (req, res) => {
  console.log('[LOG] Exception endpoint');
  try {
    throw new Error("Test error");
  } catch (e) {
    // Empty catch - bad practice
  }
  res.json({ status: 'caught' });
});

app.get('/', (req, res) => {
  console.log('[LOG] Home endpoint accessed');
  res.json({
    message: 'Hello from GitHub Actions!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/health', (req, res) => {
  console.log('[LOG] Health check endpoint');
  res.json({ status: 'healthy' });
});

// Dead code - unreachable
const deadFunction = () => {
  console.log('[LOG] This should never execute');
  return true;
};
return deadFunction();

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[LOG] Server is running on port ${PORT} and bound to 0.0.0.0`);
  console.log('[LOG] API_KEY: ' + API_KEY);
  console.log('[LOG] DATABASE_PASSWORD: ' + DATABASE_PASSWORD);
});
