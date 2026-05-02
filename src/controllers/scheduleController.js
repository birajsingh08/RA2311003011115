const SchedulerService = require('../services/schedulerService');

/**
 * Controller for Schedule endpoints
 */
const scheduleController = {
  /**
   * Generates the optimal maintenance schedule
   * GET /schedule?budget=150
   */
  async getSchedule(req, res, next) {
    try {
      const { budget } = req.query;
      
      // Basic validation for the budget query param
      if (budget && isNaN(parseInt(budget, 10))) {
        return res.status(400).json({
          error: 'Bad Request',
          message: 'Budget query parameter must be a valid number'
        });
      }

      // Generate the schedule using our orchestration service
      const result = await SchedulerService.generateSchedule(budget);
      
      res.status(200).json({
        status: 'success',
        // include the trace ID so the client can reference logs if needed
        requestId: req.id,
        data: result
      });
    } catch (error) {
      // Pass to Express error handler (to be built in Phase 8)
      next(error);
    }
  }
};

module.exports = scheduleController;
