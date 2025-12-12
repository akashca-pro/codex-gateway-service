# Codex Gateway Service

The Gateway Service is the single public entry point to the Codex platform. All client HTTP traffic flows through this service. It performs authentication, request validation, rate limiting, logging and orchestrates outbound gRPC calls to downstream microservices.

---

## 1. Overview

The gateway acts as:

* The **HTTP server** for all frontend clients.
* The **API aggregator**, routing requests to backend services.
* The **JWT verification layer**, including Redis blacklist checks.
* The **request validator**, enforcing Zod schemas.
* The **central telemetry emitter**, sending traces and metrics to the OpenTelemetry collector.

This is the only service directly exposed to end users.

---

## 2. Responsibilities

### Handles

* Authentication & Authorization (JWT)
* Token blacklist handling (Redis)
* Strict request validation (Zod)
* Global error normalization
* CORS & secure headers via Helmet
* Rate limiting
* Logging with Pino
* Prometheus metrics
* gRPC request orchestration for all downstream services

### Does NOT Handle

* Business logic
* Database operations
* Execution, hints, leaderboard logic, etc.

These responsibilities belong to other microservices.

---

## 3. Architecture

```
Client → Gateway (Express)
       → Middlewares:
           - Logging (Pino)
           - JWT verification
           - Rate limiter
           - Zod validation
       → Routes
       → Controllers
       → gRPC clients → Downstream services
       → Response
```

The codebase follows a layered structure:

* **presentation/** → routes, controllers, middlewares
* **transport/grpc/** → gRPC client implementations
* **validation/** → Zod schemas
* **config/** → tracing, metrics, Redis, environment
* **util/** → logging, errors, cloud utilities

---

## 4. Tech Stack

* Node.js + TypeScript
* Express.js
* gRPC clients (generated from shared protobufs)
* Redis
* Zod
* Helmet, CORS
* Pino Logger
* OpenTelemetry tracing

---

## 5. Request Flow Example

### `/api/v1/user/problems/:id/code/submit`

1. JWT verification
2. Zod validation (params + body)
3. Controller: `submitProblem()`
4. DTO creation
5. gRPC call → Code Manage Service
6. Response returned

NB : Traces emitted to otel collector along the request.

This flow applies to all module routes.
---

## 6. gRPC Clients

All downstream services are accessed via dedicated gRPC clients:

| Service     | Client                                                    |
| ----------- | --------------------------------------------------------- |
| Auth User   | `transport/grpc/auth-user-service/*`                      |
| Problem     | `transport/grpc/problem-service/*`                        |
| Code Manage | `transport/grpc/code-manage-service/CodeManageService.ts` |
| Collab      | `transport/grpc/collab-service/collab-service.ts`         |

Each client extends `GrpcBaseService`, giving consistent error handling, logging and tracing.

---

## 7. Middlewares

### **JWT Middleware**

* Verifies access tokens
* Checks Redis blacklist
* Attaches user context to request object

### **Zod Validation**

Strong validation for:

* Body
* Params
* Query

### **Rate Limiting**

Protects against spam and brute-force attempts.

### **Error Handler**

Normalizes all errors including:

* gRPC failures
* Zod validation errors
* Custom errors

---

## 8. Tracing

OpenTelemetry sends:

* HTTP server spans
* Express middleware spans
* gRPC client spans
* Custom attributes such as `userId`, `problemId`, `routeLabel`

---

## 9. Folder Structure (Simplified)

```
src/
  config/
  presentation/
    routes/
    controllers/
    middlewares/
  transport/
    grpc/
  validation/
  util/
  index.ts
```

---

## 10. Local Development

Install dependencies:

```
npm install
```

Start in development mode:

```
npm run dev
```

Run linter:

```
npm run lint
```

Build:

```
npm run build
```

NB : DockerFile can be use to run as container.

---

## 11. CI/CD Workflow

### Branch Workflow

* Push to **dev** or feature branches → build, lint, type-check, docker image build (test only).
* Merge into **main** → production Docker image build and push to Docker Hub.

### Deployment Workflow

* **ArgoCD Image Updater** monitors Docker Hub for new tags.
* Once detected, it updates the image tag in GKE.
* Kubernetes rolls out the new version automatically.

There are **zero manual deployment steps**.

---

## 14. Error Handling

All errors follow a consistent response format. The gateway gracefully handles:

* Zod validation errors
* Missing/invalid JWT
* Expired or blacklisted tokens
* gRPC upstream failures
* Internal errors

---

## 15. License

MIT

```
```
