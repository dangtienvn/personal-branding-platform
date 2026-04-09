const Product = require("../../models/product.model");
const mongoose = require("mongoose");
const filterStatusHelper = require("../../helpers/filterStatus");

const searchHelper = require("../../helpers/search");

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
    let objectPagination = {
        currentPage: 1,
        limitItem: 4
    };

    if (req.query.page) {
        const p = parseInt(req.query.page);
        if (!isNaN(p) && p > 0) objectPagination.currentPage = p;
    }

    if (req.query.limit) {
        const l = parseInt(req.query.limit);
        if (!isNaN(l) && l > 0) objectPagination.limitItem = l;
    }

    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItem;

    const countProducts = await Product.countDocuments(find);
    const objectPagination = paginationHelper(req.query, countProducts, { 
        limitDefault: 4, 
        windowSize: 5 
    });

    const products = await Product.find(find)
        .sort({ position: "desc" })
        .limit(objectPagination.limitItem)
        .skip(objectPagination.skip);

    // Build pagination pages window (max 5 pages visible)
    const windowSize = 5;
    let start = Math.max(1, objectPagination.currentPage - Math.floor(windowSize / 2));
    let end = Math.min(objectPagination.totalPage, start + windowSize - 1);
    if (end - start + 1 < windowSize) {
        start = Math.max(1, end - windowSize + 1);
    }
    objectPagination.pages = [];
    for (let i = start; i <= end; i++) objectPagination.pages.push(i);

    objectPagination.hasPrev = objectPagination.currentPage > 1;
    objectPagination.hasNext = objectPagination.currentPage < objectPagination.totalPage;
    objectPagination.prevPage = objectPagination.hasPrev ? objectPagination.currentPage - 1 : null;
    objectPagination.nextPage = objectPagination.hasNext ? objectPagination.currentPage + 1 : null;
    objectPagination.firstPage = 1;
    objectPagination.lastPage = objectPagination.totalPage;

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