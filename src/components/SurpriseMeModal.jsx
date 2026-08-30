'use client';

import React, { useState, useEffect } from 'react';
import { 
  Dices, 
  X, 
  Sparkles, 
  Star, 
  Download, 
  ExternalLink, 
  ShieldCheck, 
  ArrowRight,
  Flame,
  Check
} from 'lucide-react';
import { APPS_DATA } from '@/data/appsData';

export default function SurpriseMeModal({ isOpen, onClose, onSelectApp }) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [randomApp, setRandomApp] = useState(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const pickRandomApp = () => {
    setIsSpinning(true);
    setTimeout(() => {
      // Pick top-rated or popular apps
      const topApps = APPS_DATA.filter(a => a.rating >= 4.5);
      const chosen = topApps[Math.floor(Math.random() * topApps.length)];
      setRandomApp(chosen);
      setIsSpinning(false);
    }, 400);
  };

  useEffect(() => {
    if (isOpen && !randomApp) {
      pickRandomApp();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-scale-in"
        style={{
          background: 'var(--bg-glass-card)',
          border: '1px solid rgba(245,158,11,0.30)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.4), 0 0 32px rgba(245,158,11,0.20)',
          backdropFilter: 'blur(24px)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* ── Top Gradient Header ── */}
        <div 
          className="px-6 py-4.5 text-white flex items-center justify-between"
          style={{
            background: 'linear-gradient(135deg, #f59e0b, #ea580c, #ec4899)',
            boxShadow: '0 4px 18px rgba(245,158,11,0.30)',
          }}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-xs">
              <Dices className={`w-6 h-6 text-white ${isSpinning ? 'animate-spin' : ''}`} />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight flex items-center gap-1.5">
                Surprise Me Discovery! 🎲
              </h3>
              <p className="text-xs text-amber-100 font-medium">Hand-picked hidden gem from our verified index</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ── Body ── */}
        <div className="p-6 text-center space-y-6">
          {randomApp ? (
            <div className="space-y-4">
              {/* App Icon */}
              <div 
                className="w-24 h-24 mx-auto rounded-3xl p-2.5 flex items-center justify-center shadow-lg"
                style={{
                  background: 'rgba(245,158,11,0.08)',
                  border: '1px solid rgba(245,158,11,0.25)',
                  boxShadow: '0 8px 24px rgba(245,158,11,0.15)',
                }}
              >
                <img
                  src={randomApp.icon}
                  alt={randomApp.name}
                  className="w-full h-full object-contain rounded-2xl"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://www.google.com/s2/favicons?domain=github.com&sz=128';
                  }}
                />
              </div>

              <div>
                <div className="flex items-center justify-center gap-2">
                  <h4 className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>
                    {randomApp.name}
                  </h4>
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                </div>
                <p className="text-xs font-bold mt-1" style={{ color: 'var(--accent-primary)' }}>
                  {randomApp.categoryName} • {randomApp.licenseType}
                </p>
                <p className="text-xs sm:text-sm mt-3 leading-relaxed px-4" style={{ color: 'var(--text-secondary)' }}>
                  {randomApp.description}
                </p>
              </div>

              {/* Stats badges */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <div 
                  className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold"
                  style={{
                    background: 'rgba(251,191,36,0.10)',
                    color: '#fbbf24',
                    border: '1px solid rgba(251,191,36,0.20)',
                  }}
                >
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{randomApp.rating} Rating</span>
                </div>
                <div 
                  className="px-3 py-1 rounded-full text-xs font-bold"
                  style={{
                    background: 'rgba(52,211,153,0.10)',
                    color: '#34d399',
                    border: '1px solid rgba(52,211,153,0.20)',
                  }}
                >
                  {randomApp.downloadsCount} Downloads
                </div>
              </div>
            </div>
          ) : (
            <div className="py-12 flex flex-col items-center justify-center gap-3">
              <Dices className="w-12 h-12 text-amber-400 animate-spin" />
              <p className="text-sm font-bold text-slate-400">Finding an awesome app for you...</p>
            </div>
          )}
        </div>

        {/* ── Footer CTAs ── */}
        <div 
          className="p-4 sm:p-5 flex items-center gap-3"
          style={{
            background: 'rgba(245,158,11,0.04)',
            borderTop: '1px solid rgba(245,158,11,0.15)',
          }}
        >
          <button
            onClick={pickRandomApp}
            disabled={isSpinning}
            className="flex-1 py-3 font-black text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer transition hover:scale-105 active:scale-95"
            style={{
              background: 'rgba(245,158,11,0.12)',
              color: '#fbbf24',
              border: '1px solid rgba(245,158,11,0.30)',
            }}
          >
            <Dices className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
            <span>Roll Again 🎲</span>
          </button>

          {randomApp && (
            <button
              onClick={() => {
                onClose();
                if (onSelectApp) onSelectApp(randomApp);
              }}
              className="flex-1 py-3 text-white font-black text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer transition hover:scale-105 active:scale-95 shimmer-btn"
              style={{
                boxShadow: '0 4px 18px rgba(90,95,242,0.40)',
              }}
            >
              <span>Explore Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
