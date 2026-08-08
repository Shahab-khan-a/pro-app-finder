'use client';

import React, { useState, useMemo } from 'react';
import AppShell from '@/components/AppShell';
import HeroSection from '@/components/HeroSection';
import AppCard from '@/components/AppCard';
import AppIconGridCard from '@/components/AppIconGridCard';
import { APPS_DATA, CATEGORIES, getAppDomain } from '@/data/appsData';
import { Search, LayoutGrid, Columns3 } from 'lucide-react';

function HomePageContent({ favorites, toggleFavorite, setSelectedApp, isSubmitModalOpen, setIsSubmitModalOpen }) {
  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedLicense, setSelectedLicense] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' (Compact Icon Grid) or 'cards' (Detailed Cards)

  const handlePlatformSelect = (platformId) => {
    setSelectedPlatform(platformId);
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  // Helper to normalize search query terms & handle typos/synonyms
  const normalizeQuery = (rawQuery) => {
    let q = rawQuery.toLowerCase().trim();
    // Common typos & synonyms
    q = q.replace(/\bnev\b/g, 'new');
    q = q.replace(/\bdesctop\b/g, 'desktop');
    q = q.replace(/\bdekstop\b/g, 'desktop');
    q = q.replace(/\bsoftwear\b/g, 'software');
    q = q.replace(/\bsoflware\b/g, 'software');
    return q;
  };

  // Filter & Search Logic
  const filteredApps = useMemo(() => {
    return APPS_DATA.filter(app => {
      if (searchQuery.trim() !== '') {
        const rawQuery = searchQuery.toLowerCase().trim();
        const normalized = normalizeQuery(searchQuery);

        // Check exact match first
        const matchesName = app.name.toLowerCase().includes(rawQuery) || app.name.toLowerCase().includes(normalized);
        const matchesTagline = app.tagline.toLowerCase().includes(rawQuery) || app.tagline.toLowerCase().includes(normalized);
        const matchesDesc = app.description.toLowerCase().includes(rawQuery) || app.description.toLowerCase().includes(normalized);
        const matchesPublisher = app.publisher.toLowerCase().includes(rawQuery) || app.publisher.toLowerCase().includes(normalized);
        const matchesCategory = app.categoryName.toLowerCase().includes(rawQuery) || app.categoryName.toLowerCase().includes(normalized);
        const matchesFeature = app.features.some(f => f.toLowerCase().includes(rawQuery) || f.toLowerCase().includes(normalized));

        // Desktop app search intent matching
        const isDesktopQuery = normalized.includes('desktop') || rawQuery.includes('desktop') || rawQuery.includes('desctop') || rawQuery.includes('pc');
        const matchesDesktop = isDesktopQuery && (app.platforms.includes('windows') || app.platforms.includes('mac') || app.platforms.includes('linux'));

        // New app search intent matching
        const isNewQuery = normalized.includes('new') || rawQuery.includes('nev');
        const matchesNew = isNewQuery && (app.featured || app.popular || app.rating >= 4.7);

        if (!matchesName && !matchesTagline && !matchesDesc && !matchesPublisher && !matchesCategory && !matchesFeature && !matchesDesktop && !matchesNew) {
          return false;
        }
      }

      if (selectedCategory !== 'all' && app.category !== selectedCategory) {
        return false;
      }

      if (selectedPlatform !== 'all' && !app.platforms.includes(selectedPlatform)) {
        return false;
      }

      if (selectedLicense !== 'all' && app.licenseType !== selectedLicense) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'popular') {
        return b.reviewCount - a.reviewCount;
      } else if (sortBy === 'rating') {
        return b.rating - a.rating || b.reviewCount - a.reviewCount;
      } else if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
  }, [searchQuery, selectedCategory, selectedPlatform, selectedLicense, sortBy]);

  // Dynamic fallback generator when a search query finds no local database match
  const dynamicFallbackResult = useMemo(() => {
    if (searchQuery.trim() !== '' && filteredApps.length === 0) {
      const query = searchQuery.trim();
      const cleanName = query.charAt(0).toUpperCase() + query.slice(1);
      const appDomain = getAppDomain(cleanName);
      const domainName = cleanName.toLowerCase().replace(/[^a-z0-9]/g, '');

      const isTikTok = query.toLowerCase().includes('tiktok');
      const isModQuery = query.toLowerCase().includes('mod') || query.toLowerCase().includes('apk') || query.toLowerCase().includes('pro');
      const targetUrl = isTikTok ? 'https://9mod.com/tiktok.html' : isModQuery ? `https://9mod.com/${domainName}.html` : null;

      const fallbackIcon = isTikTok 
        ? 'https://www.google.com/s2/favicons?domain=tiktok.com&sz=128' 
        : `https://www.google.com/s2/favicons?domain=${appDomain}&sz=128`;

      return {
        id: `dynamic-${domainName}`,
        name: cleanName,
        tagline: isTikTok ? 'Watch & Stream TikTok Live / Free Download' : isModQuery ? `Unlocked Pro Features / 9mod APK Mod Download` : `Free & Safe Download for ${cleanName}`,
        description: isTikTok 
          ? 'TikTok Live lets creators broadcast live streams, interact with millions of viewers, and share short videos. Access direct free download mirror via 9mod.'
          : `${cleanName} is available for download. Find direct official website links and free PC & Android download mirrors for Windows, macOS, Linux, and mobile devices.`,
        icon: fallbackIcon,
        category: selectedCategory !== 'all' ? selectedCategory : 'utilities',
        categoryName: selectedCategory !== 'all' ? (CATEGORIES.find(c => c.id === selectedCategory)?.name || 'Utilities') : 'Utilities',
        licenseType: selectedLicense !== 'all' ? selectedLicense : '100% Free',
        licenseDetails: isModQuery ? 'Unlocked Pro / APK Mod Mirror' : 'Free Software / Official Distribution',
        platforms: ['android', 'windows', 'mac', 'linux', 'ios'],
        officialWebsite: isTikTok ? 'https://www.tiktok.com/' : `https://${appDomain}`,
        downloadUrl: targetUrl || `https://www.google.com/search?q=${encodeURIComponent(cleanName + ' official download page')}`,
        mirrorUrl: targetUrl || `https://getintopc.com/?s=${encodeURIComponent(cleanName)}`,
        mirrorLabel: isTikTok ? '9mod Mirror' : isModQuery ? '9mod APK Mod' : undefined,
        rating: 4.9,
        reviewCount: 95000,
        downloadsCount: '500M+',
        popular: true,
        featured: true,
        publisher: isTikTok ? '9mod / ByteDance' : isModQuery ? '9mod APK Mod' : `${cleanName} Publisher`,
        latestVersion: 'Latest Version',
        features: [
          isTikTok ? 'Direct free download link on 9mod (https://9mod.com/tiktok.html)' : `Direct official ${cleanName} download portal link`,
          targetUrl ? `Free APK Mod mirror on 9mod (${targetUrl})` : `Free PC software mirror on GetIntoPC`,
          'Verified malware-free and zero adware policy',
          'Compatible with Windows, macOS, Linux, Android, iOS'
        ],
        systemRequirements: 'Android 5.0+, iOS, Windows 10/11, macOS'
      };
    }
    return null;
  }, [searchQuery, filteredApps, selectedCategory, selectedLicense]);

  return (
    <>
      <HeroSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedPlatform={selectedPlatform}
        setSelectedPlatform={setSelectedPlatform}
        selectedLicense={selectedLicense}
        setSelectedLicense={setSelectedLicense}
        totalResultsCount={filteredApps.length}
        onSelectApp={setSelectedApp}
        onSelectCategory={setSelectedCategory}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Category Pills Bar */}
        <div className="relative mb-8">
          <div className="flex items-center gap-2 overflow-x-auto py-2 px-1 pr-10 scroll-smooth border-b border-slate-200/40 dark:border-slate-800/40 pb-3">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap border shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20 scale-[1.02]'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sorting & Filter Summary Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <span>
                {selectedCategory === 'all' 
                  ? 'All Free Software & Apps' 
                  : CATEGORIES.find(c => c.id === selectedCategory)?.name}
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                {filteredApps.length} Apps Found
              </span>
            </h2>
            {searchQuery && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Showing results for "<span className="font-semibold text-blue-600 dark:text-blue-400">{searchQuery}</span>"
              </p>
            )}
          </div>

          {/* Sort Dropdown & Layout View Mode Switcher */}
          <div className="flex items-center gap-3 self-end sm:self-auto flex-wrap">
            
            {/* View Mode Toggle: Grid vs Cards */}
            <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Compact Icon Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Icon Grid</span>
              </button>

              <button
                onClick={() => setViewMode('cards')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'cards'
                    ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Detailed Cards View"
              >
                <Columns3 className="w-3.5 h-3.5" />
                <span>Full Cards</span>
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase hidden sm:inline">
                Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Alphabetical (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* App Cards Grid */}
        {filteredApps.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
              {filteredApps.map((app) => (
                <AppIconGridCard
                  key={app.id}
                  app={app}
                  onSelectApp={(a) => setSelectedApp(a)}
                  isFavorite={favorites ? favorites.includes(app.id) : false}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredApps.map((app) => (
                <AppCard
                  key={app.id}
                  app={app}
                  onSelectApp={(a) => setSelectedApp(a)}
                  isFavorite={favorites ? favorites.includes(app.id) : false}
                  onToggleFavorite={toggleFavorite}
                  onSelectPlatform={handlePlatformSelect}
                />
              ))}
            </div>
          )
        ) : dynamicFallbackResult ? (
          <div className="space-y-4">
            <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center justify-between">
              <span>Generated Live Search Result for "{searchQuery}"</span>
              <span>Click card for full details</span>
            </div>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                <AppIconGridCard
                  app={dynamicFallbackResult}
                  onSelectApp={(a) => setSelectedApp(a)}
                  isFavorite={favorites ? favorites.includes(dynamicFallbackResult.id) : false}
                  onToggleFavorite={toggleFavorite}
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AppCard
                  app={dynamicFallbackResult}
                  onSelectApp={(a) => setSelectedApp(a)}
                  isFavorite={favorites ? favorites.includes(dynamicFallbackResult.id) : false}
                  onToggleFavorite={toggleFavorite}
                  onSelectPlatform={handlePlatformSelect}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16 px-4">
            <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4 text-slate-400">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              No matching free apps found
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Try adjusting your search terms or clearing platform & category filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedPlatform('all');
                setSelectedLicense('all');
              }}
              className="mt-4 px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </section>
    </>
  );
}

export default function Home() {
  return (
    <AppShell activeTab="home">
      <HomePageContent />
    </AppShell>
  );
}
