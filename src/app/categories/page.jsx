'use client';

import React from 'react';
import AppShell from '@/components/AppShell';
import CategoriesView from '@/components/CategoriesView';
import { useRouter } from 'next/navigation';

function CategoriesContent() {
  const router = useRouter();
  
  const handleCategorySelect = (categoryId) => {
    router.push(`/?category=${categoryId}`);
  };

  return <CategoriesView onSelectCategory={handleCategorySelect} />;
}

export default function CategoriesPage() {
  return (
    <AppShell activeTab="categories">
      <CategoriesContent />
    </AppShell>
  );
}
