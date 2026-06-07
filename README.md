cat > README.md << 'ENDOFFILE'
# DE-MAIZE — Digital Agency CMS Platform

A full-stack agency website with a complete content management system, built with Next.js 16, PostgreSQL, and a fully automated DevOps pipeline.

🌐 **Live Demo:** Coming soon  
📦 **Docker Hub:** [anishpandey735/de-maize-static](https://hub.docker.com/r/anishpandey735/de-maize-static)

---

## 🚀 Features

### Website
- Full agency website with Home, Services, Portfolio, Blog, and Contact pages
- 100/100 Lighthouse performance score in production
- ISR caching with 1 hour revalidation
- Fully responsive design

### Admin Panel
- Complete CMS at `/admin` — manage all content without touching code
- Manage: Services, Portfolio, Blog Posts, Team, Testimonials, Stats, Navigation
- JWT-based authentication
- Real-time content updates

### Backend
- 15+ REST APIs built with Next.js Route Handlers
- PostgreSQL database with Prisma ORM
- Database migrations and seeding

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Frontend | Next.js 16, TypeScript, Tailwind CSS |
| Backend | Next.js API Routes, Prisma ORM |
| Database | PostgreSQL 16 |
| Containerization | Docker, Docker Compose |
| CI/CD | Jenkins, GitHub Webhooks |
| Code Quality | SonarQube |
| Registry | Docker Hub |
| Performance | 100/100 Lighthouse Score |

---

## ⚙️ DevOps Pipeline

Every `git push` automatically triggers:



### Image Size Optimization
- Single-stage build: ~1.1GB
- Multi-stage build with standalone output: **~190MB (83% reduction)**

---

## 🏃 Running Locally

### Prerequisites
- Docker and Docker Compose installed
- Node.js 20+

### Quick Start with Docker

```bash
# Clone the repo
git clone https://github.com/Aneishpandey/DE-MAIZE-Static.git
cd DE-MAIZE-Static
git checkout cursor

# Start everything
docker compose up -d

# Seed the database
docker exec -it de-maize-static-app-1 npx prisma db seed

# Open browser
http://localhost:3000
```

### Admin Access   URL:      http://localhost:3000/admin
Email:    admin@demaize.com
Password: admin123


### Local Development

```bash
# Start database
docker compose up db -d

# Install dependencies
npm install

# Run migrations
npx prisma migrate deploy

# Seed database
npm run db:seed

# Start dev server
npm run dev
```

---

## 📁 Project Structure 
├── app/
│   ├── admin/          # Admin panel pages
│   ├── api/            # REST API routes
│   ├── blog/           # Blog pages
│   ├── portfolio/      # Portfolio pages
│   └── services/       # Services pages
├── components/         # Reusable UI components
├── lib/                # Utilities, Prisma client, types
├── prisma/             # Database schema and migrations
├── Dockerfile          # Multi-stage Docker build
├── docker-compose.yml  # App + PostgreSQL orchestration
└── Jenkinsfile         # CI/CD pipeline definition



---

## 🔧 Environment Variables

```env
DATABASE_URL=postgresql://postgres:secret@localhost:5432/demaize?schema=public
AUTH_SECRET=your-secret-here
ADMIN_EMAIL=admin@demaize.com
ADMIN_PASSWORD=your-password
```

---

## 👤 Author

**Anish Pandey**  
GitHub: [@Aneishpandey](https://github.com/Aneishpandey)

---

## 📄 License

MIT
ENDOFFILE