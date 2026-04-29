import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Nơi chia sẻ kiến thức & trải nghiệm lập trình
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Chào mừng bạn đến với NexBlog. Tại đây mình chia sẻ về Next.js, PostgreSQL và những câu chuyện thực tế trong quá trình xây dựng thương hiệu cá nhân.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button asChild size="lg">
            <Link href="/blogs">Đọc bài viết</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/admin/dashboard">Quản trị viên</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
