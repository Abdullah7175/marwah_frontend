'use client'

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface BreadcrumbItem {
  label: string;
  href: string;
}

const Breadcrumb: React.FC = () => {
  const pathname = usePathname();
  
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = pathname.split('/').filter(segment => segment !== '');
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', href: '/' }
    ];

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Convert segment to readable label
      let label = segment;
      switch (segment) {
        case 'pages':
          if (pathSegments[index + 1]) {
            const nextSegment = pathSegments[index + 1];
            switch (nextSegment) {
              case 'packages':
                label = 'Luxury Umrah Packages';
                break;
              case 'blogs':
                label = 'Umrah Blog';
                break;
              case 'about':
                label = 'About Us';
                break;
              case 'testimonials':
                label = 'Testimonials';
                break;
              case 'blog_detail':
                label = 'Blog Detail';
                break;
              case 'package_detail':
                label = 'Package Detail';
                break;
              default:
                label = nextSegment.charAt(0).toUpperCase() + nextSegment.slice(1);
            }
            // Skip the next iteration since we handled it here
            return;
          }
          break;
        case 'admin':
          label = 'Admin Panel';
          break;
        default:
          label = segment.charAt(0).toUpperCase() + segment.slice(1);
      }

      breadcrumbs.push({
        label,
        href: currentPath
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs on home page
  if (pathname === '/') {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-white/80 mb-6 px-4 sm:px-6 lg:px-8">
      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={breadcrumb.href}>
          {index > 0 && (
            <span className="text-white/60">/</span>
          )}
          {index === breadcrumbs.length - 1 ? (
            <span className="text-white font-medium">{breadcrumb.label}</span>
          ) : (
            <Link 
              href={breadcrumb.href}
              className="hover:text-white transition-colors duration-200"
            >
              {breadcrumb.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;





