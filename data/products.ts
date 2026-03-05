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
    id: "sp1",
    name: "Nước Rửa Chén 4,2 lít ",
    slug: "Nước rửa chén Minh Hồng 4,2 lít",
    price: 220000,
    description: "Thành phần: Dung dịch enzyme lên men từ thực vật , LAS , Cocamidopropyl Betaine , Cellulose Ether, Natri Hydroxide, Tinh dầu sả chanh thiên nhiên, Natri Benzoat , Muối NaCL.",
    category: "Nước rửa chén",
    image: "/images/Nuocruachen.png",
    inStock: true,
  },
  {
    id: "sp2",
    name: "Nước Lau Sàn 4,2 lít ",
    slug: "Nước lau sàn Minh Hồng 4,2 lít",
    price: 200000,
    description: "THÀNH PHẦN: Dung dịch enzyme lên men từ thực vật, LAS , Cellulose Ether , Natri Hydroxide, Tinh dầu quế thiên nhiên, Natri Benzoat, Muối NaCL. Chiết xuất Enzyme lên men từ thực vật, Lau sàn để đuổi côn trùng, khử mùi sạch kể cả mùi nước tiểu chó mèo,  Lau bàn ăn để tránh ruồi bu, lau kính, rửa xe, lau tường gạch,.. Hương thơm từ tinh dầu quế dễ chịu.",
    category: "Nước Lau Sàn",
    image: "/images/Nuoclausan.png",
    inStock: true,
  },
  {
    id: "sp3",
    name: "Nước Giặt Xả 4,2 lít ",
    slug: "Nước Giặt Xả Minh Hồng 4,2 lít",
    price: 240000,
    description: "THÀNH PHẦN: Dung dịch enzyme lên men từ thực vật, LAS, Cocamidopropyl Betaine, Cellulose Ether, Natri Hydroxide, Tinh dầu bạc hà thiên nhiên, Natri Benzoat, Muối NaCl. Giặt sạch vết bẩn. Tiết kiệm hơn khi xả nhanh sạch với nước. Mang hương thơm của nắng sau khi phơi khô. Khử mùi tốt, ngâm đồ qua đêm không bị hôi. Quần áo mềm mại hơn không cần dùng nước xả. Nước thải ra môi trường sẽ làm sạch môi trường nước và làm giảm lượng muỗi đáng kể.",
    category: "Nước Giặt Xả",
    image: "/images/Nuocgiatxa.png",
    inStock: true,
  },
  
];