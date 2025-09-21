'use client'

import Link from 'next/link';

export default function FrontendSitemap() {
  const routes = [
    { href: '/', label: 'Home' },
    { href: '/pages/packages', label: 'Luxury Umrah Packages' },
    { href: '/pages/blogs', label: 'Blogs' },
    { href: '/pages/testimonials', label: 'Testimonials' },
    { href: '/pages/about', label: 'About Us' },
    { href: '/pages/dashboard', label: 'Admin Dashboard' },
  ];

  return (
    <main className="max-w-3xl mx-auto px-6 py-10 text-white">
      <h1 className="text-3xl font-bold mb-6">Sitemap</h1>
      <ul className="list-disc pl-6 space-y-2">
        {routes.map((r) => (
          <li key={r.href}>
            <Link className="text-blue-300 hover:text-blue-200" href={r.href}>{r.label}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}





