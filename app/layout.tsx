import type { Metadata } from "next";
// Giữ nguyên các import có sẵn của bạn ở đây (ví dụ: Geist, globals.css...)
import "./globals.css";

// 1. Import Header và Footer chúng ta vừa tạo
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// 2. ô chat
import ChatWidget from "@/components/chat/ChatWidget";

export const metadata: Metadata = {
  title: "Minh Hồng Biotech",
  description: "Website e-commerce của Phan Thanh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      {/* 2. Thêm class flex để đảm bảo Footer luôn bị đẩy xuống cuối trang */}
      <body className={`flex flex-col min-h-screen antialiased bg-gray-50`} suppressHydrationWarning>
        <Header />
        
        {/* 3. Thẻ main này sẽ chứa nội dung thay đổi của từng trang (Trang chủ, Sản phẩm...) */}
        <main className="flex-grow">
          {children}
        </main>

        <Footer />
        {/* 2. Đặt Khung chat ở đây, nó sẽ tự động trôi nổi trên toàn bộ website */}
        <ChatWidget />
      </body>
    </html>
  );
}