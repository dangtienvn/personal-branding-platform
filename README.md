# NexBlog - Advanced Personal Branding & Content Management System

NexBlog is a high-performance, full-stack personal blogging platform designed for developers and creative professionals to build their digital presence. Built with **Next.js 15+** and **PostgreSQL**, it offers a robust solution for content authoring, category organization, and superior reader experience.

---

## 🚀 Key Features

### 🖋️ Professional Content Management (CMS)
- **Rich Content Authoring**: Full-featured admin interface for managing blog posts and articles.
- **Hierarchical Taxonomy**: Advanced category management using recursive tree algorithms for deep content organization.
- **Real-time Analytics**: Admin dashboard providing insights into post performance and system statistics.

### 📖 Optimized Reader Experience
- **Lightning Fast Performance**: Leverages Next.js Server Components for near-instantaneous page loads.
- **SEO First Architecture**: Fully optimized for search engines with dynamic meta tags and semantic HTML5 structure.
- **Responsive & Modern UI**: A clean, distraction-free reading interface built with modern React patterns and Bootstrap 5.

### 🏗️ Technical Architecture
- **Server-Side Rendering (SSR)**: Ensures content is indexed by Google immediately upon publication.
- **Scalable Service Layer**: Decoupled business logic (Service Layer) from UI components for clean, maintainable engineering.
- **Database Excellence**: High-performance interaction with PostgreSQL using advanced connection pooling techniques.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Server Components, Server Actions)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (SQL optimization & pooling)
- **UI/UX**: React, Bootstrap 5, Vanilla CSS
- **Architecture**: Service Layer Pattern, RESTful API Design
- **Deployment**: Vercel Optimized

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

- **Legacy-to-Modern Migration**: Spearheaded the complete migration of a legacy Express.js/Pug/MongoDB stack into a modern Next.js ecosystem, maintaining logic integrity while significantly boosting core web vitals.
- **Recursive Tree Logic**: Implemented complex recursive algorithms to handle multi-level nested data structures for content categorization.
- **Direct DB Access**: Leveraged Next.js Server Components to establish direct, secure database connections, eliminating the latency of traditional API middle-layers.

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

Built for professionals who care about performance and clean code.
