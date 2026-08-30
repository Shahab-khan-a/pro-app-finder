'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Swords, 
  X, 
  Trophy, 
  Star, 
  Check, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles, 
  ArrowRightLeft, 
  ChevronDown,
  Download
} from 'lucide-react';
import { APPS_DATA } from '@/data/appsData';

export default function AppComparisonModal({ isOpen, onClose, onSelectApp }) {
  const [appIdA, setAppIdA] = useState('capcut');
  const [appIdB, setAppIdB] = useState('wink');

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const appA = useMemo(() => APPS_DATA.find(a => a.id === appIdA) || APPS_DATA[0], [appIdA]);
  const appB = useMemo(() => APPS_DATA.find(a => a.id === appIdB) || APPS_DATA[1], [appIdB]);

  // Determine winner based on rating & review count score
  const winner = useMemo(() => {
    const scoreA = appA.rating * 10 + (appA.reviewCount || 1000) / 10000;
    const scoreB = appB.rating * 10 + (appB.reviewCount || 1000) / 10000;
    return scoreA >= scoreB ? appA : appB;
  }, [appA, appB]);

  if (!isOpen) return null;

  const swapApps = () => {
    const temp = appIdA;
    setAppIdA(appIdB);
    setAppIdB(temp);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-scale-in"
        style={{
          background: 'var(--bg-glass-card)',
          border: '1px solid rgba(90,95,242,0.25)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.4), 0 0 32px rgba(90,95,242,0.20)',
          backdropFilter: 'blur(24px)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* ── Header ── */}
        <div 
          className="px-6 py-4.5 text-white flex items-center justify-between shrink-0 shimmer-btn"
          style={{
            boxShadow: '0 4px 18px rgba(90,95,242,0.30)',
          }}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-xs">
              <Swords className="w-6 h-6 text-amber-300 animate-bounce-soft" />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight flex items-center gap-2">
                Software Versus & Comparison Engine
              </h3>
              <p className="text-xs text-white/80 font-medium">Compare specifications, features, and performance side-by-side</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition cursor-pointer"
            aria-label="Close comparison"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ── App Selectors Bar ── */}
        <div 
          className="p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0"
          style={{
            background: 'rgba(90,95,242,0.04)',
            borderBottom: '1px solid rgba(90,95,242,0.12)',
          }}
        >
          {/* App A Selector */}
          <div className="w-full sm:w-1/2 flex items-center gap-3">
            <span className="text-xs font-black uppercase" style={{ color: 'var(--accent-primary)' }}>App A:</span>
            <select
              value={appIdA}
              onChange={(e) => setAppIdA(e.target.value)}
              className="flex-1 px-3.5 py-2 rounded-xl text-xs font-bold focus:outline-none cursor-pointer"
              style={{
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                border: '1px solid rgba(90,95,242,0.20)',
              }}
            >
              {APPS_DATA.map(a => (
                <option key={a.id} value={a.id} disabled={a.id === appIdB}>
                  {a.name} ({a.categoryName})
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <button
            onClick={swapApps}
            className="p-2 rounded-xl transition cursor-pointer hover:scale-110 active:scale-95"
            style={{
              background: 'rgba(90,95,242,0.10)',
              color: 'var(--accent-primary)',
              border: '1px solid rgba(90,95,242,0.20)',
            }}
            title="Swap sides"
          >
            <ArrowRightLeft className="w-4 h-4" />
          </button>

          {/* App B Selector */}
          <div className="w-full sm:w-1/2 flex items-center gap-3">
            <span className="text-xs font-black uppercase text-purple-400">App B:</span>
            <select
              value={appIdB}
              onChange={(e) => setAppIdB(e.target.value)}
              className="flex-1 px-3.5 py-2 rounded-xl text-xs font-bold focus:outline-none cursor-pointer"
              style={{
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                border: '1px solid rgba(168,85,247,0.20)',
              }}
            >
              {APPS_DATA.map(a => (
                <option key={a.id} value={a.id} disabled={a.id === appIdA}>
                  {a.name} ({a.categoryName})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ── Comparison Table / Grid Body ── */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            
            {/* ── App A Column ── */}
            <div 
              className="p-5 rounded-3xl space-y-4 flex flex-col justify-between"
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid rgba(90,95,242,0.18)',
              }}
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={appA.icon}
                    alt={appA.name}
                    className="w-14 h-14 rounded-2xl object-contain p-1 shrink-0"
                    style={{ background: 'rgba(90,95,242,0.06)', border: '1px solid rgba(90,95,242,0.12)' }}
                  />
                  <div className="min-w-0">
                    <h4 className="font-black text-base truncate" style={{ color: 'var(--text-primary)' }}>{appA.name}</h4>
                    <p className="text-xs" style={{ color: 'var(--accent-primary)' }}>{appA.categoryName}</p>
                    <div className="flex items-center gap-1 mt-1 text-amber-400 text-xs font-bold">
                      <Star className="w-3 h-3 fill-amber-400" /> {appA.rating}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-xs pt-3" style={{ borderTop: '1px solid rgba(90,95,242,0.10)' }}>
                  <div>
                    <span className="font-bold block" style={{ color: 'var(--text-muted)' }}>License:</span>
                    <span className="font-bold" style={{ color: 'var(--text-primary)' }}>{appA.licenseType}</span>
                  </div>
                  <div>
                    <span className="font-bold block" style={{ color: 'var(--text-muted)' }}>Platforms:</span>
                    <span className="capitalize" style={{ color: 'var(--text-primary)' }}>{appA.platforms.join(', ')}</span>
                  </div>
                  <div>
                    <span className="font-bold block" style={{ color: 'var(--text-muted)' }}>Downloads:</span>
                    <span style={{ color: 'var(--text-primary)' }}>{appA.downloadsCount}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  if (onSelectApp) onSelectApp(appA);
                }}
                className="w-full py-2.5 rounded-xl text-white font-black text-xs shimmer-btn cursor-pointer transition hover:scale-105"
              >
                View {appA.name}
              </button>
            </div>

            {/* ── App B Column ── */}
            <div 
              className="p-5 rounded-3xl space-y-4 flex flex-col justify-between"
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid rgba(168,85,247,0.18)',
              }}
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={appB.icon}
                    alt={appB.name}
                    className="w-14 h-14 rounded-2xl object-contain p-1 shrink-0"
                    style={{ background: 'rgba(168,85,247,0.06)', border: '1px solid rgba(168,85,247,0.12)' }}
                  />
                  <div className="min-w-0">
                    <h4 className="font-black text-base truncate" style={{ color: 'var(--text-primary)' }}>{appB.name}</h4>
                    <p className="text-xs text-purple-400">{appB.categoryName}</p>
                    <div className="flex items-center gap-1 mt-1 text-amber-400 text-xs font-bold">
                      <Star className="w-3 h-3 fill-amber-400" /> {appB.rating}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-xs pt-3" style={{ borderTop: '1px solid rgba(168,85,247,0.10)' }}>
                  <div>
                    <span className="font-bold block" style={{ color: 'var(--text-muted)' }}>License:</span>
                    <span className="font-bold" style={{ color: 'var(--text-primary)' }}>{appB.licenseType}</span>
                  </div>
                  <div>
                    <span className="font-bold block" style={{ color: 'var(--text-muted)' }}>Platforms:</span>
                    <span className="capitalize" style={{ color: 'var(--text-primary)' }}>{appB.platforms.join(', ')}</span>
                  </div>
                  <div>
                    <span className="font-bold block" style={{ color: 'var(--text-muted)' }}>Downloads:</span>
                    <span style={{ color: 'var(--text-primary)' }}>{appB.downloadsCount}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  if (onSelectApp) onSelectApp(appB);
                }}
                className="w-full py-2.5 rounded-xl text-white font-black text-xs cursor-pointer transition hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6, #c026d3)',
                }}
              >
                View {appB.name}
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
