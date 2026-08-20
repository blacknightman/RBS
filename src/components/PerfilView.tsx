import React, { useState } from 'react';
import { UserProfile } from '../types';

interface PerfilViewProps {
  user: UserProfile;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
  onLogout: () => void;
}

export const PerfilView: React.FC<PerfilViewProps> = ({
  user,
  onUpdateUser,
  onLogout,
}) => {
  const [locationSharing, setLocationSharing] = useState(user.locationSharingActive);
  const [flightAlerts, setFlightAlerts] = useState(user.flightAlerts);
  const [globalAlerts, setGlobalAlerts] = useState(user.globalSecurityAlerts);
  const [promotions, setPromotions] = useState(user.promotions);

  const toggleLocation = () => {
    const val = !locationSharing;
    setLocationSharing(val);
    onUpdateUser({ locationSharingActive: val });
  };

  return (
    <div className="space-y-8 pb-24 md:pb-8 max-w-4xl mx-auto">
      {/* Profile Header */}
      <section className="flex flex-col items-center text-center mt-2">
        <div className="relative mb-3">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-24 h-24 rounded-full object-cover border-2 border-[#c9a227] shadow-xl"
          />
          <div className="absolute bottom-0 right-0 bg-[#c9a227] text-[#4b3a00] p-1.5 rounded-full flex items-center justify-center shadow-md">
            <span className="material-symbols-outlined text-sm icon-fill">
              shield
            </span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#e1e3e4] mb-1.5">
          {user.name}
        </h1>

        <div className="bg-[#ecc246]/10 text-[#ECC246] border border-[#c9a227]/30 px-4 py-1 rounded-full flex items-center gap-1.5 shadow-md">
          <span className="material-symbols-outlined text-sm">stars</span>
          <span className="font-mono-code text-xs uppercase tracking-widest font-semibold">
            MIEMBRO VIP
          </span>
        </div>
      </section>

      {/* Bento Grid Layout for Profile Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Documentos de viaje */}
        <div className="bg-[#0B1F3A] rounded-2xl p-5 border border-[#1A1A1A] shadow-xl flex flex-col justify-between hover:border-[#ECC246]/30 transition">
          <div className="flex items-center gap-3 mb-3">
            <span className="material-symbols-outlined text-[#ECC246] icon-fill">
              description
            </span>
            <h2 className="text-lg font-bold text-[#e1e3e4]">
              Documentos de viaje
            </h2>
          </div>

          <ul className="divide-y divide-[#1A1A1A] text-sm">
            <li className="flex justify-between items-center py-3">
              <div className="flex flex-col">
                <span className="text-[#e1e3e4] font-medium">Pasaporte</span>
                <span className="text-xs text-[#d1c5af]">
                  Expira {user.passportExp}
                </span>
              </div>
              <span className="material-symbols-outlined text-[#ECC246] text-lg">
                chevron_right
              </span>
            </li>

            <li className="flex justify-between items-center py-3">
              <div className="flex flex-col">
                <span className="text-[#e1e3e4] font-medium">Visas Activas</span>
                <span className="text-xs text-[#d1c5af]">
                  {user.visas.join(', ')}
                </span>
              </div>
              <span className="material-symbols-outlined text-[#ECC246] text-lg">
                chevron_right
              </span>
            </li>

            <li className="flex justify-between items-center py-3">
              <div className="flex flex-col">
                <span className="text-[#e1e3e4] font-medium">
                  Credencial AeroGuard
                </span>
                <span className="text-xs text-[#ECC246] flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#ECC246]" />
                  {user.credentialStatus}
                </span>
              </div>
              <span className="material-symbols-outlined text-[#ECC246] text-lg">
                chevron_right
              </span>
            </li>
          </ul>
        </div>

        {/* Preferencias */}
        <div className="bg-[#0B1F3A] rounded-2xl p-5 border border-[#1A1A1A] shadow-xl flex flex-col justify-between hover:border-[#ECC246]/30 transition">
          <div className="flex items-center gap-3 mb-3">
            <span className="material-symbols-outlined text-[#ECC246] icon-fill">
              tune
            </span>
            <h2 className="text-lg font-bold text-[#e1e3e4]">Preferencias</h2>
          </div>

          <ul className="divide-y divide-[#1A1A1A] text-sm">
            <li className="flex justify-between items-center py-3">
              <span className="text-[#e1e3e4]">Asiento Preferido</span>
              <span className="text-xs text-[#d1c5af]">{user.preferredSeat}</span>
            </li>
            <li className="flex justify-between items-center py-3">
              <span className="text-[#e1e3e4]">Aerolíneas Favoritas</span>
              <span className="text-xs text-[#d1c5af]">
                {user.favoriteAirlines.join(', ')}
              </span>
            </li>
            <li className="flex justify-between items-center py-3">
              <span className="text-[#e1e3e4]">Cadena de Hoteles</span>
              <span className="text-xs text-[#d1c5af]">
                {user.hotelChains.join(', ')}
              </span>
            </li>
            <li className="flex justify-between items-center py-3">
              <span className="text-[#e1e3e4]">Requisitos Dietéticos</span>
              <span className="text-xs text-[#d1c5af]">
                {user.dietaryRequirements}
              </span>
            </li>
          </ul>
        </div>

        {/* Seguridad */}
        <div className="bg-[#0B1F3A] rounded-2xl p-5 border border-[#1A1A1A] shadow-xl flex flex-col justify-between hover:border-[#ECC246]/30 transition">
          <div className="flex items-center gap-3 mb-3">
            <span className="material-symbols-outlined text-red-400 icon-fill">
              security
            </span>
            <h2 className="text-lg font-bold text-[#e1e3e4]">Seguridad</h2>
          </div>

          <ul className="divide-y divide-[#1A1A1A] text-sm">
            <li className="flex justify-between items-center py-3">
              <div className="flex flex-col">
                <span className="text-[#e1e3e4] font-medium">
                  Contactos de Emergencia
                </span>
                <span className="text-xs text-[#d1c5af]">
                  {user.emergencyContactsCount} registrados
                </span>
              </div>
              <span className="material-symbols-outlined text-[#ECC246] text-lg">
                chevron_right
              </span>
            </li>

            <li className="flex justify-between items-center py-3">
              <div className="flex flex-col">
                <span className="text-[#e1e3e4] font-medium">
                  Compartir Ubicación
                </span>
                <span className="text-xs text-[#d1c5af]">
                  Activo durante viaje
                </span>
              </div>
              <button
                onClick={toggleLocation}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  locationSharing ? 'bg-[#c9a227]' : 'bg-[#323536]'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    locationSharing ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </li>
          </ul>
        </div>

        {/* Notificaciones */}
        <div className="bg-[#0B1F3A] rounded-2xl p-5 border border-[#1A1A1A] shadow-xl flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-3">
            <span className="material-symbols-outlined text-[#d1c5af]">
              notifications
            </span>
            <h2 className="text-lg font-bold text-[#e1e3e4]">Notificaciones</h2>
          </div>

          <ul className="divide-y divide-[#1A1A1A] text-sm">
            <li className="flex justify-between items-center py-3">
              <span className="text-[#e1e3e4]">Alertas de Vuelo</span>
              <button
                onClick={() => setFlightAlerts(!flightAlerts)}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  flightAlerts ? 'bg-[#c9a227]' : 'bg-[#323536]'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    flightAlerts ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </li>

            <li className="flex justify-between items-center py-3">
              <span className="text-[#e1e3e4]">
                Avisos de Seguridad (Global)
              </span>
              <button
                onClick={() => setGlobalAlerts(!globalAlerts)}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  globalAlerts ? 'bg-[#c9a227]' : 'bg-[#323536]'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    globalAlerts ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </li>

            <li className="flex justify-between items-center py-3">
              <span className="text-[#e1e3e4]">Promociones Exclusivas</span>
              <button
                onClick={() => setPromotions(!promotions)}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  promotions ? 'bg-[#c9a227]' : 'bg-[#323536]'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    promotions ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Logout Action */}
      <div className="pt-4 flex justify-center">
        <button
          onClick={onLogout}
          className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors py-3 px-8 rounded-full border border-red-500/30 bg-red-950/20 hover:bg-red-950/40 active:scale-95 text-sm font-bold shadow-lg"
        >
          <span className="material-symbols-outlined">logout</span>
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
};
