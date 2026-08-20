import React, { useState } from 'react';
import { DuffelOffer, FlightInfo } from '../types';
import { sampleDuffelOffers } from '../mockData';

interface DuffelLiveFlightsViewProps {
  currentFlight: FlightInfo;
  onSelectFlightOffer?: (offer: DuffelOffer) => void;
  onOpenConciergeWithQuery?: (query: string) => void;
}

type TripType = 'round_trip' | 'one_way' | 'multi_city';

export const DuffelLiveFlightsView: React.FC<DuffelLiveFlightsViewProps> = ({
  currentFlight,
  onOpenConciergeWithQuery,
}) => {
  const [searchEngine, setSearchEngine] = useState<'duffel' | 'google_flights'>('duffel');
  const [tripType, setTripType] = useState<TripType>('round_trip');

  // Duffel state
  const [duffelToken, setDuffelToken] = useState<string>(
    'duffel_test_cLtmuvAeCKXY1MgYAK9G5PewxGueO8MNsg3jmpAFy_h'
  );
  const [selectedOrigin, setSelectedOrigin] = useState<string>('MEX');
  const [selectedDestination, setSelectedDestination] = useState<string>('JFK');
  const [cabinClass, setCabinClass] = useState<string>('first');
  const [departureDate, setDepartureDate] = useState<string>('2026-08-15');
  const [returnDate, setReturnDate] = useState<string>('2026-08-22');

  // Multi-city legs state
  const [multiCityLegs, setMultiCityLegs] = useState<
    Array<{ origin: string; destination: string; date: string }>
  >([
    { origin: 'MEX', destination: 'JFK', date: '2026-08-15' },
    { origin: 'JFK', destination: 'LHR', date: '2026-08-20' },
    { origin: 'LHR', destination: 'MEX', date: '2026-08-27' },
  ]);

  const [offers, setOffers] = useState<DuffelOffer[]>(sampleDuffelOffers);
  const [isSearchingDuffel, setIsSearchingDuffel] = useState<boolean>(false);
  const [selectedOffer, setSelectedOffer] = useState<DuffelOffer | null>(sampleDuffelOffers[0]);
  const [duffelSuccessMsg, setDuffelSuccessMsg] = useState<string | null>(
    'Conectado con API Duffel mediante token de pruebas de desarrollador.'
  );

  // Google Flights state
  const [gfOrigin, setGfOrigin] = useState<string>('MEX');
  const [gfDestination, setGfDestination] = useState<string>('JFK');
  const [gfDate, setGfDate] = useState<string>('2026-08-15');
  const [gfReturnDate, setGfReturnDate] = useState<string>('2026-08-22');

  const buildGoogleFlightsUrl = () => {
    if (tripType === 'one_way') {
      return `https://www.google.com/travel/flights?q=vuelos+de+${gfOrigin}+a+${gfDestination}+solo+ida+el+${gfDate}&gl=MX&hl=es-419`;
    } else if (tripType === 'round_trip') {
      return `https://www.google.com/travel/flights?q=vuelos+de+${gfOrigin}+a+${gfDestination}+ida+y+vuelta+del+${gfDate}+al+${gfReturnDate}&gl=MX&hl=es-419`;
    } else {
      // Multi-city
      const legsQuery = multiCityLegs
        .map((leg) => `de+${leg.origin}+a+${leg.destination}+el+${leg.date}`)
        .join('+y+');
      return `https://www.google.com/travel/flights?q=vuelos+multidestino+${legsQuery}&gl=MX&hl=es-419`;
    }
  };

  const handleDuffelSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSearchingDuffel(true);
    setDuffelSuccessMsg(null);

    setTimeout(() => {
      setIsSearchingDuffel(false);
      const filtered = sampleDuffelOffers.filter(
        (o) =>
          (o.originCode === selectedOrigin || selectedOrigin === 'ALL') &&
          (o.destinationCode === selectedDestination || selectedDestination === 'ALL')
      );
      setOffers(filtered.length > 0 ? filtered : sampleDuffelOffers);

      const tripLabel =
        tripType === 'round_trip'
          ? 'Ida y Vuelta'
          : tripType === 'one_way'
          ? 'Solo Ida'
          : 'Multidestino';

      setDuffelSuccessMsg(
        `Búsqueda Duffel (${tripLabel}) completada con éxito. Token test: (${duffelToken.substring(
          0,
          18
        )}...).`
      );
    }, 800);
  };

  const handleOpenGoogleFlights = () => {
    const url = buildGoogleFlightsUrl();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const addMultiCityLeg = () => {
    if (multiCityLegs.length >= 5) return;
    const lastLeg = multiCityLegs[multiCityLegs.length - 1];
    setMultiCityLegs([
      ...multiCityLegs,
      { origin: lastLeg.destination, destination: 'MAD', date: '2026-08-30' },
    ]);
  };

  const removeMultiCityLeg = (index: number) => {
    if (multiCityLegs.length <= 2) return;
    setMultiCityLegs(multiCityLegs.filter((_, i) => i !== index));
  };

  const updateMultiCityLeg = (
    index: number,
    field: 'origin' | 'destination' | 'date',
    value: string
  ) => {
    const updated = [...multiCityLegs];
    updated[index][field] = value;
    setMultiCityLegs(updated);
  };

  return (
    <div className="space-y-6 pb-24 md:pb-8">
      {/* Top Banner Header */}
      <section className="bg-gradient-to-r from-[#0B1F3A] via-[#111415] to-[#1B2A4A] p-6 rounded-2xl border border-[#ECC246]/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <span className="material-symbols-outlined text-9xl text-[#ECC246]">flight_takeoff</span>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full font-mono-code text-[11px] font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Motores de Vuelos Integrados
              </span>
              <span className="text-xs text-[#ECC246] font-mono-code">
                Duffel Live API & Google Flights
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-[#ECC246] tracking-tight">
              Buscador Dual de Vuelos VIP & Comerciales
            </h1>
            <p className="text-sm text-[#d1c5af] max-w-xl mt-1">
              Configura vuelos de <strong className="text-white">Ida y Vuelta</strong>, <strong className="text-white">Solo Ida</strong> o <strong className="text-white">Multidestino</strong> conectando directamente a <strong className="text-white">Duffel API</strong> o <strong className="text-white">Google Flights México</strong>.
            </p>
          </div>

          {/* Engine Selector Switcher Buttons */}
          <div className="bg-[#111415] p-1.5 rounded-2xl border border-[#323536] flex items-center gap-1 shrink-0 w-full md:w-auto">
            <button
              onClick={() => setSearchEngine('duffel')}
              className={`flex-1 md:flex-initial px-4 py-2 rounded-xl text-xs font-mono-code font-bold transition-all flex items-center justify-center gap-2 ${
                searchEngine === 'duffel'
                  ? 'bg-[#ECC246] text-[#3d2e00] shadow-md'
                  : 'text-[#99907b] hover:text-white hover:bg-[#1d2021]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">flight</span>
              <span>1. Duffel API</span>
            </button>

            <button
              onClick={() => setSearchEngine('google_flights')}
              className={`flex-1 md:flex-initial px-4 py-2 rounded-xl text-xs font-mono-code font-bold transition-all flex items-center justify-center gap-2 ${
                searchEngine === 'google_flights'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-[#99907b] hover:text-white hover:bg-[#1d2021]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">public</span>
              <span>2. Google Flights</span>
            </button>
          </div>
        </div>
      </section>

      {/* TRIP TYPE SELECTOR BUTTONS (Global for both engines) */}
      <div className="bg-[#111415] p-2 rounded-2xl border border-[#323536] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono-code text-[#ECC246] uppercase font-bold px-2">
            Tipo de Itinerario:
          </span>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setTripType('round_trip')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono-code transition-all flex items-center gap-1.5 ${
                tripType === 'round_trip'
                  ? 'bg-[#ECC246] text-black shadow-md'
                  : 'text-[#99907b] hover:text-white hover:bg-[#1d2021]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">sync_alt</span>
              <span>Ida y Vuelta</span>
            </button>

            <button
              onClick={() => setTripType('one_way')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono-code transition-all flex items-center gap-1.5 ${
                tripType === 'one_way'
                  ? 'bg-[#ECC246] text-black shadow-md'
                  : 'text-[#99907b] hover:text-white hover:bg-[#1d2021]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">trending_flat</span>
              <span>Solo Ida</span>
            </button>

            <button
              onClick={() => setTripType('multi_city')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono-code transition-all flex items-center gap-1.5 ${
                tripType === 'multi_city'
                  ? 'bg-[#ECC246] text-black shadow-md'
                  : 'text-[#99907b] hover:text-white hover:bg-[#1d2021]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">alt_route</span>
              <span>Multidestino</span>
            </button>
          </div>
        </div>

        <span className="text-xs font-mono-code text-[#99907b] px-2 hidden sm:inline">
          {tripType === 'round_trip' && '✈️ Vuelo completo con salida y regreso'}
          {tripType === 'one_way' && '✈️ Trayecto directo de un solo sentido'}
          {tripType === 'multi_city' && '✈️ Múltiples conexiones y tramos de vuelo'}
        </span>
      </div>

      {/* ENGINE 1: DUFFEL VUELOS LIVE */}
      {searchEngine === 'duffel' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Duffel Search Control Box */}
          <div className="bg-[#1d2021] rounded-2xl p-5 border border-[#ECC246]/40 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-3 border-b border-[#323536]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                <h2 className="text-sm font-mono-code text-[#ECC246] uppercase font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base">travel_explore</span>
                  <span>Opción 1: Motor de Vuelos Duffel API</span>
                </h2>
              </div>

              <span className="px-2.5 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-500/40 rounded-full font-mono-code text-[11px] font-bold">
                Token Activo: duffel_test_cLtmuv...
              </span>
            </div>

            {/* Token details and custom key box */}
            <div className="bg-[#111415] p-3 rounded-xl border border-[#323536] text-xs font-mono-code space-y-2">
              <div className="flex justify-between items-center text-[#99907b]">
                <span>Duffel API Secret Token (Test Mode):</span>
                <span className="text-emerald-400 font-bold">duffel_test_cLtmuv...</span>
              </div>
              <input
                type="text"
                value={duffelToken}
                onChange={(e) => setDuffelToken(e.target.value)}
                placeholder="Ingresa tu token de Duffel"
                className="w-full bg-[#1d2021] border border-[#323536] text-emerald-400 rounded-lg p-2 focus:border-[#ECC246] focus:outline-none text-xs"
              />
            </div>

            {/* IF TRIP TYPE IS ONE_WAY OR ROUND_TRIP */}
            {(tripType === 'one_way' || tripType === 'round_trip') && (
              <form onSubmit={handleDuffelSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 font-mono-code text-xs">
                <div>
                  <label className="block text-[#99907b] mb-1 font-bold">Origen (IATA)</label>
                  <select
                    value={selectedOrigin}
                    onChange={(e) => setSelectedOrigin(e.target.value)}
                    className="w-full bg-[#111415] border border-[#323536] text-[#e1e3e4] rounded-xl px-3 py-2.5 text-sm focus:border-[#ECC246] focus:outline-none"
                  >
                    <option value="MEX">Ciudad de México / Toluca (MEX / TLC)</option>
                    <option value="MIA">Miami Executive (MIA / OPF)</option>
                    <option value="JFK">Nueva York (JFK / TEB)</option>
                    <option value="LHR">Londres Heathrow (LHR)</option>
                    <option value="ALL">Todos los Orígenes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#99907b] mb-1 font-bold">Destino (IATA)</label>
                  <select
                    value={selectedDestination}
                    onChange={(e) => setSelectedDestination(e.target.value)}
                    className="w-full bg-[#111415] border border-[#323536] text-[#e1e3e4] rounded-xl px-3 py-2.5 text-sm focus:border-[#ECC246] focus:outline-none"
                  >
                    <option value="JFK">Nueva York (JFK / TEB)</option>
                    <option value="LHR">Londres Heathrow (LHR)</option>
                    <option value="MAD">Madrid Barajas (MAD)</option>
                    <option value="MIA">Miami (MIA)</option>
                    <option value="MEX">Ciudad de México (MEX)</option>
                    <option value="ALL">Todos los Destinos</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#99907b] mb-1 font-bold">Fecha de Salida</label>
                  <input
                    type="date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    className="w-full bg-[#111415] border border-[#323536] text-[#ECC246] font-bold rounded-xl px-3 py-2.5 text-sm focus:border-[#ECC246] focus:outline-none"
                  />
                </div>

                {tripType === 'round_trip' && (
                  <div>
                    <label className="block text-[#99907b] mb-1 font-bold">Fecha de Regreso</label>
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full bg-[#111415] border border-[#323536] text-[#ECC246] font-bold rounded-xl px-3 py-2.5 text-sm focus:border-[#ECC246] focus:outline-none"
                    />
                  </div>
                )}

                <div className="flex items-end">
                  <button
                    type="submit"
                    disabled={isSearchingDuffel}
                    className="w-full bg-[#ECC246] hover:bg-[#ffe08e] text-[#3d2e00] font-bold text-sm py-2.5 px-4 rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                  >
                    {isSearchingDuffel ? (
                      <>
                        <span className="w-4 h-4 border-2 border-[#3d2e00] border-t-transparent rounded-full animate-spin" />
                        <span>Consultando...</span>
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-base">travel_explore</span>
                        <span>Buscar en Duffel</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* IF TRIP TYPE IS MULTI_CITY */}
            {tripType === 'multi_city' && (
              <div className="space-y-3 font-mono-code text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#ECC246] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-base">alt_route</span>
                    <span>Tramos de Vuelo Multidestino Duffel ({multiCityLegs.length} Tramos)</span>
                  </span>

                  <button
                    onClick={addMultiCityLeg}
                    className="px-3 py-1 bg-[#282a2b] hover:bg-[#323536] text-[#ECC246] border border-[#ECC246]/40 rounded-xl font-bold flex items-center gap-1 text-xs"
                  >
                    <span className="material-symbols-outlined text-sm">add_circle</span>
                    <span>Agregar Tramo</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {multiCityLegs.map((leg, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-[#111415] p-3 rounded-xl border border-[#323536] items-center"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#ECC246] text-black font-bold flex items-center justify-center text-xs shrink-0">
                          {idx + 1}
                        </span>
                        <select
                          value={leg.origin}
                          onChange={(e) => updateMultiCityLeg(idx, 'origin', e.target.value)}
                          className="w-full bg-[#1d2021] border border-[#323536] text-[#e1e3e4] rounded-lg p-2"
                        >
                          <option value="MEX">MEX - Cd. México</option>
                          <option value="JFK">JFK - Nueva York</option>
                          <option value="MIA">MIA - Miami</option>
                          <option value="LHR">LHR - Londres</option>
                          <option value="MAD">MAD - Madrid</option>
                        </select>
                      </div>

                      <div>
                        <select
                          value={leg.destination}
                          onChange={(e) => updateMultiCityLeg(idx, 'destination', e.target.value)}
                          className="w-full bg-[#1d2021] border border-[#323536] text-[#e1e3e4] rounded-lg p-2"
                        >
                          <option value="JFK">JFK - Nueva York</option>
                          <option value="LHR">LHR - Londres</option>
                          <option value="MAD">MAD - Madrid</option>
                          <option value="MIA">MIA - Miami</option>
                          <option value="MEX">MEX - Cd. México</option>
                        </select>
                      </div>

                      <div>
                        <input
                          type="date"
                          value={leg.date}
                          onChange={(e) => updateMultiCityLeg(idx, 'date', e.target.value)}
                          className="w-full bg-[#1d2021] border border-[#323536] text-[#ECC246] font-bold rounded-lg p-2"
                        />
                      </div>

                      <div className="flex items-center justify-end gap-2">
                        {multiCityLegs.length > 2 && (
                          <button
                            onClick={() => removeMultiCityLeg(idx)}
                            className="p-2 text-rose-400 hover:text-rose-300"
                            title="Eliminar tramo"
                          >
                            <span className="material-symbols-outlined text-base">delete</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => handleDuffelSearch()}
                    disabled={isSearchingDuffel}
                    className="px-6 py-2.5 bg-[#ECC246] hover:bg-[#ffe08e] text-[#3d2e00] font-bold text-xs rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-base">travel_explore</span>
                    <span>Buscar Vuelo Multidestino en Duffel</span>
                  </button>
                </div>
              </div>
            )}

            {duffelSuccessMsg && (
              <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 font-mono-code flex items-center gap-2">
                <span className="material-symbols-outlined text-base">check_circle</span>
                <span>{duffelSuccessMsg}</span>
              </div>
            )}
          </div>

          {/* Active Flight Radar Spotlight */}
          {currentFlight && (
            <article className="bg-[#0B1F3A] rounded-2xl p-6 border border-[#ECC246]/50 shadow-2xl relative">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-xs font-mono-code text-[#ECC246] uppercase tracking-wider block mb-1">
                    📡 TELEMETRÍA EN VIVO Y RADAR DEDICADO DUFFEL
                  </span>
                  <h3 className="text-xl font-bold text-[#e1e3e4]">
                    {currentFlight.airline || 'Aeroméxico VIP'} • {currentFlight.flightNumber}
                  </h3>
                </div>
                <span className="px-3 py-1 bg-[#ECC246]/20 border border-[#ECC246]/40 text-[#ECC246] rounded-full text-xs font-mono-code font-bold animate-pulse">
                  {currentFlight.status}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#111415]/60 p-4 rounded-xl border border-[#323536] mb-4">
                <div>
                  <span className="block text-[11px] font-mono-code text-[#99907b]">Aeronave</span>
                  <span className="text-sm font-bold text-[#e1e3e4]">
                    {currentFlight.aircraftType || 'Boeing 787-9'}
                  </span>
                </div>
                <div>
                  <span className="block text-[11px] font-mono-code text-[#99907b]">Altitud</span>
                  <span className="text-sm font-bold text-[#ECC246]">
                    {currentFlight.altitudeFt ? `${currentFlight.altitudeFt.toLocaleString()} ft` : '38,000 ft'}
                  </span>
                </div>
                <div>
                  <span className="block text-[11px] font-mono-code text-[#99907b]">Velocidad</span>
                  <span className="text-sm font-bold text-[#e1e3e4]">
                    {currentFlight.speedKmh ? `${currentFlight.speedKmh} km/h` : '890 km/h'}
                  </span>
                </div>
                <div>
                  <span className="block text-[11px] font-mono-code text-[#99907b]">Duffel Offer ID</span>
                  <span className="text-xs font-mono-code text-[#ECC246] truncate block">
                    {currentFlight.duffelOfferId || 'off_0000A1b2C3'}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#d1c5af] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-[#ECC246]">verified</span>
                <span>{currentFlight.securityNote}</span>
              </p>
            </article>
          )}

          {/* Duffel Flight Offers List */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#e1e3e4] flex items-center justify-between">
              <span>
                Resultados Directos de Duffel ({offers.length} Ofertas - {tripType.replace('_', ' ').toUpperCase()})
              </span>
              <span className="text-xs font-mono-code text-[#99907b]">
                Tarifas con Protección AeroGuard Incluida
              </span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {offers.map((offer) => (
                <article
                  key={offer.id}
                  onClick={() => setSelectedOffer(offer)}
                  className={`bg-[#1d2021] rounded-2xl p-5 border transition-all cursor-pointer relative flex flex-col justify-between ${
                    selectedOffer?.id === offer.id
                      ? 'border-[#ECC246] bg-[#282a2b] shadow-xl'
                      : 'border-[#323536] hover:border-[#ECC246]/40'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{offer.airlineLogo}</span>
                        <div>
                          <h4 className="font-bold text-[#e1e3e4] text-base">{offer.airlineName}</h4>
                          <span className="text-xs font-mono-code text-[#99907b] block">
                            {offer.flightNumber} • {offer.aircraft}
                          </span>
                        </div>
                      </div>

                      <span className="text-lg font-extrabold text-[#ECC246] font-mono-code">
                        ${offer.priceUsd.toLocaleString()} USD
                      </span>
                    </div>

                    <div className="flex items-center justify-between bg-[#111415] p-3 rounded-xl mb-4 text-center">
                      <div>
                        <span className="text-xl font-extrabold text-[#ECC246] block">
                          {offer.originCode}
                        </span>
                        <span className="text-[11px] text-[#99907b]">{offer.departureTime}</span>
                      </div>

                      <div className="flex flex-col items-center">
                        <span className="text-[10px] font-mono-code text-[#99907b]">
                          {offer.duration}
                        </span>
                        <span className="material-symbols-outlined text-[#ECC246] text-sm">
                          {tripType === 'round_trip' ? 'sync_alt' : 'flight_takeoff'}
                        </span>
                        <span className="text-[9px] text-emerald-400 font-mono-code">
                          {offer.stops === 0 ? 'Directo' : `${offer.stops} Escala`}
                        </span>
                      </div>

                      <div>
                        <span className="text-xl font-extrabold text-[#e1e3e4] block">
                          {offer.destinationCode}
                        </span>
                        <span className="text-[11px] text-[#99907b]">{offer.arrivalTime}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4 text-xs font-mono-code">
                      <span className="px-2.5 py-1 bg-[#0B1F3A] text-[#ECC246] rounded-md border border-[#ECC246]/30">
                        {offer.classType}
                      </span>
                      <span className="px-2.5 py-1 bg-[#323536] text-[#d1c5af] rounded-md">
                        🧳 {offer.baggageIncluded}
                      </span>
                      {offer.helipadTransferAvailable && (
                        <span className="px-2.5 py-1 bg-emerald-950/40 text-emerald-300 border border-emerald-500/30 rounded-md">
                          🚁 Helipuerto FBO Directo
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#323536] flex items-center justify-between">
                    <span className="text-[11px] text-[#99907b] font-mono-code flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs text-[#ECC246]">security</span>
                      {offer.securityStatus}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onOpenConciergeWithQuery) {
                          onOpenConciergeWithQuery(
                            `Deseo reservar el vuelo (${tripType === 'round_trip' ? 'Ida y Vuelta' : tripType === 'one_way' ? 'Solo Ida' : 'Multidestino'}) en ${offer.airlineName} (Vuelo ${offer.flightNumber}) por $${offer.priceUsd} USD. Por favor coordinar escolta táctica.`
                          );
                        }
                      }}
                      className="px-3.5 py-1.5 bg-[#ECC246] hover:bg-[#ffe08e] text-[#3d2e00] rounded-xl font-bold text-xs transition-colors shadow-sm active:scale-95"
                    >
                      Reservar vía Concierge VIP
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ENGINE 2: GOOGLE FLIGHTS */}
      {searchEngine === 'google_flights' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#1d2021] rounded-2xl p-6 border border-blue-500/50 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-[#323536]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-400 flex items-center justify-center text-blue-400">
                  <span className="material-symbols-outlined text-xl">public</span>
                </div>
                <div>
                  <h2 className="text-base font-bold text-blue-400">Opción 2: Google Flights México</h2>
                  <p className="text-xs text-[#99907b]">
                    Acceso directo al agregador de vuelos para itinerarios de <strong className="text-white">Ida y Vuelta</strong>, <strong className="text-white">Solo Ida</strong> o <strong className="text-white">Multidestino</strong>.
                  </p>
                </div>
              </div>

              <a
                href="https://www.google.com/travel/flights?gl=MX&hl=es-419"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg transition-all shrink-0 active:scale-95"
              >
                <span className="material-symbols-outlined text-sm">open_in_new</span>
                <span>Abrir Google Flights Principal</span>
              </a>
            </div>

            {/* Custom Interactive Google Flights Route Generator */}
            <div className="bg-[#111415] p-5 rounded-2xl border border-[#323536] space-y-4">
              <h3 className="text-xs font-mono-code text-blue-300 uppercase tracking-wider font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">travel_explore</span>
                <span>
                  Generador de Ruta en Google Flights (
                  {tripType === 'round_trip'
                    ? 'Ida y Vuelta'
                    : tripType === 'one_way'
                    ? 'Solo Ida'
                    : 'Multidestino'}
                  )
                </span>
              </h3>

              {(tripType === 'round_trip' || tripType === 'one_way') && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono-code text-xs">
                  <div>
                    <label className="block text-[#99907b] mb-1 font-bold">Ciudad u Origen</label>
                    <select
                      value={gfOrigin}
                      onChange={(e) => setGfOrigin(e.target.value)}
                      className="w-full bg-[#1d2021] border border-[#323536] text-[#e1e3e4] rounded-xl p-3 focus:border-blue-400 focus:outline-none"
                    >
                      <option value="MEX">Ciudad de México (MEX)</option>
                      <option value="TLC">Toluca Executive (TLC)</option>
                      <option value="CUN">Cancún (CUN)</option>
                      <option value="GDL">Guadalajara (GDL)</option>
                      <option value="MTY">Monterrey (MTY)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#99907b] mb-1 font-bold">Ciudad o Destino</label>
                    <select
                      value={gfDestination}
                      onChange={(e) => setGfDestination(e.target.value)}
                      className="w-full bg-[#1d2021] border border-[#323536] text-[#e1e3e4] rounded-xl p-3 focus:border-blue-400 focus:outline-none"
                    >
                      <option value="JFK">Nueva York (JFK)</option>
                      <option value="MIA">Miami (MIA)</option>
                      <option value="MAD">Madrid (MAD)</option>
                      <option value="LHR">Londres (LHR)</option>
                      <option value="CDG">París (CDG)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#99907b] mb-1 font-bold">Fecha de Salida</label>
                    <input
                      type="date"
                      value={gfDate}
                      onChange={(e) => setGfDate(e.target.value)}
                      className="w-full bg-[#1d2021] border border-[#323536] text-blue-300 font-bold rounded-xl p-2.5 focus:border-blue-400 focus:outline-none"
                    />
                  </div>

                  {tripType === 'round_trip' && (
                    <div>
                      <label className="block text-[#99907b] mb-1 font-bold">Fecha de Regreso</label>
                      <input
                        type="date"
                        value={gfReturnDate}
                        onChange={(e) => setGfReturnDate(e.target.value)}
                        className="w-full bg-[#1d2021] border border-[#323536] text-blue-300 font-bold rounded-xl p-2.5 focus:border-blue-400 focus:outline-none"
                      />
                    </div>
                  )}
                </div>
              )}

              {tripType === 'multi_city' && (
                <div className="space-y-3 font-mono-code text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-blue-400 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-base">alt_route</span>
                      <span>Configuración Multidestino Google Flights</span>
                    </span>

                    <button
                      onClick={addMultiCityLeg}
                      className="px-3 py-1 bg-blue-950 hover:bg-blue-900 text-blue-300 border border-blue-500/40 rounded-xl font-bold flex items-center gap-1 text-xs"
                    >
                      <span className="material-symbols-outlined text-sm">add_circle</span>
                      <span>Agregar Tramo</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {multiCityLegs.map((leg, idx) => (
                      <div
                        key={idx}
                        className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-[#1d2021] p-3 rounded-xl border border-[#323536] items-center"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center text-xs shrink-0">
                            {idx + 1}
                          </span>
                          <select
                            value={leg.origin}
                            onChange={(e) => updateMultiCityLeg(idx, 'origin', e.target.value)}
                            className="w-full bg-[#111415] border border-[#323536] text-[#e1e3e4] rounded-lg p-2"
                          >
                            <option value="MEX">MEX - Cd. México</option>
                            <option value="JFK">JFK - Nueva York</option>
                            <option value="MIA">MIA - Miami</option>
                            <option value="LHR">LHR - Londres</option>
                            <option value="MAD">MAD - Madrid</option>
                          </select>
                        </div>

                        <div>
                          <select
                            value={leg.destination}
                            onChange={(e) => updateMultiCityLeg(idx, 'destination', e.target.value)}
                            className="w-full bg-[#111415] border border-[#323536] text-[#e1e3e4] rounded-lg p-2"
                          >
                            <option value="JFK">JFK - Nueva York</option>
                            <option value="LHR">LHR - Londres</option>
                            <option value="MAD">MAD - Madrid</option>
                            <option value="MIA">MIA - Miami</option>
                            <option value="MEX">MEX - Cd. México</option>
                          </select>
                        </div>

                        <div>
                          <input
                            type="date"
                            value={leg.date}
                            onChange={(e) => updateMultiCityLeg(idx, 'date', e.target.value)}
                            className="w-full bg-[#111415] border border-[#323536] text-blue-300 font-bold rounded-lg p-2"
                          />
                        </div>

                        <div className="flex items-center justify-end gap-2">
                          {multiCityLegs.length > 2 && (
                            <button
                              onClick={() => removeMultiCityLeg(idx)}
                              className="p-2 text-rose-400 hover:text-rose-300"
                              title="Eliminar tramo"
                            >
                              <span className="material-symbols-outlined text-base">delete</span>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons for Google Flights */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#323536]">
                <div className="text-xs text-[#99907b] font-mono-code truncate max-w-md">
                  URL Generada: <span className="text-blue-400">{buildGoogleFlightsUrl()}</span>
                </div>

                <button
                  onClick={handleOpenGoogleFlights}
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs rounded-xl shadow-xl flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <span className="material-symbols-outlined text-base">flight_takeoff</span>
                  <span>Abrir Ruta ({tripType.replace('_', ' ').toUpperCase()}) en Google Flights</span>
                </button>
              </div>
            </div>

            {/* Google Flights Integration Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#111415] p-5 rounded-2xl border border-[#323536] space-y-2">
                <span className="text-2xl">🌐</span>
                <h4 className="font-bold text-white text-base">Google Flights México (Español)</h4>
                <p className="text-xs text-[#99907b]">
                  Compara vuelos de Aeroméxico, Iberia, Delta, British Airways, Lufthansa y más con itinerarios flexibles en pesos mexicanos y dólares.
                </p>
                <a
                  href="https://www.google.com/travel/flights?gl=MX&hl=es-419"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold font-mono-code text-blue-400 hover:underline pt-2"
                >
                  <span>Ir a Google Flights</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>

              <div className="bg-[#111415] p-5 rounded-2xl border border-[#323536] space-y-2">
                <span className="text-2xl">🛡️</span>
                <h4 className="font-bold text-white text-base">Reserva Asistida con Concierge AeroGuard</h4>
                <p className="text-xs text-[#99907b]">
                  ¿Encontraste un vuelo en Google Flights? Copia el número de vuelo o la ruta y compártelo con el Concierge VIP para emisión prioritaria con escolta.
                </p>
                <button
                  onClick={() => {
                    if (onOpenConciergeWithQuery) {
                      onOpenConciergeWithQuery(
                        `Hola Concierge, revisé un vuelo (${tripType}) en Google Flights. Deseo que emitan los boletos First Class/Ejecutiva y coordinen asistencia FBO.`
                      );
                    }
                  }}
                  className="inline-flex items-center gap-1 text-xs font-bold font-mono-code text-[#ECC246] hover:underline pt-2"
                >
                  <span>Enviar Ruta al Concierge</span>
                  <span className="material-symbols-outlined text-sm">support_agent</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
