# Vehicle Maintenance Scheduler

A backend service that optimizes vehicle maintenance scheduling using the **0/1 Knapsack algorithm**. Given a fleet of vehicles with varying maintenance needs and a constrained budget/time window, the scheduler selects the optimal set of vehicles to service.

## Architecture

```
src/
├── index.js              # Application entry point
├── config/
│   └── index.js          # Centralized configuration
├── controllers/
│   └── scheduleController.js   # Route handlers
├── middleware/
│   └── logger.js         # Request/response logging
├── routes/
│   └── scheduleRoutes.js # Route definitions
├── services/
│   ├── apiService.js     # External data fetching (depots & vehicles)
│   ├── knapsackService.js # 0/1 Knapsack algorithm
│   └── schedulerService.js # Orchestrates scheduling logic
└── utils/
    └── helpers.js        # Shared utility functions
```

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Algorithm:** 0/1 Knapsack (no external libraries)

## Getting Started

```bash
npm install
npm run dev
```

## API Endpoints

| Method | Endpoint    | Description                        |
| ------ | ----------- | ---------------------------------- |
| GET    | `/schedule` | Generate optimized maintenance schedule |

## License

ISC
