import React, { useState } from 'react';

interface MapaSeguroViewProps {
  onOpenSos: () => void;
}

export const MapaSeguroView: React.FC<MapaSeguroViewProps> = ({ onOpenSos }) => {
  const [isNavigating, setIsNavigating] = useState(false);
  const [locationShared, setLocationShared] = useState(false);
  const [navStep, setNavStep] = useState('Avanzar 1.2 km por Av. Paseo de la Reforma (Corredor Seguro)');

  const handleStartRoute = () => {
    setIsNavigating(!isNavigating);
  };

  const handleShareLocation = () => {
    setLocationShared(true);
    setTimeout(() => setLocationShared(false), 3000);
  };

  return (
    <div className="relative h-[calc(100vh-100px)] min-h-[600px] w-full rounded-2xl overflow-hidden border border-[#1A1A1A] shadow-2xl">
      {/* Base Tactical Map Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCssojSOBSa8O5kjQTPVQWgBesZzr8-7zLWMkb_4L7szFHNnXc3Hk2NK0zeWn8QKAjxcm3bYEAw4PTjjCAuIHUj5jh-qZ-krvYaOFbCsCFOpsc11xKcDiUL1cDJoPGCmWJGMiQO9kpnsqtxBhJGlTDCj62es_xmB2zQkrAcIJgxl31cJtPcY5M2OFa-7ncS5FqeAQrPrWFtmII51QgOJxg4aI67-C84fhM7wvP2-SLnxtZNwSrHeKGctQ')`,
        }}
      />
      {/* Tonal Overlay */}
      <div className="absolute inset-0 bg-[#050B14]/75 bg-gradient-to-b from-[#050B14]/90 via-transparent to-[#0B1F3A]/90 mix-blend-multiply" />

      {/* SVG Tactical Layer */}
      <svg
        className="absolute inset-0 w-full h-full z-10 pointer-events-none"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 400 800"
      >
        <defs>
          <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="redGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Zona Riesgo Alto (Red Hatching) */}
        <polygon
          points="50,250 180,220 200,320 80,350"
          fill="rgba(255, 180, 171, 0.15)"
          stroke="rgba(255, 180, 171, 0.8)"
          strokeDasharray="4,4"
          strokeWidth="1.5"
          filter="url(#redGlow)"
        />

        {/* Precaución (Amber) */}
        <polygon
          points="250,150 350,120 380,240 220,280"
          fill="rgba(245, 158, 11, 0.1)"
          stroke="rgba(245, 158, 11, 0.5)"
          strokeDasharray="2,6"
          strokeWidth="1"
        />

        {/* Safe Route Line */}
        <path
          d="M 120,600 C 100,480 280,380 150,120"
          fill="none"
          stroke="#C9A227"
          strokeWidth="4"
          filter="url(#goldGlow)"
          strokeLinecap="round"
        />
        <path
          d="M 120,600 C 100,480 280,380 150,120"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeDasharray="6,6"
          opacity="0.8"
          strokeLinecap="round"
        />
      </svg>

      {/* HTML Markers Overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {/* Airport Pin */}
        <div className="absolute top-[15%] left-[35%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="bg-[#1d2021] text-[#e1e3e4] px-3 py-1 rounded-full font-mono-code text-xs shadow-lg mb-1 border border-[#4d4635] flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">flight_takeoff</span>
            Aeropuerto Int.
          </div>
          <div className="w-4 h-4 bg-[#ECC246] rounded-full shadow-[0_0_12px_#ECC246] border-2 border-[#0B1F3A]" />
        </div>

        {/* Destination Pin */}
        <div className="absolute bottom-[28%] left-[28%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="w-6 h-6 bg-[#c9a227] rounded-full flex items-center justify-center shadow-[0_0_16px_#c9a227] relative z-10 border-2 border-[#0B1F3A]">
            <span className="material-symbols-outlined text-[#4b3a00] text-xs icon-fill">
              person
            </span>
          </div>
          <div className="bg-[#050B14] text-[#ECC246] px-3 py-1 rounded-full font-mono-code text-xs shadow-lg mt-1 border border-[#ECC246]/40">
            Ubicación Actual
          </div>
        </div>

        {/* Red Zone Label */}
        <div className="absolute top-[35%] left-[30%] -translate-x-1/2 -translate-y-1/2">
          <div className="bg-red-950/90 text-red-300 px-2.5 py-1 rounded shadow-lg border border-red-500/50 font-mono-code text-[11px] flex items-center gap-1">
            <span className="material-symbols-outlined text-xs text-red-400">
              warning
            </span>
            Zona de riesgo alto
          </div>
        </div>

        {/* Safe Corridor Shield */}
        <div className="absolute top-[48%] left-[55%] -translate-x-1/2 -translate-y-1/2">
          <div className="bg-[#0B1F3A] p-1.5 rounded-full border border-[#ECC246]/40 shadow-lg">
            <span className="material-symbols-outlined text-[#ECC246] text-base icon-fill">
              shield
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Banner if Active */}
      {isNavigating && (
        <div className="absolute top-4 left-4 right-4 z-30 bg-[#0B1F3A] border border-[#ECC246] p-4 rounded-xl shadow-2xl flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#ECC246] rounded-full flex items-center justify-center text-[#3d2e00] font-bold">
              <span className="material-symbols-outlined text-2xl">
                navigation
              </span>
            </div>
            <div>
              <p className="font-mono-code text-xs text-[#ECC246] font-bold uppercase">
                NAVEGACIÓN TÁCTICA ACTIVA
              </p>
              <p className="text-sm font-semibold text-[#e1e3e4]">{navStep}</p>
            </div>
          </div>
          <button
            onClick={() => setIsNavigating(false)}
            className="text-xs bg-red-950/60 text-red-400 border border-red-500/40 px-3 py-1.5 rounded-full font-bold hover:bg-red-900"
          >
            Detener
          </button>
        </div>
      )}

      {/* Bottom Sheet Card Overlay */}
      <div className="absolute bottom-0 left-0 w-full bg-[#1d2021]/95 backdrop-blur-md z-30 rounded-t-2xl pt-3 px-5 pb-6 border-t border-[#323536] shadow-[0_-12px_40px_rgba(0,0,0,0.8)]">
        {/* Drag Handle */}
        <div className="w-10 h-1 bg-[#4d4635] rounded-full mx-auto mb-3 opacity-80" />

        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-bold text-[#e1e3e4]">
              Ruta segura recomendada
            </h2>
            <div className="flex items-center gap-1.5 px-3 py-0.5 mt-2 bg-red-950/40 border border-red-500/30 rounded-full w-max">
              <span className="material-symbols-outlined text-sm text-red-400 icon-fill">
                gpp_bad
              </span>
              <span className="font-mono-code text-[11px] text-red-400 uppercase tracking-wider font-semibold">
                Evita 2 zonas rojas
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-3xl font-extrabold text-[#ECC246] tracking-tight">
              28
            </span>
            <span className="font-mono-code text-xs text-[#ecc246] block uppercase font-bold">
              MIN
            </span>
          </div>
        </div>

        {/* Driver Info Card */}
        <div className="mt-4 bg-[#323536]/80 p-3.5 rounded-xl border border-[#4d4635]/50 flex items-center gap-3">
          <div className="relative shrink-0">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbJZL8rZBiIcnRqec71goKGjsG9wHeD37Ot83XV5OCoCxK-eEQAJlvI_6fp_N6x82dZAGs_OT-wQVMqDA_Yppd6xbS5Ne8nvGeXcl9xecN8FMe5EnR7rZ9WZ4SFfsrp-NcNY-dIUPizwOBq8pe53mE1ZxHT-2EhhJ3NykwLpERsjtwRyW4jmyTeibUUmFL4kkNZyq0V6_w2gQGLMK_F2osYpGJY6k5enou73Tpc1ugIWcJCoFbEBU9yw"
              alt="Chofer Asignado"
              className="w-11 h-11 rounded-full object-cover border border-[#99907b]/50"
            />
            <div className="absolute -bottom-1 -right-1 bg-[#1d2021] rounded-full p-0.5">
              <span className="material-symbols-outlined text-[#ECC246] text-xs icon-fill">
                verified_user
              </span>
            </div>
          </div>

          <div className="flex-1">
            <h3 className="font-bold text-[#e1e3e4] text-sm leading-tight">
              Alejandro V.
            </h3>
            <p className="text-xs text-[#d1c5af]">Suburban Blindada · XYZ-123</p>
          </div>

          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 text-[#ECC246]">
              <span className="material-symbols-outlined text-xs icon-fill">
                star
              </span>
              <span className="font-mono-code text-xs font-bold">5.0</span>
            </div>
            <span className="font-mono-code text-[10px] text-[#99907b] mt-0.5">
              AeroGuard Elite
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 flex flex-col gap-2.5">
          <button
            onClick={handleStartRoute}
            className={`w-full py-3.5 rounded-full font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg ${
              isNavigating
                ? 'bg-red-600 text-white'
                : 'bg-[#c9a227] text-[#4b3a00] hover:bg-[#ecc246]'
            }`}
          >
            <span className="material-symbols-outlined icon-fill">
              {isNavigating ? 'pause' : 'navigation'}
            </span>
            <span>
              {isNavigating
                ? 'Pausar Navegación Táctica'
                : 'Iniciar ruta segura'}
            </span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleShareLocation}
              className="py-2.5 bg-transparent text-[#ECC246] border border-[#4d4635] font-bold text-xs rounded-full flex items-center justify-center gap-1.5 active:scale-95 hover:bg-[#323536]/30"
            >
              <span className="material-symbols-outlined text-sm">
                share_location
              </span>
              <span>{locationShared ? '¡Enlace Copiado!' : 'Ubicación en vivo'}</span>
            </button>

            <button
              onClick={onOpenSos}
              className="py-2.5 bg-red-950/50 text-red-300 border border-red-500/40 font-bold text-xs rounded-full flex items-center justify-center gap-1.5 active:scale-95 hover:bg-red-900/50"
            >
              <span className="material-symbols-outlined text-sm text-red-400 icon-fill">
                emergency
              </span>
              <span>Protocolo SOS</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
