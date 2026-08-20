import React, { useState } from 'react';

interface SosModalProps {
  onClose: () => void;
}

export const SosModal: React.FC<SosModalProps> = ({ onClose }) => {
  const [holding, setHolding] = useState(false);
  const [sosActivated, setSosActivated] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const [hotelCheckedIn, setHotelCheckedIn] = useState(false);
  const [liveLocation, setLiveLocation] = useState(true);

  const handleHoldStart = () => {
    setHolding(true);
    let current = 0;
    const interval = setInterval(() => {
      current += 20;
      setHoldProgress(current);
      if (current >= 100) {
        clearInterval(interval);
        setSosActivated(true);
        setHolding(false);
      }
    }, 150);

    const cleanup = () => {
      clearInterval(interval);
      setHolding(false);
      setHoldProgress(0);
    };

    window.addEventListener('mouseup', cleanup, { once: true });
    window.addEventListener('touchend', cleanup, { once: true });
  };

  const handleCall = (contact: string) => {
    alert(`Iniciando llamada de emergencia directa a: ${contact}`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#050B14]/95 backdrop-blur-xl overflow-y-auto p-4 sm:p-6 animate-fadeIn">
      {/* Top Header */}
      <div className="max-w-3xl mx-auto flex justify-between items-center pb-4 border-b border-[#323536]">
        <div className="flex items-center gap-2 text-red-400">
          <span className="material-symbols-outlined text-2xl icon-fill">
            emergency
          </span>
          <h2 className="text-xl font-bold text-[#e1e3e4]">
            AeroGuard VIP - Protocolo SOS
          </h2>
        </div>

        <button
          onClick={onClose}
          className="text-[#99907b] hover:text-[#e1e3e4] p-2 rounded-full"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>
      </div>

      <div className="max-w-3xl mx-auto space-y-8 py-6">
        {/* SOS Button Section */}
        <section className="flex flex-col items-center justify-center pt-2">
          {sosActivated ? (
            <div className="bg-red-950/90 border-2 border-red-500 rounded-3xl p-6 text-center space-y-3 w-full max-w-md shadow-[0_0_50px_rgba(239,68,68,0.5)]">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto text-white animate-bounce">
                <span className="material-symbols-outlined text-3xl icon-fill">
                  warning
                </span>
              </div>
              <h3 className="text-2xl font-extrabold text-red-400">
                ¡ALERTA SOS ENVIADA!
              </h3>
              <p className="text-xs text-[#e1e3e4] font-mono-code">
                El Centro de Operaciones Tácticas AeroGuard y el Equipo Alpha han recibido sus coordenadas GPS de precisión.
              </p>
              <div className="p-3 bg-[#050B14] rounded-xl text-xs font-mono-code text-[#ECC246] border border-[#ECC246]/30">
                Respuesta táctica en camino: ~4 minutos
              </div>
              <button
                onClick={() => setSosActivated(false)}
                className="text-xs text-red-300 underline pt-2"
              >
                Cancelar falso disparo SOS
              </button>
            </div>
          ) : (
            <button
              onMouseDown={handleHoldStart}
              onTouchStart={handleHoldStart}
              className="sos-pulse-btn w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-red-500 text-red-950 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(255,180,171,0.4)] hover:scale-105 active:scale-95 transition-all relative overflow-hidden group border-4 border-red-400"
            >
              {holding && (
                <div
                  className="absolute inset-0 bg-red-700 transition-all duration-150"
                  style={{ opacity: holdProgress / 100 }}
                />
              )}
              <span className="material-symbols-outlined text-6xl mb-1 z-10 icon-fill">
                emergency
              </span>
              <span className="text-3xl font-extrabold tracking-widest z-10">
                SOS
              </span>
              <span className="font-mono-code text-[10px] uppercase mt-2 opacity-90 text-center px-4 z-10 font-bold">
                {holding ? `Mantenga (${holdProgress}%)` : 'Mantenga presionado'}
              </span>
            </button>
          )}
        </section>

        {/* Protection Active & Hotel Check-in Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Protection Active Card */}
          <div className="bg-[#191c1d] rounded-2xl p-5 border-l-4 border-[#ECC246] relative overflow-hidden shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ECC246] opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ECC246]" />
              </span>
              <h3 className="font-bold text-[#ECC246]">Protección activa</h3>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center bg-[#282a2b] rounded-xl p-3">
                <span className="text-[#e1e3e4] flex items-center gap-2 text-xs">
                  <span className="material-symbols-outlined text-[#99907b] text-base">
                    location_on
                  </span>
                  Ubicación en vivo
                </span>

                <button
                  onClick={() => setLiveLocation(!liveLocation)}
                  className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                    liveLocation ? 'bg-[#c9a227]' : 'bg-[#323536]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      liveLocation ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="pt-2 border-t border-[#323536]">
                <p className="font-mono-code text-[10px] text-[#99907b] uppercase tracking-wider mb-2">
                  CONTACTO DE SEGURIDAD ASIGNADO
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#384a67] flex items-center justify-center text-[#a7b9db] font-bold text-xs">
                    CA
                  </div>
                  <div>
                    <p className="font-bold text-[#e1e3e4] text-sm">
                      Carlos Álvarez
                    </p>
                    <p className="font-mono-code text-xs text-[#ECC246]">
                      Equipo Alpha
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hotel Check-in Card */}
          <div className="bg-[#191c1d] rounded-2xl p-5 flex flex-col justify-between shadow-xl border border-[#323536]">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-blue-300 icon-fill">
                  hotel
                </span>
                <h3 className="font-bold text-[#e1e3e4]">
                  Check-in de Seguridad
                </h3>
              </div>
              <p className="text-xs text-[#d1c5af] leading-relaxed mb-4">
                Ubicación actual estimada: Hotel Ritz, Madrid. Confirme su llegada para actualizar su estado de seguridad.
              </p>
            </div>

            <button
              onClick={() => setHotelCheckedIn(!hotelCheckedIn)}
              className={`w-full rounded-full py-3 px-4 font-bold text-xs flex justify-center items-center gap-2 transition-all active:scale-95 ${
                hotelCheckedIn
                  ? 'bg-emerald-900/60 text-emerald-400 border border-emerald-500'
                  : 'bg-[#c9a227] text-[#4b3a00] hover:bg-[#ecc246]'
              }`}
            >
              <span className="material-symbols-outlined text-base">
                {hotelCheckedIn ? 'check_circle' : 'how_to_reg'}
              </span>
              <span>
                {hotelCheckedIn
                  ? 'Llegada al Hotel Confirmada'
                  : 'Confirmar llegada al hotel'}
              </span>
            </button>
          </div>
        </section>

        {/* Emergency Contacts */}
        <section className="space-y-3">
          <h3 className="text-base font-bold text-[#e1e3e4] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ECC246]">
              contacts
            </span>
            Contactos de Emergencia Directa
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div
              onClick={() => handleCall('Asistente (Línea directa)')}
              className="bg-[#1d2021] rounded-xl p-3.5 flex items-center justify-between border border-transparent hover:border-[#ECC246]/40 cursor-pointer transition"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#323536] flex items-center justify-center text-[#ECC246]">
                  <span className="material-symbols-outlined text-lg">
                    support_agent
                  </span>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#e1e3e4]">Asistente</p>
                  <p className="font-mono-code text-[10px] text-[#99907b]">
                    Línea directa
                  </p>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#ECC246]">call</span>
            </div>

            <div
              onClick={() => handleCall('Seguridad Local (Escolta asignada)')}
              className="bg-[#1d2021] rounded-xl p-3.5 flex items-center justify-between border border-transparent hover:border-[#ECC246]/40 cursor-pointer transition"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#323536] flex items-center justify-center text-[#ECC246]">
                  <span className="material-symbols-outlined text-lg">
                    local_police
                  </span>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#e1e3e4]">
                    Seguridad Local
                  </p>
                  <p className="font-mono-code text-[10px] text-[#99907b]">
                    Escolta asignada
                  </p>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#ECC246]">call</span>
            </div>

            <div
              onClick={() => handleCall('Embajada / Consulado')}
              className="bg-[#1d2021] rounded-xl p-3.5 flex items-center justify-between border border-transparent hover:border-[#ECC246]/40 cursor-pointer transition"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#323536] flex items-center justify-center text-[#ECC246]">
                  <span className="material-symbols-outlined text-lg">
                    account_balance
                  </span>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#e1e3e4]">Embajada</p>
                  <p className="font-mono-code text-[10px] text-[#99907b]">
                    Consulado cercano
                  </p>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#ECC246]">call</span>
            </div>
          </div>
        </section>

        {/* Recent Security Alerts */}
        <section className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-[#e1e3e4] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ECC246]">
                warning
              </span>
              Alertas Recientes de la Zona
            </h3>
          </div>

          <div className="bg-[#1d2021] rounded-2xl overflow-hidden border border-[#323536] divide-y divide-[#323536]">
            <div className="p-4 flex items-start gap-3">
              <span className="material-symbols-outlined text-red-400 mt-0.5">
                warning_amber
              </span>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-sm font-bold text-[#e1e3e4]">
                    Manifestación en ruta al aeropuerto
                  </h4>
                  <span className="font-mono-code text-[10px] text-[#99907b]">
                    Hace 15 min
                  </span>
                </div>
                <p className="text-xs text-[#d1c5af] leading-relaxed">
                  Se ha detectado congestión inusual y protestas pacíficas cerca de la Terminal 2. Su ruta ha sido recalculada.
                </p>
              </div>
            </div>

            <div className="p-4 flex items-start gap-3 opacity-80">
              <span className="material-symbols-outlined text-blue-300 mt-0.5">
                info
              </span>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-sm font-bold text-[#e1e3e4]">
                    Actualización de clima adverso
                  </h4>
                  <span className="font-mono-code text-[10px] text-[#99907b]">
                    Ayer
                  </span>
                </div>
                <p className="text-xs text-[#d1c5af] leading-relaxed">
                  Pronóstico de lluvia intensa para esta noche. El equipo de logística terrestre ha tomado precauciones.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
