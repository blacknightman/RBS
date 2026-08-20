import React, { useState } from 'react';
import { RestaurantItem } from '../types';

interface RestaurantesViewProps {
  restaurants: RestaurantItem[];
  onReserveViaConcierge: (restaurantName: string) => void;
}

export const RestaurantesView: React.FC<RestaurantesViewProps> = ({
  restaurants,
  onReserveViaConcierge,
}) => {
  const [activeFilter, setActiveFilter] = useState('Todos');

  const filters = ['Todos', 'Cocina', 'Distancia', 'Privacidad', 'Zona segura'];

  return (
    <div className="space-y-6 pb-24 md:pb-8 max-w-6xl mx-auto">
      {/* Header Section */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#e1e3e4] mb-3">
          Restaurantes recomendados
        </h2>

        {/* Filter Pills */}
        <div className="flex overflow-x-auto gap-2.5 pb-2 hide-scrollbar">
          {filters.map((f) => {
            const isActive = activeFilter === f;
            return (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`flex-shrink-0 px-4 py-2 rounded-full font-mono-code text-xs font-semibold transition-all active:scale-95 ${
                  isActive
                    ? 'bg-[#c9a227] text-[#4b3a00]'
                    : 'bg-[#1d2021] text-[#e1e3e4] border border-[#4d4635] hover:border-[#ECC246]'
                }`}
              >
                <span>{f}</span>
                {f !== 'Todos' && (
                  <span className="material-symbols-outlined align-middle text-sm ml-1">
                    {f === 'Zona segura' ? 'check' : 'expand_more'}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bento Grid / Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {restaurants.map((item, idx) => {
          const isFullWidth = idx === 2; // Alta Vista spans full on desktop

          return (
            <div
              key={item.id}
              className={`bg-[#0B1F3A] rounded-2xl overflow-hidden border border-[#1A1A1A] group hover:border-[#ECC246]/50 transition-all duration-300 relative shadow-xl ${
                isFullWidth ? 'lg:col-span-2' : ''
              }`}
            >
              {/* Gold Accent Left */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#ECC246] z-20" />

              <div
                className={`relative w-full ${
                  isFullWidth ? 'h-64 sm:h-80 lg:h-96' : 'h-64 sm:h-80'
                }`}
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-[#0B1F3A]/20 to-transparent" />

                {/* Badges */}
                <div className="absolute top-4 right-4 flex gap-2 z-10">
                  <span className="bg-[#ECC246]/20 backdrop-blur-md text-[#ECC246] px-3 py-1 rounded-full font-mono-code text-xs border border-[#ECC246]/40 flex items-center gap-1 shadow-lg font-bold">
                    <span className="material-symbols-outlined text-sm icon-fill">
                      star
                    </span>
                    {item.badge}
                  </span>
                  <span className="bg-[#111415]/80 backdrop-blur-md text-[#e1e3e4] px-3 py-1 rounded-full font-mono-code text-xs border border-[#323536] shadow-lg font-bold">
                    {item.priceRange}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#e1e3e4]">
                      {item.name}
                    </h3>
                    <span className="text-[#d1c5af] font-mono-code text-xs flex items-center shrink-0">
                      <span className="material-symbols-outlined text-sm mr-0.5 text-[#ECC246]">
                        location_on
                      </span>
                      {item.distance}
                    </span>
                  </div>

                  <p className="text-sm text-[#d1c5af] leading-relaxed mb-5">
                    {item.description}
                  </p>
                </div>

                <button
                  onClick={() => onReserveViaConcierge(item.name)}
                  className="w-full bg-[#ECC246] text-[#3d2e00] font-bold py-3.5 rounded-full hover:bg-[#ffe08e] transition-colors active:scale-[0.98] flex justify-center items-center gap-2 text-sm shadow-md"
                >
                  <span>Reservar vía concierge</span>
                  <span className="material-symbols-outlined text-base">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
