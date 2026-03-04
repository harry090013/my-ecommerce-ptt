"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User as UserIcon, Loader2 } from "lucide-react";

// Định nghĩa kiểu dữ liệu cho tin nhắn
interface Message {
  role: "user" | "model";
  text: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", text: "Xin chào sếp! Tôi là AI của HarryShop. Sếp cần tư vấn sản phẩm gì nào? 🤖" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Tự động cuộn xuống tin nhắn mới nhất
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setIsLoading(true);

    try {
      // Chuyển đổi lịch sử chat cho đúng chuẩn Gemini
      const history = messages.slice(1).map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      // Gọi API sếp vừa tạo
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg, history }),
      });

      const data = await res.json();
      
      if (data.text) {
        setMessages((prev) => [...prev, { role: "model", text: data.text }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { role: "model", text: "Ối, tôi đang bị lỗi kết nối rùi! 🥲" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {isOpen && (
        <div className="mb-4 w-[360px] rounded-2xl bg-white shadow-2xl border border-gray-100 overflow-hidden flex flex-col h-[500px] animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-blue-600 p-4 flex justify-between items-center text-white shadow-sm">
            <div className="flex items-center gap-2">
              <Bot size={24} />
              <span className="font-semibold tracking-wide">AI HarryShop</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-blue-700 p-1 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Vùng hiển thị tin nhắn */}
          <div className="flex-1 p-4 overflow-y-auto bg-slate-50 flex flex-col gap-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-2 max-w-[85%] ${msg.role === "user" ? "self-end flex-row-reverse" : "self-start"}`}>
                <div className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full ${msg.role === "user" ? "bg-blue-100 text-blue-600" : "bg-gray-200 text-gray-600"}`}>
                  {msg.role === "user" ? <UserIcon size={16} /> : <Bot size={16} />}
                </div>
                <div className={`p-3 rounded-2xl shadow-sm text-sm leading-relaxed whitespace-pre-wrap ${msg.role === "user" ? "bg-blue-600 text-white rounded-tr-sm" : "bg-white border border-gray-100 text-gray-700 rounded-tl-sm"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2 max-w-[85%] self-start">
                 <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-600"><Bot size={16} /></div>
                 <div className="p-3 bg-white border border-gray-100 rounded-2xl rounded-tl-sm shadow-sm flex items-center"><Loader2 size={16} className="animate-spin text-blue-600" /></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Ô nhập liệu */}
          <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Hỏi tôi về sản phẩm nhé..."
              className="flex-1 px-4 py-2.5 bg-gray-100 border-transparent rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-blue-600 text-white p-2.5 rounded-full hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50"
            >
              <Send size={18} className="ml-1" />
            </button>
          </div>
        </div>
      )}

      {!isOpen && (
        <button onClick={() => setIsOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110 hover:-translate-y-1 animate-bounce">
          <MessageCircle size={28} />
        </button>
      )}
    </div>
  );
}