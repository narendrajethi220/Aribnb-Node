# express-ts-prod-boilerplate

A clean, extensible Express.js server built with TypeScript. This boilerplate is ideal for developers looking to start fast with a well-structured backend foundation.

---

## 🚀 Features

- ✅ Built with **TypeScript**
- ✅ Uses **Express v5** for routing and middleware
- ✅ Centralized **error-handling middleware**
- ✅ Input validation using **Zod**
- ✅ Environment configuration using **dotenv**
- ✅ Modular folder structure for scalability
- ✅ Integrated **Winston** logger for structured and timestamped logging

---

## 📁 Folder Structure

```text
.
.
├── src
│   ├── config          # Configuration utilities (env setup,logger configuration)
│   ├── controllers      # Business logic
│   ├── middlewares      # Error handlers, validators
│   ├── routes           # API route definitions
│   ├── utils            # Reusable utility functions (e.g., AppError,helpers)
│   ├── validators       # Zod schemas for validation
│   └── server.ts        # App entrypoint
├── .env                 # Environment variables (not committed)
├── tsconfig.json        # TypeScript configuration
├── package.json         # NPM scripts and dependencies
└── README.md
```

## Steps to setup the starter template

1. Clone the project

```
git clone https://github.com/narendrajethi220/express-ts-prod-boilerplate.git <Project_Name>
```

2. Move in to the folder structure

```
cd <Project_Name>
```

3. Install npm dependecies

```
npm i
```

4. Create a new .env file in the root directory and add the `PORT` env variable.

5. 📦 Scripts

| Command       | Description                              |
| ------------- | ---------------------------------------- |
| `npm run dev` | Run the app in development using nodemon |
| `npm start`   | Start the server with ts-node            |

---

## 🔧 Tech Stack

- **Express v5** – Next-generation routing and middleware
- **TypeScript** – Static type-checking
- **Zod** – Type-safe runtime validation
- **Dotenv** – Environment variable management
- **Winston** – Structured logging with timestamps and levels

---

## 🧪 Getting Started

```bash
https://github.com/narendrajethi220/express-ts-prod-boilerplate.git
cd express-ts-prod-boilerplate
npm install
cp .env.example .env
npm run dev
```

---

## ✍️ Author

Developed by [Narendra Singh Jethi](https://github.com/narendrajethi220) as a part of Lambda 4.0 Backend Developer Bootcamp

---

## 🛡️ License

ISC
