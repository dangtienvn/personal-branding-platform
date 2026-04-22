// [GET] /auth/login
module.exports.loginPage = (req, res) => {
  res.render("client/pages/auth/login", {
    pageTitle: "Đăng nhập"
  });
};

// [POST] /auth/login
module.exports.loginPost = async (req, res) => {
  // TODO: Implement login logic
  req.flash("info", "Tính năng đăng nhập đang được phát triển.");
  res.redirect("/");
};

// [GET] /auth/register
module.exports.registerPage = (req, res) => {
  res.render("client/pages/auth/register", {
    pageTitle: "Đăng ký"
  });
};

// [POST] /auth/register
module.exports.registerPost = async (req, res) => {
  // TODO: Implement register logic
  req.flash("info", "Tính năng đăng ký đang được phát triển.");
  res.redirect("/auth/login");
};

// [GET] /auth/logout
module.exports.logout = (req, res) => {
  // TODO: Implement logout (clear session/token)
  res.redirect("/");
};
