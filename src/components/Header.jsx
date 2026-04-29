import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
export default function Header() {
    return (
        <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-2">
                        <Image src="/images/logo.jpg" alt="Logo" width={40} height={40} className="rounded-full object-cover" />
                        <span className="font-bold text-xl tracking-tight">NexBlog</span>
                    </Link>
                    <nav className="hidden md:flex items-center gap-6">
                        <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">Trang chủ</Link>
                        <Link href="/blogs" className="text-sm font-medium hover:text-primary transition-colors">Bài viết</Link>
                        <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">Giới thiệu</Link>
                    </nav>
                </div>
                <div>
                    <Button asChild variant="default" size="sm">
                        <Link href="/admin/dashboard">Đăng nhập</Link>
                    </Button>
                </div>
            </div>
        </header>
    );

}