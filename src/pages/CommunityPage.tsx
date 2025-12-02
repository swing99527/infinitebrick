import React from 'react';
import { Community } from '../components/community/Community';
import { Footer } from '../components/landing/Footer';
import { MarketingNav } from '../components/navigation/MarketingNav';
import { DocumentHead } from '../components/DocumentHead';
import { useTranslation } from '../contexts/LanguageContext';

export function CommunityPage() {
  const t = useTranslation();
  
  return (
    <>
      <DocumentHead 
        title={t.meta.communityTitle}
        description={t.community.subtitle}
      />
      <MarketingNav />
      <main className="min-h-screen bg-[#000000] dark pt-16">
        <Community />
      </main>
      <Footer />
    </>
  );
}