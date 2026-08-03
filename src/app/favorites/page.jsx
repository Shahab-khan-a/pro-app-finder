'use client';

import React from 'react';
import AppShell from '@/components/AppShell';
import FavoritesView from '@/components/FavoritesView';
import { useRouter } from 'next/navigation';

function FavoritesContent({ favorites, toggleFavorite, setSelectedApp }) {
  const router = useRouter();

  return (
    <FavoritesView
      favorites={favorites}
      onToggleFavorite={toggleFavorite}
      onSelectApp={setSelectedApp}
      onGoHome={() => router.push('/')}
    />
  );
}

export default function FavoritesPage() {
  return (
    <AppShell activeTab="favorites">
      <FavoritesContent />
    </AppShell>
  );
}
