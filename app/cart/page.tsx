"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/useCartStore";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCartStore();
  const [mounted, setMounted] = useState(false);

  // Xử lý Hydration để đồng bộ dữ liệu LocalStorage
  useEffect(() => {
    setMounted(true);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  if (!mounted) return null;

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          <ShoppingBag className="text-blue-600" /> Giỏ hàng của bạn
        </h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100">
            <div className="mb-6 flex justify-center">
              <div className="bg-blue-50 p-6 rounded-full">
                <ShoppingBag size={48} className="text-blue-400" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Giỏ hàng đang trống</h2>
            <p className="text-gray-500 mb-8">Có vẻ như bạn chưa chọn được sản phẩm nào ưng ý.</p>
            <Link 
              href="/products" 
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
            >
              <ArrowLeft size={18} /> Quay lại mua sắm
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* DANH SÁCH SẢN PHẨM */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 flex items-center gap-4 md:gap-6">
                  {/* Ảnh sản phẩm */}
                  <div className="relative h-24 w-24 md:h-32 md:w-32 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>

                  {/* Thông tin & Điều chỉnh */}
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-800 md:text-lg line-clamp-1">{item.name}</h3>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                    
                    <p className="text-blue-600 font-bold mb-4">{formatPrice(item.price)}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-200 transition-colors text-gray-600"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4 font-bold text-gray-800 min-w-[40px] text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-200 transition-colors text-gray-600"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <p className="font-bold text-gray-900">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              <Link href="/products" className="inline-flex items-center gap-2 text-blue-600 font-bold hover:underline py-2">
                <ArrowLeft size={18} /> Tiếp tục chọn thêm sản phẩm
              </Link>
            </div>

            {/* TỔNG KẾT ĐƠN HÀNG */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-blue-50 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
                  Tóm tắt đơn hàng
                </h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-gray-500">
                    <span>Tạm tính</span>
                    <span>{formatPrice(getTotalPrice())}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Phí vận chuyển</span>
                    <span className="text-green-500 font-medium">Miễn phí</span>
                  </div>
                  <div className="pt-4 border-t border-gray-100 flex justify-between items-end">
                    <span className="font-bold text-gray-900">Tổng cộng</span>
                    <span className="text-2xl font-black text-blue-600">
                      {formatPrice(getTotalPrice())}
                    </span>
                  </div>
                </div>

                <Link 
                  href="/checkout" // Chúng ta sẽ làm trang này hoặc quay lại form ở trang chủ
                  className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 hover:-translate-y-1"
                >
                  Tiến hành đặt hàng
                </Link>
                
                <p className="mt-4 text-center text-xs text-gray-400">
                  Hỗ trợ thanh toán khi nhận hàng (COD)
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}