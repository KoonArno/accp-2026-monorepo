# ACCP Conference Monorepo

ระบบจัดการงานประชุมวิชาการ ACCP แบบ Monorepo ประกอบด้วย User-facing website, Backoffice admin panel, และ API

## 📁 โครงสร้างโปรเจค

```
monorepo/
├── apps/
│   ├── web/              # User-facing website (Next.js 14) - Port 3000
│   ├── backoffice/       # Admin panel (Next.js 16) - Port 3001
│   └── api/              # REST API (Fastify) - Port 3002
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

## 🚀 Quick Start (สำหรับเครื่องใหม่)

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

**⚠️ สิ่งที่ต้องตรวจสอบใน .env:**

1. **DATABASE_URL**: ตรวจสอบว่าเป็น `postgresql://accp_user:accp_password@localhost:5432/accp_db`
2. **JWT_SECRET**: สร้างด้วยคำสั่ง `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` และนำไปใส่ในไฟล์
3. **Google Drive (Optional)**: ถ้าต้องการระบบอัปโหลดไฟล์ ต้องใส่ `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REFRESH_TOKEN`, `GOOGLE_DRIVE_FOLDER_ID`

### 3. Start Database (Docker)

```bash
# Start PostgreSQL
docker compose up -d

# ตรวจสอบ status
docker compose ps
```

### 4. Setup Database & Seed Data

```bash
# Push schema tables ไปยัง database
npm run db:push

# สร้างข้อมูลเริ่มต้น (Admin User)
npm run db:seed
```

> **Note:** คำสั่ง `npm run db:seed` จะสร้าง Admin Default ให้โดยอัตโนมัติหากยังไม่มี

### 5. Start Development Servers

```bash
# รันทุก apps พร้อมกัน
npm run dev

# หรือรันแยก
npm run dev:web          # localhost:3000
npm run dev:backoffice   # localhost:3001
npm run dev:api          # localhost:3002
```

## 🔑 Default Credentials

### Backoffice Admin (สำหรับ Login ครั้งแรก)

- **URL:** [http://localhost:3001/login](http://localhost:3001/login)
- **Email:** `admin@accp.org`
- **Password:** `admin123`

## 📦 Available Scripts

### Root Level

| Command                  | Description                                |
| ------------------------ | ------------------------------------------ |
| `npm run dev`            | รัน apps ทั้งหมดพร้อมกัน                   |
| `npm run build`          | Build apps ทั้งหมด                         |
| `npm run lint`           | Lint apps ทั้งหมด                          |
| `npm run dev:web`        | รัน web app (port 3000)                    |
| `npm run dev:backoffice` | รัน backoffice (port 3001)                 |
| `npm run dev:api`        | รัน API (port 3002)                        |
| `npm run db:generate`    | Generate database migrations               |
| `npm run db:push`        | Push schema to database                    |
| `npm run db:studio`      | เปิด Drizzle Studio (Database GUI)         |
| `npm run db:seed`        | **[NEW]** สร้างข้อมูลเริ่มต้น (Admin User) |

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

# Reset database (ลบข้อมูลทั้งหมด และเริ่มใหม่)
docker compose down -v
docker compose up -d
npm run db:push
npm run db:seed
```

## 📂 Packages

### @accp/database

Shared database schema และ Drizzle ORM client

```typescript
// Usage in apps
import { db } from "@accp/database";
import { users, backofficeUsers } from "@accp/database/schema";
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

## 📝 Environment Variables Checklist

```env
# Database
DATABASE_URL=postgresql://accp_user:accp_password@localhost:5432/accp_db

# Security
JWT_SECRET=YOUR_GENERATED_SECRET_HERE

# Google Drive Integration (Optional for local dev)
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_REFRESH_TOKEN=...
GOOGLE_DRIVE_FOLDER_ID=...
```

## 👥 Team Development

ทุกคนในทีมต้อง:

1. ติดตั้ง Docker Desktop
2. รัน `docker compose up -d` เพื่อ start local database
3. รัน `npm install` เพื่อติดตั้ง dependencies
4. รัน `npm run db:push` เพื่อ sync schema
5. รัน `npm run db:seed` เพื่อสร้าง admin user เริ่มต้น

## 📄 License

Private - ACCP Conference System
