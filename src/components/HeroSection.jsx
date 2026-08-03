'use client';

import React from 'react';
import { 
  Search, 
  X, 
  Sparkles, 
  Monitor, 
  Apple, 
  Terminal, 
  Smartphone, 
  Tablet, 
  CheckCircle2, 
  ShieldCheck, 
  Filter
} from 'lucide-react';
import { PLATFORMS, LICENSE_TYPES } from '@/data/appsData';

export default function HeroSection({
  searchQuery,
  setSearchQuery,
  selectedPlatform,
  setSelectedPlatform,
  selectedLicense,
  setSelectedLicense,
  totalResultsCount
}) {
  const quickSearchTags = ['Wink Pro', 'TikTok Live', 'CapCut Pro', 'Remini AI', 'VS Code', 'Blender', 'VLC Player', 'Brave', 'Bitwarden'];

  const getPlatformIcon = (platformId) => {
    switch (platformId) {
      case 'windows': return <Monitor className="w-4 h-4" />;
      case 'mac': return <Apple className="w-4 h-4" />;
      case 'linux': return <Terminal className="w-4 h-4" />;
      case 'android': return <Smartphone className="w-4 h-4" />;
      case 'ios': return <Tablet className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16 bg-gradient-to-b from-blue-50/50 via-slate-50/50 to-transparent dark:from-slate-900/50 dark:via-slate-950/50 dark:to-transparent border-b border-slate-200/60 dark:border-slate-800/60">
      
      {/* Decorative Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Verified Security Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-semibold mb-6 animate-pulse-glow">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>100% Free & Open Source • Verified Official Download Links Only</span>
        </div>

        {/* Hero Heading */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          Discover Best <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 dark:from-blue-400 dark:via-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">Free Software</span> & Desktop Apps
        </h1>
        
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal">
          Search thousands of open-source tools, free desktop applications, and productivity software with direct links to official download pages. Zero malware, zero adware.
        </p>

        {/* Main Search Bar */}
        <div className="mt-8 max-w-2xl mx-auto">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-2xl blur-md opacity-25 group-hover:opacity-40 transition duration-300" />
            
            <div className="relative flex items-center bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-2 sm:p-2.5">
              <Search className="w-6 h-6 text-slate-400 dark:text-slate-500 ml-3 shrink-0" />
              
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search any app name (e.g. VS Code, Blender, VLC, Brave)..."
                className="w-full pl-3 pr-4 py-2 sm:py-2.5 text-base sm:text-lg bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
                autoFocus
              />

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 mr-1"
                >
                  <X className="w-5 h-5" />
                </button>
              )}

              <button
                onClick={() => {}}
                className="hidden sm:flex items-center gap-1.5 px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm rounded-xl shadow-md transition duration-200 shrink-0"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Search Tag Pills */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Trending:
          </span>
          {quickSearchTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchQuery(tag)}
              className="px-2.5 py-1 rounded-lg bg-slate-200/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white transition-all font-medium"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Filter Controls Row: Platform & License */}
        <div className="mt-8 pt-6 border-t border-slate-200/70 dark:border-slate-800/70 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Platform Filters */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Platform:
            </span>
            <button
              onClick={() => setSelectedPlatform('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedPlatform === 'all'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              All Platforms
            </button>

            {PLATFORMS.map((platform) => {
              const isSelected = selectedPlatform === platform.id;
              return (
                <button
                  key={platform.id}
                  onClick={() => setSelectedPlatform(platform.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  {getPlatformIcon(platform.id)}
                  <span>{platform.name}</span>
                </button>
              );
            })}
          </div>

          {/* License Type Filters */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mr-1">
              License:
            </span>
            <select
              value={selectedLicense}
              onChange={(e) => setSelectedLicense(e.target.value)}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 focus:outline-none cursor-pointer"
            >
              {LICENSE_TYPES.map((license) => (
                <option key={license.id} value={license.id}>
                  {license.name}
                </option>
              ))}
            </select>
          </div>

        </div>

      </div>
    </section>
  );
}
