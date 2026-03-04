export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  category: string;
  image: string;
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: "sp-01",
    name: "Tai nghe Bluetooth chống ồn Pro",
    slug: "tai-nghe-bluetooth-chong-on-pro",
    price: 1590000,
    description: "Tai nghe không dây cao cấp với công nghệ chống ồn chủ động (ANC), pin sử dụng liên tục 24 giờ. Phù hợp cho dân văn phòng và người hay di chuyển.",
    category: "Phụ kiện",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
    inStock: true,
  },
  {
    id: "sp-02",
    name: "Bàn phím cơ không dây RGB",
    slug: "ban-phim-co-khong-day-rgb",
    price: 2150000,
    description: "Bàn phím cơ switch đỏ gõ êm, kết nối đa thiết bị qua Bluetooth và receiver 2.4Ghz. Có đèn nền RGB tùy chỉnh.",
    category: "Bàn phím",
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=800&auto=format&fit=crop",
    inStock: true,
  },
  {
    id: "sp-03",
    name: "Chuột công thái học Wireless",
    slug: "chuot-cong-thai-hoc-wireless",
    price: 850000,
    description: "Thiết kế ôm tay giảm mỏi cổ tay khi làm việc lâu. Mắt đọc quang học độ nhạy cao, pin sạc Type-C tiện lợi.",
    category: "Chuột",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=800&auto=format&fit=crop",
    inStock: false,
  },
  {
    id: "sp-04",
    name: "Chuột công thái học Wireless",
    slug: "chuot-cong-thai-hoc-wireless",
    price: 850000,
    description: "Thiết kế ôm tay giảm mỏi cổ tay khi làm việc lâu. Mắt đọc quang học độ nhạy cao, pin sạc Type-C tiện lợi.",
    category: "Chuột",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=800&auto=format&fit=crop",
    inStock: false,
  },
  {
    id: "sp-05",
    name: "Chuột công thái học Wireless",
    slug: "chuot-cong-thai-hoc-wireless",
    price: 850000,
    description: "Thiết kế ôm tay giảm mỏi cổ tay khi làm việc lâu. Mắt đọc quang học độ nhạy cao, pin sạc Type-C tiện lợi.",
    category: "Chuột",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=800&auto=format&fit=crop",
    inStock: false,
  }
];