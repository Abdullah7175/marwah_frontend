'use client'

import Link from 'next/link';
import Head from 'next/head';

export default function FrontendSitemap() {
  const routes = [
    { href: '/', label: 'Home' },
    { href: '/pages/packages', label: 'Luxury Umrah Packages' },
    { href: '/pages/blogs', label: 'Blogs' },
    { href: '/pages/testimonials', label: 'Testimonials' },
    { href: '/pages/about', label: 'About Us' },
    { href: '/pages/sitemap', label: 'Sitemap' },
  ];

  return (
    <>
      <Head>
        <title>Website Sitemap | Marwah Travels Umrah</title>
        <meta name="description" content="Navigate through Marwah Travels Umrah website easily with our comprehensive sitemap. Find all pages including Umrah packages, blogs, testimonials, and more." />
        <meta name="keywords" content="sitemap, website navigation, umrah packages, marwah travels, site map" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.mtumrah.com/pages/sitemap" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Website Sitemap | Marwah Travels Umrah" />
        <meta property="og:description" content="Navigate through Marwah Travels Umrah website easily with our comprehensive sitemap. Find all pages including Umrah packages, blogs, testimonials, and more." />
        <meta property="og:url" content="https://www.mtumrah.com/pages/sitemap" />
        <meta property="og:type" content="website" />
        
        {/* Twitter */}
        <meta name="twitter:title" content="Website Sitemap | Marwah Travels Umrah" />
        <meta name="twitter:description" content="Navigate through Marwah Travels Umrah website easily with our comprehensive sitemap. Find all pages including Umrah packages, blogs, testimonials, and more." />
        <meta name="twitter:card" content="summary" />
      </Head>
      <main className="max-w-3xl mx-auto px-6 py-10 text-white">
        <h1 className="text-3xl font-bold mb-6">Website Sitemap</h1>
        <p className="text-lg mb-8 text-slate-200">Navigate through our website easily with our comprehensive sitemap.</p>
        <ul className="list-disc pl-6 space-y-2">
          {routes.map((r) => (
            <li key={r.href}>
              <Link className="text-blue-300 hover:text-blue-200 transition-colors duration-200" href={r.href}>{r.label}</Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}





