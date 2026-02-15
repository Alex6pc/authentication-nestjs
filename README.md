# Nuxt3 / Nest / GraphQL Authentication

Full-stack auth app with Nuxt 3, NestJS, GraphQL, http-only cookies, MySQL, and Prisma.

## Prerequisites

- Node.js 20+
- MySQL (with `nest-nuxt-auth` database)
- WSL (for running commands)

## Quick Start

```bash
# In WSL
make install          # Install all dependencies + generate Prisma client
make db-migrate       # Run database migrations
make dev              # Start backend + frontend together
```

That's it. Backend runs at http://localhost:3002/graphql, frontend at http://localhost:3000.

## Makefile Commands

| Command | Description |
|---------|-------------|
| `make install` | Install backend and frontend dependencies, generate Prisma client |
| `make dev` | Start both backend and frontend (kills stale processes first) |
| `make backend` | Start backend only (http://localhost:3002) |
| `make frontend` | Start frontend only (http://localhost:3000) |
| `make codegen` | Generate GraphQL types (requires backend running) |
| `make db-generate` | Regenerate Prisma client |
| `make db-migrate` | Run Prisma database migrations |
| `make status` | Show which processes are running on dev ports |
| `make kill` | Kill any processes on ports 3000 and 3002 |
| `make clean` | Remove build artifacts (dist, .nuxt, .output, caches) |

## Manual Setup

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env   # Edit DATABASE_URL if needed
npx prisma generate
npx prisma migrate dev --name user-init
npm run start:dev
```

Backend runs at http://localhost:3002, GraphQL Playground at http://localhost:3002/graphql

### 2. Frontend

```bash
cd frontend
npm install
npm run codegen       # Requires backend running
npm run dev
```

Frontend runs at http://localhost:3000

## MySQL Setup

```sql
CREATE DATABASE IF NOT EXISTS `nest-nuxt-auth`;
CREATE USER IF NOT EXISTS 'nest-nuxt-auth'@'localhost' IDENTIFIED BY 'randompassword';
GRANT ALL PRIVILEGES ON `nest-nuxt-auth`.* TO 'nest-nuxt-auth'@'localhost';
FLUSH PRIVILEGES;
```

## Stack

- **Backend**: NestJS 11, Apollo Server (GraphQL), Prisma 5, JWT, bcrypt
- **Frontend**: Nuxt 3, Vue 3, Vuetify 4, Villus (GraphQL client), Pinia
- **Database**: MySQL
- **Auth**: HTTP-only cookie JWT, password hashing with bcrypt
