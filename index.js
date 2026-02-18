const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const API_KEY = "secretkey123456";

app.get('/', (req, res) => {
  console.log('[LOG] Home endpoint accessed');
  res.json({
    message: 'Hello from GitHub Actions!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/health', (req, res) => {
  console.log('[LOG] Health check endpoint.');
  res.json({ status: 'healthy' });
});

if (require.main === module) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT} and bound to 0.0.0.0`);
  });
}

module.exports = app;
