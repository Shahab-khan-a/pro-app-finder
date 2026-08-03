'use client';

import React, { useState } from 'react';
import { TrendingUp, Star, Award, Code, Download } from 'lucide-react';
import { APPS_DATA } from '@/data/appsData';
import AppCard from '@/components/AppCard';

export default function PopularAppsView({ 
  onSelectApp, 
  setSelectedApp,
  favorites = [], 
  onToggleFavorite,
  toggleFavorite,
  onSelectPlatform
}) {
  const handleSelectApp = onSelectApp || setSelectedApp;
  const handleToggleFavorite = onToggleFavorite || toggleFavorite;
  const [tab, setTab] = useState('popular'); // 'popular' | 'rated' | 'opensource' | 'featured'

  let filteredApps = [...APPS_DATA];

  if (tab === 'popular') {
    filteredApps.sort((a, b) => b.reviewCount - a.reviewCount);
  } else if (tab === 'rated') {
    filteredApps.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
  } else if (tab === 'opensource') {
    filteredApps = filteredApps.filter(a => a.licenseType === 'Open Source');
  } else if (tab === 'featured') {
    filteredApps = filteredApps.filter(a => a.featured);
  }

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Page Title Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold mb-3 border border-amber-500/20">
          <TrendingUp className="w-4 h-4 text-amber-500" />
          <span>Curated Leaderboard</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          Most Popular Free Applications
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
          Top-rated community favorites, open-source giants, and essential daily software.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        <button
          onClick={() => setTab('popular')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            tab === 'popular'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Most Downloaded</span>
        </button>

        <button
          onClick={() => setTab('rated')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            tab === 'rated'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
          }`}
        >
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span>Highest Rated</span>
        </button>

        <button
          onClick={() => setTab('opensource')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            tab === 'opensource'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
          }`}
        >
          <Code className="w-4 h-4" />
          <span>Open Source Giants</span>
        </button>

        <button
          onClick={() => setTab('featured')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            tab === 'featured'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
          }`}
        >
          <Award className="w-4 h-4 text-purple-400" />
          <span>Editor's Picks</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredApps.map((app) => (
          <AppCard
            key={app.id}
            app={app}
            onSelectApp={handleSelectApp}
            isFavorite={favorites ? favorites.includes(app.id) : false}
            onToggleFavorite={handleToggleFavorite}
            onSelectPlatform={onSelectPlatform}
          />
        ))}
      </div>

    </div>
  );
}
