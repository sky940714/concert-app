import { Disc, Calendar, MapPin, ChevronRight } from 'lucide-react';
import type { Ticket } from '../../types';
import { MOCK_TICKETS, MOCK_PAST_TICKETS } from '../../data';

interface TicketWalletProps {
  onSelectTicket: (ticket: Ticket) => void;
  onSelectPastTicket: (ticket: Ticket) => void;
}

export const TicketWallet = ({ onSelectTicket, onSelectPastTicket }: TicketWalletProps) => (
  <div className="pb-24 px-6 pt-10 bg-black h-[100dvh] text-white overflow-y-auto">
    <div className="relative z-10">
      <h1 className="text-3xl font-bold mb-8 font-sans tracking-tight text-white flex items-center gap-3">
        <Disc className="animate-spin-slow text-cyan-500" /> 我的票夾
      </h1>
      
      <h2 className="text-sm font-bold text-cyan-400 mb-4 uppercase tracking-widest">即將啟航</h2>
      <div className="space-y-6 mb-12">
        {MOCK_TICKETS.map((ticket) => (
          <div 
            key={ticket.id} 
            onClick={() => onSelectTicket(ticket)} 
            className="bg-zinc-900/80 border border-white/10 rounded-[1.5rem] overflow-hidden shadow-lg hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:border-cyan-500/50 transition-all duration-500 cursor-pointer group relative backdrop-blur-md"
          >
            <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${ticket.color}`} />
            <div className="p-6 pl-8">
              <div className="flex justify-between items-start mb-5">
                <h3 className="text-lg font-bold leading-snug w-3/4 text-white">{ticket.event}</h3>
                <span className="bg-cyan-900/30 border border-cyan-500/30 text-cyan-400 px-2 py-1 rounded text-[10px] font-mono uppercase">電子通行證</span>
              </div>
              <div className="flex items-center gap-5 text-gray-400 text-xs mb-6 font-mono">
                <span className="flex items-center gap-1.5"><Calendar size={12} className="text-cyan-500"/> {ticket.date}</span>
                <span className="flex items-center gap-1.5"><MapPin size={12} className="text-fuchsia-500"/> {ticket.venue}</span>
              </div>
              <div className="flex justify-between items-end border-t border-dashed border-white/10 pt-4">
                <div>
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">座位</div>
                  <div className="font-bold text-xl text-white font-sans">{ticket.seat}</div>
                </div>
                <div className="text-cyan-400 text-xs font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform uppercase tracking-wider">
                  啟航 <ChevronRight size={12} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-sm font-bold text-gray-500 mb-4 uppercase tracking-widest">歷史航程 (回憶珍藏)</h2>
      <div className="space-y-4">
        {MOCK_PAST_TICKETS.map((ticket) => (
          <div 
            key={ticket.id} 
            onClick={() => onSelectPastTicket(ticket)} 
            className="bg-black/40 border border-white/5 rounded-xl p-4 flex justify-between items-center cursor-pointer hover:bg-white/5 hover:border-cyan-500/20 transition-all group opacity-70 hover:opacity-100"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${ticket.color} flex items-center justify-center text-xl shadow-lg group-hover:scale-110 transition-transform`}>
                {ticket.img}
              </div>
              <div>
                <div className="font-bold text-white font-sans text-sm group-hover:text-cyan-300 transition-colors">{ticket.event}</div>
                <div className="text-[10px] text-gray-500 mt-1 font-mono">{ticket.date} | {ticket.venue}</div>
              </div>
            </div>
            <div className="bg-zinc-800 px-2 py-1 rounded text-[10px] text-gray-400 border border-white/10">已封存</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);