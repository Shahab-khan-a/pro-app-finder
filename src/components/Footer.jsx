'use client';

import React from 'react';
import Link from 'next/link';
import {
  Rocket,
  ShieldCheck,
  Heart,
  ExternalLink,
  Mail,
  GitBranch,
  Share2,
  ArrowRight,
  Star,
  Download,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import { CATEGORIES } from '@/data/appsData';

export default function Footer({ setActiveTab, onOpenSubmitModal }) {
  const handleNav = (tabId) => {
    if (setActiveTab) setActiveTab(tabId);
  };

  const navLinks = [
    { href: '/',           tab: 'home',       label: 'Home & Search' },
    { href: '/categories', tab: 'categories', label: 'Categories Directory' },
    { href: '/popular',    tab: 'popular',    label: 'Popular Apps' },
    { href: '/favorites',  tab: 'favorites',  label: 'Saved Bookmarks' },
    { href: '/about',      tab: 'about',      label: 'About & Safety' },
  ];

  const trustStats = [
    { icon: Download,     value: '100K+', label: 'Apps Indexed',    color: '#818cf8' },
    { icon: ShieldCheck,  value: '100%',  label: 'Malware Free',    color: '#34d399' },
    { icon: Star,         value: '4.9★',  label: 'Avg Rating',      color: '#fbbf24' },
    { icon: CheckCircle,  value: 'Daily', label: 'Updates',         color: '#22d3ee' },
  ];

  return (
    <footer
      className="mt-20 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, var(--bg-primary) 0%, #020510 100%)',
        borderTop: '1px solid rgba(90,95,242,0.14)',
      }}
    >
      {/* ── Top glow divider ── */}
      <div className="glow-divider" />

      {/* ── Background blobs ── */}
      <div
        className="absolute bottom-0 left-1/4 w-96 h-96 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(90,95,242,0.07) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />
      <div
        className="absolute top-20 right-1/5 w-72 h-72 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(90,95,242,0.5) 30%, rgba(124,58,237,0.4) 50%, rgba(6,182,212,0.4) 70%, transparent)',
        }}
      />

      {/* ── Trust Stats Bar ── */}
      <div
        className="border-b"
        style={{ borderColor: 'rgba(90,95,242,0.10)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {trustStats.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="flex flex-col items-center gap-1.5 py-3 rounded-2xl"
                  style={{
                    background: `${s.color}08`,
                    border: `1px solid ${s.color}18`,
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: s.color }} />
                  <span className="text-xl font-black" style={{ color: s.color }}>{s.value}</span>
                  <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>{s.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* ── Col 1: Brand ── */}
          <div className="md:col-span-1 space-y-5">
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #5a5ff2, #7c3aed, #06b6d4)',
                  boxShadow: '0 4px 20px rgba(90,95,242,0.45)',
                }}
              >
                <Rocket className="w-5 h-5" />
              </div>
              <div>
                <span className="font-black text-xl gradient-text">AppScout</span>
                <p className="text-[11px] font-medium" style={{ color: 'var(--text-muted)' }}>
                  Free Software Directory
                </p>
              </div>
            </div>

            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Your trusted directory for discovering 100% free, open-source, and freemium desktop and mobile software with verified direct official download links.
            </p>

            <div
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold"
              style={{
                background: 'rgba(16,185,129,0.08)',
                color: '#10b981',
                border: '1px solid rgba(16,185,129,0.22)',
              }}
            >
              <ShieldCheck className="w-4 h-4" style={{ color: '#34d399' }} />
              <span>Zero Malware Guarantee</span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-1">
              {[
                { icon: GitBranch, label: 'GitHub', color: '#818cf8' },
                { icon: Share2,    label: 'Share',  color: '#22d3ee' },
                { icon: Mail,      label: 'Email',  color: '#34d399' },
              ].map(({ icon: Icon, label, color }) => (
                <button
                  key={label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer"
                  style={{
                    background: `${color}0f`,
                    border: `1px solid ${color}22`,
                    color: 'var(--text-muted)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = `${color}1e`;
                    e.currentTarget.style.borderColor = `${color}44`;
                    e.currentTarget.style.color = color;
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = `0 4px 14px ${color}30`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = `${color}0f`;
                    e.currentTarget.style.borderColor = `${color}22`;
                    e.currentTarget.style.color = 'var(--text-muted)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  title={label}
                  aria-label={label}
                  style={{
                    background: `${color}0f`,
                    border: `1px solid ${color}22`,
                    color: 'var(--text-muted)',
                    transition: 'all 0.22s cubic-bezier(0.34,1.56,0.64,1)',
                  }}
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* ── Col 2: Navigation ── */}
          <div>
            <h4
              className="text-xs font-black uppercase tracking-widest mb-5"
              style={{ color: 'var(--text-primary)' }}
            >
              Navigation
            </h4>
            <ul className="space-y-3 text-sm font-medium">
              {navLinks.map(({ href, tab, label }) => (
                <li key={tab}>
                  <Link
                    href={href}
                    onClick={() => handleNav(tab)}
                    className="flex items-center gap-2 group transition-all duration-200"
                    style={{ color: 'var(--text-secondary)' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >
                    <ArrowRight
                      className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200"
                      style={{ color: 'var(--accent-primary)' }}
                    />
                    <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                      {label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Popular Categories ── */}
          <div>
            <h4
              className="text-xs font-black uppercase tracking-widest mb-5"
              style={{ color: 'var(--text-primary)' }}
            >
              Popular Categories
            </h4>
            <ul className="space-y-3 text-sm font-medium">
              {CATEGORIES.slice(1, 7).map((c) => (
                <li key={c.id}>
                  <Link
                    href="/categories"
                    onClick={() => handleNav('categories')}
                    className="flex items-center gap-2 group transition-all duration-200"
                    style={{ color: 'var(--text-secondary)' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >
                    <ArrowRight
                      className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200"
                      style={{ color: 'var(--accent-primary)' }}
                    />
                    <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                      {c.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 4: Submit CTA ── */}
          <div className="space-y-5">
            <h4
              className="text-xs font-black uppercase tracking-widest"
              style={{ color: 'var(--text-primary)' }}
            >
              Submit & Support
            </h4>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Know an awesome free app that should be listed? Submit it to our verified index.
            </p>

            {/* Submit CTA Card */}
            {onOpenSubmitModal && (
              <div
                className="p-5 rounded-2xl space-y-3 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(90,95,242,0.10), rgba(124,58,237,0.07))',
                  border: '1px solid rgba(90,95,242,0.22)',
                }}
              >
                {/* Shimmer line */}
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(90,95,242,0.5), rgba(124,58,237,0.4), transparent)',
                  }}
                />

                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <p className="text-xs font-bold" style={{ color: 'var(--text-secondary)' }}>
                    Help grow the community 🌍
                  </p>
                </div>

                <button
                  onClick={onOpenSubmitModal}
                  className="w-full px-4 py-3 rounded-xl text-xs font-black text-white cursor-pointer transition-all hover:scale-105 active:scale-95 shimmer-btn"
                  style={{ boxShadow: '0 4px 18px rgba(90,95,242,0.42)' }}
                >
                  Submit Free App
                </button>
              </div>
            )}

            {/* Trust Dots */}
            <div className="flex flex-col gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
              {[
                { color: '#34d399', text: '100% Free & Open Source' },
                { color: '#818cf8', text: 'Zero Ads, Zero Tracking' },
                { color: '#fbbf24', text: 'Community Verified Links' },
              ].map(({ color, text }) => (
                <span key={text} className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: color, boxShadow: `0 0 6px ${color}` }}
                  />
                  {text}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div
          className="mt-14 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
          style={{
            borderTop: '1px solid rgba(90,95,242,0.10)',
            color: 'var(--text-muted)',
          }}
        >
          <p>© {new Date().getFullYear()} AppScout. All rights reserved. Free software directory for Windows, Mac, Linux, Android & iOS.</p>
          <p className="flex items-center gap-2 font-medium">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-bounce-soft" />
            <span>for open source software.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
