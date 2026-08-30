'use client';

import React, { useState } from 'react';
import { TrendingUp, Star, Award, Code, Download, Flame } from 'lucide-react';
import { APPS_DATA } from '@/data/appsData';
import AppCard from '@/components/AppCard';

const TABS = [
  { id: 'popular', label: 'Most Downloaded', icon: TrendingUp, color: '#818cf8' },
  { id: 'rated', label: 'Highest Rated', icon: Star, color: '#fbbf24' },
  { id: 'opensource', label: 'Open Source', icon: Code, color: '#34d399' },
  { id: 'featured', label: "Editor's Picks", icon: Award, color: '#f472b6' },
];

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
  const [tab, setTab] = useState('popular');

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

  const activeTab = TABS.find(t => t.id === tab);

  return (
    <div className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black mb-5"
          style={{
            background: 'rgba(251,191,36,0.1)',
            border: '1px solid rgba(251,191,36,0.25)',
            color: '#fbbf24',
          }}
        >
          <Flame className="w-4 h-4" />
          <span>Curated Leaderboard</span>
        </div>
        <h2
          className="text-3xl sm:text-4xl font-black tracking-tight"
          style={{ color: 'var(--text-primary)' }}
        >
          Most Popular{' '}
          <span className="gradient-text">Free Applications</span>
        </h2>
        <p className="mt-4 text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>
          Top-rated community favorites, open-source giants, and essential daily software.
        </p>
      </div>

      {/* Segmented Tab Bar */}
      <div className="flex justify-center mb-10">
        <div
          className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl"
          style={{
            background: 'rgba(99,102,241,0.07)',
            border: '1px solid rgba(99,102,241,0.15)',
          }}
        >
          {TABS.map((t) => {
            const Icon = t.icon;
            const isActive = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer"
                style={{
                  background: isActive
                    ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
                    : 'transparent',
                  color: isActive ? 'white' : 'var(--text-secondary)',
                  boxShadow: isActive ? '0 4px 14px rgba(99,102,241,0.35)' : 'none',
                  transform: isActive ? 'scale(1.02)' : 'scale(1)',
                }}
                onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = 'rgba(99,102,241,0.1)'; e.currentTarget.style.color = 'var(--text-primary)'; } }}
                onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; } }}
              >
                <Icon
                  className="w-4 h-4"
                  style={{ color: isActive ? 'white' : t.color }}
                />
                <span className="hidden sm:inline">{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center gap-2 mb-6">
        <span
          className="text-xs font-black px-3 py-1 rounded-full"
          style={{
            background: 'rgba(99,102,241,0.1)',
            color: '#818cf8',
            border: '1px solid rgba(99,102,241,0.2)',
          }}
        >
          {filteredApps.length} Apps
        </span>
        <span className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
          Showing {activeTab?.label}
        </span>
      </div>

      {/* App Grid */}
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
