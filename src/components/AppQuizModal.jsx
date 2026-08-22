'use client';

import React, { useState, useMemo } from 'react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Top Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm">
              <Wand2 className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight flex items-center gap-2">
                AI Software Finder & Matcher
              </h3>
              <p className="text-xs text-blue-100/90 font-medium">Answer 3 quick questions to get your tailored software recommendations</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-xs font-semibold text-slate-500 shrink-0">
          <span>{step <= 3 ? `Step ${step} of 3` : 'Your Recommendations'}</span>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3].map(s => (
              <div 
                key={s} 
                className={`h-2 rounded-full transition-all duration-300 ${
                  step === s ? 'w-6 bg-blue-600' : step > s ? 'w-2 bg-emerald-500' : 'w-2 bg-slate-300 dark:bg-slate-700'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
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
                      className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                        isSelected
                          ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-600 dark:border-blue-500 shadow-md ring-2 ring-blue-500/20'
                          : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-slate-900 dark:text-white">{g.label}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{g.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
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
                      className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                        isSelected
                          ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-600 dark:border-blue-500 shadow-md ring-2 ring-blue-500/20'
                          : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="font-bold text-sm text-slate-900 dark:text-white">{p.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                3. What type of license or pricing model do you prefer?
              </h4>
              <div className="grid grid-cols-1 gap-3">
                {LICENSES.map((l) => {
                  const isSelected = selectedLicense === l.id;
                  return (
                    <button
                      key={l.id}
                      onClick={() => setSelectedLicense(l.id)}
                      className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-600 dark:border-blue-500 shadow-md ring-2 ring-blue-500/20'
                          : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="font-bold text-sm text-slate-900 dark:text-white">{l.label}</div>
                      {isSelected && <CheckCircle2 className="w-5 h-5 text-blue-600" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="text-center pb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-extrabold mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Matches Ready!
                </span>
                <h4 className="text-xl font-black text-slate-900 dark:text-white">
                  Top Recommended Software Apps for You
                </h4>
              </div>

              <div className="space-y-3">
                {matchedApps.map((app) => (
                  <div 
                    key={app.id}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 hover:border-blue-500 dark:hover:border-blue-500 transition shadow-sm hover:shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <img 
                        src={app.icon} 
                        alt={app.name}
                        className="w-12 h-12 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 bg-white shrink-0"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://www.google.com/s2/favicons?domain=github.com&sz=128';
                        }}
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h5 className="font-extrabold text-base text-slate-900 dark:text-white truncate">{app.name}</h5>
                          <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[11px] font-black shadow-xs">
                            {app.matchScore}% Match
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[11px] font-bold flex items-center gap-1">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {app.rating}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-1">{app.tagline}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200 dark:border-slate-700">
                      <button
                        onClick={() => {
                          onClose();
                          if (onSelectApp) onSelectApp(app);
                        }}
                        className="flex-1 sm:flex-initial px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer"
                      >
                        View Details
                      </button>
                      <a
                        href={app.officialWebsite || app.downloadUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-xl transition cursor-pointer"
                        title="Download / Visit Official Site"
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

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
          {step > 1 && step <= 4 ? (
            <button
              onClick={() => (step === 4 ? resetQuiz() : setStep(prev => prev - 1))}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{step === 4 ? 'Retake Quiz' : 'Back'}</span>
            </button>
          ) : <div />}

          {step < 3 ? (
            <button
              onClick={() => setStep(prev => prev + 1)}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              <span>Next Question</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : step === 3 ? (
            <button
              onClick={() => setStep(4)}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white text-xs font-black shadow-lg hover:shadow-indigo-500/20 transition flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Calculate My Match</span>
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-extrabold shadow-md cursor-pointer"
            >
              Close
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
