'use client'

import PackagesSection from "@/components/PackagesSection";
import Head from "next/head";

export default function PackagesPage(){
    return (
      <>
        <Head>
          <title>Umrah Packages | Luxury & Group Umrah Tours - Marwah Travels Umrah</title>
          <meta name="description" content="Explore our comprehensive Umrah packages including luxury Umrah tours, group Umrah packages, and premium spiritual journeys. Book your Umrah with 24/7 support and real-time tracking." />
          <meta name="keywords" content="umrah packages, luxury umrah, group umrah, umrah tours, spiritual journey, makkah madina packages, umrah booking" />
          <link rel="canonical" href="https://www.mtumrah.com/pages/packages" />
          
          {/* Open Graph */}
          <meta property="og:title" content="Umrah Packages | Luxury & Group Umrah Tours - Marwah Travels Umrah" />
          <meta property="og:description" content="Explore our comprehensive Umrah packages including luxury Umrah tours, group Umrah packages, and premium spiritual journeys. Book your Umrah with 24/7 support and real-time tracking." />
          <meta property="og:url" content="https://www.mtumrah.com/pages/packages" />
          <meta property="og:type" content="website" />
          
          {/* Twitter */}
          <meta name="twitter:title" content="Umrah Packages | Luxury & Group Umrah Tours - Marwah Travels Umrah" />
          <meta name="twitter:description" content="Explore our comprehensive Umrah packages including luxury Umrah tours, group Umrah packages, and premium spiritual journeys. Book your Umrah with 24/7 support and real-time tracking." />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <PackagesSection/>
      </>
    );
}