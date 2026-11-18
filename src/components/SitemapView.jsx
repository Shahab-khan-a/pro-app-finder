'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Map,
  Compass,
  Home,
  Grid,
  TrendingUp,
  Bookmark,
  ShieldCheck,
  FileCode,
  FileText,
  Radio,
  Search,
  ExternalLink,
  ArrowRight,
  Sparkles,
  Layers,
  Monitor,
  Apple,
  Terminal,
  Smartphone,
  Tablet,
  CheckSquare,
  Globe,
  Palette,
  Video,
  GraduationCap,
  Wrench,
  Code,
  Music,
  ChevronRight,
  Filter,
  CheckCircle2,
  Server
} from 'lucide-react';
import { CATEGORIES, APPS_DATA, PLATFORMS, LICENSE_TYPES } from '@/data/appsData';

export default function SitemapView({ setSelectedApp }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedLicense, setSelectedLicense] = useState('all');

  const getCategoryIcon = (iconName, className = 'w-5 h-5') => {
    switch (iconName) {
      case 'CheckSquare': return <CheckSquare className={className} />;
      case 'Globe': return <Globe className={className} />;
      case 'Palette': return <Palette className={className} />;
      case 'Video': return <Video className={className} />;
      case 'GraduationCap': return <GraduationCap className={className} />;
      case 'ShieldCheck': return <ShieldCheck className={className} />;
      case 'Wrench': return <Wrench className={className} />;
      case 'Code': return <Code className={className} />;
      case 'Music': return <Music className={className} />;
      default: return <Grid className={className} />;
    }
  };

  const getPlatformIcon = (platformId, className = 'w-3.5 h-3.5') => {
    switch (platformId) {
      case 'windows': return <Monitor className={className} />;
      case 'mac': return <Apple className={className} />;
      case 'linux': return <Terminal className={className} />;
      case 'android': return <Smartphone className={className} />;
      case 'ios': return <Tablet className={className} />;
      default: return null;
    }
  };

  // Core Static Pages
  const corePages = [
    {
      title: 'Home & Application Search',
      path: '/',
      description: 'Primary landing hub featuring instant search, live activity ticker, curated trending software, and quick platform filters.',
      changeFreq: 'Daily',
      priority: '1.0',
      icon: Home,
      badge: 'Main Hub',
      color: '#6366f1',
    },
    {
      title: 'Categories Directory',
      path: '/categories',
      description: 'Comprehensive taxonomy of all 9 software departments including Productivity, Design, Development, and Privacy tools.',
      changeFreq: 'Daily',
      priority: '0.9',
      icon: Grid,
      badge: 'Hub Index',
      color: '#8b5cf6',
    },
    {
      title: 'Popular & Trending Software',
      path: '/popular',
      description: 'Community-ranked leaderboard of the most downloaded, verified, and highest-rated free and open-source applications.',
      changeFreq: 'Daily',
      priority: '0.9',
      icon: TrendingUp,
      badge: 'Leaderboard',
      color: '#06b6d4',
    },
    {
      title: 'Saved Bookmarks & Favorites',
      path: '/favorites',
      description: 'Personal client-side software collection and download queue saved directly in your browser storage.',
      changeFreq: 'Weekly',
      priority: '0.6',
      icon: Bookmark,
      badge: 'User Workspace',
      color: '#f59e0b',
    },
    {
      title: 'Safety, Transparency & Zero-Malware',
      path: '/about',
      description: 'Our verification methodology, open-source commitment, malware-scanning protocols, and publisher direct-mirror guarantee.',
      changeFreq: 'Monthly',
      priority: '0.7',
      icon: ShieldCheck,
      badge: 'Security Policy',
      color: '#10b981',
    },
    {
      title: 'HTML Web Site Map',
      path: '/sitemap',
      description: 'Interactive visual directory of all public URLs, category hubs, applications, and metadata feeds.',
      changeFreq: 'Daily',
      priority: '0.85',
      icon: Map,
      badge: 'This Page',
      color: '#ec4899',
    },
  ];

  // Technical Feeds & Protocols
  const technicalEndpoints = [
    {
      title: 'XML Search Engine Sitemap',
      path: '/sitemap.xml',
      description: 'Standardized XML sitemap conforming to sitemaps.org protocol for Googlebot, Bingbot, Yandex, and other search engines.',
      icon: FileCode,
      type: 'XML Feed',
      isExternal: true,
      badge: 'Search Crawler Feed',
      color: '#3b82f6',
    },
    {
      title: 'Robots Exclusion Directives',
      path: '/robots.txt',
      description: 'Crawler directives detailing allowed indexing paths, API disallow directives, and canonical sitemap pointer.',
      icon: FileText,
      type: 'Plain Text',
      isExternal: true,
      badge: 'Robots Protocol',
      color: '#64748b',
    },
    {
      title: 'IndexNow Instant Push API',
      path: '/api/indexnow',
      description: 'Live push-indexing protocol endpoint that notifies Microsoft Bing and participating search engines on content updates.',
      icon: Radio,
      type: 'REST API',
      isExternal: false,
      badge: 'Push Protocol',
      color: '#14b8a6',
    },
    {
      title: 'Live Search Auto-Complete API',
      path: '/api/suggestions',
      description: 'High-speed JSON endpoint powering instant search recommendations and app auto-complete.',
      icon: Server,
      type: 'JSON API',
      isExternal: false,
      badge: 'Search Service',
      color: '#a855f7',
    },
  ];

  const categoryList = CATEGORIES.filter((c) => c.id !== 'all');

  // Filtered Apps
  const filteredApps = useMemo(() => {
    return APPS_DATA.filter((app) => {
      // Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = app.name.toLowerCase().includes(query);
        const matchesTag = app.tagline.toLowerCase().includes(query);
        const matchesDesc = app.description.toLowerCase().includes(query);
        const matchesCat = app.categoryName.toLowerCase().includes(query);
        const matchesPlatform = app.platforms?.some((p) => p.toLowerCase().includes(query));
        if (!matchesName && !matchesTag && !matchesDesc && !matchesCat && !matchesPlatform) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== 'all' && app.category !== selectedCategory) {
        return false;
      }

      // Platform filter
      if (selectedPlatform !== 'all' && !app.platforms?.includes(selectedPlatform)) {
        return false;
      }

      // License filter
      if (selectedLicense !== 'all' && app.licenseType !== selectedLicense) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedPlatform, selectedLicense]);

  // Group filtered apps by category
  const appsByCategory = useMemo(() => {
    const map = {};
    categoryList.forEach((cat) => {
      map[cat.id] = [];
    });

    filteredApps.forEach((app) => {
      if (map[app.category]) {
        map[app.category].push(app);
      } else {
        map[app.category] = [app];
      }
    });

    return map;
  }, [categoryList, filteredApps]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* ── Breadcrumb Navigation ── */}
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <li>
            <Link
              href="/"
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <ChevronRight className="w-3 h-3 text-slate-400" />
          </li>
          <li className="text-slate-900 dark:text-slate-100 font-bold flex items-center gap-1">
            <Map className="w-3.5 h-3.5 text-indigo-500" />
            <span>Site Map</span>
          </li>
        </ol>
      </nav>

      {/* ── Hero Header ── */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black mb-4"
          style={{
            background: 'rgba(99, 102, 241, 0.10)',
            border: '1px solid rgba(99, 102, 241, 0.25)',
            color: '#818cf8',
          }}
        >
          <Compass className="w-4 h-4 text-indigo-500" />
          <span>Interactive Directory &amp; Navigation Index</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
          AppScout Web <span className="gradient-text">Site Map</span>
        </h1>

        <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
          A complete, structured index of all pages, category hubs, verified applications, and technical feeds across the AppScout platform. Built for human navigation and automated search engine crawlers.
        </p>

        {/* ── Fast Jump Navigation Pills ── */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => scrollToSection('core-pages')}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
          >
            Core Pages ({corePages.length})
          </button>
          <button
            onClick={() => scrollToSection('category-hubs')}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
          >
            Category Hubs ({categoryList.length})
          </button>
          <button
            onClick={() => scrollToSection('apps-directory')}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:hover:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800"
          >
            All Applications ({APPS_DATA.length})
          </button>
          <button
            onClick={() => scrollToSection('technical-feeds')}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
          >
            Feeds &amp; Protocols ({technicalEndpoints.length})
          </button>
        </div>
      </div>

      {/* ── Stats Metric Bar ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
        {[
          { label: 'Core Web Routes', count: corePages.length, sub: 'Static Landing Pages', icon: Layers, color: '#6366f1' },
          { label: 'Category Hubs', count: categoryList.length, sub: 'Topic Taxonomies', icon: Grid, color: '#8b5cf6' },
          { label: 'Verified Apps', count: APPS_DATA.length, sub: 'Direct Official Links', icon: CheckCircle2, color: '#10b981' },
          { label: 'Technical Endpoints', count: technicalEndpoints.length, sub: 'Sitemap XML & APIs', icon: Server, color: '#06b6d4' },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="p-5 rounded-2xl border transition-all"
              style={{
                background: `${stat.color}08`,
                borderColor: `${stat.color}20`,
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className="w-5 h-5" style={{ color: stat.color }} />
                <span className="text-2xl font-black" style={{ color: stat.color }}>
                  {stat.count}
                </span>
              </div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">{stat.label}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{stat.sub}</p>
            </div>
          );
        })}
      </div>

      {/* ── SECTION 1: Core Landing Pages ── */}
      <section id="core-pages" className="mb-16 scroll-mt-24">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                Core Website Pages
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Primary navigation routes and major functional sections of AppScout
              </p>
            </div>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            {corePages.length} Pages
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {corePages.map((page) => {
            const Icon = page.icon;
            return (
              <Link
                key={page.path}
                href={page.path}
                className="group relative p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 hover:shadow-lg hover:border-indigo-400/50 dark:hover:border-indigo-500/50 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                      style={{ background: `linear-gradient(135deg, ${page.color}, #4f46e5)` }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        P: {page.priority}
                      </span>
                      <span
                        className="text-[10px] font-black px-2 py-0.5 rounded-md"
                        style={{ background: `${page.color}15`, color: page.color }}
                      >
                        {page.badge}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {page.title}
                  </h3>

                  <div className="font-mono text-xs text-indigo-500 dark:text-indigo-400 mt-1 mb-2">
                    {page.path}
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {page.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-indigo-500 transition-colors">
                  <span>Freq: {page.changeFreq}</span>
                  <div className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Visit Page</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── SECTION 2: Category Hubs ── */}
      <section id="category-hubs" className="mb-16 scroll-mt-24">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <Grid className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                Category Hub Pages
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Dedicated category directories grouping applications by workflow
              </p>
            </div>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            {categoryList.length} Categories
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categoryList.map((cat) => {
            const apps = APPS_DATA.filter((a) => a.category === cat.id);
            return (
              <div
                key={cat.id}
                className="group p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 hover:shadow-lg hover:border-purple-400/50 dark:hover:border-purple-500/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white shadow-sm`}
                    >
                      {getCategoryIcon(cat.icon)}
                    </div>
                    <span className="text-xs font-black px-2.5 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200/60 dark:border-purple-800/60">
                      {apps.length} Apps
                    </span>
                  </div>

                  <Link href={`/categories/${cat.id}`}>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {cat.name}
                    </h3>
                  </Link>

                  <p className="font-mono text-xs text-purple-500 dark:text-purple-400 mt-0.5 mb-3">
                    /categories/{cat.id}
                  </p>

                  {/* Top 3 App Previews */}
                  <div className="space-y-1.5 pt-1">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Sample Software:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {apps.slice(0, 4).map((app) => (
                        <Link
                          key={app.id}
                          href={`/app/${app.id}`}
                          className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium transition-colors"
                        >
                          {app.name}
                        </Link>
                      ))}
                      {apps.length > 4 && (
                        <span className="text-[11px] px-1.5 py-0.5 text-slate-400 font-medium">
                          +{apps.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                  <Link
                    href={`/categories/${cat.id}`}
                    className="flex items-center justify-between text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline"
                  >
                    <span>Explore {cat.name} Hub</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── SECTION 3: Complete Applications Directory ── */}
      <section id="apps-directory" className="mb-16 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                Complete Applications Directory
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Direct URL catalog for every verified desktop and mobile application
              </p>
            </div>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60 self-start sm:self-auto">
            Showing {filteredApps.length} of {APPS_DATA.length} Apps
          </span>
        </div>

        {/* ── Search & Filters Toolbar ── */}
        <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 mb-6 space-y-4">
          {/* Live Search Bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter sitemap by app name, keywords, platform or license (e.g. 'blender', 'editor', 'linux')..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            {/* Category Filter */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-bold text-slate-500 dark:text-slate-400">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 cursor-pointer focus:outline-none"
              >
                <option value="all">All Categories ({APPS_DATA.length})</option>
                {categoryList.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({APPS_DATA.filter((a) => a.category === c.id).length})
                  </option>
                ))}
              </select>
            </div>

            {/* Platform Filter */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-bold text-slate-500 dark:text-slate-400">Platform:</span>
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 cursor-pointer focus:outline-none"
              >
                <option value="all">All Platforms</option>
                {PLATFORMS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* License Filter */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-bold text-slate-500 dark:text-slate-400">License:</span>
              <select
                value={selectedLicense}
                onChange={(e) => setSelectedLicense(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 cursor-pointer focus:outline-none"
              >
                <option value="all">All Licenses</option>
                {LICENSE_TYPES.filter((l) => l.id !== 'all').map((l) => (
                  <option key={l.id} value={l.name}>
                    {l.name}
                  </option>
                ))}
              </select>
            </div>

            {(selectedCategory !== 'all' || selectedPlatform !== 'all' || selectedLicense !== 'all' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedPlatform('all');
                  setSelectedLicense('all');
                  setSearchQuery('');
                }}
                className="text-xs font-bold text-rose-500 hover:text-rose-600 underline ml-auto cursor-pointer"
              >
                Reset All Filters
              </button>
            )}
          </div>
        </div>

        {/* ── Apps Table / List Grouped by Category ── */}
        {filteredApps.length === 0 ? (
          <div className="p-12 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40">
            <Search className="w-8 h-8 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
              No matching applications found
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Try adjusting your search query or reset filters to see all indexable apps.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {categoryList.map((category) => {
              const apps = appsByCategory[category.id] || [];
              if (apps.length === 0) return null;

              return (
                <div
                  key={category.id}
                  className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 overflow-hidden"
                >
                  {/* Category Header */}
                  <div className="px-5 py-3.5 bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-7 h-7 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center text-white`}
                      >
                        {getCategoryIcon(category.icon, 'w-4 h-4')}
                      </div>
                      <Link
                        href={`/categories/${category.id}`}
                        className="font-black text-sm text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      >
                        {category.name}
                      </Link>
                    </div>
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                      {apps.length} {apps.length === 1 ? 'application' : 'applications'}
                    </span>
                  </div>

                  {/* App Links Grid */}
                  <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
                    {apps.map((app) => (
                      <div
                        key={app.id}
                        className="p-4 hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="flex items-start gap-3 min-w-0">
                          {/* Mini Favicon / Logo */}
                          <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shrink-0 flex items-center justify-center overflow-hidden">
                            {app.icon ? (
                              <img
                                src={app.icon}
                                alt={app.name}
                                className="w-6 h-6 object-contain"
                                loading="lazy"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                            ) : (
                              <Sparkles className="w-4 h-4 text-indigo-400" />
                            )}
                          </div>

                          {/* App Name, URL, Tagline */}
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <Link
                                href={`/app/${app.id}`}
                                className="font-bold text-sm text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                              >
                                {app.name}
                              </Link>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400">
                                /app/{app.id}
                              </span>
                              {app.featured && (
                                <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20">
                                  Featured
                                </span>
                              )}
                              {app.popular && (
                                <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">
                                  Popular
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5 max-w-xl">
                              {app.tagline}
                            </p>
                          </div>
                        </div>

                        {/* Right: Badges & Links */}
                        <div className="flex items-center gap-2.5 sm:self-center shrink-0">
                          {/* License Badge */}
                          <span
                            className="text-[10px] font-bold px-2 py-0.5 rounded-md"
                            style={{
                              background:
                                app.licenseType === 'Open Source'
                                  ? 'rgba(52, 211, 153, 0.12)'
                                  : 'rgba(99, 102, 241, 0.12)',
                              color: app.licenseType === 'Open Source' ? '#10b981' : '#6366f1',
                            }}
                          >
                            {app.licenseType}
                          </span>

                          {/* Platform Icons */}
                          <div className="flex items-center gap-1 text-slate-400">
                            {app.platforms?.map((plat) => (
                              <span key={plat} title={plat}>
                                {getPlatformIcon(plat)}
                              </span>
                            ))}
                          </div>

                          {/* Direct Official Site Link */}
                          {app.officialWebsite && (
                            <a
                              href={app.officialWebsite}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                              title="Official Website"
                              aria-label={`Official website for ${app.name}`}
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}

                          {/* Detail Button */}
                          <Link
                            href={`/app/${app.id}`}
                            className="px-2.5 py-1 text-xs font-bold rounded-lg bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:hover:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 transition-colors flex items-center gap-1"
                          >
                            <span>Details</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ── SECTION 4: Technical Feeds & Protocols ── */}
      <section id="technical-feeds" className="mb-16 scroll-mt-24">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                Technical Feeds, Sitemaps &amp; API Endpoints
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Machine-readable protocols for search engines, automated crawlers, and API consumers
              </p>
            </div>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            {technicalEndpoints.length} Endpoints
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {technicalEndpoints.map((ep) => {
            const Icon = ep.icon;
            return (
              <div
                key={ep.path}
                className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                      style={{ background: `linear-gradient(135deg, ${ep.color}, #0284c7)` }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {ep.type}
                      </span>
                      <span
                        className="text-[10px] font-black px-2 py-0.5 rounded-md"
                        style={{ background: `${ep.color}15`, color: ep.color }}
                      >
                        {ep.badge}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {ep.title}
                  </h3>

                  <div className="font-mono text-xs text-cyan-600 dark:text-cyan-400 mt-1 mb-2">
                    {ep.path}
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {ep.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-bold">
                  {ep.isExternal ? (
                    <a
                      href={ep.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      <span>Open Raw Endpoint</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <Link
                      href={ep.path}
                      className="text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      <span>Access Endpoint</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                  <span className="text-slate-400 text-[11px] font-normal">HTTP GET 200 OK</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── SECTION 5: SEO Architecture & Crawl Standards ── */}
      <section className="p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-gradient-to-br from-indigo-50/50 via-white/50 to-purple-50/50 dark:from-slate-900/60 dark:via-slate-900/40 dark:to-slate-950/60">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck className="w-5 h-5 text-indigo-500" />
            <h3 className="text-sm font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Indexing Standards &amp; Search Engine Architecture
            </h3>
          </div>
          <h4 className="text-xl font-black text-slate-900 dark:text-white mb-3">
            How AppScout structures indexing for Google, Bing &amp; Open Web
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-2">
            Every software profile in AppScout is indexed with canonical URLs, OpenGraph social meta tags, and structured JSON-LD schemas (SoftwareApplication, BreadcrumbList, WebPage). New releases and verified links are submitted dynamically via the IndexNow protocol to ensure instantaneous discovery across Microsoft Bing, Yandex, Naver, and Seznam.
          </p>
        </div>
      </section>
    </div>
  );
}
