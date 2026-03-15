import React, { useState, useEffect } from 'react';
import { Droplets } from 'lucide-react';
import SMSBlastPage from './SMSBlastPage.jsx';

// Splash Screen Component
function SplashScreen({ visible }) {
  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center pt-[110px] bg-gradient-to-b from-cyan-400 via-blue-600 to-blue-950 transition-opacity duration-700"
      style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? 'all' : 'none' }}
    >
      <div className="relative flex items-center justify-center mb-5">
        <div className="absolute w-28 h-28 rounded-full border-4 border-white/20 border-t-white/80 animate-spin" style={{ animationDuration: '1.4s' }} />
        <Droplets className="w-14 h-14 text-white drop-shadow-lg" strokeWidth={1.5} />
      </div>

      <h2 style={{ fontSize: '45px', fontFamily: "'Poppins', 'Rounded Sans', sans-serif", letterSpacing: '-0.5px' }} className="font-bold text-white drop-shadow mb-5">BWD</h2>

      <div className="flex gap-2 mt-[100px]">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-white/70 animate-bounce"
            style={{ animationDelay: `${i * 0.18}s`, animationDuration: '0.9s' }}
          />
        ))}
      </div>
    </div>
  );
}

// Main App Component
export default function ServiceDashboard() {
  const [showSplash, setShowSplash] = useState(true);
  const [splashVisible, setSplashVisible] = useState(true);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setSplashVisible(false), 2200);
    const removeTimer = setTimeout(() => setShowSplash(false), 2900);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (showSplash) {
    return <SplashScreen visible={splashVisible} />;
  }

  return (
    <div className="w-full h-screen overflow-hidden">
      <SMSBlastPage />
    </div>
  );
}
