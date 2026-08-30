'use client';

import React, { useState, useEffect } from 'react';
import { Star, ShieldCheck, Bookmark, Download, Monitor, Smartphone, Apple, Terminal, Tablet } from 'lucide-react';

export default function AppIconGridCard({
  app,
  onSelectApp,
  isFavorite,
  onToggleFavorite
}) {
  const [iconStage, setIconStage] = useState(0);

  useEffect(() => {
    setIconStage(0);
  }, [app.id, app.icon]);

  const getDomainFromUrl = (url) => {
    try {
      if (!url) return '';
      const hostname = new URL(url).hostname;
      if (hostname.includes('google.com') || hostname.includes('getintopc.com') || hostname.includes('filecr.com') || hostname.includes('liteapks.com') || hostname.includes('apkmody.com') || hostname.includes('bing.com')) {
        return '';
      }
      return hostname;
    } catch {
      return '';
    }
  };

  const domain = getDomainFromUrl(app.officialWebsite);

  const getIconSrc = () => {
    if (iconStage === 0 && app.icon) {
      return app.icon;
    }
    if (iconStage <= 1 && domain) return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
    if (iconStage <= 2) return `https://ui-avatars.com/api/?name=${encodeURIComponent(app.name)}&background=5a5ff2&color=ffffff&bold=true&size=128`;
    return null;
  };

  const currentIconSrc = getIconSrc();

  const renderAppIcon = () => {
    if (!currentIconSrc || iconStage >= 3) {
      const initials = app.name ? app.name.trim().substring(0, 2).toUpperCase() : 'AP';
      return (
        <div 
          className="w-full h-full rounded-2xl flex items-center justify-center text-white font-black text-xl select-none"
          style={{ background: 'linear-gradient(135deg, #5a5ff2, #7c3aed, #06b6d4)' }}
        >
          {initials}
        </div>
      );
    }
    return (
      <img
        src={currentIconSrc}
        alt={app.name}
        onError={() => setIconStage(prev => prev + 1)}
        className="w-full h-full object-contain p-2 rounded-2xl transition-transform duration-300 group-hover:scale-110"
      />
    );
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'windows': return <Monitor className="w-3 h-3" />;
      case 'mac': return <Apple className="w-3 h-3" />;
      case 'linux': return <Terminal className="w-3 h-3" />;
      case 'android': return <Smartphone className="w-3 h-3" />;
      case 'ios': return <Tablet className="w-3 h-3" />;
      default: return null;
    }
  };

  return (
    <div
      onClick={() => onSelectApp && onSelectApp(app)}
      className="group relative rounded-3xl glass-card card-hover-glow p-4 flex flex-col items-center text-center cursor-pointer overflow-hidden justify-between"
      style={{
        border: '1px solid rgba(90,95,242,0.14)',
      }}
    >
      {/* ── Top Shimmer Accent for Featured ── */}
      {app.featured && (
        <div 
          className="absolute top-0 right-0 left-0 h-[2.5px] shimmer-btn"
          aria-hidden
        />
      )}

      {/* ── Bookmark Favorite Button ── */}
      {onToggleFavorite && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(app.id);
          }}
          className={`absolute top-2.5 right-2.5 p-1.5 rounded-xl border transition-all z-10 cursor-pointer active:scale-90 ${
            isFavorite
              ? 'bg-amber-500/15 border-amber-500/30 text-amber-400 opacity-100'
              : 'bg-black/5 dark:bg-white/5 border-transparent text-slate-400 opacity-0 group-hover:opacity-100 hover:text-amber-400'
          }`}
          title={isFavorite ? "Remove from Bookmarks" : "Save to Bookmarks"}
        >
          <Bookmark className={`w-3.5 h-3.5 ${isFavorite ? 'fill-amber-400 text-amber-400 scale-110' : ''}`} />
        </button>
      )}

      <div className="w-full flex flex-col items-center">
        {/* ── Large App Logo Icon Box ── */}
        <div 
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shadow-md overflow-hidden mb-3 p-1.5 shrink-0 transition-transform duration-300 group-hover:scale-105"
          style={{
            background: 'rgba(90,95,242,0.06)',
            border: '1px solid rgba(90,95,242,0.16)',
            boxShadow: '0 4px 16px rgba(90,95,242,0.10)',
          }}
        >
          {renderAppIcon()}
        </div>

        {/* ── App Name & Safety Shield ── */}
        <div className="w-full flex items-center justify-center gap-1 mb-1 px-1">
          <h3 
            className="font-bold text-xs sm:text-sm truncate group-hover:text-indigo-400 transition-colors leading-snug"
            style={{ color: 'var(--text-primary)' }}
          >
            {app.name}
          </h3>
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" title="Verified Safe" />
        </div>

        {/* ── Category Tagline ── */}
        <p className="text-[11px] truncate w-full" style={{ color: 'var(--text-muted)' }}>
          {app.categoryName}
        </p>
      </div>

      {/* ── Bottom License & Rating Row ── */}
      <div 
        className="w-full flex items-center justify-between gap-1 mt-3 pt-2.5"
        style={{ borderTop: '1px solid rgba(90,95,242,0.08)' }}
      >
        <span 
          className="text-[10px] font-black px-2 py-0.5 rounded-full truncate max-w-[85px]"
          style={{
            background: 'rgba(90,95,242,0.08)',
            color: 'var(--accent-primary)',
            border: '1px solid rgba(90,95,242,0.18)',
          }}
        >
          {app.licenseType}
        </span>

        <div className="flex items-center gap-1 text-[11px] font-bold text-amber-400">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span>{app.rating}</span>
        </div>
      </div>
    </div>
  );
}
