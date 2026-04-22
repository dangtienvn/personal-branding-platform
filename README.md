## Personal Branding Platform
A fullstack e-commerce application built with Node.js, Express allowing users to browse products, manage shopping carts, and perform secure checkout with JWT-based authentication.

## Screenshots

### Home Page

(Add screenshot here)

### Admin

(Add screenshot here)

### Client
---

## Key Features

# 🚀 Features
## 👤 Authentication & Authorization
- User registration, login, logout
- JWT-based authentication
- Role-based access control (Admin / User)
- Forgot password & reset password
- Protected routes (middleware authorization)

## 🛍️ Client Features ()
- Browse products by category
- Search and filter products
- View product details
- Add / remove products from cart
- Update cart quantity
- Checkout and place orders
- View order history
- User profile management

## 🧑‍💼 Admin Features (Dashboard)
- Dashboard overview (statistics: users, orders, revenue)
- Product management (CRUD)
- Category management (CRUD)
- User management (CRUD, role assignment)
- Admin account management
- Order management (view, update status)
- Role & permission management
- System settings

## 📝 Content Management (Optional)
- Blog/article management (Admin)
- Display posts on client side

## ⚙️ System & Backend Features
- RESTful API design
- MVC architecture
- Input validation & error handling
- Pagination, filtering, sorting
- Image upload (products)
- Secure password hashing (bcrypt)
- Environment configuration (.env)
- Logging & debugging
---

## 🏗️ Application Architecture

Describe how your system is structured.

* Client – Server architecture
* RESTful API design
* MVC / Layered architecture
* (Optional) Add diagram here

---

## ⚙️ Technology Stack
### Frontend
*  HTML 
*  CSS 
*  JS
*  Bootstrap

### Backend
* Nodejs
* ExpressJS

### Database
* MongoDB 
* Mongoose

### Other Tools
* npm
* pug 
* nodemon 
* method-override
* body-parser
* express-flash
* mongoose-slug-updater

---

## 📁 Project Structure

```bash
product-management/
│── config/
│   ├── database.js
│   └── system.js
│  
│── controllers/
│   ├── admin/
│   │    ├── dashboard.controller.js
│   │    └── product.controller.js
│   │        
│   └── client/
│      ├── dashboard.controller.js
│      └── product.controller.js
│ 
│── documents/
│   ├── chart/
│   │    ├── product-management.drawio
│   │    └── product.controller.js
│   │        
│   └── client/
│      ├── dashboard.controller.js
│      └── product.controller.js
│  
│── helpers/
│      └── filterStatus.js
│ 
│── models/
│   └── product.model.js
│  
│── node_modules/
│   
│── public/
│   ├── admin/
│   │  ├── css/ 
│   │  │    └── style.css
│   │  └── js/
│   │       └── script.js
│   │    
│   ├── css/ 
│   │    └── style.css
│   ├── images/
│   │    └── logo.svg
│   └── js/
│       └── script.js
│ 
│── routes/
│   ├── admin/
│   │    ├── dashboard.route.js
│   │    ├── index.route.js
│   │    └── product.route.js
│   │        
│   └── client/
│      ├── home.route.js
│      ├── index.route.js
│      └── product.route.js
│  
│── views/
│   ├── admin/
│   │    ├── layouts/
│   │    │    └── default.pug
│   │    │      
│   │    ├── mixins/
│   │    │    └── filter-status.pug
│   │    │      
│   │    ├── pages/    
│   │    │     ├── dashboard/ 
│   │    │     │    └── index.pug
│   │    │     │                  
│   │    │     └── products/
│   │    │            └── index.pug
│   │    └── partials/
│   │         ├── header.pug
│   │         └── sider.pug
│   │        
│   └── client/
│       ├── layouts/
│       │    └── default.pug
│       │      
│       ├── mixins/
│       │    └── box-head.pug
│       │      
│       ├── pages/    
│       │     ├── home/ 
│       │     │    └── index.pug
│       │     │                  
│       │     └── products/
│       │            └── index.pug
│       └── partials/
│            ├── footer.pug
│            └── header.pug
│  
│── .env
│── .env,example
│── .gitignore
│── index.js
│── outlog.com
│── package.lock.json
│── package.json
└── README.md
```

---

## 🔐 Authentication & Security

### Authentication Flow

* User login → server returns access token & refresh token
* Access token used for API requests

### Token Refresh Strategy

* Automatically refresh token when expired
* Prevent user from being logged out unexpectedly

### Protected Routes

* Middleware checks authentication before accessing resources

---

## 🔄 API Communication Strategy

* Centralized API service (Axios / Fetch)
* Interceptors for:
  * Attach token
  * Handle errors globally
* Clean separation between API and UI

---

## 🌍 Environment Configuration

`.env` file:
PORT=3000

---

## 🖥️ Running Locally

```bash
# Install dependencies
npm install

# Run server
npm run dev
```

---

## 🔗 Integration with Backend API

Describe how frontend communicates with backend:

* REST API endpoints
* Authentication headers
* Data flow

---

## 🚀 Future Improvements

* Add real-time features (WebSocket)
* Improve UI/UX
* Add unit & integration tests
* Deploy to cloud (AWS / Vercel)

---

## 👤 Author

* **[Name]:** Đặng Tiến
* **[Github]:** [dangtienvn](https://github.com/dangtienvn)
* **[Email]:** [td2812009@gmail.com](mailto:td2812009@gmail.com)

✅ “Modular MVC + Service Layer (Clean MVC) + FE tách nhẹ (nếu cần)”

Không phải:

❌ MVC đơn giản kiểu đồ án
❌ FE/BE full React phức tạp
🚀 1. Kiến trúc phù hợp nhất cho blog + CV + freelancer
blog-platform
├─ backend
│   ├─ modules
│   │   ├─ auth
│   │   ├─ post
│   │   ├─ comment
│   │   ├─ user
│   │   └─ admin
│   │
│   ├─ shared
│   │   ├─ middleware
│   │   ├─ utils
│   │   ├─ config
│   │
│   ├─ app.js
│
├─ views (Pug / hoặc bỏ nếu API-only sau này)
├─ public
└─ database
🧠 2. Đây KHÔNG còn là MVC “đồ án”

Mà là:

👉 Modular MVC + Service Layer

Mỗi module tự chứa MVC:

post/
 ├─ post.model.js
 ├─ post.controller.js
 ├─ post.service.js
 ├─ post.route.js
🔥 3. Vì sao cấu trúc này hợp blog + freelancer?
✔ 1. Dễ mở rộng

Blog sau này muốn thêm:

SEO
AI viết bài
Markdown editor
API mobile app
Newsletter

👉 không phá cấu trúc

✔ 2. Dễ build CV “đẹp”

Bạn có thể nói:

“Tôi xây dựng hệ thống blog theo modular architecture, tách domain logic theo service layer”

👉 ăn điểm hơn MVC đồ án rất nhiều

✔ 3. Dễ chuyển thành sản phẩm thật

Sau này bạn có thể:

convert sang SaaS blog platform
bán service viết blog
làm CMS cho khách
🧩 4. Frontend nên làm kiểu nào?

Bạn có 2 hướng:

👉 Hướng 1 (khuyên dùng cho bạn hiện tại)
Server-rendered + SEO tốt
Pug / EJS / hoặc Next SSR nhẹ
backend render HTML trực tiếp

✔ SEO mạnh
✔ hợp blog
✔ đơn giản
✔ nhanh ra sản phẩm

👉 Hướng 2 (nâng cấp sau)
API backend
Frontend React / Next.js

👉 dành khi bạn muốn scale thành platform

⚖️ 5. So sánh 3 level kiến trúc
Level	Kiến trúc	Phù hợp
1	MVC đơn giản	đồ án
2	Modular MVC + service	blog + CV (✔ bạn cần)
3	FE/BE tách React + API	SaaS / startup
💡 6. Cách tư duy đúng cho blog của bạn

Đừng nghĩ:

“tôi làm blog cho đồ án”

Mà hãy nghĩ:

“tôi đang build personal media system”

🔥 7. Structure tối ưu nhất cho bạn (chốt)
blog-system
├─ src
│   ├─ modules
│   │   ├─ auth
│   │   ├─ post
│   │   ├─ comment
│   │   ├─ category
│   │   ├─ admin
│   │
│   ├─ core
│   │   ├─ database
│   │   ├─ middleware
│   │   ├─ config
│   │   ├─ utils
│
├─ views (Pug)
├─ public
└─ app.js
🚀 8. Lời khuyên quan trọng (đi xa hơn code)

Nếu bạn làm đúng kiểu này:

👉 CV bạn sẽ không còn là “CRUD project”
👉 mà là “mini product architecture”

Nhưng mình nói thẳng: không phải “đổi folder là xong”, mà là refactor lại tư duy tổ chức code.

🧠 1. Hiểu đúng vấn đề trước
❌ Product-management MVC thường kiểu:
controllers/
models/
routes/
views/

👉 Tư duy: chia theo layer (MVC)

👉 Blog / CV / freelancer cần:
modules/
  post/
  auth/
  comment/
  admin/

👉 Tư duy: chia theo feature (domain)

🔥 2. Bạn cần “đổi từ MVC sang Modular MVC”
🎯 Mục tiêu:

Không phá logic cũ → chỉ reorganize lại code

🚀 3. Cách chuyển (step-by-step rõ ràng)
📌 Bước 1: tạo structure mới
src/
 ├─ modules/
 │   ├─ post/
 │   ├─ auth/
 │   ├─ user/
 │   ├─ admin/
 │
 ├─ core/
 │   ├─ db/
 │   ├─ middleware/
 │   ├─ utils/
📌 Bước 2: gom code theo “feature”
Ví dụ từ MVC cũ:
controllers/postController.js
models/postModel.js
routes/postRoutes.js

👉 chuyển thành:

modules/post/
 ├─ post.model.js
 ├─ post.controller.js
 ├─ post.route.js
 ├─ post.service.js (nếu có)
📌 Bước 3: update route entry point
Cũ:
app.use('/posts', postRoutes);
Mới:
import postRoutes from "./modules/post/post.route.js";
app.use("/posts", postRoutes);
📌 Bước 4: gom logic từ controller → service (nếu cần)

👉 Nếu controller đang bị “to”:

const posts = await Post.find();
res.render("posts", { posts });

👉 tách ra:

// service
export const getAllPosts = () => Post.find();
📌 Bước 5: views không cần đổi nhiều

Nếu bạn dùng Pug:

views/
 ├─ posts/
 ├─ auth/
 ├─ admin/

👉 chỉ cần move folder, không cần rewrite nhiều

⚖️ 4. Mapping từ cũ → mới
MVC cũ	Modular mới
controllers/	modules/post/controller
models/	modules/post/model
routes/	modules/post/route
services/	modules/post/service
views/	views/posts
⚠️ 5. Sai lầm khi refactor (rất hay gặp)
❌ 1. Đổi folder nhưng không đổi import

→ crash app ngay

❌ 2. Không gom theo domain

→ vẫn giữ MVC cũ nhưng chỉ “move file”

❌ 3. Refactor quá lớn 1 lần

→ dễ bug, mất control

🧠 6. Cách làm đúng (quan trọng nhất)

👉 KHÔNG refactor toàn bộ 1 lần

Làm theo từng module:
chuyển post trước
chạy ổn
chuyển auth
chuyển admin
🔥 7. Tư duy cốt lõi bạn cần nhớ
MVC đồ án:

“chia theo loại file”

Modular MVC:

“chia theo chức năng hệ thống”

🚀 8. Chốt cho case của bạn

Nếu bạn đang từ:

👉 product-management MVC → blog system

thì:

✔ Bạn KHÔNG cần rewrite lại từ đầu
✔ Chỉ cần refactor sang modular structure