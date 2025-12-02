import { useEffect } from 'react';
import { useTranslation } from '../contexts/LanguageContext';

interface DocumentHeadProps {
  title?: string;
  description?: string;
}

export function DocumentHead({ title, description }: DocumentHeadProps) {
  const t = useTranslation();

  useEffect(() => {
    // 设置网站标题
    const pageTitle = title || t.meta.defaultTitle;
    document.title = `${pageTitle} | InfiniteBrick AI`;

    // 设置 meta description
    const metaDescription = description || t.meta.defaultDescription;
    let descElement = document.querySelector('meta[name="description"]');
    if (!descElement) {
      descElement = document.createElement('meta');
      descElement.setAttribute('name', 'description');
      document.head.appendChild(descElement);
    }
    descElement.setAttribute('content', metaDescription);

    // 设置 Open Graph 标签 (用于社交媒体分享)
    const ogTitle = document.querySelector('meta[property="og:title"]') || createMetaTag('property', 'og:title');
    ogTitle.setAttribute('content', `${pageTitle} | InfiniteBrick AI`);

    const ogDescription = document.querySelector('meta[property="og:description"]') || createMetaTag('property', 'og:description');
    ogDescription.setAttribute('content', metaDescription);

    const ogImage = document.querySelector('meta[property="og:image"]') || createMetaTag('property', 'og:image');
    ogImage.setAttribute('content', '/logo512.png');

    // 设置 Twitter Card 标签
    const twitterCard = document.querySelector('meta[name="twitter:card"]') || createMetaTag('name', 'twitter:card');
    twitterCard.setAttribute('content', 'summary_large_image');

    const twitterTitle = document.querySelector('meta[name="twitter:title"]') || createMetaTag('name', 'twitter:title');
    twitterTitle.setAttribute('content', `${pageTitle} | InfiniteBrick AI`);

    const twitterDescription = document.querySelector('meta[name="twitter:description"]') || createMetaTag('name', 'twitter:description');
    twitterDescription.setAttribute('content', metaDescription);

  }, [title, description, t]);

  return null;
}

function createMetaTag(attrName: string, attrValue: string): Element {
  const meta = document.createElement('meta');
  meta.setAttribute(attrName, attrValue);
  document.head.appendChild(meta);
  return meta;
}
