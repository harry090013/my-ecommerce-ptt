"use client"; // Bắt buộc phải có dòng này để dùng hook usePathname

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, User, Menu } from "lucide-react";

export default function Header() {
  const pathname = usePathname(); // Lấy đường dẫn hiện tại của trình duyệt

  // Danh sách các menu để dễ quản lý
  const navLinks = [
    { name: "Trang chủ", href: "/" },
    { name: "Sản phẩm", href: "/products" },
    { name: "Tin tức", href: "/news" },
    { name: "Liên hệ", href: "/contact" },
  ];

  // Hàm kiểm tra xem menu có đang được chọn hay không
  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/"; // Trang chủ phải khớp tuyệt đối
    }
    return pathname.startsWith(path); // Các trang khác chỉ cần bắt đầu bằng (ví dụ /products/123 vẫn sáng menu Sản phẩm)
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-blue-600 tracking-tight">HarryShop</span>
        </Link>

        {/* Menu cho Desktop */}
        <nav className="hidden md:flex items-center gap-2 font-medium">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-5 py-2 rounded-full transition-all duration-300 ${
                  active
                    ? "bg-blue-600 text-white shadow-md" // 🌟 Nổi bật: Nền xanh, chữ trắng khi đang ở trang này
                    : "text-gray-600 hover:bg-blue-50 hover:text-blue-600" // Bình thường: Chữ xám, trỏ chuột vào nền xanh nhạt
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Các nút bấm: User, Giỏ hàng, Menu Mobile */}
        <div className="flex items-center gap-5">
          <button className="text-gray-600 hover:text-blue-600 transition-colors">
            <User size={22} />
          </button>
          
          <Link href="/cart" className="relative text-gray-600 hover:text-blue-600 transition-colors">
            <ShoppingCart size={22} />
            <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              3
            </span>
          </Link>
          
          <button className="md:hidden text-gray-600">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}