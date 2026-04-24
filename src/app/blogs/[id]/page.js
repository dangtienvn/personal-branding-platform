import Image from "next/image";
import { getProducts } from "@/services/blog.service"; // Tạm dùng list để minh hoạ

export default async function ProductDetailPage({ params }) {
    // Đọc ID từ URL
    const { id } = params;
    
    // Tạm lấy danh sách và bóc ra 1 cái (Thực tế sẽ gọi hàm getProductById(id))
    const posts = await getProducts();
    const post = posts[0];

    if (!post) {
        return <div className="container mt-4">Bài viết không tồn tại</div>;
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-6">
                    <div className="position-relative" style={{ height: "400px" }}>
                        <Image 
                            src={post.thumbnail || "/images/logo.jpg"} 
                            alt={post.title} 
                            fill 
                            style={{ objectFit: "contain" }}
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <h1 className="mb-3">{post.title}</h1>
                    <div className="price-box mb-3">
                        {post.priceNew && (
                            <h2 className="text-danger fw-bold mb-0">
                                {post.priceNew}$ 
                                <span className="fs-6 text-muted text-decoration-line-through ms-2">
                                    {post.price}$
                                </span>
                            </h2>
                        )}
                        {!post.priceNew && (
                            <h2 className="text-danger fw-bold mb-0">{post.price ? `${post.price}$` : 'Miễn phí'}</h2>
                        )}
                        {post.discountPercentage && (
                            <span className="badge bg-danger ms-2">-{post.discountPercentage}%</span>
                        )}
                    </div>
                    <p className="lead">{post.description || "Đây là nội dung bài viết..."}</p>
                    <button className="btn btn-primary btn-lg mt-3">Lưu bài viết</button>
                </div>
            </div>
        </div>
    );
}
