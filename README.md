# PersonalBrand — Personal Branding Platform

Hệ thống personal-branding cho blog/portfolio/freelancer, tối ưu để trình bày trong phỏng vấn.

## Mô tả nhanh

Xây dựng backend Node.js + Express với kiến trúc Modular MVC + Service Layer, MongoDB, xác thực JWT, admin dashboard và client server-rendered (Pug). Tập trung vào các điểm kỹ thuật dễ trình bày trong CV/phỏng vấn.

## Tại sao nên đưa dự án này vào CV / trình bày phỏng vấn

- Vai trò: Thiết kế kiến trúc, hiện thực API, authentication, upload file, dashboard.
- Điểm nổi bật kỹ thuật: Modular MVC, service layer, JWT auth, secure password, file upload, pagination, input validation.
- Gợi ý kể chuyện phỏng vấn: mục tiêu, thách thức, cách bạn giải quyết (ví dụ: refresh token, secure upload, tối ưu query).

## Điểm nhấn khi demo (bullet points)

- Kiến trúc: `Modular MVC + Service Layer` (mỗi domain có model/controller/service/route).
- Bảo mật: JWT + refresh token, bcrypt password hashing.
- Tối ưu: pagination, filter/sort trên API, index DB.
- Developer DX: centralized error handling, env config, scripts dev.

## Công nghệ chính

- Node.js, Express
- MongoDB, Mongoose
- Pug (SSR)
- JWT, bcrypt
- npm, nodemon

## Cấu trúc

```
personal-branding/
├─ backend/
│  ├─ modules/
│  │   ├─ auth/
│  │   ├─ post/
│  │   ├─ user/
│  │   └─ admin/
│  ├─ shared/
│  │   ├─ config/
│  │   ├─ middleware/
│  │   └─ utils/
│  └─ app.js
├─ public/
└─ views/ (Pug)
```

## Chạy nhanh (dev)

1. Cài dependencies:

```
npm install
```

2. Chạy:

```
npm run dev
```

## Gợi ý demo trong phỏng vấn

1. Mở admin dashboard → chỉ ra metrics (users/orders)
2. Tạo user mới → đăng nhập → show token trong DevTools
3. Thực hiện upload ảnh → giải thích flow lưu trữ
4. Mở `modules/post/post.service.js` để minh họa separation of concerns
