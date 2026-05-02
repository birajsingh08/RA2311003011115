/**
 * 0/1 Knapsack Algorithm Service
 *
 * Optimizes vehicle maintenance scheduling.
 * - Capacity (W): maxBudget
 * - Weights (w): maintenanceCost
 * - Values (v): priorityValue
 */
class KnapsackService {
  /**
   * Selects the optimal set of vehicles to service within the given budget.
   *
   * @param {Array} vehicles - Array of vehicle objects
   * @param {number} maxBudget - Maximum allowable maintenance cost
   * @returns {Object} { selectedVehicles, totalCost, totalPriority }
   */
  static optimize(vehicles, maxBudget) {
    const n = vehicles.length;

    // dp[i][w] will hold the maximum priority value achievable
    // with the first 'i' vehicles and a budget of 'w'
    const dp = Array.from({ length: n + 1 }, () => Array(maxBudget + 1).fill(0));

    // Build the DP table
    for (let i = 1; i <= n; i++) {
      const vehicle = vehicles[i - 1];
      const cost = vehicle.maintenanceCost;
      const priority = vehicle.priorityValue;

      for (let w = 0; w <= maxBudget; w++) {
        if (cost <= w) {
          // We can afford this vehicle: 
          // Max of (not taking it) OR (taking it + optimal of remaining budget)
          dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - cost] + priority);
        } else {
          // We cannot afford this vehicle, optimal is same as without it
          dp[i][w] = dp[i - 1][w];
        }
      }
    }

    // Backtrack to find exactly which vehicles were selected
    const selectedVehicles = [];
    let currentBudget = maxBudget;
    let totalCost = 0;

    for (let i = n; i > 0; i--) {
      // If the DP value is different from the row above, we included this item
      if (dp[i][currentBudget] !== dp[i - 1][currentBudget]) {
        const vehicle = vehicles[i - 1];
        selectedVehicles.push(vehicle);
        currentBudget -= vehicle.maintenanceCost;
        totalCost += vehicle.maintenanceCost;
      }
    }

    // Sort by priority value descending for nicer output
    selectedVehicles.sort((a, b) => b.priorityValue - a.priorityValue);

    return {
      selectedVehicles,
      totalCost,
      totalPriority: dp[n][maxBudget]
    };
  }
}

module.exports = KnapsackService;
