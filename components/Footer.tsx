import { FOOTER_CONTACT_INFO, FOOTER_LINKS, SOCIALS } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Marquee from 'react-fast-marquee'

const Footer = () => {
  return (
    <footer className="flexCenter mb-24" >
      <div className="padding-container max-container flex w-full flex-col gap-5 pt-4" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }} >



        <h2 className="text-orange-400 mx-4 font-bold text-2xl sm:text-3xl md:text-4xl w-full text-center">
          Award-Winning Excellence
        </h2>
        <div className='flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mt-5 sm:mb-40 mb-10'>
          <img className='w-20 h-24 sm:w-24 sm:h-28' src='/awds/img1.webp' alt="Marwah Travels award 1 - excellence recognition" loading="lazy" />
          <img className='w-20 h-24 sm:w-24 sm:h-28' src='/awds/img2.webp' alt="Marwah Travels award 2 - service quality" loading="lazy" />
          <img className='w-20 h-24 sm:w-24 sm:h-28' src='/awds/img3.webp' alt="Marwah Travels award 3 - trusted travel services" loading="lazy" />
        </div>


        <div className="flex flex-col items-center sm:items-start justify-center gap-8 md:flex-row">
          <Link href="/" className="flex-shrink-0">
            <img src="/logo2.png" alt="Marwah Travels Umrah logo" width={120} height={19} />
          </Link>

          <div className='flex text-white flex-wrap gap-6 sm:gap-8 md:gap-10 sm:justify-between md:flex-1'>
            {FOOTER_LINKS.map((columns, id) => (
              <FooterColumn key={id} title={columns.title}>
                <ul className="text-sm flex flex-col gap-3 text-white">
                  {columns.links.map((link) => (
                    <Link href="/" key={link} className="hover:text-orange-400 transition-colors">
                      {link}
                    </Link>
                  ))}
                </ul>
              </FooterColumn>
            ))}

            <div className="flex flex-col gap-5">
              <FooterColumn title={FOOTER_CONTACT_INFO.title}>
                {FOOTER_CONTACT_INFO.links.map((link) => (
                  <Link
                    href="/"
                    key={link.label}
                    className="flex gap-4 md:flex-col lg:flex-row hover:text-orange-400 transition-colors"
                  >
                    <p className="whitespace-nowrap">
                      {link.label}:
                    </p>
                    <p className="medium-14 whitespace-nowrap text-slate-200">
                      {link.value}
                    </p>
                  </Link>
                ))}
              </FooterColumn>
            </div>

            <div className="flex flex-col gap-5">
              <FooterColumn title="Follow Us">
                <div className="flex gap-4">
                  <Link href="https://www.facebook.com" aria-label="Facebook" target="_blank" className="hover:opacity-80">
                    <img src="/facebook.svg" alt="Facebook" width={24} height={24} className="invert" />
                  </Link>
                  <Link href="https://www.instagram.com" aria-label="Instagram" target="_blank" className="hover:opacity-80">
                    <img src="/instagram.svg" alt="Instagram" width={24} height={24} className="invert" />
                  </Link>
                  <Link href="https://twitter.com" aria-label="Twitter" target="_blank" className="hover:opacity-80">
                    <img src="/twitter.svg" alt="Twitter" width={24} height={24} className="invert" />
                  </Link>
                  <Link href="https://www.youtube.com" aria-label="YouTube" target="_blank" className="hover:opacity-80">
                    <img src="/youtube.svg" alt="YouTube" width={24} height={24} className="invert" />
                  </Link>
                </div>
              </FooterColumn>
            </div>

          </div>
        </div>

        <div className="border" />
        <p className="regular-14 w-full text-center text-slate-200"> © 2024 MARWAH TRAVELS UMRAH SERVICES LLC.ALL RIGHTS RESERVED.</p>
        <p className="regular-14 w-full text-center text-slate-200 mb-10"> 15636 71ST AVE 28B
FLUSHING , NEW YORK ,11367</p>
        <p className="regular-12 w-full text-center text-slate-200 mb-10">Designed & developed by <a href='https://ecoders.tech/'>ECODERS</a></p>
      </div>
    </footer>
  )
}

type FooterColumnProps = {
  title: string;
  children: React.ReactNode;
}

const FooterColumn = ({ title, children }: FooterColumnProps) => {
  return (
    <div className="flex flex-col gap-5">
      <h4 className="bold-18 whitespace-nowrap">{title}</h4>
      {children}
    </div>
  )
}

export default Footer