/**
 * Express Application Setup
 *
 * Configures Express with built-in middleware, health endpoints,
 * and a catch-all 404 handler. Route mounting and custom middleware
 * will be added in later phases.
 */

const express = require('express');
const requestLogger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const scheduleRoutes = require('./routes/scheduleRoutes');

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

// ─── API Routes ───────────────────────────────────────────────────
app.use('/schedule', scheduleRoutes);

// ─── 404 Catch-All ────────────────────────────────────────────────
app.use((req, res, next) => {
  const error = new Error(`Route ${req.method} ${req.originalUrl} does not exist`);
  error.status = 404;
  next(error); // Pass to the global error handler
});

// ─── Global Error Handler ─────────────────────────────────────────
app.use(errorHandler);

module.exports = app;
