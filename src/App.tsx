import { useState } from 'react';
import { Toast } from './components/common';
import { BottomTabBar, type TabId } from './components/navigation';
import { StarshipHub, VenueDetailView } from './screens/Discovery';
import { TicketWallet, DynamicTicketView, MiniConcertView } from './screens/Tickets';
import { ProfileHub } from './screens/Profile';
import { SupportHub } from './screens/Support';
import { NearbyHub } from './screens/Nearby';
import type { Ticket } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('discovery');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [selectedPastTicket, setSelectedPastTicket] = useState<Ticket | null>(null);
  const [activeVenueId, setActiveVenueId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => setToastMessage(msg);

  const renderContent = () => {
    if (activeTab === 'discovery' && activeVenueId) {
      return <VenueDetailView venueId={activeVenueId} onBack={() => setActiveVenueId(null)} />;
    }
    
    switch (activeTab) {
      case 'discovery':
        return <StarshipHub onVenueSelect={setActiveVenueId} />;
      case 'tickets':
        return <TicketWallet onSelectTicket={setSelectedTicket} onSelectPastTicket={setSelectedPastTicket} />;
      case 'nearby':
        return <NearbyHub showToast={showToast} />;
      case 'profile':
        return <ProfileHub showToast={showToast} />;
      case 'support':
        return <SupportHub />;
      default:
        return null;
    }
  };

  return (
    /* 修正點 1: 將最外層 bg 改為與背景漸層最接近的淺藍色，徹底消除黑影跳動
       修正點 2: 使用 isolation-auto 確保圖層合成不會因為 3D 模型渲染而產生視覺衝突
    */
    <div className="bg-[#F0F9FF] h-[100dvh] text-slate-600 font-sans selection:bg-cyan-500 selection:text-black overflow-hidden touch-none">
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}
      {selectedTicket && <DynamicTicketView ticket={selectedTicket} onClose={() => setSelectedTicket(null)} />}
      {selectedPastTicket && <MiniConcertView ticket={selectedPastTicket} onClose={() => setSelectedPastTicket(null)} />}
      
      {/* 修正點 3: 內層容器 bg 改為 bg-transparent，避免與 ConcertAtmosphereBackground 的層級發生閃爍
      */}
      <div 
        className="max-w-md mx-auto h-full bg-transparent relative shadow-2xl overflow-hidden font-sans border-x border-white/5"
        style={{ isolation: 'isolate' }} // 強制隔離渲染層，解決 iOS 閃爍關鍵
      >
        {renderContent()}
        
        {!activeVenueId && !selectedTicket && !selectedPastTicket && (
          <BottomTabBar activeTab={activeTab} onTabChange={setActiveTab} />
        )}
      </div>
    </div>
  );
}

export default App;