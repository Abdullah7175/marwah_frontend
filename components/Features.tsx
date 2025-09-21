import { FEATURES, transparentBlack } from '@/constants'
import Image from 'next/image'
import React from 'react'
import { Slide } from 'react-awesome-reveal'

const Features = () => {
  return (
    <section id='aboutUs' className="flex-col mt-10 flexCenter overflow-hidden bg-center bg-no-repeat py-10 rounded-3xl  mx-6 " style={{backgroundColor:transparentBlack}}>
      <div className="max-container  padding-container relative w-full flex justify-end ">
        <div className="flex flex-1 ">
          <img
          className='rounded-3xl h-[640px] mt-36'
            src="/images/kaba1.jpg"
            alt="Kaaba image"
            width={430}
            height={1000}
            loading="lazy"
            
          />
        </div>

        <div className="z-20 flex w-full flex-col lg:w-[60%] ">
          <div className='relative'>
         
            <Slide><h2 className="bold-40 lg:bold-64 text-slate-200">Why Us?</h2></Slide>
          </div>
          <ul className=" mt-10 grid mx-3 gap-10 md:grid-cols-2 lg:mg-20 lg:gap-20">
            {FEATURES.map((feature) => (
              <FeatureItem 
                key={feature.title}
                title={feature.title} 
                icon={feature.icon}
                description={feature.description}
              />
            ))}
            <a href="https://www.trustpilot.com/review/mtumrah.com" target="_blank" aria-label="Read our reviews on Trustpilot">
            <Image
                    src={'/images/truspilot.png'}
                    alt="Trustpilot logo"
                    width={250}
                    height={48}
                    quality={80}
                    className={''}
                    loading="lazy"
                    // className={"transition-opacity opacity-0 duration-[2s]"}
                    // onLoadingComplete={(image)=>image.classList.remove("opacity-0")}
                />
                </a>
          </ul>
        </div>
      </div>
    </section>
  )
}

type FeatureItem = {
  title: string;
  icon: string;
  description: string;
}

const FeatureItem = ({ title, icon, description }: FeatureItem) => {
  return (
    <li className="flex w-full flex-1 flex-col items-start">
      <div className="rounded-full p-4 lg:p-7 bg-green-50">
        <img src={icon} alt={`${title} icon`} width={28} height={28} loading="lazy" />
      </div>
      <h3 className="bold-20 lg:bold-32 mt-5 text-white capitalize">
        {title}
      </h3>
      <p className="regular-16 mt-5 text-white lg:mt-[30px] lg:bg-none">
        {description}
      </p>
    </li>
  )
}

export default Features