import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowRight, Search } from "lucide-react";
// 1. Import kho dữ liệu chung từ thư mục data ở gốc dự án
import { articles } from "../../data/articles";

export const metadata = {
  title: "Minh Hồng Biotech",
  description: "Cập nhật những sản phẩm sinh học đến từ Minh Hồng Biotech.",
};

export default function NewsPage() {
  // 2. Tự động lấy bài viết mới nhất làm bài viết Nổi bật (Featured)
  const featuredPost = articles[0]; 
  // 3. Các bài viết còn lại sẽ nằm trong danh sách bên dưới
  const regularPosts = articles.slice(1);

  return (
    <div className="bg-white min-h-screen">
      {/* Tiêu đề trang & Tìm kiếm */}
      <section className="bg-gray-50 py-16 border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Tin tức & Chia sẻ</h1>
          <p className="text-gray-500 mb-8 max-w-2xl mx-auto text-lg">
            Nơi Minh Hồng chia sẻ những trải nghiệm thực tế về công nghệ, sức khỏe và hành trình xây dựng nên những sản phẩm từ hữu cơ.
          </p>
          <div className="relative max-w-md mx-auto">
            <input 
              type="text" 
              placeholder="Tìm kiếm bài viết..." 
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all shadow-sm"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* BÀI VIẾT NỔI BẬT (FEATURED) */}
        {featuredPost && (
          <div className="mb-20">
            <Link href={`/news/${featuredPost.id}`} className="group grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="relative h-[350px] md:h-[450px] rounded-3xl overflow-hidden shadow-2xl">
                <Image 
                  src={featuredPost.image} 
                  alt={featuredPost.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700" 
                  priority
                />
              </div>
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-blue-600 text-white text-xs font-bold mb-6 uppercase tracking-widest">
                  {featuredPost.category}
                </span>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 group-hover:text-blue-600 transition-colors leading-tight">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-600 text-xl mb-8 leading-relaxed line-clamp-3">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-6 text-sm text-gray-400 font-medium">
                  <div className="flex items-center gap-2"><Calendar size={18} className="text-blue-600" /> {featuredPost.date}</div>
                  <div className="flex items-center gap-2"><User size={18} className="text-blue-600" /> {featuredPost.author}</div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* DANH SÁCH BÀI VIẾT THƯỜNG */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {regularPosts.map((post) => (
            <Link key={post.id} href={`/news/${post.id}`} className="group flex flex-col">
              <div className="relative h-60 rounded-2xl overflow-hidden mb-6 shadow-md">
                <Image 
                  src={post.image} 
                  alt={post.title} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-500" 
                />
              </div>
              <div className="flex items-center gap-3 text-xs font-bold text-blue-600 mb-3 uppercase tracking-wider">
                <span>{post.category}</span>
                <span className="text-gray-300">•</span>
                <span className="text-gray-400 font-normal">{post.date}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 line-clamp-2 transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-500 text-sm line-clamp-3 mb-6 leading-relaxed">
                {post.excerpt}
              </p>
              <div className="mt-auto flex items-center gap-2 text-sm font-black text-gray-900 group-hover:text-blue-600 transition-all">
                ĐỌC BÀI VIẾT <ArrowRight size={16} />
              </div>
            </Link>
          ))}
        </div>

        {/* NÚT TẢI THÊM */}
        {articles.length > 4 && (
          <div className="mt-20 text-center">
            <button className="px-10 py-4 rounded-full bg-gray-900 text-white font-bold hover:bg-blue-600 transition-all shadow-xl hover:-translate-y-1">
              Xem thêm nhiều bài viết hơn
            </button>
          </div>
        )}
      </div>
    </div>
  );
}