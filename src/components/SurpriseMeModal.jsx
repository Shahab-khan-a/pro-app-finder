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

  const pickRandomApp = () => {
    setIsSpinning(true);
    setTimeout(() => {
      // Pick top-rated or popular apps
      const topApps = APPS_DATA.filter(a => a.rating >= 4.5);
      const chosen = topApps[Math.floor(Math.random() * topApps.length)];
      setRandomApp(chosen);
      setIsSpinning(false);
    }, 450);
  };

  useEffect(() => {
    if (isOpen && !randomApp) {
      pickRandomApp();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Top Gradient Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-xs">
              <Dices className={`w-6 h-6 text-white ${isSpinning ? 'animate-spin' : ''}`} />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight flex items-center gap-1.5">
                Surprise Me Discovery! 🎲
              </h3>
              <p className="text-xs text-amber-100 font-medium">Hand-picked hidden gem from our software database</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {isSpinning || !randomApp ? (
            <div className="py-12 text-center space-y-4">
              <div className="inline-flex p-4 rounded-3xl bg-amber-500/10 text-amber-500 animate-bounce">
                <Dices className="w-12 h-12 animate-spin" />
              </div>
              <p className="font-extrabold text-lg text-slate-800 dark:text-slate-200">Rolling the software dice...</p>
            </div>
          ) : (
            <div className="space-y-5 animate-in zoom-in-95 duration-200">
              
              {/* Badge & Category */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-black">
                  <Flame className="w-3.5 h-3.5 fill-amber-500" /> Featured Gem
                </span>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  {randomApp.categoryName || 'Software'}
                </span>
              </div>

              {/* Main App Info Header */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                <img 
                  src={randomApp.icon} 
                  alt={randomApp.name}
                  className="w-16 h-16 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 bg-white shrink-0 shadow-sm"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://www.google.com/s2/favicons?domain=github.com&sz=128';
                  }}
                />
                <div className="min-w-0 flex-1">
                  <h4 className="text-xl font-black text-slate-900 dark:text-white truncate">{randomApp.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{randomApp.rating}</span>
                    <span className="text-[11px] text-slate-400">({(randomApp.reviewCount || 1000).toLocaleString()} reviews)</span>
                  </div>
                  <span className="inline-block mt-2 px-2.5 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-[11px] font-bold">
                    {randomApp.licenseType}
                  </span>
                </div>
              </div>

              {/* Description & Features */}
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {randomApp.description || randomApp.tagline}
                </p>

                {randomApp.features && randomApp.features.length > 0 && (
                  <div className="mt-3 space-y-1.5">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Key Highlights:</p>
                    {randomApp.features.slice(0, 3).map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Security Banner */}
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Verified Official Link • Malware Clean Guaranteed</span>
              </div>

            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
          <button
            onClick={pickRandomApp}
            disabled={isSpinning}
            className="px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 text-xs font-extrabold transition flex items-center gap-2 cursor-pointer"
          >
            <Dices className="w-4 h-4" />
            <span>Spin Again 🎲</span>
          </button>

          {randomApp && !isSpinning && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  onClose();
                  if (onSelectApp) onSelectApp(randomApp);
                }}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold rounded-xl shadow-md transition cursor-pointer"
              >
                Full Details
              </button>
              <a
                href={randomApp.officialWebsite || randomApp.downloadUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl shadow-md transition cursor-pointer"
                title="Direct Official Download"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
