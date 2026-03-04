import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowRight, Search } from "lucide-react";

export const metadata = {
  title: "Tin tức công nghệ | HarryShop",
  description: "Cập nhật những xu hướng và mẹo vặt công nghệ mới nhất",
};

// Dữ liệu mẫu bài viết (Sau này sếp có thể tách ra file riêng như products.ts)
const allArticles = [
  {
    id: 1,
    title: "Đánh giá chi tiết Tai nghe chống ồn Sony WH-1000XM5",
    category: "Đánh giá",
    date: "04/03/2026",
    author: "Harry",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=800",
    excerpt: "Sony WH-1000XM5 không chỉ là một chiếc tai nghe, đó là một trải nghiệm âm thanh hoàn hảo với khả năng chống ồn vượt trội so với thế hệ trước..."
  },
  {
    id: 2,
    title: "Cách setup bàn làm việc tối giản (Minimalist Setup)",
    category: "Mẹo vặt",
    date: "01/03/2026",
    author: "Admin",
    image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=800",
    excerpt: "Một không gian làm việc sạch sẽ giúp bạn tăng năng suất lao động. Hãy cùng HarryShop khám phá 5 bước để có một setup tối giản..."
  },
  {
    id: 3,
    title: "Bàn phím cơ và những điều bạn cần biết trước khi mua",
    category: "Kiến thức",
    date: "28/02/2026",
    author: "Kỹ thuật",
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=800",
    excerpt: "Switch là gì? Keycap là gì? Tại sao giá bàn phím cơ lại chênh lệch nhau nhiều đến thế? Bài viết này sẽ giải đáp tất cả..."
  },
  {
    id: 4,
    title: "Tại sao nên sử dụng chuột công thái học?",
    category: "Sức khỏe",
    date: "20/02/2026",
    author: "Harry",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=800",
    excerpt: "Đau cổ tay khi làm việc lâu là vấn đề của nhiều người. Chuột công thái học chính là giải pháp cứu cánh cho bạn..."
  },
];

export default function NewsPage() {
  const featuredPost = allArticles[0]; // Bài viết nổi bật đầu tiên
  const regularPosts = allArticles.slice(1); // Các bài còn lại

  return (
    <div className="bg-white min-h-screen">
      {/* Tiêu đề trang & Tìm kiếm */}
      <section className="bg-gray-50 py-12 border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Tin tức & Đánh giá</h1>
          <p className="text-gray-500 mb-8 max-w-xl mx-auto">
            Nơi chia sẻ kiến thức, kinh nghiệm và những xu hướng công nghệ mới nhất dành cho bạn.
          </p>
          <div className="relative max-w-md mx-auto">
            <input 
              type="text" 
              placeholder="Tìm kiếm bài viết..." 
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* BÀI VIẾT NỔI BẬT (FEATURED) */}
        <div className="mb-16">
          <Link href={`/news/${featuredPost.id}`} className="group grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="relative h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-lg">
              <Image src={featuredPost.image} alt={featuredPost.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-bold mb-4 uppercase tracking-wider">
                {featuredPost.category}
              </span>
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                {featuredPost.title}
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2"><Calendar size={16} /> {featuredPost.date}</div>
                <div className="flex items-center gap-2"><User size={16} /> {featuredPost.author}</div>
              </div>
            </div>
          </Link>
        </div>

        {/* DANH SÁCH BÀI VIẾT THƯỜNG */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {regularPosts.map((post) => (
            <Link key={post.id} href={`/news/${post.id}`} className="group flex flex-col">
              <div className="relative h-56 rounded-2xl overflow-hidden mb-4 shadow-sm">
                <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="flex items-center gap-3 text-xs font-semibold text-blue-600 mb-2">
                <span>{post.category}</span>
                <span className="text-gray-300">•</span>
                <span className="text-gray-400 font-normal">{post.date}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 line-clamp-2 transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-500 text-sm line-clamp-3 mb-4">
                {post.excerpt}
              </p>
              <div className="mt-auto flex items-center gap-1 text-sm font-bold text-gray-900 group-hover:gap-2 transition-all">
                Đọc thêm <ArrowRight size={16} />
              </div>
            </Link>
          ))}
        </div>

        {/* NÚT TẢI THÊM (PHÂN TRANG MOCKUP) */}
        <div className="mt-16 text-center">
          <button className="px-8 py-3 rounded-full border-2 border-blue-600 text-blue-600 font-bold hover:bg-blue-600 hover:text-white transition-all shadow-md">
            Xem thêm bài viết
          </button>
        </div>
      </div>
    </div>
  );
}