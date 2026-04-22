// [GET] /admin/comments
module.exports.index = async (req, res) => {
  // TODO: Implement comment listing for admin
  res.render("admin/pages/comments/index", {
    pageTitle: "Quản lý bình luận",
    comments: []
  });
};

// [PATCH] /admin/comments/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  // TODO: Implement comment status change
  req.flash("info", "Tính năng đang phát triển.");
  return res.redirect(req.get("Referrer") || "/admin/comments");
};

// [DELETE] /admin/comments/delete/:id
module.exports.delete = async (req, res) => {
  // TODO: Implement soft-delete for comments
  req.flash("info", "Tính năng đang phát triển.");
  return res.redirect(req.get("Referrer") || "/admin/comments");
};
