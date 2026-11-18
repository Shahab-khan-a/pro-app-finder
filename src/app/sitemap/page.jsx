'use client';

import React from 'react';
import AppShell from '@/components/AppShell';
import SitemapView from '@/components/SitemapView';

export default function SitemapPage() {
  return (
    <AppShell activeTab="sitemap">
      <SitemapView />
    </AppShell>
  );
}
