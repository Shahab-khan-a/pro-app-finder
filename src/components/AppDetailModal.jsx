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
  HardDrive,
  CheckCircle2,
  Lock,
  ArrowRight
} from 'lucide-react';
import { APPS_DATA } from '@/data/appsData';
import { getWorkingMirrors, getPrimaryDownloadInfo } from '@/utils/mirrorEngine';

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

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const getInitialIcon = () => {
    if (app && app.icon && !app.icon.includes('domain=desctopapp') && !app.icon.includes('domain=nevapp')) {
      return app.icon;
    }
    try {
      const hostname = new URL(app.officialWebsite).hostname;
      if (hostname.includes('google.com') || hostname.includes('getintopc.com') || hostname.includes('filecr.com') || hostname.includes('liteapks.com') || hostname.includes('apkmody.com')) {
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(app ? app.name : 'App')}&background=5a5ff2&color=ffffff&bold=true&size=128`;
      }
      return `https://www.google.com/s2/favicons?domain=${hostname}&sz=128`;
    } catch {
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(app ? app.name : 'App')}&background=5a5ff2&color=ffffff&bold=true&size=128`;
    }
  };

  const [imgSrc, setImgSrc] = useState(getInitialIcon);
  const [errorStage, setErrorStage] = useState(0);

  useEffect(() => {
    setImgSrc(getInitialIcon());
    setErrorStage(0);
    if (app && app.platforms && app.platforms.length > 0 && !app.platforms.includes(activePlatform)) {
      setActivePlatform(app.platforms[0]);
    }
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
      setImgSrc(`https://ui-avatars.com/api/?name=${encodeURIComponent(app.name)}&background=5a5ff2&color=ffffff&bold=true&size=128`);
    } else {
      setErrorStage(2);
      setImgSrc(`https://ui-avatars.com/api/?name=${encodeURIComponent(app.name)}&background=5a5ff2&color=ffffff&bold=true&size=128`);
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

  const platformInfo = getPrimaryDownloadInfo(app, activePlatform);
  const verifiedMirrors = getWorkingMirrors(app.name, activePlatform, app.officialWebsite, app.category);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto modal-backdrop animate-fade-in"
      onClick={onClose}
    >
      
      {/* ── Modal Container ── */}
      <div 
        className="relative w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col animate-scale-in"
        style={{
          background: 'var(--bg-glass-card)',
          border: '1px solid rgba(90,95,242,0.25)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.4), 0 0 32px rgba(90,95,242,0.20)',
          backdropFilter: 'blur(24px)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* ── Top Header Bar ── */}
        <div 
          className="flex items-center justify-between p-4 sm:p-6 shrink-0"
          style={{
            background: 'rgba(90,95,242,0.05)',
            borderBottom: '1px solid rgba(90,95,242,0.12)',
          }}
        >
          <div className="flex items-center gap-3">
            <span 
              className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full"
              style={{
                background: 'rgba(90,95,242,0.10)',
                color: 'var(--accent-primary)',
                border: '1px solid rgba(90,95,242,0.22)',
              }}
            >
              {app.categoryName || 'App Details'}
            </span>
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verified Direct & Working Mirrors</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Copy link button */}
            <button
              onClick={handleCopyLink}
              className="p-2.5 rounded-xl transition-all cursor-pointer relative"
              style={{
                background: copiedLink ? 'rgba(52,211,153,0.15)' : 'rgba(90,95,242,0.08)',
                border: '1px solid rgba(90,95,242,0.15)',
                color: copiedLink ? '#34d399' : 'var(--text-secondary)',
              }}
              title="Copy official website link"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>

            {/* Bookmark button */}
            {onToggleFavorite && (
              <button
                onClick={() => onToggleFavorite(app.id)}
                className="p-2.5 rounded-xl transition-all cursor-pointer"
                style={{
                  background: isFavorite ? 'rgba(245,158,11,0.15)' : 'rgba(90,95,242,0.08)',
                  border: isFavorite ? '1px solid rgba(245,158,11,0.30)' : '1px solid rgba(90,95,242,0.15)',
                  color: isFavorite ? '#fbbf24' : 'var(--text-secondary)',
                }}
                title={isFavorite ? "Remove from bookmarks" : "Save to bookmarks"}
              >
                <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-amber-400 text-amber-400' : ''}`} />
              </button>
            )}

            {/* Close button */}
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl transition-all cursor-pointer"
              style={{
                background: 'rgba(90,95,242,0.08)',
                border: '1px solid rgba(90,95,242,0.15)',
                color: 'var(--text-secondary)',
              }}
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* ── Scrollable Content Body ── */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Main App Overview */}
          <div 
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6"
            style={{ borderBottom: '1px solid rgba(90,95,242,0.10)' }}
          >
            <div className="flex items-start gap-4">
              <div 
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center p-2.5 shrink-0 shadow-lg"
                style={{
                  background: 'rgba(90,95,242,0.08)',
                  border: '1px solid rgba(90,95,242,0.18)',
                  boxShadow: '0 4px 20px rgba(90,95,242,0.15)',
                }}
              >
                <img
                  src={imgSrc}
                  alt={app.name}
                  onError={handleImageError}
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl sm:text-3xl font-black" style={{ color: 'var(--text-primary)' }}>
                    {app.name}
                  </h2>
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" title="Verified Safe" />
                </div>

                <p className="text-xs sm:text-sm font-medium mt-1" style={{ color: 'var(--text-secondary)' }}>
                  Publisher: <span className="font-bold" style={{ color: 'var(--text-primary)' }}>{app.publisher}</span> • Version <span className="font-mono">{app.latestVersion}</span>
                </p>

                <div className="flex items-center gap-3 mt-3 flex-wrap">
                  <div 
                    className="flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold"
                    style={{
                      background: 'rgba(251,191,36,0.10)',
                      border: '1px solid rgba(251,191,36,0.22)',
                      color: '#fbbf24',
                    }}
                  >
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{app.rating} / 5.0</span>
                    <span style={{ color: 'var(--text-muted)' }}>({app.reviewCount ? (app.reviewCount / 1000).toFixed(1) : 0}k reviews)</span>
                  </div>

                  <span 
                    className="px-3 py-1 rounded-xl text-xs font-bold"
                    style={{
                      background: 'rgba(90,95,242,0.10)',
                      color: 'var(--accent-primary)',
                      border: '1px solid rgba(90,95,242,0.20)',
                    }}
                  >
                    {app.licenseType}
                  </span>

                  <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                    {app.downloadsCount} downloads
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Platform Selector Bar */}
          <div 
            className="p-4 rounded-2xl"
            style={{
              background: 'rgba(90,95,242,0.05)',
              border: '1px solid rgba(90,95,242,0.14)',
            }}
          >
            <h4 
              className="text-xs font-black uppercase tracking-wider mb-2.5 flex items-center justify-between"
              style={{ color: 'var(--text-muted)' }}
            >
              <span>Select Platform for Download & Mirrors:</span>
              <span className="capitalize font-black" style={{ color: 'var(--accent-primary)' }}>Selected: {activePlatform}</span>
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
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer active:scale-95"
                    style={{
                      background: isSelected ? 'linear-gradient(135deg, #5a5ff2, #7c3aed)' : 'var(--bg-secondary)',
                      color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                      border: `1px solid ${isSelected ? 'transparent' : 'rgba(90,95,242,0.15)'}`,
                      boxShadow: isSelected ? '0 4px 16px rgba(90,95,242,0.35)' : 'none',
                    }}
                  >
                    {getPlatformIcon(p)}
                    <span className="capitalize">{p}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Official Download & Working Mirrors Section ── */}
          <div 
            className="p-5 sm:p-6 rounded-3xl space-y-5"
            style={{
              background: 'rgba(90,95,242,0.04)',
              border: '1px solid rgba(90,95,242,0.18)',
            }}
          >
            <div 
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3"
              style={{ borderBottom: '1px solid rgba(90,95,242,0.10)' }}
            >
              <div className="flex items-center gap-2">
                <Download className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
                <h3 className="text-base font-black" style={{ color: 'var(--text-primary)' }}>
                  Downloads & Working Mirrors for <span className="capitalize" style={{ color: 'var(--accent-primary)' }}>{activePlatform}</span>
                </h3>
              </div>
              <div 
                className="flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full w-fit"
                style={{
                  background: 'rgba(52,211,153,0.10)',
                  color: '#34d399',
                  border: '1px solid rgba(52,211,153,0.22)',
                }}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% Tested Working Official Links</span>
              </div>
            </div>

            {/* Official Vendor Row */}
            <div 
              className="p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid rgba(90,95,242,0.15)',
              }}
            >
              <div>
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
                  <h4 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>Official Publisher Portal</h4>
                  <span 
                    className="text-[10px] font-black px-2 py-0.5 rounded-full"
                    style={{
                      background: 'rgba(90,95,242,0.10)',
                      color: 'var(--accent-primary)',
                      border: '1px solid rgba(90,95,242,0.20)',
                    }}
                  >
                    Official
                  </span>
                </div>
                <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                  Original release directly from developer/publisher website.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={app.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
                  style={{
                    background: 'rgba(90,95,242,0.06)',
                    border: '1px solid rgba(90,95,242,0.15)',
                    color: 'var(--text-secondary)',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                  <span>Website</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </a>

                <a
                  href={platformInfo.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 text-white text-xs font-black rounded-xl flex items-center gap-2 shimmer-btn cursor-pointer shadow-md transition-all hover:scale-105 active:scale-95"
                  style={{ boxShadow: '0 4px 18px rgba(90,95,242,0.40)' }}
                >
                  <Download className="w-4 h-4" />
                  <span>{platformInfo.downloadLabel}</span>
                </a>
              </div>
            </div>

            {/* Verified Working Mirrors Engine Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 
                  className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <HardDrive className="w-4 h-4 text-indigo-400" />
                  <span>Alternative Verified Mirrors & Pro Repos:</span>
                </h4>
                <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Click any mirror to open</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {verifiedMirrors.map((mirror) => (
                  <a
                    key={mirror.id}
                    href={mirror.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-2xl transition-all hover:scale-[1.01] flex flex-col justify-between group"
                    style={{
                      background: 'var(--bg-secondary)',
                      border: '1px solid rgba(90,95,242,0.14)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'rgba(90,95,242,0.35)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(90,95,242,0.15)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(90,95,242,0.14)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span 
                            className="font-bold text-xs sm:text-sm group-hover:text-indigo-400 transition-colors"
                            style={{ color: 'var(--text-primary)' }}
                          >
                            {mirror.name}
                          </span>
                          <span 
                            className="text-[10px] font-black px-2 py-0.5 rounded-full"
                            style={{
                              background: 'rgba(52,211,153,0.10)',
                              color: '#34d399',
                              border: '1px solid rgba(52,211,153,0.22)',
                            }}
                          >
                            {mirror.badge}
                          </span>
                        </div>
                        <span className="text-[10px] font-semibold" style={{ color: 'var(--text-muted)' }}>
                          {mirror.tag}
                        </span>
                      </div>
                      <p className="text-[11px] mt-1.5 line-clamp-1" style={{ color: 'var(--text-secondary)' }}>
                        {mirror.description}
                      </p>
                    </div>

                    <div 
                      className="mt-3.5 pt-2.5 flex items-center justify-between text-xs font-bold"
                      style={{
                        borderTop: '1px solid rgba(90,95,242,0.08)',
                        color: 'var(--accent-primary)',
                      }}
                    >
                      <span>Open mirror link</span>
                      <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* Description */}
          <div>
            <h3 className="text-base font-black mb-2" style={{ color: 'var(--text-primary)' }}>
              About {app.name}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {app.description}
            </p>
          </div>

          {/* Key Features Grid */}
          {app.features && app.features.length > 0 && (
            <div>
              <h3 className="text-base font-black mb-3 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <Sparkles className="w-4 h-4 text-amber-400" /> Key Features & Capabilities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {app.features.map((feature, idx) => (
                  <div 
                    key={idx}
                    className="p-3 rounded-2xl flex items-start gap-2.5"
                    style={{
                      background: 'var(--bg-secondary)',
                      border: '1px solid rgba(90,95,242,0.10)',
                    }}
                  >
                    <div 
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{
                        background: 'rgba(52,211,153,0.12)',
                        color: '#34d399',
                      }}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* System Requirements & License details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
              className="p-4 rounded-2xl"
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid rgba(90,95,242,0.12)',
              }}
            >
              <h4 className="text-xs font-black uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
                System Requirements
              </h4>
              <p className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>
                {app.systemRequirements || 'Standard modern OS'}
              </p>
            </div>

            <div 
              className="p-4 rounded-2xl"
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid rgba(90,95,242,0.12)',
              }}
            >
              <h4 className="text-xs font-black uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
                License & Transparency
              </h4>
              <p className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>
                {app.licenseDetails || 'Free software distribution'}
              </p>
            </div>
          </div>

          {/* Alternative Similar Free Apps */}
          {alternatives.length > 0 && (
            <div 
              className="pt-4"
              style={{ borderTop: '1px solid rgba(90,95,242,0.10)' }}
            >
              <h3 className="text-sm font-black mb-3 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <Layers className="w-4 h-4" style={{ color: 'var(--accent-primary)' }} /> Similar Free Alternatives
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {alternatives.map((alt) => (
                  <div
                    key={alt.id}
                    onClick={() => onSelectAlternative ? onSelectAlternative(alt) : null}
                    className="p-3.5 rounded-2xl transition-all cursor-pointer flex items-center gap-3 group"
                    style={{
                      background: 'var(--bg-secondary)',
                      border: '1px solid rgba(90,95,242,0.12)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'rgba(90,95,242,0.35)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(90,95,242,0.12)';
                    }}
                  >
                    <img
                      src={alt.icon}
                      alt={alt.name}
                      onError={(e) => {
                        try {
                          const domain = new URL(alt.officialWebsite).hostname;
                          e.target.src = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
                        } catch {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(alt.name)}&background=5a5ff2&color=ffffff&bold=true`;
                        }
                      }}
                      className="w-10 h-10 rounded-xl object-contain p-1 shrink-0"
                      style={{
                        background: 'rgba(90,95,242,0.06)',
                        border: '1px solid rgba(90,95,242,0.12)',
                      }}
                    />
                    <div className="min-w-0">
                      <p 
                        className="text-xs font-bold truncate group-hover:text-indigo-400 transition-colors"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {alt.name}
                      </p>
                      <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                        {alt.licenseType}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* ── Modal Footer ── */}
        <div 
          className="p-4 sm:p-5 flex items-center justify-between text-xs shrink-0"
          style={{
            background: 'rgba(90,95,242,0.04)',
            borderTop: '1px solid rgba(90,95,242,0.12)',
            color: 'var(--text-muted)',
          }}
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Official publisher download & platform-specific verified mirrors.</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2.5 font-bold rounded-xl transition-all cursor-pointer"
            style={{
              background: 'rgba(90,95,242,0.08)',
              border: '1px solid rgba(90,95,242,0.18)',
              color: 'var(--text-primary)',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(90,95,242,0.15)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(90,95,242,0.08)'}
          >
            Close
          </button>
        </div>

      </div>

    </div>
  );
}
