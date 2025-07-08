# 🏨 Airbnb Hotel Service API

A production-ready **CRUD API** for managing hotel listings in an Airbnb-like application. Built with **TypeScript**, **Express**, **MySQL**, and **Sequelize**, this service is part of a scalable microservices-based architecture.

---

## 🚀 Features

* ✅ Built with **TypeScript**
* ✅ RESTful APIs with full **CRUD** support for hotels
* ✅ **Soft delete (tombstone pattern)** using Sequelize’s .
* ✅ Centralized **error-handling middleware**
* ✅ Request validation using **Zod**
* ✅ **Winston** logger with Daily Rotate and correlation ID support
* ✅ Clean and scalable project architecture
* ✅ Follows production-level best practices

---

## 📁 Folder Structure

```text
.
├── src
│   ├── config           # Configuration (env, logger)
│   ├── controllers      # Route handlers
│   ├── db               # Sequelize models, migrations, seeders
│   ├── dto              # DTO definitions for strong typing
│   ├── middlewares      # Error handling, logging, validation
│   ├── repositories     # Database interaction layer
│   ├── services         # Business logic for hotel operations
│   ├── routers          # API routes
│   ├── utils            # Helper functions and error classes
│   ├── validators       # Zod validation schemas
│   └── server.ts        # App entrypoint
├── .env                 # Environment variables
├── tsconfig.json        # TypeScript compiler config
├── package.json         # Project metadata and scripts
└── README.md
```

---

## 🧪 Getting Started

### 1. Clone the project

```bash
git clone https://github.com/narendrajethi220/Aribnb-Node.git
```

### 2. Navigate to the project directory

```bash
cd Aribnb-Node
cd HotelService
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the root with the following variables:

```env
PORT=3030
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=airbnb_dev
DB_HOST=localhost
```

### 5. Run the development server

```bash
npm run dev
```

Or start in production mode:

```bash
npm start
```

---

## 📦 Scripts

| Command           | Description                                  |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Run the app in development with nodemon      |
| `npm start`       | Run the app using ts-node in production mode |
| `npm run migrate` | Run Sequelize migrations                     |
| `npm run rollback`| Run to rollback migrations                   |
| `npm run seed`    | Seed the database with mock data (if any)    |

---

## 🔧 Tech Stack

* **Node.js + Express** – API layer
* **TypeScript** – Strong typing and better DX
* **Sequelize** – ORM for MySQL with soft delete support
* **MySQL** – Relational database
* **Zod** – Schema validation for request data
* **Winston** – Logging with timestamps and daily log rotation
* **dotenv** – Secure environment configuration

---

## ✍️ Author

Developed by [Narendra Singh Jethi](https://github.com/narendrajethi220) with 💓 as part of the **Lambda 4.0 Advance Backend Developer Bootcamp**

---

## 🛡️ License

ISC

---
