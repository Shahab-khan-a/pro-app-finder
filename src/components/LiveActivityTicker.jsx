'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, ShieldCheck, Zap, Download, Flame, Star, CheckCircle } from 'lucide-react';

const EVENTS = [
  { id: 1, icon: Zap, color: 'text-amber-500', text: '⚡ CapCut Pro & Wink downloaded 1,420+ times today' },
  { id: 2, icon: ShieldCheck, color: 'text-emerald-500', text: '🛡️ 100% Virus & Malware Free guarantee on all official downloads' },
  { id: 3, icon: Flame, color: 'text-rose-500', text: '🔥 Remini AI & TikTok Live tools trending in top recommendations' },
  { id: 4, icon: Star, color: 'text-yellow-500', text: '⭐ VS Code rated 4.9/5 by 250,000+ software engineers' },
  { id: 5, icon: CheckCircle, color: 'text-blue-500', text: '✨ Bitwarden & Brave Browser verified safe open-source software' },
];

export default function LiveActivityTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % EVENTS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const current = EVENTS[currentIndex];
  const Icon = current.icon;

  return (
    <div className="w-full bg-slate-900/90 dark:bg-slate-900/95 border-y border-slate-800 py-2 px-4 backdrop-blur-md overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-xs font-semibold">
        
        {/* Left Live Badge */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-emerald-400 font-extrabold uppercase tracking-wider text-[11px]">Live Activity</span>
        </div>

        {/* Ticker Rotating Text */}
        <div className="flex-1 overflow-hidden min-w-0 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 text-slate-200 dark:text-slate-300 font-medium animate-in fade-in slide-in-from-bottom-2 duration-300">
            <Icon className={`w-3.5 h-3.5 shrink-0 ${current.color}`} />
            <span className="truncate">{current.text}</span>
          </div>
        </div>

        {/* Right Stats Quick Pill */}
        <div className="hidden md:flex items-center gap-3 shrink-0 text-slate-400 text-[11px]">
          <span className="flex items-center gap-1 font-bold text-slate-300">
            <Download className="w-3 h-3 text-blue-400" /> 100K+ Software Indexed
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 font-bold text-slate-300">
            <ShieldCheck className="w-3 h-3 text-emerald-400" /> Verified Links
          </span>
        </div>

      </div>
    </div>
  );
}
