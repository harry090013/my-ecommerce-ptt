import { products } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";
import { PackageSearch } from "lucide-react";

export const metadata = {
  title: "Tất cả sản phẩm | HarryShop",
  description: "Khám phá bộ sưu tập thiết bị công nghệ đỉnh cao",
};

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl bg-white min-h-screen">
      {/* Phần Tiêu đề trang (Breadcrumbs / Header) */}
      <div className="mb-10 pb-6 border-b border-gray-100 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
            Sản phẩm của chúng tôi
          </h1>
          <p className="text-gray-500">
            Hiển thị tất cả {products.length} sản phẩm công nghệ hiện có.
          </p>
        </div>
        
        {/* Nút Lọc / Sắp xếp (Dạng UI minh họa cho đẹp) */}
        <div className="flex items-center gap-2">
          <select className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none transition-colors">
            <option>Mới nhất</option>
            <option>Giá: Thấp đến Cao</option>
            <option>Giá: Cao xuống Thấp</option>
          </select>
        </div>
      </div>

      {/* Lưới hiển thị Sản phẩm */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Giao diện khi không có sản phẩm nào */
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <PackageSearch size={64} className="mb-4 opacity-50" />
          <h3 className="text-xl font-semibold text-gray-700">Chưa có sản phẩm nào</h3>
          <p className="mt-2">Vui lòng quay lại sau nhé!</p>
        </div>
      )}
    </div>
  );
}