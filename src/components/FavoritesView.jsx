'use client';

import React from 'react';
import { Bookmark, Sparkles, ArrowRight, Heart, Star } from 'lucide-react';
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
    <div className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[60vh]">

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black mb-5"
          style={{
            background: 'rgba(245,158,11,0.1)',
            border: '1px solid rgba(245,158,11,0.25)',
            color: '#fbbf24',
          }}
        >
          <Bookmark className="w-4 h-4 fill-amber-400" />
          <span>Your Bookmarks</span>
        </div>
        <h2
          className="text-3xl sm:text-4xl font-black tracking-tight"
          style={{ color: 'var(--text-primary)' }}
        >
          Saved Free Apps{' '}
          <span
            className="text-2xl sm:text-3xl px-3 py-1 rounded-2xl font-black"
            style={{ background: 'rgba(245,158,11,0.12)', color: '#fbbf24' }}
          >
            {favoriteApps.length}
          </span>
        </h2>
        <p className="mt-4 text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>
          Your bookmarked collection of software for fast access and re-downloading.
        </p>
      </div>

      {favoriteApps.length === 0 ? (
        /* ── Empty State ── */
        <div
          className="max-w-md mx-auto rounded-3xl glass-card p-12 text-center"
          style={{ border: '1px solid rgba(99,102,241,0.15)' }}
        >
          {/* Illustrated Icon */}
          <div className="relative mx-auto w-24 h-24 mb-6">
            <div
              className="w-24 h-24 rounded-3xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.08))',
                border: '1px solid rgba(99,102,241,0.2)',
              }}
            >
              <Bookmark
                className="w-10 h-10"
                style={{ color: '#818cf8' }}
              />
            </div>
            {/* Decorative stars */}
            <Star
              className="absolute -top-1 -right-1 w-5 h-5"
              style={{ color: '#fbbf24', fill: '#fbbf24' }}
            />
            <Sparkles
              className="absolute -bottom-1 -left-1 w-4 h-4"
              style={{ color: '#a78bfa' }}
            />
          </div>

          <h3 className="text-xl font-black" style={{ color: 'var(--text-primary)' }}>
            No saved apps yet
          </h3>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Click the{' '}
            <Bookmark className="inline w-4 h-4 mx-0.5 text-amber-400" />{' '}
            bookmark icon on any app card to save your favorite software here.
          </p>

          <button
            onClick={onGoHome}
            className="mt-8 inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl text-sm font-black text-white cursor-pointer transition-all hover:scale-105 active:scale-95 shimmer-btn"
            style={{ boxShadow: '0 6px 24px rgba(99,102,241,0.4)' }}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Explore All Apps</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Decorative bottom row */}
          <div className="mt-8 flex items-center justify-center gap-1.5 text-xs" style={{ color: 'var(--text-secondary)' }}>
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>Save apps you love for quick access</span>
          </div>
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
