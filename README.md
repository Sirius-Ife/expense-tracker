# Expense Tracker (Starter)

**Stack:** Node.js, Express, MongoDB (Mongoose), EJS, Passport (local), Chart.js

## What is included
- Fully scaffolded project with models, routes, views, and static assets
- User authentication (local) with registration and login
- CRUD for expenses (create, list, edit, delete)
- Dashboard page with a Chart.js chart (client-side)
- Step-by-step guides below for any additional setup or features

## Quick start (local)
1. Clone or download this repo.
2. `cd expense-tracker`
3. Create a `.env` file with:
   ```
   MONGO_URI=your_mongodb_connection_string
   SESSION_SECRET=a_long_random_secret
   ```
4. Install dependencies:
   ```bash
   npm install
   ```
5. Run development server:
   ```bash
   npm run dev
   ```
6. Open `http://localhost:3000`

## Files & Structure
See the repository top-level for `server.js`, `routes/`, `models/`, `views/`, `public/`, and `config/`.

## Guides (step-by-step)

### 1) Deploying to Render / Railway / Heroku
- Make sure your `MONGO_URI` is using a production-ready MongoDB (MongoDB Atlas).
- Set environment variables on the platform (MONGO_URI and SESSION_SECRET).
- For Render/Railway: use the `start` script (`npm start`). On Heroku, set `NODE_ENV=production`.

### 2) Improve security (recommended)
- Use HTTPS in production.
- Use helmet (`npm i helmet`) and enable rate limiting.
- Store session in a secure store (e.g., connect-mongo) instead of default memory store.

### 3) Add tests
- Use Jest and Supertest to write integration tests for routes.
- Example: test registration flow, login, and expense CRUD.

### 4) Add user profile and CSV export
- Create a route `/export` that queries user's expenses and streams a CSV file using `fast-csv`.

### 5) Add OAuth (Google/GitHub)
- Use `passport-google-oauth20` or `passport-github2` and wire an OAuth strategy.

## Notes
This starter is intended to be a base. Keep iterating, add styles and polish.
