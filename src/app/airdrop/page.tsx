"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5"/>
    <polyline points="12 19 5 12 12 5"/>
  </svg>
);

const RocketIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#A78BFA]">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </svg>
);

const GiftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#A78BFA]">
    <rect x="3" y="8" width="18" height="4" rx="1"/>
    <path d="M12 8v13"/>
    <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/>
    <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>
  </svg>
);

const WinnerProfile = ({ username }: { username: string }) => {
  const initial = username.charAt(1).toUpperCase(); // Get first letter after @

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-[#8B5CF6] blur-lg opacity-30 rounded-full group-hover:opacity-50 transition-opacity"></div>
      <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border-2 border-[#A78BFA]/50 flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
        <span className="text-3xl font-bold text-[#A78BFA]">{initial}</span>
      </div>
    </div>
  );
};

export default function AirdropPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('giveaway');

  // Countdown state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isExpired, setIsExpired] = useState(false);

  // Calculate time remaining until 23:59:59 25 December UTC
  useEffect(() => {
    const targetDate = new Date('2025-12-25T23:59:59Z');

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setIsExpired(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return { days, hours, minutes, seconds };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#0F172A] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#8B5CF6] opacity-12 blur-[80px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#A78BFA] opacity-10 blur-[70px] rounded-full pointer-events-none"></div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.05)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>

      {/* Fixed Header */}
      <header className="w-full p-6 z-20">
        {/* Back button */}
        <button
          onClick={() => router.push('/home')}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/50 rounded-xl text-slate-300 hover:text-white transition-all duration-300"
        >
          <BackIcon />
          <span className="text-sm font-medium">Back</span>
        </button>

        {/* Title */}
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#A78BFA] to-white mt-6 text-center">
          Rewards
        </h1>

        {/* Tab Buttons */}
        <div className="flex justify-center gap-3 mt-6">
          <button
            onClick={() => setActiveTab('giveaway')}
            className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
              activeTab === 'giveaway'
                ? 'bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white shadow-[0_4px_16px_rgba(139,92,246,0.4)]'
                : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-700/60 border border-slate-700/50'
            }`}
          >
            Giveaway
          </button>
          <button
            onClick={() => setActiveTab('airdrop')}
            className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
              activeTab === 'airdrop'
                ? 'bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white shadow-[0_4px_16px_rgba(139,92,246,0.4)]'
                : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-700/60 border border-slate-700/50'
            }`}
          >
            Airdrop
          </button>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center z-10 p-6">

        {/* Giveaway Tab Content */}
        {activeTab === 'giveaway' && (
          <div className="flex flex-col items-center w-full max-w-md">
            {/* Gift Icon */}
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-[#8B5CF6] blur-[40px] opacity-30 rounded-full"></div>
              <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-6 rounded-3xl border-2 border-slate-700/60 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                <GiftIcon />
              </div>
            </div>

            {/* Countdown Title */}
            <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#A78BFA] to-white mb-4 text-center">
              Countdown to Giveaway
            </h2>

            {/* Countdown Timer */}
            <div className="relative mb-6 w-full">
              <div className="absolute inset-0 bg-[#8B5CF6] blur-xl opacity-20 rounded-2xl"></div>
              <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-5 rounded-2xl border border-slate-700/50 shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
                {isExpired ? (
                  <div className="text-center">
                    <span className="text-xl font-bold text-white">Giveaway Time!</span>
                  </div>
                ) : (
                  <div className="flex justify-center gap-3">
                    <div className="flex flex-col items-center">
                      <div className="bg-gradient-to-br from-slate-700 to-slate-800 px-4 py-2 rounded-xl border border-slate-600/50 min-w-[55px]">
                        <span className="text-2xl font-bold text-white">{String(timeLeft.days).padStart(2, '0')}</span>
                      </div>
                      <span className="text-xs text-slate-400 mt-1.5 font-medium">Days</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-gradient-to-br from-slate-700 to-slate-800 px-4 py-2 rounded-xl border border-slate-600/50 min-w-[55px]">
                        <span className="text-2xl font-bold text-white">{String(timeLeft.hours).padStart(2, '0')}</span>
                      </div>
                      <span className="text-xs text-slate-400 mt-1.5 font-medium">Hours</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-gradient-to-br from-slate-700 to-slate-800 px-4 py-2 rounded-xl border border-slate-600/50 min-w-[55px]">
                        <span className="text-2xl font-bold text-white">{String(timeLeft.minutes).padStart(2, '0')}</span>
                      </div>
                      <span className="text-xs text-slate-400 mt-1.5 font-medium">Mins</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] px-4 py-2 rounded-xl border border-[#A78BFA]/30 min-w-[55px]">
                        <span className="text-2xl font-bold text-white">{String(timeLeft.seconds).padStart(2, '0')}</span>
                      </div>
                      <span className="text-xs text-slate-400 mt-1.5 font-medium">Secs</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Winner Profiles */}
            <div className="flex justify-center gap-8 mb-4">
              <div className="flex flex-col items-center">
                <WinnerProfile username="@primeacali" />
                <span className="text-sm text-slate-300 mt-3 font-medium">@primeacali</span>
              </div>
              <div className="flex flex-col items-center">
                <WinnerProfile username="@zehray" />
                <span className="text-sm text-slate-300 mt-3 font-medium">@zehray</span>
              </div>
            </div>

            <p className="text-center text-sm text-slate-400 mt-2">
              🎉 Congratulations to our winners! 🎉
            </p>

            {/* Info notices */}
            <div className="mt-6 space-y-3 w-full">
              <div className="px-4 py-3 bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl rounded-xl border border-slate-700/50">
                <p className="text-xs text-slate-300 text-center">
                  You need at least <span className="text-[#FCFF52] font-bold">0.025 CELO</span> to play this game
                </p>
              </div>
              <div className="px-4 py-3 bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl rounded-xl border border-slate-700/50">
                <p className="text-xs text-slate-300 text-center">
                  You need to <span className="text-[#A78BFA] font-bold">play 3 games</span> before giveaway ends to join the giveaway
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Airdrop Tab Content */}
        {activeTab === 'airdrop' && (
          <div className="flex flex-col items-center w-full max-w-md">
            {/* Animated rocket */}
            <div className="relative mb-8 animate-bounce">
              <div className="absolute inset-0 bg-[#8B5CF6] blur-[40px] opacity-30 rounded-full"></div>
              <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-8 rounded-3xl border-2 border-slate-700/60 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                <RocketIcon />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#A78BFA] to-white mb-4 text-center">
              Airdrop
            </h2>

            {/* Coming Soon badge */}
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-[#8B5CF6] blur-xl opacity-40 rounded-full"></div>
              <div className="relative px-8 py-3 bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] rounded-full border-2 border-white/20 shadow-[0_4px_24px_rgba(139,92,246,0.5)]">
                <span className="text-xl font-bold text-white tracking-wider">
                  COMING SOON
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-400 text-center max-w-md text-sm leading-relaxed">
              Stay tuned for exciting rewards! Our airdrop program will reward loyal Tradcast players with exclusive tokens.
            </p>

            {/* Decorative dots */}
            <div className="flex gap-2 mt-8">
              <div className="w-2 h-2 rounded-full bg-[#A78BFA] animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-[#A78BFA] animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 rounded-full bg-[#A78BFA] animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
      </div>

      {/* Fixed scroll down indicator - bottom right corner */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col items-center animate-float">
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl p-3 rounded-full border border-slate-700/50 shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#A78BFA]">
            <path d="M12 5v14"/>
            <path d="m19 12-7 7-7-7"/>
          </svg>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce {
          animation: bounce 2s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-float {
          animation: float 2s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}