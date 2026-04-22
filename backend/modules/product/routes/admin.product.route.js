const express = require("express");
const multer = require("multer");

const router = express.Router();

const storageHelper = require("../../../shared/utils/storageMulter");
const upload = multer({ storage: storageHelper() });

const controller = require("../controllers/admin.product.controller");
const validate = require("../../../shared/validates/admin/product.validate");

const uploadCloud = require("../../../shared/middleware/admin/uploadCloud.middleware");

// [GET] /admin/products
router.get("/", controller.index);

// Change product status (supports method-override via POST)
router.patch("/change-status/:status/:id", controller.changeStatus);
// fallback POST handlers (forms may submit POST + _method)
router.post("/change-status/:status/:id", controller.changeStatus);

// Change multiple products status (supports method-override via POST)
router.patch("/change-multi", controller.changeMulti);
router.post("/change-multi", controller.changeMulti);

// Delete product (supports method-override via POST)
router.delete("/delete/:id", controller.delete);
router.post("/delete/:id", controller.delete);

// Create and Edit routes
router.get("/create", controller.create);
router.post(
  "/create",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createPost,
  controller.createPost
);

// Edit routes
router.get("/edit/:id", controller.edit);

// For edit, we want to support both file uploads and Cloudinary uploads.
router.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createPost,
  controller.editPatch
);

// Fallback POST handler for edit (in case method-override isn't used)
router.post(
  "/edit/:id",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createPost,
  controller.editPatch
);

// [GET] /admin/products/detail/:id
router.get("/detail/:id", controller.detail);

module.exports = router;
