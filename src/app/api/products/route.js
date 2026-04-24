import { NextResponse } from 'next/server';
// import { query } from '@/lib/db'; // Dùng khi bạn code xong PostgreSQL

export async function GET(request) {
    // 1. Logic lấy danh sách sản phẩm từ DB (PostgreSQL) sẽ nằm ở đây
    // Ví dụ: const result = await query('SELECT * FROM products');
    
    // 2. Tạm thời trả về data mẫu (Mô phỏng logic cũ)
    const products = [
        {
            id: 1,
            title: "Sản phẩm Next.js API",
            thumbnail: "/images/logo.jpg",
            price: 100,
            priceNew: 80,
            discountPercentage: 20
        }
    ];

    return NextResponse.json({
        success: true,
        message: "Lấy danh sách sản phẩm thành công",
        data: products
    });
}
