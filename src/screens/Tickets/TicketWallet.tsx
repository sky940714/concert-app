import { Disc, Calendar, MapPin, ChevronRight, Clock, Ticket as TicketIcon, CheckCircle2 } from 'lucide-react';
import type { Ticket } from '../../types';
import { MOCK_TICKETS, MOCK_PAST_TICKETS } from '../../data';

interface TicketWalletProps {
  onSelectTicket: (ticket: Ticket) => void;
  onSelectPastTicket: (ticket: Ticket) => void;
}

export const TicketWallet = ({ onSelectTicket, onSelectPastTicket }: TicketWalletProps) => (
  <div className="pb-32 px-6 pt-12 bg-[#E0F7FA] h-[100dvh] overflow-y-auto no-scrollbar font-sans selection:bg-[#99E6D9] selection:text-white">
    
    {/* 標題區：簡約大標題 + 裝飾 */}
    <div className="relative z-10 mb-10 pl-2">
      <div className="flex items-center gap-3">
        <div className="bg-white p-3 rounded-2xl shadow-sm">
          <Disc className="animate-spin-slow text-[#FF8A65]" size={28} strokeWidth={2.5} />
        </div>
        <div>
          <h1 className="text-3xl font-black clay-text-title tracking-tight text-slate-700">我的票夾</h1>
          <p className="text-xs text-slate-400 font-bold tracking-widest uppercase mt-1 ml-0.5">My Collection</p>
        </div>
      </div>
    </div>
    
    {/* 即將啟航 (Active) */}
    <div className="mb-12">
      <div className="flex items-center justify-between mb-5 px-2">
        <h2 className="text-sm font-black text-[#FF8A65] tracking-widest uppercase flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF8A65] animate-pulse"/> 
          即將演出
        </h2>
        <span className="text-[10px] font-bold text-slate-400 bg-white/60 px-2 py-1 rounded-lg">1 張票券</span>
      </div>

      <div className="space-y-6">
        {MOCK_TICKETS.map((ticket) => (
          <div 
            key={ticket.id} 
            onClick={() => onSelectTicket(ticket)} 
            className="clay-card-white p-2 cursor-pointer group transition-transform duration-300 hover:-translate-y-2"
          >
            {/* 卡片內部佈局 */}
            <div className="relative overflow-hidden rounded-[1.8rem] bg-white p-6 pb-8">
              
              {/* 頂部：票券狀態標籤 */}
              <div className="flex justify-between items-start mb-6">
                <div className="clay-card-mint px-3 py-1.5 flex items-center gap-1.5">
                  <TicketIcon size={14} className="text-teal-700" strokeWidth={3} />
                  <span className="text-[11px] font-black text-teal-800 tracking-wide">電子通行證</span>
                </div>
                <div className="text-slate-300">
                  <Disc size={24} className="opacity-20" />
                </div>
              </div>

              {/* 中間：活動資訊 */}
              <h3 className="text-2xl font-black leading-tight text-slate-700 mb-4 group-hover:text-[#FF8A65] transition-colors">
                {ticket.event}
              </h3>
              
              {/* 資訊膠囊 */}
              <div className="flex flex-wrap gap-2 mb-8">
                <div className="bg-[#F0FDFA] border border-[#CCFBF1] px-3 py-1.5 rounded-xl flex items-center gap-2 text-slate-500">
                  <Calendar size={14} className="text-[#99E6D9]" strokeWidth={3} />
                  <span className="text-xs font-bold">{ticket.date}</span>
                </div>
                <div className="bg-[#F0FDFA] border border-[#CCFBF1] px-3 py-1.5 rounded-xl flex items-center gap-2 text-slate-500">
                  <MapPin size={14} className="text-[#99E6D9]" strokeWidth={3} />
                  <span className="text-xs font-bold">{ticket.venue}</span>
                </div>
              </div>

              {/* 底部：座位與 CTA */}
              <div className="flex justify-between items-end mt-4">
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 ml-1">座位區域</div>
                  <div className="text-xl font-black text-slate-700 bg-slate-50 px-3 py-1 rounded-lg border border-slate-100 inline-block">
                    {ticket.seat?.split(' ')[0]} <span className="text-sm font-bold text-slate-400">{ticket.seat?.split(' ')[1]}</span>
                  </div>
                </div>
                
                {/* 糖果按鈕 */}
                <button className="clay-btn-orange px-6 py-3 flex items-center gap-2 group-active:scale-95">
                  <span>QR code</span>
                  <ChevronRight size={16} strokeWidth={4} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* 歷史航程 (Past) - 壓入式設計 */}
    <div>
      <h2 className="text-sm font-black text-slate-400 mb-5 px-2 tracking-widest uppercase flex items-center gap-2">
        <Clock size={14} strokeWidth={3} /> 回憶珍藏
      </h2>
      
      <div className="space-y-4">
        {MOCK_PAST_TICKETS.map((ticket) => (
          <div 
            key={ticket.id} 
            onClick={() => onSelectPastTicket(ticket)} 
            className="clay-inset p-4 flex justify-between items-center cursor-pointer transition-all active:scale-[0.98] hover:bg-[#D1EBF1]"
          >
            <div className="flex items-center gap-4">
              {/* 圖標容器：浮起的白色小圓 */}
              <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-white flex items-center justify-center text-xl relative overflow-hidden">
                <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${ticket.color}`} />
                {ticket.img}
              </div>
              
              <div>
                <div className="font-bold text-slate-600 text-sm mb-0.5">{ticket.event}</div>
                <div className="text-[10px] font-bold text-slate-400 font-mono bg-white/50 px-1.5 py-0.5 rounded inline-block">
                  {ticket.date}
                </div>
              </div>
            </div>
            
            <div className="pr-2">
              <CheckCircle2 size={18} className="text-[#99E6D9]" strokeWidth={3} />
            </div>
          </div>
        ))}
      </div>
      
      {/* 底部裝飾空間 */}
      <div className="h-10" />
    </div>
  </div>
);