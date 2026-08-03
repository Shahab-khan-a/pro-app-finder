'use client';

import React, { use } from 'react';
import AppShell from '@/components/AppShell';
import AppCard from '@/components/AppCard';
import AppDetailModal from '@/components/AppDetailModal';
import { APPS_DATA } from '@/data/appsData';
import { notFound, useRouter } from 'next/navigation';

function AppDetailPageContent({ params, favorites, toggleFavorite, setSelectedApp }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const app = APPS_DATA.find(a => a.id === resolvedParams.id);

  if (!app) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold">App Not Found</h2>
        <button 
          onClick={() => router.push('/')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white font-bold rounded-xl"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <AppDetailModal
        app={app}
        onClose={() => router.push('/')}
        isFavorite={favorites ? favorites.includes(app.id) : false}
        onToggleFavorite={toggleFavorite}
        onSelectAlternative={(altApp) => router.push(`/app/${altApp.id}`)}
      />
    </div>
  );
}

export default function AppDetailPage({ params }) {
  return (
    <AppShell activeTab="home">
      <AppDetailPageContent params={params} />
    </AppShell>
  );
}
