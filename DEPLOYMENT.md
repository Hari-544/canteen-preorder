# Production deployment

This repository is a monorepo. Deploy the Express API to Render from the repository root and deploy the Vite app to Vercel with `client` as its root directory.

## 1. MongoDB Atlas
- Keep the existing Atlas database and production data.
- In Atlas Network Access, allow connections from the Render service. For a quick educational deployment, `0.0.0.0/0` works but is broader than ideal; use a tighter allowlist where possible.
- Never run the seed command against a database containing real orders: it clears and recreates the menu and quiz collections.

## 2. Deploy the API to Render
Create a new **Web Service** and connect this repository.

| Setting | Value |
|---|---|
| Branch | `main` |
| Root Directory | leave blank |
| Runtime | Node |
| Build Command | `npm install --include=dev && npm --prefix client install --include=dev && npm --prefix server install --include=dev && npm run build` |
| Start Command | `npm start` |
| Health Check Path | `/api/health` |

Set these environment variables in Render:
- `NODE_ENV=production`
- `MONGODB_URI` = the Atlas connection string, including the intended database name
- `SESSION_SECRET` = a long random secret (do not reuse a public/example value)
- `CLIENT_URL` = the exact Vercel production origin, for example `https://your-project.vercel.app` (no trailing slash)

The repository includes `render.yaml` as an optional Blueprint configuration. You can also enter the settings manually as above.

After deployment, verify `https://YOUR-RENDER-SERVICE.onrender.com/api/health` returns a JSON status of `ok`.

## 3. Deploy the frontend to Vercel
Import the same GitHub repository into Vercel.

| Setting | Value |
|---|---|
| Root Directory | `client` |
| Framework Preset | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |

Set the Vercel environment variable:
- `VITE_API_URL` = `https://YOUR-RENDER-SERVICE.onrender.com/api`

Replace the example service URL with the real Render URL. Deploy the project.

The `client/vercel.json` file provides SPA fallback routing so direct navigation and page refreshes work on client-side routes.

## 4. Finish CORS configuration
Once Vercel gives you its production URL, return to Render and set `CLIENT_URL` to that exact origin. If you also use a custom domain or a Vercel preview origin, add each permitted origin as a comma-separated value. Save and redeploy the API.

The API enables credentialed CORS and uses secure, cross-site session cookies in production. Both sites must use HTTPS. The frontend Axios client already has `withCredentials: true`.

## 5. Verify the live app
- Open the Vercel URL and refresh a nested route.
- Register/sign in as a student and verify the session survives a page refresh.
- Sign in as the admin and verify protected admin pages/actions.
- Update a profile, place a test order, and confirm the admin sees the customer snapshot.
- Update the order status and confirm the student sees the change.
- Check Render logs and browser DevTools Network/Console if an API request fails.

## 6. Production notes
- Do not upload either local `.env` file to GitHub.
- Do not expose `SESSION_SECRET` or the Atlas password in screenshots or chat.
- Render free instances may sleep when idle, so the first request after inactivity may be slow.
- Vercel's `VITE_*` values are embedded in the frontend build; only put public configuration such as the API base URL there, never secrets.
