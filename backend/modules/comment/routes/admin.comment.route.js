const express = require("express");
const router = express.Router();
const controller = require("../controllers/admin.comment.controller");

// [GET] /admin/comments
router.get("/", controller.index);

// [PATCH] /admin/comments/change-status/:status/:id
router.patch("/change-status/:status/:id", controller.changeStatus);
router.post("/change-status/:status/:id", controller.changeStatus);

// [DELETE] /admin/comments/delete/:id
router.delete("/delete/:id", controller.delete);
router.post("/delete/:id", controller.delete);

module.exports = router;
