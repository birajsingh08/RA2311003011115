/**
 * Express Application Setup
 *
 * Configures Express with built-in middleware, health endpoints,
 * and a catch-all 404 handler. Route mounting and custom middleware
 * will be added in later phases.
 */

const express = require('express');
const requestLogger = require('./middleware/logger');

const app = express();

// ─── Custom Middleware ────────────────────────────────────────────
app.use(requestLogger);

// ─── Built-in Middleware ──────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Health Check ─────────────────────────────────────────────────
/**
 * GET /health
 * Lightweight liveness probe — returns server status & uptime.
 */
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    uptime: `${Math.floor(process.uptime())}s`,
    timestamp: new Date().toISOString(),
  });
});

/**
 * GET /
 * Root welcome endpoint with API information.
 */
app.get('/', (req, res) => {
  res.status(200).json({
    service: 'Vehicle Maintenance Scheduler',
    version: '1.0.0',
    endpoints: {
      health: 'GET /health',
      schedule: 'GET /schedule (coming soon)',
    },
  });
});

// ─── 404 Catch-All ────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.originalUrl} does not exist`,
    timestamp: new Date().toISOString(),
  });
});

module.exports = app;
