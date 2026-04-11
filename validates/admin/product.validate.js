module.exports.createPost = (req, res, next) => {
    if(!req.body.title) {
        req.flash("error", "Vui lòng nhập tiêu đề!");
        res.redirect(req.get("Referrer") || "/admin/products");
        return;
    }

    if(req.body.title.length < 5) {
        req.flash("error", "Tiêu đề phải có ít nhất 5 ký tự!");
        res.redirect(req.get("Referrer") || "/admin/products");
        return;
    }

    if(req.body.price < 0) {
        req.flash("error", "Giá không được là số âm!");
        res.redirect(req.get("Referrer") || "/admin/products");
        return;
    }

    next();
}