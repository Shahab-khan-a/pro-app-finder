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
  AppWindow
} from 'lucide-react';
import { APPS_DATA, CATEGORIES, PLATFORMS, LICENSE_TYPES, getAppDomain } from '@/data/appsData';

export default function HeroSection({
  searchQuery,
  setSearchQuery,
  selectedPlatform,
  setSelectedPlatform,
  selectedLicense,
  setSelectedLicense,
  totalResultsCount,
  onSelectApp,
  onSelectCategory
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [googleSuggestions, setGoogleSuggestions] = useState([]);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const searchContainerRef = useRef(null);

  const quickSearchTags = ['Wink Pro', 'TikTok Live', 'CapCut Pro', 'Remini AI', 'VS Code', 'Blender', 'VLC Player', 'Brave', 'Bitwarden'];

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch 10 live search suggestions from Google API
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
    }, 120);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Compute live search suggestions
  const suggestions = useMemo(() => {
    if (!searchQuery || searchQuery.trim() === '') {
      return {
        apps: [],
        categories: [],
        keywords: [
          { label: 'Desktop Applications', query: 'desktop' },
          { label: 'New Apps & Trending', query: 'new' },
          { label: 'Free Video Editors', query: 'video' },
          { label: 'Open Source Tools', query: 'open source' }
        ]
      };
    }

    const q = searchQuery.toLowerCase().trim();
    const normalized = q.replace(/\bnev\b/g, 'new').replace(/\bdesctop\b/g, 'desktop');

    // Matching apps
    const matchedApps = APPS_DATA.filter(app => {
      const name = app.name.toLowerCase();
      const tag = app.tagline.toLowerCase();
      const cat = app.categoryName.toLowerCase();
      const pub = app.publisher.toLowerCase();
      const isDesktopMatch = (normalized.includes('desktop') || q.includes('desctop')) && (app.platforms.includes('windows') || app.platforms.includes('mac') || app.platforms.includes('linux'));
      const isNewMatch = (normalized.includes('new') || q.includes('nev')) && (app.featured || app.popular);

      return name.includes(q) || tag.includes(q) || cat.includes(q) || pub.includes(q) || isDesktopMatch || isNewMatch;
    }).slice(0, 3);

    // Matching categories
    const matchedCategories = CATEGORIES.filter(c => c.id !== 'all' && c.name.toLowerCase().includes(q)).slice(0, 2);

    return {
      apps: matchedApps,
      categories: matchedCategories,
    };
  }, [searchQuery]);

  // Flattened items array for keyboard navigation (Google suggestions first, then apps)
  const allNavigableItems = useMemo(() => {
    const items = [];
    googleSuggestions.forEach(g => items.push({ type: 'google', data: g }));
    suggestions.apps.forEach(a => items.push({ type: 'app', data: a }));
    suggestions.categories.forEach(c => items.push({ type: 'category', data: c }));
    return items;
  }, [googleSuggestions, suggestions]);

  // Keyboard navigation listener
  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        setIsOpen(true);
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
        const item = allNavigableItems[selectedIndex];
        handleSelectItem(item);
      } else {
        setIsOpen(false);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleSelectItem = (item) => {
    if (item.type === 'google' || item.type === 'keyword') {
      setSearchQuery(item.data);
    } else if (item.type === 'app') {
      if (onSelectApp) {
        onSelectApp(item.data);
      } else {
        setSearchQuery(item.data.name);
      }
    } else if (item.type === 'category') {
      if (onSelectCategory) {
        onSelectCategory(item.data.id);
        setSearchQuery('');
      } else {
        setSearchQuery(item.data.name);
      }
    }
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  const getPlatformIcon = (platformId) => {
    switch (platformId) {
      case 'windows': return <Monitor className="w-4 h-4" />;
      case 'mac': return <Apple className="w-4 h-4" />;
      case 'linux': return <Terminal className="w-4 h-4" />;
      case 'android': return <Smartphone className="w-4 h-4" />;
      case 'ios': return <Tablet className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16 bg-gradient-to-b from-blue-50/50 via-slate-50/50 to-transparent dark:from-slate-900/50 dark:via-slate-950/50 dark:to-transparent border-b border-slate-200/60 dark:border-slate-800/60">
      
      {/* Decorative Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Verified Security Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-semibold mb-6 animate-pulse-glow">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>100% Free & Open Source • Verified Official Download Links Only</span>
        </div>

        {/* Hero Heading */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          Discover Best <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 dark:from-blue-400 dark:via-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">Free Software</span> & Desktop Apps
        </h1>
        
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal">
          Search thousands of open-source tools, free desktop applications, and productivity software with direct links to official download pages. Zero malware, zero adware.
        </p>

        {/* Main Search Bar & Suggestions Container */}
        <div ref={searchContainerRef} className="mt-8 max-w-2xl mx-auto relative z-30">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-2xl blur-md opacity-25 group-hover:opacity-40 transition duration-300" />
            
            <div className="relative flex items-center bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-2 sm:p-2.5">
              <Search className="w-6 h-6 text-slate-400 dark:text-slate-500 ml-3 shrink-0" />
              
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setIsOpen(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsOpen(true);
                  setSelectedIndex(-1);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search any app name (e.g. VS Code, Blender, VLC, Brave)..."
                className="w-full pl-3 pr-4 py-2 sm:py-2.5 text-base sm:text-lg bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
                autoFocus
              />

              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setIsOpen(false);
                  }}
                  className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 mr-1 cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-5 h-5" />
                </button>
              )}

              <button
                onClick={() => setIsOpen(false)}
                className="hidden sm:flex items-center gap-1.5 px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm rounded-xl shadow-md transition duration-200 shrink-0 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>
          </div>

          {/* Interactive Live Search Suggestions Dropdown */}
          {isOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50 text-left animate-in fade-in slide-in-from-top-2 duration-200">
              
              {/* Header section when typing query */}
              <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5 font-bold text-blue-600 dark:text-blue-400">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  {searchQuery ? `Google Live Suggestions for "${searchQuery}"` : 'Popular Quick Suggestions'}
                </span>
                <span className="text-[11px] text-slate-400">10 Live Suggestions</span>
              </div>

              <div className="max-h-[420px] overflow-y-auto p-2 space-y-1">
                
                {/* 1. Google Live Suggestions (10 items) */}
                {googleSuggestions.length > 0 && (
                  <div className="mb-2 space-y-0.5">
                    <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1">
                      <Search className="w-3 h-3 text-blue-500" /> 10 Suggestions from Google
                    </div>
                    {googleSuggestions.map((gItem, idx) => {
                      const itemIndex = idx;
                      const isSelected = selectedIndex === itemIndex;
                      return (
                        <div
                          key={`g-${idx}`}
                          onClick={() => handleSelectItem({ type: 'google', data: gItem })}
                          className={`flex items-center justify-between px-3.5 py-2 rounded-xl cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-blue-600 text-white font-bold shadow-md'
                              : 'text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800/80 font-medium'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 text-sm min-w-0">
                            <Search className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                            <span className="truncate">{gItem}</span>
                          </div>
                          <ArrowRight className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-white' : 'text-slate-300 dark:text-slate-600'}`} />
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* 2. Matching Apps Suggestions */}
                {suggestions.apps.length > 0 && (
                  <div className="mb-2 space-y-0.5">
                    <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1">
                      <AppWindow className="w-3 h-3 text-indigo-500" /> Matching Apps ({suggestions.apps.length})
                    </div>
                    {suggestions.apps.map((app, idx) => {
                      const itemIndex = googleSuggestions.length + idx;
                      const isSelected = selectedIndex === itemIndex;
                      const initials = app.name ? app.name.trim().substring(0, 2).toUpperCase() : 'AP';

                      return (
                        <div
                          key={app.id}
                          onClick={() => handleSelectItem({ type: 'app', data: app })}
                          className={`flex items-center justify-between px-3.5 py-2 rounded-xl cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-blue-600 text-white shadow-md'
                              : 'hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-900 dark:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs overflow-hidden">
                              <img 
                                src={app.icon || `https://www.google.com/s2/favicons?domain=${getAppDomain(app.name)}&sz=128`} 
                                alt={app.name} 
                                className="w-full h-full object-contain p-0.5"
                                onError={(e) => { 
                                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(app.name)}&background=2563eb&color=ffffff&bold=true&size=128`;
                                }}
                              />
                            </div>
                            <div className="min-w-0">
                              <h4 className={`text-xs sm:text-sm font-bold truncate ${isSelected ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                                {app.name}
                              </h4>
                              <p className={`text-[11px] truncate ${isSelected ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'}`}>
                                {app.categoryName} • {app.licenseType}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-blue-500/10 text-blue-600 dark:text-blue-400'}`}>
                              {app.platforms[0]}
                            </span>
                            <ArrowRight className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* 3. Category Suggestions */}
                {suggestions.categories.length > 0 && (
                  <div className="mb-2 space-y-0.5">
                    <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1">
                      <Folder className="w-3 h-3 text-emerald-500" /> Categories
                    </div>
                    {suggestions.categories.map((cat, idx) => {
                      const itemIndex = googleSuggestions.length + suggestions.apps.length + idx;
                      const isSelected = selectedIndex === itemIndex;
                      return (
                        <div
                          key={cat.id}
                          onClick={() => handleSelectItem({ type: 'category', data: cat })}
                          className={`flex items-center justify-between px-3.5 py-2 rounded-xl cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-blue-600 text-white font-bold'
                              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                          }`}
                        >
                          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
                            <div className="w-5 h-5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center text-[10px]">
                              {cat.name.charAt(0)}
                            </div>
                            <span>Browse in {cat.name}</span>
                          </div>
                          <span className={`text-[11px] font-bold ${isSelected ? 'text-white' : 'text-slate-400'}`}>View</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Fallback when loading or no suggestions */}
                {isLoadingGoogle && (
                  <div className="p-3 text-center text-xs text-slate-400 dark:text-slate-500 flex items-center justify-center gap-2">
                    <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    <span>Fetching 10 live suggestions from Google...</span>
                  </div>
                )}

              </div>
            </div>
          )}
        </div>

        {/* Quick Search Tag Pills */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Trending:
          </span>
          {quickSearchTags.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setSearchQuery(tag);
                setIsOpen(false);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-200/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white transition-all font-medium cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Filter Controls Row: Platform & License */}
        <div className="mt-8 pt-6 border-t border-slate-200/70 dark:border-slate-800/70 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Platform Filters */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Platform:
            </span>
            <button
              onClick={() => setSelectedPlatform('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedPlatform === 'all'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              All Platforms
            </button>

            {PLATFORMS.map((platform) => {
              const isSelected = selectedPlatform === platform.id;
              return (
                <button
                  key={platform.id}
                  onClick={() => setSelectedPlatform(platform.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  {getPlatformIcon(platform.id)}
                  <span>{platform.name}</span>
                </button>
              );
            })}
          </div>

          {/* License Type Filters */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mr-1">
              License:
            </span>
            <select
              value={selectedLicense}
              onChange={(e) => setSelectedLicense(e.target.value)}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 focus:outline-none cursor-pointer"
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
    </section>
  );
}
