'use client';

import React from 'react';
import { Sparkles, ShieldCheck, Zap, Download, Flame, Star, CheckCircle, Lock } from 'lucide-react';

const EVENTS = [
  { id: 1, icon: Zap,          color: '#fbbf24', text: '⚡ CapCut Pro & Wink downloaded 1,420+ times today' },
  { id: 2, icon: ShieldCheck,  color: '#34d399', text: '🛡️ 100% Virus & Malware Free — all official verified downloads' },
  { id: 3, icon: Flame,        color: '#f87171', text: '🔥 Remini AI & TikTok Live tools trending in top recommendations' },
  { id: 4, icon: Star,         color: '#fbbf24', text: '⭐ VS Code rated 4.9/5 by 250,000+ software engineers' },
  { id: 5, icon: CheckCircle,  color: '#818cf8', text: '✨ Bitwarden & Brave Browser — verified safe open-source software' },
  { id: 6, icon: Download,     color: '#22d3ee', text: '📦 10,000+ verified free software listings updated daily' },
  { id: 7, icon: Lock,         color: '#a78bfa', text: '🔒 All links go directly to official publisher websites only' },
  { id: 8, icon: Sparkles,     color: '#e879f9', text: '✨ New: AI Matcher — find your perfect app in 30 seconds' },
];

const DUPLICATED = [...EVENTS, ...EVENTS];

export default function LiveActivityTicker() {
  return (
    <div
      className="ticker-bar w-full overflow-hidden relative"
      style={{ padding: '9px 0' }}
    >
      {/* Top neon line */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(90,95,242,0.7) 20%, rgba(124,58,237,0.6) 40%, rgba(6,182,212,0.6) 60%, rgba(90,95,242,0.7) 80%, transparent 100%)',
        }}
      />

      <div className="max-w-[1400px] mx-auto flex items-center gap-4">

        {/* ── Live Badge ── */}
        <div
          className="flex items-center gap-2 shrink-0 pl-4 pr-3 py-1 rounded-full"
          style={{
            background: 'rgba(52, 211, 153, 0.10)',
            border: '1px solid rgba(52, 211, 153, 0.22)',
          }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span
            className="font-black uppercase tracking-widest text-[10px] hidden sm:block"
            style={{ color: '#34d399', letterSpacing: '0.12em' }}
          >
            Live
          </span>
        </div>

        {/* ── Separator ── */}
        <div
          className="w-px h-5 shrink-0 hidden sm:block"
          style={{ background: 'rgba(90,95,242,0.3)' }}
        />

        {/* ── Marquee ── */}
        <div className="flex-1 overflow-hidden min-w-0">
          <div className="animate-marquee whitespace-nowrap" style={{ width: 'max-content' }}>
            {DUPLICATED.map((ev, i) => {
              const Icon = ev.icon;
              return (
                <span
                  key={`${ev.id}-${i}`}
                  className="inline-flex items-center gap-2.5 text-[12px] font-semibold mr-16"
                  style={{ color: 'rgba(210, 220, 245, 0.80)' }}
                >
                  <span
                    className="flex items-center justify-center w-5 h-5 rounded-md shrink-0"
                    style={{ background: `${ev.color}18`, border: `1px solid ${ev.color}33` }}
                  >
                    <Icon className="w-3 h-3 shrink-0" style={{ color: ev.color }} />
                  </span>
                  <span>{ev.text}</span>
                  <span
                    className="text-[10px] font-black mx-4"
                    style={{ color: 'rgba(90,95,242,0.45)' }}
                  >
                    ✦
                  </span>
                </span>
              );
            })}
          </div>
        </div>

        {/* ── Right Stats ── */}
        <div
          className="hidden lg:flex items-center gap-4 shrink-0 pr-5 text-[11px] font-bold"
        >
          <span
            className="flex items-center gap-1.5 px-3 py-1 rounded-full"
            style={{
              background: 'rgba(129,140,248,0.10)',
              border: '1px solid rgba(129,140,248,0.20)',
              color: 'rgba(165,180,252,0.90)',
            }}
          >
            <Download className="w-3 h-3" style={{ color: '#818cf8' }} />
            100K+ Indexed
          </span>
          <span
            className="flex items-center gap-1.5 px-3 py-1 rounded-full"
            style={{
              background: 'rgba(52,211,153,0.10)',
              border: '1px solid rgba(52,211,153,0.20)',
              color: 'rgba(110,231,183,0.90)',
            }}
          >
            <ShieldCheck className="w-3 h-3" style={{ color: '#34d399' }} />
            Verified Safe
          </span>
        </div>
      </div>

      {/* Bottom subtle line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: 'rgba(90,95,242,0.14)',
        }}
      />
    </div>
  );
}
