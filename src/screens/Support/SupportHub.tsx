import { useState, useRef, useEffect } from 'react';
import { Headphones, Send, Bot, User } from 'lucide-react';

interface Message {
  id: number;
  type: 'bot' | 'user';
  text: string;
}

export const SupportHub = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, type: 'bot', text: '陳曉明您好，ai客服已上線。請問有什麼能為您效勞？' }
  ]);
  const [input, setInput] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { id: Date.now(), type: 'user', text: input }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', text: '收到訊息。正在分析您的請求...' }]);
    }, 1000);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="h-[100dvh] flex flex-col px-6 pt-12 pb-32 bg-[#E0F7FA] font-sans text-slate-600">
      
      {/* 標題區 */}
      <div className="mb-6 pl-2 flex items-center justify-between shrink-0">
        <div>
           <h1 className="text-3xl font-black tracking-tight text-slate-700 clay-text-title flex items-center gap-3">
            <div className="bg-white p-2.5 rounded-2xl shadow-sm">
              <Headphones className="text-[#FF8A65] animate-pulse" size={28} strokeWidth={3} />
            </div>
            通訊中心
          </h1>
          <p className="text-xs font-bold text-slate-400 mt-2 ml-1 tracking-wide uppercase">AI Support System</p>
        </div>
      </div>
      
      {/* 聊天室主容器 (白色黏土卡片) */}
      <div className="clay-card-white flex-1 flex flex-col overflow-hidden relative">
        
        {/* 對話列表 */}
        <div ref={chatContainerRef} className="flex-1 p-5 overflow-y-auto space-y-6 scroll-smooth no-scrollbar">
          {messages.map(m => (
            <div key={m.id} className={`flex gap-3 ${m.type === 'user' ? 'flex-row-reverse' : 'flex-row'} animate-in slide-in-from-bottom-2 duration-300`}>
              
              {/* 頭像：圓潤的小圖標 */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                m.type === 'user' ? 'bg-[#FF8A65] text-white' : 'bg-white border border-slate-100 text-[#99E6D9]'
              }`}>
                {m.type === 'user' ? <User size={16} strokeWidth={3} /> : <Bot size={16} strokeWidth={3} />}
              </div>

              {/* 氣泡：不同顏色與圓角的黏土塊 */}
              <div className={`max-w-[75%] p-4 rounded-2xl text-sm font-bold leading-relaxed shadow-sm ${
                m.type === 'user' 
                  ? 'bg-[#FF8A65] text-white rounded-tr-none shadow-[4px_4px_8px_rgba(255,138,101,0.3)]' 
                  : 'bg-white text-slate-600 border border-slate-100 rounded-tl-none shadow-[2px_2px_5px_rgba(0,0,0,0.03)]'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>
        
        {/* 輸入區域 */}
        <div className="p-4 bg-white border-t border-slate-50 flex gap-3 items-center rounded-b-[2rem]">
          {/* 輸入框：壓入式設計 (Inset) */}
          <input 
            type="text" 
            value={input} 
            onChange={e => setInput(e.target.value)} 
            onKeyPress={e => e.key === 'Enter' && handleSend()} 
            placeholder="輸入訊息..." 
            className="clay-inset flex-1 px-5 py-3.5 text-slate-600 text-sm font-bold bg-[#DAF0F5] rounded-full focus:outline-none focus:ring-2 focus:ring-[#99E6D9]/50 placeholder:text-slate-400 transition-all" 
          />
          {/* 發送按鈕：Q彈糖果 */}
          <button 
            onClick={handleSend} 
            disabled={!input.trim()}
            className="clay-btn-orange w-12 h-12 flex items-center justify-center rounded-full disabled:opacity-50 disabled:shadow-none transition-all hover:scale-105 active:scale-90"
          >
            <Send size={20} strokeWidth={3} className="ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
};