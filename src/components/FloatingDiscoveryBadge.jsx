'use client';

import React, { useState } from 'react';
import { Sparkles, X, Dices, Wand2, Star, ArrowRight, ShieldCheck, Flame } from 'lucide-react';
import { APPS_DATA } from '@/data/appsData';

export default function FloatingDiscoveryBadge({ onOpenQuiz, onOpenSurprise, onSelectApp }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  const hotApp = APPS_DATA.find(a => a.id === 'wink') || APPS_DATA[0];

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-900/90 dark:bg-white/90 text-white dark:text-slate-900 backdrop-blur-xl border border-slate-700 dark:border-slate-200 shadow-2xl hover:scale-105 transition-all duration-200 cursor-pointer"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
          </span>
          <span className="text-xs font-black tracking-tight">⚡ Hot App Pick Inside</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        </button>
      ) : (
        <div className="relative w-80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-4 animate-in slide-in-from-bottom-4 duration-200">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200 dark:border-slate-800">
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-amber-600 dark:text-amber-400">
              <Flame className="w-3.5 h-3.5 fill-amber-500" /> Hot Pick Discovery
            </span>
            <button
              onClick={() => setIsExpanded(false)}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="flex items-center gap-3">
            <img
              src={hotApp.icon}
              alt={hotApp.name}
              className="w-12 h-12 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 bg-white shrink-0"
            />
            <div className="min-w-0 flex-1">
              <h5 className="font-extrabold text-sm text-slate-900 dark:text-white truncate">{hotApp.name}</h5>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">{hotApp.tagline}</p>
              <div className="flex items-center gap-1 mt-1 text-amber-500 text-[11px] font-bold">
                <Star className="w-3 h-3 fill-amber-400" /> {hotApp.rating} ({hotApp.reviewCount?.toLocaleString()} reviews)
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-4 pt-2 flex items-center gap-2">
            <button
              onClick={() => {
                setIsExpanded(false);
                if (onSelectApp) onSelectApp(hotApp);
              }}
              className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition cursor-pointer"
            >
              Preview App
            </button>
            <button
              onClick={() => {
                setIsExpanded(false);
                if (onOpenQuiz) onOpenQuiz();
              }}
              className="p-2 bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 text-xs font-bold rounded-xl transition cursor-pointer"
              title="Take AI Quiz"
            >
              <Wand2 className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
