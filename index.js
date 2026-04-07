/**
 * LIBRARIES & ENVIRONMENT CONFIGURATION
 */
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
var flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
require("dotenv").config();

/**
 * DATABASE & SYSTEM CONFIGURATION
 */
const database = require("./config/database");
const systemConfig = require("./config/system");

// Connect to Database via internal config
database.connect();

// Direct connection using MONGO_URL from .env
mongoose.connect(process.env.MONGO_URL);

const app = express();
const port = process.env.PORT || 3000;

/**
 * VIEW ENGINE SETUP
 */
app.set("views", "./views");
app.set("view engine", "pug");

/**
 * MIDDLEWARES
 */
// Parse incoming request bodies (URL-encoded)
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// Express-flash and session setup for flash messages
app.use(cookieParser('keyboard memory'));
app.use(session({
  secret: 'keyboard memory',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}));
app.use(flash());
// Expose flash messages to all views as `messages`
app.use(function (req, res, next) {
  res.locals.messages = req.flash();
  next();
});
// Support HTTP verbs such as PUT or DELETE where the client doesn't support it
app.use(methodOverride("_method"));

// Serve static files (CSS, JS, Images) from the 'public' directory
app.use(express.static("public"));

/**
 * GLOBAL VARIABLES
 * These variables are accessible in all Pug template files
 */
app.locals.prefixAdmin = systemConfig.prefixAdmin;

/**
 * ROUTES
 */
const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");

route(app);      // Client-side routes
routeAdmin(app); // Admin-side routes

/**
 * SERVER INITIALIZATION
 */
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
  console.log(`Access here: http://localhost:${port}`);
});