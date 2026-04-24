import { query } from '@/lib/database';

export async function getDashboardStats() {
    try {
        // const productsCount = await query('SELECT COUNT(*) FROM products WHERE deleted = false');
        // const categoriesCount = await query('SELECT COUNT(*) FROM product_categories WHERE deleted = false');
        // const usersCount = await query('SELECT COUNT(*) FROM users WHERE deleted = false');

        return {
            products: 15,
            categories: 5,
            users: 10,
            activeProducts: 12
        };
    } catch (error) {
        return { products: 0, categories: 0, users: 0, activeProducts: 0 };
    }
}
