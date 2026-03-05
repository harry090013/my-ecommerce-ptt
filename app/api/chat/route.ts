import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "Thiếu API Key" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Sử dụng hậu tố -latest và TẠM THỜI BỎ systemInstruction để test kết nối gốc
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash-latest" 
    });

    const result = await model.generateContent(message);
    const response = await result.response;
    
    return NextResponse.json({ text: response.text() });

  } catch (error: any) {
    console.error("LỖI CHI TIẾT:", error.message);
    return NextResponse.json(
      { error: "Lỗi kết nối API", detail: error.message }, 
      { status: 500 }
    );
  }
}