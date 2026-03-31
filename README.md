
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

## 🛍️ Client Features (User Side)
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
* Express
* Mongoose

### Database
* MongoDB 

### Other Tools
* npm
* pug 
* nodemon 

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
│   │    ├── dashboard.route.js
│   │    ├── index.route.js
│   │    └── product.route.js
│   │        
│   └── client/
│      ├── home.route.js
│      ├── index.route.js
│      └── product.route.js
│  
│── .env
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

* [Name]: Đặng Tiến
* [GitHub]: https://github.com/dangtienvn
* [Email]: td2812009@gmail.com
