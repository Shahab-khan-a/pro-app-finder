'use client';

import React from 'react';
import AppShell from '@/components/AppShell';
import PopularAppsView from '@/components/PopularAppsView';

function PopularContent({ favorites, toggleFavorite, setSelectedApp }) {
  return (
    <PopularAppsView
      favorites={favorites}
      onToggleFavorite={toggleFavorite}
      onSelectApp={setSelectedApp}
    />
  );
}

export default function PopularPage() {
  return (
    <AppShell activeTab="popular">
      <PopularContent />
    </AppShell>
  );
}
