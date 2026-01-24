import React, { useState } from 'react';
import { Headphones, ChevronDown, HelpCircle, ShieldAlert, Smartphone, MessageSquare } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: 'tech' | 'onsite' | 'policy';
}

export const SupportHub = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      category: 'tech',
      question: "為什麼系統辨識不到我的身分證 (OCR 失敗)？",
      answer: "請確保環境光線充足，避免燈光直射證件造成反光。建議移除透明證件套後再次嘗試，並確認證件位於掃描框內。"
    },
    {
      category: 'tech',
      question: "活體辨識 (眨眼/轉頭) 一直顯示驗證失敗？",
      answer: "請確保面部光線均勻，移除口罩或深色墨鏡。請依照畫面指示「緩慢」執行動作，系統感測器需要時間捕捉特徵點。"
    },
    {
      category: 'tech',
      question: "系統提示「裝置不匹配」或「無法在此設備驗證」？",
      answer: "實名票券會與首次啟用的行動裝置進行安全綁定（UUID 鎖定）。若您更換了手機，請準備身分證件正本至官方賴做後續處理。"
    },
    {
      category: 'onsite',
      question: "如果手機沒電了，該如何出示實名票券？",
      answer: "請持報名時登記之身分證件正本至會場「票務服務台」。工作人員將透過後端系統核對您的身分證號與實名歸戶狀態，確認無誤後即可進場。"
    },
    {
      category: 'onsite',
      question: "網路連線不穩，打不開 App 怎麼辦？",
      answer: "App 設有離線緩存機制。只要您曾於有網路時完成實名驗證，系統會保留安全憑證。若仍無法開啟，請尋求現場工作人員協助。"
    },
    {
      category: 'policy',
      question: "實名制票券可以轉讓給親友嗎？",
      answer: "本活動採嚴格實名制，一旦票券完成匯入與身分綁定，將無法轉讓或修改持有人資訊。"
    },
    {
      category: 'policy',
      question: "活動當天幾點開放進場？有禁帶物品嗎？",
      answer: "詳細入場時間與禁帶物品清單（如攝影器材、易燃物等）請參閱主辦方官方公告或本 App 的活動詳細頁面。"
    }
  ];

  return (
    <div className="h-[100dvh] flex flex-col px-6 pt-12 pb-32 bg-[#F0F9FF] font-sans text-slate-600 overflow-y-auto no-scrollbar">
      
      {/* 標題區 */}
      <div className="mb-8 pl-2 shrink-0">
        <h1 className="text-3xl font-black tracking-tight text-slate-700 flex items-center gap-3">
          <div className="bg-white p-2.5 rounded-2xl shadow-sm border border-white/50">
            <Headphones className="text-indigo-500" size={28} strokeWidth={3} />
          </div>
          支援中心
        </h1>
        <p className="text-xs font-bold text-slate-400 mt-3 ml-1 tracking-[0.15em] uppercase">Automated Help Center</p>
      </div>

      {/* FAQ 列表容器 */}
      <div className="space-y-4">
        
        {/* 分類標籤提示 */}
        <div className="flex gap-2 mb-6 px-1">
          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-slate-100 shadow-sm">
            <ShieldAlert size={14} className="text-amber-500" />
            <span className="text-[10px] font-black text-slate-500">驗證排除</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-slate-100 shadow-sm">
            <Smartphone size={14} className="text-blue-500" />
            <span className="text-[10px] font-black text-slate-500">現場支援</span>
          </div>
        </div>

        {/* FAQ 項目渲染 */}
        {faqs.map((faq, index) => (
          <div 
            key={index}
            className={`transition-all duration-300 rounded-[1.8rem] border overflow-hidden ${
              openIndex === index 
                ? 'bg-white border-indigo-100 shadow-lg' 
                : 'bg-white/60 border-white shadow-sm'
            }`}
          >
            <button 
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full p-5 flex items-center justify-between text-left active:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center ${
                  faq.category === 'tech' ? 'bg-amber-50 text-amber-500' : 
                  faq.category === 'onsite' ? 'bg-blue-50 text-blue-500' : 'bg-slate-50 text-slate-400'
                }`}>
                  <HelpCircle size={18} />
                </div>
                <span className="text-sm font-black text-slate-700 leading-snug">
                  {faq.question}
                </span>
              </div>
              <ChevronDown 
                size={18} 
                className={`text-slate-300 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} 
              />
            </button>

            {/* 展開的答案區 */}
            <div 
              className={`transition-all duration-300 ease-in-out ${
                openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-5 pb-6 ml-12">
                <div className="h-px w-full bg-slate-50 mb-4" />
                <p className="text-xs font-bold text-slate-500 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 底部聯繫官方提示 */}
      <div className="mt-10 p-6 rounded-[2rem] bg-indigo-50 border border-indigo-100/50 flex flex-col items-center text-center space-y-3">
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
          <MessageSquare className="text-indigo-500" size={24} />
        </div>
        <div>
          <h4 className="text-sm font-black text-indigo-900">仍需要進一步協助？</h4>
          <p className="text-[10px] font-bold text-indigo-400 mt-1">請準備好身分證件正本聯繫官方 LINE 客服</p>
        </div>
        <button className="w-full py-3 bg-indigo-500 text-white rounded-xl text-xs font-black shadow-lg shadow-indigo-200 active:scale-95 transition-all">
          開啟官方 LINE
        </button>
      </div>

    </div>
  );
};