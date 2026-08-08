'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Download, 
  ExternalLink, 
  Star, 
  ShieldCheck, 
  Check, 
  Monitor, 
  Apple, 
  Terminal, 
  Smartphone, 
  Tablet, 
  Bookmark,
  Copy,
  Sparkles,
  Layers,
  Globe,
  HardDrive
} from 'lucide-react';
import { APPS_DATA } from '@/data/appsData';

export default function AppDetailModal({ 
  app, 
  onClose, 
  isFavorite, 
  onToggleFavorite,
  onSelectAlternative,
  onSelectPlatform
}) {
  const [copiedLink, setCopiedLink] = useState(false);
  
  // Selected platform within the modal
  const [activePlatform, setActivePlatform] = useState(() => {
    return app && app.platforms && app.platforms.length > 0 ? app.platforms[0] : 'windows';
  });

  const getInitialIcon = () => {
    if (app && app.icon && !app.icon.includes('domain=desctopapp') && !app.icon.includes('domain=nevapp')) {
      return app.icon;
    }
    try {
      const hostname = new URL(app.officialWebsite).hostname;
      if (hostname.includes('google.com') || hostname.includes('getintopc.com') || hostname.includes('9mod.com')) {
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(app ? app.name : 'App')}&background=2563eb&color=ffffff&bold=true&size=128`;
      }
      return `https://www.google.com/s2/favicons?domain=${hostname}&sz=128`;
    } catch {
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(app ? app.name : 'App')}&background=2563eb&color=ffffff&bold=true&size=128`;
    }
  };

  const [imgSrc, setImgSrc] = useState(getInitialIcon);
  const [errorStage, setErrorStage] = useState(0);

  useEffect(() => {
    setImgSrc(getInitialIcon());
    setErrorStage(0);
  }, [app ? app.id : null]);

  if (!app) return null;

  const handleImageError = () => {
    if (errorStage === 0) {
      setErrorStage(1);
      try {
        const hostname = new URL(app.officialWebsite).hostname;
        if (!hostname.includes('google.com')) {
          setImgSrc(`https://www.google.com/s2/favicons?domain=${hostname}&sz=128`);
          return;
        }
      } catch {}
      setImgSrc(`https://ui-avatars.com/api/?name=${encodeURIComponent(app.name)}&background=2563eb&color=ffffff&bold=true&size=128`);
    } else {
      setErrorStage(2);
      setImgSrc(`https://ui-avatars.com/api/?name=${encodeURIComponent(app.name)}&background=2563eb&color=ffffff&bold=true&size=128`);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(app.officialWebsite || app.downloadUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const alternatives = APPS_DATA
    .filter(a => a.category === app.category && a.id !== app.id)
    .slice(0, 3);

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'windows': return <Monitor className="w-4 h-4" />;
      case 'mac': return <Apple className="w-4 h-4" />;
      case 'linux': return <Terminal className="w-4 h-4" />;
      case 'android': return <Smartphone className="w-4 h-4" />;
      case 'ios': return <Tablet className="w-4 h-4" />;
      default: return null;
    }
  };

  const getPlatformDownloadUrls = (platform) => {
    const p = platform ? platform.toLowerCase() : 'windows';
    const name = encodeURIComponent(app.name);

    if (app.mirrorUrl) {
      return {
        downloadUrl: app.downloadUrl || app.mirrorUrl,
        mirrorUrl: app.mirrorUrl,
        label: app.downloadLabel || (p === 'windows' ? 'Download for Windows (.exe)' : p === 'mac' ? 'Download for macOS (.dmg)' : p === 'android' ? 'Get for Android (APK)' : p === 'ios' ? 'Get for iOS' : 'Free Download')
      };
    }

    if (p === 'windows') {
      return {
        downloadUrl: app.downloadUrl || `https://getintopc.com/?s=${name}+windows`,
        mirrorUrl: app.mirrorUrl || `https://getintopc.com/?s=${name}+windows`,
        label: 'Download for Windows (.exe)'
      };
    } else if (p === 'mac') {
      return {
        downloadUrl: app.downloadUrl && app.downloadUrl.includes('mac') ? app.downloadUrl : `${app.officialWebsite}#mac`,
        mirrorUrl: `https://getintopc.com/?s=${name}+mac`,
        label: 'Download for macOS (.dmg / App Store)'
      };
    } else if (p === 'linux') {
      return {
        downloadUrl: `${app.officialWebsite}#linux`,
        mirrorUrl: `https://flathub.org/apps/search?q=${name}`,
        label: 'Download for Linux (.AppImage / .deb / Flathub)'
      };
    } else if (p === 'android') {
      return {
        downloadUrl: `https://play.google.com/store/search?q=${name}&c=apps`,
        mirrorUrl: `https://apkpure.com/search?q=${name}`,
        label: 'Get for Android (Google Play / APK)'
      };
    } else if (p === 'ios') {
      return {
        downloadUrl: `https://www.google.com/search?q=${name}+apple+app+store`,
        mirrorUrl: `https://www.apple.com/app-store/`,
        label: 'Get for iOS (Apple App Store)'
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 shrink-0">
          
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
              {app.categoryName || 'App Details'}
            </span>
            <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Verified Direct Links</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              title="Copy official link"
            >
              {copiedLink ? <Check className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
            </button>

            {onToggleFavorite && (
              <button
                onClick={() => onToggleFavorite(app.id)}
                className={`p-2 rounded-xl transition-all ${
                  isFavorite
                    ? 'bg-amber-500/10 text-amber-500'
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
                title={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Bookmark className={`w-5 h-5 ${isFavorite ? 'fill-amber-500' : ''}`} />
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Main App Overview */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
            
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center p-2 shrink-0 shadow-md">
                <img
                  src={imgSrc}
                  alt={app.name}
                  onError={handleImageError}
                  className="w-full h-full object-contain"
                />
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  {app.name}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                  By <span className="text-slate-800 dark:text-slate-200 font-semibold">{app.publisher}</span> • Version <span className="font-mono text-slate-700 dark:text-slate-300">{app.latestVersion}</span>
                </p>

                <div className="flex items-center gap-3 mt-3 flex-wrap">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-lg text-xs font-bold border border-amber-500/20">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{app.rating} / 5.0</span>
                    <span className="text-slate-400 font-normal">({app.reviewCount ? app.reviewCount.toLocaleString() : 0} reviews)</span>
                  </div>

                  <span className="px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-500/20">
                    {app.licenseType}
                  </span>

                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {app.downloadsCount} total downloads
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Platform Selector Bar */}
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Select Platform for Download:</span>
              <span className="text-blue-600 dark:text-blue-400 font-bold capitalize">Selected: {activePlatform}</span>
            </h4>
            
            <div className="flex flex-wrap items-center gap-2">
              {app.platforms && app.platforms.map((p) => {
                const isSelected = activePlatform === p;
                return (
                  <button 
                    key={p} 
                    onClick={() => {
                      setActivePlatform(p);
                      if (onSelectPlatform) onSelectPlatform(p);
                    }}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95 ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                        : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-blue-500'
                    }`}
                  >
                    {getPlatformIcon(p)}
                    <span className="capitalize">{p}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* DYNAMIC PLATFORM DOWNLOAD LINKS SECTION */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-100 to-blue-50/50 dark:from-slate-800/80 dark:to-slate-900 border border-blue-200/80 dark:border-slate-700 space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Download className="w-4 h-4 text-blue-600 dark:text-blue-400" /> Download Links for <span className="capitalize text-blue-600 dark:text-blue-400">{activePlatform}</span>:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* LINK 1: Official Site & Vendor Download */}
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">Option 1: Official Site</h4>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Direct download from publisher's web server.
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <a
                    href={app.officialWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center justify-between"
                  >
                    <span>Visit Official Website</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={platformUrls.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-between shadow-md"
                  >
                    <span>{platformUrls.label}</span>
                    <Download className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* LINK 2: Platform Mirror Download */}
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-800/80 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-2">
                    <HardDrive className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">Option 2: {app.mirrorLabel || 'GetIntoPC Pro Mirror'}</h4>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Direct access to {app.mirrorLabel || 'GetIntoPC software mirror'} for {activePlatform}.
                  </p>
                </div>
                <a
                  href={platformUrls.mirrorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-between shadow-md"
                >
                  <span>Open {app.mirrorLabel || 'GetIntoPC Pro Page'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              About {app.name}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {app.description}
            </p>
          </div>

          {/* Key Features Grid */}
          {app.features && app.features.length > 0 && (
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-500" /> Key Features & Capabilities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {app.features.map((feature, idx) => (
                  <div 
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-start gap-2.5"
                  >
                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* System Requirements & License details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
              <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                System Requirements
              </h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                {app.systemRequirements || 'Standard modern OS'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
              <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                License & Transparency
              </h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                {app.licenseDetails || 'Free software distribution'}
              </p>
            </div>
          </div>

          {/* Alternative Similar Free Apps */}
          {alternatives.length > 0 && (
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-500" /> Similar Free Alternatives
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {alternatives.map((alt) => (
                  <div
                    key={alt.id}
                    onClick={() => onSelectAlternative ? onSelectAlternative(alt) : null}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 hover:border-blue-500 dark:hover:border-blue-400 transition-all cursor-pointer flex items-center gap-3 group"
                  >
                    <img
                      src={alt.icon}
                      alt={alt.name}
                      onError={(e) => {
                        try {
                          const domain = new URL(alt.officialWebsite).hostname;
                          e.target.src = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
                        } catch {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(alt.name)}&background=2563eb&color=ffffff&bold=true`;
                        }
                      }}
                      className="w-10 h-10 rounded-lg object-contain bg-white dark:bg-slate-900 p-1 border border-slate-200 dark:border-slate-700 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {alt.name}
                      </p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                        {alt.licenseType}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Official publisher download & platform-specific software mirror.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-bold rounded-xl transition-colors"
          >
            Close
          </button>
        </div>

      </div>

    </div>
  );
}
