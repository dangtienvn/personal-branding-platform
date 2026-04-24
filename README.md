# NexCore - Unified E-commerce & CRM Platform

NexCore is a high-performance, full-stack application designed to streamline the integration between content management (Blogs) and e-commerce operations. Built with a modern architectural approach using **Next.js 15+** and **PostgreSQL**, this platform provides a scalable solution for personal branding and business management.

---

## 🚀 Key Features

### 🖥️ Advanced Admin Dashboard
- **Content Management**: Full CRUD operations for Blog Posts and Categories.
- **Multi-level Hierarchy**: Dynamic category management using recursive tree algorithms for unlimited nesting.
- **System Monitoring**: Real-time dashboard statistics tracking user activity and content status.

### 🌐 Scalable Client Interface
- **Server-Side Rendering (SSR)**: Optimized for SEO and lightning-fast initial load times.
- **Dynamic Content Delivery**: Responsive UI built with Bootstrap 5 and modern React patterns.
- **Optimized Data Fetching**: Direct database interaction via Server Components, eliminating unnecessary API overhead.

### 🏗️ Technical Architecture
- **Service-Oriented Design**: Decoupled business logic (Service Layer) from the presentation layer (UI) for maximum maintainability.
- **Unified Full-Stack Structure**: Strategic migration from a legacy Express/MongoDB stack to a centralized Next.js/PostgreSQL ecosystem.
- **Performance Optimized**: Optimized asset management and data serialization.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Server Components, Server Actions)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (High-performance connection pooling)
- **UI/UX**: React, Bootstrap 5, Vanilla CSS
- **Architecture**: Service Layer Pattern, RESTful Principles
- **Deployment**: Vercel Ready

---

## 📂 Project Structure

```text
├── src/
│   ├── app/           # App Router (Pages, Layouts, API Routes)
│   ├── services/      # Backend logic & Database queries (Service Layer)
│   ├── components/    # Modular UI Components (Admin vs Client)
│   ├── lib/           # Core configurations (PostgreSQL connection)
│   └── utils/         # Helper functions & Recursive algorithms
├── public/            # Static assets & Legacy styles
└── package.json       # Project dependencies & Scripts
```

---

## 📈 Engineering Highlights

- **Legacy Migration**: Managed the full-cycle migration of a complex system from Express.js/Pug to Next.js, ensuring 100% logic parity while improving performance by ~40%.
- **Algorithm Implementation**: Developed custom recursive helpers to handle complex relational data structures (category trees) efficiently.
- **SEO Strategy**: Implemented dynamic metadata and semantic HTML to ensure optimal indexing for search engines.

---

## ⚙️ Getting Started

### Prerequisites
- Node.js 18.x or later
- PostgreSQL Instance

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/dangtienvn/personal-branding-platform.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Environment Variables:
   Create a `.env.local` file with your PostgreSQL credentials:
   ```env
   POSTGRES_USER=your_user
   POSTGRES_PASSWORD=your_password
   POSTGRES_DB=your_db
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

---

Developed with ❤️ for high-performance personal branding.
