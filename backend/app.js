/**
 * LIBRARIES & ENVIRONMENT CONFIGURATION
 */
const express = require('express');
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
require("dotenv").config();


/**
 * DATABASE & SYSTEM CONFIGURATION
 */
const database = require("./shared/config/database");
const systemConfig = require("./shared/config/system");

// Initialize app
const app = express();
const port = process.env.PORT || 3000;

/**
 * VIEW ENGINE SETUP
 */
app.set("views", `${__dirname}/../views`);
app.set("view engine", "pug");

/**
 * MIDDLEWARES
 */
// Parse incoming request bodies
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// Session & flash messages
app.use(cookieParser('keyboard memory'));
app.use(session({
  secret: 'keyboard memory',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}));
app.use(flash());


// Serve static files from 'public'
app.use(express.static(`${__dirname}/../public`));

// Serve TinyMCE from node_modules
app.use('/tinymce', express.static(path.join(__dirname, '..', 'node_modules', 'tinymce')));

// Support HTTP method override (PUT/DELETE via POST)
app.use(methodOverride("_method"));

// JSON content negotiation — REST Client / Postman / API testing support
// If request sends `Accept: application/json`, res.render() returns JSON instead of HTML
app.use((req, res, next) => {
  if (req.headers['accept']?.includes('application/json')) {
    const originalRender = res.render.bind(res);
    res.render = (view, data = {}) => res.json({ view, ...data });
  }
  next();
});

/**
 * GLOBAL TEMPLATE VARIABLES
 */
app.locals.prefixAdmin = systemConfig.prefixAdmin;

/**
 * ROUTES – MODULES
 * Register each module's route bundle
 */
const userRoutes = require("./modules/user/routes/index.js");
const authRoutes = require("./modules/auth/routes/index.js");
const productRoutes = require("./modules/product/routes/index.js");
const adminRoutes = require("./modules/admin/routes/index.js");
const commentRoutes = require("./modules/comment/routes/index.js");

userRoutes(app);                                      // GET /
authRoutes(app);                                      // /auth/*
productRoutes(app);                                   // /products/*
adminRoutes(app);                                     // /admin/dashboard, /admin/products
commentRoutes(app, systemConfig.prefixAdmin);         // /admin/comments

/**
 * SERVER INITIALIZATION
 * Wait for DB connection before starting
 */
module.exports = async () => {
  try {
    await database.connect();
    app.listen(port, () => {
      console.log(`✓ Server running  → http://localhost:${port}`);
      console.log(`✓ Admin panel     → http://localhost:${port}${systemConfig.prefixAdmin}/dashboard`);
    });
  } catch (error) {
    console.error("✗ Failed to start server:", error);
    process.exit(1);
  }
};

