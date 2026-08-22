'use client';

import React, { useState, useEffect } from 'react';
import { Flame, Heart, Star, ExternalLink, Trophy, Sparkles, TrendingUp } from 'lucide-react';
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
    { label: '#1 👑 Top Pick', color: 'from-amber-500 to-orange-500 text-white' },
    { label: '#2 🔥 Hot Pick', color: 'from-rose-500 to-pink-500 text-white' },
    { label: '#3 ⚡ Trending', color: 'from-blue-600 to-indigo-600 text-white' },
    { label: '#4 🛡️ Essential', color: 'from-emerald-600 to-teal-600 text-white' },
    { label: '#5 🌟 Popular', color: 'from-purple-600 to-violet-600 text-white' },
  ];

  return (
    <section className="my-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-black mb-2">
            <Flame className="w-3.5 h-3.5 fill-amber-500" /> Community Favorites
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span>🔥 Weekly Software Leaderboard</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Voted by thousands of active creators and developers. Upvote your favorite software!
          </p>
        </div>
      </div>

      {/* Leaderboard Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5">
        {leaderboardApps.map((app) => {
          const rankInfo = rankBadges[app.rank - 1];
          return (
            <div
              key={app.id}
              onClick={() => onSelectApp && onSelectApp(app)}
              className="relative p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-lg flex flex-col justify-between cursor-pointer group"
            >
              <div>
                {/* Rank Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-black bg-gradient-to-r ${rankInfo.color} shadow-xs`}>
                    {rankInfo.label}
                  </span>
                  <span className="text-xs font-bold text-amber-500 flex items-center gap-0.5">
                    <Star className="w-3 h-3 fill-amber-400" /> {app.rating}
                  </span>
                </div>

                {/* App Icon & Title */}
                <div className="flex items-center gap-3">
                  <img
                    src={app.icon}
                    alt={app.name}
                    className="w-11 h-11 rounded-xl object-cover border border-slate-200 dark:border-slate-700 bg-white shrink-0 group-hover:scale-105 transition"
                  />
                  <div className="min-w-0">
                    <h4 className="font-black text-sm text-slate-900 dark:text-white truncate">{app.name}</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{app.categoryName}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 line-clamp-2 font-normal">
                  {app.tagline}
                </p>
              </div>

              {/* Upvote Reaction Button */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <button
                  onClick={(e) => handleUpvote(e, app.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer ${
                    app.hasVoted
                      ? 'bg-rose-500 text-white shadow-xs'
                      : 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-500 hover:text-white'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${app.hasVoted ? 'fill-white' : 'fill-rose-500'}`} />
                  <span>{app.votes.toLocaleString()}</span>
                </button>

                <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                  View →
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
