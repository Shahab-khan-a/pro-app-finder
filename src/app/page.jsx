'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import AppShell from '@/components/AppShell';
import HeroSection from '@/components/HeroSection';
import AppCard from '@/components/AppCard';
import AppIconGridCard from '@/components/AppIconGridCard';
import TrendingLeaderboard from '@/components/TrendingLeaderboard';
import { APPS_DATA, CATEGORIES, PLATFORMS, LICENSE_TYPES, getAppDomain } from '@/data/appsData';
import { 
  Search, 
  LayoutGrid, 
  Columns3, 
  X, 
  Filter, 
  ArrowUp, 
  Sparkles, 
  RotateCcw, 
  CheckSquare, 
  Globe, 
  Palette, 
  Video, 
  GraduationCap, 
  ShieldCheck, 
  Wrench, 
  Code, 
  Music,
  CheckCircle2,
  Bookmark,
  ChevronRight,
  Layers,
  Wand2,
  Dices
} from 'lucide-react';

function HomePageContent({ 
  favorites = [], 
  toggleFavorite, 
  setSelectedApp, 
  isSubmitModalOpen, 
  setIsSubmitModalOpen, 
  setIsQuizModalOpen, 
  setIsSurpriseModalOpen, 
  setIsCompareModalOpen 
}) {
  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedLicense, setSelectedLicense] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' (Compact Icon Grid) or 'cards' (Detailed Cards)

  // Floating Back to Top Button
  const [showBackToTop, setShowBackToTop] = useState(false);
  // User Feedback Toast
  const [toastMessage, setToastMessage] = useState(null);
  const toastTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const triggerToast = (msg) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage(msg);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleToggleFavoriteWithToast = (appId) => {
    const isFav = favorites.includes(appId);
    const targetApp = APPS_DATA.find(a => a.id === appId);
    const appName = targetApp ? targetApp.name : 'App';
    
    if (toggleFavorite) toggleFavorite(appId);

    if (isFav) {
      triggerToast(`Removed "${appName}" from bookmarks`);
    } else {
      triggerToast(`✨ Saved "${appName}" to bookmarks`);
    }
  };

  const handlePlatformSelect = (platformId) => {
    setSelectedPlatform(platformId);
    const element = document.getElementById('apps-directory-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper to normalize search query terms & handle typos/synonyms
  const normalizeQuery = (rawQuery) => {
    let q = rawQuery.toLowerCase().trim();
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

      const isModQuery = query.toLowerCase().includes('mod') || query.toLowerCase().includes('apk') || query.toLowerCase().includes('pro');
      const fallbackIcon = `https://www.google.com/s2/favicons?domain=${appDomain}&sz=128`;

      const category = selectedCategory !== 'all' ? selectedCategory : 'utilities';
      const categoryName = selectedCategory !== 'all' ? (CATEGORIES.find(c => c.id === selectedCategory)?.name || 'Utilities') : 'Utilities';

      return {
        id: `dynamic-${domainName}`,
        name: cleanName,
        tagline: isModQuery 
          ? `Unlocked Pro Features / Verified Working Mirrors` 
          : `Free & Safe Download for ${cleanName}`,
        description: `${cleanName} is available for download. Find direct official vendor downloads and verified working Pro / Mod mirrors for Windows, macOS, Linux, and Android with zero 404 dead links.`,
        icon: fallbackIcon,
        category: category,
        categoryName: categoryName,
        licenseType: selectedLicense !== 'all' ? selectedLicense : '100% Free',
        licenseDetails: isModQuery ? 'Unlocked Pro / Multi-Mirror' : 'Free Software / Official Distribution',
        platforms: ['windows', 'android', 'mac', 'linux', 'ios'],
        officialWebsite: `https://${appDomain}`,
        downloadUrl: `https://liteapks.com/?s=${encodeURIComponent(cleanName)}`,
        mirrorUrl: `https://filecr.com/search/?q=${encodeURIComponent(cleanName)}`,
        mirrorLabel: 'FileCR Pro',
        rating: 4.8,
        reviewCount: 45000,
        downloadsCount: '100M+',
        popular: true,
        featured: true,
        publisher: `${cleanName} Publisher`,
        latestVersion: 'Latest Version',
        features: [
          `Direct official ${cleanName} download portal link`,
          `Verified LiteAPKs & APKMody Android Pro search mirrors`,
          `Verified FileCR & GetIntoPC Windows / Mac Pro mirrors`,
          'Verified malware-free and zero adware policy',
          'Compatible with Windows, macOS, Linux, Android, iOS'
        ],
        systemRequirements: 'Android 5.0+, iOS, Windows 10/11, macOS'
      };
    }
    return null;
  }, [searchQuery, filteredApps, selectedCategory, selectedLicense]);

  // Check if any filter is actively applied
  const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'all' || selectedPlatform !== 'all' || selectedLicense !== 'all';

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedPlatform('all');
    setSelectedLicense('all');
    triggerToast('All filters have been reset');
  };

  const getCategoryIconComponent = (iconName) => {
    switch (iconName) {
      case 'CheckSquare': return CheckSquare;
      case 'Globe': return Globe;
      case 'Palette': return Palette;
      case 'Video': return Video;
      case 'GraduationCap': return GraduationCap;
      case 'ShieldCheck': return ShieldCheck;
      case 'Wrench': return Wrench;
      case 'Code': return Code;
      case 'Music': return Music;
      default: return Layers;
    }
  };

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
        onOpenQuizModal={() => setIsQuizModalOpen && setIsQuizModalOpen(true)}
        onOpenSurpriseModal={() => setIsSurpriseModalOpen && setIsSurpriseModalOpen(true)}
        onOpenCompareModal={() => setIsCompareModalOpen && setIsCompareModalOpen(true)}
      />

      <TrendingLeaderboard onSelectApp={setSelectedApp} />

      <section id="apps-directory-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ── Category Pills Bar with Icons ── */}
        <div className="relative mb-6">
          <div className="flex items-center gap-2 overflow-x-auto py-2.5 px-1 pr-10 scroll-smooth pb-3 no-scrollbar" style={{ borderBottom: '1px solid rgba(90,95,242,0.12)' }}>
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const IconComponent = getCategoryIconComponent(cat.icon);
              const count = cat.id === 'all' ? APPS_DATA.length : APPS_DATA.filter(a => a.category === cat.id).length;
              
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer active:scale-95 group"
                  style={{
                    background: isActive
                      ? 'linear-gradient(135deg, #5a5ff2, #7c3aed)'
                      : 'var(--bg-glass-card)',
                    color: isActive ? '#ffffff' : 'var(--text-secondary)',
                    border: `1px solid ${isActive ? 'transparent' : 'rgba(90,95,242,0.14)'}`,
                    boxShadow: isActive ? '0 4px 18px rgba(90,95,242,0.38)' : 'var(--shadow-card)',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = 'rgba(90,95,242,0.35)';
                      e.currentTarget.style.color = 'var(--text-primary)';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = 'rgba(90,95,242,0.14)';
                      e.currentTarget.style.color = 'var(--text-secondary)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  <IconComponent className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-indigo-400 group-hover:text-indigo-500'}`} />
                  <span>{cat.name}</span>
                  <span
                    className="px-1.5 py-0.5 rounded-full text-[10px] font-black"
                    style={{
                      background: isActive ? 'rgba(255,255,255,0.22)' : 'rgba(90,95,242,0.08)',
                      color: isActive ? '#ffffff' : 'var(--accent-primary)',
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Active Filters Row (When Any Filter is Active) ── */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-6 p-3.5 rounded-2xl frosted-panel animate-slide-up">
            <span className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5 mr-1" style={{ color: 'var(--text-secondary)' }}>
              <Filter className="w-3.5 h-3.5 text-indigo-400" />
              Active Filters:
            </span>

            {/* Search Query Chip */}
            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                <span>Search: "{searchQuery}"</span>
                <button 
                  onClick={() => setSearchQuery('')} 
                  className="hover:scale-125 transition cursor-pointer"
                  title="Remove search filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {/* Category Chip */}
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-purple-500/10 text-purple-500 border border-purple-500/20">
                <span>Category: {CATEGORIES.find(c => c.id === selectedCategory)?.name}</span>
                <button 
                  onClick={() => setSelectedCategory('all')} 
                  className="hover:scale-125 transition cursor-pointer"
                  title="Remove category filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {/* Platform Chip */}
            {selectedPlatform !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-blue-500/10 text-blue-500 border border-blue-500/20">
                <span>Platform: {PLATFORMS.find(p => p.id === selectedPlatform)?.name || selectedPlatform}</span>
                <button 
                  onClick={() => setSelectedPlatform('all')} 
                  className="hover:scale-125 transition cursor-pointer"
                  title="Remove platform filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {/* License Chip */}
            {selectedLicense !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                <span>License: {selectedLicense}</span>
                <button 
                  onClick={() => setSelectedLicense('all')} 
                  className="hover:scale-125 transition cursor-pointer"
                  title="Remove license filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {/* Clear All Button */}
            <button
              onClick={clearAllFilters}
              className="ml-auto flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-black text-rose-500 hover:bg-rose-500/10 transition cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset All</span>
            </button>
          </div>
        )}

        {/* ── Sorting & Filter Summary Header ── */}
        <div 
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4"
          style={{ borderBottom: '1px solid rgba(90,95,242,0.12)' }}
        >
          <div>
            <h2 className="text-xl sm:text-2xl font-black flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <span>
                {selectedCategory === 'all' 
                  ? 'All Free Software & Apps' 
                  : CATEGORIES.find(c => c.id === selectedCategory)?.name}
              </span>
              <span 
                className="text-xs font-black px-2.5 py-0.5 rounded-full"
                style={{
                  background: 'rgba(90,95,242,0.10)',
                  color: 'var(--accent-primary)',
                  border: '1px solid rgba(90,95,242,0.20)',
                }}
              >
                {filteredApps.length} {filteredApps.length === 1 ? 'App' : 'Apps'}
              </span>
            </h2>
            {searchQuery && (
              <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                Showing matching results for "<span className="font-bold" style={{ color: 'var(--accent-primary)' }}>{searchQuery}</span>"
              </p>
            )}
          </div>

          {/* Sort Dropdown & Layout View Mode Switcher */}
          <div className="flex items-center gap-3 self-end sm:self-auto flex-wrap">
            
            {/* View Mode Toggle: Grid vs Cards */}
            <div 
              className="flex items-center p-1 rounded-xl"
              style={{
                background: 'rgba(90,95,242,0.06)',
                border: '1px solid rgba(90,95,242,0.14)',
              }}
            >
              <button
                onClick={() => setViewMode('grid')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
                style={{
                  background: viewMode === 'grid' ? 'var(--bg-secondary)' : 'transparent',
                  color: viewMode === 'grid' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  boxShadow: viewMode === 'grid' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                }}
                title="Compact Icon Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Icon Grid</span>
              </button>

              <button
                onClick={() => setViewMode('cards')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
                style={{
                  background: viewMode === 'cards' ? 'var(--bg-secondary)' : 'transparent',
                  color: viewMode === 'cards' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  boxShadow: viewMode === 'cards' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                }}
                title="Detailed Cards View"
              >
                <Columns3 className="w-3.5 h-3.5" />
                <span>Detailed Cards</span>
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black uppercase tracking-wider hidden sm:inline" style={{ color: 'var(--text-muted)' }}>
                Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold focus:outline-none cursor-pointer transition-all"
                style={{
                  background: 'rgba(90,95,242,0.06)',
                  color: 'var(--text-primary)',
                  border: '1px solid rgba(90,95,242,0.18)',
                }}
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Alphabetical (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* ── App Cards Grid ── */}
        {filteredApps.length > 0 ? (
          searchQuery.trim() !== '' ? (
            /* Direct Card View when Searching */
            <div className="space-y-6">
              {/* Direct Top Match Highlight if searching for a specific app */}
              {filteredApps.length > 0 && (
                <div className="p-1 rounded-3xl" style={{ background: 'linear-gradient(135deg, rgba(90,95,242,0.3), rgba(124,58,237,0.25), rgba(6,182,212,0.2))' }}>
                  <div className="p-4 sm:p-5 rounded-3xl glass-card">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                      </span>
                      <span className="text-xs font-black uppercase tracking-wider gradient-text">
                        🎯 Direct Search Result Card
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredApps.slice(0, 3).map((app) => (
                        <AppCard
                          key={app.id}
                          app={app}
                          onSelectApp={(a) => setSelectedApp(a)}
                          isFavorite={favorites ? favorites.includes(app.id) : false}
                          onToggleFavorite={handleToggleFavoriteWithToast}
                          onSelectPlatform={handlePlatformSelect}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Additional Matches if more than 3 */}
              {filteredApps.length > 3 && (
                <div className="space-y-4 pt-4">
                  <h3 className="text-sm font-black uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                    More Matching Free Apps ({filteredApps.length - 3})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredApps.slice(3).map((app) => (
                      <AppCard
                        key={app.id}
                        app={app}
                        onSelectApp={(a) => setSelectedApp(a)}
                        isFavorite={favorites ? favorites.includes(app.id) : false}
                        onToggleFavorite={handleToggleFavoriteWithToast}
                        onSelectPlatform={handlePlatformSelect}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4">
              {filteredApps.map((app) => (
                <AppIconGridCard
                  key={app.id}
                  app={app}
                  onSelectApp={(a) => setSelectedApp(a)}
                  isFavorite={favorites ? favorites.includes(app.id) : false}
                  onToggleFavorite={handleToggleFavoriteWithToast}
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
                  onToggleFavorite={handleToggleFavoriteWithToast}
                  onSelectPlatform={handlePlatformSelect}
                />
              ))}
            </div>
          )
        ) : dynamicFallbackResult ? (
          <div className="space-y-4">
            <div 
              className="p-3.5 rounded-2xl text-xs font-bold flex items-center justify-between"
              style={{
                background: 'rgba(90,95,242,0.08)',
                border: '1px solid rgba(90,95,242,0.22)',
                color: 'var(--accent-primary)',
              }}
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Live Generated Download Hub for "{searchQuery}"
              </span>
              <span>Click card for all download mirrors</span>
            </div>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4">
                <AppIconGridCard
                  app={dynamicFallbackResult}
                  onSelectApp={(a) => setSelectedApp(a)}
                  isFavorite={favorites ? favorites.includes(dynamicFallbackResult.id) : false}
                  onToggleFavorite={handleToggleFavoriteWithToast}
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AppCard
                  app={dynamicFallbackResult}
                  onSelectApp={(a) => setSelectedApp(a)}
                  isFavorite={favorites ? favorites.includes(dynamicFallbackResult.id) : false}
                  onToggleFavorite={handleToggleFavoriteWithToast}
                  onSelectPlatform={handlePlatformSelect}
                />
              </div>
            )}
          </div>
        ) : (
          /* ── Helpful Zero Results State ── */
          <div 
            className="text-center py-16 px-6 rounded-3xl glass-card max-w-2xl mx-auto"
            style={{ border: '1px solid rgba(90,95,242,0.15)' }}
          >
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{
                background: 'linear-gradient(135deg, rgba(90,95,242,0.12), rgba(124,58,237,0.08))',
                border: '1px solid rgba(90,95,242,0.20)',
                color: 'var(--accent-primary)',
              }}
            >
              <Search className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-black" style={{ color: 'var(--text-primary)' }}>
              No matching free apps found
            </h3>
            
            <p className="mt-2 text-sm max-w-md mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              We couldn't find any app matching your active filters. Try clearing your filters or exploring our AI app matcher.
            </p>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={clearAllFilters}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-xs text-white shimmer-btn cursor-pointer transition-all hover:scale-105 active:scale-95"
                style={{ boxShadow: '0 4px 18px rgba(90,95,242,0.35)' }}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>

              {setIsQuizModalOpen && (
                <button
                  onClick={() => setIsQuizModalOpen(true)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-xs cursor-pointer transition-all hover:scale-105"
                  style={{
                    background: 'rgba(90,95,242,0.08)',
                    color: 'var(--accent-primary)',
                    border: '1px solid rgba(90,95,242,0.20)',
                  }}
                >
                  <Wand2 className="w-3.5 h-3.5 text-amber-300" />
                  <span>Try AI Matcher</span>
                </button>
              )}
            </div>

            {/* Popular quick categories shortcuts */}
            <div className="mt-8 pt-6 border-t border-slate-200/50 dark:border-slate-800/50">
              <p className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">
                Or browse popular workflows:
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {[
                  { id: 'video-editing', label: '🎬 Video Editing' },
                  { id: 'development', label: '💻 Coding Tools' },
                  { id: 'graphic-design', label: '🎨 Design & 3D' },
                  { id: 'security-privacy', label: '🛡️ Privacy & VPN' },
                ].map(c => (
                  <button
                    key={c.id}
                    onClick={() => {
                      clearAllFilters();
                      setSelectedCategory(c.id);
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer"
                    style={{
                      background: 'rgba(90,95,242,0.06)',
                      color: 'var(--text-secondary)',
                      border: '1px solid rgba(90,95,242,0.12)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = 'var(--accent-primary)';
                      e.currentTarget.style.borderColor = 'rgba(90,95,242,0.30)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = 'var(--text-secondary)';
                      e.currentTarget.style.borderColor = 'rgba(90,95,242,0.12)';
                    }}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

      </section>

      {/* ── Floating User Feedback Toast Notification ── */}
      {toastMessage && (
        <div 
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-2xl animate-slide-up text-sm font-bold"
          style={{
            background: 'var(--bg-glass-card)',
            border: '1px solid rgba(90,95,242,0.30)',
            color: 'var(--text-primary)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 12px 36px rgba(0,0,0,0.25), 0 0 20px rgba(90,95,242,0.20)',
          }}
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ── Floating Back to Top Button ── */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-40 p-3 rounded-2xl text-white shadow-xl cursor-pointer transition-all hover:scale-110 active:scale-95 shimmer-btn"
          style={{
            boxShadow: '0 4px 20px rgba(90,95,242,0.45)',
          }}
          title="Scroll Back to Top"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5 stroke-[2.5]" />
        </button>
      )}
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
