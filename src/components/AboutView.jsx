'use client';

import React from 'react';
import { ShieldCheck, Download, CheckCircle, Code, Lock, Heart, Terminal } from 'lucide-react';

export default function AboutView() {
  const pillars = [
    {
      icon: ShieldCheck,
      title: 'Direct Official Downloads',
      description: 'We never host software installers or add third-party wrappers. Every download button redirects you directly to the official developer or publisher website.',
      color: 'text-emerald-500 bg-emerald-500/10'
    },
    {
      icon: Code,
      title: 'Open Source Commitment',
      description: 'We prioritize fully open-source applications (GPL, MIT, Apache) where community auditability guarantees transparency and long-term user ownership.',
      color: 'text-blue-500 bg-blue-500/10'
    },
    {
      icon: Lock,
      title: 'Zero Adware & Malware Policy',
      description: 'Say goodbye to bundled toolbars, browser hijackers, and bloatware. AppFinder strictly filters out predatory software distributions.',
      color: 'text-indigo-500 bg-indigo-500/10'
    },
    {
      icon: Terminal,
      title: 'Multi-Platform Support',
      description: 'Whether you use Windows 11, macOS Apple Silicon, Ubuntu Linux, Android, or iOS, we specify verified system compatibility for every app.',
      color: 'text-purple-500 bg-purple-500/10'
    }
  ];

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold mb-4 border border-blue-500/20">
          <ShieldCheck className="w-4 h-4 text-blue-500" />
          <span>Safe & Transparent Free Software Discovery</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Why We Built <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">AppFinder</span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
          Searching for free software on the web shouldn't mean navigating through deceptive download buttons, malware-infested mirrors, or hidden trial subscriptions. AppFinder provides a clean, safe, index of official free & open-source desktop and mobile software.
        </p>
      </div>

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
        {pillars.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div 
              key={idx}
              className="p-6 sm:p-8 rounded-3xl glass-card border border-slate-200/80 dark:border-slate-800/80 flex items-start gap-4"
            >
              <div className={`w-12 h-12 rounded-2xl ${p.color} flex items-center justify-center shrink-0`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {p.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {p.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Community Callout */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 text-white shadow-xl relative overflow-hidden text-center">
        <div className="relative z-10 max-w-2xl mx-auto">
          <Heart className="w-10 h-10 text-pink-300 mx-auto mb-3 animate-pulse" />
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            Made for Creators, Developers, & Daily Users
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-blue-100 leading-relaxed font-normal">
            AppFinder is built with ❤️ to empower digital freedom. Have an open-source tool or free app you love? Submit it to our registry and help millions discover great software.
          </p>
        </div>
      </div>

    </div>
  );
}
