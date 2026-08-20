import React from 'react';
import { NavTab } from '../types';

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const tabs: { id: NavTab; label: string; icon: string }[] = [
    { id: 'inicio', label: 'Inicio', icon: 'home' },
    { id: 'vuelos', label: 'Vuelos Live', icon: 'flight' },
    { id: 'viajes', label: 'Viajes', icon: 'flight_takeoff' },
    { id: 'golf', label: 'Golf VIP', icon: 'sports_golf' },
    { id: 'pasajeros', label: 'Familia RBS', icon: 'family_restroom' },
    { id: 'invitados', label: 'Invitados VIP', icon: 'group_add' },
    { id: 'mapa', label: 'Mapa seguro', icon: 'security' },
    { id: 'concierge', label: 'Concierge', icon: 'support_agent' },
    { id: 'perfil', label: 'Perfil', icon: 'person' },
  ];

  return (
    <>
      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 pb-4 pt-2 bg-[#1d2021]/95 backdrop-blur-lg border-t border-[#323536] shadow-[0_-4px_24px_rgba(0,0,0,0.6)] md:hidden rounded-t-2xl">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center w-16 transition-all duration-150 active:scale-90 ${
                isActive
                  ? 'text-[#ECC246] font-bold'
                  : 'text-[#99907b] hover:text-[#ECC246]'
              }`}
            >
              <span
                className={`material-symbols-outlined text-2xl mb-0.5 ${
                  isActive ? 'icon-fill text-[#ECC246]' : ''
                }`}
              >
                {tab.icon}
              </span>
              <span className="text-[10px] font-medium tracking-tight truncate w-full text-center">
                {tab.label}
              </span>
              {isActive && (
                <span className="w-8 h-0.5 bg-[#ECC246] rounded-full mt-1 animate-pulse" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Desktop Side Navigation Bar */}
      <aside className="hidden md:flex flex-col fixed left-0 top-0 h-full w-20 bg-[#111415] border-r border-[#323536] py-6 items-center z-50 shadow-2xl">
        <div className="w-10 h-10 rounded-full overflow-hidden border border-[#C9A227]/50 mb-10 shadow-lg">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZPMlJySwm8uW5JeIwMSOsdXywYnPSL_yzPjPua2OsnLvFYMOj6CFVmY6xgtsPb9Xlvr2S_xiN704JyUeXiQjlDnEPKTKpCn7At2Nt3WyKAuIMLl-dcNSnLFb8RNcfz6NZ5P_LaCH9zPcrHzTQqINCymchHtPkRkoQsHRFs_bQWovaxXOqDHQRGkiLHYwifgrDIUPx8uE_K7disHoUum1p07RcWogR1MqwSwC48XkhBruI_OM7RPjGGw"
            alt="VIP Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <nav className="flex flex-col gap-6 w-full items-center">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                title={tab.label}
                className={`relative p-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'text-[#ECC246] bg-[#0B1F3A]'
                    : 'text-[#99907b] hover:text-[#ECC246] hover:bg-[#1d2021]'
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 bg-[#ECC246] rounded-r-md" />
                )}
                <span className={`material-symbols-outlined text-2xl ${isActive ? 'icon-fill' : ''}`}>
                  {tab.icon}
                </span>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
};
