/**
 * Application Configuration
 * Centralized config loaded from environment variables with sensible defaults.
 */

const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',

  // External API base URL for fetching depot & vehicle data
  apiBaseUrl: process.env.API_BASE_URL || 'https://jsonplaceholder.typicode.com',

  // Knapsack constraint: maximum budget units available for maintenance
  maxBudget: parseInt(process.env.MAX_BUDGET, 10) || 1000,
};

module.exports = config;
