const systemConfig = require("../../../shared/config/system");
const dashboardRoutes = require("./dashboard.route");
const productRoutes = require("../../product/routes/admin.product.route");
const categoryRoutes = require("../../product/routes/admin.category.route");

module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;

  app.get(PATH_ADMIN, (req, res) => res.redirect(PATH_ADMIN + "/dashboard"));
  app.get(PATH_ADMIN + "/", (req, res) => res.redirect(PATH_ADMIN + "/dashboard"));

  app.use(PATH_ADMIN + "/dashboard", dashboardRoutes);
  app.use(PATH_ADMIN + "/products", productRoutes);
  app.use(PATH_ADMIN + "/products/categories", categoryRoutes);
};

