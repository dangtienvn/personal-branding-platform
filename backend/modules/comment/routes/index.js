const adminCommentRoutes = require("./admin.comment.route");

module.exports = (app, prefixAdmin) => {
  app.use(prefixAdmin + "/comments", adminCommentRoutes);
};
