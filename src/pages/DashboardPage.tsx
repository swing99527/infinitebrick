import React from 'react';
import { Dashboard } from '../components/dashboard/Dashboard';
import { Footer } from '../components/landing/Footer';
import { AppNav } from '../components/navigation/AppNav';
import { DocumentHead } from '../components/DocumentHead';
import { useTranslation } from '../contexts/LanguageContext';

export function DashboardPage() {
  const t = useTranslation();
  
  return (
    <>
      <DocumentHead 
        title={t.meta.dashboardTitle}
        description={t.dashboard.models.subtitle}
      />
      <AppNav />
      <main className="min-h-screen bg-[#000000] dark pt-16">
        <Dashboard />
      </main>
      <Footer />
    </>
  );
}