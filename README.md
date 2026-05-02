# Vehicle Maintenance Scheduler

A production-ready backend service that optimizes vehicle maintenance scheduling using the **0/1 Knapsack algorithm**. Given a fleet of vehicles with varying maintenance needs and a constrained budget, the scheduler selects the optimal set of vehicles to service to maximize priority.

## ✨ Features & Requirements Fulfilled

1. **Clean Architecture:** Strict separation of concerns (`controllers`, `services`, `utils`, `routes`, `middleware`).
2. **0/1 Knapsack Algorithm:** Core optimization logic built completely from scratch using Dynamic Programming (no external math libraries).
3. **External API Integration:** Uses Node.js native `fetch()` to dynamically retrieve vehicle and depot data (no hardcoded data).
4. **Middleware:** Includes a custom logging middleware that generates a unique `requestId` for request tracing, and a global error handling middleware.
5. **Production Ready:** Includes graceful shutdown hooks (`SIGTERM`/`SIGINT`), environment-based configuration, and proper HTTP status code handling.

## 📁 Architecture

```text
src/
├── index.js              # Application entry point & graceful shutdown
├── app.js                # Express app setup & middleware pipeline
├── config/
│   └── index.js          # Centralized configuration variables
├── controllers/
│   └── scheduleController.js   # Parses requests and formats HTTP responses
├── middleware/
│   ├── logger.js         # Request/response logging with UUIDs
│   └── errorHandler.js   # Global error catcher
├── routes/
│   └── scheduleRoutes.js # Route definitions
├── services/
│   ├── apiService.js     # External data fetching via fetch()
│   ├── knapsackService.js # 0/1 DP Knapsack algorithm logic
│   └── schedulerService.js # Orchestrates API data + Knapsack optimizer
└── utils/
    └── helpers.js        # Shared utility functions (timestamps, etc.)
```

## 🚀 Getting Started

### Prerequisites
- Node.js v18 or higher (required for native `fetch`)

### Installation & Run

```bash
# Install dependencies (Express)
npm install

# Run the server in development mode
npm run dev
```

## 📡 API Documentation

### `GET /schedule`

Generates an optimized maintenance schedule based on available budget.

**Query Parameters:**
- `budget` (optional) - The maximum maintenance cost allowed (default: 1000). Example: `?budget=250`

**Success Response Example (200 OK):**
```json
{
    "status": "success",
    "requestId": "1b05b922-166d-4820-a1fe-fa798094ca17",
    "data": {
        "metadata": {
            "totalVehiclesEvaluated": 20,
            "availableBudget": 250,
            "budgetUtilized": 246,
            "totalPriorityAchieved": 171
        },
        "schedule": [
            {
                "id": "VHC-3",
                "depotId": 1,
                "description": "ea molestias quasi exercitatio...",
                "maintenanceCost": 24,
                "priorityValue": 24,
                "depotName": "Romaguera-Crona Depot",
                "depotLocation": "Gwenborough"
            }
        ]
    }
}
```

## 📄 License
ISC
