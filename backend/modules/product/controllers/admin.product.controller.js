const Product = require("../../../shared/models/product.model");
const mongoose = require("mongoose");
const filterStatusHelper = require("../../../shared/utils/filterStatus");

const searchHelper = require("../../../shared/utils/search");
const paginationHelper = require("../../../shared/utils/pagination");
const systemConfig = require("../../../shared/config/system");

// [GET] /admin/products
module.exports.index = async (req, res) => {
    const filterStatus = filterStatusHelper(req.query);

    // Build the query object for fetching products based on the filters
    let find = {
        deleted: false
    };

    if (req.query.status) {
        find.status = req.query.status;
    }
    // End of filter status

    // Build the search object based on the query parameters
    const objSearch = searchHelper(req.query);

    if (objSearch.keyword) {
        find.title = objSearch.regex;
    }
    // End of search

    // Pagination
    const countProducts = await Product.countDocuments(find);
    const objectPagination = paginationHelper(req.query, countProducts, { 
        limitDefault: 4, 
        windowSize: 5 
    });

    const products = await Product.find(find)
        .sort({ position: "desc" })
        .limit(objectPagination.limitItem)
        .skip(objectPagination.skip);


    // Build base query string excluding page param so view can append `page=` easily
    const queryObj = { ...req.query };
    delete queryObj.page;
    const baseQuery = new URLSearchParams(queryObj).toString();
    
    res.render("admin/pages/products/index", {
        pageTitle: "Danh sách sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: objSearch.keyword,
        pagination: objectPagination,
        baseQuery: baseQuery
    });
}

// [PATCH] /admin/products/change-status/inactive/:status/id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;

    if (!id) {
        console.error("changeStatus: missing id param");
        return res.redirect(req.baseUrl || "/admin/products");
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.error("changeStatus: invalid ObjectId", id);
        return res.redirect(req.get("Referrer") || "/admin/products");
    }

    if (!status || (status !== "active" && status !== "inactive")) {
        console.error("changeStatus: invalid status param", status);
        return res.redirect(req.get("Referrer") || "/admin/products");
    }

    try {
        await Product.updateOne({ _id: id }, { status: status });
        req.flash("success", `Cập nhật trạng thái thành công cho sản phẩm!`);
    } catch (err) {
        console.error("changeStatus error:", err);
        req.flash("error", "Có lỗi xảy ra khi cập nhật trạng thái.");
    }
    
    return res.redirect(req.get("Referrer") || "/admin/products");
}

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
    const idsRaw = req.body.ids || "";
    const type = req.body.type;

    // Handle different change types. For change-position we expect items like "<id> - <position>"
    try {
        if (type === "change-position") {
            const items = idsRaw
                .split(',')
                .map(s => s.trim())
                .filter(s => s.length > 0);

            if (items.length === 0) {
                console.error("changeMulti: no items for change-position", idsRaw);
                return res.redirect(req.get("Referrer") || "/admin/products");
            }

            for (const item of items) {
                let [idPart, posPart] = item.split(" - ");
                if (!idPart) continue;
                idPart = idPart.trim();

                if (!mongoose.Types.ObjectId.isValid(idPart)) {
                    console.error("changeMulti: invalid ObjectId in change-position", idPart);
                    continue;
                }

                const position = parseInt((posPart || "").toString().trim(), 10);
                if (Number.isNaN(position)) {
                    console.error("changeMulti: invalid position for id", idPart, posPart);
                    continue;
                }

                await Product.updateOne({ _id: idPart }, { position: position });
            }
        } else {
            // parse ids (comma-separated) into array of valid ObjectIds for other actions
            const idsArr = idsRaw
                .split(',')
                .map(s => s.trim())
                .filter(s => s.length > 0 && mongoose.Types.ObjectId.isValid(s));

            if (idsArr.length === 0) {
                console.error("changeMulti: no valid ids provided", idsRaw);
                return res.redirect(req.get("Referrer") || "/admin/products");
            }

            if (type === "active") {
                await Product.updateMany({ _id: { $in: idsArr } }, { status: "active" });
            } else if (type === "inactive") {
                await Product.updateMany({ _id: { $in: idsArr } }, { status: "inactive" });
            } else if (type === "delete-all") {
                await Product.updateMany({ _id: { $in: idsArr } }, { 
                    deleted: true,
                    deletedAt: new Date()
                });
            } else {
                console.error("changeMulti: invalid type", type);
            }
        }
    } catch (err) {
        console.error("changeMulti error:", err);
    }

    req.flash("success", `Cập nhật thành công!`);
    return res.redirect(req.get("Referrer") || "/admin/products");
};

// [DELETE] /admin/products/delete/:id
module.exports.delete = async (req, res) => {
    const id = req.params.id;

    // await Product.deleteOne({ _id: id });
    await Product.updateOne({ _id: id }, { 
        deleted: true,
        deletedAt: new Date()
    });

    req.flash("success", `Xóa sản phẩm thành công!`);
    return res.redirect(req.get("Referrer") || "/admin/products");
};

// [GET] /admin/products/create
module.exports.create = async (req, res) => {
    res.render("admin/pages/products/create", {
        pageTitle: "Thêm mới sản phẩm"
    });
};

// [POST] /admin/products/create
module.exports.createPost = async (req, res) => {
    console.log("[create] Processing product creation...");
    
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);

    if (req.body.position === "") {
        const countProducts = await Product.countDocuments({});
        req.body.position = countProducts + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }

    // Handle thumbnail - Cloudinary URL is set by uploadCloud middleware if successful
    if (req.body.thumbnail) {
        console.log("[create] Using Cloudinary thumbnail:", req.body.thumbnail);
    } else if (req.file && req.file.filename) {
        // Cloudinary failed or no credentials, use local storage
        req.body.thumbnail = `/uploads/${req.file.filename}`;
        console.log("[create] Using local filename (Cloudinary unavailable):", req.body.thumbnail);
    } else {
        console.log("[create] Warning: No thumbnail provided");
    }

    req.body.deleted = false;

    try {
        const newProduct = new Product(req.body);
        await newProduct.save();

        console.log("[create] Product saved successfully with ID:", newProduct._id);
        req.flash("success", "Thêm sản phẩm mới thành công!");
        return res.redirect(`${systemConfig.prefixAdmin}/products`);
    } catch (err) {
        console.error("[create] Error creating product:", err);
        req.flash("error", "Có lỗi xảy ra khi thêm sản phẩm mới.");
        return res.redirect(`${systemConfig.prefixAdmin}/products/create`);
    }
};

// [GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const find = {
            _id: req.params.id,
            deleted: false
        };

        const product = await Product.findOne(find);

        res.render("admin/pages/products/edit", {
            pageTitle: "Chỉnh sửa sản phẩm",
            product: product
        });
    } catch (error) {
        req.flash("error", "Không tìm thấy sản phẩm!");
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
};

// [PATCH] /admin/products/edit/:id (supports POST with method override)
module.exports.editPatch = async (req, res) => {
    console.log("[edit] Processing product update...");
    
    const id = req.params.id;

    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    req.body.position = parseInt(req.body.position);

    // Handle thumbnail update logic
    // Priority: 1) Cloudinary URL from middleware, 2) Old thumbnail if kept, 3) New local file, 4) Query DB
    if (req.body.thumbnail) {
        // Cloudinary upload succeeded or URL was set by middleware
        console.log("[edit] New thumbnail from Cloudinary:", req.body.thumbnail);
    } else if (req.body.thumbnailOld) {
        // No new upload, preserve old thumbnail from hidden field
        req.body.thumbnail = req.body.thumbnailOld;
        console.log("[edit] Preserving old thumbnail from form field:", req.body.thumbnail);
    } else if (req.file && req.file.filename) {
        // New file uploaded but Cloudinary failed, use local filename
        req.body.thumbnail = `/uploads/${req.file.filename}`;
        console.log("[edit] Using new local filename (Cloudinary failed):", req.body.thumbnail);
    } else {
        // Last resort: fetch from DB
        console.log("[edit] No thumbnail provided, fetching from database...");
        try {
            const oldProduct = await Product.findById(id);
            if (oldProduct && oldProduct.thumbnail) {
                req.body.thumbnail = oldProduct.thumbnail;
                console.log("[edit] Old thumbnail fetched from DB:", req.body.thumbnail);
            }
        } catch (err) {
            console.error("[edit] Error fetching old product thumbnail:", err);
        }
    }

    // Remove the temporary thumbnailOld field from update
    delete req.body.thumbnailOld;

    try {
        await Product.updateOne({ _id: id }, req.body);
        console.log("[edit] Product updated successfully");
        req.flash("success", "Cập nhật sản phẩm thành công!");
    } catch (error) {
        console.error("[edit] Error updating product:", error);
        req.flash("error", "Cập nhật sản phẩm thất bại!");
    }

    res.redirect("back");
};

// [GET] /admin/products/detail/:id
module.exports.detail = async (req, res) => {
    try {
        const find = {
            _id: req.params.id,
            deleted: false
        };

        const product = await Product.findOne(find);

        if (!product) {
            req.flash("error", "Không tìm thấy sản phẩm!");
            return res.redirect(`${systemConfig.prefixAdmin}/products`);
        }

        res.render("admin/pages/products/detail", {
            pageTitle: product.title,
            product: product
        });
    } catch (error) {
        console.error("Error fetching product detail:", error);
        req.flash("error", "Có lỗi xảy ra khi lấy chi tiết sản phẩm!");
        return res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
};