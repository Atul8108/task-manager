# Task Manager API

A RESTful API for managing tasks, built with Node.js and Express.js using in-memory storage (seeded from `task.json`). Data resets when the server restarts.

## Setup

Requires Node.js 18+.

```bash
npm install
npm start          # http://localhost:3000
npm run test       # run the test suite
```

## Project structure

```
.
├── app.js                         # Root entry (tests require this) → loads src/index.js
├── task.json                      # Seed data
├── src
│   ├── index.js                   # Express app setup, route mounting, server start
│   ├── consts/                    # Config & constants (cEnv, cGlobal)
│   ├── enums/                     # Status codes & response status (eHttpStatusCode, eResponseStatus)
│   ├── interfaces/                # JSDoc type definitions (iTask, iResponse)
│   ├── db/memory/                 # In-memory data store (TaskDb)
│   ├── validators/                # Request validation (TaskValidator)
│   ├── middlewares/               # Param validation, 404 & error handlers
│   ├── controllers/               # Request handlers (TaskController)
│   ├── routes/                    # Route definitions (TaskRoute)
│   └── utils/                     # Shared helpers
└── test/                          # Test suite
```

Request flow: **route → middleware → controller → validator → db**.

## Task object

| Field         | Type    | Rules                     |
|---------------|---------|---------------------------|
| `id`          | number  | Auto-generated            |
| `title`       | string  | Required, non-empty, ≤100 chars |
| `description` | string  | Required, non-empty, ≤500 chars |
| `completed`   | boolean | Required (`true`/`false`) |

## Endpoints

| Method | Endpoint     | Description                                         | Success | Errors        |
|--------|--------------|-----------------------------------------------------|---------|---------------|
| GET    | `/tasks`     | List tasks. Optional filter `?completed=true/false` | 200     | 400           |
| GET    | `/tasks/:id` | Get a task by id                                    | 200     | 400, 404      |
| POST   | `/tasks`     | Create a task                                       | 201     | 400           |
| PUT    | `/tasks/:id` | Update a task                                       | 200     | 400, 404      |
| DELETE | `/tasks/:id` | Delete a task                                       | 200     | 400, 404      |

Errors return:

```json
{ "status": "error", "message": "Task not found." }
```

## Examples

```bash
curl http://localhost:3000/tasks
curl "http://localhost:3000/tasks?completed=true"
curl http://localhost:3000/tasks/1

curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn Express","description":"Build a REST API","completed":false}'

curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated","description":"Updated description","completed":true}'

curl -X DELETE http://localhost:3000/tasks/1
```

## Error handling

- **400** — invalid body (missing fields, `completed` not a boolean), invalid id (non-numeric), bad query filter, or malformed JSON
- **404** — task id not found, or unknown route
- **500** — unexpected server error
