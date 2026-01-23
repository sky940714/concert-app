import React, { useState } from 'react';
import { 
  Disc, 
  Calendar, 
  MapPin, 
  ChevronRight, 
  Clock, 
  Ticket as TicketIcon, 
  CheckCircle2,
  ScanFace, // 用於 Face ID 模擬
  ShieldCheck, // 用於驗證成功圖示
  Lock // 用於鎖定狀態
} from 'lucide-react';
import type { Ticket } from '../../types';
import { MOCK_TICKETS, MOCK_PAST_TICKETS } from '../../data';

interface TicketWalletProps {
  onSelectTicket: (ticket: Ticket) => void;
  onSelectPastTicket: (ticket: Ticket) => void;
}

export const TicketWallet = ({ onSelectTicket, onSelectPastTicket }: TicketWalletProps) => {
  // 控制 Face ID 模擬彈窗的狀態
  const [isVerifying, setIsVerifying] = useState(false);
  const [selectedPendingTicket, setSelectedPendingTicket] = useState<Ticket | null>(null);
  const [authStatus, setAuthStatus] = useState<'idle' | 'scanning' | 'success'>('idle');

  // 處理點擊「進入場館」按鈕
  const handleEntryRequest = (ticket: Ticket) => {
    setSelectedPendingTicket(ticket);
    setIsVerifying(true);
    setAuthStatus('idle');
  };

  // 模擬驗證過程
  const startMockAuth = () => {
    setAuthStatus('scanning');
    // 模擬 1.5 秒的人臉掃描時間
    setTimeout(() => {
      setAuthStatus('success');
      // 成功後延遲一下再進入 QR Code 頁面，增加儀式感
      setTimeout(() => {
        setIsVerifying(false);
        if (selectedPendingTicket) {
          onSelectTicket(selectedPendingTicket);
        }
      }, 800);
    }, 1500);
  };

  return (
    <div className="pb-32 px-6 pt-12 bg-[#E0F7FA] h-[100dvh] overflow-y-auto no-scrollbar font-sans relative">
      
      {/* --- 演示用：Face ID 模擬驗證畫面 --- */}
      {isVerifying && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-8">
          {/* 背景高斯模糊遮罩 */}
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xl animate-in fade-in duration-300" />
          
          {/* 模擬 iOS 彈窗容器 */}
          <div className="relative bg-white/90 backdrop-blur-2xl rounded-[3rem] p-8 w-full max-w-sm shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-white/50 text-center animate-in zoom-in duration-300">
            <div className="flex justify-center mb-6">
              <div className={`w-24 h-24 rounded-3xl flex items-center justify-center transition-all duration-500 ${
                authStatus === 'success' ? 'bg-green-500 rotate-[360deg]' : 'bg-slate-800'
              } shadow-lg`}>
                {authStatus === 'success' ? (
                  <ShieldCheck size={56} className="text-white" />
                ) : (
                  <ScanFace size={56} className={`text-white ${authStatus === 'scanning' ? 'animate-pulse' : ''}`} />
                )}
              </div>
            </div>
            
            <h3 className="text-2xl font-black text-slate-800 mb-2">
              {authStatus === 'idle' && "身分核對"}
              {authStatus === 'scanning' && "掃描人臉中..."}
              {authStatus === 'success' && "驗證成功"}
            </h3>
            <p className="text-sm text-slate-500 font-medium mb-10 leading-relaxed">
              為了確保票券安全，<br/>請使用生物辨識驗證本人身分
            </p>
            
            <div className="space-y-3">
              {authStatus === 'idle' && (
                <button 
                  onClick={startMockAuth}
                  className="w-full py-4 bg-slate-800 text-white rounded-2xl font-bold active:scale-95 transition-all shadow-lg"
                >
                  開始 Face ID 驗證
                </button>
              )}
              
              <button 
                onClick={() => setIsVerifying(false)}
                className="w-full py-4 text-slate-400 font-bold hover:text-slate-600 transition-colors"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 標題區 */}
      <div className="relative z-10 mb-10 pl-2">
        <div className="flex items-center gap-3">
          <div className="bg-white p-3 rounded-2xl shadow-sm">
            <Disc className="animate-spin-slow text-[#FF8A65]" size={28} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-700">我的票夾</h1>
            <p className="text-[10px] text-slate-400 font-bold tracking-[0.2em] uppercase mt-1 ml-0.5">Ticket Wallet</p>
          </div>
        </div>
      </div>
      
      {/* 即將演出區塊 */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-5 px-2">
          <h2 className="text-sm font-black text-[#FF8A65] tracking-widest uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF8A65] animate-pulse"/> 
            立刻入場
          </h2>
          <span className="text-[10px] font-bold text-slate-400 bg-white/60 px-2 py-1 rounded-lg">
            {MOCK_TICKETS.length} 張票券
          </span>
        </div>

        <div className="space-y-6">
          {MOCK_TICKETS.map((ticket) => (
            <div 
              key={ticket.id} 
              className="clay-card-white p-2 cursor-pointer group transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative overflow-hidden rounded-[1.8rem] bg-white p-6 pb-8">
                {/* 票券狀態標籤 */}
                <div className="flex justify-between items-start mb-6">
                  <div className="bg-teal-50 border border-teal-100 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                    <Lock size={12} className="text-teal-600" strokeWidth={3} />
                    <span className="text-[10px] font-black text-teal-700 uppercase">已實名鎖定</span>
                  </div>
                  <div className="text-slate-200">
                    <TicketIcon size={24} className="opacity-20" />
                  </div>
                </div>

                <h3 className="text-2xl font-black leading-tight text-slate-700 mb-4 group-hover:text-[#FF8A65] transition-colors">
                  {ticket.event}
                </h3>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  <div className="bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl flex items-center gap-2 text-slate-500">
                    <Calendar size={14} className="text-[#99E6D9]" strokeWidth={3} />
                    <span className="text-xs font-bold">{ticket.date}</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl flex items-center gap-2 text-slate-500">
                    <MapPin size={14} className="text-[#99E6D9]" strokeWidth={3} />
                    <span className="text-xs font-bold">{ticket.venue}</span>
                  </div>
                </div>

                <div className="flex justify-between items-end mt-4">
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">座位</div>
                    <div className="text-lg font-black text-slate-700">{ticket.seat}</div>
                  </div>
                  
                  {/* 改良後的按鈕：強調安全感 */}
                  <button 
                    onClick={() => handleEntryRequest(ticket)}
                    className="clay-btn-orange px-5 py-3 flex items-center gap-2 shadow-orange-100"
                  >
                    <span className="text-sm font-black">出示通行碼</span> {/* ✅ 統一更名 */}
                    <ChevronRight size={16} strokeWidth={4} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 歷史票券 */}
      <div>
        <h2 className="text-sm font-black text-slate-400 mb-5 px-2 tracking-widest uppercase flex items-center gap-2">
          <Clock size={14} strokeWidth={3} /> 珍藏回憶
        </h2>
        
        <div className="space-y-4">
          {MOCK_PAST_TICKETS.map((ticket) => (
            <div 
              key={ticket.id} 
              onClick={() => onSelectPastTicket(ticket)} 
              className="clay-inset p-4 flex justify-between items-center cursor-pointer transition-all active:scale-[0.98] hover:bg-white/40"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-xl">
                  {ticket.img}
                </div>
                <div>
                  <div className="font-bold text-slate-600 text-sm mb-0.5">{ticket.event}</div>
                  <div className="text-[10px] font-bold text-slate-400 bg-white/50 px-1.5 py-0.5 rounded inline-block">
                    {ticket.date}
                  </div>
                </div>
              </div>
              <CheckCircle2 size={18} className="text-slate-300" strokeWidth={3} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};