import React from 'react';
import { Hero } from '../components/landing/Hero';
import { CoreValues } from '../components/landing/CoreValues';
import { Product } from '../components/landing/Product';
import { Pricing } from '../components/landing/Pricing';
import { Gallery } from '../components/landing/Gallery';
import { TrustBadges } from '../components/landing/TrustBadges';
import { Footer } from '../components/landing/Footer';
import { MarketingNav } from '../components/navigation/MarketingNav';
import { DocumentHead } from '../components/DocumentHead';
import { useTranslation } from '../contexts/LanguageContext';

export function LandingPage() {
  const t = useTranslation();

  return (
    <>
      <DocumentHead 
        title={t.meta.homeTitle}
        description={t.meta.defaultDescription}
      />
      <MarketingNav />
      <main>
        <Hero />
        <CoreValues />
        <Product />
        <Pricing />
        <Gallery />
        <TrustBadges />
      </main>
      <Footer />
    </>
  );
}