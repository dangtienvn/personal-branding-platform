import { query } from '@/lib/database';

export async function getProducts() {
    try {
        // Tương đương với: const products = await Product.find({ status: "active", deleted: false });
        // const res = await query('SELECT * FROM products WHERE status = $1 AND deleted = false', ['active']);
        // let products = res.rows;
        
        // Tạm thời trả về data mẫu chờ có Table PostgreSQL thật
        let products = [
            {
                id: 1,
                title: "Sản phẩm Next.js (Server Component)",
                thumbnail: "/images/logo.jpg",
                price: 150,
                discountPercentage: 33
            }
        ];

        // ĐÂY LÀ LOGIC CŨ CỦA BẠN ĐƯỢC CHUYỂN SANG (từ client.product.controller.js):
        const newProducts = products.map(item => {
            item.priceNew = (item.price * (100 - item.discountPercentage) / 100).toFixed(0);
            return item;
        });

        return newProducts;

    } catch (error) {
        console.error("Database Error:", error);
        return [];
    }
}
