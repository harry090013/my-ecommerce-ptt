"use client"; // Bắt buộc phải có để dùng State cho Carousel và Form

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, Send, CheckCircle2 } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";

// --- DỮ LIỆU MẪU (Mock Data) ---
const carouselItems = [
  { id: 1, image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200", title: "Công nghệ đột phá 2026", desc: "Khám phá các thiết bị thông minh thế hệ mới nhất." },
  { id: 2, image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1200", title: "Góc làm việc hoàn hảo", desc: "Nâng tầm không gian sáng tạo và hiệu suất của bạn." },
  { id: 3, image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=1200", title: "Phụ kiện đỉnh cao", desc: "Trải nghiệm âm thanh và hình ảnh sắc nét không giới hạn." },
];

const articles = [
  { id: 1, title: "Top 5 tai nghe chống ồn tốt nhất", image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=400", date: "04/03/2026", excerpt: "Đánh giá chi tiết các dòng tai nghe được ưa chuộng nhất năm nay..." },
  { id: 2, title: "Bí quyết setup góc làm việc tối giản", image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=400", date: "01/03/2026", excerpt: "Tối ưu hóa không gian làm việc của bạn để tăng 200% sự tập trung..." },
  { id: 3, title: "Bàn phím cơ là gì? Tại sao nên dùng?", image: "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=400", date: "25/02/2026", excerpt: "Những lý do bạn nên vứt bỏ bàn phím màng và nâng cấp ngay lập tức..." },
];

export default function Home() {
  // --- LOGIC CAROUSEL ---
  const [currentSlide, setCurrentSlide] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }, 5000); // Tự động chuyển ảnh sau 5 giây
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);

  // --- LOGIC FORM ĐẶT HÀNG ---
  const [isOrdered, setIsOrdered] = useState(false);
  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrdered(true);
    setTimeout(() => setIsOrdered(false), 3000); // Tắt thông báo sau 3s
  };

  const featuredProducts = products.slice(0, 3); // Lấy 3 sản phẩm đầu tiên

  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* 2. MUA SẮM THÔNG MINH (Hero Section) */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Mua sắm thông minh cùng <span className="text-blue-600">Trợ lý AI</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Trải nghiệm phong cách mua sắm thế hệ mới. Trò chuyện ngay với AI ở góc màn hình để tìm sản phẩm phù hợp nhất.
          </p>
        </div>
      </section>

      {/* 3. CAROUSEL HÌNH ẢNH */}
      <section className="relative w-full max-w-6xl mx-auto px-4 py-8">
        <div className="relative h-[300px] md:h-[500px] w-full overflow-hidden rounded-2xl group">
          {carouselItems.map((item, index) => (
            <div 
              key={item.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"}`}
            >
              <Image src={item.image} alt={item.title} fill className="object-cover" priority={index === 0} sizes="100vw" />
              {/* Lớp phủ màu đen mờ để dễ đọc chữ */}
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-4">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 animate-in slide-in-from-bottom-5">{item.title}</h2>
                <p className="text-white/90 text-lg md:text-xl max-w-xl animate-in slide-in-from-bottom-8 delay-150">{item.desc}</p>
              </div>
            </div>
          ))}
          
          {/* Nút điều hướng Carousel */}
          <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100">
            <ChevronLeft size={24} />
          </button>
          <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100">
            <ChevronRight size={24} />
          </button>
        </div>
      </section>

      {/* 4. BÀI VIẾT NỔI BẬT (Tin tức) */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Bài viết mới nhất</h2>
            <Link href="/news" className="text-blue-600 font-medium hover:underline flex items-center gap-1">
              Xem thêm tin tức <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((article) => (
              <div key={article.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                <div className="relative h-48 overflow-hidden">
                  <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold text-blue-600 mb-2 block">{article.date}</span>
                  <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 cursor-pointer">{article.title}</h3>
                  <p className="text-gray-500 text-sm line-clamp-3">{article.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SẢN PHẨM NỔI BẬT */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Sản phẩm nổi bật</h2>
            <Link href="/products" className="text-blue-600 font-medium hover:underline flex items-center gap-1">
              Xem tất cả <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Ô ĐẶT MUA NHANH */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Đặt mua nhanh chóng</h2>
            <p className="text-blue-100">Điền thông tin bên dưới, nhân viên của chúng tôi sẽ gọi lại xác nhận ngay!</p>
          </div>

          <form onSubmit={handleOrder} className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl text-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Họ và tên</label>
                <input required type="text" placeholder="Nguyễn Văn A" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                <input required type="tel" placeholder="0901234567" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
              </div>
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sản phẩm muốn mua</label>
                  <select required className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer">
                    <option value="">-- Chọn sản phẩm --</option>
                    {products.map(p => <option key={p.id} value={p.id}>{p.name} - {p.price.toLocaleString('vi-VN')}đ</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Số lượng</label>
                  <input required type="number" min="1" defaultValue="1" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Địa chỉ nhận hàng</label>
                <input required type="text" placeholder="Số nhà, Tên đường, Phường/Xã, Quận/Huyện, Tỉnh/TP" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
              </div>
            </div>
            
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-200">
              {isOrdered ? (
                <><CheckCircle2 size={20} /> Đã gửi yêu cầu thành công!</>
              ) : (
                <><Send size={20} /> Xác nhận đặt hàng</>
              )}
            </button>
          </form>
        </div>
      </section>

    </div>
  );
}