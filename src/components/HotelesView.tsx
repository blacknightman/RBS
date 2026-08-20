import React, { useState } from 'react';
import { HotelItem } from '../types';

interface HotelesViewProps {
  hotels: HotelItem[];
  onBack?: () => void;
  onBookHotel: (hotelName: string) => void;
}

export const HotelesView: React.FC<HotelesViewProps> = ({
  hotels,
  onBack,
  onBookHotel,
}) => {
  const [searchTerm, setSearchTerm] = useState('One World Trade');
  const [filter, setFilter] = useState<'all' | '5star' | 'distance' | 'security'>('all');
  const [bookingHotel, setBookingHotel] = useState<HotelItem | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const filteredHotels = hotels.filter((h) => {
    if (filter === '5star') return h.rating >= 4.9;
    if (filter === 'security') return h.status === 'Zona segura';
    return true;
  });

  const handleConfirmBooking = () => {
    if (!bookingHotel) return;
    setBookingSuccess(true);
    onBookHotel(bookingHotel.name);
    setTimeout(() => {
      setBookingSuccess(false);
      setBookingHotel(null);
    }, 1500);
  };

  return (
    <div className="space-y-6 pb-24 md:pb-8 max-w-5xl mx-auto">
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#ECC246] hover:underline font-mono-code text-xs mb-2"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          <span>Volver</span>
        </button>
      )}

      {/* Header & Search Section */}
      <section className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#e1e3e4]">
          Hoteles Cerca de Puntos de Reunión
        </h2>

        <div className="bg-[#1d2021] rounded-2xl p-4 shadow-lg border border-[#323536] relative overflow-hidden">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 w-full relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#99907b]">
                search
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="¿Cerca de qué punto?"
                className="w-full bg-[#323536] border border-[#4d4635] text-[#e1e3e4] placeholder:text-[#99907b] rounded-full py-3 pl-10 pr-4 focus:outline-none focus:border-[#ECC246] transition-all text-sm font-medium"
              />
            </div>

            <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 hide-scrollbar">
              <button
                onClick={() => setFilter(filter === '5star' ? 'all' : '5star')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono-code whitespace-nowrap border transition-colors ${
                  filter === '5star'
                    ? 'bg-[#c9a227]/30 border-[#ECC246] text-[#ECC246]'
                    : 'bg-[#323536] border-[#4d4635] text-[#e1e3e4]'
                }`}
              >
                <span className="material-symbols-outlined text-xs icon-fill">star</span>
                <span>5 Estrellas</span>
              </button>

              <button
                onClick={() => setFilter(filter === 'distance' ? 'all' : 'distance')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono-code whitespace-nowrap border transition-colors ${
                  filter === 'distance'
                    ? 'bg-[#c9a227]/30 border-[#ECC246] text-[#ECC246]'
                    : 'bg-[#323536] border-[#4d4635] text-[#e1e3e4]'
                }`}
              >
                <span className="material-symbols-outlined text-xs">map</span>
                <span>Distancia</span>
              </button>

              <button
                onClick={() => setFilter(filter === 'security' ? 'all' : 'security')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono-code whitespace-nowrap border transition-colors ${
                  filter === 'security'
                    ? 'bg-[#c9a227]/30 border-[#ECC246] text-[#ECC246]'
                    : 'bg-[#323536] border-[#4d4635] text-[#e1e3e4]'
                }`}
              >
                <span className="material-symbols-outlined text-xs">security</span>
                <span>Seguridad</span>
              </button>
            </div>
          </div>
        </div>

        {/* Context Chip */}
        <div className="inline-flex items-center gap-2 bg-[#323536] px-4 py-1.5 rounded-full border border-[#ECC246]/20">
          <span className="material-symbols-outlined text-[#ECC246] text-sm icon-fill">
            location_on
          </span>
          <span className="text-xs text-[#d1c5af]">
            Punto de reunión: <strong className="text-[#e1e3e4]">{searchTerm}</strong>
          </span>
        </div>
      </section>

      {/* Main Content Area: Map + Results List */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[500px]">
        {/* Map Preview (Span 5) */}
        <div className="lg:col-span-5 bg-[#1d2021] rounded-2xl overflow-hidden border border-[#323536] relative shadow-xl min-h-[250px] lg:min-h-full">
          <div
            className="bg-cover bg-center w-full h-full absolute inset-0 opacity-80"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuChjg_hLOwC6GWRHJk3O2i6s5xVFqzKgJdGSaH07he5_ILdpunL5xcf78xFk0HA8wUR-TtNcvQGV9NsYs3Lfv0ytUfCWpNZJzruS-XYg1YIhHiIkvhBPY9dcTOklYsG92gMM0DuK8CWRUjoiluBS_PrrYVVje2lBBiCKLVuc_2_PXx4tb8K1BZChV4AQZhzdsgRbTW62b5rJs2hxqhugbna16s02MDygT40dh2dOTDRzh0lTGH_wcN5fQ')`,
            }}
          />

          {/* Map Overlay Pins */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            {/* Meeting Point */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="bg-[#ECC246] text-[#3d2e00] p-2 rounded-full shadow-[0_0_20px_rgba(236,194,70,0.6)] animate-pulse">
                <span className="material-symbols-outlined text-lg">
                  business_center
                </span>
              </div>
              <div className="mt-1 px-2 py-0.5 bg-[#050B14]/90 rounded text-[10px] font-bold text-[#ECC246] border border-[#ECC246]/50">
                {searchTerm}
              </div>
            </div>

            {/* Hotel Pins */}
            <div className="absolute top-[38%] left-[62%] flex flex-col items-center">
              <div className="bg-[#050B14] text-[#e1e3e4] p-1.5 rounded-full border border-[#ECC246]">
                <span className="material-symbols-outlined text-xs">hotel</span>
              </div>
            </div>
            <div className="absolute top-[62%] left-[42%] flex flex-col items-center">
              <div className="bg-[#050B14] text-[#e1e3e4] p-1.5 rounded-full border border-[#ECC246]">
                <span className="material-symbols-outlined text-xs">hotel</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hotel Cards List (Span 7) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {filteredHotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-[#0B1F3A] rounded-2xl overflow-hidden border border-[#1A1A1A] shadow-xl flex flex-col sm:flex-row relative group hover:border-[#ECC246]/40 transition-all"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#ECC246]" />

              <div className="sm:w-2/5 h-48 sm:h-auto relative shrink-0">
                <img
                  src={hotel.imageUrl}
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 bg-[#050B14]/80 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 border border-[#323536]">
                  <span className="material-symbols-outlined text-[#ECC246] text-xs icon-fill">
                    star
                  </span>
                  <span className="font-mono-code text-xs font-bold text-[#e1e3e4]">
                    {hotel.rating.toFixed(1)}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-bold text-[#e1e3e4]">
                      {hotel.name}
                    </h3>
                    <span className="text-lg font-bold text-[#ECC246]">
                      ${hotel.pricePerNight}
                      <span className="text-xs font-normal text-[#d1c5af]">
                        /noche
                      </span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="inline-flex items-center gap-1 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                      <span className="material-symbols-outlined text-emerald-400 text-xs">
                        verified_user
                      </span>
                      <span className="font-mono-code text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                        {hotel.status}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-[#d1c5af] flex items-center gap-1.5 mb-2">
                    <span className="material-symbols-outlined text-sm text-[#99907b]">
                      route
                    </span>
                    {hotel.distance}
                  </p>

                  <p className="text-xs text-[#99907b] line-clamp-2">
                    {hotel.description}
                  </p>
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => setBookingHotel(hotel)}
                    className="flex-1 bg-[#ECC246] text-[#3d2e00] font-bold py-2.5 rounded-full hover:bg-[#ffe08e] transition shadow-md active:scale-95 text-xs"
                  >
                    Reservar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Modal */}
      {bookingHotel && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B1F3A] border border-[#ECC246]/40 rounded-2xl max-w-md w-full p-6 space-y-4 text-[#e1e3e4] shadow-2xl relative">
            <button
              onClick={() => setBookingHotel(null)}
              className="absolute top-4 right-4 text-[#99907b] hover:text-[#e1e3e4]"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            {bookingSuccess ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500">
                  <span className="material-symbols-outlined text-4xl icon-fill">
                    check_circle
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#ECC246]">
                  ¡Reserva Confirmada!
                </h3>
                <p className="text-xs text-[#d1c5af]">
                  Se ha enviado la confirmación a su Concierge VIP y esquema de transporte terrestre.
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-bold text-[#ECC246] flex items-center gap-2">
                  <span className="material-symbols-outlined">hotel</span>
                  <span>Confirmar Reserva VIP</span>
                </h3>

                <div className="p-3 bg-[#111415] rounded-xl border border-[#323536] space-y-1 text-xs">
                  <p className="font-bold text-[#e1e3e4] text-sm">
                    {bookingHotel.name}
                  </p>
                  <p className="text-[#99907b]">{bookingHotel.distance}</p>
                  <p className="text-[#ECC246] font-mono-code font-bold pt-1">
                    Tarifa Preferencial VIP: ${bookingHotel.pricePerNight} USD / noche
                  </p>
                </div>

                <div className="space-y-2 text-xs text-[#d1c5af]">
                  <div className="flex justify-between py-1 border-b border-[#323536]">
                    <span>Check-in:</span>
                    <strong className="text-[#e1e3e4]">12 de Octubre, 15:00 hrs</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#323536]">
                    <span>Check-out:</span>
                    <strong className="text-[#e1e3e4]">15 de Octubre, 12:00 hrs</strong>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Protocolo de Seguridad:</span>
                    <strong className="text-emerald-400">Escolta Discreta en Lobby</strong>
                  </div>
                </div>

                <button
                  onClick={handleConfirmBooking}
                  className="w-full py-3 bg-[#ECC246] text-[#3d2e00] font-bold rounded-full hover:bg-[#ffe08e] transition active:scale-95"
                >
                  Confirmar Reserva con un Clic
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
