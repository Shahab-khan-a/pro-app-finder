'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Search,
  X,
  Sparkles,
  Monitor,
  Apple,
  Terminal,
  Smartphone,
  Tablet,
  ShieldCheck,
  Filter,
  ArrowRight,
  Folder,
  AppWindow,
  Dices,
  Wand2,
  Layers,
  Video,
  Code,
  Shield,
  Palette,
  Swords,
  Zap,
  Star,
  Download,
  TrendingUp
} from 'lucide-react';
import { APPS_DATA, CATEGORIES, PLATFORMS, LICENSE_TYPES, getAppDomain } from '@/data/appsData';
import LiveActivityTicker from '@/components/LiveActivityTicker';

export default function HeroSection({
  searchQuery,
  setSearchQuery,
  selectedPlatform,
  setSelectedPlatform,
  selectedLicense,
  setSelectedLicense,
  totalResultsCount,
  onSelectApp,
  onSelectCategory,
  onOpenQuizModal,
  onOpenSurpriseModal,
  onOpenCompareModal
}) {
  const [isOpen, setIsOpen]                   = useState(false);
  const [selectedIndex, setSelectedIndex]     = useState(-1);
  const [googleSuggestions, setGoogleSuggestions] = useState([]);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [searchFocused, setSearchFocused]     = useState(false);
  const searchContainerRef                    = useRef(null);

  const quickSearchTags = [
    { label: '🎬 CapCut Pro', query: 'CapCut Pro' },
    { label: '💻 VS Code',    query: 'VS Code' },
    { label: '🎨 Blender',   query: 'Blender' },
    { label: '📺 VLC Player',query: 'VLC Player' },
    { label: '📝 Notion',    query: 'Notion' },
    { label: '🛡️ Brave',    query: 'Brave Browser' },
    { label: '🖼️ GIMP',     query: 'GIMP' },
    { label: '📹 OBS Studio',query: 'OBS Studio' },
    { label: '🤖 Remini AI', query: 'Remini AI' },
  ];

  const stats = [
    { label: 'Free Apps',    value: '10K+',  icon: Download,  color: '#818cf8' },
    { label: 'Verified Safe',value: '100%',  icon: ShieldCheck,color: '#34d399' },
    { label: 'Top Rated',    value: '4.9★',  icon: Star,      color: '#fbbf24' },
    { label: 'Daily Updated',value: 'Daily', icon: TrendingUp, color: '#22d3ee' },
  ];

  // Keyboard shortcut listener for Ctrl+K / Cmd+K / / to search
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      // Don't trigger if user is typing in another input/textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
        if (e.key === 'Escape' && isOpen) {
          setIsOpen(false);
          setSearchFocused(false);
        }
        return;
      }
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        e.preventDefault();
        const searchInput = document.getElementById('hero-search-input');
        if (searchInput) {
          searchInput.focus();
          setIsOpen(true);
          setSearchFocused(true);
        }
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (!searchQuery || !searchQuery.trim()) {
      setGoogleSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setIsLoadingGoogle(true);
        const res = await fetch(`/api/suggestions?q=${encodeURIComponent(searchQuery.trim())}`);
        if (res.ok) {
          const data = await res.json();
          setGoogleSuggestions(Array.isArray(data) ? data.slice(0, 10) : []);
        }
      } catch (err) {
        console.error('Failed to fetch Google suggestions:', err);
      } finally {
        setIsLoadingGoogle(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const suggestions = useMemo(() => {
    if (!searchQuery || searchQuery.trim() === '') {
      return {
        apps: [],
        categories: [],
        keywords: [
          { label: 'Code & Development Tools',    query: 'code' },
          { label: 'Photo & Graphic Design',      query: 'design' },
          { label: 'Free Video Editors (Pro Mod)',query: 'video' },
          { label: 'Desktop Applications',        query: 'desktop' },
          { label: 'Open Source Tools',           query: 'open source' }
        ]
      };
    }

    const q          = searchQuery.toLowerCase().trim();
    const normalized = q.replace(/\bnev\b/g, 'new').replace(/\bdesctop\b/g, 'desktop');

    const matchedApps = APPS_DATA.filter(app => {
      const name  = app.name.toLowerCase();
      const tag   = app.tagline.toLowerCase();
      const cat   = app.categoryName.toLowerCase();
      const pub   = app.publisher.toLowerCase();
      const isDesktopMatch = (normalized.includes('desktop') || q.includes('desctop')) && (app.platforms.includes('windows') || app.platforms.includes('mac') || app.platforms.includes('linux'));
      const isNewMatch     = (normalized.includes('new') || q.includes('nev')) && (app.featured || app.popular);
      return name.includes(q) || tag.includes(q) || cat.includes(q) || pub.includes(q) || isDesktopMatch || isNewMatch;
    }).slice(0, 3);

    const matchedCategories = CATEGORIES.filter(c => c.id !== 'all' && c.name.toLowerCase().includes(q)).slice(0, 2);

    return { apps: matchedApps, categories: matchedCategories };
  }, [searchQuery]);

  const allNavigableItems = useMemo(() => {
    const items = [];
    googleSuggestions.forEach(g => items.push({ type: 'google', data: g }));
    suggestions.apps.forEach(a => items.push({ type: 'app', data: a }));
    suggestions.categories.forEach(c => items.push({ type: 'category', data: c }));
    return items;
  }, [googleSuggestions, suggestions]);

  const scrollToResults = () => {
    const el = document.getElementById('apps-directory-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') setIsOpen(true);
      if (e.key === 'Enter') {
        setIsOpen(false);
        scrollToResults();
      }
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < allNavigableItems.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : allNavigableItems.length - 1));
    } else if (e.key === 'Enter') {
      if (selectedIndex >= 0 && selectedIndex < allNavigableItems.length) {
        e.preventDefault();
        handleSelectItem(allNavigableItems[selectedIndex]);
      } else {
        setIsOpen(false);
        scrollToResults();
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleSelectItem = (item) => {
    if (item.type === 'google' || item.type === 'keyword') {
      setSearchQuery(item.data);
      scrollToResults();
    } else if (item.type === 'app') {
      setSearchQuery(item.data.name);
      scrollToResults();
      if (onSelectApp) onSelectApp(item.data);
    } else if (item.type === 'category') {
      if (onSelectCategory) { 
        onSelectCategory(item.data.id); 
        setSearchQuery(''); 
      } else {
        setSearchQuery(item.data.name);
      }
      scrollToResults();
    }
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  const getPlatformIcon = (platformId) => {
    switch (platformId) {
      case 'windows': return <Monitor className="w-4 h-4" />;
      case 'mac':     return <Apple className="w-4 h-4" />;
      case 'linux':   return <Terminal className="w-4 h-4" />;
      case 'android': return <Smartphone className="w-4 h-4" />;
      case 'ios':     return <Tablet className="w-4 h-4" />;
      default:        return null;
    }
  };

  return (
    <>
      <LiveActivityTicker />

      <section className="relative overflow-hidden hero-mesh" style={{ paddingTop: '72px', paddingBottom: '64px' }}>

        {/* ── Dot grid overlay ── */}
        <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />

        {/* ── Animated Blobs ── */}
        <div
          className="hero-blob-1"
          style={{ top: '-10%', left: '-8%' }}
        />
        <div
          className="hero-blob-2"
          style={{ top: '10%', right: '-5%' }}
        />
        <div
          className="hero-blob-3"
          style={{ bottom: '-15%', left: '35%' }}
        />

        {/* ── Radial vignette ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 0%, transparent 40%, var(--bg-primary) 100%)',
          }}
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

          {/* ── Trust Badge ── */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold mb-8 animate-pulse-glow"
            style={{
              background: 'rgba(16,185,129,0.08)',
              border: '1px solid rgba(52,211,153,0.28)',
              color: '#10b981',
            }}
          >
            <ShieldCheck className="w-4 h-4" style={{ color: '#34d399' }} />
            <span className="dark:text-emerald-400">100% Free & Open Source • Verified Official Download Links Only</span>
          </div>

          {/* ── Hero Heading ── */}
          <h1
            className="font-black tracking-tight leading-[1.04] text-balance"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)' }}
          >
            <span style={{ color: 'var(--text-primary)' }}>Discover the</span>
            <br />
            <span className="shimmer-text">Best Free Software</span>
            <br />
            <span
              style={{
                color: 'var(--text-primary)',
                fontSize: '0.65em',
                fontWeight: 800,
                opacity: 0.8,
              }}
            >
              &amp; Desktop Applications
            </span>
          </h1>

          {/* ── Subtitle ── */}
          <p
            className="mt-6 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            Search thousands of open-source tools, free desktop applications, and productivity software with direct links to official download pages.{' '}
            <span
              className="font-semibold"
              style={{ color: 'var(--accent-cyan)' }}
            >
              Zero malware. Zero adware.
            </span>
          </p>

          {/* ── Stat Pills ── */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold"
                  style={{
                    background: `${s.color}10`,
                    border: `1px solid ${s.color}28`,
                    color: s.color,
                  }}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="font-black">{s.value}</span>
                  <span style={{ opacity: 0.7 }}>{s.label}</span>
                </div>
              );
            })}
          </div>

          {/* ── CTA Buttons ── */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {onOpenQuizModal && (
              <button
                onClick={onOpenQuizModal}
                id="hero-ai-matcher-btn"
                className="flex items-center gap-2.5 px-7 py-3.5 rounded-2xl text-white font-black text-sm shimmer-btn cursor-pointer transition-all hover:scale-105 active:scale-95"
                style={{ boxShadow: '0 6px 30px rgba(90,95,242,0.50)' }}
              >
                <Wand2 className="w-4 h-4 text-amber-300 animate-bounce-soft" />
                <span>Find My Perfect App (AI Matcher)</span>
              </button>
            )}

            {onOpenSurpriseModal && (
              <button
                onClick={onOpenSurpriseModal}
                id="hero-surprise-btn"
                className="flex items-center gap-2.5 px-7 py-3.5 rounded-2xl font-black text-sm cursor-pointer transition-all hover:scale-105 active:scale-95"
                style={{
                  background: 'rgba(245,158,11,0.08)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(245,158,11,0.30)',
                  color: '#fbbf24',
                  boxShadow: '0 4px 20px rgba(245,158,11,0.14)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(245,158,11,0.14)';
                  e.currentTarget.style.boxShadow = '0 6px 26px rgba(245,158,11,0.24)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(245,158,11,0.08)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(245,158,11,0.14)';
                }}
              >
                <Dices className="w-4 h-4" />
                <span>Surprise Me! 🎲</span>
              </button>
            )}

            {onOpenCompareModal && (
              <button
                onClick={onOpenCompareModal}
                id="hero-compare-btn"
                className="flex items-center gap-2.5 px-7 py-3.5 rounded-2xl font-black text-sm cursor-pointer transition-all hover:scale-105 active:scale-95"
                style={{
                  background: 'rgba(90,95,242,0.07)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(90,95,242,0.28)',
                  color: 'var(--accent-primary)',
                  boxShadow: '0 4px 20px rgba(90,95,242,0.12)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(90,95,242,0.14)';
                  e.currentTarget.style.boxShadow = '0 6px 26px rgba(90,95,242,0.22)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(90,95,242,0.07)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(90,95,242,0.12)';
                }}
              >
                <Swords className="w-4 h-4" />
                <span>Compare Apps ⚔️</span>
              </button>
            )}
          </div>

          {/* ── Search Bar ── */}
          <div ref={searchContainerRef} className="mt-10 max-w-2xl mx-auto relative z-30">
            <div className="relative">
              {/* Outer glow ring */}
              <div
                className="absolute -inset-[3px] rounded-3xl transition-all duration-400 pointer-events-none"
                style={{
                  background: searchFocused
                    ? 'linear-gradient(135deg, rgba(90,95,242,0.6), rgba(124,58,237,0.5), rgba(6,182,212,0.5))'
                    : 'linear-gradient(135deg, rgba(90,95,242,0.25), rgba(124,58,237,0.20))',
                  filter: searchFocused ? 'blur(8px)' : 'blur(5px)',
                  opacity: searchFocused ? 1 : 0.7,
                }}
              />

              {/* Search Box */}
              <div
                className="relative flex items-center rounded-2xl p-2 sm:p-2.5"
                style={{
                  background: 'var(--bg-secondary)',
                  border: `1px solid ${searchFocused ? 'rgba(90,95,242,0.40)' : 'rgba(90,95,242,0.18)'}`,
                  transition: 'border-color 0.2s ease',
                }}
              >
                {/* Search Icon */}
                <div
                  className="ml-3 w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200"
                  style={{
                    background: searchFocused
                      ? 'linear-gradient(135deg, rgba(90,95,242,0.20), rgba(124,58,237,0.15))'
                      : 'rgba(90,95,242,0.07)',
                    border: `1px solid ${searchFocused ? 'rgba(90,95,242,0.30)' : 'rgba(90,95,242,0.12)'}`,
                  }}
                >
                  <Search
                    className="w-4 h-4 transition-colors"
                    style={{ color: searchFocused ? 'var(--accent-primary)' : 'var(--text-secondary)' }}
                  />
                </div>

                <input
                  type="text"
                  id="hero-search-input"
                  value={searchQuery}
                  onFocus={() => { setIsOpen(true); setSearchFocused(true); }}
                  onChange={(e) => { setSearchQuery(e.target.value); setIsOpen(true); setSelectedIndex(-1); }}
                  onKeyDown={handleKeyDown}
                  placeholder="Search any app — VS Code, Blender, VLC, Brave..."
                  className="w-full pl-3 pr-4 py-2 sm:py-2.5 text-base sm:text-lg bg-transparent focus:outline-none"
                  style={{ color: 'var(--text-primary)' }}
                  autoFocus
                />

                {!searchQuery && (
                  <div className="hidden sm:flex items-center gap-1 mr-2 px-2 py-1 rounded-lg text-[10px] font-black pointer-events-none select-none" style={{ background: 'rgba(90,95,242,0.08)', color: 'var(--text-muted)', border: '1px solid rgba(90,95,242,0.15)' }}>
                    <span>Ctrl</span>
                    <span>+</span>
                    <span>K</span>
                  </div>
                )}

                {searchQuery && (
                  <button
                    onClick={() => { setSearchQuery(''); setIsOpen(false); }}
                    className="p-1.5 rounded-lg mr-1 cursor-pointer transition-all hover:scale-110 active:scale-90"
                    style={{ color: 'var(--text-secondary)' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                    title="Clear search (Esc)"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}

                <button
                  onClick={() => {
                    setIsOpen(false);
                    scrollToResults();
                  }}
                  id="hero-search-btn"
                  className="hidden sm:flex items-center gap-2 px-5 py-3 rounded-xl text-white font-bold text-sm shrink-0 cursor-pointer transition-all hover:scale-105 active:scale-95 shimmer-btn"
                  style={{ boxShadow: '0 4px 16px rgba(90,95,242,0.42)' }}
                >
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </button>
              </div>
            </div>

            {/* ── Suggestions Dropdown ── */}
            {isOpen && (
              <div
                className="absolute top-full left-0 right-0 mt-3 rounded-2xl shadow-2xl overflow-hidden z-50 animate-slide-up text-left"
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid rgba(90,95,242,0.22)',
                  boxShadow: '0 24px 60px rgba(0,0,0,0.25), 0 0 0 1px rgba(90,95,242,0.12)',
                }}
              >
                {/* Dropdown Header */}
                <div
                  className="px-4 py-2.5 flex items-center justify-between text-xs font-bold border-b"
                  style={{
                    background: 'rgba(90,95,242,0.05)',
                    borderColor: 'rgba(90,95,242,0.12)',
                  }}
                >
                  <span className="flex items-center gap-1.5" style={{ color: 'var(--accent-primary)' }}>
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    {searchQuery ? `Suggestions for "${searchQuery}"` : 'Quick Suggestions'}
                  </span>
                  <span style={{ color: 'var(--text-muted)', fontWeight: 500, fontSize: '11px' }}>
                    Live Results
                  </span>
                </div>

                <div className="max-h-[400px] overflow-y-auto p-2 space-y-1">

                  {/* Google Suggestions */}
                  {googleSuggestions.length > 0 && (
                    <div className="mb-2 space-y-0.5">
                      <div
                        className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        <Search className="w-3 h-3" style={{ color: 'var(--accent-primary)' }} />
                        Live Suggestions from Google
                      </div>
                      {googleSuggestions.map((gItem, idx) => {
                        const isSelected = selectedIndex === idx;
                        return (
                          <div
                            key={`g-${idx}`}
                            onClick={() => handleSelectItem({ type: 'google', data: gItem })}
                            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition-all"
                            style={{
                              background: isSelected
                                ? 'linear-gradient(135deg, #5a5ff2, #7c3aed)'
                                : 'transparent',
                              color: isSelected ? 'white' : 'var(--text-primary)',
                            }}
                            onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = 'rgba(90,95,242,0.08)'; }}
                            onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = 'transparent'; }}
                          >
                            <div className="flex items-center gap-2.5 text-sm min-w-0">
                              <Search
                                className="w-3.5 h-3.5 shrink-0"
                                style={{ color: isSelected ? 'rgba(255,255,255,0.8)' : 'var(--text-secondary)' }}
                              />
                              <span className="truncate">{gItem}</span>
                            </div>
                            <ArrowRight
                              className="w-3.5 h-3.5 shrink-0"
                              style={{ color: isSelected ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)' }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* App Suggestions */}
                  {suggestions.apps.length > 0 && (
                    <div className="mb-2 space-y-0.5">
                      <div
                        className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        <AppWindow className="w-3 h-3" style={{ color: 'var(--accent-primary)' }} />
                        Matching Apps ({suggestions.apps.length})
                      </div>
                      {suggestions.apps.map((app, idx) => {
                        const itemIndex  = googleSuggestions.length + idx;
                        const isSelected = selectedIndex === itemIndex;
                        return (
                          <div
                            key={app.id}
                            onClick={() => handleSelectItem({ type: 'app', data: app })}
                            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition-all"
                            style={{
                              background: isSelected ? 'linear-gradient(135deg, #5a5ff2, #7c3aed)' : 'transparent',
                              color: isSelected ? 'white' : 'var(--text-primary)',
                            }}
                            onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = 'rgba(90,95,242,0.08)'; }}
                            onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = 'transparent'; }}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div
                                className="w-9 h-9 rounded-xl shrink-0 overflow-hidden flex items-center justify-center"
                                style={{
                                  background: 'linear-gradient(135deg, #5a5ff2, #7c3aed)',
                                  boxShadow: '0 2px 10px rgba(90,95,242,0.35)',
                                  padding: '2px',
                                }}
                              >
                                <img
                                  src={app.icon || `https://www.google.com/s2/favicons?domain=${getAppDomain(app.name)}&sz=128`}
                                  alt={app.name}
                                  className="w-full h-full object-contain rounded-lg"
                                  onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(app.name)}&background=5a5ff2&color=ffffff&bold=true&size=128`; }}
                                />
                              </div>
                              <div className="min-w-0">
                                <h4 className="text-sm font-bold truncate">{app.name}</h4>
                                <p className="text-[11px] truncate" style={{ color: isSelected ? 'rgba(255,255,255,0.7)' : 'var(--text-secondary)' }}>
                                  {app.categoryName} • {app.licenseType}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <span
                                className="text-[10px] font-black px-2 py-0.5 rounded-full"
                                style={{
                                  background: isSelected ? 'rgba(255,255,255,0.22)' : 'rgba(90,95,242,0.10)',
                                  color: isSelected ? 'white' : 'var(--accent-primary)',
                                }}
                              >
                                {app.platforms[0]}
                              </span>
                              <ArrowRight
                                className="w-3.5 h-3.5"
                                style={{ color: isSelected ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)' }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Category Suggestions */}
                  {suggestions.categories.length > 0 && (
                    <div className="mb-2 space-y-0.5">
                      <div
                        className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        <Folder className="w-3 h-3" style={{ color: '#34d399' }} />
                        Categories
                      </div>
                      {suggestions.categories.map((cat, idx) => {
                        const itemIndex  = googleSuggestions.length + suggestions.apps.length + idx;
                        const isSelected = selectedIndex === itemIndex;
                        return (
                          <div
                            key={cat.id}
                            onClick={() => handleSelectItem({ type: 'category', data: cat })}
                            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition-all"
                            style={{
                              background: isSelected ? 'linear-gradient(135deg, #5a5ff2, #7c3aed)' : 'transparent',
                              color: isSelected ? 'white' : 'var(--text-primary)',
                            }}
                            onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = 'rgba(90,95,242,0.08)'; }}
                            onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = 'transparent'; }}
                          >
                            <div className="flex items-center gap-2 text-sm font-semibold">
                              <div
                                className="w-7 h-7 rounded-xl flex items-center justify-center text-[12px] font-black"
                                style={{
                                  background: isSelected ? 'rgba(255,255,255,0.2)' : 'rgba(90,95,242,0.12)',
                                  color: isSelected ? 'white' : 'var(--accent-primary)',
                                }}
                              >
                                {cat.name.charAt(0)}
                              </div>
                              <span>Browse in {cat.name}</span>
                            </div>
                            <span
                              className="text-[11px] font-bold"
                              style={{ color: isSelected ? 'rgba(255,255,255,0.75)' : 'var(--accent-primary)' }}
                            >
                              View
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {isLoadingGoogle && (
                    <div className="p-5 text-center flex items-center justify-center gap-2.5" style={{ color: 'var(--text-secondary)' }}>
                      <div
                        className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin"
                        style={{ borderColor: 'var(--accent-primary)', borderTopColor: 'transparent' }}
                      />
                      <span className="text-xs">Fetching live suggestions from Google...</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ── Quick Tag Pills ── */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="flex items-center gap-1.5 font-semibold" style={{ color: 'var(--text-secondary)' }}>
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Trending:
            </span>
            {quickSearchTags.map((tag) => (
              <button
                key={tag.query}
                onClick={() => {
                  setSearchQuery(tag.query);
                  setIsOpen(false);
                  scrollToResults();
                }}
                className="px-3 py-1.5 rounded-xl font-semibold cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  background: 'rgba(90,95,242,0.07)',
                  color: 'var(--text-secondary)',
                  border: '1px solid rgba(90,95,242,0.14)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #5a5ff2, #7c3aed)';
                  e.currentTarget.style.color      = 'white';
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.boxShadow  = '0 4px 16px rgba(90,95,242,0.35)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background  = 'rgba(90,95,242,0.07)';
                  e.currentTarget.style.color        = 'var(--text-secondary)';
                  e.currentTarget.style.borderColor  = 'rgba(90,95,242,0.14)';
                  e.currentTarget.style.boxShadow    = 'none';
                }}
              >
                {tag.label}
              </button>
            ))}
          </div>

          {/* ── Filter Row ── */}
          <div
            className="mt-10 pt-6"
            style={{ borderTop: '1px solid rgba(90,95,242,0.10)' }}
          >
            <div
              className="frosted-panel rounded-2xl px-5 py-4 flex flex-col md:flex-row items-center justify-between gap-4"
            >
              {/* Platform Filters */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span
                  className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5 mr-1"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <Filter className="w-3.5 h-3.5" style={{ color: 'var(--accent-primary)' }} />
                  Platform:
                </span>

                <button
                  onClick={() => setSelectedPlatform('all')}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer"
                  style={{
                    background: selectedPlatform === 'all'
                      ? 'linear-gradient(135deg, #5a5ff2, #7c3aed)'
                      : 'rgba(90,95,242,0.07)',
                    color: selectedPlatform === 'all' ? 'white' : 'var(--text-secondary)',
                    border: `1px solid ${selectedPlatform === 'all' ? 'transparent' : 'rgba(90,95,242,0.14)'}`,
                    boxShadow: selectedPlatform === 'all' ? '0 4px 16px rgba(90,95,242,0.40)' : 'none',
                  }}
                >
                  All Platforms
                </button>

                {PLATFORMS.map((platform) => {
                  const isSelected = selectedPlatform === platform.id;
                  return (
                    <button
                      key={platform.id}
                      onClick={() => setSelectedPlatform(platform.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer"
                      style={{
                        background: isSelected
                          ? 'linear-gradient(135deg, #5a5ff2, #7c3aed)'
                          : 'rgba(90,95,242,0.07)',
                        color: isSelected ? 'white' : 'var(--text-secondary)',
                        border: `1px solid ${isSelected ? 'transparent' : 'rgba(90,95,242,0.14)'}`,
                        boxShadow: isSelected ? '0 4px 16px rgba(90,95,242,0.38)' : 'none',
                      }}
                    >
                      {getPlatformIcon(platform.id)}
                      <span>{platform.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* License Filter */}
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-black uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                  License:
                </span>
                <select
                  value={selectedLicense}
                  onChange={(e) => setSelectedLicense(e.target.value)}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold focus:outline-none cursor-pointer transition-all"
                  style={{
                    background: 'rgba(90,95,242,0.08)',
                    color: 'var(--text-primary)',
                    border: '1px solid rgba(90,95,242,0.20)',
                    minWidth: '130px',
                  }}
                >
                  {LICENSE_TYPES.map((license) => (
                    <option key={license.id} value={license.id}>
                      {license.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
