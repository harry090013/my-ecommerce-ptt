"use client"; // Bắt buộc phải có để dùng State cho Carousel và Form

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, Send, CheckCircle2 } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";
import { articles } from "../data/articles";

// Component nhỏ để xử lý việc đếm số khi lướt đến
const CounterItem = ({ endValue, label }: { endValue: number; label: string }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.5 }
    );
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 2000; // Chạy trong 2 giây
    const increment = endValue / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= endValue) {
        setCount(endValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, endValue]);

  return (
    <div ref={elementRef} className="flex flex-col items-center text-white">
      <span className="text-6xl md:text-8xl font-light mb-4">{count}</span>
      <span className="text-xl md:text-2xl font-medium tracking-widest uppercase">{label}</span>
    </div>
  );
};


// --- DỮ LIỆU MẪU (Mock Data) ---
const carouselItems = [
  { id: 1, image: "/images/carosel1.png", title: "Sản phẩm từ Enzyme thực vật", desc: "Sản phẩm sinh học Minh Hồng được lên men Enzyme từ vỏ rau, củ, hoa, quả,..." },
  { id: 2, image: "/images/carosel2.png", title: "Thân thiện với môi trường", desc: "Nhờ chế tạo từ vỏ rau củ nên MH đã giúp tiêu thụ một lượng lớn rác hữu cơ thải ra môi trường, vỏ rau củ sau khi ủ xong có thể bón cây, nước thải từ các sản phẩm của MH có thể dùng để tưới cây hoặc thải ra môi trường để diệt lăng quăng, bọ gậy và không gay hại cho nguồn nước." },
  { id: 3, image: "/images/carosel3.png", title: "Ít bọt, ít nhờn, sạch nhanh, mùi dễ chịu.", desc: "Sản phẩm của Minh Hồng ít bọt và nhớt, nhờ vậy mà quá trình tẩy rửa trở nên nhẹ nhàng hơn khi xả sạch với ít lần nước nhưng vẫn đạt hiệu quả tẩy sạch sâu các vết bẩn." },
];

// const articles = [
//   { id: 1, title: "Top 5 tai nghe chống ồn tốt nhất", image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=400", date: "04/03/2026", excerpt: "Đánh giá chi tiết các dòng tai nghe được ưa chuộng nhất năm nay..." },
//   { id: 2, title: "Bí quyết setup góc làm việc tối giản", image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=400", date: "01/03/2026", excerpt: "Tối ưu hóa không gian làm việc của bạn để tăng 200% sự tập trung..." },
//   { id: 3, title: "Bàn phím cơ là gì? Tại sao nên dùng?", image: "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=400", date: "25/02/2026", excerpt: "Những lý do bạn nên vứt bỏ bàn phím màng và nâng cấp ngay lập tức..." },
// ];

export default function Home() {
  // --- LOGIC CAROUSEL ---
  const [currentSlide, setCurrentSlide] = useState(0);
  
// 2. Lấy ra 3 bài mới nhất (bài viết có ID lớn nhất hoặc nằm đầu mảng)
  const latestArticles = articles.slice(0, 3);

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
            Trải nghiệm phong cách mua sắm thế hệ mới. Trò chuyện ngay với AI ở góc màn hình để tìm sản phẩm từ Minh Hồng Biotech phù hợp nhất với bạn.
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
            {latestArticles.map((article) => (
              <Link 
                key={article.id} 
                href={`/news/${article.id}`} 
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all group block"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image 
                    src={article.image} 
                    alt={article.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                    sizes="(max-width: 768px) 100vw, 33vw" 
                  />
                  {/* Badge danh mục bài viết */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider shadow-lg">
                      {article.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-5">
                  <span className="text-xs font-semibold text-gray-400 mb-2 block">{article.date}</span>
                  <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                  
                  <div className="mt-4 flex items-center text-blue-600 text-sm font-bold gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Đọc thêm <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
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

      {/* 6. PHẦN GIẢI THƯỞNG & CHỨNG NHẬN (SOCIAL PROOF) */}
      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            
            {/* Cột trái: Hình ảnh sản phẩm tiêu biểu */}
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                <Image 
                  src="/images/Nuocruachen.png"
                  alt="Sản phẩm tiêu biểu"
                  fill
                  className="object-cover"
                />
                {/* Lớp phủ trang trí cho ảnh thêm sang trọng */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>

            {/* Cột phải: Nội dung giải thưởng */}
            <div className="w-full md:w-1/2">
              <div className="inline-block h-1 w-20 bg-blue-600 mb-6"></div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                Các Giải Thưởng Đã Đạt Được
              </h2>
              <p className="text-gray-500 mb-10 leading-relaxed italic">
                Sự khẳng định về chất lượng và uy tín thông qua các giải thưởng danh giá trong và ngoài nước.
              </p>

              {/* Danh sách giải thưởng */}
              <div className="space-y-10">
                {/* Giải thưởng 1 */}
                <div className="relative pl-8 border-l-2 border-green-500">
                  <h3 className="text-xl font-bold text-green-700 mb-2">Giải thưởng môi trường 2017</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Giải thưởng Môi trường Việt Nam là giải thưởng do Bộ TN&MT trao tặng cho các tổ chức, cá nhân có thành tích xuất sắc trong sự nghiệp bảo vệ môi trường.
                  </p>
                </div>

                {/* Giải thưởng 2 */}
                <div className="relative pl-8 border-l-2 border-green-500">
                  <h3 className="text-xl font-bold text-green-700 mb-2">Giải nhất toàn quốc HATCH!FAIR 2016</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    HATCH! FAIR 2016 với chủ đề "INVISIBLE TECHNOLOGY" là chương trình triển lãm và hội nghị khởi nghiệp lớn nhất tại Việt Nam, thu hút hàng nghìn khách tham dự.
                  </p>
                </div>

                {/* Giải thưởng 3 */}
                <div className="relative pl-8 border-l-2 border-green-500">
                  <h3 className="text-xl font-bold text-green-700 mb-2">Đứng thứ 5 khối KT ĐNA về ảnh hưởng xã hội 2017</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Được đánh giá cao về những đóng góp tích cực cho cộng đồng và sự phát triển bền vững tại khu vực Đông Nam Á.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7.  PHẦN THỐNG KÊ (STATISTICS COUNTER) */}
      <section className="relative py-28 overflow-hidden">
        {/* Background Image với lớp phủ màu xanh đặc trưng */}
        <div className="absolute inset-0 z-0">
          
          {/* Lớp phủ màu xanh Mint giống trong ảnh Harry gửi */}
          <div className="absolute inset-0 bg-[#50C878]/80 mix-blend-multiply"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
            <CounterItem endValue={100} label="Đại Lý" />
            <CounterItem endValue={5} label="Nhà Phân Phối" />
            <CounterItem endValue={8} label="Sản Phẩm" />
            <CounterItem endValue={3} label="Giải Thưởng" />
          </div>
        </div>
      </section>      

      {/* 8. Ô ĐẶT MUA NHANH */}
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