# Nalanda Library Management System

A backend API for managing a digital library platform with support for users, books, and borrowing history. Built using **Node.js**, **Express**, **MongoDB (Mongoose)**, and **TypeScript**.

---

## Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB** with **Mongoose**
- JWT Authentication
- Role-Based Access Control (RBAC)

---

## Project Structure

nalanda/
├── src/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middlewares/
│ ├── utils/
│ └── main.ts
├── dist/
├── package.json
└── tsconfig.json

## Scripts - to run server

```json
"scripts": {
  "build": "npx tsc",
  "start": "node dist/main.ts",
  "dev": "nodemon --exec ts-node src/main.ts",
  "test": "echo \"Error: no test specified\" && exit 1"
}

```

# npm run dev –

Start development server with hot-reload

# npm run build –

Compile TypeScript to JavaScript

# npm start –

Run production build

## Features

# User Management

User registration & login
Role-based access: Admin, Member
JWT authentication with encryption
Password hashing with bcrypt

# Book Management

Add/update/delete books (Admin only)
List and filter books (all users)
Pagination and filtering by genre/author

# Borrowing System

Borrow books (Members only, if available)
Return books (partial or full return supported)
View personal borrowing history

# Reports & Aggregations

Most borrowed books
Most active members
Book availability summary

## Setup Instructions:

1. Clone the repo:
   git clone https://github.com/zubairsyed/nalanda.git
   cd nalanda

2. Install dependencies:
   npm install

3. configure environment variables:
   MONGO_URI="mongodb://localhost:27017/"
   PORT = 7000
   JWT_SECRET = "n@laNda"

4. Run in development:
   npm run dev

5. Build and run
   npm run build
   npm start

# API-END_POINTS - POSTMAN COLLECTION
