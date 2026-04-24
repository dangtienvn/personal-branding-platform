import Link from "next/link";

export default function Home() {
  return (
    <div className="container mt-5 mb-5">
      <h1>Trang chủ</h1>
      <br />
      <Link href="/admin/dashboard" className="btn btn-primary mb-3 me-2">Đi đến trang tổng quan của admin</Link>
      <br />
      <Link href="/blogs" className="btn btn-success mb-3 me-2">Đi đến trang bài viết của client</Link>
      <br />
      <Link href="/admin/blogs" className="btn btn-danger mb-3 me-2">Đi đến trang bài viết của admin</Link>
    </div>
  );
}
