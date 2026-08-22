'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AppDetailModal from '@/components/AppDetailModal';
import SubmitAppModal from '@/components/SubmitAppModal';
import AppQuizModal from '@/components/AppQuizModal';
import SurpriseMeModal from '@/components/SurpriseMeModal';
import AppComparisonModal from '@/components/AppComparisonModal';
import FloatingDiscoveryBadge from '@/components/FloatingDiscoveryBadge';

export default function AppShell({ children, activeTab = 'home' }) {
  const [currentTab, setCurrentTab] = useState(activeTab);
  const [mounted, setMounted] = useState(false);
  
  // Consistent default state for SSR / Hydration matching
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [favorites, setFavorites] = useState(['vscode', 'blender', 'vlc', 'bitwarden']);

  // Modal States
  const [selectedApp, setSelectedApp] = useState(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [isSurpriseModalOpen, setIsSurpriseModalOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Read localStorage post-hydration to avoid SSR mismatch
  useEffect(() => {
    setMounted(true);

    // Read Theme
    try {
      const savedTheme = localStorage.getItem('appfinder_theme');
      if (savedTheme) {
        setIsDarkMode(savedTheme === 'dark');
      } else {
        setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
      }
    } catch (e) {
      console.error(e);
    }

    // Read Favorites
    try {
      const savedFavs = localStorage.getItem('appfinder_favorites');
      if (savedFavs) {
        setFavorites(JSON.parse(savedFavs));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Sync Dark Mode to DOM
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    const body = document.body;
    if (isDarkMode) {
      root.classList.add('dark');
      body.classList.add('dark');
      localStorage.setItem('appfinder_theme', 'dark');
    } else {
      root.classList.remove('dark');
      body.classList.remove('dark');
      localStorage.setItem('appfinder_theme', 'light');
    }
  }, [isDarkMode, mounted]);

  // Sync Favorites
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('appfinder_favorites', JSON.stringify(favorites));
  }, [favorites, mounted]);

  const toggleFavorite = (appId) => {
    setFavorites(prev => 
      prev.includes(appId) ? prev.filter(id => id !== appId) : [...prev, appId]
    );
  };

  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        favorites,
        toggleFavorite,
        setSelectedApp,
        setIsSubmitModalOpen,
        setIsQuizModalOpen,
        setIsSurpriseModalOpen,
        setIsCompareModalOpen,
        isDarkMode,
        setIsDarkMode
      });
    }
    return child;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Navbar
        activeTab={currentTab}
        setActiveTab={setCurrentTab}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        favoritesCount={favorites.length}
        onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
        onOpenQuizModal={() => setIsQuizModalOpen(true)}
        onOpenSurpriseModal={() => setIsSurpriseModalOpen(true)}
      />

      <main className="flex-1">
        {childrenWithProps}
      </main>

      <Footer
        setActiveTab={setCurrentTab}
        onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
      />

      {selectedApp && (
        <AppDetailModal
          app={selectedApp}
          onClose={() => setSelectedApp(null)}
          isFavorite={favorites.includes(selectedApp.id)}
          onToggleFavorite={toggleFavorite}
          onSelectAlternative={(altApp) => setSelectedApp(altApp)}
        />
      )}

      <SubmitAppModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
      />

      <AppQuizModal
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
        onSelectApp={(app) => setSelectedApp(app)}
      />

      <SurpriseMeModal
        isOpen={isSurpriseModalOpen}
        onClose={() => setIsSurpriseModalOpen(false)}
        onSelectApp={(app) => setSelectedApp(app)}
      />

      <AppComparisonModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        onSelectApp={(app) => setSelectedApp(app)}
      />

      <FloatingDiscoveryBadge
        onOpenQuiz={() => setIsQuizModalOpen(true)}
        onOpenSurprise={() => setIsSurpriseModalOpen(true)}
        onSelectApp={(app) => setSelectedApp(app)}
      />
    </div>
  );
}
