'use client';

import React, { useState, useMemo } from 'react';
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
  ChevronDown
} from 'lucide-react';
import { APPS_DATA } from '@/data/appsData';

export default function AppComparisonModal({ isOpen, onClose, onSelectApp }) {
  const [appIdA, setAppIdA] = useState('capcut');
  const [appIdB, setAppIdB] = useState('wink');

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-xs">
              <Swords className="w-6 h-6 text-amber-300 animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight flex items-center gap-2">
                Software Versus & Comparison Engine
              </h3>
              <p className="text-xs text-indigo-100 font-medium">Compare specifications, features, and performance side-by-side</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top App Selectors Row */}
        <div className="p-6 bg-slate-50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-4">
            
            {/* App A Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Software A:</label>
              <div className="relative">
                <select
                  value={appIdA}
                  onChange={(e) => setAppIdA(e.target.value)}
                  className="w-full pl-3 pr-8 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-extrabold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer appearance-none"
                >
                  {APPS_DATA.map(app => (
                    <option key={`a-${app.id}`} value={app.id} disabled={app.id === appIdB}>
                      {app.name} ({app.categoryName})
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Swap Button */}
            <button
              onClick={swapApps}
              className="self-end md:self-center p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-sm cursor-pointer transition"
              title="Swap applications"
            >
              <ArrowRightLeft className="w-5 h-5 text-indigo-500" />
            </button>

            {/* App B Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Software B:</label>
              <div className="relative">
                <select
                  value={appIdB}
                  onChange={(e) => setAppIdB(e.target.value)}
                  className="w-full pl-3 pr-8 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-extrabold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer appearance-none"
                >
                  {APPS_DATA.map(app => (
                    <option key={`b-${app.id}`} value={app.id} disabled={app.id === appIdA}>
                      {app.name} ({app.categoryName})
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

          </div>
        </div>

        {/* Comparison Matrix Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Header Cards Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Card A */}
            <div className={`p-4 rounded-2xl border transition-all ${
              winner.id === appA.id 
                ? 'bg-blue-50/70 dark:bg-blue-950/30 border-blue-500 shadow-md ring-2 ring-blue-500/20' 
                : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'
            }`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img src={appA.icon} alt={appA.name} className="w-12 h-12 rounded-xl object-cover border bg-white" />
                  <div>
                    <h4 className="font-extrabold text-lg text-slate-900 dark:text-white">{appA.name}</h4>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{appA.categoryName}</span>
                  </div>
                </div>
                {winner.id === appA.id && (
                  <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-black flex items-center gap-1">
                    <Trophy className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> Winner
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 line-clamp-2">{appA.tagline}</p>
              <div className="mt-4 flex items-center gap-2">
                <button
                  onClick={() => { onClose(); if (onSelectApp) onSelectApp(appA); }}
                  className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition"
                >
                  View Details
                </button>
                <a
                  href={appA.officialWebsite || appA.downloadUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-xl"
                  title="Official Site"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Card B */}
            <div className={`p-4 rounded-2xl border transition-all ${
              winner.id === appB.id 
                ? 'bg-blue-50/70 dark:bg-blue-950/30 border-blue-500 shadow-md ring-2 ring-blue-500/20' 
                : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'
            }`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img src={appB.icon} alt={appB.name} className="w-12 h-12 rounded-xl object-cover border bg-white" />
                  <div>
                    <h4 className="font-extrabold text-lg text-slate-900 dark:text-white">{appB.name}</h4>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{appB.categoryName}</span>
                  </div>
                </div>
                {winner.id === appB.id && (
                  <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-black flex items-center gap-1">
                    <Trophy className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> Winner
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 line-clamp-2">{appB.tagline}</p>
              <div className="mt-4 flex items-center gap-2">
                <button
                  onClick={() => { onClose(); if (onSelectApp) onSelectApp(appB); }}
                  className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition"
                >
                  View Details
                </button>
                <a
                  href={appB.officialWebsite || appB.downloadUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-xl"
                  title="Official Site"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

          {/* Matrix Specs Comparison Table */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 font-extrabold text-slate-700 dark:text-slate-300">
                  <th className="p-3 w-1/3">Metric / Spec</th>
                  <th className="p-3 w-1/3 text-blue-600 dark:text-blue-400">{appA.name}</th>
                  <th className="p-3 w-1/3 text-indigo-600 dark:text-indigo-400">{appB.name}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-800 dark:text-slate-200 font-medium">
                <tr>
                  <td className="p-3 font-bold text-slate-500">Rating & Reviews</td>
                  <td className="p-3 font-bold flex items-center gap-1 text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400" /> {appA.rating} ({appA.reviewCount?.toLocaleString()})
                  </td>
                  <td className="p-3 font-bold flex items-center gap-1 text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400" /> {appB.rating} ({appB.reviewCount?.toLocaleString()})
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-500">License Type</td>
                  <td className="p-3 font-bold">{appA.licenseType}</td>
                  <td className="p-3 font-bold">{appB.licenseType}</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-500">Platforms Supported</td>
                  <td className="p-3">{appA.platforms.join(', ')}</td>
                  <td className="p-3">{appB.platforms.join(', ')}</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-500">System Requirements</td>
                  <td className="p-3">{appA.systemRequirements || 'Windows 10/11, macOS, Linux'}</td>
                  <td className="p-3">{appB.systemRequirements || 'Windows 10/11, macOS, Linux'}</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-500">Malware & Adware Safety</td>
                  <td className="p-3 text-emerald-600 font-extrabold flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" /> 100% Clean
                  </td>
                  <td className="p-3 text-emerald-600 font-extrabold flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" /> 100% Clean
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
          <div className="text-xs text-slate-500 font-medium hidden sm:block">
            🏆 Winner calculated based on community satisfaction and rating score.
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-extrabold text-xs rounded-xl cursor-pointer"
          >
            Close Comparison
          </button>
        </div>

      </div>
    </div>
  );
}
