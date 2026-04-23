const express = require("express");
const multer = require("multer");
const router = express.Router();

const storageHelper = require("../../../shared/utils/storageMulter");
const upload = multer({ storage: storageHelper() });

const controller = require("../controllers/admin.category.controller");
const uploadCloud = require("../../../shared/middleware/admin/uploadCloud.middleware");

// [GET] /admin/products/categories
router.get("/", controller.index);

// [GET] /admin/products/categories/create
router.get("/create", controller.create);

// [POST] /admin/products/categories/create
router.post(
  "/create",
  upload.single("thumbnail"),
  uploadCloud.upload,
  controller.createPost
);

// [GET] /admin/products/categories/edit/:id
router.get("/edit/:id", controller.edit);

// [PATCH] /admin/products/categories/edit/:id
router.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  uploadCloud.upload,
  controller.editPatch
);

module.exports = router;
