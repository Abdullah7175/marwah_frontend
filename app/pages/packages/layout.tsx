import { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.mtumrah.com'),
  title: 'Luxury Umrah Packages | Custom Umrah Packages - Marwah Travels Umrah',
  description: 'Discover luxury, customized Umrah packages with Marwah Travels Umrah. Personalized itineraries, real-time tracking, seamless booking & 24/7 support for your spiritual journey.',
  keywords: 'luxury umrah packages, custom umrah packages, personalized umrah, umrah booking, spiritual journey',
  alternates: {
    canonical: '/pages/packages'
  },
  openGraph: {
    title: 'Luxury Umrah Packages | Custom Umrah Packages - Marwah Travels Umrah',
    description: 'Discover luxury, customized Umrah packages with Marwah Travels Umrah. Personalized itineraries, real-time tracking, seamless booking & 24/7 support for your spiritual journey.',
    url: '/pages/packages',
    images: ['/logo2.png'],
  },
  twitter: {
    title: 'Luxury Umrah Packages | Custom Umrah Packages - Marwah Travels Umrah',
    description: 'Discover luxury, customized Umrah packages with Marwah Travels Umrah. Personalized itineraries, real-time tracking, seamless booking & 24/7 support for your spiritual journey.',
    images: ['/logo2.png'],
  }
}

export default function PackagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
