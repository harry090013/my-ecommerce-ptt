"use client"; // Bắt buộc phải có để sử dụng onClick và Store

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import { Product } from "@/data/products";
import { useCartStore } from "@/store/useCartStore"; // Import store chúng ta vừa tạo

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [isAdded, setIsAdded] = useState(false);

  // Hàm format tiền tệ VNĐ
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // --- BƯỚC 3: LOGIC THÊM VÀO GIỎ ---
  const handleAddToCart = (e: React.MouseEvent) => {
    // Ngăn chặn sự kiện nổi bọt (không cho click vào nút bị nhảy vào Link của thẻ cha)
    e.stopPropagation();
    e.preventDefault();

    addToCart(product);
    
    // Hiệu ứng phản hồi cho khách hàng (Marketing UX)
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 transition-all hover:shadow-lg hover:-translate-y-1">
      {/* Khung chứa ảnh */}
      <Link href={`/products/${product.slug}`} className="relative aspect-square overflow-hidden bg-gray-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Badge Hết hàng (nếu có) */}
        {!product.inStock && (
          <div className="absolute top-3 right-3 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
            Hết hàng
          </div>
        )}
      </Link>

      {/* Thông tin sản phẩm */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-600">
          {product.category}
        </div>
        
        <Link href={`/products/${product.slug}`}>
          <h3 className="line-clamp-2 text-lg font-bold text-gray-800 transition-colors hover:text-blue-600">
            {product.name}
          </h3>
        </Link>
        
        <p className="mt-2 line-clamp-2 text-sm text-gray-500">
          {product.description}
        </p>

        {/* Phần Giá và Nút Thêm vào giỏ hàng */}
        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="text-xl font-extrabold text-gray-900">
            {formatPrice(product.price)}
          </span>
          
          <button 
            onClick={handleAddToCart}
            disabled={!product.inStock || isAdded}
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${
              !product.inStock 
                ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                : isAdded 
                  ? "bg-green-500 text-white" // Đổi sang màu xanh lá khi đã thêm
                  : "bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white"
            }`}
            title={isAdded ? "Đã thêm" : "Thêm vào giỏ hàng"}
          >
            {isAdded ? <Check size={20} /> : <ShoppingCart size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
}