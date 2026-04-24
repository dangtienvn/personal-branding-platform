import { query } from '@/lib/database';

export async function getAdminProducts(filters = {}, search = '', pagination = { page: 1, limit: 4 }) {
    try {
        // Tương đương Mongoose: Product.find(find).skip(...).limit(...)
        // const offset = (pagination.page - 1) * pagination.limit;
        // let sql = 'SELECT * FROM products WHERE deleted = false';
        // let params = [];
        // if (filters.status) { sql += ' AND status = $1'; params.push(filters.status); }
        // if (search) { sql += ` AND title ILIKE '%${search}%'`; }
        // sql += ` ORDER BY position DESC LIMIT ${pagination.limit} OFFSET ${offset}`;
        // const res = await query(sql, params);
        // const countRes = await query('SELECT COUNT(*) FROM products WHERE deleted = false');
        // return { data: res.rows, total: parseInt(countRes.rows[0].count) };

        // Dữ liệu mẫu tạm thời
        return {
            data: [
                { id: 1, title: "Sản phẩm Admin 1", status: "active", position: 1, price: 100 },
                { id: 2, title: "Sản phẩm Admin 2", status: "inactive", position: 2, price: 200 }
            ],
            total: 2
        };
    } catch (error) {
        console.error("Lỗi getAdminProducts:", error);
        return { data: [], total: 0 };
    }
}

export async function changeProductStatus(id, status) {
    try {
        // await query('UPDATE products SET status = $1 WHERE id = $2', [status, id]);
        return { success: true };
    } catch (error) {
        return { success: false, error };
    }
}

export async function changeMultiProducts(ids, type) {
    try {
        // if (type === 'active') await query('UPDATE products SET status = $1 WHERE id = ANY($2)', ['active', ids]);
        // else if (type === 'delete-all') await query('UPDATE products SET deleted = true WHERE id = ANY($1)', [ids]);
        return { success: true };
    } catch (error) {
        return { success: false, error };
    }
}

export async function deleteProduct(id) {
    try {
        // Soft delete
        // await query('UPDATE products SET deleted = true, deleted_at = NOW() WHERE id = $1', [id]);
        return { success: true };
    } catch (error) {
        return { success: false, error };
    }
}

export async function createProduct(data) {
    try {
        // const { title, description, price, discountPercentage, stock, thumbnail, status, position } = data;
        // await query('INSERT INTO products (...) VALUES (...)', [...]);
        return { success: true };
    } catch (error) {
        return { success: false, error };
    }
}

export async function updateProduct(id, data) {
    try {
        // Cập nhật động dựa trên object data
        return { success: true };
    } catch (error) {
        return { success: false, error };
    }
}
