# Frontend

React 19 + TypeScript + Vite.

## Scripts

| Command           | Description                                          |
| ----------------- | ---------------------------------------------------- |
| `npm run dev`     | Start dev server at `http://localhost:5173` with HMR |
| `npm run build`   | Type-check then compile to `dist/`                   |
| `npm run preview` | Serve the production build locally                   |
| `npm run lint`    | Run ESLint                                           |

## Dev

```sh
npm install
npm run dev
```

## Build & deploy

```sh
npm run build
```

Output is written to `dist/`. Serve it with any static host (Nginx, Caddy, Netlify, Vercel, etc.).

Set the environment variable before building if the backend is not on `localhost`:

| Variable       | Default                       | Description                                                               |
| -------------- | ----------------------------- | ------------------------------------------------------------------------- |
| `VITE_API_URL` | _(see `src/services/api.ts`)_ | Base URL of the backend API - update `api.ts` if the backend host changes |
