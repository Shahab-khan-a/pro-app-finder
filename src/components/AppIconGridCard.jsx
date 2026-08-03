'use client';

import React, { useState, useEffect } from 'react';
import { Star, ShieldCheck, Bookmark, Download } from 'lucide-react';

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
      return new URL(url).hostname;
    } catch {
      return '';
    }
  };

  const domain = getDomainFromUrl(app.officialWebsite);

  const getIconSrc = () => {
    if (iconStage === 0 && app.icon) return app.icon;
    if (iconStage <= 1 && domain) return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
    if (iconStage <= 2 && domain) return `https://unavatar.io/${domain}`;
    return null;
  };

  const currentIconSrc = getIconSrc();

  const renderAppIcon = () => {
    if (!currentIconSrc || iconStage >= 3) {
      const initials = app.name ? app.name.substring(0, 2).toUpperCase() : 'AP';
      return (
        <div className="w-full h-full rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-black text-lg shadow-inner">
          {initials}
        </div>
      );
    }
    return (
      <img
        src={currentIconSrc}
        alt={app.name}
        onError={() => setIconStage(prev => prev + 1)}
        className="w-full h-full object-contain p-1.5 group-hover:scale-110 transition-transform duration-300"
      />
    );
  };

  return (
    <div
      onClick={() => onSelectApp(app)}
      className="group relative rounded-2xl sm:rounded-3xl glass-card border border-slate-200/80 dark:border-slate-800/80 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 p-3.5 sm:p-4 flex flex-col items-center text-center cursor-pointer overflow-hidden"
    >
      {/* Top Banner Glow Accent for Featured */}
      {app.featured && (
        <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
      )}

      {/* Bookmark Favorite Button */}
      {onToggleFavorite && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(app.id);
          }}
          className={`absolute top-2 right-2 p-1.5 rounded-xl border transition-all z-10 ${
            isFavorite
              ? 'bg-amber-500/10 border-amber-500/30 text-amber-500'
              : 'bg-slate-100/80 dark:bg-slate-800/80 border-slate-200/60 dark:border-slate-700/60 text-slate-400 opacity-0 group-hover:opacity-100 hover:text-amber-500'
          }`}
          title={isFavorite ? "Remove from Saved" : "Save App"}
        >
          <Bookmark className={`w-3.5 h-3.5 ${isFavorite ? 'fill-amber-500 text-amber-500' : ''}`} />
        </button>
      )}

      {/* Large App Logo Icon Box */}
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-center shadow-md group-hover:shadow-blue-500/20 transition-all duration-300 overflow-hidden mb-3 p-1.5 shrink-0">
        {renderAppIcon()}
      </div>

      {/* App Name */}
      <div className="w-full flex items-center justify-center gap-1 mb-1">
        <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
          {app.name}
        </h3>
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" title="Verified Safe" />
      </div>

      {/* License & Rating Row */}
      <div className="flex items-center gap-1.5 flex-wrap justify-center mt-auto pt-2">
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 truncate max-w-[90px]">
          {app.licenseType}
        </span>
        <div className="flex items-center gap-0.5 text-[11px] font-bold text-slate-700 dark:text-slate-300">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span>{app.rating}</span>
        </div>
      </div>
    </div>
  );
}
