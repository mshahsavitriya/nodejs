const request = require('supertest');
const app = require('./index.js');

describe('Express App', () => {
  describe('GET /', () => {
    it('should return home page with message', async () => {
      console.log('[TEST LOG] Testing home endpoint');
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('Hello from GitHub Actions!');
      console.log('[TEST LOG] Home endpoint test passed');
    });

    it('should include timestamp', async () => {
      console.log('[TEST LOG] Testing timestamp property');
      const response = await request(app).get('/');
      expect(response.body).toHaveProperty('timestamp');
      expect(typeof response.body.timestamp).toBe('string');
      console.log('[TEST LOG] Timestamp test passed');
    });

    it('should include environment', async () => {
      console.log('[TEST LOG] Testing environment property');
      const response = await request(app).get('/');
      expect(response.body).toHaveProperty('environment');
      console.log('[TEST LOG] Environment test passed');
    });
  });

  describe('GET /health', () => {
    it('should return healthy status', async () => {
      console.log('[TEST LOG] Testing health endpoint');
      const response = await request(app).get('/health');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status');
      expect(response.body.status).toBe('healthy');
      console.log('[TEST LOG] Health endpoint test passed');
    });

    it('should return JSON content type', async () => {
      console.log('[TEST LOG] Testing content type');
      const response = await request(app).get('/health');
      expect(response.type).toBe('application/json');
      console.log('[TEST LOG] Content type test passed');
    });
  });
});
