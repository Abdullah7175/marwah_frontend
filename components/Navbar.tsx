"use client";
import { NAV_LINKS, SOCIALS } from "@/constants"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react";
const Navbar = () => {
  const [isClick,setisClick]=useState(false);
  const toggleNavbar=()=>{
    setisClick(!isClick);
  }
  
  function isCurrent(link:string){
    const url = location.href;
    
    return url.includes(link);
  }
  return (
    <nav className=" flex sm:items-center sm:flex-row flex-col sm:gap-20 gap-5 bg-black/30 max-container padding-container relative z-30 py-5">
      <Link href="/">
        <img src="/logo2.png" alt="Marwah Travels Logo" width={100} height={19} loading="lazy" />
        {/* <span className="text-white text-3xl font-bold">Marwah Travels</span> */}
      </Link>
      
      <div className="flex max-md:hidden">
      <ul className=" h-full sm:gap-12 gap-1 flex sm:flex-row flex-col sm:items-center ">
        {NAV_LINKS.map((link) => (
          <Link onClick={()=>location.href = link.href} href={link.href} key={link.key} className=" text-slate-200  cursor-pointer sm:pb-1.5 transition-all hover:font-bold">
            {link.label}
          </Link>
        ))}
      </ul>
      
      <a href="https://www.trustpilot.com/review/mtumrah.com" target="_blank" aria-label="Read our reviews on Trustpilot">
      {/* <Image
                    src={'/images/truspilot.png'}
                    alt="Trustpilot logo"
                    width={100}
                    height={48}
                    quality={80}
                    className={''}
                    loading="lazy"
                    // className={"transition-opacity opacity-0 duration-[2s]"}
                    // onLoadingComplete={(image)=>image.classList.remove("opacity-0")}
                /> */}
      </a>
</div>
      <div className="hidden lg:flex items-center gap-3 ms-auto">
        <Link href="https://www.facebook.com" aria-label="Facebook" target="_blank"><img src="/facebook.svg" alt="Facebook" width={22} height={22} /></Link>
        <Link href="https://www.instagram.com" aria-label="Instagram" target="_blank"><img src="/instagram.svg" alt="Instagram" width={22} height={22} /></Link>
        <Link href="https://twitter.com" aria-label="Twitter" target="_blank"><img src="/twitter.svg" alt="Twitter" width={22} height={22} /></Link>
        <Link href="https://www.youtube.com" aria-label="YouTube" target="_blank"><img src="/youtube.svg" alt="YouTube" width={22} height={22} /></Link>
      </div>

      {/* <div className="lg:flexCenter hidden">
        <ul className="regular-14 flex gap-4 text-white me-16">
          {SOCIALS.links.map((link) => (
            <Link href="/" key={link}>
              <img color="white" src={link} alt="logo" width={24} height={24} />
            </Link>
          ))}
        </ul>

      </div> */}

      {/* <img
        src="menu.svg"
        alt="menu"
        width={32}
        height={32}
        className="inline-block cursor-pointer lg:hidden"
      /> */}
      <div className="md:hidden flex items-center">
        <button
        className="inline-flex items-center justify-center p-2 rounded-md text-white 
        hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
        onClick={toggleNavbar}
        aria-label={isClick ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isClick}
        >
        {isClick?(
          <svg 
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
          >
            <path 
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ):<svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true">
            <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
           />
          </svg>
        }
        </button>
      </div>
      {isClick &&(
        <div className="md:hidden">
           <ul className=" h-full sm:gap-12 gap-1 flex sm:flex-row flex-col sm:items-center ">
        {NAV_LINKS.map((link) => (
          <Link onClick={()=>location.href = link.href} href={link.href} key={link.key} className=" text-slate-200  cursor-pointer sm:pb-1.5 transition-all hover:font-bold">
            {link.label}
          </Link>
        ))}
      </ul>
      <a href="https://www.trustpilot.com/review/mtumrah.com" target="_blank" aria-label="Read our reviews on Trustpilot">
      {/* <Image
                    src={'/images/truspilot.png'}
                    alt="Trustpilot logo"
                    width={100}
                    height={48}
                    quality={80}
                    className={''}
                    loading="lazy"
                    // className={"transition-opacity opacity-0 duration-[2s]"}
                    // onLoadingComplete={(image)=>image.classList.remove("opacity-0")}
                /> */}
      </a>
        </div>
      )}
    </nav>
    
  )
}

export default Navbar