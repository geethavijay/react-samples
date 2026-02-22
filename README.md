# GroMart MVP (Next.js SSR + Node.js + MongoDB + Razorpay)

This repo is reconfigured to your requested stack:
- **Frontend:** Next.js (React) with SSR (`getServerSideProps`)
- **Backend:** Node.js + Express + TypeScript
- **DB:** MongoDB (Mongoose)
- **Payments:** Razorpay (mock fallback when keys are not set)
- **Auth:** JWT + role-based authorization
- **Security:** helmet, cors allowlist, hpp, rate limiting, request validation

## What is Prisma? Why replaced?
Prisma is an ORM toolkit for schema/migrations and typed DB access. You asked for an alternative, so this implementation now uses **MongoDB + Mongoose** directly.

## Repo structure
```txt
.
├── backend/
│   ├── src/
│   │   ├── app.ts
│   │   ├── server.ts
│   │   ├── config/env.ts
│   │   ├── lib/mongo.ts
│   │   ├── models/{User,Product,Order}.ts
│   │   ├── controllers/{auth,product,order}.controller.ts
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── services/payment.service.ts
│   │   ├── scripts/seed.ts
│   │   └── utils/jwt.ts
│   ├── .env.example
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── pages/{_app,index,login,orders}.js
│   ├── components/Layout.js
│   ├── styles/globals.css
│   ├── lib/api.js
│   ├── next.config.mjs
│   ├── .env.example
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
└── package.json
```

## Local run
```bash
npm install
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
npm run db:seed --workspace backend
npm run dev
```

- Frontend (SSR): http://localhost:3000
- Backend API: http://localhost:4000

## Backend env vars
- `MONGODB_URI`
- `JWT_SECRET`
- `FRONTEND_URL`
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`

## Docker
```bash
docker compose up --build
```
This starts MongoDB, backend, and Next.js frontend.
