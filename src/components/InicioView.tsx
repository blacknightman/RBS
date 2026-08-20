import React from 'react';
import { UserProfile, FlightInfo, NavTab } from '../types';

interface InicioViewProps {
  user: UserProfile;
  flight: FlightInfo;
  onNavigateTab: (tab: NavTab) => void;
  onOpenFlightTracking: () => void;
  onOpenSos: () => void;
  onOpenGroundDetails: () => void;
}

export const InicioView: React.FC<InicioViewProps> = ({
  user,
  flight,
  onNavigateTab,
  onOpenFlightTracking,
  onOpenSos,
  onOpenGroundDetails,
}) => {
  return (
    <div className="space-y-6 pb-24 md:pb-8">
      {/* Greeting Section */}
      <section className="flex flex-col gap-1.5">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#e1e3e4] tracking-tight">
          Buenas tardes, {user.name.split(' ')[0]}
        </h1>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-[#c9a227]/20 rounded-full text-[#ECC246] font-mono-code text-xs border border-[#ECC246]/30 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm">shield</span>
            {user.vipStatus}
          </span>
        </div>
      </section>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Next Flight Hero Card (Span 8 on desktop) */}
        <article
          onClick={onOpenFlightTracking}
          className="md:col-span-8 bg-[#0B1F3A] rounded-2xl p-6 border border-[#1A1A1A] relative overflow-hidden shadow-2xl border-gold-accent flex flex-col justify-between min-h-[220px] group cursor-pointer transition-all duration-300 hover:border-[#ECC246]/50 hover:shadow-[#ECC246]/10"
        >
          {/* Decorative Accent line on left */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#ECC246]" />

          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="font-mono-code text-xs text-[#99907b] tracking-wider mb-2 uppercase">
                PRÓXIMO VUELO
              </h2>
              <div className="flex items-center gap-4 text-[#e1e3e4]">
                <div className="flex flex-col">
                  <span className="text-4xl font-extrabold text-[#ECC246]">
                    {flight.originCode}
                  </span>
                  <span className="text-sm text-[#d1c5af]">
                    {flight.originCity}
                  </span>
                </div>

                <div className="flex flex-col items-center px-2 text-[#323536]">
                  <span className="material-symbols-outlined text-2xl text-[#ECC246] transform rotate-90 sm:rotate-0 mb-1 group-hover:translate-x-1 transition-transform">
                    flight
                  </span>
                  <div className="w-16 h-px bg-[#4d4635] relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#ECC246]" />
                  </div>
                </div>

                <div className="flex flex-col text-right">
                  <span className="text-4xl font-extrabold text-[#e1e3e4]">
                    {flight.destinationCode}
                  </span>
                  <span className="text-sm text-[#d1c5af]">
                    {flight.destinationCity}
                  </span>
                </div>
              </div>
            </div>

            {/* Status Chip */}
            <div className="bg-[#2e3132] px-3 py-1.5 rounded-full border border-[#ECC246]/30 flex items-center gap-1.5 shrink-0 shadow-md">
              <div className="w-2 h-2 rounded-full bg-[#ECC246] animate-pulse" />
              <span className="font-mono-code text-xs text-[#ECC246] font-semibold">
                {flight.status}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 border-t border-[#323536] pt-4">
            <div className="flex flex-col">
              <span className="font-mono-code text-xs text-[#99907b]">
                Salida
              </span>
              <span className="text-lg font-bold text-[#e1e3e4]">
                {flight.departureTime}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-mono-code text-xs text-[#99907b]">
                Puerta
              </span>
              <span className="text-lg font-bold text-[#e1e3e4]">
                {flight.gate}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-mono-code text-xs text-[#99907b]">
                Vuelo
              </span>
              <span className="text-lg font-bold text-[#e1e3e4]">
                {flight.flightNumber}
              </span>
            </div>
          </div>

          {/* Background Subtle Graphic */}
          <div className="absolute -right-8 -bottom-8 opacity-5 pointer-events-none">
            <span className="material-symbols-outlined text-[180px]">
              flight_takeoff
            </span>
          </div>
        </article>

        {/* Security Status Card (Span 4 on desktop) */}
        <article className="md:col-span-4 bg-[#282a2b] rounded-2xl p-6 border border-[#1A1A1A] flex flex-col justify-between shadow-xl">
          <div>
            <h2 className="font-mono-code text-xs text-[#99907b] tracking-wider mb-4 uppercase">
              NIVEL DE SEGURIDAD DE LA ZONA
            </h2>
            <div className="flex items-center gap-4 mb-3">
              <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
                <div className="absolute inset-0 rounded-full border-2 border-emerald-500/30 animate-ping" />
                <div className="absolute inset-1 rounded-full bg-emerald-500/20 border border-emerald-500/50" />
                <span className="material-symbols-outlined text-emerald-400 text-2xl z-10 icon-fill">
                  verified_user
                </span>
              </div>
              <div>
                <span className="block text-xl font-bold text-emerald-400">
                  Óptimo
                </span>
                <span className="block text-sm text-[#d1c5af]">
                  Polanco, CDMX
                </span>
              </div>
            </div>
          </div>

          <p className="text-sm text-[#d1c5af] py-2 border-t border-[#323536]">
            Sin incidentes reportados en su ruta actual hacia el aeropuerto.
          </p>

          <button
            onClick={() => onNavigateTab('mapa')}
            className="mt-3 flex items-center justify-between w-full text-left text-sm font-semibold text-[#ECC246] hover:opacity-80 transition-opacity"
          >
            <span>Ver mapa de ruta</span>
            <span className="material-symbols-outlined text-lg">
              arrow_forward
            </span>
          </button>
        </article>

        {/* Quick Actions Grid (Full width) */}
        <div className="md:col-span-12 mt-2">
          <h3 className="text-lg font-bold text-[#e1e3e4] mb-3">
            Acciones Rápidas AeroGuard
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {/* Action: Duffel Vuelos Live */}
            <button
              onClick={() => onNavigateTab('vuelos')}
              className="bg-[#1d2021] rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-[#282a2b] transition-all active:scale-95 border border-emerald-500/30 hover:border-emerald-400 group shadow-md"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-950/50 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                <span className="material-symbols-outlined text-emerald-400">
                  flight
                </span>
              </div>
              <span className="text-xs font-bold text-[#e1e3e4] text-center">
                Duffel Vuelos Live
              </span>
            </button>

            {/* Action: Golf VIP */}
            <button
              onClick={() => onNavigateTab('golf')}
              className="bg-[#1d2021] rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-[#282a2b] transition-all active:scale-95 border border-[#ECC246]/30 hover:border-[#ECC246] group shadow-md"
            >
              <div className="w-10 h-10 rounded-full bg-[#c9a227]/20 flex items-center justify-center group-hover:bg-[#c9a227]/40 transition-colors">
                <span className="material-symbols-outlined text-[#ECC246]">
                  sports_golf
                </span>
              </div>
              <span className="text-xs font-bold text-[#e1e3e4] text-center">
                Campos Golf VIP
              </span>
            </button>

            {/* Action: Check-up Familia RBS & Google Sheets */}
            <button
              onClick={() => onNavigateTab('pasajeros')}
              className="bg-[#1d2021] rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-[#282a2b] transition-all active:scale-95 border border-emerald-500/40 hover:border-emerald-400 group shadow-md"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-950/40 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                <span className="material-symbols-outlined text-emerald-400 group-hover:text-emerald-300">
                  family_restroom
                </span>
              </div>
              <span className="text-xs font-bold text-[#e1e3e4] text-center">
                Familia RBS & Sheets
              </span>
            </button>

            {/* Action: Check-up Invitados VIP & Google Sheets */}
            <button
              onClick={() => onNavigateTab('invitados')}
              className="bg-[#1d2021] rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-[#282a2b] transition-all active:scale-95 border border-cyan-500/40 hover:border-cyan-400 group shadow-md"
            >
              <div className="w-10 h-10 rounded-full bg-cyan-950/40 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                <span className="material-symbols-outlined text-cyan-400 group-hover:text-cyan-300">
                  group_add
                </span>
              </div>
              <span className="text-xs font-bold text-[#e1e3e4] text-center">
                Invitados VIP & Sheets
              </span>
            </button>

            {/* Action: Hotel */}
            <button
              onClick={() => onNavigateTab('viajes')}
              className="bg-[#1d2021] rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-[#282a2b] transition-all active:scale-95 border border-transparent hover:border-[#4d4635] group shadow-md"
            >
              <div className="w-10 h-10 rounded-full bg-[#323536] flex items-center justify-center group-hover:bg-[#c9a227]/20 transition-colors">
                <span className="material-symbols-outlined text-[#e1e3e4] group-hover:text-[#ECC246]">
                  hotel
                </span>
              </div>
              <span className="text-xs font-bold text-[#e1e3e4] text-center">
                Hoteles VIP
              </span>
            </button>

            {/* Action: Rutas seguras */}
            <button
              onClick={() => onNavigateTab('mapa')}
              className="bg-[#1d2021] rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-[#282a2b] transition-all active:scale-95 border border-transparent hover:border-[#4d4635] group shadow-md"
            >
              <div className="w-10 h-10 rounded-full bg-[#323536] flex items-center justify-center group-hover:bg-[#c9a227]/20 transition-colors">
                <span className="material-symbols-outlined text-[#e1e3e4] group-hover:text-[#ECC246]">
                  route
                </span>
              </div>
              <span className="text-xs font-bold text-[#e1e3e4] text-center">
                Rutas Seguras
              </span>
            </button>

            {/* Action: SOS */}
            <button
              onClick={onOpenSos}
              className="bg-[#1d2021] rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-red-950/40 transition-all active:scale-95 border border-red-500/30 hover:border-red-500 group shadow-md"
            >
              <div className="w-10 h-10 rounded-full bg-red-900/30 flex items-center justify-center group-hover:bg-red-600 transition-colors">
                <span className="material-symbols-outlined text-red-400 group-hover:text-white icon-fill">
                  sos
                </span>
              </div>
              <span className="text-xs font-bold text-red-400 group-hover:text-red-300">
                SOS Emergencia
              </span>
            </button>
          </div>
        </div>

        {/* Promo / Info Banner */}
        <div className="md:col-span-12 mt-2 rounded-2xl overflow-hidden relative min-h-[140px] flex items-center px-6 py-5 shadow-xl border border-[#323536]">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCyjqiQX8wswjjWLC0ipTIIF0P2y5GhIZt_Dw3h-hkbWBJ1BrSYFVD7m6TxtwXIby7dnWfpZT-DopYh_ARw_YNVx6aW-CRrCsyNc2dEAEhdmSAqutOKLv4GH0_dpKqcku7-1uj-hH5jHGClJTBAOnYwg68qD7K9ZFdFAwQLuUIeSO_gZp9aKmtqPEwhKBzyrMQODdY-j5WlUjlCD8lqpOCumAbFmmN7vHL-Iqq7L2JoUPJZewt9Z_j-pw')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A] via-[#0B1F3A]/90 to-transparent" />
          <div className="relative z-10 max-w-lg space-y-2">
            <h4 className="text-lg font-bold text-[#e1e3e4]">
              Transporte Terrestre Confirmado
            </h4>
            <p className="text-sm text-[#d1c5af]">
              El conductor VIP asignado llegará 30 minutos antes a la entrada
              principal del hotel.
            </p>
            <button
              onClick={onOpenGroundDetails}
              className="mt-2 px-4 py-2 bg-[#ECC246] text-[#3d2e00] rounded-full font-bold text-xs flex items-center gap-2 hover:bg-[#ffe08e] transition-colors shadow-md active:scale-95"
            >
              <span>Ver Detalles</span>
              <span className="material-symbols-outlined text-sm">
                directions_car
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
