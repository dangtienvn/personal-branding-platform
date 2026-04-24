import Link from "next/link";
import { getProducts } from "@/services/blog.service";

export default async function BlogsPage() {
    // Lấy dữ liệu trực tiếp từ PostgreSQL (không cần fetch qua API trung gian)
    const posts = await getProducts();

    return (
        <div className="container my-3">
            <h1 className="mb-4">Danh sách bài viết</h1>
            <div className="row">
                {posts.map((item) => (
                    <div className="col-4 mb-3" key={item.id}>
                        <div className="card h-100">
                            <div className="card-img-top position-relative" style={{ height: "200px" }}>
                                {/* Tạm dùng thẻ img thường nếu chưa cấu hình domains cho next/image */}
                                <img 
                                    src={item.thumbnail || "/images/logo.jpg"} 
                                    alt={item.title}
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                                {item.discountPercentage > 0 && (
                                    <span className="badge bg-danger position-absolute top-0 end-0 m-2">
                                        -{item.discountPercentage}%
                                    </span>
                                )}
                            </div>
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{item.title}</h5>
                                <div className="mt-auto">
                                    {item.priceNew ? (
                                        <div className="d-flex align-items-baseline gap-2">
                                            <span className="fs-5 fw-bold text-danger">{item.priceNew}$</span>
                                            <span className="text-muted text-decoration-line-through">{item.price}$</span>
                                        </div>
                                    ) : (
                                        <span className="fs-5 fw-bold text-danger">{item.price ? `${item.price}$` : 'Miễn phí'}</span>
                                    )}
                                </div>
                                <Link href={`/blogs/${item.id}`} className="btn btn-primary mt-3 w-100">
                                    Đọc bài viết
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
