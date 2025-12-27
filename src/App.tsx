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
    <div className="bg-black h-[100dvh] text-white font-sans selection:bg-cyan-500 selection:text-black overflow-hidden">
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}
      {selectedTicket && <DynamicTicketView ticket={selectedTicket} onClose={() => setSelectedTicket(null)} />}
      {selectedPastTicket && <MiniConcertView ticket={selectedPastTicket} onClose={() => setSelectedPastTicket(null)} />}
      
      <div className="max-w-md mx-auto h-full bg-black relative shadow-2xl overflow-hidden font-sans border-x border-white/5">
        {renderContent()}
        
        {!activeVenueId && !selectedTicket && !selectedPastTicket && (
          <BottomTabBar activeTab={activeTab} onTabChange={setActiveTab} />
        )}
      </div>
    </div>
  );
}

export default App;