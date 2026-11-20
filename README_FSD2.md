# Campus Canteen — FSD-2 Project

This repository contains the full-stack FSD-2 canteen preorder application on the `main` branch.

## Stack
- React + TypeScript + Vite + React Router
- Node.js + Express + TypeScript
- MongoDB Atlas + Mongoose
- Cookie-backed Express sessions stored in MongoDB
- Axios for REST API requests

## Local setup
1. Install root tooling: `npm install`
2. Install API dependencies: `npm --prefix server install`
3. Install frontend dependencies: `npm --prefix client install`
4. Copy `server/.env.example` to `server/.env`.
5. Set `MONGODB_URI` and a long random `SESSION_SECRET` in `server/.env`.
6. Start both apps: `npm run dev`.
7. Open http://localhost:5173. API health: http://localhost:5000/api/health.

## API routes
- POST /api/auth/register, POST /api/auth/login, GET /api/auth/me, POST /api/auth/logout
- GET /api/menu; administrator-only menu create/update/delete
- POST /api/orders, GET /api/orders; administrator-only order status update
- GET/POST /api/learning/todos; PATCH/DELETE /api/learning/todos/:id
- Quiz API endpoints remain available for FSD-2 practical demonstrations; the quiz page is not part of the canteen website navigation.

## Student profiles and order customer details
- Students can update their name, email, phone, student ID, department and year of study in My Profile.
- Each new order stores a snapshot of the student's profile at checkout. Later profile edits do not rewrite previous orders.
- The student sees an order confirmation and can review order history/status.
- Admins can review customer details and order items in All Orders.
- Older orders may not contain a customer profile snapshot; available account name/email are used as fallback.

## Admin account
Registration creates student accounts only. Promote an already registered account using:
`npm --prefix server run make-admin -- admin@example.com`.
Admins sign in through the normal sign-in page. Keep administrator credentials private.

## Deployment
See [DEPLOYMENT.md](DEPLOYMENT.md) for Render and Vercel setup.

## Important
- Never commit real database credentials or session secrets.
- The seed command clears and recreates menu and quiz collections. Do not run it against production data.
- This is an educational project and does not process real online payments.
