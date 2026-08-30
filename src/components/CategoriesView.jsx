'use client';

import React from 'react';
import {
  LayoutGrid,
  CheckSquare,
  Globe,
  Palette,
  Video,
  GraduationCap,
  ShieldCheck,
  Wrench,
  Code,
  Music,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { CATEGORIES, APPS_DATA } from '@/data/appsData';

export default function CategoriesView({ onSelectCategory }) {
  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'CheckSquare': return <CheckSquare className="w-6 h-6" />;
      case 'Globe': return <Globe className="w-6 h-6" />;
      case 'Palette': return <Palette className="w-6 h-6" />;
      case 'Video': return <Video className="w-6 h-6" />;
      case 'GraduationCap': return <GraduationCap className="w-6 h-6" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6" />;
      case 'Wrench': return <Wrench className="w-6 h-6" />;
      case 'Code': return <Code className="w-6 h-6" />;
      case 'Music': return <Music className="w-6 h-6" />;
      default: return <LayoutGrid className="w-6 h-6" />;
    }
  };

  const categoriesList = CATEGORIES.filter(c => c.id !== 'all');

  return (
    <div className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black mb-5"
          style={{
            background: 'rgba(99,102,241,0.1)',
            border: '1px solid rgba(99,102,241,0.25)',
            color: '#818cf8',
          }}
        >
          <LayoutGrid className="w-4 h-4" />
          <span>All Categories</span>
        </div>
        <h2
          className="text-3xl sm:text-4xl font-black tracking-tight"
          style={{ color: 'var(--text-primary)' }}
        >
          Browse Free Apps by{' '}
          <span className="gradient-text">Category</span>
        </h2>
        <p className="mt-4 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Explore curated open-source tools and free applications organized by workflow and industry.
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoriesList.map((cat, i) => {
          const appCount = APPS_DATA.filter(a => a.category === cat.id).length;
          return (
            <div
              key={cat.id}
              onClick={() => onSelectCategory ? onSelectCategory(cat.id) : null}
              className="group relative p-6 rounded-3xl glass-card card-hover-glow cursor-pointer flex flex-col justify-between overflow-hidden"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {/* Subtle corner glow on hover */}
              <div
                className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at top right, rgba(99,102,241,0.15), transparent 70%)',
                }}
              />

              <div>
                <div className="flex items-center justify-between mb-5">
                  {/* Icon Box */}
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${cat.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    style={{ boxShadow: '0 4px 20px rgba(99,102,241,0.25)' }}
                  >
                    {getCategoryIcon(cat.icon)}
                  </div>

                  {/* App Count Chip */}
                  <span
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black"
                    style={{
                      background: 'rgba(99,102,241,0.08)',
                      color: '#818cf8',
                      border: '1px solid rgba(99,102,241,0.2)',
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: '#818cf8', boxShadow: '0 0 6px #818cf8' }}
                    />
                    {appCount} Apps
                  </span>
                </div>

                <h3
                  className="text-xl font-black transition-colors"
                  style={{ color: 'var(--text-primary)' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#818cf8'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-primary)'}
                >
                  {cat.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Discover top free &amp; open-source software for {cat.name.toLowerCase()}.
                </p>
              </div>

              <div
                className="mt-6 pt-4 flex items-center justify-between text-xs font-black group-hover:translate-x-1.5 transition-transform duration-300"
                style={{
                  borderTop: '1px solid rgba(99,102,241,0.1)',
                  color: '#818cf8',
                }}
              >
                <span>Explore Category</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
