'use client';

import React, { useEffect, useState } from 'react';
import Head from 'next/head';

// Helper function to get base URL
const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    const isHttps = window.location.protocol === 'https:';
    const isDomain = window.location.hostname === 'mtumrah.com' || window.location.hostname === 'www.mtumrah.com';
    
    if (isHttps && isDomain) {
      return 'https://www.mtumrah.com';
    }
  }
  
  // Default to current setup
  return 'http://mtumrah.com:3000';
};

interface SeoSettings {
  meta_title: string;
  meta_description: string;
  meta_keywords?: string;
  og_title?: string;
  og_description?: string;
  og_image?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;
  structured_data?: any;
}

interface DynamicMetaTagsProps {
  pageName: string;
  customTitle?: string;
  customDescription?: string;
  customImage?: string;
  customKeywords?: string;
  fallbackTitle?: string;
  fallbackDescription?: string;
}

const DynamicMetaTags: React.FC<DynamicMetaTagsProps> = ({
  pageName,
  customTitle,
  customDescription,
  customImage,
  customKeywords,
  fallbackTitle = 'Marwah Travels - Premium Umrah Packages',
  fallbackDescription = 'Discover premium Umrah packages with Marwah Travels. Professional Umrah services including visa, flights, hotels in Makkah & Madina.'
}) => {
  const [seoSettings, setSeoSettings] = useState<SeoSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSeoSettings();
  }, [pageName]);

  const loadSeoSettings = async () => {
    try {
      const response = await fetch(`/api/seo/page?page_name=${pageName}`);
      const data = await response.json();
      if (data.success) {
        setSeoSettings(data.data);
      }
    } catch (error) {
      console.error('Error loading SEO settings:', error);
    } finally {
      setLoading(false);
    }
  };

  // Use custom values if provided, otherwise fall back to SEO settings or defaults
  const title = customTitle || seoSettings?.meta_title || fallbackTitle;
  const description = customDescription || seoSettings?.meta_description || fallbackDescription;
  const keywords = customKeywords || seoSettings?.meta_keywords || '';
  const ogTitle = seoSettings?.og_title || title;
  const ogDescription = seoSettings?.og_description || description;
  const ogImage = customImage || seoSettings?.og_image || '/logo2.png';
  const twitterTitle = seoSettings?.twitter_title || ogTitle;
  const twitterDescription = seoSettings?.twitter_description || ogDescription;
  const twitterImage = seoSettings?.twitter_image || ogImage;

  // Generate structured data
  const generateStructuredData = () => {
    if (seoSettings?.structured_data) {
      return seoSettings.structured_data;
    }

    // Default structured data
    return {
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      "name": "Marwah Travels",
      "description": description,
      "url": getBaseUrl(),
      "logo": `${getBaseUrl()}/logo2.png`,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "15636 71ST AVE 28B",
        "addressLocality": "FLUSHING",
        "addressRegion": "NEW YORK",
        "postalCode": "11367",
        "addressCountry": "US"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+16463895945",
        "contactType": "customer service",
        "availableLanguage": "English"
      }
    };
  };

  if (loading) {
    return null; // Don't render anything while loading
  }

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content="Marwah Travels" />
      <meta name="robots" content="index, follow" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${getBaseUrl()}/${pageName === 'home' ? '' : pageName}`} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:image" content={`${getBaseUrl()}${ogImage}`} />
      <meta property="og:site_name" content="Marwah Travels" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={`${getBaseUrl()}/${pageName === 'home' ? '' : pageName}`} />
      <meta name="twitter:title" content={twitterTitle} />
      <meta name="twitter:description" content={twitterDescription} />
      <meta name="twitter:image" content={`${getBaseUrl()}${twitterImage}`} />
      <meta name="twitter:site" content="@marwahtravels" />
      
      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#000000" />
      <meta name="msapplication-TileColor" content="#000000" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={`${getBaseUrl()}/${pageName === 'home' ? '' : pageName}`} />
      
      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://database.mtumrah.com" />
      
      {/* Google Search Console Verification */}
      <meta name="google-site-verification" content="JQwE2Zi9f3MQTxWtjiSwENXRM2xbpdcdLuxeSRD_wjo" />
      
      {/* Google Analytics */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=G-MJ6Y9357FT`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MJ6Y9357FT');
          `,
        }}
      />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateStructuredData()),
        }}
      />
    </Head>
  );
};

export default DynamicMetaTags;
