# 🍔 Canteen Pre-Order System — FSD-2

A full-stack college canteen preorder application built with React, TypeScript, Node.js, Express and MongoDB Atlas.

## Features
- Student registration, login and profile management
- Admin authentication and protected administration features
- Menu browsing and management
- Cart, order placement, order confirmation and order history
- Admin order/customer details and order-status management
- To-do practical module and FSD-2 practical demonstrations

## Technology
- Frontend: React, TypeScript, Vite, React Router and Axios
- Backend: Node.js, Express, TypeScript and express-session
- Database: MongoDB Atlas with Mongoose
- Hosting: Vercel (frontend) and Render (backend)

## Run locally
1. Install Node.js LTS.
2. Run `npm install`, `npm --prefix client install` and `npm --prefix server install`.
3. Copy `server/.env.example` to `server/.env` and set your MongoDB URI and session secret.
4. Run `npm run dev`.
5. Open http://localhost:5173. API health: http://localhost:5000/api/health.

See [README_FSD2.md](README_FSD2.md) for API and feature notes, and [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment.

## Security
Never commit `.env` files, MongoDB credentials or session secrets. Registration creates student accounts; promote an existing account to admin with `npm --prefix server run make-admin -- admin@example.com`.
