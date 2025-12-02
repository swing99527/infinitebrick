import React from 'react';
import { Studio } from '../components/studio/Studio';
import { DocumentHead } from '../components/DocumentHead';
import { useTranslation } from '../contexts/LanguageContext';

export function StudioPage() {
  const t = useTranslation();
  
  return (
    <>
      <DocumentHead 
        title={t.meta.studioTitle}
        description={t.studio.subtitle}
      />
      <Studio />
    </>
  );
}