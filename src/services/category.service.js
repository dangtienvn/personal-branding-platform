import { query } from '@/lib/database';
import { createTreeHelper } from '@/utils/createTree.helper'; // Cần tạo utils này sau

export async function getCategories() {
    try {
        // Tương đương: const records = await ProductCategory.find({ deleted: false });
        // const res = await query('SELECT * FROM product_categories WHERE deleted = false ORDER BY position ASC');
        // let records = res.rows;

        // Data mẫu (Mock)
        let records = [
            { id: 1, title: "Danh mục 1", parent_id: null, position: 1 },
            { id: 2, title: "Danh mục 1.1", parent_id: 1, position: 2 }
        ];

        // Logic cũ: const newRecords = createTreeHelper(records);
        // Tạm thời trả về phẳng nếu chưa có hàm createTreeHelper
        return records;
    } catch (error) {
        console.error("Lỗi lấy danh mục:", error);
        return [];
    }
}

export async function getCategoryById(id) {
    try {
        // const res = await query('SELECT * FROM product_categories WHERE id = $1 AND deleted = false', [id]);
        // return res.rows[0];
        return { id, title: "Danh mục mẫu", parent_id: null, position: 1 };
    } catch (error) {
        return null;
    }
}

export async function createCategory(data) {
    try {
        // Tương đương: const record = new ProductCategory(req.body); await record.save();
        // await query('INSERT INTO product_categories (title, parent_id, description, status, position) VALUES ($1, $2, $3, $4, $5)', 
        // [data.title, data.parent_id, data.description, data.status, data.position]);
        return { success: true };
    } catch (error) {
        return { success: false, error };
    }
}

export async function updateCategory(id, data) {
    try {
        // Tương đương: await ProductCategory.updateOne({ _id: id }, req.body);
        // await query('UPDATE product_categories SET title = $1, position = $2 WHERE id = $3', 
        // [data.title, data.position, id]);
        return { success: true };
    } catch (error) {
        return { success: false, error };
    }
}
