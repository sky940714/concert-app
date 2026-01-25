import { useState } from 'react';
import { Toast } from './components/common';
import { BottomTabBar, type TabId } from './components/navigation';
import { DiscoveryHub, VenueDetailView } from './screens/Discovery'; 
import { EventDetailView } from './screens/Discovery/EventDetailView'; 
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
  const [isImporting, setIsImporting] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

  const showToast = (msg: string) => setToastMessage(msg);

  const renderContent = () => {
    // ✅ 優先權 1：點擊演唱會詳情
    if (selectedEvent) {
      return <EventDetailView event={selectedEvent} onBack={() => setSelectedEvent(null)} showToast={showToast} />;
    }

    // ✅ 優先權 2：點擊「珍藏回憶」詳情 (原本漏掉這段)
    if (selectedPastTicket) {
      return <MiniConcertView ticket={selectedPastTicket} onClose={() => setSelectedPastTicket(null)} />;
    }

    // ✅ 優先權 3：場館詳情
    if (activeTab === 'discovery' && activeVenueId) {
      return <VenueDetailView venueId={activeVenueId} onBack={() => setActiveVenueId(null)} />;
    }

    // 一般分頁
    switch (activeTab) {
      case 'discovery': return <DiscoveryHub onVenueSelect={setActiveVenueId} onSelectEvent={setSelectedEvent} />; 
      case 'tickets': return <TicketWallet onSelectTicket={setSelectedTicket} onSelectPastTicket={setSelectedPastTicket} />;
      case 'nearby': return <NearbyHub showToast={showToast} />;
      case 'profile': return <ProfileHub showToast={showToast} onImportingChange={setIsImporting} />;
      case 'support': return <SupportHub />;
      default: return null;
    }
  };

  // 控制導覽列隱藏
  const shouldHideTabBar = activeVenueId || selectedTicket || selectedPastTicket || isImporting || selectedEvent;

  return (
    <div className="bg-[#F0F9FF] min-h-screen text-slate-600 font-sans">
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}
      
      {/* 僅用於 Modal 彈窗形式的組件 */}
      {selectedTicket && <DynamicTicketView ticket={selectedTicket} onClose={() => setSelectedTicket(null)} />}
      
      <div 
        className="max-w-md mx-auto min-h-screen bg-transparent relative shadow-2xl border-x border-white/5"
        style={{ isolation: 'isolate' }} 
      >
        {renderContent()}
        
        {!shouldHideTabBar && (
          <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50">
            <BottomTabBar activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;