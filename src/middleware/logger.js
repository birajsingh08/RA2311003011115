const { formatTimestamp, generateRequestId } = require('../utils/helpers');

/**
 * Request/Response Logging Middleware
 * Intercepts incoming requests, assigns a unique ID, and logs timing/status.
 */
function requestLogger(req, res, next) {
  const requestId = generateRequestId();
  const startTime = process.hrtime();

  // Attach request ID so it can be used in controllers/services
  req.id = requestId;

  // Log the incoming request
  console.log(`[${formatTimestamp()}] INFO  [${requestId}] -> ${req.method} ${req.originalUrl}`);

  // Hook into response finish to log the outcome
  res.on('finish', () => {
    const diff = process.hrtime(startTime);
    const durationInMs = (diff[0] * 1e3 + diff[1] * 1e-6).toFixed(2);
    
    const status = res.statusCode;
    const logLevel = status >= 400 ? 'ERROR' : 'INFO ';
    
    console.log(`[${formatTimestamp()}] ${logLevel} [${requestId}] <- ${req.method} ${req.originalUrl} [${status}] ${durationInMs}ms`);
  });

  next();
}

module.exports = requestLogger;
