const clientProductRoutes = require("./client.product.route");

module.exports = (app) => {
  // Client product routes
  app.use("/products", clientProductRoutes);
};
