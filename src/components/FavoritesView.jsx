'use client';

import React from 'react';
import { Bookmark, Sparkles, ArrowRight } from 'lucide-react';
import { APPS_DATA } from '@/data/appsData';
import AppCard from '@/components/AppCard';

export default function FavoritesView({ 
  favorites = [], 
  onSelectApp, 
  setSelectedApp,
  onToggleFavorite,
  toggleFavorite,
  onGoHome,
  onSelectPlatform
}) {
  const handleSelectApp = onSelectApp || setSelectedApp;
  const handleToggleFavorite = onToggleFavorite || toggleFavorite;
  const favoriteApps = APPS_DATA.filter(app => favorites && favorites.includes(app.id));

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[60vh]">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold mb-3 border border-amber-500/20">
          <Bookmark className="w-4 h-4 fill-amber-500 text-amber-500" />
          <span>Your Bookmarks</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          Saved Free Apps ({favoriteApps.length})
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
          Your bookmarked collection of software for fast access and re-downloading.
        </p>
      </div>

      {favoriteApps.length === 0 ? (
        <div className="text-center py-16 px-4 max-w-md mx-auto rounded-3xl glass-card border border-slate-200 dark:border-slate-800">
          <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mx-auto mb-4">
            <Bookmark className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            No saved apps yet
          </h3>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Click the bookmark star icon on any app card to save software to your personal collection.
          </p>
          <button
            onClick={onGoHome}
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
          >
            <span>Explore All Apps</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteApps.map((app) => (
            <AppCard
              key={app.id}
              app={app}
              onSelectApp={handleSelectApp}
              isFavorite={true}
              onToggleFavorite={handleToggleFavorite}
              onSelectPlatform={onSelectPlatform}
            />
          ))}
        </div>
      )}

    </div>
  );
}
