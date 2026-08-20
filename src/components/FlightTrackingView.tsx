import React, { useState } from 'react';
import { FlightInfo } from '../types';

interface FlightTrackingViewProps {
  flight: FlightInfo;
  onBack?: () => void;
  onNotifyAssistant: () => void;
}

export const FlightTrackingView: React.FC<FlightTrackingViewProps> = ({
  flight,
  onBack,
  onNotifyAssistant,
}) => {
  const [showPlanBModal, setShowPlanBModal] = useState(false);
  const [notified, setNotified] = useState(false);

  const handleNotify = () => {
    setNotified(true);
    onNotifyAssistant();
    setTimeout(() => setNotified(false), 3000);
  };

  return (
    <div className="space-y-6 pb-24 md:pb-8 max-w-4xl mx-auto">
      {/* Header Back option if presented as overlay */}
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#ECC246] hover:underline font-mono-code text-xs mb-2"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          <span>Volver al Inicio</span>
        </button>
      )}

      {/* Flight Tracking Hero Card */}
      <section className="bg-[#0B1F3A] rounded-2xl p-6 border border-[#ECC246]/20 relative overflow-hidden shadow-[0_12px_32px_rgba(0,0,0,0.6)]">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#ECC246] rounded-full blur-[110px] opacity-10 pointer-events-none" />

        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#323536] rounded-xl flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[#ECC246] text-3xl">
                flight
              </span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#e1e3e4]">
                {flight.flightNumber}
              </h2>
              <p className="font-mono-code text-xs text-[#99907b]">
                Asiento {flight.seat} • {flight.classType}
              </p>
            </div>
          </div>

          <div className="bg-[#ECC246]/20 text-[#ECC246] px-3 py-1 rounded-full border border-[#ECC246]/30 flex items-center gap-2 shadow-md">
            <span className="w-2 h-2 rounded-full bg-[#ECC246] animate-pulse" />
            <span className="font-mono-code text-xs font-bold uppercase tracking-wider">
              {flight.status}
            </span>
          </div>
        </div>

        {/* Stylized Flight Arc SVG */}
        <div className="py-6 relative w-full flex flex-col items-center">
          <div className="flex justify-between w-full text-center px-2 mb-2 z-10 relative">
            <div>
              <p className="text-3xl font-extrabold text-[#e1e3e4]">
                {flight.originCode}
              </p>
              <p className="text-xs text-[#99907b]">{flight.originCity}</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-[#e1e3e4]">
                {flight.destinationCode}
              </p>
              <p className="text-xs text-[#99907b]">{flight.destinationCity}</p>
            </div>
          </div>

          {/* Arc Graphic */}
          <div className="w-full h-16 relative">
            <svg
              className="w-full h-full preserve-aspect-ratio-none overflow-visible"
              viewBox="0 0 100 50"
            >
              {/* Background Track */}
              <path
                d="M 5,45 Q 50,5 95,45"
                fill="none"
                stroke="rgba(201, 162, 39, 0.2)"
                strokeDasharray="2 2"
                strokeWidth="1.5"
              />
              {/* Active Track */}
              <path
                d="M 5,45 Q 50,5 95,45"
                fill="none"
                stroke="#C9A227"
                strokeWidth="2.5"
              />
            </svg>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0B1F3A] border border-[#ECC246] px-3 py-0.5 rounded-full text-xs font-mono-code text-[#ECC246] shadow-md">
              Quedan {flight.remainingTime}
            </div>
          </div>

          <div className="flex justify-between w-full px-2 mt-2 font-mono-code text-xs text-[#99907b] z-10 relative">
            <span>{flight.departureTime}</span>
            <span>{flight.arrivalTime}</span>
          </div>
        </div>
      </section>

      {/* Alert Cards Grid (Bento Style) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Gate Change Alert */}
        <div className="bg-[#323536]/50 rounded-2xl p-5 border-l-4 border-red-400 flex items-start gap-3 shadow-lg">
          <span className="material-symbols-outlined text-red-400 mt-0.5 icon-fill">
            warning
          </span>
          <div>
            <h3 className="font-bold text-[#e1e3e4] mb-1">Cambio de Puerta</h3>
            <p className="text-sm text-[#99907b] leading-relaxed">
              Nueva puerta asignada para llegada: <strong>{flight.gate}</strong>
              . Vehículo ejecutivo reasignado a nueva terminal.
            </p>
          </div>
        </div>

        {/* Security Status Alert */}
        <div className="bg-[#323536]/50 rounded-2xl p-5 border-l-4 border-[#ECC246] flex items-start gap-3 shadow-lg">
          <span className="material-symbols-outlined text-[#ECC246] mt-0.5 icon-fill">
            shield
          </span>
          <div>
            <h3 className="font-bold text-[#e1e3e4] mb-1">AeroGuard Activo</h3>
            <p className="text-sm text-[#99907b] leading-relaxed">
              Equipo de escolta en posición JFK T4. Protocolo de extracción
              rápida confirmado.
            </p>
          </div>
        </div>
      </section>

      {/* Logistics Milestone Timeline */}
      <section className="bg-[#0B1F3A] rounded-2xl p-6 border border-[#1A1A1A] shadow-xl">
        <h3 className="text-lg font-bold text-[#e1e3e4] mb-6 border-b border-[#323536] pb-3">
          Itinerario Logístico
        </h3>

        <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#323536]">
          {/* Completed */}
          <div className="relative">
            <span className="absolute -left-6 top-1 w-3 h-3 bg-[#ECC246] rounded-full ring-4 ring-[#0B1F3A]" />
            <div className="opacity-60">
              <p className="font-mono-code text-xs text-[#ECC246] uppercase">
                08:00 AM
              </p>
              <p className="text-sm text-[#e1e3e4] line-through">
                Documentación VIP
              </p>
            </div>
          </div>

          {/* Completed */}
          <div className="relative">
            <span className="absolute -left-6 top-1 w-3 h-3 bg-[#ECC246] rounded-full ring-4 ring-[#0B1F3A]" />
            <div className="opacity-60">
              <p className="font-mono-code text-xs text-[#ECC246] uppercase">
                08:30 AM
              </p>
              <p className="text-sm text-[#e1e3e4] line-through">
                Filtro de Seguridad Privado
              </p>
            </div>
          </div>

          {/* Completed */}
          <div className="relative">
            <span className="absolute -left-6 top-1 w-3 h-3 bg-[#ECC246] rounded-full ring-4 ring-[#0B1F3A]" />
            <div className="opacity-60">
              <p className="font-mono-code text-xs text-[#ECC246] uppercase">
                09:45 AM
              </p>
              <p className="text-sm text-[#e1e3e4] line-through">
                Abordaje Prioritario
              </p>
            </div>
          </div>

          {/* Completed */}
          <div className="relative">
            <span className="absolute -left-6 top-1 w-3 h-3 bg-[#ECC246] rounded-full ring-4 ring-[#0B1F3A]" />
            <div className="opacity-60">
              <p className="font-mono-code text-xs text-[#ECC246] uppercase">
                10:30 AM
              </p>
              <p className="text-sm text-[#e1e3e4] line-through">Despegue</p>
            </div>
          </div>

          {/* Pending / Active */}
          <div className="relative">
            <span className="absolute -left-6.5 top-0.5 w-4 h-4 border-2 border-[#ECC246] bg-[#050B14] rounded-full animate-pulse" />
            <div>
              <p className="font-mono-code text-xs text-[#99907b] uppercase">
                03:45 PM (Estimado)
              </p>
              <p className="text-[#e1e3e4] font-semibold text-base">
                Aterrizaje en JFK (T4)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="flex flex-col sm:flex-row gap-4 pt-2">
        <button
          onClick={handleNotify}
          className="flex-1 bg-[#ECC246] text-[#3d2e00] font-bold py-4 px-6 rounded-full hover:bg-[#ffe08e] transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg"
        >
          <span className="material-symbols-outlined icon-fill">
            {notified ? 'check_circle' : 'notifications_active'}
          </span>
          <span>
            {notified ? '¡Asistente Notificado!' : 'Notificar a mi asistente'}
          </span>
        </button>

        <button
          onClick={() => setShowPlanBModal(true)}
          className="flex-1 bg-[#323536] text-[#e1e3e4] font-bold py-4 px-6 rounded-full hover:bg-[#373a3b] transition-all active:scale-95 border border-[#4d4635] flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined">alt_route</span>
          <span>Ver plan B de conexiones</span>
        </button>
      </section>

      {/* Plan B Modal */}
      {showPlanBModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B1F3A] border border-[#ECC246]/40 rounded-2xl max-w-md w-full p-6 space-y-4 text-[#e1e3e4] shadow-2xl relative">
            <button
              onClick={() => setShowPlanBModal(false)}
              className="absolute top-4 right-4 text-[#99907b] hover:text-[#e1e3e4]"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="flex items-center gap-2 text-[#ECC246]">
              <span className="material-symbols-outlined text-2xl">
                alt_route
              </span>
              <h3 className="text-lg font-bold">
                Plan B de Conexiones Operativas
              </h3>
            </div>

            <div className="space-y-3 font-mono-code text-xs text-[#d1c5af]">
              <div className="p-3 bg-[#111415] rounded-xl border border-[#323536]">
                <p className="font-bold text-[#ECC246] mb-1">
                  Opción 1: Vuelo Directo JFK - TEB Helicóptero
                </p>
                <p>Transferencia helipuerto JFK Blade en 12 mins.</p>
              </div>

              <div className="p-3 bg-[#111415] rounded-xl border border-[#323536]">
                <p className="font-bold text-[#ECC246] mb-1">
                  Opción 2: Escolta Terrestre de Rescate
                </p>
                <p>Convoy con 2 vehículos blindados de respaldo en Terminal 4.</p>
              </div>
            </div>

            <button
              onClick={() => setShowPlanBModal(false)}
              className="w-full py-3 bg-[#ECC246] text-[#3d2e00] font-bold rounded-full hover:bg-[#ffe08e] transition"
            >
              Cerrar y Mantener Plan Original
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
