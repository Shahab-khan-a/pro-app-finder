'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Sparkles, 
  X, 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw, 
  ExternalLink,
  Star,
  Monitor,
  Apple,
  Terminal,
  Smartphone,
  Wand2,
  Video,
  Code,
  Shield,
  Palette,
  Zap,
  Globe
} from 'lucide-react';
import { APPS_DATA } from '@/data/appsData';

const GOALS = [
  { id: 'video-editing', label: 'Create & Edit Videos / Reels', icon: Video, desc: 'CapCut, Wink, Blender, VLC' },
  { id: 'development', label: 'Code & Build Software', icon: Code, desc: 'VS Code, Git, Postman, Docker' },
  { id: 'security', label: 'Protect Privacy & Security', icon: Shield, desc: 'Bitwarden, ProtonVPN, Brave' },
  { id: 'design', label: 'Graphic Design & 3D Art', icon: Palette, desc: 'Figma, Blender, GIMP, Inkscape' },
  { id: 'productivity', label: 'Productivity & Office Notes', icon: Zap, desc: 'Notion, Obsidian, Anything' },
  { id: 'browsers', label: 'Fast Browsing & Ad Blocking', icon: Globe, desc: 'Brave, Firefox, Chrome' },
];

const PLATFORMS = [
  { id: 'all', label: 'Any Platform', icon: Monitor },
  { id: 'windows', label: 'Windows PC', icon: Monitor },
  { id: 'mac', label: 'macOS / Mac', icon: Apple },
  { id: 'linux', label: 'Linux', icon: Terminal },
  { id: 'android', label: 'Android / Mobile', icon: Smartphone },
];

const LICENSES = [
  { id: 'all', label: 'Any Free / Freemium' },
  { id: '100% Free', label: '100% Free Software' },
  { id: 'Open Source', label: 'Open Source Only' },
];

export default function AppQuizModal({ isOpen, onClose, onSelectApp }) {
  const [step, setStep] = useState(1);
  const [selectedGoal, setSelectedGoal] = useState('video-editing');
  const [selectedPlatform, setSelectedPlatform] = useState('windows');
  const [selectedLicense, setSelectedLicense] = useState('all');

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Compute matched apps
  const matchedApps = useMemo(() => {
    let pool = APPS_DATA.filter(app => {
      // Category match
      let catMatch = app.category === selectedGoal;
      if (!catMatch && selectedGoal === 'productivity') {
        catMatch = app.category === 'productivity' || app.category === 'utilities';
      }

      // Platform match
      let platMatch = selectedPlatform === 'all' || app.platforms.includes(selectedPlatform);

      // License match
      let licMatch = selectedLicense === 'all' || 
        (selectedLicense === '100% Free' && (app.licenseType === '100% Free' || app.licenseType === 'Open Source')) ||
        (selectedLicense === 'Open Source' && app.licenseType === 'Open Source');

      return catMatch && platMatch && licMatch;
    });

    // If pool is empty, fall back to category match only
    if (pool.length === 0) {
      pool = APPS_DATA.filter(app => app.category === selectedGoal);
    }

    // Sort by rating & review count
    pool.sort((a, b) => (b.rating * b.reviewCount) - (a.rating * a.reviewCount));

    return pool.slice(0, 3).map((app, idx) => ({
      ...app,
      matchScore: 99 - idx * 3, // 99%, 96%, 93%
      matchReason: `Matches your requirement for ${GOALS.find(g => g.id === selectedGoal)?.label || 'Productivity'}`
    }));
  }, [selectedGoal, selectedPlatform, selectedLicense]);

  if (!isOpen) return null;

  const resetQuiz = () => {
    setStep(1);
    setSelectedGoal('video-editing');
    setSelectedPlatform('windows');
    setSelectedLicense('all');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-scale-in"
        style={{
          background: 'var(--bg-glass-card)',
          border: '1px solid rgba(90,95,242,0.25)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.4), 0 0 32px rgba(90,95,242,0.20)',
          backdropFilter: 'blur(24px)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* ── Top Header ── */}
        <div 
          className="px-6 py-4 text-white flex items-center justify-between shrink-0 shimmer-btn"
          style={{
            boxShadow: '0 4px 18px rgba(90,95,242,0.30)',
          }}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/15 rounded-xl backdrop-blur-sm">
              <Wand2 className="w-5 h-5 text-amber-300 animate-bounce-soft" />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight flex items-center gap-2">
                AI Software Finder & Matcher
              </h3>
              <p className="text-xs text-white/80 font-medium">Answer 3 quick questions to get tailored recommendations</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition cursor-pointer"
            aria-label="Close quiz"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ── Step Indicator ── */}
        <div 
          className="px-6 py-3 flex items-center justify-between text-xs font-bold shrink-0"
          style={{
            background: 'rgba(90,95,242,0.04)',
            borderBottom: '1px solid rgba(90,95,242,0.10)',
            color: 'var(--text-muted)',
          }}
        >
          <span>{step <= 3 ? `Step ${step} of 3` : 'Your Recommendations'}</span>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3].map(s => (
              <div 
                key={s} 
                className={`h-2 rounded-full transition-all duration-300 ${
                  step === s ? 'w-6 bg-indigo-500' : step > s ? 'w-2 bg-emerald-400' : 'w-2 bg-slate-300 dark:bg-slate-700'
                }`}
              />
            ))}
          </div>
        </div>

        {/* ── Modal Body ── */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="text-base font-black flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <span>1. What primary task do you want to accomplish?</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {GOALS.map((g) => {
                  const Icon = g.icon;
                  const isSelected = selectedGoal === g.id;
                  return (
                    <button
                      key={g.id}
                      onClick={() => setSelectedGoal(g.id)}
                      className="p-4 rounded-2xl border text-left transition-all flex items-start gap-3 cursor-pointer"
                      style={{
                        background: isSelected ? 'rgba(90,95,242,0.12)' : 'var(--bg-secondary)',
                        borderColor: isSelected ? 'rgba(90,95,242,0.60)' : 'rgba(90,95,242,0.12)',
                        boxShadow: isSelected ? '0 4px 18px rgba(90,95,242,0.22)' : 'none',
                      }}
                    >
                      <div 
                        className="p-2.5 rounded-xl shrink-0"
                        style={{
                          background: isSelected ? 'linear-gradient(135deg, #5a5ff2, #7c3aed)' : 'rgba(90,95,242,0.08)',
                          color: isSelected ? '#ffffff' : 'var(--accent-primary)',
                        }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{g.label}</div>
                        <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{g.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h4 className="text-base font-black" style={{ color: 'var(--text-primary)' }}>
                2. Which operating system / device platform do you use?
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PLATFORMS.map((p) => {
                  const Icon = p.icon;
                  const isSelected = selectedPlatform === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPlatform(p.id)}
                      className="p-4 rounded-2xl border text-left transition-all flex items-center gap-3 cursor-pointer"
                      style={{
                        background: isSelected ? 'rgba(90,95,242,0.12)' : 'var(--bg-secondary)',
                        borderColor: isSelected ? 'rgba(90,95,242,0.60)' : 'rgba(90,95,242,0.12)',
                        boxShadow: isSelected ? '0 4px 18px rgba(90,95,242,0.22)' : 'none',
                      }}
                    >
                      <div 
                        className="p-2.5 rounded-xl shrink-0"
                        style={{
                          background: isSelected ? 'linear-gradient(135deg, #5a5ff2, #7c3aed)' : 'rgba(90,95,242,0.08)',
                          color: isSelected ? '#ffffff' : 'var(--accent-primary)',
                        }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{p.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h4 className="text-base font-black" style={{ color: 'var(--text-primary)' }}>
                3. What type of license or pricing model do you prefer?
              </h4>
              <div className="grid grid-cols-1 gap-3">
                {LICENSES.map((l) => {
                  const isSelected = selectedLicense === l.id;
                  return (
                    <button
                      key={l.id}
                      onClick={() => setSelectedLicense(l.id)}
                      className="p-4 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer"
                      style={{
                        background: isSelected ? 'rgba(90,95,242,0.12)' : 'var(--bg-secondary)',
                        borderColor: isSelected ? 'rgba(90,95,242,0.60)' : 'rgba(90,95,242,0.12)',
                        boxShadow: isSelected ? '0 4px 18px rgba(90,95,242,0.22)' : 'none',
                      }}
                    >
                      <div className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{l.label}</div>
                      {isSelected && <CheckCircle2 className="w-5 h-5 text-indigo-500" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="text-center pb-2">
                <span 
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black mb-2"
                  style={{
                    background: 'rgba(52,211,153,0.10)',
                    color: '#34d399',
                    border: '1px solid rgba(52,211,153,0.25)',
                  }}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Matches Ready!
                </span>
                <h4 className="text-xl font-black" style={{ color: 'var(--text-primary)' }}>
                  Top Recommended Software for You
                </h4>
              </div>

              <div className="space-y-3">
                {matchedApps.map((app) => (
                  <div 
                    key={app.id}
                    className="p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm"
                    style={{
                      background: 'var(--bg-secondary)',
                      border: '1px solid rgba(90,95,242,0.15)',
                    }}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <img 
                        src={app.icon} 
                        alt={app.name}
                        className="w-12 h-12 rounded-2xl object-cover p-1 shrink-0"
                        style={{
                          background: 'rgba(90,95,242,0.06)',
                          border: '1px solid rgba(90,95,242,0.12)',
                        }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://www.google.com/s2/favicons?domain=github.com&sz=128';
                        }}
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h5 className="font-black text-base truncate" style={{ color: 'var(--text-primary)' }}>{app.name}</h5>
                          <span 
                            className="px-2.5 py-0.5 rounded-full text-white text-[11px] font-black shimmer-btn"
                          >
                            {app.matchScore}% Match
                          </span>
                          <span 
                            className="px-2 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1"
                            style={{
                              background: 'rgba(251,191,36,0.10)',
                              color: '#fbbf24',
                            }}
                          >
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {app.rating}
                          </span>
                        </div>
                        <p className="text-xs mt-1 line-clamp-1" style={{ color: 'var(--text-secondary)' }}>{app.tagline}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 pt-2 sm:pt-0">
                      <button
                        onClick={() => {
                          onClose();
                          if (onSelectApp) onSelectApp(app);
                        }}
                        className="flex-1 sm:flex-initial px-5 py-2.5 text-white text-xs font-black rounded-xl shimmer-btn cursor-pointer transition hover:scale-105 active:scale-95"
                      >
                        View Details
                      </button>
                      <a
                        href={app.officialWebsite || app.downloadUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2.5 rounded-xl transition cursor-pointer"
                        style={{
                          background: 'rgba(90,95,242,0.08)',
                          color: 'var(--text-primary)',
                        }}
                        title="Visit Official Site"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Footer Actions ── */}
        <div 
          className="px-6 py-4 flex items-center justify-between shrink-0"
          style={{
            background: 'rgba(90,95,242,0.04)',
            borderTop: '1px solid rgba(90,95,242,0.10)',
          }}
        >
          {step > 1 && step <= 4 ? (
            <button
              onClick={() => (step === 4 ? resetQuiz() : setStep(prev => prev - 1))}
              className="px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              style={{
                background: 'rgba(90,95,242,0.08)',
                color: 'var(--text-secondary)',
              }}
            >
              <RotateCcw className="w-4 h-4" />
              <span>{step === 4 ? 'Retake Quiz' : 'Back'}</span>
            </button>
          ) : <div />}

          {step < 3 ? (
            <button
              onClick={() => setStep(prev => prev + 1)}
              className="px-6 py-2.5 rounded-xl text-white text-xs font-black shimmer-btn transition flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
            >
              <span>Next Question</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : step === 3 ? (
            <button
              onClick={() => setStep(4)}
              className="px-6 py-2.5 rounded-xl text-white text-xs font-black shimmer-btn transition flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Calculate My Match</span>
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl text-xs font-black cursor-pointer transition"
              style={{
                background: 'rgba(90,95,242,0.10)',
                color: 'var(--text-primary)',
              }}
            >
              Close
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
