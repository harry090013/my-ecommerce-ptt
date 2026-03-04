import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/data/products";

// Định nghĩa kiểu dữ liệu đầu vào cho Component
interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Hàm format tiền tệ VNĐ
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
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
            disabled={!product.inStock}
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
              product.inStock 
                ? "bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white" 
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
            title="Thêm vào giỏ hàng"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}