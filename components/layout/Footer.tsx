import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-auto border-t border-gray-800">
      <div className="container mx-auto px-4 max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Minh Hồng Biotech</h3>
          <p className="text-sm leading-relaxed text-gray-400">
            Hệ thống cửa hàng cung cấp các sản phẩm công nghệ chất lượng cao. Trải nghiệm mua sắm thông minh cùng Trợ lý AI 24/7.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Liên kết nhanh</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/" className="hover:text-white transition-colors">Trang chủ</Link></li>
            <li><Link href="/products" className="hover:text-white transition-colors">Tất cả sản phẩm</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Chính sách bảo hành</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Liên hệ</h3>
          <p className="text-sm text-gray-400 mb-2">Email: phanthithanh@gmail.com</p>
          <p className="text-sm text-gray-400">Hotline: 0123 456 789</p>
        </div>
      </div>
      <div className="container mx-auto max-w-6xl px-4 mt-8 pt-6 border-t border-gray-800 text-sm text-center text-gray-500">
        © {new Date().getFullYear()} Phan Thị Thanh. All rights reserved.
      </div>
    </footer>
  );
}