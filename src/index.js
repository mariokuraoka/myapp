const express = require('express');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

// Middleware
app.use(express.json());

// Health check endpoint for Kubernetes probes
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Hello World endpoint
app.get('/hello-world', (req, res) => {
  res.json({ message: 'Hello World' });
});

// Hostname endpoint
app.get('/hostname', (req, res) => {
  res.json({ hostname: os.hostname() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});