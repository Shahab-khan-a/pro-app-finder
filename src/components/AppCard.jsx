'use client';

import React, { useState, useEffect } from 'react';
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
  Check,
  Zap
} from 'lucide-react';

import { getPrimaryDownloadInfo } from '@/utils/mirrorEngine';

export default function AppCard({
  app,
  onSelectApp,
  isFavorite,
  onToggleFavorite,
  onSelectPlatform
}) {
  const [iconStage, setIconStage] = useState(0);

  useEffect(() => { setIconStage(0); }, [app.id, app.icon]);

  const getDomainFromUrl = (url) => {
    try {
      if (!url) return '';
      const hostname = new URL(url).hostname;
      if (['google.com', 'getintopc.com', 'filecr.com', 'liteapks.com', 'apkmody.com', 'bing.com'].some(d => hostname.includes(d))) return '';
      return hostname;
    } catch { return ''; }
  };

  const domain = getDomainFromUrl(app.officialWebsite);

  const getIconSrc = () => {
    if (iconStage === 0 && app.icon) return app.icon;
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
          className="w-full h-full rounded-2xl flex items-center justify-center text-white font-black text-2xl select-none"
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
        className="w-full h-full object-contain p-1.5 rounded-2xl"
      />
    );
  };

  const [activePlatform, setActivePlatform] = useState(() =>
    app.platforms && app.platforms.length > 0 ? app.platforms[0] : 'windows'
  );

  useEffect(() => {
    if (app && app.platforms && app.platforms.length > 0 && !app.platforms.includes(activePlatform)) {
      setActivePlatform(app.platforms[0]);
    }
  }, [app.id]);

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'windows': return <Monitor className="w-3.5 h-3.5" />;
      case 'mac':     return <Apple className="w-3.5 h-3.5" />;
      case 'linux':   return <Terminal className="w-3.5 h-3.5" />;
      case 'android': return <Smartphone className="w-3.5 h-3.5" />;
      case 'ios':     return <Tablet className="w-3.5 h-3.5" />;
      default:        return null;
    }
  };

  const getPlatformStyle = (platform, isSelected) => {
    const styles = {
      windows: { active: '#3b82f6', glow: 'rgba(59,130,246,0.35)',  soft: 'rgba(59,130,246,0.08)',  text: '#60a5fa',  border: 'rgba(59,130,246,0.28)' },
      mac:     { active: '#6b7280', glow: 'rgba(107,114,128,0.30)', soft: 'rgba(107,114,128,0.08)', text: '#9ca3af',  border: 'rgba(107,114,128,0.25)' },
      linux:   { active: '#ea580c', glow: 'rgba(234,88,12,0.35)',   soft: 'rgba(234,88,12,0.08)',   text: '#fb923c',  border: 'rgba(234,88,12,0.28)' },
      android: { active: '#16a34a', glow: 'rgba(34,197,94,0.35)',   soft: 'rgba(34,197,94,0.08)',   text: '#4ade80',  border: 'rgba(34,197,94,0.28)' },
      ios:     { active: '#5a5ff2', glow: 'rgba(90,95,242,0.35)',   soft: 'rgba(90,95,242,0.08)',   text: '#818cf8',  border: 'rgba(90,95,242,0.28)' },
    };
    const s = styles[platform] || styles.windows;
    if (isSelected) {
      return {
        background: s.active,
        color: 'white',
        border: '1px solid transparent',
        boxShadow: `0 2px 12px ${s.glow}`,
      };
    }
    return {
      background: s.soft,
      color: s.text,
      border: `1px solid ${s.border}`,
    };
  };

  const getLicenseBadgeStyle = (license) => {
    if (license === 'Open Source') return { bg: 'rgba(16,185,129,0.10)', color: '#10b981',  border: 'rgba(16,185,129,0.28)' };
    if (license === '100% Free')   return { bg: 'rgba(90,95,242,0.10)',  color: '#818cf8',  border: 'rgba(129,140,248,0.28)' };
    return                                { bg: 'rgba(168,85,247,0.10)', color: '#c084fc',  border: 'rgba(192,132,252,0.28)' };
  };

  const platformUrls  = getPrimaryDownloadInfo(app, activePlatform);
  const licenseStyle  = getLicenseBadgeStyle(app.licenseType);

  return (
    <div
      className="group relative rounded-3xl glass-card card-hover-glow flex flex-col justify-between overflow-hidden"
    >
      {/* ── Featured shimmer strip ── */}
      {app.featured && (
        <div
          className="absolute top-0 right-0 left-0 h-[3px] shimmer-btn"
          aria-hidden
        />
      )}

      {/* ── Popular badge ── */}
      {app.popular && !app.featured && (
        <div
          className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black z-10"
          style={{
            background: 'rgba(245,158,11,0.12)',
            color: '#fbbf24',
            border: '1px solid rgba(245,158,11,0.30)',
          }}
        >
          <Zap className="w-2.5 h-2.5" />
          Hot
        </div>
      )}

      <div className="p-5 sm:p-6">

        {/* ── Header Row ── */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-4 min-w-0 flex-1">

            {/* ── App Icon ── */}
            <div
              onClick={() => onSelectApp ? onSelectApp(app) : null}
              className="w-[68px] h-[68px] sm:w-[76px] sm:h-[76px] rounded-2xl shrink-0 cursor-pointer overflow-hidden relative"
              style={{
                background: 'rgba(90,95,242,0.07)',
                border: '1px solid rgba(90,95,242,0.14)',
                boxShadow: '0 4px 20px rgba(90,95,242,0.12), 0 1px 3px rgba(0,0,0,0.06)',
                padding: '4px',
                transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.08) rotate(-2deg)';
                e.currentTarget.style.boxShadow = '0 8px 28px rgba(90,95,242,0.28), 0 2px 6px rgba(0,0,0,0.10)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(90,95,242,0.12), 0 1px 3px rgba(0,0,0,0.06)';
              }}
            >
              {renderAppIcon()}
            </div>

            {/* ── Title & Publisher ── */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3
                  onClick={() => onSelectApp ? onSelectApp(app) : null}
                  className="font-black text-base sm:text-lg truncate cursor-pointer transition-colors duration-200"
                  style={{ color: 'var(--text-primary)' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-primary)'}
                >
                  {app.name}
                </h3>
                <ShieldCheck
                  className="w-4 h-4 shrink-0"
                  style={{ color: '#10b981' }}
                  title="Verified Safe"
                />
              </div>

              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                <span
                  className="text-[11px] font-black px-2.5 py-0.5 rounded-full border shrink-0"
                  style={{
                    background: licenseStyle.bg,
                    color: licenseStyle.color,
                    borderColor: licenseStyle.border,
                  }}
                >
                  {app.licenseType}
                </span>
                <span className="text-xs truncate" style={{ color: 'var(--text-secondary)' }}>
                  {app.publisher}
                </span>
              </div>
            </div>
          </div>

          {/* ── Bookmark Button ── */}
          {onToggleFavorite && (
            <button
              onClick={(e) => { e.stopPropagation(); onToggleFavorite(app.id); }}
              className="p-2 rounded-xl border transition-all shrink-0 cursor-pointer active:scale-90"
              style={{
                background: isFavorite ? 'rgba(245,158,11,0.12)' : 'rgba(90,95,242,0.06)',
                borderColor: isFavorite ? 'rgba(245,158,11,0.35)' : 'rgba(90,95,242,0.14)',
                color: isFavorite ? '#fbbf24' : 'var(--text-secondary)',
                boxShadow: isFavorite ? '0 2px 12px rgba(245,158,11,0.20)' : 'none',
                transition: 'all 0.2s cubic-bezier(0.34,1.56,0.64,1)',
              }}
              title={isFavorite ? 'Remove from Saved' : 'Save App'}
              onMouseEnter={e => {
                if (!isFavorite) {
                  e.currentTarget.style.background = 'rgba(245,158,11,0.10)';
                  e.currentTarget.style.borderColor = 'rgba(245,158,11,0.28)';
                  e.currentTarget.style.color = '#fbbf24';
                }
              }}
              onMouseLeave={e => {
                if (!isFavorite) {
                  e.currentTarget.style.background = 'rgba(90,95,242,0.06)';
                  e.currentTarget.style.borderColor = 'rgba(90,95,242,0.14)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }
              }}
            >
              <Bookmark
                className={`w-4 h-4 transition-all duration-200 ${isFavorite ? 'fill-amber-400 text-amber-400 scale-110' : ''}`}
              />
            </button>
          )}
        </div>

        {/* ── Rating & Downloads ── */}
        <div className="flex items-center gap-4 mt-4 text-xs" style={{ color: 'var(--text-secondary)' }}>
          {/* Stars */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl"
            style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.20)' }}
          >
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-3 h-3"
                  style={{
                    fill: i < Math.round(app.rating) ? '#fbbf24' : 'transparent',
                    color: '#fbbf24',
                  }}
                />
              ))}
            </div>
            <span className="font-black ml-0.5" style={{ color: '#fbbf24' }}>{app.rating}</span>
            <span style={{ color: 'var(--text-muted)' }}>({(app.reviewCount / 1000).toFixed(1)}k)</span>
          </div>

          {/* Downloads */}
          <div className="flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
            <Download className="w-3 h-3" style={{ color: 'var(--accent-primary)' }} />
            <span className="font-bold" style={{ color: 'var(--text-primary)' }}>{app.downloadsCount}</span>
            <span>downloads</span>
          </div>
        </div>

        {/* ── Description ── */}
        <p
          className="mt-3 text-xs sm:text-sm line-clamp-2 leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          {app.description}
        </p>

        {/* ── Platform Selector ── */}
        <div className="mt-4">
          <div
            className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider mb-2"
            style={{ color: 'var(--text-muted)' }}
          >
            <span>Select Platform</span>
            <span style={{ color: 'var(--accent-primary)' }} className="capitalize">{activePlatform}</span>
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
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[11px] font-black transition-all cursor-pointer active:scale-95"
                  style={getPlatformStyle(platform, isSelected)}
                  title={`Select ${platform}`}
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

      {/* ── Footer Action Bar ── */}
      <div
        className="px-4 sm:px-5 py-4 space-y-2.5"
        style={{
          background: 'rgba(90,95,242,0.03)',
          borderTop: '1px solid rgba(90,95,242,0.08)',
        }}
      >
        {/* Secondary Links */}
        <div className="grid grid-cols-2 gap-2">
          <a
            href={app.officialWebsite}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all"
            style={{
              background: 'rgba(90,95,242,0.06)',
              border: '1px solid rgba(90,95,242,0.14)',
              color: 'var(--text-secondary)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(90,95,242,0.12)';
              e.currentTarget.style.color = 'var(--accent-primary)';
              e.currentTarget.style.borderColor = 'rgba(90,95,242,0.30)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(90,95,242,0.06)';
              e.currentTarget.style.color = 'var(--text-secondary)';
              e.currentTarget.style.borderColor = 'rgba(90,95,242,0.14)';
            }}
            title="Visit Official Website"
          >
            <Globe className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--accent-primary)' }} />
            <span className="truncate">Official Site</span>
            <ExternalLink className="w-3 h-3 shrink-0 opacity-60" />
          </a>

          <a
            href={platformUrls.mirrorUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all"
            style={{
              background: 'rgba(16,185,129,0.06)',
              border: '1px solid rgba(16,185,129,0.20)',
              color: '#10b981',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(16,185,129,0.12)';
              e.currentTarget.style.borderColor = 'rgba(16,185,129,0.35)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(16,185,129,0.06)';
              e.currentTarget.style.borderColor = 'rgba(16,185,129,0.20)';
            }}
            title={`Get on ${app.mirrorLabel || 'GetIntoPC Pro'}`}
          >
            <HardDrive className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{app.mirrorLabel || 'GetIntoPC Pro'}</span>
            <ExternalLink className="w-3 h-3 shrink-0 opacity-60" />
          </a>
        </div>

        {/* ── Main Download CTA ── */}
        <a
          href={platformUrls.downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center justify-center gap-2.5 w-full py-3 rounded-xl text-sm font-black text-white transition-all active:scale-95 shimmer-btn group"
          style={{ boxShadow: '0 4px 20px rgba(90,95,242,0.42)' }}
          onMouseEnter={e => {
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(90,95,242,0.62)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(90,95,242,0.42)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <Download className="w-4 h-4 stroke-[2.5] group-hover:animate-bounce-soft" />
          <span>{platformUrls.label}</span>
        </a>
      </div>
    </div>
  );
}
