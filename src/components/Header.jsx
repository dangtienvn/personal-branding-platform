import Link from "next/link";
import Image from "next/image";

export default function Header() {
    return (
        <header>
            <div className="header">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-3">
                            <div className="inner-logo">
                                <Link href="/">
                                    {/* Make sure the image is in the public folder */}
                                    <Image src="/images/logo.jpg" alt="Logo" width={60} height={60} style={{ objectFit: "cover", borderRadius: "50%" }} />
                                </Link>
                            </div>
                        </div>
                        <div className="col-9">
                            <div className="inner-menu">
                                <ul>
                                    <li>
                                        <Link href="/">Trang chủ</Link>
                                    </li>
                                    <li>
                                        <Link href="/blogs">Bài viết</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
