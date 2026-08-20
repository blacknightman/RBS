import React, { useState } from 'react';
import { PassengerDoc } from '../types';
import { samplePassengers } from '../mockData';

interface CheckupPasajerosViewProps {
  onOpenConciergeWithQuery?: (query: string) => void;
}

export const CheckupPasajerosView: React.FC<CheckupPasajerosViewProps> = ({
  onOpenConciergeWithQuery,
}) => {
  const [passengers, setPassengers] = useState<PassengerDoc[]>(samplePassengers);
  const [filterMode, setFilterMode] = useState<'rbs_family' | 'all'>('rbs_family');
  const [isRunningAudit, setIsRunningAudit] = useState<boolean>(false);
  const [auditMessage, setAuditMessage] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showSheetsModal, setShowSheetsModal] = useState<boolean>(false);

  // Google Sheets state
  const [sheetUrl, setSheetUrl] = useState<string>(
    'https://docs.google.com/spreadsheets/d/1RBS_Familia_Documentos_Oficiales_2026/edit#gid=0'
  );
  const [isSyncingSheets, setIsSyncingSheets] = useState<boolean>(false);
  const [sheetSyncSuccess, setSheetSyncSuccess] = useState<string | null>(
    'Sincronizado activamente con Google Sheets para Familia del Principal RBS.'
  );

  // Form state for new passenger
  const [newPassengerName, setNewPassengerName] = useState<string>('');
  const [newPassengerRole, setNewPassengerRole] = useState<string>('Familia Directa RBS');
  const [newFamilyRelation, setNewFamilyRelation] = useState<
    'Principal (RBS)' | 'Esposa de RBS' | 'Hijo(a) de RBS' | 'Familiar Directo RBS'
  >('Hijo(a) de RBS');
  const [newPassportNum, setNewPassportNum] = useState<string>('');
  const [newPassportExp, setNewPassportExp] = useState<string>('30/12/2028');
  const [newVisa, setNewVisa] = useState<string>('B1/B2 US Visa & Schengen');

  const handleRunAudit = () => {
    setIsRunningAudit(true);
    setAuditMessage(null);

    setTimeout(() => {
      setIsRunningAudit(false);
      setAuditMessage(
        'Auditoría completada para Familia del Principal (RBS): 3 Integrantes con expedientes vigentes y 1 Alerta por pasaporte próximo a vencer (Camila Sanchez - 30 días restantes).'
      );
    }, 1200);
  };

  const handleSyncGoogleSheets = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSyncingSheets(true);

    setTimeout(() => {
      // Simulate live fetch & parse from Google Sheets API / CSV endpoint
      const newFromSheet: PassengerDoc[] = [
        {
          id: `p_sheet_1_${Date.now()}`,
          name: 'RBS (Roberto Bernardo Sanchez)',
          role: 'Principal (Líder del Grupo RBS)',
          passportNumber: 'MEX-98124501',
          passportCountry: 'México 🇲🇽',
          passportExpDate: '15/12/2028',
          daysToPassportExp: 862,
          visaType: 'B1/B2 US Visa & Schengen',
          visaStatus: 'Válida',
          estaOrSchengenStatus: 'Aprobado',
          biometricClearance: 'Aprobado AeroGuard',
          dietaryOrMedical: 'Sin Gluten / Grupo O+',
          overallStatus: 'Completo',
          isFamilyRbs: true,
          familyRelationship: 'Principal (RBS)',
          sourceSheetUrl: sheetUrl,
          lastSyncedFromSheets: `Sincronizado ahora (${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`,
        },
        {
          id: `p_sheet_2_${Date.now()}`,
          name: 'Sofía Sanchez de RBS',
          role: 'Esposa del Principal RBS',
          passportNumber: 'MEX-87239102',
          passportCountry: 'México 🇲🇽',
          passportExpDate: '20/04/2027',
          daysToPassportExp: 257,
          visaType: 'B1/B2 US Visa & Schengen Global',
          visaStatus: 'Válida',
          estaOrSchengenStatus: 'Aprobado',
          biometricClearance: 'Aprobado AeroGuard',
          dietaryOrMedical: 'Vegetariana / A+',
          overallStatus: 'Completo',
          isFamilyRbs: true,
          familyRelationship: 'Esposa de RBS',
          sourceSheetUrl: sheetUrl,
          lastSyncedFromSheets: `Sincronizado ahora (${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`,
        },
        {
          id: `p_sheet_3_${Date.now()}`,
          name: 'Mateo Sanchez (Hijo RBS)',
          role: 'Hijo Menor de RBS',
          passportNumber: 'MEX-55198203',
          passportCountry: 'México 🇲🇽',
          passportExpDate: '10/01/2027',
          daysToPassportExp: 157,
          visaType: 'B1/B2 US Visa (Infantil)',
          visaStatus: 'Válida',
          estaOrSchengenStatus: 'Aprobado',
          biometricClearance: 'Aprobado AeroGuard',
          dietaryOrMedical: 'Alergia a Nueces / O+',
          overallStatus: 'Completo',
          isFamilyRbs: true,
          familyRelationship: 'Hijo(a) de RBS',
          sourceSheetUrl: sheetUrl,
          lastSyncedFromSheets: `Sincronizado ahora (${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`,
        },
        {
          id: `p_sheet_4_${Date.now()}`,
          name: 'Camila Sanchez (Hija RBS)',
          role: 'Hija de RBS',
          passportNumber: 'MEX-66291044',
          passportCountry: 'México 🇲🇽',
          passportExpDate: '05/09/2026',
          daysToPassportExp: 30,
          visaType: 'B1/B2 US Visa',
          visaStatus: 'Válida',
          estaOrSchengenStatus: 'Aprobado',
          biometricClearance: 'Aprobado AeroGuard',
          dietaryOrMedical: 'Lactosa Free / B+',
          overallStatus: 'Atención Requerida',
          isFamilyRbs: true,
          familyRelationship: 'Hijo(a) de RBS',
          sourceSheetUrl: sheetUrl,
          lastSyncedFromSheets: `Sincronizado ahora (${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`,
        },
        {
          id: `p_sheet_5_${Date.now()}`,
          name: 'Don Bernardo Sanchez Sr. (Padre RBS)',
          role: 'Padre del Principal RBS',
          passportNumber: 'MEX-11029384',
          passportCountry: 'México 🇲🇽',
          passportExpDate: '18/11/2029',
          daysToPassportExp: 1198,
          visaType: 'B1/B2 US Visa Senior',
          visaStatus: 'Válida',
          estaOrSchengenStatus: 'Aprobado',
          biometricClearance: 'Aprobado AeroGuard',
          dietaryOrMedical: 'Asistencia Silla de Ruedas FBO / AB+',
          overallStatus: 'Completo',
          isFamilyRbs: true,
          familyRelationship: 'Familiar Directo RBS',
          sourceSheetUrl: sheetUrl,
          lastSyncedFromSheets: `Sincronizado ahora (${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`,
        },
      ];

      // Keep corporate passengers if any exist
      const corporateOnes = passengers.filter((p) => !p.isFamilyRbs);
      setPassengers([...newFromSheet, ...corporateOnes]);
      setIsSyncingSheets(false);
      setShowSheetsModal(false);
      setSheetSyncSuccess(
        `¡Sincronización Exitosa! Se importaron 5 integrantes de la Familia RBS directamente desde Google Sheets.`
      );
    }, 1200);
  };

  const handleAddPassenger = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassengerName || !newPassportNum) return;

    const newDoc: PassengerDoc = {
      id: `p_${Date.now()}`,
      name: newPassengerName,
      role: newPassengerRole,
      passportNumber: newPassportNum,
      passportCountry: 'México 🇲🇽',
      passportExpDate: newPassportExp,
      daysToPassportExp: 730,
      visaType: newVisa,
      visaStatus: 'Válida',
      estaOrSchengenStatus: 'Aprobado',
      biometricClearance: 'Aprobado AeroGuard',
      dietaryOrMedical: 'Documento registrado manualmente',
      overallStatus: 'Completo',
      isFamilyRbs: true,
      familyRelationship: newFamilyRelation,
      sourceSheetUrl: sheetUrl,
      lastSyncedFromSheets: 'Agregado directo en app (Sincronizado con Sheet)',
    };

    setPassengers([newDoc, ...passengers]);
    setShowAddModal(false);
    setNewPassengerName('');
    setNewPassportNum('');
  };

  const displayedPassengers = passengers.filter((p) => {
    if (filterMode === 'rbs_family') return p.isFamilyRbs === true;
    return true;
  });

  const familyRbsCount = passengers.filter((p) => p.isFamilyRbs).length;

  return (
    <div className="space-y-6 pb-24 md:pb-8">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#0B1F3A] via-[#111415] to-[#1d2021] p-6 rounded-2xl border border-[#ECC246]/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <span className="material-symbols-outlined text-9xl text-[#ECC246]">family_restroom</span>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 bg-[#ECC246]/20 text-[#ECC246] border border-[#ECC246]/40 rounded-full font-mono-code text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">verified_user</span>
                Familia del Principal (RBS) & Documentos
              </span>
              <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full font-mono-code text-[11px] font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">grid_on</span>
                Google Sheets Live Sync
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#ECC246] tracking-tight">
              Check-up de Pasajeros - Familia RBS
            </h1>
            <p className="text-sm text-[#d1c5af] max-w-2xl mt-1">
              Módulo exclusivo de la familia del Principal <strong className="text-white">RBS</strong>. Sincroniza pasaportes, visados, fichas médicas y autorizaciones migratorias FBO en tiempo real directamente desde tu hoja de cálculo oficial de Google Sheets.
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
              className="px-3.5 py-2 bg-[#282a2b] hover:bg-[#323536] text-[#ECC246] border border-[#ECC246]/40 rounded-xl font-mono-code text-xs font-semibold flex items-center gap-1.5 transition-colors active:scale-95"
            >
              <span className="material-symbols-outlined text-base">person_add</span>
              <span>Agregar Familiar RBS</span>
            </button>

            <button
              onClick={handleRunAudit}
              disabled={isRunningAudit}
              className="px-4 py-2 bg-[#ECC246] hover:bg-[#ffe08e] text-[#3d2e00] font-bold rounded-xl text-xs flex items-center gap-2 shadow-md transition-all active:scale-95"
            >
              {isRunningAudit ? (
                <>
                  <span className="w-4 h-4 border-2 border-[#3d2e00] border-t-transparent rounded-full animate-spin" />
                  <span>Validando en FBO...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-base">fact_check</span>
                  <span>Ejecutar Audit Familia</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Google Sheets Live Status Banner */}
      {sheetSyncSuccess && (
        <div className="p-4 bg-emerald-950/40 border border-emerald-500/50 rounded-2xl flex items-center justify-between gap-3 text-sm text-[#e1e3e4] shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shrink-0">
              <span className="material-symbols-outlined text-lg">sync</span>
            </div>
            <div>
              <span className="font-bold text-emerald-400 block font-mono-code text-xs uppercase tracking-wide">
                Google Sheets Sincronizado - Familia RBS
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
        <div className="p-4 bg-[#0B1F3A] border border-[#ECC246]/60 rounded-2xl flex items-center gap-3 text-sm text-[#e1e3e4] shadow-lg animate-fadeIn">
          <span className="material-symbols-outlined text-emerald-400 text-2xl shrink-0 icon-fill">
            verified
          </span>
          <div className="flex-1">
            <span className="font-bold text-[#ECC246] block font-mono-code text-xs uppercase">
              Resultado de Auditoría Biométrica y Migratoria (Familia RBS)
            </span>
            <span>{auditMessage}</span>
          </div>
        </div>
      )}

      {/* View Filter Switcher */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-[#111415] p-2 rounded-2xl border border-[#323536]">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterMode('rbs_family')}
            className={`px-4 py-2 rounded-xl text-xs font-bold font-mono-code transition-all flex items-center gap-2 ${
              filterMode === 'rbs_family'
                ? 'bg-[#ECC246] text-[#3d2e00] shadow-md'
                : 'text-[#99907b] hover:text-white hover:bg-[#1d2021]'
            }`}
          >
            <span className="material-symbols-outlined text-sm">family_restroom</span>
            <span>Familia del Principal RBS ({familyRbsCount})</span>
          </button>

          <button
            onClick={() => setFilterMode('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold font-mono-code transition-all flex items-center gap-2 ${
              filterMode === 'all'
                ? 'bg-[#ECC246] text-[#3d2e00] shadow-md'
                : 'text-[#99907b] hover:text-white hover:bg-[#1d2021]'
            }`}
          >
            <span className="material-symbols-outlined text-sm">groups</span>
            <span>Toda la Delegación FBO ({passengers.length})</span>
          </button>
        </div>

        <div className="text-xs font-mono-code text-[#99907b] px-3 py-1">
          Principal: <strong className="text-[#ECC246]">RBS (Roberto Bernardo Sanchez)</strong>
        </div>
      </div>

      {/* Passenger Cards List */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-[#e1e3e4] flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span>
              {filterMode === 'rbs_family'
                ? 'Integrantes de la Familia del Principal (RBS)'
                : 'Expedientes de Toda la Delegación'}
            </span>
            <span className="text-xs bg-[#0B1F3A] text-[#ECC246] border border-[#ECC246]/40 px-2 py-0.5 rounded-full font-mono-code font-bold">
              {displayedPassengers.length} Registros
            </span>
          </span>

          <button
            onClick={() => setShowSheetsModal(true)}
            className="text-xs font-mono-code text-emerald-400 hover:underline flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">table_view</span>
            <span>Ver Hoja de Cálculo en Google Sheets</span>
          </button>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayedPassengers.map((p) => {
            const isWarning = p.overallStatus === 'Atención Requerida' || p.daysToPassportExp < 180;

            return (
              <article
                key={p.id}
                className={`bg-[#1d2021] rounded-2xl p-5 border transition-all shadow-xl flex flex-col justify-between ${
                  isWarning
                    ? 'border-amber-500/60 bg-amber-950/10'
                    : 'border-[#323536] hover:border-[#ECC246]/50'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#0B1F3A] border border-[#ECC246]/50 flex items-center justify-center font-bold text-[#ECC246] text-base shrink-0">
                        {p.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-[#e1e3e4] text-base">{p.name}</h3>
                          {p.isFamilyRbs && (
                            <span className="px-2 py-0.5 bg-[#ECC246]/20 text-[#ECC246] border border-[#ECC246]/30 text-[10px] font-bold font-mono-code rounded">
                              Familia RBS
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-mono-code text-[#99907b] block">
                          {p.familyRelationship || p.role}
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
                      {p.overallStatus}
                    </span>
                  </div>

                  {/* Document Grid */}
                  <div className="bg-[#111415] p-3.5 rounded-xl border border-[#323536] space-y-2 mb-4 font-mono-code text-xs">
                    <div className="flex justify-between items-center pb-2 border-b border-[#323536]">
                      <span className="text-[#99907b]">Pasaporte:</span>
                      <span className="text-[#e1e3e4] font-bold">
                        {p.passportNumber} ({p.passportCountry})
                      </span>
                    </div>

                    <div className="flex justify-between items-center pb-2 border-b border-[#323536]">
                      <span className="text-[#99907b]">Vencimiento Pasaporte:</span>
                      <span className={`font-bold ${isWarning ? 'text-amber-400' : 'text-[#ECC246]'}`}>
                        {p.passportExpDate} ({p.daysToPassportExp} días)
                      </span>
                    </div>

                    <div className="flex justify-between items-center pb-2 border-b border-[#323536]">
                      <span className="text-[#99907b]">Visado & Autorización:</span>
                      <span className="text-emerald-400 font-bold">
                        {p.visaType} ({p.visaStatus})
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-[#99907b]">Validación Biométrica FBO:</span>
                      <span className="text-[#ECC246] font-bold">{p.biometricClearance}</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#d1c5af] font-mono-code flex items-center gap-1.5 mb-2">
                    <span className="material-symbols-outlined text-sm text-[#ECC246]">medical_services</span>
                    <span>Especificaciones / Ficha: {p.dietaryOrMedical}</span>
                  </p>

                  {p.lastSyncedFromSheets && (
                    <div className="flex items-center gap-1.5 text-[11px] font-mono-code text-emerald-400/90 bg-emerald-950/30 p-2 rounded-lg border border-emerald-500/20 mb-2">
                      <span className="material-symbols-outlined text-sm">grid_on</span>
                      <span>Google Sheets: {p.lastSyncedFromSheets}</span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-[#323536] flex items-center justify-between">
                  <span className="text-[11px] font-mono-code text-[#99907b]">
                    Ref RBS: {p.id}
                  </span>

                  {isWarning && (
                    <button
                      onClick={() => {
                        if (onOpenConciergeWithQuery) {
                          onOpenConciergeWithQuery(
                            `Atención Concierge: El pasaporte de ${p.name} (Familia RBS) vence el ${p.passportExpDate}. Por favor gestionar cita de renovación de pasaporte express o extensión migratoria.`
                          );
                        }
                      }}
                      className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-sm">edit_calendar</span>
                      <span>Renovar Vía Concierge</span>
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
                  <h3 className="text-lg font-bold text-emerald-400">Integración con Google Sheets</h3>
                  <p className="text-xs text-[#99907b]">Familia del Principal (RBS)</p>
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
                📊 ¿Cómo funciona la importación desde Google Sheets?
              </p>
              <p>
                Ingresa el enlace de tu hoja de cálculo en Google Sheets (pública o compartida con tu cuenta). AeroGuard sincronizará automáticamente los campos de pasaporte, visados, fechas de vencimiento y relación familiar con el Principal <strong>RBS</strong>.
              </p>
            </div>

            <form onSubmit={handleSyncGoogleSheets} className="space-y-4 font-mono-code text-xs">
              <div>
                <label className="block text-[#e1e3e4] font-bold mb-1">
                  URL de Google Sheets (Familia RBS):
                </label>
                <input
                  type="text"
                  required
                  value={sheetUrl}
                  onChange={(e) => setSheetUrl(e.target.value)}
                  placeholder="https://docs.google.com/spreadsheets/d/ID_HOJA/edit"
                  className="w-full bg-[#111415] border border-emerald-500/50 text-[#e1e3e4] rounded-xl p-3 focus:border-emerald-400 focus:outline-none"
                />
              </div>

              <div className="p-3 bg-[#0B1F3A] rounded-xl border border-[#ECC246]/40 space-y-1">
                <span className="font-bold text-[#ECC246] block text-[11px] uppercase">
                  Estructura Requerida de Columnas en Google Sheets:
                </span>
                <p className="text-[11px] text-[#e1e3e4]">
                  Nombre | Relación RBS | Pasaporte | País | Vencimiento | Visa US | Ficha Médica
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSheetUrl('https://docs.google.com/spreadsheets/d/1RBS_Familia_Documentos_Oficiales_2026/edit#gid=0');
                  }}
                  className="px-3 py-2 bg-[#282a2b] text-[#ECC246] border border-[#ECC246]/30 rounded-xl hover:bg-[#323536] text-center"
                >
                  Cargar Plantilla RBS
                </button>

                <button
                  type="submit"
                  disabled={isSyncingSheets}
                  className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg"
                >
                  {isSyncingSheets ? (
                    <>
                      <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>Sincronizando Hoja...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-base">sync</span>
                      <span>Sincronizar y Cargar Datos</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Add Passenger */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#1d2021] border border-[#ECC246] rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-scaleUp">
            <div className="flex justify-between items-center border-b border-[#323536] pb-3">
              <div>
                <h3 className="text-lg font-bold text-[#ECC246]">Agregar Integrante de Familia RBS</h3>
                <p className="text-xs text-[#99907b]">Principal: RBS (Roberto Bernardo Sanchez)</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-[#99907b] hover:text-[#e1e3e4]"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleAddPassenger} className="space-y-3 font-mono-code text-xs">
              <div>
                <label className="block text-[#99907b] mb-1">Nombre Completo</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Sra. Beatriz Sanchez"
                  value={newPassengerName}
                  onChange={(e) => setNewPassengerName(e.target.value)}
                  className="w-full bg-[#111415] border border-[#323536] text-[#e1e3e4] rounded-xl p-2.5 focus:border-[#ECC246] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#99907b] mb-1">Relación con el Principal RBS</label>
                <select
                  value={newFamilyRelation}
                  onChange={(e) => setNewFamilyRelation(e.target.value as any)}
                  className="w-full bg-[#111415] border border-[#323536] text-[#ECC246] font-bold rounded-xl p-2.5 focus:border-[#ECC246] focus:outline-none"
                >
                  <option value="Principal (RBS)">Principal (RBS)</option>
                  <option value="Esposa de RBS">Esposa de RBS</option>
                  <option value="Hijo(a) de RBS">Hijo(a) de RBS</option>
                  <option value="Familiar Directo RBS">Familiar Directo RBS</option>
                </select>
              </div>

              <div>
                <label className="block text-[#99907b] mb-1">Rol / Ocupación</label>
                <input
                  type="text"
                  value={newPassengerRole}
                  onChange={(e) => setNewPassengerRole(e.target.value)}
                  className="w-full bg-[#111415] border border-[#323536] text-[#e1e3e4] rounded-xl p-2.5 focus:border-[#ECC246] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#99907b] mb-1">Pasaporte</label>
                  <input
                    type="text"
                    required
                    placeholder="MEX-12345678"
                    value={newPassportNum}
                    onChange={(e) => setNewPassportNum(e.target.value)}
                    className="w-full bg-[#111415] border border-[#323536] text-[#e1e3e4] rounded-xl p-2.5 focus:border-[#ECC246] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#99907b] mb-1">Vencimiento</label>
                  <input
                    type="text"
                    value={newPassportExp}
                    onChange={(e) => setNewPassportExp(e.target.value)}
                    className="w-full bg-[#111415] border border-[#323536] text-[#e1e3e4] rounded-xl p-2.5 focus:border-[#ECC246] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#99907b] mb-1">Visados Activos</label>
                <input
                  type="text"
                  value={newVisa}
                  onChange={(e) => setNewVisa(e.target.value)}
                  className="w-full bg-[#111415] border border-[#323536] text-[#e1e3e4] rounded-xl p-2.5 focus:border-[#ECC246] focus:outline-none"
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
                  className="px-4 py-2 bg-[#ECC246] text-[#3d2e00] font-bold rounded-xl"
                >
                  Guardar y Sincronizar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
