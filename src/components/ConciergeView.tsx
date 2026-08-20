import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';

interface ConciergeViewProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  onAcceptRouteChange?: () => void;
}

export const ConciergeView: React.FC<ConciergeViewProps> = ({
  messages,
  onSendMessage,
  onAcceptRouteChange,
}) => {
  const [inputText, setInputText] = useState('');
  const [routeChangedAccepted, setRouteChangedAccepted] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText('');
  };

  const handleQuickReply = (text: string) => {
    onSendMessage(text);
  };

  const handleAcceptRoute = () => {
    setRouteChangedAccepted(true);
    if (onAcceptRouteChange) onAcceptRouteChange();
    onSendMessage('Acepto el cambio de ruta sugerido para el Vuelo T-442.');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] min-h-[550px] max-w-3xl mx-auto relative pb-28 md:pb-8">
      {/* Concierge Header Sub-bar */}
      <div className="bg-[#0B1F3A] border border-[#1A1A1A] p-3 rounded-2xl mb-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-[#ECC246]/40 shrink-0">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5LuUcAj_XXeUG50eGfXwdlyhilSkjvaYLxstpozJC8X6HsL9WlIH2Frc4NpDCnjgxYjTIsxletqfjUT-MN93Kr6Ff9GImLFnT3925USj30IgMBS1JWCnDjBiTXDAhJdxYl55TJUyPL9A9nLIjm97xxQ3LNIVXfJDOuNSFPbksUKdIMPNgdnSRAns9DcSN8WZ0hq6x2R93JoeT_fxHxs-mqssrJLUqGtQS8jjHXhgQpgZRsYp3ufe38A"
              alt="Agent Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#ECC246]">
              Concierge VIP
            </h2>
            <p className="font-mono-code text-[11px] text-[#d1c5af] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#ECC246] animate-pulse" />
              <span>Disponible 24/7 · Enlace Logístico Directo</span>
            </p>
          </div>
        </div>
      </div>

      {/* Main Chat Canvas */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 hide-scrollbar">
        {/* Date Divider */}
        <div className="flex justify-center my-2">
          <span className="px-3 py-0.5 rounded-full text-[11px] font-mono-code bg-[#1d2021] text-[#d1c5af] border border-[#323536]">
            Hoy
          </span>
        </div>

        {/* Message Thread */}
        {messages.map((msg) => {
          const isAgent = msg.sender === 'agent';

          return (
            <div
              key={msg.id}
              className={`flex flex-col gap-1 ${
                isAgent ? 'items-start max-w-[90%] sm:max-w-[80%]' : 'items-end self-end max-w-[85%]'
              }`}
            >
              {/* Text Bubble */}
              {msg.text && (
                <div
                  className={`p-4 rounded-2xl shadow-md text-sm leading-relaxed ${
                    isAgent
                      ? 'bg-[#0B1F3A] border border-[#1A1A1A] text-[#e1e3e4] rounded-bl-sm'
                      : 'bg-[#C9A227] text-[#000000] font-medium rounded-br-sm'
                  }`}
                >
                  {msg.text}
                </div>
              )}

              {/* Rich Cards */}
              {msg.richCard && msg.richCard.type === 'reservation' && (
                <div className="bg-[#0B1F3A]/90 backdrop-blur-md rounded-2xl p-5 w-full border-l-2 border-[#C9A227] border border-[#1A1A1A] shadow-xl space-y-3">
                  <div className="flex items-center gap-2 text-[#ECC246] font-bold text-base">
                    <span className="material-symbols-outlined">restaurant</span>
                    <h3>{msg.richCard.title}</h3>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-[#e1e3e4]">
                      {msg.richCard.subtitle}
                    </h4>
                    <p className="text-xs text-[#d1c5af] flex items-center gap-1 mt-1">
                      <span className="material-symbols-outlined text-sm">schedule</span>
                      {msg.richCard.timeOrDetails}
                    </p>
                  </div>

                  {msg.richCard.imageUrl && (
                    <div className="h-32 w-full rounded-xl overflow-hidden relative border border-[#323536]">
                      <img
                        src={msg.richCard.imageUrl}
                        alt="Restaurant Preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-2.5">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-code bg-[#ECC246]/20 text-[#ECC246] border border-[#ECC246]/30 backdrop-blur-md font-bold">
                          {msg.richCard.statusBadge}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {msg.richCard && msg.richCard.type === 'route-change' && (
                <div className="bg-[#0B1F3A] rounded-2xl p-5 w-full border border-[#323536] shadow-xl relative overflow-hidden space-y-3">
                  <div className="flex items-center gap-2 text-[#e1e3e4] font-bold text-base">
                    <span className="material-symbols-outlined text-[#ECC246]">
                      alt_route
                    </span>
                    <h3>{msg.richCard.title}</h3>
                  </div>

                  <div className="bg-[#373a3b] p-3 rounded-xl flex items-center justify-between border border-[#4d4635]">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono-code text-[#99907b]">
                        Ruta Original
                      </span>
                      <span className="text-xs line-through text-[#d1c5af]">
                        {msg.richCard.routeInfo?.original}
                      </span>
                    </div>

                    <span className="material-symbols-outlined text-[#ECC246]">
                      arrow_forward
                    </span>

                    <div className="flex flex-col text-right">
                      <span className="text-[10px] font-mono-code text-[#ECC246]">
                        Nueva Ruta
                      </span>
                      <span className="text-xs font-bold text-[#e1e3e4]">
                        {msg.richCard.routeInfo?.newRoute}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleAcceptRoute}
                    disabled={routeChangedAccepted}
                    className={`w-full py-3 px-4 rounded-full font-bold text-sm transition-all shadow-lg active:scale-95 ${
                      routeChangedAccepted
                        ? 'bg-emerald-900/60 text-emerald-400 border border-emerald-500/40'
                        : 'bg-[#ECC246] text-[#3d2e00] hover:bg-[#ffe08e]'
                    }`}
                  >
                    {routeChangedAccepted
                      ? '✓ Cambio Aceptado y Reagendado'
                      : 'Aceptar cambio'}
                  </button>
                </div>
              )}

              <span className="text-[10px] font-mono-code text-[#99907b] px-1">
                {msg.time}
              </span>
            </div>
          );
        })}

        <div ref={chatEndRef} />
      </div>

      {/* Quick Replies & Input Bar */}
      <div className="mt-2 pt-2 border-t border-[#323536] bg-[#050B14]">
        {/* Quick Reply Pills */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
          <button
            onClick={() => handleQuickReply('Quiero cambiar mi vuelo de mañana')}
            className="whitespace-nowrap px-3.5 py-1.5 rounded-full border border-[#ECC246] text-[#ECC246] text-xs hover:bg-[#ECC246]/10 transition"
          >
            Cambiar vuelo
          </button>
          <button
            onClick={() => handleQuickReply('Solicitar reserva de mesa VIP')}
            className="whitespace-nowrap px-3.5 py-1.5 rounded-full border border-[#ECC246] text-[#ECC246] text-xs hover:bg-[#ECC246]/10 transition"
          >
            Reservar mesa
          </button>
          <button
            onClick={() => handleQuickReply('Verificar protocolo de ruta segura')}
            className="whitespace-nowrap px-3.5 py-1.5 rounded-full border border-[#ECC246] text-[#ECC246] text-xs hover:bg-[#ECC246]/10 transition flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-xs">security</span>
            Ruta segura
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="flex items-center gap-2 pt-1">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Escriba un mensaje al Concierge..."
            className="flex-1 bg-[#1d2021] border border-[#323536] text-[#e1e3e4] placeholder:text-[#99907b] rounded-full py-3 px-5 text-sm focus:outline-none focus:border-[#ECC246] transition-all"
          />
          <button
            type="submit"
            className="w-11 h-11 bg-[#ECC246] text-[#3d2e00] rounded-full flex items-center justify-center hover:bg-[#ffe08e] transition active:scale-95 shadow-md shrink-0"
          >
            <span className="material-symbols-outlined icon-fill">send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
