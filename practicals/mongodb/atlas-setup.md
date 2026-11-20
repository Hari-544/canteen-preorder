# MongoDB Atlas Setup

1. Sign in to MongoDB Atlas and create a free/shared cluster if available in your account.
2. Create a database user with a strong password.
3. In Network Access, allow your current development IP address. Avoid opening access to everyone except temporarily for a controlled classroom demo.
4. Open Connect → Drivers and copy the Node.js connection string.
5. Replace the username, password, cluster host and database name in `server/.env` as `MONGODB_URI`.
6. Never commit `server/.env`; the repository ignores environment files.
7. From the repository root run `npm --prefix server run seed` to insert the original canteen menu and quiz questions.

Use a separate database for experiments so lab CRUD commands do not alter live application data.