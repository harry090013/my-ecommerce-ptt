"use client"; // Bắt buộc phải có dòng này để dùng hook usePathname và Zustand Store

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, User, Menu } from "lucide-react";
import { useEffect, useState } from "react";
// 1. Import Store giỏ hàng mà chúng ta vừa tạo ở Bước 2
import { useCartStore } from "@/store/useCartStore";

export default function Header() {
  const pathname = usePathname();
  
  // 2. Lấy tổng số lượng sản phẩm từ Store
  const totalItems = useCartStore((state) => state.getTotalItems());
  
  // 3. Xử lý Hydration: Đảm bảo dữ liệu LocalStorage được nạp xong trước khi hiển thị badge
  // (Tránh lỗi lệch dữ liệu giữa Server và Client trong Next.js)
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { name: "Trang chủ", href: "/" },
    { name: "Sản phẩm", href: "/products" },
    { name: "Tin tức", href: "/news" },
    { name: "Liên hệ", href: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-blue-600 tracking-tight">Minh Hồng Biotech</span>
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
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Các nút bấm */}
        <div className="flex items-center gap-5">
          <button className="text-gray-600 hover:text-blue-600 transition-colors">
            <User size={22} />
          </button>
          
          <Link href="/cart" className="relative text-gray-600 hover:text-blue-600 transition-colors">
            <ShoppingCart size={22} />
            
            {/* 4. HIỂN THỊ CON SỐ THẬT: Chỉ hiện badge đỏ nếu có hàng trong giỏ */}
            {mounted && totalItems > 0 && (
              <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white animate-in zoom-in duration-300">
                {totalItems}
              </span>
            )}
          </Link>
          
          <button className="md:hidden text-gray-600">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}