import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { products } from "@/data/products";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Gom toàn bộ ngữ cảnh và câu hỏi vào một prompt duy nhất
    const prompt = `
      Bạn là nhân viên tư vấn của HarryShop.
      Danh sách sản phẩm hiện có: ${JSON.stringify(products)}
      
      Khách hàng vừa hỏi: "${message}"
      
      Quy tắc: Dựa vào danh sách trên để trả lời ngắn gọn, thân thiện. Nếu không có sản phẩm khách hỏi, hãy báo không có.
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("=== LỖI GEMINI ===", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}