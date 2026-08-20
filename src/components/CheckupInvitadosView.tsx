import React, { useState } from 'react';
import { PassengerDoc } from '../types';
import { sampleGuests } from '../mockData';

interface CheckupInvitadosViewProps {
  onOpenConciergeWithQuery?: (query: string) => void;
}

export const CheckupInvitadosView: React.FC<CheckupInvitadosViewProps> = ({
  onOpenConciergeWithQuery,
}) => {
  const [guests, setGuests] = useState<PassengerDoc[]>(sampleGuests);
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [isRunningAudit, setIsRunningAudit] = useState<boolean>(false);
  const [auditMessage, setAuditMessage] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showSheetsModal, setShowSheetsModal] = useState<boolean>(false);

  // Google Sheets state for Guests
  const [sheetUrl, setSheetUrl] = useState<string>(
    'https://docs.google.com/spreadsheets/d/1RBS_Invitados_VIP_Delegacion_2026/edit#gid=0'
  );
  const [isSyncingSheets, setIsSyncingSheets] = useState<boolean>(false);
  const [sheetSyncSuccess, setSheetSyncSuccess] = useState<string | null>(
    'Sincronizado activamente con Google Sheets para Invitados VIP de RBS.'
  );

  // Form state for new guest
  const [newGuestName, setNewGuestName] = useState<string>('');
  const [newGuestRole, setNewGuestRole] = useState<string>('Socio Comercial');
  const [newGuestCategory, setNewGuestCategory] = useState<
    'Socio Comercial' | 'Consultor Especial' | 'Acompañante Delegación' | 'Inversionista VIP'
  >('Socio Comercial');
  const [newPassportNum, setNewPassportNum] = useState<string>('');
  const [newPassportExp, setNewPassportExp] = useState<string>('15/10/2028');
  const [newVisa, setNewVisa] = useState<string>('B1/B2 US Visa & ESTA');

  const handleRunAudit = () => {
    setIsRunningAudit(true);
    setAuditMessage(null);

    setTimeout(() => {
      setIsRunningAudit(false);
      setAuditMessage(
        'Auditoría completada para Invitados VIP de RBS: 3 Invitados con clearance FBO aprobado y 1 Alerta por vencimiento de pasaporte (Arch. Fernando Valdés - 37 días restantes).'
      );
    }, 1200);
  };

  const handleSyncGoogleSheets = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSyncingSheets(true);

    setTimeout(() => {
      // Simulate live fetch & parse from Google Sheets API / CSV endpoint for Guests
      const newFromSheet: PassengerDoc[] = [
        {
          id: `g_sheet_1_${Date.now()}`,
          name: 'Ing. Alejandro Morales',
          role: 'Socio Comercial & Coinversionista',
          passportNumber: 'MEX-77182901',
          passportCountry: 'México 🇲🇽',
          passportExpDate: '18/11/2028',
          daysToPassportExp: 834,
          visaType: 'B1/B2 US Visa Business',
          visaStatus: 'Válida',
          estaOrSchengenStatus: 'Aprobado',
          biometricClearance: 'Aprobado AeroGuard',
          dietaryOrMedical: 'Dieta Kosher / Grupo A+',
          overallStatus: 'Completo',
          isGuest: true,
          guestCategory: 'Socio Comercial',
          invitedBy: 'RBS (Roberto Bernardo Sanchez)',
          sourceSheetUrl: sheetUrl,
          lastSyncedFromSheets: `Sincronizado ahora (${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`,
        },
        {
          id: `g_sheet_2_${Date.now()}`,
          name: 'Dra. Valeria Lindemann',
          role: 'Consultora Financiera Internacional',
          passportNumber: 'CHE-99201844',
          passportCountry: 'Suiza 🇨🇭',
          passportExpDate: '08/03/2027',
          daysToPassportExp: 214,
          visaType: 'ESTA USA & Schengen Free',
          visaStatus: 'Válida',
          estaOrSchengenStatus: 'Aprobado',
          biometricClearance: 'Aprobado AeroGuard',
          dietaryOrMedical: 'Sin restricciones / AB+',
          overallStatus: 'Completo',
          isGuest: true,
          guestCategory: 'Consultor Especial',
          invitedBy: 'RBS (Roberto Bernardo Sanchez)',
          sourceSheetUrl: sheetUrl,
          lastSyncedFromSheets: `Sincronizado ahora (${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`,
        },
        {
          id: `g_sheet_3_${Date.now()}`,
          name: 'Arch. Fernando Valdés',
          role: 'Director de Arquitectura & Real Estate',
          passportNumber: 'MEX-33829104',
          passportCountry: 'México 🇲🇽',
          passportExpDate: '12/09/2026',
          daysToPassportExp: 37,
          visaType: 'B1/B2 US Visa',
          visaStatus: 'Válida',
          estaOrSchengenStatus: 'Aprobado',
          biometricClearance: 'Aprobado AeroGuard',
          dietaryOrMedical: 'Pescetariano / O-',
          overallStatus: 'Atención Requerida',
          isGuest: true,
          guestCategory: 'Socio Comercial',
          invitedBy: 'RBS (Roberto Bernardo Sanchez)',
          sourceSheetUrl: sheetUrl,
          lastSyncedFromSheets: `Sincronizado ahora (${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`,
        },
        {
          id: `g_sheet_4_${Date.now()}`,
          name: 'Sra. Monique Dupont',
          role: 'Inversionista Capital Privado',
          passportNumber: 'FRA-88201923',
          passportCountry: 'Francia 🇫🇷',
          passportExpDate: '14/10/2029',
          daysToPassportExp: 1164,
          visaType: 'ESTA USA Active',
          visaStatus: 'Válida',
          estaOrSchengenStatus: 'Aprobado',
          biometricClearance: 'Aprobado AeroGuard',
          dietaryOrMedical: 'Champagne Brut / Vegan / A-',
          overallStatus: 'Completo',
          isGuest: true,
          guestCategory: 'Inversionista VIP',
          invitedBy: 'RBS (Roberto Bernardo Sanchez)',
          sourceSheetUrl: sheetUrl,
          lastSyncedFromSheets: `Sincronizado ahora (${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`,
        },
        {
          id: `g_sheet_5_${Date.now()}`,
          name: 'Lic. Thomas K. Miller',
          role: 'Asesor Legal de Fusiones (M&A)',
          passportNumber: 'USA-44910283',
          passportCountry: 'Estados Unidos 🇺🇸',
          passportExpDate: '30/05/2030',
          daysToPassportExp: 1390,
          visaType: 'Global Entry USA',
          visaStatus: 'Válida',
          estaOrSchengenStatus: 'Aprobado',
          biometricClearance: 'Aprobado AeroGuard',
          dietaryOrMedical: 'Sin Lactosa / A+',
          overallStatus: 'Completo',
          isGuest: true,
          guestCategory: 'Consultor Especial',
          invitedBy: 'RBS (Roberto Bernardo Sanchez)',
          sourceSheetUrl: sheetUrl,
          lastSyncedFromSheets: `Sincronizado ahora (${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`,
        },
      ];

      setGuests(newFromSheet);
      setIsSyncingSheets(false);
      setShowSheetsModal(false);
      setSheetSyncSuccess(
        `¡Sincronización Exitosa! Se importaron 5 Invitados VIP de la delegación de RBS directamente desde Google Sheets.`
      );
    }, 1200);
  };

  const handleAddGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuestName || !newPassportNum) return;

    const newDoc: PassengerDoc = {
      id: `g_${Date.now()}`,
      name: newGuestName,
      role: newGuestRole,
      passportNumber: newPassportNum,
      passportCountry: 'México 🇲🇽',
      passportExpDate: newPassportExp,
      daysToPassportExp: 730,
      visaType: newVisa,
      visaStatus: 'Válida',
      estaOrSchengenStatus: 'Aprobado',
      biometricClearance: 'Aprobado AeroGuard',
      dietaryOrMedical: 'Invitado registrado manualmente',
      overallStatus: 'Completo',
      isGuest: true,
      guestCategory: newGuestCategory,
      invitedBy: 'RBS (Roberto Bernardo Sanchez)',
      sourceSheetUrl: sheetUrl,
      lastSyncedFromSheets: 'Agregado directo en app (Sincronizado con Sheet)',
    };

    setGuests([newDoc, ...guests]);
    setShowAddModal(false);
    setNewGuestName('');
    setNewPassportNum('');
  };

  const displayedGuests = guests.filter((g) => {
    if (selectedCategory === 'todos') return true;
    return g.guestCategory === selectedCategory;
  });

  return (
    <div className="space-y-6 pb-24 md:pb-8">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#1B2A4A] via-[#111415] to-[#1d2021] p-6 rounded-2xl border border-cyan-500/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <span className="material-symbols-outlined text-9xl text-cyan-400">group_add</span>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full font-mono-code text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">verified</span>
                Invitados VIP & Delegación RBS
              </span>
              <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full font-mono-code text-[11px] font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">grid_on</span>
                Google Sheets Sync
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-cyan-300 tracking-tight">
              Check-up de Invitados - Delegación RBS
            </h1>
            <p className="text-sm text-[#c4d6e8] max-w-2xl mt-1">
              Módulo exclusivo para invitados especiales, socios comerciales y consultores convocados por el Principal <strong className="text-white">RBS</strong>. Sincroniza expedientes migratorios, visados y datos de acceso FBO en tiempo real directamente desde tu hoja de Google Sheets.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => setShowSheetsModal(true)}
              className="px-3.5 py-2 bg-emerald-950/80 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-500/50 rounded-xl font-mono-code text-xs font-bold flex items-center gap-1.5 transition-all shadow-md active:scale-95"
            >
              <svg className="w-4 h-4 fill-emerald-400" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
              </svg>
              <span>Conectar Google Sheets</span>
            </button>

            <button
              onClick={() => setShowAddModal(true)}
              className="px-3.5 py-2 bg-[#282a2b] hover:bg-[#323536] text-cyan-300 border border-cyan-500/40 rounded-xl font-mono-code text-xs font-semibold flex items-center gap-1.5 transition-colors active:scale-95"
            >
              <span className="material-symbols-outlined text-base">person_add</span>
              <span>Agregar Invitado</span>
            </button>

            <button
              onClick={handleRunAudit}
              disabled={isRunningAudit}
              className="px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-black font-bold rounded-xl text-xs flex items-center gap-2 shadow-md transition-all active:scale-95"
            >
              {isRunningAudit ? (
                <>
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Auditando FBO...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-base">fact_check</span>
                  <span>Ejecutar Audit Invitados</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Google Sheets Status Banner */}
      {sheetSyncSuccess && (
        <div className="p-4 bg-emerald-950/40 border border-emerald-500/50 rounded-2xl flex items-center justify-between gap-3 text-sm text-[#e1e3e4] shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shrink-0">
              <span className="material-symbols-outlined text-lg">sync</span>
            </div>
            <div>
              <span className="font-bold text-emerald-400 block font-mono-code text-xs uppercase tracking-wide">
                Google Sheets Sincronizado - Invitados RBS
              </span>
              <p className="text-xs text-emerald-100">{sheetSyncSuccess}</p>
            </div>
          </div>

          <button
            onClick={() => handleSyncGoogleSheets()}
            disabled={isSyncingSheets}
            className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs rounded-xl transition-all shadow-md active:scale-95 shrink-0 flex items-center gap-1"
          >
            <span className={`material-symbols-outlined text-sm ${isSyncingSheets ? 'animate-spin' : ''}`}>
              refresh
            </span>
            <span>Re-sincronizar Hoja</span>
          </button>
        </div>
      )}

      {/* Audit Feedback Banner */}
      {auditMessage && (
        <div className="p-4 bg-[#1B2A4A] border border-cyan-400/60 rounded-2xl flex items-center gap-3 text-sm text-[#e1e3e4] shadow-lg animate-fadeIn">
          <span className="material-symbols-outlined text-cyan-400 text-2xl shrink-0 icon-fill">
            verified
          </span>
          <div className="flex-1">
            <span className="font-bold text-cyan-300 block font-mono-code text-xs uppercase">
              Auditoría Migratoria e FBO (Invitados VIP)
            </span>
            <span>{auditMessage}</span>
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-[#111415] p-2 rounded-2xl border border-[#323536]">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedCategory('todos')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono-code transition-all flex items-center gap-1.5 ${
              selectedCategory === 'todos'
                ? 'bg-cyan-400 text-black shadow-md'
                : 'text-[#99907b] hover:text-white hover:bg-[#1d2021]'
            }`}
          >
            <span>Todos los Invitados ({guests.length})</span>
          </button>

          <button
            onClick={() => setSelectedCategory('Socio Comercial')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono-code transition-all flex items-center gap-1.5 ${
              selectedCategory === 'Socio Comercial'
                ? 'bg-cyan-400 text-black shadow-md'
                : 'text-[#99907b] hover:text-white hover:bg-[#1d2021]'
            }`}
          >
            <span>Socios Comerciales</span>
          </button>

          <button
            onClick={() => setSelectedCategory('Consultor Especial')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono-code transition-all flex items-center gap-1.5 ${
              selectedCategory === 'Consultor Especial'
                ? 'bg-cyan-400 text-black shadow-md'
                : 'text-[#99907b] hover:text-white hover:bg-[#1d2021]'
            }`}
          >
            <span>Consultores</span>
          </button>

          <button
            onClick={() => setSelectedCategory('Inversionista VIP')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono-code transition-all flex items-center gap-1.5 ${
              selectedCategory === 'Inversionista VIP'
                ? 'bg-cyan-400 text-black shadow-md'
                : 'text-[#99907b] hover:text-white hover:bg-[#1d2021]'
            }`}
          >
            <span>Inversionistas</span>
          </button>
        </div>

        <div className="text-xs font-mono-code text-[#99907b] px-3 py-1">
          Anfitrión: <strong className="text-cyan-300">RBS (Roberto Bernardo Sanchez)</strong>
        </div>
      </div>

      {/* Guest List Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-[#e1e3e4] flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span>Expedientes de Invitados VIP</span>
            <span className="text-xs bg-[#1B2A4A] text-cyan-300 border border-cyan-400/40 px-2 py-0.5 rounded-full font-mono-code font-bold">
              {displayedGuests.length} Registros
            </span>
          </span>

          <button
            onClick={() => setShowSheetsModal(true)}
            className="text-xs font-mono-code text-emerald-400 hover:underline flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">table_view</span>
            <span>Ver Google Sheets de Invitados</span>
          </button>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayedGuests.map((g) => {
            const isWarning = g.overallStatus === 'Atención Requerida' || g.daysToPassportExp < 180;

            return (
              <article
                key={g.id}
                className={`bg-[#1d2021] rounded-2xl p-5 border transition-all shadow-xl flex flex-col justify-between ${
                  isWarning
                    ? 'border-amber-500/60 bg-amber-950/10'
                    : 'border-[#323536] hover:border-cyan-400/50'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#1B2A4A] border border-cyan-400/50 flex items-center justify-center font-bold text-cyan-300 text-base shrink-0">
                        {g.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-[#e1e3e4] text-base">{g.name}</h3>
                          <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 text-[10px] font-bold font-mono-code rounded">
                            {g.guestCategory || 'Invitado RBS'}
                          </span>
                        </div>
                        <span className="text-xs font-mono-code text-[#99907b] block">
                          {g.role} • Invitado por {g.invitedBy || 'RBS'}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-mono-code font-bold flex items-center gap-1 shrink-0 ${
                        isWarning
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm">
                        {isWarning ? 'warning' : 'verified'}
                      </span>
                      {g.overallStatus}
                    </span>
                  </div>

                  {/* Document Grid */}
                  <div className="bg-[#111415] p-3.5 rounded-xl border border-[#323536] space-y-2 mb-4 font-mono-code text-xs">
                    <div className="flex justify-between items-center pb-2 border-b border-[#323536]">
                      <span className="text-[#99907b]">Pasaporte Oficial:</span>
                      <span className="text-[#e1e3e4] font-bold">
                        {g.passportNumber} ({g.passportCountry})
                      </span>
                    </div>

                    <div className="flex justify-between items-center pb-2 border-b border-[#323536]">
                      <span className="text-[#99907b]">Vencimiento Pasaporte:</span>
                      <span className={`font-bold ${isWarning ? 'text-amber-400' : 'text-cyan-300'}`}>
                        {g.passportExpDate} ({g.daysToPassportExp} días)
                      </span>
                    </div>

                    <div className="flex justify-between items-center pb-2 border-b border-[#323536]">
                      <span className="text-[#99907b]">Visado / Permiso:</span>
                      <span className="text-emerald-400 font-bold">
                        {g.visaType} ({g.visaStatus})
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-[#99907b]">Clearance FBO:</span>
                      <span className="text-cyan-300 font-bold">{g.biometricClearance}</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#d1c5af] font-mono-code flex items-center gap-1.5 mb-2">
                    <span className="material-symbols-outlined text-sm text-cyan-400">restaurant</span>
                    <span>Preferencias / Protocolo: {g.dietaryOrMedical}</span>
                  </p>

                  {g.lastSyncedFromSheets && (
                    <div className="flex items-center gap-1.5 text-[11px] font-mono-code text-emerald-400/90 bg-emerald-950/30 p-2 rounded-lg border border-emerald-500/20 mb-2">
                      <span className="material-symbols-outlined text-sm">grid_on</span>
                      <span>Google Sheets: {g.lastSyncedFromSheets}</span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-[#323536] flex items-center justify-between">
                  <span className="text-[11px] font-mono-code text-[#99907b]">
                    ID Invitado: {g.id}
                  </span>

                  {isWarning && (
                    <button
                      onClick={() => {
                        if (onOpenConciergeWithQuery) {
                          onOpenConciergeWithQuery(
                            `Atención Concierge: El pasaporte del Invitado VIP ${g.name} (Convocado por RBS) vence el ${g.passportExpDate}. Solicito gestionar prórroga o asistencia consular urgente.`
                          );
                        }
                      }}
                      className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-sm">edit_calendar</span>
                      <span>Gestionar con Concierge</span>
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Modal Google Sheets Sync */}
      {showSheetsModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#1d2021] border border-emerald-500 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-scaleUp">
            <div className="flex justify-between items-center border-b border-[#323536] pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-400 text-2xl">table_chart</span>
                <div>
                  <h3 className="text-lg font-bold text-emerald-400">Google Sheets - Invitados RBS</h3>
                  <p className="text-xs text-[#99907b]">Sincronización de Delegación e Invitados</p>
                </div>
              </div>

              <button
                onClick={() => setShowSheetsModal(false)}
                className="text-[#99907b] hover:text-[#e1e3e4]"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="bg-[#111415] p-3 rounded-xl border border-emerald-500/30 text-xs text-[#d1c5af] space-y-2">
              <p className="font-bold text-emerald-300">
                📊 Importación Automatizada para Invitados VIP
              </p>
              <p>
                Coloca la URL de tu hoja de Google Sheets con la lista de invitados convocados por <strong>RBS</strong>. La plataforma extraerá pasaportes, visados, fechas de caducidad y categorías especiales automáticamente.
              </p>
            </div>

            <form onSubmit={handleSyncGoogleSheets} className="space-y-4 font-mono-code text-xs">
              <div>
                <label className="block text-[#e1e3e4] font-bold mb-1">
                  URL de Google Sheets (Invitados RBS):
                </label>
                <input
                  type="text"
                  required
                  value={sheetUrl}
                  onChange={(e) => setSheetUrl(e.target.value)}
                  placeholder="https://docs.google.com/spreadsheets/d/ID_HOJA_INVITADOS/edit"
                  className="w-full bg-[#111415] border border-emerald-500/50 text-[#e1e3e4] rounded-xl p-3 focus:border-emerald-400 focus:outline-none"
                />
              </div>

              <div className="p-3 bg-[#1B2A4A] rounded-xl border border-cyan-400/40 space-y-1">
                <span className="font-bold text-cyan-300 block text-[11px] uppercase">
                  Columnas Recomendadas en Google Sheets:
                </span>
                <p className="text-[11px] text-[#e1e3e4]">
                  Nombre Invitado | Categoría | Pasaporte | País | Vencimiento | Visa USA | Ficha Protocolo
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSheetUrl('https://docs.google.com/spreadsheets/d/1RBS_Invitados_VIP_Delegacion_2026/edit#gid=0');
                  }}
                  className="px-3 py-2 bg-[#282a2b] text-cyan-300 border border-cyan-400/30 rounded-xl hover:bg-[#323536] text-center"
                >
                  Cargar Plantilla Invitados
                </button>

                <button
                  type="submit"
                  disabled={isSyncingSheets}
                  className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg"
                >
                  {isSyncingSheets ? (
                    <>
                      <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>Importando datos...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-base">sync</span>
                      <span>Sincronizar e Importar</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Add Guest */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#1d2021] border border-cyan-400 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-scaleUp">
            <div className="flex justify-between items-center border-b border-[#323536] pb-3">
              <div>
                <h3 className="text-lg font-bold text-cyan-300">Nuevo Invitado VIP de RBS</h3>
                <p className="text-xs text-[#99907b]">Convocado por Principal RBS</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-[#99907b] hover:text-[#e1e3e4]"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleAddGuest} className="space-y-3 font-mono-code text-xs">
              <div>
                <label className="block text-[#99907b] mb-1">Nombre Completo del Invitado</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Dr. Mauricio Herrera"
                  value={newGuestName}
                  onChange={(e) => setNewGuestName(e.target.value)}
                  className="w-full bg-[#111415] border border-[#323536] text-[#e1e3e4] rounded-xl p-2.5 focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#99907b] mb-1">Categoría del Invitado</label>
                <select
                  value={newGuestCategory}
                  onChange={(e) => setNewGuestCategory(e.target.value as any)}
                  className="w-full bg-[#111415] border border-[#323536] text-cyan-300 font-bold rounded-xl p-2.5 focus:border-cyan-400 focus:outline-none"
                >
                  <option value="Socio Comercial">Socio Comercial</option>
                  <option value="Consultor Especial">Consultor Especial</option>
                  <option value="Inversionista VIP">Inversionista VIP</option>
                  <option value="Acompañante Delegación">Acompañante Delegación</option>
                </select>
              </div>

              <div>
                <label className="block text-[#99907b] mb-1">Cargo / Empresa</label>
                <input
                  type="text"
                  value={newGuestRole}
                  onChange={(e) => setNewGuestRole(e.target.value)}
                  className="w-full bg-[#111415] border border-[#323536] text-[#e1e3e4] rounded-xl p-2.5 focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#99907b] mb-1">Pasaporte</label>
                  <input
                    type="text"
                    required
                    placeholder="MEX-88192011"
                    value={newPassportNum}
                    onChange={(e) => setNewPassportNum(e.target.value)}
                    className="w-full bg-[#111415] border border-[#323536] text-[#e1e3e4] rounded-xl p-2.5 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#99907b] mb-1">Vencimiento</label>
                  <input
                    type="text"
                    value={newPassportExp}
                    onChange={(e) => setNewPassportExp(e.target.value)}
                    className="w-full bg-[#111415] border border-[#323536] text-[#e1e3e4] rounded-xl p-2.5 focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#99907b] mb-1">Visado / ESTA</label>
                <input
                  type="text"
                  value={newVisa}
                  onChange={(e) => setNewVisa(e.target.value)}
                  className="w-full bg-[#111415] border border-[#323536] text-[#e1e3e4] rounded-xl p-2.5 focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-[#282a2b] text-[#e1e3e4] rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-400 text-black font-bold rounded-xl"
                >
                  Guardar e Importar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
