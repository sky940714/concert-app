import { useState, useRef, useEffect } from 'react';
import { Headphones, Send } from 'lucide-react';

interface Message {
  id: number;
  type: 'bot' | 'user';
  text: string;
}

export const SupportHub = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, type: 'bot', text: '指揮官您好，系統 AI 已上線。請問有什麼能為您效勞？' }
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
    <div className="h-[calc(100dvh-80px)] flex flex-col px-4 pt-4 pb-24 bg-black text-white font-sans">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Headphones size={20} className="text-cyan-400" /> 通訊中心
      </h2>
      
      <div className="flex-1 bg-zinc-900/30 border border-white/10 rounded-2xl flex flex-col overflow-hidden relative backdrop-blur-sm">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
        
        <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto space-y-4 scroll-smooth">
          {messages.map(m => (
            <div key={m.id} className={`flex ${m.type === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}>
              <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                m.type === 'user' 
                  ? 'bg-cyan-600/80 text-white rounded-tr-none shadow-lg' 
                  : 'bg-zinc-800/80 text-gray-200 rounded-tl-none border border-white/5'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-3 bg-black/60 border-t border-white/10 flex gap-2 relative z-10 backdrop-blur-md">
          <input 
            type="text" 
            value={input} 
            onChange={e => setInput(e.target.value)} 
            onKeyPress={e => e.key === 'Enter' && handleSend()} 
            placeholder="輸入加密訊息..." 
            className="flex-1 bg-zinc-900/50 border border-white/10 rounded-full px-4 py-2 text-white text-sm focus:border-cyan-500 outline-none placeholder:text-gray-600 transition-colors" 
          />
          <button 
            onClick={handleSend} 
            className="bg-cyan-600 text-white p-2.5 rounded-full hover:bg-cyan-500 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/20"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};