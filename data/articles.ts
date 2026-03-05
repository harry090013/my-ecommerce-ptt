export interface Article {
  id: number;
  title: string;
  category: string;
  date: string;
  author: string;
  image: string;
  excerpt: string;
  content: string; // Đây là nơi sếp viết Markdown để in đậm, in nghiêng
}

export const articles: Article[] = [
  {
    id: 1,
    title: "Nước Lau Sàn Sinh Học Là Gì?",
    category: "Giải đáp câu hỏi",
    date: "17/11/2020",
    author: "Minh Hồng",
    image: "/images/Nuoclausansinhhoclagi.png",
    excerpt: "Với nỗi lo thường trực những loại côn trùng, vi khuẩn trên sàn nhà bẩn sẽ gây hại tới sức khỏe của cả nhà, các bà mẹ thường dùng nước lau sàn diệt côn trùng để loại trừ các loại côn trùng gây hại như ruồi muỗi, kiến gián,…",
    content: `Chưa có content`

  },
  {
    id: 2,
    title: "Nước giặt sinh học thiên nhiên an toàn cho da",
    category: "Giải đáp câu hỏi",
    date: "2020-11-17",
    author: "Minh Hồng",
    image: "/images/nuocgiatxaantoan.png",
    excerpt: "Nước giặt sinh học thiên nhiên hay các chế phẩm sinh học thường có đặc điểm gì?",
  content: `
## Đặc điểm nổi bật của nước giặt sinh học

Nếu bạn đang thắc mắc tại sao các bà mẹ hiện đại lại tin dùng nước giặt sinh học, thì đây chính là những lý do:

* **Hương thơm nhẹ dịu:** Thường mang tinh dầu tự nhiên như **bạc hà** hoặc **Java**... và đặc biệt là **không lưu hương quá nồng** sau khi giặt, tránh gây kích ứng khứu giác.
* **An toàn cho da:** Nước giặt sinh học cực kỳ **nhẹ dịu với làn da**, kể cả da nhạy cảm hay da em bé.
* **Giá thành hợp lý:** Dù là sản phẩm công nghệ xanh nhưng mức giá hiện nay đã rất tối ưu cho túi tiền gia đình.
* **Thành phần tự nhiên:** 100% thành phần chính có **nguồn gốc từ thực vật**, không chứa hóa chất tẩy rửa mạnh.

---

## Vậy mua nước giặt sinh học thiên nhiên ở đâu uy tín?

Để chọn được sản phẩm chất lượng, HarryShop gợi ý bạn 3 cách:

1. **Hệ thống cửa hàng sạch:** Mua tại các siêu thị tiện ích, siêu thị hàng tiêu dùng Việt Nam uy tín.
2. **Lời khuyên từ người thân:** Tham khảo thông tin từ bạn bè đã thực tế sử dụng sản phẩm.
3. **Tìm kiếm Online:** Tham khảo các đánh giá trực tuyến để tìm kiếm dòng sản phẩm phù hợp nhất với nhu cầu gia đình.

> **Lời kết từ HarryShop:** > Chúng ta đang sống trong **thời đại xanh**. Các sản phẩm thủ công từ thời ông bà ta nay đã được cải tiến với tác dụng tẩy rửa tốt hơn, thơm hơn và bảo quản lâu hơn. Dùng nước giặt sinh học không chỉ là bảo vệ làn da của bạn mà còn là hành động thiết thực để **làm sạch môi trường** sống xung quanh.
  `
  },
  {
    id: 3,
    title: "NƯỚC LAU SÀN TỰ NHIÊN VỚI 9 CÔNG DỤNG ĐA NĂNG",
    category: "Giải đáp câu hỏi",
    date: "17/11/2020",
    author: "Minh Hồng",
    image: "/images/congdungnuoclausan.png",
    excerpt: "Nước lau sàn tự nhiên với 9 công dụng đa năng là gì vậy? 1. Lau sàn đuổi côn trùng: ruồi, kiến, gián. 2. Lau sàn khử mùi nc tiểu chó mèo.",
    content: ``
  
},
  
];