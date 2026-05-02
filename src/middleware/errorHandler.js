const { formatTimestamp } = require('../utils/helpers');
const config = require('../config');

/**
 * Global Error Handling Middleware
 * Catches all unhandled errors passed to next(), logs them, 
 * and formats a consistent JSON response for the client.
 */
function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  // Log the error details internally
  console.error(`[${formatTimestamp()}] ERROR [${req.id || 'NO-ID'}] ${status} - ${message}`);
  
  // Log stack trace for 500 errors
  if (status === 500) {
    console.error(err.stack);
  }

  // Send a sanitized response to the client
  res.status(status).json({
    error: {
      status,
      // Hide internal details in production for 500 errors
      message: (status === 500 && config.nodeEnv === 'production') 
        ? 'An unexpected error occurred.' 
        : message,
      // Only show stack trace in development
      ...(config.nodeEnv === 'development' && { stack: err.stack }),
      requestId: req.id,
      timestamp: formatTimestamp(),
    }
  });
}

module.exports = errorHandler;
