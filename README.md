This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Project Structure

- `src/app`: Next.js pages
- `src/components`: Reusable components
- `src/services`: API services
- `src/utils`: Utility functions
- `backend`: Express backend
- `shared`: Shared models

personal-branding-platform/
├── src/
│ ├── app/ <-- (FRONTEND) Nơi chứa Giao diện & Định tuyến
│ │ ├── (Client Pages)  
│ │ │ ├── page.js (Trang chủ /)
│ │ │ └── products/ (Trang Danh sách & Chi tiết Sản phẩm)
│ │ ├── admin/ <-- Phân khu Admin
│ │ │ ├── dashboard/ (Trang Tổng quan Admin)
│ │ │ └── products/ (Quản lý Sản phẩm & Danh mục)
│ │ │
│ │ └── api/ <-- (TÙY CHỌN) Nơi xuất API cho App Mobile (nếu có)
│ │
│ ├── services/ <-- (BACKEND) Nơi chứa toàn bộ Logic Server & Query SQL
│ │ ├── admin.product.service.js
│ │ ├── category.service.js
│ │ └── auth.service.js
│ │
│ ├── components/ <-- Nơi chứa các mảnh UI dùng chung (Header, Footer, Nút bấm)
│ │
│ ├── lib/ <-- Nơi chứa cấu hình kết nối cốt lõi
│ │ └── db.js (Kết nối PostgreSQL)
│ │
│ └── utils/ <-- Nơi chứa các hàm hỗ trợ (Format ngày, Tạo Tree...)
│
├── public/ <-- Nơi chứa Ảnh tĩnh, CSS dùng chung
└── package.json

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
