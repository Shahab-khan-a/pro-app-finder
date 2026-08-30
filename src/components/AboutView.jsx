'use client';

import React from 'react';
import { ShieldCheck, Download, CheckCircle, Code, Lock, Heart, Terminal, Sparkles } from 'lucide-react';

export default function AboutView() {
  const pillars = [
    {
      icon: ShieldCheck,
      title: 'Direct Official Downloads',
      description: 'We never host software installers or add third-party wrappers. Every download button redirects you directly to the official developer or publisher website.',
      color: '#34d399',
      bg: 'rgba(52,211,153,0.10)',
      border: 'rgba(52,211,153,0.22)'
    },
    {
      icon: Code,
      title: 'Open Source Commitment',
      description: 'We prioritize fully open-source applications (GPL, MIT, Apache) where community auditability guarantees transparency and long-term user ownership.',
      color: '#818cf8',
      bg: 'rgba(90,95,242,0.10)',
      border: 'rgba(90,95,242,0.22)'
    },
    {
      icon: Lock,
      title: 'Zero Adware & Malware Policy',
      description: 'Say goodbye to bundled toolbars, browser hijackers, and bloatware. AppScout strictly filters out predatory software distributions.',
      color: '#a78bfa',
      bg: 'rgba(124,58,237,0.10)',
      border: 'rgba(124,58,237,0.22)'
    },
    {
      icon: Terminal,
      title: 'Multi-Platform Support',
      description: 'Whether you use Windows 11, macOS Apple Silicon, Ubuntu Linux, Android, or iOS, we specify verified system compatibility for every app.',
      color: '#fb923c',
      bg: 'rgba(234,88,12,0.10)',
      border: 'rgba(234,88,12,0.22)'
    }
  ];

  return (
    <div className="py-14 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* ── Hero Header ── */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black mb-5"
          style={{
            background: 'rgba(52,211,153,0.10)',
            border: '1px solid rgba(52,211,153,0.25)',
            color: '#34d399',
          }}
        >
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Safe & Transparent Free Software Discovery</span>
        </div>

        <h1 
          className="text-3xl sm:text-5xl font-black tracking-tight"
          style={{ color: 'var(--text-primary)' }}
        >
          Why We Built <span className="gradient-text">AppScout</span>
        </h1>

        <p className="mt-5 text-base sm:text-lg leading-relaxed font-normal" style={{ color: 'var(--text-secondary)' }}>
          Searching for free software on the web shouldn't mean navigating through deceptive download buttons, malware-infested mirrors, or hidden trial subscriptions. AppScout provides a clean, safe, index of official free & open-source desktop and mobile software.
        </p>
      </div>

      {/* ── Pillars Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
        {pillars.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div 
              key={idx}
              className="p-6 sm:p-8 rounded-3xl glass-card card-hover-glow flex items-start gap-5"
              style={{
                border: '1px solid rgba(90,95,242,0.14)',
              }}
            >
              <div 
                className="w-13 h-13 rounded-2xl flex items-center justify-center shrink-0 shadow-md"
                style={{
                  background: p.bg,
                  border: `1px solid ${p.border}`,
                  color: p.color,
                }}
              >
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black" style={{ color: 'var(--text-primary)' }}>
                  {p.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {p.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Community Callout ── */}
      <div 
        className="p-8 sm:p-12 rounded-3xl text-white shadow-2xl relative overflow-hidden text-center shimmer-btn"
        style={{
          boxShadow: '0 8px 32px rgba(90,95,242,0.40)',
        }}
      >
        <div className="relative z-10 max-w-2xl mx-auto">
          <Heart className="w-10 h-10 text-rose-300 mx-auto mb-4 animate-bounce-soft fill-rose-300" />
          <h2 className="text-2xl sm:text-3xl font-black">
            Made for Creators, Developers, & Daily Users
          </h2>
          <p className="mt-3 text-sm leading-relaxed opacity-90 font-medium">
            AppScout is built with ❤️ to empower digital freedom. Have an open-source tool or free app you love? Submit it to our verified index and help millions discover great software.
          </p>
        </div>
      </div>

    </div>
  );
}
