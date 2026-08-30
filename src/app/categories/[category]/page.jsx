'use client';

import React, { use, useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AppShell from '@/components/AppShell';
import AppCard from '@/components/AppCard';
import { CATEGORIES, APPS_DATA, PLATFORMS } from '@/data/appsData';
import {
  LayoutGrid,
  CheckSquare,
  Globe,
  Palette,
  Video,
  GraduationCap,
  ShieldCheck,
  Wrench,
  Code,
  Music,
  ChevronRight,
  Sparkles,
  ArrowLeft,
  Filter,
  HelpCircle,
  CheckCircle2,
  Download
} from 'lucide-react';

function CategoryDetailPageContent({ params, favorites, toggleFavorite, setSelectedApp }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const category = CATEGORIES.find((c) => c.id === resolvedParams.category);

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'CheckSquare': return <CheckSquare className="w-8 h-8" />;
      case 'Globe': return <Globe className="w-8 h-8" />;
      case 'Palette': return <Palette className="w-8 h-8" />;
      case 'Video': return <Video className="w-8 h-8" />;
      case 'GraduationCap': return <GraduationCap className="w-8 h-8" />;
      case 'ShieldCheck': return <ShieldCheck className="w-8 h-8" />;
      case 'Wrench': return <Wrench className="w-8 h-8" />;
      case 'Code': return <Code className="w-8 h-8" />;
      case 'Music': return <Music className="w-8 h-8" />;
      default: return <LayoutGrid className="w-8 h-8" />;
    }
  };

  const categoryApps = useMemo(() => {
    if (!category) return [];
    return APPS_DATA.filter((app) => {
      const matchCat = app.category === category.id;
      if (!matchCat) return false;
      if (selectedPlatform !== 'all' && !app.platforms.includes(selectedPlatform)) {
        return false;
      }
      return true;
    });
  }, [category, selectedPlatform]);

  const otherCategories = useMemo(() => {
    if (!category) return [];
    return CATEGORIES.filter((c) => c.id !== 'all' && c.id !== category.id).slice(0, 4);
  }, [category]);

  if (!category) {
    return (
      <div className="py-20 text-center max-w-xl mx-auto px-4">
        <h1 className="text-3xl font-black mb-4">Category Not Found</h1>
        <p className="text-slate-500 mb-6">The category you are looking for does not exist or has moved.</p>
        <Link
          href="/categories"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 text-white font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse All Categories</span>
        </Link>
      </div>
    );
  }

  const categoryFaqs = [
    {
      q: `Are all ${category.name} software downloads on AppScout free?`,
      a: `Yes, every software application and tool listed under ${category.name} is verified free, freemium with rich zero-cost tiers, or completely open source under licenses like MIT, GPL, and Apache 2.0.`,
    },
    {
      q: `How does AppScout verify downloads for ${category.name}?`,
      a: `We route downloads exclusively through official publisher domains, authenticated GitHub/GitLab releases, and verified mirror repositories with multi-engine antivirus checks to ensure zero malware or adware.`,
    },
    {
      q: `Can I use these ${category.name} apps on both Windows and macOS?`,
      a: `Most tools listed support cross-platform usage across Windows, macOS, and Linux. You can use the platform filter chips above to filter by your operating system.`,
    },
  ];

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold mb-8 text-slate-500">
        <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/categories" className="hover:text-indigo-600 transition-colors">Categories</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-indigo-600 font-bold">{category.name}</span>
      </nav>

      {/* Category Hero Section */}
      <header className="relative rounded-3xl p-8 sm:p-12 mb-12 glass-card overflow-hidden" style={{ border: '1px solid rgba(99,102,241,0.2)' }}>
        <div className="absolute top-0 right-0 w-80 h-80 opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle at top right, rgba(99,102,241,0.4), transparent 70%)' }} />

        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 justify-between relative z-10">
          <div className="flex items-center gap-5">
            <div className={`w-18 h-18 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr ${category.color} flex items-center justify-center text-white shadow-xl`} style={{ boxShadow: '0 8px 30px rgba(99,102,241,0.35)' }}>
              {getCategoryIcon(category.icon)}
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black mb-2" style={{ background: 'rgba(99,102,241,0.1)', color: '#818cf8', border: '1px solid rgba(99,102,241,0.25)' }}>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Verified Category Index</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>
                Best Free <span className="gradient-text">{category.name}</span> Software
              </h1>
              <p className="mt-2 text-sm sm:text-base max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
                Download top verified free, open-source, and unlocked {category.name.toLowerCase()} software with direct official download mirrors and zero malware.
              </p>
            </div>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-4 bg-slate-900/10 dark:bg-slate-800/40 border border-indigo-500/20 px-5 py-3 rounded-2xl shrink-0">
            <div className="text-center">
              <span className="block text-2xl font-black text-indigo-500">{APPS_DATA.filter((a) => a.category === category.id).length}</span>
              <span className="text-[11px] font-bold text-slate-500 uppercase">Available Apps</span>
            </div>
            <div className="h-8 w-px bg-slate-500/20" />
            <div className="text-center">
              <span className="block text-2xl font-black text-emerald-500">100%</span>
              <span className="text-[11px] font-bold text-slate-500 uppercase">Verified Free</span>
            </div>
          </div>
        </div>

        {/* Platform Filter Tabs */}
        <div className="mt-8 pt-6 border-t border-slate-200/50 dark:border-slate-800/50 flex flex-wrap items-center gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-slate-400 mr-2 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5" /> Filter Platform:
          </span>
          {['all', 'windows', 'mac', 'linux', 'android', 'ios'].map((p) => {
            const isActive = selectedPlatform === p;
            const label = p === 'all' ? 'All Platforms' : p.charAt(0).toUpperCase() + p.slice(1);
            return (
              <button
                key={p}
                onClick={() => setSelectedPlatform(p)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-slate-200/60 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 hover:bg-indigo-500/10 hover:text-indigo-600'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </header>

      {/* Apps Grid */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black" style={{ color: 'var(--text-primary)' }}>
            Showing {categoryApps.length} {category.name} Apps
          </h2>
          <span className="text-xs font-bold text-slate-500">Direct Official Links</span>
        </div>

        {categoryApps.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryApps.map((app) => (
              <AppCard
                key={app.id}
                app={app}
                onSelectApp={(a) => (setSelectedApp ? setSelectedApp(a) : router.push(`/app/${a.id}`))}
                isFavorite={favorites ? favorites.includes(app.id) : false}
                onToggleFavorite={toggleFavorite}
                onSelectPlatform={setSelectedPlatform}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 rounded-3xl glass-card">
            <p className="text-slate-500 text-sm">No apps found for the selected platform filter.</p>
            <button
              onClick={() => setSelectedPlatform('all')}
              className="mt-4 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold"
            >
              Reset Filter
            </button>
          </div>
        )}
      </section>

      {/* SEO FAQ Accordion Section */}
      <section className="mb-16 rounded-3xl glass-card p-8 sm:p-10" style={{ border: '1px solid rgba(99,102,241,0.15)' }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-black" style={{ color: 'var(--text-primary)' }}>
              Frequently Asked Questions about {category.name} Software
            </h2>
            <p className="text-xs text-slate-500">Answers to common safety, licensing, and installation questions</p>
          </div>
        </div>

        <div className="space-y-4">
          {categoryFaqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={faq.q}
                className="rounded-2xl border border-slate-200/60 dark:border-slate-800/60 p-5 transition-colors"
                style={{ background: isOpen ? 'rgba(99,102,241,0.04)' : 'transparent' }}
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between text-left font-bold text-sm cursor-pointer"
                  style={{ color: 'var(--text-primary)' }}
                >
                  <span>{faq.q}</span>
                  <span className="text-indigo-500 text-lg font-black ml-4">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Other Categories Internal Links */}
      <section className="pt-8 border-t border-slate-200/60 dark:border-slate-800/60">
        <h3 className="text-sm font-black uppercase tracking-wider text-slate-400 mb-6">
          Explore Other Software Categories
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {otherCategories.map((c) => (
            <Link
              key={c.id}
              href={`/categories/${c.id}`}
              className="p-4 rounded-2xl glass-card card-hover-glow flex items-center gap-3 transition-all"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${c.color} flex items-center justify-center text-white text-xs`}>
                {getCategoryIcon(c.icon)}
              </div>
              <div className="min-w-0">
                <p className="font-bold text-xs truncate" style={{ color: 'var(--text-primary)' }}>{c.name}</p>
                <span className="text-[11px] text-slate-500 font-medium">Browse Hub →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default function CategoryDetailPage({ params }) {
  return (
    <AppShell activeTab="categories">
      <CategoryDetailPageContent params={params} />
    </AppShell>
  );
}
