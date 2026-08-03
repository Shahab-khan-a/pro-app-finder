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
  Gamepad2, 
  Code, 
  Music,
  ChevronRight
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
      case 'Gamepad2': return <Gamepad2 className="w-6 h-6" />;
      case 'Code': return <Code className="w-6 h-6" />;
      case 'Music': return <Music className="w-6 h-6" />;
      default: return <LayoutGrid className="w-6 h-6" />;
    }
  };

  const categoriesList = CATEGORIES.filter(c => c.id !== 'all');

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Browse Free Apps by Category
        </h2>
        <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
          Explore curated open-source tools and free applications organized by workflow and industry.
        </p>
      </div>

      {/* Categories Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoriesList.map((cat) => {
          const appCount = APPS_DATA.filter(a => a.category === cat.id).length;
          return (
            <div
              key={cat.id}
              onClick={() => onSelectCategory ? onSelectCategory(cat.id) : null}
              className="group p-6 rounded-3xl glass-card border border-slate-200/80 dark:border-slate-800/80 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${cat.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {getCategoryIcon(cat.icon)}
                  </div>
                  <span className="px-3 py-1 text-xs font-bold rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60">
                    {appCount} Apps
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {cat.name}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  Discover top free & open-source software for {cat.name.toLowerCase()}.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
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
