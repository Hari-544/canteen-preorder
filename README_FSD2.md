# Campus Canteen — FSD-2 Upgrade

This branch upgrades the original HTML/CSS/Vanilla JavaScript canteen preorder project into a TypeScript + React + Node.js + Express + MongoDB learning application. The original static pages remain in the repository during migration.

## Stack
- React + TypeScript + Vite + React Router
- Node.js + Express + TypeScript
- MongoDB Atlas + Mongoose
- Cookie-backed Express sessions stored in MongoDB
- Axios for REST API requests

## Setup
1. Install root tooling: `npm install`
2. Install API dependencies: `npm --prefix server install`
3. Install frontend dependencies: `npm --prefix client install`
4. Copy `.env.example` to `server/.env`.
5. Set `MONGODB_URI` and a long random `SESSION_SECRET` in `server/.env`.
6. Seed the menu and quiz data: `npm --prefix server run seed`
7. Start both apps: `npm run dev`
8. Open http://localhost:5173. API health: http://localhost:5000/api/health

## API routes
- POST /api/auth/register, POST /api/auth/login, GET /api/auth/me, POST /api/auth/logout
- GET /api/menu; administrator-only menu create/update/delete
- POST /api/orders, GET /api/orders; administrator-only order status update
- GET/POST /api/learning/todos; PATCH/DELETE /api/learning/todos/:id
- GET /api/learning/quiz, POST /api/learning/quiz/submit

## Setup notes
- Never commit real database credentials or session secrets.
- Registration creates student accounts only. Promote an administrator manually in MongoDB by changing the user's role to admin.
- The seed command clears and recreates menu and quiz collections; run it only when you intend to reset those collections.
- This is an educational project, not a payment-processing system.
- The original HTML pages are retained while migration and verification continue.

See [practicals/README.md](practicals/README.md) for the syllabus coverage map.