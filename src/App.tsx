import { useState } from 'react';
import { NavTab, UserProfile, FlightInfo, ItineraryItem, ChatMessage } from './types';
import {
  initialProfile,
  currentFlight,
  upcomingFlight,
  initialItinerary,
  sampleHotels,
  sampleRestaurants,
  initialChatMessages,
} from './mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { LoginScreen } from './components/LoginScreen';
import { InicioView } from './components/InicioView';
import { FlightTrackingView } from './components/FlightTrackingView';
import { ViajesView } from './components/ViajesView';
import { MapaSeguroView } from './components/MapaSeguroView';
import { HotelesView } from './components/HotelesView';
import { RestaurantesView } from './components/RestaurantesView';
import { ConciergeView } from './components/ConciergeView';
import { PerfilView } from './components/PerfilView';
import { DuffelLiveFlightsView } from './components/DuffelLiveFlightsView';
import { CamposGolfView } from './components/CamposGolfView';
import { CheckupPasajerosView } from './components/CheckupPasajerosView';
import { CheckupInvitadosView } from './components/CheckupInvitadosView';
import { SosModal } from './components/SosModal';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [activeTab, setActiveTab] = useState<NavTab>('inicio');
  const [activeSubView, setActiveSubView] = useState<
    'main' | 'flight-tracking' | 'hoteles' | 'restaurantes'
  >('main');
  const [showSosModal, setShowSosModal] = useState(false);
  const [showGroundTransportModal, setShowGroundTransportModal] = useState(false);

  // Live state
  const [user, setUser] = useState<UserProfile>(initialProfile);
  const [flight] = useState<FlightInfo>(currentFlight);
  const [itinerary, setItinerary] = useState<ItineraryItem[]>(initialItinerary);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(initialChatMessages);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleUpdateUser = (updated: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updated }));
    triggerToast('Perfil VIP actualizado');
  };

  const handleAddItineraryItem = (item: Omit<ItineraryItem, 'id'>) => {
    const newItem: ItineraryItem = {
      ...item,
      id: Date.now().toString(),
    };
    setItinerary((prev) => [...prev, newItem]);
    triggerToast('Evento agregado al itinerario');
  };

  const handleSendMessage = async (text: string) => {
    const timeNow = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      time: timeNow,
    };

    setChatMessages((prev) => [...prev, userMsg]);

    try {
      const res = await fetch('/api/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: text }),
      });
      const data = await res.json();

      const agentMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'agent',
        text:
          data.reply ||
          'Entendido, Sr. Valerio. He coordinado con el equipo de escolta y logística táctica para atender su solicitud.',
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setChatMessages((prev) => [...prev, agentMsg]);
    } catch {
      const fallbackMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'agent',
        text:
          'Solicitud procesada con éxito, Sr. Valerio. He notificado a su chofer VIP y equipo de seguridad asignado.',
        time: timeNow,
      };
      setChatMessages((prev) => [...prev, fallbackMsg]);
    }
  };

  const handleOpenConciergeWithQuery = (query: string) => {
    setActiveTab('concierge');
    setActiveSubView('main');
    handleSendMessage(query);
  };

  const handleReserveRestaurantViaConcierge = (restaurantName: string) => {
    handleOpenConciergeWithQuery(`Deseo reservar una mesa VIP privada en ${restaurantName}`);
  };

  const handleBookHotel = (hotelName: string) => {
    triggerToast(`Reserva en ${hotelName} enviada a Concierge VIP`);
  };

  const handleNotifyAssistant = () => {
    triggerToast('Notificación prioritaria enviada a Asistente VIP');
  };

  if (!isLoggedIn) {
    return <LoginScreen onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#050B14] text-[#e1e3e4] font-sans antialiased selection:bg-[#ECC246] selection:text-[#3d2e00]">
      {/* Top Header Bar */}
      <Header
        user={user}
        onProfileClick={() => {
          setActiveTab('perfil');
          setActiveSubView('main');
        }}
        onSosClick={() => setShowSosModal(true)}
      />

      {/* Main Content Area */}
      <main className="pt-16 px-4 sm:px-6 max-w-7xl mx-auto min-h-[calc(100vh-80px)]">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed top-16 right-4 z-50 bg-[#ECC246] text-[#3d2e00] font-bold px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 animate-bounce text-xs font-mono-code">
            <span className="material-symbols-outlined text-sm icon-fill">
              check_circle
            </span>
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Sub-view: Flight Tracking Override */}
        {activeSubView === 'flight-tracking' ? (
          <FlightTrackingView
            flight={flight}
            onBack={() => setActiveSubView('main')}
            onNotifyAssistant={handleNotifyAssistant}
          />
        ) : activeSubView === 'hoteles' ? (
          <HotelesView
            hotels={sampleHotels}
            onBack={() => setActiveSubView('main')}
            onBookHotel={handleBookHotel}
          />
        ) : activeSubView === 'restaurantes' ? (
          <RestaurantesView
            restaurants={sampleRestaurants}
            onReserveViaConcierge={handleReserveRestaurantViaConcierge}
          />
        ) : (
          <>
            {/* Active Main Tab Content */}
            {activeTab === 'inicio' && (
              <InicioView
                user={user}
                flight={upcomingFlight}
                onNavigateTab={(tab) => {
                  setActiveTab(tab);
                  setActiveSubView('main');
                }}
                onOpenFlightTracking={() => setActiveSubView('flight-tracking')}
                onOpenSos={() => setShowSosModal(true)}
                onOpenGroundDetails={() => setShowGroundTransportModal(true)}
              />
            )}

            {activeTab === 'vuelos' && (
              <DuffelLiveFlightsView
                currentFlight={flight}
                onOpenConciergeWithQuery={handleOpenConciergeWithQuery}
              />
            )}

            {activeTab === 'viajes' && (
              <ViajesView
                itinerary={itinerary}
                onAddItineraryItem={handleAddItineraryItem}
                onOpenHotelSearch={() => setActiveSubView('hoteles')}
              />
            )}

            {activeTab === 'golf' && (
              <CamposGolfView
                onOpenConciergeWithQuery={handleOpenConciergeWithQuery}
              />
            )}

            {activeTab === 'pasajeros' && (
              <CheckupPasajerosView
                onOpenConciergeWithQuery={handleOpenConciergeWithQuery}
              />
            )}

            {activeTab === 'invitados' && (
              <CheckupInvitadosView
                onOpenConciergeWithQuery={handleOpenConciergeWithQuery}
              />
            )}

            {activeTab === 'mapa' && (
              <MapaSeguroView onOpenSos={() => setShowSosModal(true)} />
            )}

            {activeTab === 'concierge' && (
              <ConciergeView
                messages={chatMessages}
                onSendMessage={handleSendMessage}
              />
            )}

            {activeTab === 'perfil' && (
              <PerfilView
                user={user}
                onUpdateUser={handleUpdateUser}
                onLogout={() => setIsLoggedIn(false)}
              />
            )}
          </>
        )}
      </main>

      {/* Navigation Bar */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setActiveSubView('main');
        }}
      />

      {/* Emergency SOS Full Overlay Modal */}
      {showSosModal && <SosModal onClose={() => setShowSosModal(false)} />}

      {/* Ground Transport Details Modal */}
      {showGroundTransportModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B1F3A] border border-[#ECC246]/40 rounded-2xl max-w-md w-full p-6 space-y-4 text-[#e1e3e4] shadow-2xl relative">
            <button
              onClick={() => setShowGroundTransportModal(false)}
              className="absolute top-4 right-4 text-[#99907b] hover:text-[#e1e3e4]"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="flex items-center gap-2 text-[#ECC246]">
              <span className="material-symbols-outlined text-2xl">
                directions_car
              </span>
              <h3 className="text-lg font-bold">
                Transporte Terrestre VIP Confirmado
              </h3>
            </div>

            <div className="space-y-3 font-mono-code text-xs text-[#d1c5af]">
              <div className="p-3 bg-[#111415] rounded-xl border border-[#323536] flex items-center justify-between">
                <div>
                  <p className="font-bold text-[#e1e3e4]">Vehículo:</p>
                  <p>Chevrolet Suburban Blindada Nivel 5+</p>
                </div>
                <span className="px-2 py-1 bg-emerald-950 text-emerald-400 font-bold border border-emerald-500/30 rounded">
                  Matrícula XYZ-123
                </span>
              </div>

              <div className="p-3 bg-[#111415] rounded-xl border border-[#323536]">
                <p className="font-bold text-[#e1e3e4] mb-1">Chofer Asignado:</p>
                <p className="text-sm font-semibold text-[#ECC246]">Alejandro V.</p>
                <p>Verificación biométrica aprobada · Escolta Táctica</p>
              </div>

              <div className="p-3 bg-[#111415] rounded-xl border border-[#323536]">
                <p className="font-bold text-[#e1e3e4]">Llegada Estimada:</p>
                <p>19:15 hrs (30 mins antes de salida)</p>
              </div>
            </div>

            <button
              onClick={() => setShowGroundTransportModal(false)}
              className="w-full py-3 bg-[#ECC246] text-[#3d2e00] font-bold rounded-full hover:bg-[#ffe08e] transition active:scale-95"
            >
              Cerrar y Notificar Llegada
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
