'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Download,
  Sun,
  Moon,
  Bookmark,
  PlusCircle,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  Grid,
  TrendingUp,
  Info,
  Home,
  Rocket,
  Wand2,
  Dices,
  ChevronRight
} from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  isDarkMode,
  setIsDarkMode,
  favoritesCount = 0,
  onOpenSubmitModal,
  onOpenQuizModal,
  onOpenSurpriseModal,
  searchQuery,
  setSearchQuery
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled]             = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMobileMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const navItems = [
    { id: 'home',       label: 'Home',       href: '/',           icon: Home },
    { id: 'categories', label: 'Categories', href: '/categories', icon: Grid },
    { id: 'popular',    label: 'Popular',    href: '/popular',    icon: TrendingUp },
    { id: 'favorites',  label: 'Saved',      href: '/favorites',  icon: Bookmark, badge: favoritesCount },
    { id: 'about',      label: 'Safety',     href: '/about',      icon: ShieldCheck },
  ];

  const handleNavClick = (item) => {
    if (setActiveTab) setActiveTab(item.id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className="sticky top-0 z-40 w-full glass-effect border-b transition-all duration-300"
        style={{
          borderColor: scrolled ? 'rgba(90,95,242,0.20)' : 'rgba(90,95,242,0.10)',
          boxShadow: scrolled
            ? '0 4px 32px rgba(0,0,0,0.10), 0 1px 0 rgba(90,95,242,0.08)'
            : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-[72px]">

            {/* ── Logo ── */}
            <Link
              href="/"
              className="flex items-center gap-3 cursor-pointer group shrink-0"
              onClick={() => handleNavClick({ id: 'home' })}
            >
              {/* Animated Icon Box */}
              <div className="relative">
                {/* Glow ring */}
                <div
                  className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(90,95,242,0.4), rgba(124,58,237,0.4), rgba(6,182,212,0.3))',
                    filter: 'blur(6px)',
                  }}
                />
                <div
                  className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0 group-hover:scale-105 transition-transform duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #5a5ff2 0%, #7c3aed 55%, #06b6d4 100%)',
                    boxShadow: '0 4px 20px rgba(90,95,242,0.50)',
                  }}
                >
                  <Rocket className="w-5 h-5" />
                </div>
              </div>

              {/* Brand Text */}
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-xl sm:text-2xl tracking-tight gradient-text">
                    AppScout
                  </span>
                  <span
                    className="text-[10px] font-black px-2 py-0.5 rounded-full badge-success hidden xs:inline-flex"
                  >
                    FREE
                  </span>
                </div>
                <p
                  className="text-[11px] font-medium hidden sm:block"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Safe & Official Free Software
                </p>
              </div>
            </Link>

            {/* ── Desktop Nav ── */}
            <nav className="hidden md:flex items-center gap-0.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => handleNavClick(item)}
                    className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 group"
                    style={{
                      color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                      background: isActive
                        ? 'linear-gradient(135deg, rgba(90,95,242,0.10), rgba(124,58,237,0.07))'
                        : 'transparent',
                    }}
                    onMouseEnter={e => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'rgba(90,95,242,0.07)';
                        e.currentTarget.style.color = 'var(--text-primary)';
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = 'var(--text-secondary)';
                      }
                    }}
                  >
                    <Icon
                      className="w-4 h-4 transition-transform duration-200 group-hover:scale-110"
                      style={{ color: isActive ? 'var(--accent-primary)' : 'inherit' }}
                    />
                    <span>{item.label}</span>
                    {item.badge > 0 && (
                      <span
                        className="min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-black rounded-full text-white px-1 shimmer-btn"
                      >
                        {item.badge}
                      </span>
                    )}
                    {/* Active underline */}
                    {isActive && (
                      <span
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full"
                        style={{
                          width: '60%',
                          background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-violet))',
                          boxShadow: '0 0 8px var(--glow-primary)',
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* ── Right Controls ── */}
            <div className="flex items-center gap-2 sm:gap-2.5">

              {/* AI Matcher — primary CTA */}
              {onOpenQuizModal && (
                <button
                  onClick={onOpenQuizModal}
                  id="navbar-ai-matcher-btn"
                  className="hidden sm:flex items-center gap-2 px-4 py-2.5 text-xs font-black rounded-xl text-white shimmer-btn shadow-lg cursor-pointer transition-all hover:scale-105 active:scale-95"
                  style={{ boxShadow: '0 4px 20px rgba(90,95,242,0.45)' }}
                >
                  <Wand2 className="w-3.5 h-3.5 text-amber-300 animate-bounce-soft" />
                  <span>AI Matcher</span>
                </button>
              )}

              {/* Surprise Me */}
              {onOpenSurpriseModal && (
                <button
                  onClick={onOpenSurpriseModal}
                  id="navbar-surprise-btn"
                  className="hidden lg:flex items-center gap-1.5 px-3 py-2.5 text-xs font-bold rounded-xl cursor-pointer transition-all hover:scale-105 active:scale-95"
                  style={{
                    background: 'rgba(245,158,11,0.08)',
                    color: '#fbbf24',
                    border: '1px solid rgba(245,158,11,0.22)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(245,158,11,0.14)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(245,158,11,0.20)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(245,158,11,0.08)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <Dices className="w-3.5 h-3.5" />
                  <span>Surprise 🎲</span>
                </button>
              )}

              {/* Submit App */}
              {onOpenSubmitModal && (
                <button
                  onClick={onOpenSubmitModal}
                  id="navbar-submit-btn"
                  className="hidden xl:flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold rounded-xl cursor-pointer transition-all"
                  style={{
                    background: 'rgba(90,95,242,0.07)',
                    color: 'var(--accent-primary)',
                    border: '1px solid rgba(90,95,242,0.18)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(90,95,242,0.13)';
                    e.currentTarget.style.borderColor = 'rgba(90,95,242,0.35)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(90,95,242,0.07)';
                    e.currentTarget.style.borderColor = 'rgba(90,95,242,0.18)';
                  }}
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Submit App</span>
                </button>
              )}

              {/* Theme Toggle */}
              {setIsDarkMode && (
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  suppressHydrationWarning
                  id="navbar-theme-toggle"
                  className="relative p-2.5 rounded-xl cursor-pointer active:scale-95 transition-all overflow-hidden"
                  style={{
                    background: 'rgba(90,95,242,0.07)',
                    border: '1px solid rgba(90,95,242,0.18)',
                    color: 'var(--text-secondary)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(90,95,242,0.14)';
                    e.currentTarget.style.borderColor = 'rgba(90,95,242,0.35)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(90,95,242,0.07)';
                    e.currentTarget.style.borderColor = 'rgba(90,95,242,0.18)';
                  }}
                  title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                  aria-label="Toggle theme"
                >
                  {isDarkMode ? (
                    <Sun className="w-5 h-5 text-amber-400" />
                  ) : (
                    <Moon className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
                  )}
                </button>
              )}

              {/* Mobile Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                id="navbar-mobile-menu-toggle"
                className="p-2.5 md:hidden rounded-xl cursor-pointer transition-all"
                style={{
                  background: mobileMenuOpen ? 'rgba(90,95,242,0.14)' : 'rgba(90,95,242,0.07)',
                  border: '1px solid rgba(90,95,242,0.18)',
                  color: 'var(--text-secondary)',
                }}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen
                  ? <X className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
                  : <Menu className="w-5 h-5" />
                }
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile Full-screen Drawer ── */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          style={{ top: '64px' }}
        >
          {/* Blur Backdrop */}
          <div
            className="absolute inset-0 modal-backdrop"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Panel */}
          <div
            className="relative w-full animate-slide-up overflow-y-auto"
            style={{
              background: 'var(--bg-glass)',
              backdropFilter: 'blur(28px) saturate(200%)',
              WebkitBackdropFilter: 'blur(28px) saturate(200%)',
              borderBottom: '1px solid rgba(90,95,242,0.15)',
              maxHeight: 'calc(100vh - 64px)',
              boxShadow: '0 24px 60px rgba(0,0,0,0.3)',
            }}
          >
            <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col gap-2">

              {/* Nav Items */}
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => handleNavClick(item)}
                    className="flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-bold transition-all"
                    style={{
                      background: isActive
                        ? 'linear-gradient(135deg, #5a5ff2, #7c3aed)'
                        : 'rgba(90,95,242,0.05)',
                      color: isActive ? 'white' : 'var(--text-primary)',
                      border: `1px solid ${isActive ? 'transparent' : 'rgba(90,95,242,0.10)'}`,
                      boxShadow: isActive ? '0 4px 18px rgba(90,95,242,0.35)' : 'none',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center"
                        style={{
                          background: isActive ? 'rgba(255,255,255,0.18)' : 'rgba(90,95,242,0.10)',
                        }}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span>{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.badge > 0 && (
                        <span
                          className="px-2 py-0.5 text-xs font-black rounded-full"
                          style={{
                            background: isActive ? 'rgba(255,255,255,0.25)' : 'linear-gradient(135deg,#5a5ff2,#7c3aed)',
                            color: 'white',
                          }}
                        >
                          {item.badge}
                        </span>
                      )}
                      <ChevronRight className="w-4 h-4 opacity-50" />
                    </div>
                  </Link>
                );
              })}

              {/* Divider */}
              <div className="glow-divider my-1" />

              {/* Action Buttons */}
              {onOpenQuizModal && (
                <button
                  onClick={() => { onOpenQuizModal(); setMobileMenuOpen(false); }}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-black text-white shimmer-btn cursor-pointer"
                  style={{ boxShadow: '0 4px 18px rgba(90,95,242,0.40)' }}
                >
                  <Wand2 className="w-5 h-5 text-amber-300" />
                  <span>AI Software Matcher</span>
                </button>
              )}

              {onOpenSurpriseModal && (
                <button
                  onClick={() => { onOpenSurpriseModal(); setMobileMenuOpen(false); }}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold cursor-pointer"
                  style={{
                    background: 'rgba(245,158,11,0.10)',
                    color: '#fbbf24',
                    border: '1px solid rgba(245,158,11,0.22)',
                  }}
                >
                  <Dices className="w-5 h-5" />
                  <span>Surprise Me 🎲</span>
                </button>
              )}

              {onOpenSubmitModal && (
                <button
                  onClick={() => { onOpenSubmitModal(); setMobileMenuOpen(false); }}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold cursor-pointer"
                  style={{
                    background: 'rgba(90,95,242,0.08)',
                    color: 'var(--accent-primary)',
                    border: '1px solid rgba(90,95,242,0.18)',
                  }}
                >
                  <PlusCircle className="w-5 h-5" />
                  <span>Submit Free App</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
