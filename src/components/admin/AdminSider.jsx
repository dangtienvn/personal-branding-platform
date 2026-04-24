import Link from "next/link";

export default function AdminSider() {
    return (
        <div className="sider">
            <div className="inner-menu">
                <ul>
                    <li>
                        <Link href="/admin/dashboard">Overview</Link>
                    </li>
                    <li>
                        <Link href="/admin/products/categories">Product Categories</Link>
                    </li>
                    <li>
                        <Link href="/admin/products">Products</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
