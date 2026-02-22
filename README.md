# GroMart MVP (Groceries + Nuts & Spices)

Production-oriented startup MVP for an Amazon/Walmart-style segment marketplace focused on:
- Groceries
- Nuts & Spices

Tech stack:
- **Frontend:** React + Vite
- **Backend:** Node.js + Express + TypeScript
- **Database:** SQLite (Prisma ORM)
- **Payments:** Stripe Payment Intents (with mock fallback)
- **Auth:** JWT-based authentication + role-based authorization
- **Security:** Helmet, CORS allowlist, rate limiting, HPP, request validation

## Repo structure

```txt
.
├── backend
│   ├── prisma
│   │   ├── schema.prisma
│   │   └── seed.ts
│   ├── src
│   │   ├── app.ts
│   │   ├── server.ts
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   └── .env.example
├── frontend
│   ├── src
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── routes/
│   │   └── styles/
│   └── .env.example
├── docker-compose.yml
└── README.md
```

## Local setup

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Set a secure value for `JWT_SECRET` in `backend/.env`.

Optional: set `STRIPE_SECRET_KEY` for live Stripe integration.

### 3) Initialize database + seed demo data

```bash
npm run prisma:generate --workspace backend
npm run prisma:migrate --workspace backend -- --name init
npm run prisma:seed --workspace backend
```

### 4) Start the app

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:4000

## Demo credentials

- Admin email: `admin@gromart.com`
- Admin password: `Admin@1234`

## Security controls included

- Secure HTTP headers (`helmet`)
- Rate limiting (`express-rate-limit`)
- HTTP Parameter Pollution protection (`hpp`)
- Input validation (`express-validator`)
- Password hashing (`bcryptjs`)
- JWT auth with role checks

## Scalability approach

1. Keep backend stateless (JWT + horizontal scaling friendly)
2. Move SQLite to Postgres/MySQL in production (Prisma makes migration easy)
3. Introduce Redis for caching sessions/catalog/search
4. Add queue workers for async tasks (emails, inventory sync)
5. Put frontend behind CDN and backend behind load balancer/API gateway

## Deployment notes

- Dockerfiles for frontend/backend are included.
- Use `docker compose up --build` for containerized local run.
- Add Stripe webhooks and idempotency keys before real-money launch.
- Add observability (OpenTelemetry + logs/metrics) before scale.
