const ApiService = require('./apiService');
const KnapsackService = require('./knapsackService');
const config = require('../config');

/**
 * Scheduler Service
 * Orchestrates fetching data and running the optimization algorithm.
 */
class SchedulerService {
  /**
   * Generates the optimal maintenance schedule based on available vehicles and budget.
   * @param {number} [customBudget] - Optional custom budget to override config.
   * @returns {Promise<Object>} The optimized schedule result including selected vehicles and depots.
   */
  static async generateSchedule(customBudget) {
    try {
      // 1. Fetch data concurrently
      const [depots, vehicles] = await Promise.all([
        ApiService.fetchDepots(),
        ApiService.fetchVehicles()
      ]);

      // Determine the budget to use (from param or default config)
      const budget = customBudget ? parseInt(customBudget, 10) : config.maxBudget;

      // 2. Run the Knapsack optimization
      const optimizationResult = KnapsackService.optimize(vehicles, budget);

      // 3. Map depot information into the result for a richer response
      // Create a quick lookup map for depots O(1) retrieval
      const depotMap = new Map(depots.map(d => [d.id, d]));

      const enrichedVehicles = optimizationResult.selectedVehicles.map(vehicle => {
        const depot = depotMap.get(vehicle.depotId) || { name: 'Unknown Depot', location: 'Unknown' };
        return {
          ...vehicle,
          depotName: depot.name,
          depotLocation: depot.location
        };
      });

      // 4. Return the finalized schedule
      return {
        metadata: {
          totalVehiclesEvaluated: vehicles.length,
          availableBudget: budget,
          budgetUtilized: optimizationResult.totalCost,
          totalPriorityAchieved: optimizationResult.totalPriority
        },
        schedule: enrichedVehicles
      };
    } catch (error) {
      console.error('[SchedulerService] Error generating schedule:', error.message);
      throw error;
    }
  }
}

module.exports = SchedulerService;
