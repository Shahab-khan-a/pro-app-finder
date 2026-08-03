'use client';

import React from 'react';
import Link from 'next/link';
import { Download, ShieldCheck, Heart, ExternalLink } from 'lucide-react';
import { CATEGORIES } from '@/data/appsData';

export default function Footer({ setActiveTab, onOpenSubmitModal }) {
  const handleNav = (tabId) => {
    if (setActiveTab) {
      setActiveTab(tabId);
    }
  };

  return (
    <footer className="mt-20 border-t border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & Tagline */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
                <Download className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                AppFinder
              </span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Your trusted directory for discovering 100% free, open-source, and freemium desktop and mobile software with verified direct official download links.
            </p>

            <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Zero Malware Guarantee</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/" onClick={() => handleNav('home')} className="hover:text-blue-600 dark:hover:text-blue-400">
                  Home & Search
                </Link>
              </li>
              <li>
                <Link href="/categories" onClick={() => handleNav('categories')} className="hover:text-blue-600 dark:hover:text-blue-400">
                  Categories Directory
                </Link>
              </li>
              <li>
                <Link href="/popular" onClick={() => handleNav('popular')} className="hover:text-blue-600 dark:hover:text-blue-400">
                  Popular Apps Leaderboard
                </Link>
              </li>
              <li>
                <Link href="/favorites" onClick={() => handleNav('favorites')} className="hover:text-blue-600 dark:hover:text-blue-400">
                  Saved Bookmarks
                </Link>
              </li>
              <li>
                <Link href="/about" onClick={() => handleNav('about')} className="hover:text-blue-600 dark:hover:text-blue-400">
                  About & Safety Commitment
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Popular Categories
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-600 dark:text-slate-400">
              {CATEGORIES.slice(1, 6).map((c) => (
                <li key={c.id}>
                  <Link 
                    href={`/categories`}
                    onClick={() => handleNav('categories')} 
                    className="hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Community & Submit */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-1">
              Submit & Support
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Know an awesome free app that should be listed? Submit it to our verified index.
            </p>
            {onOpenSubmitModal && (
              <button
                onClick={onOpenSubmitModal}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md transition-all w-full text-center"
              >
                Submit Free App
              </button>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} AppFinder. All rights reserved. Free software directory for Windows, Mac, Linux, Android, & iOS.</p>
          <p className="flex items-center gap-1 font-medium">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
            <span>for open source software.</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
