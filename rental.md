# 🎬 Movie Rental System - Complete Implementation Guide

> A comprehensive guide for students to build a full-stack movie rental application from scratch.

---

## 📚 Table of Contents

1. [Project Overview](#-project-overview)
2. [System Architecture](#-system-architecture)
3. [Visual Workflow](#-visual-workflow)
4. [Backend Implementation](#-backend-implementation)
5. [Frontend Implementation](#-frontend-implementation)
6. [Data Flow Explained](#-data-flow-explained)
7. [Step-by-Step Implementation Checklist](#-step-by-step-implementation-checklist)
8. [Testing Your Application](#-testing-your-application)
9. [Common Mistakes to Avoid](#-common-mistakes-to-avoid)

---

## 🎯 Project Overview

### What Are We Building?

Imagine a **library for movies** where users can:

- 📽️ Browse available movies
- 🎫 Rent movies for a period of time (7 days)
- 📤 Return movies when finished
- 📋 View their rental history

### The "Toy Library" Analogy 🧸

Think of our system like a toy library:

| Real Library   | Our Movie Rental         |
| -------------- | ------------------------ |
| Library Card   | User Account (JWT Token) |
| Borrowing Form | Rental Model             |
| Librarian      | Backend Controllers      |
| Catalog        | Movie Database           |
| Receipt        | Rental Record            |

---

## 🏗️ System Architecture

### The Three-Layer Cake 🎂

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   🎨 PRESENTATION LAYER (Frontend - React)                  │
│   ═══════════════════════════════════════                   │
│   • What users SEE and CLICK                                │
│   • Buttons, forms, movie posters                           │
│   • Sends requests to backend                               │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ⚙️ BUSINESS LOGIC LAYER (Backend - Node.js/Express)       │
│   ═══════════════════════════════════════════════           │
│   • The "brain" that makes decisions                        │
│   • Validates data, applies rules                           │
│   • Processes requests and sends responses                  │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   💾 DATA LAYER (Database - MongoDB)                        │
│   ════════════════════════════════                          │
│   • Stores all information permanently                      │
│   • Users, Movies, Rentals                                  │
│   • Remembers everything!                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Folder Structure

```
fullstack/
│
├── 📁 movie-app/                 # Backend (The Kitchen)
│   ├── 📁 models/                # Data shapes (Recipes)
│   │   ├── user.js
│   │   ├── movie.js
│   │   └── rental.js             # 🆕 You'll create this!
│   │
│   ├── 📁 controllers/           # Business logic (Chefs)
│   │   ├── authController.js
│   │   ├── movieController.js
│   │   └── rentalController.js   # 🆕 You'll create this!
│   │
│   ├── 📁 routes/                # URL endpoints (Doors)
│   │   ├── authRoutes.js
│   │   ├── movieRoutes.js
│   │   └── rentalRoutes.js       # 🆕 You'll create this!
│   │
│   ├── 📁 middlewares/           # Security guards
│   │   └── auth.js               # 🆕 You'll update this!
│   │
│   └── server.js                 # Main entry point
│
└── 📁 frontend/                  # Frontend (The Restaurant)
    └── 📁 src/
        ├── 📁 components/        # UI pieces (Plates)
        │   ├── MovieCard.jsx     # 🆕 You'll create this!
        │   ├── MovieList.jsx     # 🆕 You'll create this!
        │   └── MyRentals.jsx     # 🆕 You'll create this!
        │
        ├── 📁 services/          # API communication (Waiters)
        │   └── api.js            # 🆕 You'll create this!
        │
        ├── App.jsx               # Main component
        └── App.css               # Styles
```

---

## 🔄 Visual Workflow

### The Complete Rental Journey

```
    👤 USER                    🌐 FRONTEND                  🖥️ BACKEND                   💾 DATABASE
      │                            │                            │                            │
      │  1. Clicks "Rent"          │                            │                            │
      │ ─────────────────────────► │                            │                            │
      │                            │                            │                            │
      │                            │  2. Sends POST request     │                            │
      │                            │   with JWT token           │                            │
      │                            │ ─────────────────────────► │                            │
      │                            │                            │                            │
      │                            │                            │  3. Verify token           │
      │                            │                            │ ──────────────────────►    │
      │                            │                            │                            │
      │                            │                            │  4. Check: User exists?    │
      │                            │                            │ ◄──────────────────────    │
      │                            │                            │                            │
      │                            │                            │  5. Check: Movie exists?   │
      │                            │                            │ ──────────────────────►    │
      │                            │                            │                            │
      │                            │                            │  6. Movie found!           │
      │                            │                            │ ◄──────────────────────    │
      │                            │                            │                            │
      │                            │                            │  7. Check: Already rented? │
      │                            │                            │ ──────────────────────►    │
      │                            │                            │                            │
      │                            │                            │  8. No duplicate!          │
      │                            │                            │ ◄──────────────────────    │
      │                            │                            │                            │
      │                            │                            │  9. Create rental record   │
      │                            │                            │ ──────────────────────►    │
      │                            │                            │                            │
      │                            │                            │  10. Rental saved! ✅      │
      │                            │                            │ ◄──────────────────────    │
      │                            │                            │                            │
      │                            │  11. Success response      │                            │
      │                            │ ◄───────────────────────── │                            │
      │                            │                            │                            │
      │  12. Shows "Rented!" 🎉    │                            │                            │
      │ ◄───────────────────────── │                            │                            │
      │                            │                            │                            │
```

### The Return Movie Journey

```
    👤 USER                    🌐 FRONTEND                  🖥️ BACKEND                   💾 DATABASE
      │                            │                            │                            │
      │  1. Clicks "Return"        │                            │                            │
      │ ─────────────────────────► │                            │                            │
      │                            │                            │                            │
      │                            │  2. PUT request            │                            │
      │                            │   /rentals/:id/return      │                            │
      │                            │ ─────────────────────────► │                            │
      │                            │                            │                            │
      │                            │                            │  3. Find rental            │
      │                            │                            │ ──────────────────────►    │
      │                            │                            │                            │
      │                            │                            │  4. Check: Is it yours?    │
      │                            │                            │     Is it still active?    │
      │                            │                            │                            │
      │                            │                            │  5. Update status to       │
      │                            │                            │     "returned"             │
      │                            │                            │ ──────────────────────►    │
      │                            │                            │                            │
      │                            │  6. Success!               │                            │
      │                            │ ◄───────────────────────── │                            │
      │                            │                            │                            │
      │  7. Shows "Returned!" ✅   │                            │                            │
      │ ◄───────────────────────── │                            │                            │
```

---

## 🖥️ Backend Implementation

### 📦 Step 1: The Rental Model

> **Purpose:** Defines the SHAPE of rental data - what information we store.

**File to create:** `models/rental.js`

**What this file should do:**

```
┌────────────────────────────────────────────────────────────┐
│                    RENTAL MODEL                            │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  Fields to include:                                        │
│  ─────────────────                                         │
│                                                            │
│  📌 user          → Reference to User (ObjectId)           │
│                     Required: YES                          │
│                     Purpose: WHO rented it                 │
│                                                            │
│  📌 movie         → Reference to Movie (ObjectId)          │
│                     Required: YES                          │
│                     Purpose: WHICH movie                   │
│                                                            │
│  📌 dateRented    → Date type                              │
│                     Default: Current date/time             │
│                     Purpose: WHEN they rented              │
│                                                            │
│  📌 dateDue       → Date type                              │
│                     Default: 7 days from now               │
│                     Purpose: WHEN to return                │
│                                                            │
│  📌 dateReturned  → Date type                              │
│                     Default: null (empty)                  │
│                     Purpose: WHEN actually returned        │
│                                                            │
│  📌 status        → String (enum)                          │
│                     Options: 'active' or 'returned'        │
│                     Default: 'active'                      │
│                     Purpose: Current rental state          │
│                                                            │
│  📌 rentalPrice   → Number                                 │
│                     Required: YES                          │
│                     Purpose: How much it cost              │
│                                                            │
│  ⚙️ Options:                                               │
│     timestamps: true (auto createdAt/updatedAt)            │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

**Key Concepts to Understand:**

| Concept       | Explanation                                                        |
| ------------- | ------------------------------------------------------------------ |
| `ObjectId`    | A special ID that links to another collection (like a foreign key) |
| `ref: 'User'` | Tells MongoDB this ID points to the User collection                |
| `enum`        | Restricts field to only allowed values                             |
| `default`     | Value used if none is provided                                     |
| `timestamps`  | Automatically tracks creation and update times                     |

---

### 🎮 Step 2: The Rental Controller

> **Purpose:** Contains the LOGIC for handling rental operations - the "brain"

**File to create:** `controllers/rentalController.js`

**Functions to implement:**

```
┌────────────────────────────────────────────────────────────┐
│                  RENT MOVIE FUNCTION                       │
│                  rentMovie(req, res)                       │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  INPUTS:                                                   │
│  ───────                                                   │
│  • req.params.movieId → The movie to rent                  │
│  • req.user.id        → The logged-in user (from auth)     │
│                                                            │
│  STEPS:                                                    │
│  ──────                                                    │
│  1. Extract movieId from URL parameters                    │
│  2. Extract userId from authenticated user                 │
│  3. Find the movie in database                             │
│     └── If not found → return 404 error                    │
│  4. Check if movie is available                            │
│     └── If not → return 400 error                          │
│  5. Check for existing active rental (same user + movie)   │
│     └── If exists → return 400 error                       │
│  6. Create new Rental document with:                       │
│     • user: userId                                         │
│     • movie: movieId                                       │
│     • rentalPrice: movie.rentalPrice                       │
│  7. Save rental to database                                │
│  8. Return 201 success with rental data                    │
│                                                            │
│  ERROR HANDLING:                                           │
│  ───────────────                                           │
│  • Wrap in try/catch                                       │
│  • Return 500 for unexpected errors                        │
│                                                            │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│                  RETURN MOVIE FUNCTION                     │
│                  returnMovie(req, res)                     │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  INPUTS:                                                   │
│  ───────                                                   │
│  • req.params.rentalId → The rental to return              │
│  • req.user.id         → The logged-in user                │
│                                                            │
│  STEPS:                                                    │
│  ──────                                                    │
│  1. Extract rentalId from URL parameters                   │
│  2. Extract userId from authenticated user                 │
│  3. Find the rental in database                            │
│     └── If not found → return 404 error                    │
│  4. Verify ownership (rental.user === userId)              │
│     └── If not owner → return 403 forbidden                │
│  5. Check if already returned                              │
│     └── If returned → return 400 error                     │
│  6. Update rental:                                         │
│     • status = 'returned'                                  │
│     • dateReturned = new Date()                            │
│  7. Save changes                                           │
│  8. Return 200 success                                     │
│                                                            │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│                GET MY RENTALS FUNCTION                     │
│                getMyRentals(req, res)                      │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  INPUTS:                                                   │
│  ───────                                                   │
│  • req.user.id → The logged-in user                        │
│                                                            │
│  STEPS:                                                    │
│  ──────                                                    │
│  1. Find all rentals where user === userId                 │
│  2. Populate movie field (get movie details)               │
│     └── Select: title, posterUrl, rentalPrice              │
│  3. Sort by dateRented (newest first: -1)                  │
│  4. Return array of rentals                                │
│                                                            │
│  💡 TIP: Use .populate() to get related data               │
│                                                            │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│               GET ALL RENTALS FUNCTION                     │
│               getAllRentals(req, res)                      │
│               [ADMIN ONLY]                                 │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  STEPS:                                                    │
│  ──────                                                    │
│  1. Find ALL rentals in database                           │
│  2. Populate user field (name, email)                      │
│  3. Populate movie field (title, rentalPrice)              │
│  4. Sort by dateRented (newest first)                      │
│  5. Return array of all rentals                            │
│                                                            │
│  🔐 Protected by isAdmin middleware                        │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

### 🚪 Step 3: The Rental Routes

> **Purpose:** Defines URL endpoints - the "doors" users knock on

**File to create:** `routes/rentalRoutes.js`

**Routes to implement:**

```
┌─────────────────────────────────────────────────────────────────┐
│                        RENTAL ROUTES                            │
├──────────────┬─────────────────────────┬───────────────────────┤
│    METHOD    │         PATH            │      DESCRIPTION      │
├──────────────┼─────────────────────────┼───────────────────────┤
│              │                         │                       │
│    POST      │  /api/rentals/:movieId  │  Rent a movie         │
│              │                         │  🔐 Auth required     │
│              │                         │                       │
├──────────────┼─────────────────────────┼───────────────────────┤
│              │                         │                       │
│    PUT       │  /api/rentals/:rentalId │  Return a movie       │
│              │  /return                │  🔐 Auth required     │
│              │                         │                       │
├──────────────┼─────────────────────────┼───────────────────────┤
│              │                         │                       │
│    GET       │  /api/rentals/me        │  Get my rentals       │
│              │                         │  🔐 Auth required     │
│              │                         │                       │
├──────────────┼─────────────────────────┼───────────────────────┤
│              │                         │                       │
│    GET       │  /api/rentals           │  Get all rentals      │
│              │                         │  🔐 Auth required     │
│              │                         │  👑 Admin only        │
│              │                         │                       │
└──────────────┴─────────────────────────┴───────────────────────┘
```

**Route Parameters Explained:**

```
POST /api/rentals/:movieId
                   └─────── This is a VARIABLE

Example: POST /api/rentals/507f1f77bcf86cd799439011
         The movieId would be "507f1f77bcf86cd799439011"

Access in code: req.params.movieId
```

---

### 🔐 Step 4: The Auth Middleware

> **Purpose:** Security guards that check if users are allowed to access routes

**File to update:** `middlewares/auth.js`

**Functions to implement:**

```
┌────────────────────────────────────────────────────────────┐
│                   PROTECT MIDDLEWARE                       │
│                   (The Bouncer)                            │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  PURPOSE: Verify user is logged in                         │
│                                                            │
│  HOW IT WORKS:                                             │
│  ─────────────                                             │
│                                                            │
│  1. Check request headers for "Authorization"              │
│     └── Format: "Bearer <token>"                           │
│                                                            │
│  2. Extract the token                                      │
│     └── Split by space, take second part                   │
│                                                            │
│  3. If no token found:                                     │
│     └── Return 401 "Please log in"                         │
│                                                            │
│  4. Verify token using jwt.verify()                        │
│     └── Use your JWT_SECRET from .env                      │
│     └── If invalid → Return 401                            │
│                                                            │
│  5. Find user from decoded token ID                        │
│     └── If user not found → Return 401                     │
│                                                            │
│  6. Attach user to request: req.user = user                │
│                                                            │
│  7. Call next() to continue to the route                   │
│                                                            │
│                                                            │
│  VISUAL FLOW:                                              │
│  ────────────                                              │
│                                                            │
│  Request → [Has Token?] → NO  → 401 Error                  │
│                  │                                         │
│                 YES                                        │
│                  ↓                                         │
│            [Token Valid?] → NO → 401 Error                 │
│                  │                                         │
│                 YES                                        │
│                  ↓                                         │
│            [User Exists?] → NO → 401 Error                 │
│                  │                                         │
│                 YES                                        │
│                  ↓                                         │
│            Attach user to req                              │
│                  ↓                                         │
│              next() ✅                                     │
│                                                            │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│                   IS ADMIN MIDDLEWARE                      │
│                   (VIP Check)                              │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  PURPOSE: Verify user has admin privileges                 │
│                                                            │
│  PREREQUISITE: Must run AFTER protect middleware           │
│                (so req.user exists)                        │
│                                                            │
│  LOGIC:                                                    │
│  ──────                                                    │
│  IF req.user exists AND req.user.role === 'admin':         │
│     → Call next() ✅                                       │
│  ELSE:                                                     │
│     → Return 403 "Forbidden - Admin only"                  │
│                                                            │
│  💡 NOTE: You need to add a 'role' field to User model:    │
│     role: {                                                │
│       type: String,                                        │
│       enum: ['user', 'admin'],                             │
│       default: 'user'                                      │
│     }                                                      │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

### � Step 4.5: Creating Admin Middleware (Deep Dive)

> **Purpose:** Some actions should ONLY be done by special users called "admins" (like managers in a store). This section explains EXACTLY how to create this protection.

---

#### 🎭 Part A: Understanding Roles

Think of it like a movie theater:

```
┌────────────────────────────────────────────────────────────┐
│                    MOVIE THEATER ROLES                     │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  👤 REGULAR CUSTOMER (role: 'user')                        │
│  ─────────────────────────────────                         │
│  Can do:                                                   │
│  ✅ Buy tickets (rent movies)                              │
│  ✅ Watch movies                                           │
│  ✅ Return tickets                                         │
│  ✅ See their own purchase history                         │
│                                                            │
│  Cannot do:                                                │
│  ❌ See everyone's purchases                               │
│  ❌ Add new movies to the theater                          │
│  ❌ Delete movies                                          │
│  ❌ See all users                                          │
│                                                            │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  👑 MANAGER (role: 'admin')                                │
│  ─────────────────────────                                 │
│  Can do EVERYTHING a customer can, PLUS:                   │
│  ✅ See ALL rentals from ALL users                         │
│  ✅ Add new movies                                         │
│  ✅ Delete movies                                          │
│  ✅ See all registered users                               │
│  ✅ Manage the entire system                               │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

#### 📝 Part B: Updating the User Model

**File to modify:** `models/user.js`

**Current state of your User model:**

```
┌────────────────────────────────────────────────────────────┐
│                 CURRENT USER MODEL                         │
│                 (What you have now)                        │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  📌 name      → String, required                           │
│  📌 email     → String, required, unique                   │
│  📌 password  → String, required, minLength: 6             │
│                                                            │
│  ❌ NO WAY TO TELL WHO IS ADMIN!                           │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

**What we need to add:**

```
┌────────────────────────────────────────────────────────────┐
│                 UPDATED USER MODEL                         │
│                 (After your changes)                       │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  📌 name      → String, required                           │
│  📌 email     → String, required, unique                   │
│  📌 password  → String, required, minLength: 6             │
│                                                            │
│  🆕 role      → String                                     │
│                 Options: 'user' OR 'admin'                 │
│                 Default: 'user'                            │
│                                                            │
│  ✅ NOW WE CAN CHECK: Is this person an admin?             │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

**Step-by-step what to add:**

```
┌────────────────────────────────────────────────────────────┐
│           HOW TO ADD THE ROLE FIELD                        │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  Inside your userSchema, add this new field:               │
│                                                            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                                                      │  │
│  │  role: {                                             │  │
│  │      type: String,                                   │  │
│  │      enum: ['user', 'admin'],                        │  │
│  │      default: 'user'                                 │  │
│  │  }                                                   │  │
│  │                                                      │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                            │
│  EXPLANATION OF EACH PART:                                 │
│  ─────────────────────────                                 │
│                                                            │
│  type: String                                              │
│  └── The role is stored as text (words)                    │
│                                                            │
│  enum: ['user', 'admin']                                   │
│  └── ONLY these two values are allowed                     │
│  └── If someone tries to set role: 'superuser'             │
│      → MongoDB will REJECT it! ❌                          │
│  └── This protects against invalid roles                   │
│                                                            │
│  default: 'user'                                           │
│  └── When someone registers, they automatically            │
│      become a regular 'user'                               │
│  └── Nobody can register as admin through the API!         │
│  └── Admins must be set manually in the database           │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

**WHERE to add it in the schema:**

```
┌────────────────────────────────────────────────────────────┐
│              USER SCHEMA STRUCTURE                         │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  const userSchema = new mongoose.Schema({                  │
│                                                            │
│      name: {                                               │
│          type: String,                                     │
│          required: true,                                   │
│          trim: true,                                       │
│      },                                                    │
│                                                            │
│      email: {                                              │
│          type: String,                                     │
│          required: true,                                   │
│          unique: true,                                     │
│          trim: true,                                       │
│      },                                                    │
│                                                            │
│      password: {                                           │
│          type: String,                                     │
│          required: true,                                   │
│          minLength: 6,                                     │
│          maxLength: 512,                                   │
│          trim: true,                                       │
│      },                                                    │
│                                                            │
│      // 🆕 ADD THIS NEW FIELD HERE ⬇️                      │
│      role: {                                               │
│          type: String,                                     │
│          enum: ['user', 'admin'],                          │
│          default: 'user'                                   │
│      }                                                     │
│                                                            │
│  });                                                       │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

#### 🛡️ Part C: Creating the isAdmin Middleware

**File to modify:** `middlewares/auth.js`

**What is a middleware?** Think of it as a security checkpoint:

```
┌────────────────────────────────────────────────────────────┐
│                 MIDDLEWARE = CHECKPOINT                    │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  Imagine entering a VIP section of a concert:              │
│                                                            │
│     🚶 Person                                              │
│        │                                                   │
│        ▼                                                   │
│  ┌─────────────┐                                          │
│  │ CHECKPOINT 1│  "Do you have a ticket?"                 │
│  │  (protect)  │  └── If NO → "Go away!" ❌                │
│  └─────────────┘  └── If YES → Continue ✅                 │
│        │                                                   │
│        ▼                                                   │
│  ┌─────────────┐                                          │
│  │ CHECKPOINT 2│  "Is your ticket VIP?"                   │
│  │  (isAdmin)  │  └── If NO → "Regular area only!" ❌      │
│  └─────────────┘  └── If YES → Welcome to VIP! ✅          │
│        │                                                   │
│        ▼                                                   │
│  ┌─────────────┐                                          │
│  │  VIP ROOM   │  Only VIPs (admins) get here!            │
│  │ (Controller)│                                          │
│  └─────────────┘                                          │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

**The isAdmin middleware logic:**

```
┌────────────────────────────────────────────────────────────┐
│                   isAdmin MIDDLEWARE                       │
│              (The VIP Ticket Checker)                      │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  PREREQUISITES:                                            │
│  ──────────────                                            │
│  • Must run AFTER the protect middleware                   │
│  • protect middleware already verified the user            │
│  • protect middleware attached user to req.user            │
│                                                            │
│  WHAT isAdmin DOES:                                        │
│  ──────────────────                                        │
│                                                            │
│  Step 1: Check if req.user exists                          │
│          (Should always exist after protect)               │
│                                                            │
│  Step 2: Check if req.user.role === 'admin'                │
│                                                            │
│  Step 3: Make decision                                     │
│          └── If admin → call next() ✅                     │
│          └── If not   → return 403 Forbidden ❌            │
│                                                            │
│                                                            │
│  VISUAL FLOW:                                              │
│  ────────────                                              │
│                                                            │
│  req.user ──► [Has 'admin' role?]                          │
│                      │                                     │
│              ┌───────┴───────┐                             │
│              │               │                             │
│             YES              NO                            │
│              │               │                             │
│              ▼               ▼                             │
│          next() ✅      403 Error ❌                       │
│         (Continue)    "Admin only!"                        │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

**What to add to auth.js:**

```
┌────────────────────────────────────────────────────────────┐
│              auth.js FILE STRUCTURE                        │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  // Imports at the top                                     │
│  import jwt from 'jsonwebtoken';                           │
│  import User from '../models/user.js';                     │
│                                                            │
│  // ═══════════════════════════════════════════════════    │
│  // MIDDLEWARE 1: protect (already exists)                 │
│  // ═══════════════════════════════════════════════════    │
│  export const protect = async (req, res, next) => {        │
│      // ... your existing protect code ...                 │
│  };                                                        │
│                                                            │
│  // ═══════════════════════════════════════════════════    │
│  // 🆕 MIDDLEWARE 2: isAdmin (add this!)                   │
│  // ═══════════════════════════════════════════════════    │
│  export const isAdmin = (req, res, next) => {              │
│                                                            │
│      // Check if user exists and has admin role            │
│      if (req.user && req.user.role === 'admin') {          │
│          // User is admin! Let them through                │
│          next();                                           │
│      } else {                                              │
│          // User is NOT admin! Block them                  │
│          res.status(403).json({                            │
│              success: false,                               │
│              message: 'Access denied. Admin only! 👑'      │
│          });                                               │
│      }                                                     │
│                                                            │
│  };                                                        │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

**Understanding the 403 status code:**

```
┌────────────────────────────────────────────────────────────┐
│               HTTP STATUS CODES EXPLAINED                  │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  401 Unauthorized                                          │
│  ─────────────────                                         │
│  "WHO ARE YOU?"                                            │
│  └── User is not logged in                                 │
│  └── No token or invalid token                             │
│  └── Used by: protect middleware                           │
│                                                            │
│  403 Forbidden                                             │
│  ─────────────                                             │
│  "I KNOW WHO YOU ARE, BUT YOU CAN'T DO THIS!"              │
│  └── User IS logged in (we know who they are)              │
│  └── But they don't have PERMISSION                        │
│  └── Used by: isAdmin middleware                           │
│                                                            │
│  ANALOGY:                                                  │
│  ────────                                                  │
│  401 = "Show me your ID!" (no ID shown)                    │
│  403 = "I see your ID, but you're not on the VIP list"     │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

#### 🚀 Part D: Using the isAdmin Middleware in Routes

**How to apply middleware to routes:**

```
┌────────────────────────────────────────────────────────────┐
│              APPLYING MIDDLEWARE TO ROUTES                 │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  SYNTAX:                                                   │
│  ───────                                                   │
│  router.METHOD('/path', middleware1, middleware2, handler) │
│                                                            │
│  Middlewares run LEFT TO RIGHT, in order!                  │
│                                                            │
│                                                            │
│  EXAMPLE 1: Public route (no protection)                   │
│  ─────────────────────────────────────────                 │
│                                                            │
│  router.get('/movies', getMovies)                          │
│                  │          │                              │
│                  │          └── Controller (handles logic) │
│                  └── Anyone can access ✅                  │
│                                                            │
│                                                            │
│  EXAMPLE 2: Protected route (login required)               │
│  ───────────────────────────────────────────               │
│                                                            │
│  router.get('/rentals/me', protect, getMyRentals)          │
│                              │          │                  │
│                              │          └── Controller     │
│                              └── Must be logged in 🔐      │
│                                                            │
│                                                            │
│  EXAMPLE 3: Admin route (admin only)                       │
│  ───────────────────────────────────                       │
│                                                            │
│  router.get('/rentals', protect, isAdmin, getAllRentals)   │
│                           │        │           │           │
│                           │        │           └── Handler │
│                           │        └── Must be admin 👑    │
│                           └── Must be logged in first 🔐   │
│                                                            │
│  ⚠️ ORDER MATTERS!                                         │
│  protect MUST come before isAdmin                          │
│  (because isAdmin needs req.user from protect)             │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

**Visual flow of request through middlewares:**

```
┌────────────────────────────────────────────────────────────┐
│         REQUEST FLOW: GET /api/rentals (Admin Only)        │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  📨 Request arrives                                        │
│        │                                                   │
│        ▼                                                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                    PROTECT                           │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │                                                     │   │
│  │  Checks: Is there a valid JWT token?                │   │
│  │                                                     │   │
│  │  ❌ NO TOKEN  → 401 "Please log in"                 │   │
│  │  ❌ BAD TOKEN → 401 "Invalid token"                 │   │
│  │  ✅ GOOD TOKEN → Attach user to req, call next()   │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│        │                                                   │
│        │ (if passed)                                       │
│        ▼                                                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                    IS ADMIN                          │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │                                                     │   │
│  │  Checks: Is req.user.role === 'admin'?              │   │
│  │                                                     │   │
│  │  ❌ NOT ADMIN → 403 "Admin only!"                   │   │
│  │  ✅ IS ADMIN  → call next()                         │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│        │                                                   │
│        │ (if passed)                                       │
│        ▼                                                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                  CONTROLLER                          │   │
│  │               (getAllRentals)                        │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │                                                     │   │
│  │  Finally! The actual work happens here.             │   │
│  │  Fetches all rentals from database.                 │   │
│  │  Returns data to user.                              │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│        │                                                   │
│        ▼                                                   │
│  📤 Response sent to user                                  │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

#### 📋 Part E: Complete Routes File Example

**How your rentalRoutes.js should look:**

```
┌────────────────────────────────────────────────────────────┐
│              rentalRoutes.js STRUCTURE                     │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  // 1. IMPORTS                                             │
│  import express from 'express';                            │
│  import { protect, isAdmin } from '../middlewares/auth.js';│
│  import {                                                  │
│      rentMovie,                                            │
│      returnMovie,                                          │
│      getMyRentals,                                         │
│      getAllRentals                                         │
│  } from '../controllers/rentalController.js';              │
│                                                            │
│  // 2. CREATE ROUTER                                       │
│  const router = express.Router();                          │
│                                                            │
│  // 3. DEFINE ROUTES                                       │
│                                                            │
│  // 🔐 User routes (logged in users)                       │
│  router.post('/:movieId', protect, rentMovie);             │
│  router.put('/:rentalId/return', protect, returnMovie);    │
│  router.get('/me', protect, getMyRentals);                 │
│                                                            │
│  // 👑 Admin routes (admins only)                          │
│  router.get('/', protect, isAdmin, getAllRentals);         │
│                                                            │
│  // 4. EXPORT                                              │
│  export default router;                                    │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

#### 🔧 Part F: How to Make a User an Admin

**Since users register as 'user' by default, how do we create admins?**

```
┌────────────────────────────────────────────────────────────┐
│              MAKING A USER AN ADMIN                        │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  METHOD 1: Directly in MongoDB (Recommended for first      │
│            admin)                                          │
│  ─────────────────────────────────────────────────────     │
│                                                            │
│  Using MongoDB Compass (GUI):                              │
│  1. Open MongoDB Compass                                   │
│  2. Connect to your database                               │
│  3. Find the 'users' collection                            │
│  4. Find the user you want to make admin                   │
│  5. Click "Edit"                                           │
│  6. Change: role: "user" → role: "admin"                   │
│  7. Save                                                   │
│                                                            │
│  Using MongoDB Shell:                                      │
│  db.users.updateOne(                                       │
│      { email: "admin@example.com" },                       │
│      { $set: { role: "admin" } }                           │
│  )                                                         │
│                                                            │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  METHOD 2: Create an Admin-Only Route                      │
│  ─────────────────────────────────────                     │
│                                                            │
│  Create a special route that only existing admins can use  │
│  to promote other users to admin.                          │
│                                                            │
│  Route: PUT /api/users/:userId/make-admin                  │
│  Middleware: protect, isAdmin                              │
│  Purpose: Promote a user to admin                          │
│                                                            │
│  ⚠️ This requires at least ONE admin to exist first!       │
│     (Chicken and egg problem - use Method 1 first)         │
│                                                            │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  METHOD 3: Seeder Script                                   │
│  ────────────────────────                                  │
│                                                            │
│  Create a script that runs once to create an admin user:   │
│                                                            │
│  In your seeder.js or a new file:                          │
│  - Create a user with role: 'admin'                        │
│  - Run once during initial setup                           │
│  - Delete or secure the script after                       │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

#### ✅ Part G: Admin Middleware Checklist

```
┌────────────────────────────────────────────────────────────┐
│              ADMIN MIDDLEWARE CHECKLIST                    │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  □ STEP 1: Update User Model                               │
│    □ Open models/user.js                                   │
│    □ Add role field to schema:                             │
│      □ type: String                                        │
│      □ enum: ['user', 'admin']                             │
│      □ default: 'user'                                     │
│    □ Save the file                                         │
│                                                            │
│  □ STEP 2: Create isAdmin Middleware                       │
│    □ Open middlewares/auth.js                              │
│    □ Add isAdmin function                                  │
│    □ Check req.user.role === 'admin'                       │
│    □ Return 403 if not admin                               │
│    □ Call next() if admin                                  │
│    □ Export the function                                   │
│                                                            │
│  □ STEP 3: Apply to Routes                                 │
│    □ Import isAdmin in your routes file                    │
│    □ Add to admin-only routes                              │
│    □ Always put AFTER protect middleware                   │
│                                                            │
│  □ STEP 4: Create First Admin                              │
│    □ Register a normal user                                │
│    □ Use MongoDB Compass/Shell to set role to 'admin'      │
│    □ Test the admin routes                                 │
│                                                            │
│  □ STEP 5: Test                                            │
│    □ Try admin route as regular user → Should get 403      │
│    □ Try admin route as admin → Should work ✅             │
│    □ Try admin route without login → Should get 401        │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

### �🔗 Step 5: Connect Routes to Server

**File to modify:** `server.js`

```
┌────────────────────────────────────────────────────────────┐
│                    SERVER.JS UPDATES                       │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  WHAT TO ADD:                                              │
│  ────────────                                              │
│                                                            │
│  1. Import rental routes at the top:                       │
│     import rentalRoutes from './routes/rentalRoutes.js'    │
│                                                            │
│  2. Register routes (after other app.use statements):      │
│     app.use('/api/rentals', rentalRoutes)                  │
│                                                            │
│                                                            │
│  FINAL ROUTE STRUCTURE:                                    │
│  ──────────────────────                                    │
│                                                            │
│  /api/auth      → authRoutes     (login, register)         │
│  /api/movies    → movieRoutes    (CRUD movies)             │
│  /api/rentals   → rentalRoutes   (rent, return, list)      │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## 🎨 Frontend Implementation

### 📡 Step 6: API Service

> **Purpose:** The "messenger" that talks to the backend

**File to create:** `src/services/api.js`

```
┌────────────────────────────────────────────────────────────┐
│                      API SERVICE                           │
│                   (The Mail Carrier)                       │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  HELPER FUNCTION: getAuthHeaders()                         │
│  ─────────────────────────────────                         │
│  Purpose: Creates headers with auth token                  │
│                                                            │
│  Returns: {                                                │
│    'Content-Type': 'application/json',                     │
│    'Authorization': 'Bearer <token from localStorage>'     │
│  }                                                         │
│                                                            │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  MOVIE FUNCTIONS:                                          │
│  ────────────────                                          │
│                                                            │
│  getMovies()                                               │
│  └── GET /api/movies                                       │
│  └── Returns: List of all movies                           │
│                                                            │
│  getMovie(movieId)                                         │
│  └── GET /api/movies/:movieId                              │
│  └── Returns: Single movie details                         │
│                                                            │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  RENTAL FUNCTIONS:                                         │
│  ─────────────────                                         │
│                                                            │
│  rentMovie(movieId)                                        │
│  └── POST /api/rentals/:movieId                            │
│  └── Returns: New rental object                            │
│                                                            │
│  returnMovie(rentalId)                                     │
│  └── PUT /api/rentals/:rentalId/return                     │
│  └── Returns: Updated rental object                        │
│                                                            │
│  getMyRentals()                                            │
│  └── GET /api/rentals/me                                   │
│  └── Returns: Array of user's rentals                      │
│                                                            │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  AUTH FUNCTIONS:                                           │
│  ───────────────                                           │
│                                                            │
│  login(email, password)                                    │
│  └── POST /api/auth/login                                  │
│  └── Returns: { token, user }                              │
│                                                            │
│  register(name, email, password)                           │
│  └── POST /api/auth/register                               │
│  └── Returns: { token, user }                              │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

### 🎴 Step 7: MovieCard Component

> **Purpose:** Displays a single movie with a "Rent" button

**File to create:** `src/components/MovieCard.jsx`

```
┌────────────────────────────────────────────────────────────┐
│                     MOVIE CARD                             │
│                 (One Movie Display)                        │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  ┌─────────────────────────────┐                           │
│  │                             │                           │
│  │     [Movie Poster Image]    │                           │
│  │                             │                           │
│  ├─────────────────────────────┤                           │
│  │  Title: Inception           │                           │
│  │  Year: 2010                 │                           │
│  │  Genre: Sci-Fi              │                           │
│  │  💰 $4.99 / 7 days          │                           │
│  ├─────────────────────────────┤                           │
│  │     [🎬 Rent Now Button]    │                           │
│  ├─────────────────────────────┤                           │
│  │  (Success/Error Message)    │                           │
│  └─────────────────────────────┘                           │
│                                                            │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  PROPS (inputs from parent):                               │
│  ───────────────────────────                               │
│  • movie         → Movie object with all details           │
│  • onRentSuccess → Callback function when rental succeeds  │
│                                                            │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  STATE (internal data):                                    │
│  ──────────────────────                                    │
│  • isLoading → Boolean, shows loading state                │
│  • message   → String, success/error message               │
│                                                            │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  handleRent FUNCTION:                                      │
│  ────────────────────                                      │
│  1. Check if token exists in localStorage                  │
│     └── If not → Show "Please log in" message              │
│  2. Set isLoading = true                                   │
│  3. Call rentMovie(movie._id) from API                     │
│  4. If success:                                            │
│     └── Show success message                               │
│     └── Call onRentSuccess callback                        │
│  5. If failure:                                            │
│     └── Show error message                                 │
│  6. Set isLoading = false                                  │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

### 📋 Step 8: MovieList Component

> **Purpose:** Displays grid of all available movies

**File to create:** `src/components/MovieList.jsx`

```
┌────────────────────────────────────────────────────────────┐
│                     MOVIE LIST                             │
│                 (All Movies Grid)                          │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │               🎬 Available Movies                    │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                            │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│  │ MovieCard│ │ MovieCard│ │ MovieCard│ │ MovieCard│       │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘       │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│  │ MovieCard│ │ MovieCard│ │ MovieCard│ │ MovieCard│       │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘       │
│                                                            │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  STATE:                                                    │
│  ──────                                                    │
│  • movies    → Array of movie objects                      │
│  • isLoading → Boolean                                     │
│  • error     → String                                      │
│                                                            │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  useEffect (on mount):                                     │
│  ────────────────────                                      │
│  1. Call getMovies() from API                              │
│  2. Store result in movies state                           │
│  3. Handle errors                                          │
│  4. Set isLoading = false                                  │
│                                                            │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  RENDER LOGIC:                                             │
│  ─────────────                                             │
│  • If loading → Show spinner                               │
│  • If error   → Show error message                         │
│  • If empty   → Show "No movies available"                 │
│  • Otherwise  → Map movies to MovieCard components         │
│                                                            │
│  💡 TIP: Use movie._id as the key prop                     │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

### 📀 Step 9: MyRentals Component

> **Purpose:** Shows user's rental history with return functionality

**File to create:** `src/components/MyRentals.jsx`

```
┌────────────────────────────────────────────────────────────┐
│                      MY RENTALS                            │
│               (User's Rental History)                      │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                  📀 My Rentals                       │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  🎬 Currently Renting (2)                           │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │ ┌────┐ Inception                                    │   │
│  │ │IMG │ Rented: Jan 1, 2026                          │   │
│  │ └────┘ Due: Jan 8, 2026         [📤 Return Movie]   │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │ ┌────┐ The Matrix                                   │   │
│  │ │IMG │ Rented: Jan 3, 2026                          │   │
│  │ └────┘ Due: Jan 10, 2026        [📤 Return Movie]   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ✅ Previously Rented (3)                           │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │ ┌────┐ Avatar                                       │   │
│  │ │IMG │ Rented: Dec 1, 2025                          │   │
│  │ └────┘ Returned: Dec 5, 2025                        │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                            │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  STATE:                                                    │
│  ──────                                                    │
│  • rentals   → Array of rental objects                     │
│  • isLoading → Boolean                                     │
│  • error     → String                                      │
│                                                            │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  HELPER: Separate rentals by status                        │
│  ──────────────────────────────────                        │
│  • activeRentals   = rentals.filter(r => r.status === 'active')    │
│  • returnedRentals = rentals.filter(r => r.status === 'returned')  │
│                                                            │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  handleReturn FUNCTION:                                    │
│  ──────────────────────                                    │
│  1. Call returnMovie(rentalId) from API                    │
│  2. If success:                                            │
│     └── Update rental in state (status → 'returned')       │
│  3. If failure:                                            │
│     └── Show alert with error                              │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

### 🎯 Step 10: Update App.jsx

> **Purpose:** Main component that ties everything together

**File to modify:** `src/App.jsx`

```
┌────────────────────────────────────────────────────────────┐
│                        APP.JSX                             │
│                   (Main Container)                         │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  🎬 Movie Rental    [Movies] [My Rentals]   [Login] │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │              {Current Page Content}                 │   │
│  │                                                     │   │
│  │    • movies  → <MovieList />                        │   │
│  │    • rentals → <MyRentals />                        │   │
│  │    • login   → <LoginPrompt />                      │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │           🎬 Movie Rental App © 2026                │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                            │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  STATE:                                                    │
│  ──────                                                    │
│  • currentPage → String ('movies', 'rentals', 'login')     │
│  • isLoggedIn  → Boolean                                   │
│  • user        → Object (name, email, etc.)                │
│                                                            │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  useEffect (check login on mount):                         │
│  ─────────────────────────────────                         │
│  1. Get token from localStorage                            │
│  2. Get user from localStorage                             │
│  3. If both exist → setIsLoggedIn(true), setUser(...)      │
│                                                            │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  handleLogout FUNCTION:                                    │
│  ──────────────────────                                    │
│  1. Remove 'token' from localStorage                       │
│  2. Remove 'user' from localStorage                        │
│  3. setIsLoggedIn(false)                                   │
│  4. setUser(null)                                          │
│  5. Navigate to movies page                                │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow Explained

### The Complete Picture

```
                              ┌─────────────────────────────────┐
                              │        MONGODB DATABASE         │
                              │                                 │
                              │  ┌─────────┐  ┌─────────┐       │
                              │  │  Users  │  │ Movies  │       │
                              │  └─────────┘  └─────────┘       │
                              │         ┌─────────┐             │
                              │         │ Rentals │             │
                              │         └─────────┘             │
                              └───────────────▲─────────────────┘
                                              │
                                              │ Mongoose ODM
                                              │
┌──────────────────────────────────────────────────────────────────────────────┐
│                                BACKEND (Node.js + Express)                    │
│                                                                              │
│  ┌──────────────┐    ┌────────────────┐    ┌────────────────┐                │
│  │   ROUTES     │ -> │  MIDDLEWARE    │ -> │  CONTROLLERS   │                │
│  │              │    │                │    │                │                │
│  │ /api/rentals │    │ protect()      │    │ rentMovie()    │                │
│  │ /api/movies  │    │ isAdmin()      │    │ returnMovie()  │                │
│  │ /api/auth    │    │                │    │ getMyRentals() │                │
│  └──────────────┘    └────────────────┘    └────────────────┘                │
│                                                                              │
└──────────────────────────────────────────────▲───────────────────────────────┘
                                               │
                                               │ HTTP (JSON)
                                               │ Port 5000
                                               │
┌──────────────────────────────────────────────┴───────────────────────────────┐
│                                FRONTEND (React)                               │
│                                                                              │
│  ┌──────────────┐    ┌────────────────┐    ┌────────────────┐                │
│  │   App.jsx    │ -> │   COMPONENTS   │ -> │   API SERVICE  │                │
│  │   (Router)   │    │                │    │                │                │
│  │              │    │ MovieList      │    │ rentMovie()    │                │
│  │              │    │ MovieCard      │    │ returnMovie()  │                │
│  │              │    │ MyRentals      │    │ getMyRentals() │                │
│  └──────────────┘    └────────────────┘    └────────────────┘                │
│                                                                              │
└──────────────────────────────────────────────▲───────────────────────────────┘
                                               │
                                               │ User Interactions
                                               │
                                        ┌──────┴──────┐
                                        │    USER     │
                                        │   BROWSER   │
                                        └─────────────┘
```

---

## ✅ Step-by-Step Implementation Checklist

### Backend Checklist

```
□ STEP 1: Create Rental Model
  □ Create file: models/rental.js
  □ Define schema with all required fields
  □ Add references to User and Movie
  □ Set default values for dates and status
  □ Export the model

□ STEP 2: Update User Model (if needed)
  □ Add 'role' field for admin functionality
  □ Values: 'user' (default), 'admin'

□ STEP 3: Update Auth Middleware
  □ Update file: middlewares/auth.js
  □ Implement protect() function
  □ Implement isAdmin() function
  □ Export both functions

□ STEP 4: Create Rental Controller
  □ Create file: controllers/rentalController.js
  □ Implement rentMovie()
  □ Implement returnMovie()
  □ Implement getMyRentals()
  □ Implement getAllRentals()
  □ Export all functions

□ STEP 5: Create Rental Routes
  □ Create file: routes/rentalRoutes.js
  □ Define POST /:movieId route
  □ Define PUT /:rentalId/return route
  □ Define GET /me route
  □ Define GET / route (admin)
  □ Apply middleware to routes
  □ Export router

□ STEP 6: Update Server
  □ Import rental routes in server.js
  □ Register routes with app.use()
  □ Test with Postman/Thunder Client
```

### Frontend Checklist

```
□ STEP 7: Create API Service
  □ Create file: src/services/api.js
  □ Implement getAuthHeaders()
  □ Implement movie functions
  □ Implement rental functions
  □ Implement auth functions

□ STEP 8: Create MovieCard Component
  □ Create file: src/components/MovieCard.jsx
  □ Display movie information
  □ Add Rent button
  □ Handle rent action
  □ Show loading/messages

□ STEP 9: Create MovieList Component
  □ Create file: src/components/MovieList.jsx
  □ Fetch movies on mount
  □ Display grid of MovieCards
  □ Handle loading/error states

□ STEP 10: Create MyRentals Component
  □ Create file: src/components/MyRentals.jsx
  □ Fetch user's rentals
  □ Separate active/returned rentals
  □ Add return functionality
  □ Display rental details

□ STEP 11: Update App.jsx
  □ Add navigation state
  □ Check login status on mount
  □ Implement navigation
  □ Add logout functionality
  □ Render correct components

□ STEP 12: Add Styles
  □ Update App.css with all styles
  □ Style navbar, cards, buttons
  □ Add responsive design
```

---

## 🧪 Testing Your Application

### Backend Testing (Using Postman or Thunder Client)

```
┌────────────────────────────────────────────────────────────┐
│                    TEST SEQUENCE                           │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  1. REGISTER A USER                                        │
│     POST http://localhost:5000/api/auth/register           │
│     Body: { "name": "Test", "email": "...", "password": "..."}    │
│     Expected: 201, returns token                           │
│                                                            │
│  2. LOGIN                                                  │
│     POST http://localhost:5000/api/auth/login              │
│     Body: { "email": "...", "password": "..." }            │
│     Expected: 200, returns token                           │
│     ⚠️ Save the token!                                     │
│                                                            │
│  3. RENT A MOVIE                                           │
│     POST http://localhost:5000/api/rentals/:movieId        │
│     Headers: Authorization: Bearer <token>                 │
│     Expected: 201, returns rental object                   │
│                                                            │
│  4. GET MY RENTALS                                         │
│     GET http://localhost:5000/api/rentals/me               │
│     Headers: Authorization: Bearer <token>                 │
│     Expected: 200, returns array of rentals                │
│                                                            │
│  5. RETURN A MOVIE                                         │
│     PUT http://localhost:5000/api/rentals/:rentalId/return │
│     Headers: Authorization: Bearer <token>                 │
│     Expected: 200, rental status = 'returned'              │
│                                                            │
│  6. TRY TO RENT SAME MOVIE AGAIN                           │
│     POST http://localhost:5000/api/rentals/:movieId        │
│     Expected: 400, "Already rented" error                  │
│                                                            │
│  7. TRY WITHOUT TOKEN                                      │
│     POST http://localhost:5000/api/rentals/:movieId        │
│     Expected: 401, "Please log in" error                   │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## ⚠️ Common Mistakes to Avoid

### Backend Mistakes

| Mistake                 | Problem                            | Solution                                    |
| ----------------------- | ---------------------------------- | ------------------------------------------- |
| Forgetting `await`      | Database operations won't complete | Always use `await` with async operations    |
| Not validating ObjectId | Crash on invalid ID                | Use `mongoose.Types.ObjectId.isValid()`     |
| Missing error handling  | Server crashes on errors           | Always use try/catch                        |
| Not checking ownership  | Users can return others' rentals   | Compare `rental.user.toString() === userId` |
| Forgetting to export    | Functions unavailable              | Add `export { ... }` or `export default`    |

### Frontend Mistakes

| Mistake                  | Problem                         | Solution                                       |
| ------------------------ | ------------------------------- | ---------------------------------------------- |
| Missing `key` prop       | React warning, poor performance | Use `movie._id` or `rental._id` as key         |
| Not handling loading     | Blank screen                    | Add `isLoading` state with spinner             |
| Token not sent           | 401 errors                      | Check `getAuthHeaders()` function              |
| Not parsing JSON         | User object is string           | Use `JSON.parse(localStorage.getItem('user'))` |
| Missing dependency array | Infinite loops                  | Add `[]` to useEffect for mount-only           |

---

## 🎉 You Did It!

If you followed all the steps, you now have a working movie rental system!

```
  🎬 ════════════════════════════════════════════════ 🎬
  ║                                                    ║
  ║   CONGRATULATIONS!                                 ║
  ║                                                    ║
  ║   You've learned:                                  ║
  ║   ✅ MongoDB Models with relationships             ║
  ║   ✅ Express Controllers and Routes                ║
  ║   ✅ JWT Authentication Middleware                 ║
  ║   ✅ React Components and State                    ║
  ║   ✅ API Integration                               ║
  ║   ✅ Full-Stack Data Flow                          ║
  ║                                                    ║
  ║   Keep building! 🚀                                ║
  ║                                                    ║
  🎬 ════════════════════════════════════════════════ 🎬
```

---

**Happy Coding! 🍿**
