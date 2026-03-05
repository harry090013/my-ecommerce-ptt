"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/useCartStore";
import { ArrowLeft, CreditCard, Truck, CheckCircle, ShieldCheck } from "lucide-react";

export default function CheckoutPage() {
  const { cart, getTotalPrice, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Giả lập xử lý đơn hàng
    setIsOrdered(true);
    clearCart();
  };

  if (!mounted) return null;

  // Nếu đã đặt hàng thành công, hiện giao diện Thank You
  if (isOrdered) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="bg-blue-50 p-6 rounded-full mb-6">
          <CheckCircle size={64} className="text-blue-600 animate-bounce" />
        </div>
        <h1 className="text-4xl font-black text-gray-900 mb-4 text-center">Đặt hàng thành công!</h1>
        <p className="text-gray-500 text-lg text-center max-w-md mb-8">
          Cảm ơn Harry đã tin tưởng **Minh Hồng Biotech**. Mã đơn hàng của bạn là #MH{Math.floor(Math.random() * 10000)}. Chúng tôi sẽ gọi điện xác nhận ngay!
        </p>
        <Link href="/" className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold shadow-lg hover:bg-blue-700 transition-all">
          Quay về trang chủ
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <Link href="/cart" className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-8 font-medium transition-colors">
          <ArrowLeft size={18} /> Quay lại giỏ hàng
        </Link>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* CỘT TRÁI: THÔNG TIN GIAO HÀNG */}
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                Thông tin nhận hàng
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Họ và tên</label>
                  <input required type="text" placeholder="Nguyễn Văn A" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Số điện thoại</label>
                  <input required type="tel" placeholder="090..." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email (không bắt buộc)</label>
                  <input type="email" placeholder="harry@example.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Địa chỉ chi tiết</label>
                  <input required type="text" placeholder="Số nhà, tên đường, Phường/Xã..." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                Phương thức thanh toán
              </h2>
              <div className="space-y-3">
                <label className="flex items-center gap-4 p-4 border-2 border-blue-600 bg-blue-50 rounded-2xl cursor-pointer">
                  <input type="radio" name="payment" defaultChecked className="w-5 h-5 text-blue-600" />
                  <div className="flex items-center gap-3">
                    <Truck className="text-blue-600" />
                    <div>
                      <p className="font-bold text-gray-900">Thanh toán khi nhận hàng (COD)</p>
                      <p className="text-xs text-gray-500">Bạn chỉ thanh toán khi đã nhận được hàng.</p>
                    </div>
                  </div>
                </label>
                <label className="flex items-center gap-4 p-4 border-2 border-gray-100 rounded-2xl cursor-pointer hover:border-blue-200 transition-all">
                  <input type="radio" name="payment" className="w-5 h-5 text-blue-600" />
                  <div className="flex items-center gap-3">
                    <CreditCard className="text-gray-400" />
                    <div>
                      <p className="font-bold text-gray-900">Chuyển khoản ngân hàng</p>
                      <p className="text-xs text-gray-500">Nhận thông tin STK sau khi đặt hàng.</p>
                    </div>
                  </div>
                </label>
              </div>
            </section>
          </div>

          {/* CỘT PHẢI: TÓM TẮT ĐƠN HÀNG */}
          <div className="lg:pl-8">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Đơn hàng của bạn ({cart.length})</h2>
              
              <div className="max-h-[300px] overflow-y-auto mb-6 pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 mb-4 pb-4 border-b border-gray-50 last:border-0">
                    <div className="relative h-16 w-16 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-sm font-bold text-gray-800 line-clamp-1">{item.name}</h3>
                      <p className="text-xs text-gray-500">Số lượng: {item.quantity}</p>
                      <p className="text-sm font-bold text-blue-600">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-gray-100">
                <div className="flex justify-between text-gray-500">
                  <span>Tạm tính</span>
                  <span>{formatPrice(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Phí giao hàng</span>
                  <span className="text-green-500 font-medium">Miễn phí</span>
                </div>
                <div className="flex justify-between items-end pt-4">
                  <span className="font-bold text-gray-900 text-lg">Tổng thanh toán</span>
                  <span className="text-3xl font-black text-blue-600">{formatPrice(getTotalPrice())}</span>
                </div>
              </div>

              <button type="submit" className="w-full bg-blue-600 text-white font-bold py-5 rounded-2xl mt-8 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2 text-lg">
                <ShieldCheck size={24} /> XÁC NHẬN ĐẶT HÀNG
              </button>
              
              <p className="text-center text-xs text-gray-400 mt-6 leading-relaxed">
                Bằng cách đặt hàng, bạn đồng ý với các Điều khoản dịch vụ và Chính sách bảo mật của **Minh Hồng Biotech**.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}