import React, { useState } from 'react';

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('marco.valerio@aeroguard.vip');
  const [password, setPassword] = useState('••••••••••••');
  const [isFaceScanning, setIsFaceScanning] = useState(false);
  const [scanStep, setScanStep] = useState<'idle' | 'scanning' | 'success'>('idle');

  const handleFaceIdLogin = () => {
    setIsFaceScanning(true);
    setScanStep('scanning');
    setTimeout(() => {
      setScanStep('success');
      setTimeout(() => {
        setIsFaceScanning(false);
        onLoginSuccess();
      }, 700);
    }, 1200);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess();
  };

  return (
    <div className="min-h-screen bg-[#050B14] flex flex-col items-center justify-center p-6 text-[#e1e3e4] relative overflow-hidden">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#C9A227]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#0B1F3A] rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md flex flex-col items-center space-y-8 z-10">
        {/* Header / Logo */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjZPg3u0xWU0JXnPeT1XvY0iIpa69KC2IhgvE32Jj3Uk9WyAo1IoiarubMzNsyp0KUB4MUjBtV-86oJvU-H4K_Onuj3rJ4CPZ036T6nTFGsToer9aQVIbGQbY6CAX_291o_SDZApbJ_SsRWSNsRd5ygUFOG1idarSMxV5MkXFvH8ldQy9YO6h00i91yNJpc-JdLlKYORbtYY5dcGskyDqUDiQDEYM2d70VqjkfT8OtHWADa21Yu-0hog"
              alt="AeroGuard VIP Logo"
              className="w-28 h-28 object-contain filter drop-shadow-[0_0_15px_rgba(236,194,70,0.3)]"
            />
          </div>
          <h1 className="text-3xl font-extrabold text-[#ECC246] tracking-tight">
            AeroGuard VIP
          </h1>
          <p className="text-lg text-[#d1c5af] font-medium">
            Su viaje, protegido de principio a fin
          </p>
        </div>

        {/* Login Card */}
        <div className="w-full bg-[#0B1F3A] rounded-3xl p-6 sm:p-8 shadow-[0_12px_32px_rgba(0,0,0,0.6)] border border-[#1A1A1A] space-y-6">
          {/* Primary Action: Biometric Face ID */}
          <button
            onClick={handleFaceIdLogin}
            disabled={isFaceScanning}
            className="w-full h-[56px] bg-[#c9a227] text-[#4b3a00] font-bold text-lg rounded-full flex items-center justify-center space-x-2 hover:bg-[#ecc246] transition-all active:scale-95 shadow-lg relative overflow-hidden"
          >
            {scanStep === 'scanning' ? (
              <div className="flex items-center space-x-2 animate-pulse">
                <span className="material-symbols-outlined text-2xl animate-spin">
                  sync
                </span>
                <span>Verificando Face ID...</span>
              </div>
            ) : scanStep === 'success' ? (
              <div className="flex items-center space-x-2 text-emerald-950">
                <span className="material-symbols-outlined text-2xl icon-fill">
                  check_circle
                </span>
                <span>Identidad Confirmada</span>
              </div>
            ) : (
              <>
                <span className="material-symbols-outlined text-2xl icon-fill">
                  face
                </span>
                <span>Iniciar con Face ID</span>
              </>
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center w-full py-1">
            <div className="flex-grow border-t border-[#323536]" />
            <span className="px-3 text-[#d1c5af] font-mono-code text-xs">
              O usar credenciales
            </span>
            <div className="flex-grow border-t border-[#323536]" />
          </div>

          {/* Form */}
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#99907b]">
                mail
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo Electrónico"
                required
                className="w-full bg-transparent border-b border-[#4d4635] text-[#e1e3e4] font-medium py-3 pl-12 pr-4 focus:outline-none focus:border-[#ECC246] transition-colors placeholder:text-[#99907b] h-[52px]"
              />
            </div>

            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#99907b]">
                lock
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                required
                className="w-full bg-transparent border-b border-[#4d4635] text-[#e1e3e4] font-medium py-3 pl-12 pr-4 focus:outline-none focus:border-[#ECC246] transition-colors placeholder:text-[#99907b] h-[52px]"
              />
            </div>

            <div className="flex justify-end pt-1">
              <a
                href="#forgot"
                onClick={(e) => e.preventDefault()}
                className="text-[#ECC246] font-mono-code text-xs hover:underline"
              >
                ¿Olvidó su contraseña?
              </a>
            </div>

            <button
              type="submit"
              className="w-full h-[54px] bg-transparent border border-[#ECC246] text-[#ECC246] font-bold text-lg rounded-full mt-4 hover:bg-[#ECC246]/10 transition-colors active:scale-95"
            >
              Ingresar
            </button>
          </form>
        </div>

        {/* Trust Badges */}
        <div className="flex items-center justify-center space-x-6 text-[#99907b] font-mono-code text-xs pt-2 opacity-80">
          <div className="flex items-center space-x-1.5">
            <span className="material-symbols-outlined text-base text-[#ECC246]">
              verified_user
            </span>
            <span>Cifrado End-to-End</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="material-symbols-outlined text-base text-[#ECC246]">
              gpp_good
            </span>
            <span>Seguridad Ejecutiva</span>
          </div>
        </div>
      </div>
    </div>
  );
};
