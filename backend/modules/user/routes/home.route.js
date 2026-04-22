const express = require("express");
const router = express.Router();
const controller = require("../controllers/home.controller");

// Trang chủ
router.get("/", controller.index);

module.exports = router;