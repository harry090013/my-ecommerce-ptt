import { Mail, Phone, User, MapPin, Send, MessageSquare } from "lucide-react";

export default function ContactSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Tiêu đề Marketing */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">
            Lan tỏa lối sống <span className="text-blue-600">Xanh & Sạch</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Mọi thắc mắc về sản phẩm sinh học Minh Hồng hoặc cần tư vấn, cô Hồng luôn sẵn sàng hỗ trợ bạn.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* CỘT TRÁI: THÔNG TIN LIÊN HỆ */}
          <div className="space-y-8">
            <div className="bg-blue-50 rounded-3xl p-8 border border-blue-100 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <MessageSquare className="text-blue-600" /> Thông tin kết nối
              </h3>
              
              <div className="space-y-6">
                {/* Tên chủ cửa hàng */}
                <div className="flex items-center gap-4 group">
                  <div className="bg-white p-3 rounded-2xl shadow-sm text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <User size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Người đại diện</p>
                    <p className="text-lg font-bold text-gray-800">Phan Thị Thanh</p>
                  </div>
                </div>

                {/* Số điện thoại */}
                <div className="flex items-center gap-4 group">
                  <div className="bg-white p-3 rounded-2xl shadow-sm text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Hotline hỗ trợ</p>
                    <p className="text-lg font-bold text-gray-800">123 456 789</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-4 group">
                  <div className="bg-white p-3 rounded-2xl shadow-sm text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Email tư vấn</p>
                    <p className="text-lg font-bold text-gray-800">phanthithanh@gmail.com</p>
                  </div>
                </div>

                {/* Địa chỉ - Placeholder cho Duy Xuyên */}
                <div className="flex items-center gap-4 group">
                  <div className="bg-white p-3 rounded-2xl shadow-sm text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Địa chỉ văn phòng</p>
                    <p className="text-lg font-bold text-gray-800">Hải Châu, Thành Phố Đà Nẵng</p>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-gray-400 italic px-4">
              * Chúng tôi cam kết phản hồi các yêu cầu tư vấn trong vòng 24h làm việc.
            </p>
          </div>

          {/* CỘT PHẢI: FORM LIÊN HỆ */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Gửi tin nhắn cho chúng tôi</h3>
            <form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input 
                  type="text" 
                  placeholder="Họ và tên của bạn" 
                  className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                />
                <input 
                  type="tel" 
                  placeholder="Số điện thoại" 
                  className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                />
              </div>
              <input 
                type="email" 
                placeholder="Địa chỉ Email (nếu có)" 
                className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
              />
              <textarea 
                rows={4} 
                placeholder="Nội dung bạn cần tư vấn về sản phẩm sinh học..." 
                className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all resize-none"
              ></textarea>
              
              <button className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-blue-700 hover:shadow-xl hover:-translate-y-1 transition-all shadow-lg shadow-blue-100">
                GỬI YÊU CẦU TƯ VẤN <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}