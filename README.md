# Aurora — Remote (Component Library)

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** + **@originjs/vite-plugin-federation**
- **Tailwind CSS v4** — utility-first styling
- **Apollo Client** — GraphQL client for data fetching
- **MSW (Mock Service Worker)** — mocks GraphQL and WebSocket in the browser
- **Mitt** — lightweight event emitter for cross-app communication

## Exposed Modules

| Module                | Description                                                                |
| --------------------- | -------------------------------------------------------------------------- |
| `Header`              | Simple app header                                                          |
| `Input`               | Reusable styled input field                                                |
| `Form`                | Basic form with name/age fields and native validation                      |
| `Catalog`             | Fetches and displays a component list via GraphQL                          |
| `NotificationManager` | Listens to a mock WebSocket, displays notifications, emits events via mitt |
| `emitter`             | Shared mitt instance for cross-app event communication                     |

## Getting Started

### Prerequisites

- Node.js ≥ 18

### Install & Run (standalone)

```bash
npm install
npm run dev
```

Available at **http://localhost:3001**.

### Build & Serve (for Host consumption)

```bash
npm run serve
```

This builds the app and starts a preview server on port 3001. The host loads `remoteEntry.js` from `http://localhost:3001/assets/remoteEntry.js`.

## Environment Variables

Defined in `.env`:

| Variable                   | Description                                          | Default                         |
| -------------------------- | ---------------------------------------------------- | ------------------------------- |
| `VITE_GRAPHQL_URL`         | GraphQL endpoint (intercepted by MSW)                | `http://localhost:3001/graphql` |
| `VITE_NOTIFICATION_WS_URL` | WebSocket URL for notifications (intercepted by MSW) | `ws://localhost:3001/ws`        |
