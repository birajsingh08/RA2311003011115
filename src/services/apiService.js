const config = require('../config');

/**
 * API Service Layer
 * Fetches external data for the scheduling algorithm.
 * We fetch from the configured external API and map the responses 
 * to our domain models (Vehicles and Depots).
 */
class ApiService {
  /**
   * Fetches depots from external API.
   * @returns {Promise<Array>} List of depots.
   */
  static async fetchDepots() {
    try {
      // Using /users as a stand-in for a depots endpoint
      const response = await fetch(`${config.apiBaseUrl}/users`);
      if (!response.ok) {
        throw new Error(`External API error: ${response.statusText}`);
      }
      const data = await response.json();
      
      // Map external data to our Depot domain model
      return data.map(user => ({
        id: user.id,
        name: `${user.company.name} Depot`,
        location: user.address.city
      }));
    } catch (error) {
      console.error('[ApiService] Error fetching depots:', error.message);
      throw error;
    }
  }

  /**
   * Fetches vehicles from external API.
   * Generates knapsack metrics (cost & priority) from external data.
   * @returns {Promise<Array>} List of vehicles needing maintenance.
   */
  static async fetchVehicles() {
    try {
      // Limiting to 20 items to keep the knapsack algorithm performant
      // Using /posts as a stand-in for a vehicles endpoint
      const response = await fetch(`${config.apiBaseUrl}/posts?_limit=20`);
      if (!response.ok) {
        throw new Error(`External API error: ${response.statusText}`);
      }
      const data = await response.json();
      
      // Map external data to our Vehicle domain model
      return data.map(item => ({
        id: `VHC-${item.id}`,
        depotId: item.userId,
        description: item.title.substring(0, 30) + '...',
        
        // 0/1 Knapsack constraints:
        // maintenanceCost = "weight" (budget consumed)
        maintenanceCost: (item.body.length % 50) + 10,
        
        // priorityValue = "value" (importance of scheduling it now)
        priorityValue: (item.title.length % 20) + 5
      }));
    } catch (error) {
      console.error('[ApiService] Error fetching vehicles:', error.message);
      throw error;
    }
  }
}

module.exports = ApiService;
