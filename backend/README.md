# Backend

Express 5 + Mongoose REST API.

## Scripts

| Command       | Description                                      |
| ------------- | ------------------------------------------------ |
| `npm run dev` | Start with nodemon (auto-restart on file change) |
| `npm start`   | Start with plain Node (no auto-restart)          |

## Environment variables

Copy the example file and fill in your values:

```sh
cp .env.example .env        # mac / linux
copy .env.example .env      # win (cmd)
```

| Variable        | Required | Default                 | Description                                                                           |
| --------------- | -------- | ----------------------- | ------------------------------------------------------------------------------------- |
| `NODE_ENV`      | No       | `development`           | `production` enables combined Morgan logs and hides stack traces from error responses |
| `PORT`          | No       | `5000`                  | Port the server listens on                                                            |
| `MONGO_URI`     | **Yes**  | —                       | Full MongoDB connection string.                                                       |
| `CLIENT_ORIGIN` | No       | `http://localhost:5173` | Allowed CORS origin.                                                                  |

## Dev

```sh
npm install
npm run dev
```

Server starts at `http://localhost:5000`. Health check: `GET /health`.

## Deploy

The backend is a standard Node.js process - no build step required.

1. Copy files to the server.
2. Set environment variables on the host.
3. Install production dependencies

```sh
npm install --omit=dev
```

4. Start the server:

```sh
npm start
```

### API base path

All routes are mounted under `/api`:

| Resource  | Base path        |
| --------- | ---------------- |
| Events    | `/api/events`    |
| Attendees | `/api/attendees` |
| Tickets   | `/api/tickets`   |
