'use client'

import React from 'react';
import Link from 'next/link';
import { getUserFrame } from './layout';
import Head from 'next/head';

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Page Not Found - 404 | Marwah Travels Umrah</title>
        <meta name="description" content="The page you are looking for could not be found. Return to Marwah Travels Umrah homepage to explore our Umrah packages and services." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://www.mtumrah.com/404" />
      </Head>
      {getUserFrame(
        <div className="min-h-screen flex flex-col items-center justify-center text-white px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <h2 className="text-3xl font-semibold mb-6">Page Not Found</h2>
            <p className="text-lg mb-8 text-gray-300">
              Sorry, the page you are looking for doesn't exist or has been moved. 
              Let's get you back to exploring our amazing Umrah packages.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/"
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200"
              >
                Go Home
              </Link>
              <Link 
                href="/pages/packages"
                className="bg-transparent border-2 border-white hover:bg-white hover:text-black text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200"
              >
                View Packages
              </Link>
            </div>
            
            <div className="mt-12 text-sm text-gray-400">
              <p>Need help? Contact us at <a href="tel:+16463895945" className="text-orange-400 hover:text-orange-300">+1 (646) 389-5945</a></p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}





