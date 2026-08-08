'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Download, 
  ExternalLink, 
  Star, 
  Bookmark, 
  Monitor, 
  Apple, 
  Terminal, 
  Smartphone, 
  Tablet, 
  ShieldCheck, 
  Globe,
  HardDrive,
  Check
} from 'lucide-react';

export default function AppCard({ 
  app, 
  onSelectApp, 
  isFavorite, 
  onToggleFavorite,
  onSelectPlatform
}) {
  const [iconStage, setIconStage] = useState(0);

  useEffect(() => {
    setIconStage(0);
  }, [app.id, app.icon]);

  const getDomainFromUrl = (url) => {
    try {
      if (!url) return '';
      const hostname = new URL(url).hostname;
      if (hostname.includes('google.com') || hostname.includes('getintopc.com') || hostname.includes('9mod.com') || hostname.includes('bing.com')) {
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
    if (iconStage <= 2) return `https://ui-avatars.com/api/?name=${encodeURIComponent(app.name)}&background=2563eb&color=ffffff&bold=true&size=128`;
    return null;
  };

  const currentIconSrc = getIconSrc();

  const renderAppIcon = () => {
    if (!currentIconSrc || iconStage >= 3) {
      const initials = app.name ? app.name.trim().substring(0, 2).toUpperCase() : 'AP';
      return (
        <div className="w-full h-full rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white font-black text-lg shadow-inner select-none">
          {initials}
        </div>
      );
    }
    return (
      <img
        src={currentIconSrc}
        alt={app.name}
        onError={() => setIconStage(prev => prev + 1)}
        className="w-full h-full object-contain p-1"
      />
    );
  };
  
  // Track selected platform on this specific card
  const [activePlatform, setActivePlatform] = useState(() => {
    return app.platforms && app.platforms.length > 0 ? app.platforms[0] : 'windows';
  });

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'windows': return <Monitor className="w-3.5 h-3.5" title="Windows" />;
      case 'mac': return <Apple className="w-3.5 h-3.5" title="macOS" />;
      case 'linux': return <Terminal className="w-3.5 h-3.5" title="Linux" />;
      case 'android': return <Smartphone className="w-3.5 h-3.5" title="Android" />;
      case 'ios': return <Tablet className="w-3.5 h-3.5" title="iOS" />;
      default: return null;
    }
  };

  const getLicenseBadgeStyle = (license) => {
    if (license === 'Open Source') {
      return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
    } else if (license === '100% Free') {
      return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
    } else {
      return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20';
    }
  };

  // Generate platform-specific download links
  const getPlatformDownloadUrls = (platform) => {
    const p = platform ? platform.toLowerCase() : 'windows';
    const name = encodeURIComponent(app.name);

    if (app.mirrorUrl) {
      return {
        downloadUrl: app.downloadUrl || app.mirrorUrl,
        mirrorUrl: app.mirrorUrl,
        label: app.downloadLabel || (p === 'windows' ? 'Download for Windows' : p === 'mac' ? 'Download for macOS' : p === 'android' ? 'Get for Android' : p === 'ios' ? 'Get for iOS' : 'Free Download')
      };
    }

    if (p === 'windows') {
      return {
        downloadUrl: app.downloadUrl || `https://getintopc.com/?s=${name}+windows`,
        mirrorUrl: app.mirrorUrl || `https://getintopc.com/?s=${name}+windows`,
        label: 'Download for Windows'
      };
    } else if (p === 'mac') {
      return {
        downloadUrl: app.downloadUrl && app.downloadUrl.includes('mac') ? app.downloadUrl : `${app.officialWebsite}#mac`,
        mirrorUrl: `https://getintopc.com/?s=${name}+mac`,
        label: 'Download for macOS'
      };
    } else if (p === 'linux') {
      return {
        downloadUrl: `${app.officialWebsite}#linux`,
        mirrorUrl: `https://flathub.org/apps/search?q=${name}`,
        label: 'Download for Linux'
      };
    } else if (p === 'android') {
      return {
        downloadUrl: `https://play.google.com/store/search?q=${name}&c=apps`,
        mirrorUrl: `https://apkpure.com/search?q=${name}`,
        label: 'Get for Android'
      };
    } else if (p === 'ios') {
      return {
        downloadUrl: `https://www.google.com/search?q=${name}+apple+app+store`,
        mirrorUrl: `https://www.apple.com/app-store/`,
        label: 'Get for iOS'
      };
    }

    return {
      downloadUrl: app.downloadUrl,
      mirrorUrl: app.mirrorUrl || `https://getintopc.com/?s=${name}`,
      label: 'Free Download'
    };
  };

  const platformUrls = getPlatformDownloadUrls(activePlatform);

  return (
    <div className="group relative rounded-2xl glass-card border border-slate-200/80 dark:border-slate-800/80 hover:border-blue-500/40 dark:hover:border-blue-500/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between overflow-hidden">
      
      {/* Top Banner Accent for Popular / Featured items */}
      {app.featured && (
        <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
      )}

      <div className="p-5 sm:p-6">
        
        {/* Header Row: Icon, Title, License Badge & Favorite Star */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3.5 min-w-0 flex-1">
            
            {/* App Logo Box */}
            <div 
              onClick={() => onSelectApp ? onSelectApp(app) : null}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform duration-200 cursor-pointer overflow-hidden p-1.5"
            >
              {renderAppIcon()}
            </div>

            {/* App Title & Publisher */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 
                  onClick={() => onSelectApp ? onSelectApp(app) : null}
                  className="font-bold text-base sm:text-lg text-slate-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors cursor-pointer"
                >
                  {app.name}
                </h3>
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" title="Verified Safe Official Download" />
              </div>

              <div className="flex items-center gap-2 mt-1">
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${getLicenseBadgeStyle(app.licenseType)}`}>
                  {app.licenseType}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {app.publisher}
                </span>
              </div>
            </div>

          </div>

          {/* Bookmark Favorite Button */}
          {onToggleFavorite && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(app.id);
              }}
              className={`p-2 rounded-xl border transition-all shrink-0 ${
                isFavorite
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-500'
                  : 'bg-slate-100 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 text-slate-400 hover:text-amber-500'
              }`}
              title={isFavorite ? "Remove from Saved" : "Save App"}
              aria-label="Toggle Favorite"
            >
              <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-amber-500 text-amber-500' : ''}`} />
            </button>
          )}
        </div>

        {/* Rating & Downloads Stats Row */}
        <div className="flex items-center gap-4 mt-3 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-bold text-slate-800 dark:text-slate-200">{app.rating}</span>
            <span>({(app.reviewCount / 1000).toFixed(1)}k)</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
          <div>
            <span className="font-semibold text-slate-700 dark:text-slate-300">{app.downloadsCount}</span> downloads
          </div>
        </div>

        {/* Short Description */}
        <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
          {app.description}
        </p>

        {/* Interactive Platform Selector Pills */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 dark:text-slate-500 mb-1.5">
            <span>Select Platform for Download:</span>
            <span className="text-blue-600 dark:text-blue-400 font-bold capitalize">Active: {activePlatform}</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {app.platforms.map((platform) => {
              const isSelected = activePlatform === platform;
              return (
                <button
                  key={platform}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePlatform(platform);
                    if (onSelectPlatform) onSelectPlatform(platform);
                  }}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-bold border transition-all cursor-pointer shadow-xs active:scale-95 ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                      : 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700/80 hover:border-blue-500 hover:text-blue-600'
                  }`}
                  title={`Select ${platform} to get platform download link`}
                >
                  {getPlatformIcon(platform)}
                  <span className="capitalize">{platform}</span>
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Footer Action Bar */}
      <div className="px-4 py-3 bg-slate-50/90 dark:bg-slate-800/50 border-t border-slate-200/60 dark:border-slate-800/60 space-y-2">
        
        {/* Link Buttons Row */}
        <div className="grid grid-cols-2 gap-2">
          
          {/* LINK 1: Official Site */}
          <a
            href={app.officialWebsite}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center gap-1.5 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl transition-all shadow-xs"
            title="Visit Official Website"
          >
            <Globe className="w-3.5 h-3.5 text-blue-500" />
            <span className="truncate">Official Site</span>
            <ExternalLink className="w-3 h-3 text-slate-400 shrink-0" />
          </a>

          {/* LINK 2: Platform-Specific GetIntoPC / Pro Software Mirror Download */}
          <a
            href={platformUrls.mirrorUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold rounded-xl transition-all shadow-xs"
            title={`Get ${app.name} on ${app.mirrorLabel || 'GetIntoPC Pro'}`}
          >
            <HardDrive className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="truncate">{app.mirrorLabel || 'GetIntoPC Pro'}</span>
            <ExternalLink className="w-3 h-3 text-emerald-500 shrink-0" />
          </a>

        </div>

        {/* Direct Download Button Bar */}
        <a
          href={platformUrls.downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center justify-center gap-1.5 w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/20 hover:shadow-lg transition-all active:scale-95"
        >
          <Download className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>{platformUrls.label}</span>
        </a>

      </div>

    </div>
  );
}
