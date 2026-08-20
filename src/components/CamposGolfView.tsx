import React, { useState } from 'react';
import { GolfCourseItem } from '../types';
import { sampleGolfCourses } from '../mockData';

interface CamposGolfViewProps {
  onOpenConciergeWithQuery?: (query: string) => void;
}

export const CamposGolfView: React.FC<CamposGolfViewProps> = ({
  onOpenConciergeWithQuery,
}) => {
  const [selectedCity, setSelectedCity] = useState<string>('TODOS');
  const [courses] = useState<GolfCourseItem[]>(sampleGolfCourses);

  const filteredCourses =
    selectedCity === 'TODOS'
      ? courses
      : courses.filter(
          (c) =>
            c.destinationCity.toLowerCase().includes(selectedCity.toLowerCase()) ||
            c.destinationCode.toLowerCase() === selectedCity.toLowerCase()
        );

  return (
    <div className="space-y-6 pb-24 md:pb-8">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#0B1F3A] via-[#111415] to-[#1d2021] p-6 rounded-2xl border border-[#ECC246]/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <span className="material-symbols-outlined text-9xl text-[#ECC246]">sports_golf</span>
        </div>

        <div className="relative z-10 space-y-2 max-w-2xl">
          <span className="px-3 py-1 bg-[#ECC246]/20 border border-[#ECC246]/40 text-[#ECC246] rounded-full text-xs font-mono-code font-bold uppercase tracking-wider">
            Experiencias Exclusivas de Destino
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#ECC246] tracking-tight">
            Campos de Golf VIP Cercanos
          </h1>
          <p className="text-sm text-[#d1c5af]">
            Campos de Golf Championship de 18 hoyos seleccionados en sus destinos de viaje habituales. Cuentan con helipuerto privado, reserva de Tee-Time garantizada vía Concierge, caddie profesional y seguridad perimetral.
          </p>
        </div>
      </section>

      {/* Destination Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { label: 'Todos los Destinos', value: 'TODOS' },
          { label: 'Nueva York (JFK / TEB)', value: 'Nueva York' },
          { label: 'Ciudad de México (MEX)', value: 'Ciudad de México' },
          { label: 'Miami (MIA)', value: 'Miami' },
          { label: 'Madrid (MAD)', value: 'Madrid' },
        ].map((tab) => {
          const isActive = selectedCity === tab.value;
          return (
            <button
              key={tab.value}
              onClick={() => setSelectedCity(tab.value)}
              className={`px-4 py-2 rounded-xl text-xs font-mono-code font-bold transition-all shrink-0 active:scale-95 ${
                isActive
                  ? 'bg-[#ECC246] text-[#3d2e00] shadow-md'
                  : 'bg-[#1d2021] text-[#99907b] hover:text-[#e1e3e4] border border-[#323536]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Golf Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCourses.map((golf) => (
          <article
            key={golf.id}
            className="bg-[#1d2021] rounded-2xl border border-[#323536] overflow-hidden shadow-xl hover:border-[#ECC246]/50 transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Image Banner */}
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={golf.imageUrl}
                  alt={golf.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1d2021] via-transparent to-black/40" />

                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-[#0B1F3A]/90 backdrop-blur-md text-[#ECC246] border border-[#ECC246]/40 rounded-full font-mono-code text-xs font-bold">
                    📍 {golf.destinationCity}
                  </span>
                  {golf.helipadAccess && (
                    <span className="px-2.5 py-1 bg-emerald-950/80 backdrop-blur-md text-emerald-300 border border-emerald-500/40 rounded-full font-mono-code text-xs font-bold">
                      🚁 Helipuerto Privado
                    </span>
                  )}
                </div>

                <div className="absolute top-3 right-3 bg-[#111415]/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[#ECC246] font-mono-code text-xs font-bold flex items-center gap-1 border border-[#ECC246]/30">
                  <span className="material-symbols-outlined text-sm icon-fill">star</span>
                  <span>{golf.rating.toFixed(1)}</span>
                </div>
              </div>

              {/* Course Info */}
              <div className="p-5 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-[#e1e3e4] group-hover:text-[#ECC246] transition-colors">
                    {golf.name}
                  </h3>
                  <span className="text-xs font-mono-code text-[#99907b] flex items-center gap-1 mt-1">
                    <span className="material-symbols-outlined text-sm">near_me</span>
                    {golf.distanceFromCity}
                  </span>
                </div>

                <p className="text-sm text-[#d1c5af] leading-relaxed">
                  {golf.description}
                </p>

                {/* Specs Grid */}
                <div className="grid grid-cols-3 gap-2 bg-[#111415] p-3 rounded-xl border border-[#323536] text-center font-mono-code text-xs">
                  <div>
                    <span className="block text-[#99907b] text-[10px]">Hoyos / Par</span>
                    <span className="font-bold text-[#ECC246]">{golf.holes} Hoyos / Par {golf.par}</span>
                  </div>
                  <div>
                    <span className="block text-[#99907b] text-[10px]">Distancia</span>
                    <span className="font-bold text-[#e1e3e4]">{golf.yardage.toLocaleString()} Yardas</span>
                  </div>
                  <div>
                    <span className="block text-[#99907b] text-[10px]">Green Fee</span>
                    <span className="font-bold text-[#ECC246]">${golf.greenFeeUsd} USD</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-[#d1c5af] font-mono-code">
                  <div className="flex items-center justify-between py-1 border-b border-[#323536]/60">
                    <span className="text-[#99907b]">Dress Code:</span>
                    <span className="text-[#e1e3e4] truncate max-w-[200px]">{golf.dressCode}</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-[#323536]/60">
                    <span className="text-[#99907b]">Nivel de Seguridad:</span>
                    <span className="text-emerald-400 font-bold">{golf.securityRating}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Footer */}
            <div className="p-5 pt-0">
              <button
                onClick={() => {
                  if (onOpenConciergeWithQuery) {
                    onOpenConciergeWithQuery(
                      `Solicitud de Reserva de Tee-Time en ${golf.name} (${golf.destinationCity}). Favor coordinar horarios de salida, Caddie Profesional y helipuerto.`
                    );
                  }
                }}
                className="w-full bg-[#ECC246] hover:bg-[#ffe08e] text-[#3d2e00] font-bold text-xs py-3 px-4 rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-base">sports_golf</span>
                <span>Reservar Tee-Time con Concierge</span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
