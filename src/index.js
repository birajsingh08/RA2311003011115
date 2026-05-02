/**
 * Vehicle Maintenance Scheduler — Entry Point
 *
 * Bootstraps the Express application, registers middleware,
 * mounts routes, and starts listening on the configured port.
 */

const app = require('./app');
const config = require('./config');

const server = app.listen(config.port, () => {
  console.log(`
  ┌─────────────────────────────────────────────────┐
  │  Vehicle Maintenance Scheduler                  │
  │  Environment : ${config.nodeEnv.padEnd(32)}│
  │  Port        : ${String(config.port).padEnd(32)}│
  │  Status      : ${'Running ✓'.padEnd(32)}│
  └─────────────────────────────────────────────────┘
  `);
});

/**
 * Graceful shutdown handler.
 * Closes the server on SIGTERM/SIGINT so in-flight requests can complete.
 */
function gracefulShutdown(signal) {
  console.log(`\n[${signal}] Shutting down gracefully...`);
  server.close(() => {
    console.log('Server closed. Bye! 👋');
    process.exit(0);
  });

  // Force exit after 10 seconds if server hasn't closed
  setTimeout(() => {
    console.error('Forced shutdown — timeout exceeded.');
    process.exit(1);
  }, 10_000);
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
