# ACCP Conference Monorepo

ระบบจัดการงานประชุมวิชาการ ACCP แบบ Monorepo ประกอบด้วย User-facing website, Backoffice admin panel, และ API

## 📁 โครงสร้างโปรเจค

```
monorepo/
├── apps/
│   ├── web/              # User-facing website (Next.js 14)
│   ├── backoffice/       # Admin panel (Next.js 16)
│   └── api/              # REST API (Fastify)
├── packages/
│   ├── database/         # Shared database schema (Drizzle ORM)
│   └── types/            # Shared TypeScript types
├── docker-compose.yml    # PostgreSQL
├── turbo.json            # Turborepo configuration
└── package.json          # Root workspace
```

## 🛠️ Tech Stack

| Layer                     | Technology                            |
| ------------------------- | ------------------------------------- |
| **Frontend (Web)**        | Next.js 14, React 18, SCSS, next-intl |
| **Frontend (Backoffice)** | Next.js 16, React 19, TailwindCSS 4   |
| **API**                   | Fastify 5, Zod validation             |
| **Database**              | PostgreSQL 16, Drizzle ORM            |
| **Build Tool**            | Turborepo                             |
| **Package Manager**       | npm workspaces                        |

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Docker & Docker Compose
- npm 10+

### 1. Clone และ Install dependencies

```bash
cd C:\Users\Nattakarn\Desktop\accp\monorepo
npm install
```

### 2. Setup Environment Variables

```bash
# Copy example env file
cp .env.example .env
```

### 3. Start Database (Docker)

```bash
# Start PostgreSQL
docker compose up -d

# ตรวจสอบ status
docker compose ps
```

### 4. Push Database Schema

```bash
npm run db:push
```

### 5. Start Development Servers

```bash
# รันทุก apps พร้อมกัน
npm run dev

# หรือรันแยก
npm run dev:web          # localhost:3000
npm run dev:backoffice   # localhost:3001
npm run dev:api          # localhost:3002
```

## 📦 Available Scripts

### Root Level

| Command                  | Description                        |
| ------------------------ | ---------------------------------- |
| `npm run dev`            | รัน apps ทั้งหมดพร้อมกัน           |
| `npm run build`          | Build apps ทั้งหมด                 |
| `npm run lint`           | Lint apps ทั้งหมด                  |
| `npm run dev:web`        | รัน web app (port 3000)            |
| `npm run dev:backoffice` | รัน backoffice (port 3001)         |
| `npm run dev:api`        | รัน API (port 3002)                |
| `npm run db:generate`    | Generate database migrations       |
| `npm run db:push`        | Push schema to database            |
| `npm run db:studio`      | เปิด Drizzle Studio (Database GUI) |

## 🐳 Docker Services

| Service        | URL            | Credentials                              |
| -------------- | -------------- | ---------------------------------------- |
| **PostgreSQL** | localhost:5432 | user: `accp_user`, pass: `accp_password` |

### Docker Commands

```bash
# Start services
docker compose up -d

# Stop services
docker compose down

# View logs
docker compose logs -f postgres

# Reset database (ลบข้อมูลทั้งหมด)
docker compose down -v
docker compose up -d
```

## 📂 Packages

### @accp/database

Shared database schema และ Drizzle ORM client

```typescript
// Usage in apps
import { db } from "@accp/database";
import { users } from "@accp/database/schema";
```

### @accp/types

Shared TypeScript types

```typescript
// Usage in apps
import { ApiResponse, PaginatedResponse } from "@accp/types";
```

## 🔧 Development Workflow

### Adding a new database table

1. แก้ไข `packages/database/src/schema.ts`
2. รัน `npm run db:push` เพื่อ sync กับ database
3. Types จะ auto-generate จาก schema

### Adding shared types

1. แก้ไข `packages/types/src/index.ts`
2. Import ใน apps ผ่าน `import { ... } from '@accp/types'`

## 📝 Environment Variables

```env
# Database
DATABASE_URL=postgresql://accp_user:accp_password@localhost:5432/accp_db
```

## 👥 Team Development

ทุกคนในทีมต้อง:

1. ติดตั้ง Docker Desktop
2. รัน `docker compose up -d` เพื่อ start local database
3. รัน `npm install` เพื่อติดตั้ง dependencies
4. รัน `npm run db:push` เพื่อ sync schema

## 📄 License

Private - ACCP Conference System
