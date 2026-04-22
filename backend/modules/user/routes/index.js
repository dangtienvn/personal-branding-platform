const homeRoutes = require("./home.route");

module.exports = (app) => {
  // Home routes
  app.use("/", homeRoutes);
};
