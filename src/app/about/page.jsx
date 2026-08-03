'use client';

import React from 'react';
import AppShell from '@/components/AppShell';
import AboutView from '@/components/AboutView';

export default function AboutPage() {
  return (
    <AppShell activeTab="about">
      <AboutView />
    </AppShell>
  );
}
