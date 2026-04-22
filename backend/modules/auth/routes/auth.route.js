const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth.controller");

// [GET] /auth/login
router.get("/login", controller.loginPage);

// [POST] /auth/login
router.post("/login", controller.loginPost);

// [GET] /auth/register
router.get("/register", controller.registerPage);

// [POST] /auth/register
router.post("/register", controller.registerPost);

// [GET] /auth/logout
router.get("/logout", controller.logout);

module.exports = router;
