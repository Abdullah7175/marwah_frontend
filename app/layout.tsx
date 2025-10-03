'use client'

import React, { ReactNode } from 'react';
import './globals.css'
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingComponents from '@/components/FloatingComponents';
import Space from '@/components/Space';
import Breadcrumb from '@/components/Breadcrumb';


export function getUserFrame(child: any) {
  return child;
}
export function getAdminFrame(child: any) {
  return child;
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Best Umrah Packages | Group Umrah Packages - Marwah Travels Umrah</title>
        <meta name="description" content="Plan your spiritual journey with Marwah Travels Umrah. Luxury Umrah packages, real-time trip tracking, 24/7 support, flights, accommodation & visa assistance. Contact us now" />
        <meta name="keywords" content="Umrah packages, Umrah travel, Makkah tours, Madina tours, Umrah visa, Umrah flights, Umrah hotels, Islamic travel, religious tourism, group umrah, luxury umrah" />
        <meta name="author" content="Marwah Travels" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Canonical URL is set per-page to avoid duplicates */}
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.mtumrah.com/" />
        <meta property="og:title" content="Best Umrah Packages | Group Umrah Packages - Marwah Travels Umrah" />
        <meta property="og:description" content="Plan your spiritual journey with Marwah Travels Umrah. Luxury Umrah packages, real-time trip tracking, 24/7 support, flights, accommodation & visa assistance. Contact us now" />
        <meta property="og:image" content="https://www.mtumrah.com/logo2.png" />
        <meta property="og:site_name" content="Marwah Travels Umrah" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.mtumrah.com/" />
        <meta name="twitter:title" content="Best Umrah Packages | Group Umrah Packages - Marwah Travels Umrah" />
        <meta name="twitter:description" content="Plan your spiritual journey with Marwah Travels Umrah. Luxury Umrah packages, real-time trip tracking, 24/7 support, flights, accommodation & visa assistance. Contact us now" />
        <meta name="twitter:image" content="https://www.mtumrah.com/logo2.png" />
        <meta name="twitter:site" content="@marwahtravels" />
        
        {/* Favicon */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://mtumrah.com" />
        
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-MJ6Y9357FT"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-MJ6Y9357FT', {
                page_title: document.title,
                page_location: window.location.href
              });
            `,
          }}
        />
        
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="JQwE2Zi9f3MQTxWtjiSwENXRM2xbpdcdLuxeSRD_wjo" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              "name": "Marwah Travels",
              "description": "Professional Umrah travel services",
              "url": "https://www.mtumrah.com",
              "logo": "https://www.mtumrah.com/logo2.png",
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
              },
              "sameAs": [
                "https://www.trustpilot.com/review/mtumrah.com"
              ]
            })
          }}
        />
      </head>
      <body style={{}} className="bg-center">
        <div
          style={{
            zIndex: -1,
            backgroundImage: "url('/images/kaba2.jpg')",
            height: '100vh',
            width: '100vw',
            position: 'fixed',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <Navbar />
        <Breadcrumb />
        <main className="relative overflow-hidden">
          {children}
        </main>
        <Space h={50} />
        <Footer />
        <FloatingComponents />
      </body>
    </html>
  );
}