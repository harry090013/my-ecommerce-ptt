"use client";
import { useState, useEffect } from "react";
import { MessageCircle, X, Send, Bot, Sparkles } from "lucide-react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  // THÊM TIN NHẮN CHÀO MỪNG MẶC ĐỊNH
  const [chatHistory, setChatHistory] = useState<{role: string, text: string}[]>([
    { 
      role: "bot", 
      text: "Chào bạn! Thật vui vì bạn ở đây! Bạn đang quan tâm về dòng sản phẩm nào của Minh Hồng vậy?" 
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    const userMsg = { role: "user", text: message };
    setChatHistory(prev => [...prev, userMsg]);
    setMessage("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();

      if (!res.ok) {
        setChatHistory(prev => [...prev, { 
          role: "bot", 
          text: `⚠️ Hệ thống đang bảo trì một chút. Phan Thanh sẽ quay lại hỗ trợ bạn sớm nhất!` 
        }]);
      } else {
        setChatHistory(prev => [...prev, { role: "bot", text: data.text }]);
      }
    } catch (err) {
      setChatHistory(prev => [...prev, { role: "bot", text: "❌ Lỗi kết nối. Vui lòng thử lại sau." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {isOpen ? (
        <div className="bg-white w-[380px] h-[550px] rounded-3xl shadow-2xl flex flex-col border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-300">
          {/* Header Xịn Xò */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-5 text-white flex justify-between items-center shadow-lg">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Bot size={24} />
              </div>
              <div>
                <span className="font-bold block text-sm">Trợ lý Minh Hồng</span>
                <span className="text-[10px] opacity-80 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                  Đang trực tuyến
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Khung Chat */}
          <div className="flex-grow p-5 overflow-y-auto space-y-4 bg-gray-50/50">
            {chatHistory.map((chat, i) => (
              <div key={i} className={`flex ${chat.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                  chat.role === "user" 
                    ? "bg-blue-600 text-white shadow-md rounded-tr-none" 
                    : "bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-none"
                }`}>
                  {chat.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-blue-500 font-medium">
                <Sparkles size={14} className="animate-spin" /> AI đang tìm câu trả lời...
              </div>
            )}
          </div>

          {/* Ô Nhập Tin Nhắn */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex items-center gap-2 bg-gray-100 rounded-2xl px-4 py-2 focus-within:ring-2 focus-within:ring-blue-400 transition-all">
              <input 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Hỏi mọi điều bạn muốn..." 
                className="flex-grow text-sm bg-transparent outline-none py-2"
                disabled={isLoading}
              />
              <button 
                onClick={handleSendMessage} 
                disabled={isLoading || !message.trim()}
                className="text-blue-600 hover:scale-110 active:scale-95 transition-all disabled:opacity-30"
              >
                <Send size={20} />
              </button>
            </div>
            <p className="text-[10px] text-center text-gray-400 mt-3 italic">
              Được vận hành bởi công nghệ Gemini 3.
              By Phan Thị Thanh
            </p>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="relative group bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:bg-blue-700 transition-all active:scale-90"
        >
          <MessageCircle size={32} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-bounce"></span>
          {/* Tooltip nhỏ khi hover */}
          <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-[10px] px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Minh Hồng đang online!
          </span>
        </button>
      )}
    </div>
  );
}