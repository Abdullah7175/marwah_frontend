'use client'

import { getUserFrame } from "@/app/layout";
import Features from "@/components/Features";
import OurPartners from "@/components/OurPartners";
import OurTestimonials from "@/components/OurTestimonials";
import Head from "next/head";

export default function AboutUsPage() {
    return (
        <>
            <Head>
                <title>Marwah Travels Umrah | 24/7 Support & Real Time Trip Tracking - About Us</title>
                <meta name="description" content="Learn about Marwah Travels official agent for Makkah & Madina since 2018. Our commitment: live trip tracking, 24/7 support, seamless planning, and trusted spiritual journeys." />
                <meta name="keywords" content="about marwah travels, umrah agency, makkah madina agent, 24/7 support, real time tracking, spiritual journey" />
                <link rel="canonical" href="https://www.mtumrah.com/pages/about" />
                
                {/* Open Graph */}
                <meta property="og:title" content="Marwah Travels Umrah | 24/7 Support & Real Time Trip Tracking - About Us" />
                <meta property="og:description" content="Learn about Marwah Travels official agent for Makkah & Madina since 2018. Our commitment: live trip tracking, 24/7 support, seamless planning, and trusted spiritual journeys." />
                <meta property="og:url" content="https://www.mtumrah.com/pages/about" />
                
                {/* Twitter */}
                <meta name="twitter:title" content="Marwah Travels Umrah | 24/7 Support & Real Time Trip Tracking - About Us" />
                <meta name="twitter:description" content="Learn about Marwah Travels official agent for Makkah & Madina since 2018. Our commitment: live trip tracking, 24/7 support, seamless planning, and trusted spiritual journeys." />
            </Head>
            {getUserFrame(<div>
                <Features />
                <OurTestimonials />
                <OurPartners />
            </div>)}
        </>
    )
}