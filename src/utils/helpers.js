/**
 * Shared Utility Functions
 */

/**
 * Formats a Date object into a readable ISO string.
 * @param {Date} [date] - Date to format. Defaults to now.
 * @returns {string} Formatted timestamp string.
 */
function formatTimestamp(date = new Date()) {
  return date.toISOString();
}

/**
 * Generates a unique request ID for tracing.
 * Uses crypto.randomUUID() (available in Node 19+), falls back to timestamp-based ID.
 * @returns {string} Unique request identifier.
 */
function generateRequestId() {
  try {
    return require('crypto').randomUUID();
  } catch {
    return `req_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }
}

module.exports = {
  formatTimestamp,
  generateRequestId,
};
