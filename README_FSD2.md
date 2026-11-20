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
- Quiz API endpoints remain available for FSD-2 practical demonstrations, but the quiz page is not linked or routed in the canteen website.

## Setup notes
- Never commit real database credentials or session secrets.
- Registration creates student accounts only. To promote an existing account, run `npm --prefix server run make-admin -- admin@example.com` from the repository root. The account must already be registered. Admins use the normal Sign in page; their role is checked by the API. Keep database credentials private.
- The seed command clears and recreates menu and quiz collections; run it only when you intend to reset those collections.
- This is an educational project, not a payment-processing system.
- The original HTML pages are retained while migration and verification continue.

See [practicals/README.md](practicals/README.md) for the syllabus coverage map.

## Student profiles and order customer details

- Students can open **My Profile** and update their name, email, phone, student ID, department and year of study.
- Phone, student ID, department and year of study must be completed before an order can be submitted.
- Each new order stores a snapshot of the student's profile at checkout. Later profile edits do not rewrite previous order records.
- The student sees an order confirmation with the order ID, time, pickup slot, total and initial status.
- Admins can review customer contact/student details and order items in **All Orders**. The admin order list refreshes automatically every 15 seconds.
- Existing orders created before this feature may not have a customer profile snapshot; their available account name and email are shown as a fallback.
