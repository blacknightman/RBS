import React, { useState } from 'react';
import { ItineraryItem } from '../types';

interface ViajesViewProps {
  itinerary: ItineraryItem[];
  onAddItineraryItem: (item: Omit<ItineraryItem, 'id'>) => void;
  onOpenHotelSearch: () => void;
}

export const ViajesView: React.FC<ViajesViewProps> = ({
  itinerary,
  onAddItineraryItem,
  onOpenHotelSearch,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newTime, setNewTime] = useState('10:00 AM');
  const [newType, setNewType] = useState<ItineraryItem['type']>('meeting');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    onAddItineraryItem({
      day: 'Día 1 - 12 de Octubre',
      time: newTime,
      title: newTitle,
      subtitle: newSubtitle || 'Ubicación confirmada AeroGuard',
      status: 'Seguro',
      type: newType,
      icon:
        newType === 'meeting'
          ? 'business_center'
          : newType === 'dinner'
          ? 'restaurant'
          : newType === 'hotel'
          ? 'hotel'
          : 'check_circle',
      completed: false,
    });

    setNewTitle('');
    setNewSubtitle('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 pb-28 md:pb-8 max-w-3xl mx-auto relative">
      {/* Trip Header */}
      <section className="space-y-2">
        <div className="flex items-center gap-2 text-[#ECC246]">
          <span className="material-symbols-outlined text-xl">
            travel_explore
          </span>
          <span className="font-mono-code text-xs uppercase tracking-widest text-[#d1c5af]">
            ITINERARIO ACTIVO
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#e1e3e4]">
          Nueva York — Reunión de Consejo
        </h2>
        <p className="text-sm text-[#d1c5af]">
          12 de Octubre - 15 de Octubre, 2023
        </p>

        <div className="pt-2 flex gap-3">
          <button
            onClick={onOpenHotelSearch}
            className="px-4 py-2 bg-[#0B1F3A] border border-[#ECC246]/40 text-[#ECC246] rounded-full text-xs font-bold flex items-center gap-2 hover:bg-[#ECC246]/10 transition"
          >
            <span className="material-symbols-outlined text-sm">hotel</span>
            <span>Buscar Hoteles Cercanos</span>
          </button>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="space-y-6 relative">
        <div className="sticky top-14 bg-[#050B14]/90 backdrop-blur-md py-2 z-10">
          <h3 className="text-lg font-bold text-[#ecc246]">
            Día 1 - 12 de Octubre
          </h3>
        </div>

        <div className="space-y-4">
          {itinerary.map((item) => {
            const isWarning = item.status === 'Precaución Zonal';

            return (
              <div key={item.id} className="relative flex gap-4 w-full group">
                {/* Timeline node */}
                <div className="relative shrink-0 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-[#282a2b] flex items-center justify-center border-2 border-[#323536] z-10 shadow-[0_0_15px_rgba(201,162,39,0.1)] group-hover:border-[#ECC246] transition-colors">
                    <span className="material-symbols-outlined text-[#ECC246]">
                      {item.icon}
                    </span>
                  </div>
                  <div className="w-0.5 bg-[#323536] h-full absolute top-12 left-1/2 -translate-x-1/2 -z-0 group-last:hidden" />
                </div>

                {/* Card Content */}
                <div className="bg-[#0B1F3A] rounded-xl border border-[#1A1A1A] p-4 flex-grow relative overflow-hidden flex flex-col gap-2 shadow-lg hover:border-[#ECC246]/30 transition-all">
                  {/* Status Indicator Stripe */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1 ${
                      isWarning ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]' : 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]'
                    }`}
                  />

                  <div className="flex justify-between items-start pl-2">
                    <div className="flex flex-col">
                      <span className="font-mono-code text-xs text-[#ECC246] mb-0.5">
                        {item.time}
                      </span>
                      <h4 className="text-base font-bold text-[#e1e3e4]">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#d1c5af] mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>

                    <div
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border shrink-0 ${
                        isWarning
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          : 'bg-green-500/10 text-green-400 border-green-500/20'
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full animate-pulse ${
                          isWarning ? 'bg-amber-500' : 'bg-green-500'
                        }`}
                      />
                      <span>{item.status}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Floating Action Button */}
      <button
        onClick={() => setShowAddModal(true)}
        className="fixed right-6 bottom-20 md:bottom-8 bg-[#C9A227] text-black px-6 py-3.5 rounded-full flex items-center gap-2 shadow-[0_4px_20px_rgba(201,162,39,0.5)] hover:bg-[#ECC246] transition-all active:scale-95 z-30 font-bold text-sm"
      >
        <span className="material-symbols-outlined">add</span>
        <span>Agregar al itinerario</span>
      </button>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B1F3A] border border-[#ECC246]/40 rounded-2xl max-w-md w-full p-6 space-y-4 text-[#e1e3e4] shadow-2xl relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-[#99907b] hover:text-[#e1e3e4]"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <h3 className="text-lg font-bold text-[#ECC246] flex items-center gap-2">
              <span className="material-symbols-outlined">event</span>
              <span>Agregar Evento al Itinerario</span>
            </h3>

            <form onSubmit={handleAddSubmit} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-mono-code text-[#99907b] mb-1">
                  Título del Evento
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Reunión con Inversionistas"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-[#111415] border border-[#323536] rounded-xl p-3 text-sm text-[#e1e3e4] focus:outline-none focus:border-[#ECC246]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-code text-[#99907b] mb-1">
                  Ubicación / Detalles
                </label>
                <input
                  type="text"
                  placeholder="Ej. Torre One World Trade, Piso 80"
                  value={newSubtitle}
                  onChange={(e) => setNewSubtitle(e.target.value)}
                  className="w-full bg-[#111415] border border-[#323536] rounded-xl p-3 text-sm text-[#e1e3e4] focus:outline-none focus:border-[#ECC246]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono-code text-[#99907b] mb-1">
                    Hora (EST)
                  </label>
                  <input
                    type="text"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full bg-[#111415] border border-[#323536] rounded-xl p-3 text-sm text-[#e1e3e4] focus:outline-none focus:border-[#ECC246]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-code text-[#99907b] mb-1">
                    Tipo de Evento
                  </label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full bg-[#111415] border border-[#323536] rounded-xl p-3 text-sm text-[#e1e3e4] focus:outline-none focus:border-[#ECC246]"
                  >
                    <option value="meeting">Reunión</option>
                    <option value="dinner">Cena / Comida</option>
                    <option value="hotel">Hotel</option>
                    <option value="custom">Otro</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#ECC246] text-[#3d2e00] font-bold rounded-full hover:bg-[#ffe08e] transition active:scale-95 mt-2"
              >
                Guardar en Itinerario VIP
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
