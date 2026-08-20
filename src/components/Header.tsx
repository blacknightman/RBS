import React from 'react';
import { UserProfile } from '../types';

interface HeaderProps {
  user: UserProfile;
  onProfileClick: () => void;
  onSosClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onProfileClick, onSosClick }) => {
  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-[#050B14]/95 backdrop-blur-md border-b border-[#1A1A1A] h-14 px-4 sm:px-6 flex justify-between items-center transition-all">
      <div className="flex items-center gap-3 cursor-pointer" onClick={onProfileClick}>
        <div className="w-8 h-8 rounded-full overflow-hidden border border-[#C9A227]/40 shadow-sm shrink-0">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-lg font-bold text-[#ECC246] tracking-tight">
          AeroGuard VIP
        </span>
      </div>

      <div className="flex items-center gap-2">
        {onSosClick && (
          <button
            onClick={onSosClick}
            className="px-2.5 py-1 rounded-full bg-red-950/40 border border-red-500/40 text-red-400 font-mono-code text-xs font-bold flex items-center gap-1 hover:bg-red-900/60 active:scale-95 transition"
            title="Activar SOS de Emergencia"
          >
            <span className="material-symbols-outlined text-sm icon-fill">emergency</span>
            <span>SOS</span>
          </button>
        )}
        <button
          onClick={onProfileClick}
          className="text-[#ECC246] hover:opacity-80 active:scale-95 transition-transform"
          title="Verificación VIP"
        >
          <span className="material-symbols-outlined icon-fill">verified</span>
        </button>
      </div>
    </header>
  );
};
