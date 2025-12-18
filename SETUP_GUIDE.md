# Habit Tracker Web App - Setup & Testing Guide

## Project Structure

```
Habit_Tracker_Web_App/
├── Backend/
│   ├── src/
│   │   ├── app.js                 # Express app configuration
│   │   ├── config/
│   │   │   └── db.js              # PostgreSQL connection
│   │   ├── controllers/
│   │   │   ├── auth.controller.js # Auth logic (register, login)
│   │   │   └── habit.controler.js # Habit CRUD operations
│   │   ├── middleware/
│   │   │   └── auth.middleware.js # JWT verification
│   │   └── routes/
│   │       ├── auth.routes.js     # /api/auth endpoints
│   │       └── habit.routes.js    # /api/habits endpoints
│   ├── package.json
│   ├── .env                       # Environment variables
│   ├── index.js                   # Entry point
│   └── database.sql               # Database setup script
└── Frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── Login.jsx          # Login page
    │   │   ├── Signup.jsx         # Signup page
    │   │   └── Dashboard.jsx      # Habits dashboard
    │   ├── components/
    │   │   └── HabitCard.jsx      # Habit card component
    │   ├── App.jsx                # Main app component
    │   ├── App.css                # App styling
    │   ├── index.css              # Global styling
    │   └── main.jsx               # Entry point
    └── package.json
```

## Prerequisites

- Node.js (v16+)
- PostgreSQL database (or Supabase)
- npm or yarn

## Setup Instructions

### 1. Backend Setup

#### Step 1: Navigate to Backend
```bash
cd Backend
```

#### Step 2: Install Dependencies
```bash
npm install
```

#### Step 3: Configure Environment Variables
Create `.env` file in Backend directory (already exists):
```
DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET=your_jwt_secret_key
```

#### Step 4: Setup Database
Run the SQL setup script in your PostgreSQL database:
- Open `database.sql` file
- Copy and execute all SQL commands in your PostgreSQL client
- This creates: `users`, `habits`, and `habit_completions` tables

#### Step 5: Start Backend Server
```bash
npm run dev
```
Server runs on `http://localhost:3000`

### 2. Frontend Setup

#### Step 1: Navigate to Frontend
```bash
cd Frontend
```

#### Step 2: Install Dependencies
```bash
npm install
```

#### Step 3: Start Frontend Development Server
```bash
npm run dev
```
Frontend runs on `http://localhost:5173`

## API Endpoints

### Authentication Routes (`/api/auth`)

**Register User**
```
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Login User**
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Habit Routes (`/api/habits`)

**All routes require: `Authorization: Bearer <token>` header**

**Create Habit**
```
POST /api/habits
Content-Type: application/json
Authorization: Bearer <token>

{
  "name": "Morning Exercise",
  "frequency": "daily",
  "category": "health"
}
```

**Get All Habits**
```
GET /api/habits
Authorization: Bearer <token>
```

**Mark Habit as Complete**
```
POST /api/habits/complete
Content-Type: application/json
Authorization: Bearer <token>

{
  "habitId": 1
}
```

## Testing the Full Application

### Test Flow:

1. **Start Backend**
   ```bash
   cd Backend
   npm run dev
   ```
   Expected: "Server is running on 3000"

2. **Start Frontend** (in new terminal)
   ```bash
   cd Frontend
   npm run dev
   ```
   Expected: Vite dev server running

3. **Test Signup**
   - Navigate to `http://localhost:5173`
   - Click "Sign up"
   - Fill form: Username, Email, Password
   - Click "Sign Up"
   - Expected: Redirects to login page

4. **Test Login**
   - Enter email and password
   - Click "Login"
   - Expected: Redirected to dashboard, token saved to localStorage

5. **Test Create Habit**
   - On dashboard, enter habit name
   - Click "Add Habit"
   - Expected: Habit appears in grid

6. **Test Mark Complete**
   - Click "Mark Complete" on any habit
   - Expected: Success alert, habit marked complete

7. **Test Logout**
   - Click "Logout" button
   - Expected: Redirected to login, localStorage cleared

## Database Connection Verification

### Check Database Tables:

```sql
-- Check users
SELECT * FROM users;

-- Check habits
SELECT * FROM habits;

-- Check completions
SELECT * FROM habit_completions;
```

## Common Issues & Solutions

### Issue: "Cannot find module" errors
**Solution:** Run `npm install` in both Frontend and Backend directories

### Issue: Database connection error
**Solution:** 
- Verify DATABASE_URL in `.env`
- Ensure PostgreSQL is running
- Run database.sql to create tables

### Issue: CORS errors
**Solution:** Backend has CORS enabled, ensure frontend calls `http://localhost:3000`

### Issue: JWT token errors
**Solution:** 
- Ensure JWT_SECRET is set in `.env`
- Clear localStorage and re-login

## Environment Variables Required

### Backend `.env`
```
DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET=your_secret_key_here
```

## Verification Checklist

- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Can register a new user
- [ ] Can login with created user
- [ ] Can create new habits
- [ ] Can mark habits as complete
- [ ] Can logout
- [ ] Token persists in localStorage
- [ ] Habits persist in database
- [ ] All API endpoints respond correctly

## Production Deployment

Before deploying:
1. Update API URLs from `localhost:3000` to production URL
2. Set strong JWT_SECRET
3. Use production database URL
4. Build frontend: `npm run build`
5. Set NODE_ENV=production
