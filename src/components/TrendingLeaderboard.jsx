'use client';

import React, { useState, useEffect } from 'react';
import { Flame, Heart, Star, ExternalLink, Trophy, Sparkles, TrendingUp, ArrowRight, ShieldCheck } from 'lucide-react';
import { APPS_DATA } from '@/data/appsData';

export default function TrendingLeaderboard({ onSelectApp }) {
  const [upvotes, setUpvotes] = useState({
    capcut: 2450,
    wink: 1980,
    vscode: 1840,
    bitwarden: 1620,
    remini: 1490
  });
  const [userVoted, setUserVoted] = useState({});

  useEffect(() => {
    try {
      const savedVotes = localStorage.getItem('appfinder_upvotes');
      const savedUserVoted = localStorage.getItem('appfinder_uservoted');
      if (savedVotes) setUpvotes(JSON.parse(savedVotes));
      if (savedUserVoted) setUserVoted(JSON.parse(savedUserVoted));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleUpvote = (e, appId) => {
    e.stopPropagation();
    if (userVoted[appId]) return;

    const newUpvotes = { ...upvotes, [appId]: (upvotes[appId] || 1000) + 1 };
    const newUserVoted = { ...userVoted, [appId]: true };

    setUpvotes(newUpvotes);
    setUserVoted(newUserVoted);

    try {
      localStorage.setItem('appfinder_upvotes', JSON.stringify(newUpvotes));
      localStorage.setItem('appfinder_uservoted', JSON.stringify(newUserVoted));
    } catch (err) {
      console.error(err);
    }
  };

  // Top 5 apps for leaderboard
  const leaderboardApps = [
    APPS_DATA.find(a => a.id === 'capcut') || APPS_DATA[0],
    APPS_DATA.find(a => a.id === 'wink') || APPS_DATA[1],
    APPS_DATA.find(a => a.id === 'vscode') || APPS_DATA[2],
    APPS_DATA.find(a => a.id === 'bitwarden') || APPS_DATA[3],
    APPS_DATA.find(a => a.id === 'remini') || APPS_DATA[4],
  ].map((app, idx) => ({
    ...app,
    rank: idx + 1,
    votes: upvotes[app.id] || 1500 - idx * 200,
    hasVoted: !!userVoted[app.id]
  }));

  const rankBadges = [
    { label: '#1 👑 Top Pick', bg: 'linear-gradient(135deg, #f59e0b, #d97706)', glow: 'rgba(245,158,11,0.35)' },
    { label: '#2 🔥 Hot Pick', bg: 'linear-gradient(135deg, #ef4444, #e11d48)', glow: 'rgba(239,68,68,0.35)' },
    { label: '#3 ⚡ Trending', bg: 'linear-gradient(135deg, #5a5ff2, #7c3aed)', glow: 'rgba(90,95,242,0.35)' },
    { label: '#4 🛡️ Essential', bg: 'linear-gradient(135deg, #10b981, #059669)', glow: 'rgba(16,185,129,0.35)' },
    { label: '#5 🌟 Popular', bg: 'linear-gradient(135deg, #8b5cf6, #c026d3)', glow: 'rgba(139,92,246,0.35)' },
  ];

  return (
    <section className="my-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div 
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black mb-2.5"
            style={{
              background: 'rgba(245,158,11,0.10)',
              color: '#fbbf24',
              border: '1px solid rgba(245,158,11,0.25)',
            }}
          >
            <Flame className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>Community Voted Leaderboard</span>
          </div>

          <h3 
            className="text-2xl sm:text-3xl font-black tracking-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            🔥 Trending Software This Week
          </h3>
          
          <p className="text-xs sm:text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            Voted by thousands of creators and developers. Upvote your favorite free tools!
          </p>
        </div>
      </div>

      {/* ── Leaderboard Cards Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {leaderboardApps.map((app) => {
          const rankInfo = rankBadges[app.rank - 1];
          return (
            <div
              key={app.id}
              onClick={() => onSelectApp && onSelectApp(app)}
              className="relative p-5 rounded-3xl glass-card card-hover-glow flex flex-col justify-between cursor-pointer group overflow-hidden"
              style={{
                border: '1px solid rgba(90,95,242,0.14)',
              }}
            >
              <div>
                {/* Rank Badge & Rating */}
                <div className="flex items-center justify-between mb-4">
                  <span 
                    className="px-2.5 py-1 rounded-full text-[11px] font-black text-white shadow-sm"
                    style={{
                      background: rankInfo.bg,
                      boxShadow: `0 2px 10px ${rankInfo.glow}`,
                    }}
                  >
                    {rankInfo.label}
                  </span>
                  
                  <div 
                    className="flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-bold"
                    style={{
                      background: 'rgba(251,191,36,0.10)',
                      color: '#fbbf24',
                    }}
                  >
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{app.rating}</span>
                  </div>
                </div>

                {/* App Icon & Title */}
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-2xl p-1 shrink-0 overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform duration-200"
                    style={{
                      background: 'rgba(90,95,242,0.08)',
                      border: '1px solid rgba(90,95,242,0.18)',
                    }}
                  >
                    <img
                      src={app.icon}
                      alt={app.name}
                      className="w-full h-full object-contain rounded-xl"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(app.name)}&background=5a5ff2&color=ffffff&bold=true&size=128`;
                      }}
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1">
                      <h4 
                        className="font-black text-sm truncate group-hover:text-indigo-400 transition-colors"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {app.name}
                      </h4>
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    </div>
                    <p className="text-[11px] truncate mt-0.5" style={{ color: 'var(--text-muted)' }}>
                      {app.categoryName}
                    </p>
                  </div>
                </div>

                <p 
                  className="text-xs mt-3.5 line-clamp-2 font-normal leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {app.tagline}
                </p>
              </div>

              {/* Upvote & View CTA */}
              <div 
                className="mt-4 pt-3.5 flex items-center justify-between"
                style={{ borderTop: '1px solid rgba(90,95,242,0.10)' }}
              >
                <button
                  onClick={(e) => handleUpvote(e, app.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                    app.hasVoted
                      ? 'bg-rose-500 text-white shadow-md shadow-rose-500/25 scale-105'
                      : 'bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white border border-rose-500/20'
                  }`}
                  title={app.hasVoted ? 'You upvoted this app!' : 'Click to upvote'}
                >
                  <Heart className={`w-3.5 h-3.5 ${app.hasVoted ? 'fill-white' : 'fill-rose-500'}`} />
                  <span>{app.votes.toLocaleString()}</span>
                </button>

                <span 
                  className="text-xs font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  style={{ color: 'var(--accent-primary)' }}
                >
                  <span>Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
