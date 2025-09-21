'use client'
import Image from 'next/image'
import React from 'react'
import InquiryForm  from './Inquiryform'
import ParentCard from './ParentCard'
import { Fade, Slide } from 'react-awesome-reveal'

const Guide = () => {
  return (
    <section className="flexCenter flex-col">
   
    
      <div className="flexCenter max-container relative w-full">
       <Fade
          className="h-[900px]"

       >
       <img
          className=' w-full object-cover object-center rounded-5xl'
          src="/kaba2.jpg"
          alt="boat"
          width={1440}
          height={680}
        />
       </Fade>

        {/* <div className="absolute flex bg-white py-8 pl-5 pr-7 gap-3 rounded-3xl border shadow-md md:left-[5%] lg:top-20">
          <img
            src="/meter.svg"
            alt="meter"
            width={16}
            height={158}
            className="h-full w-auto"
          />
          <div className="flexBetween flex-col">
            <div className='flex w-full flex-col'>
              <div className="flexBetween w-full">
                <p className="regular-16 text-gray-20">Destination</p>
                <p className="bold-16 text-green-50">48 min</p>
              </div>
              <p className="bold-20 mt-2">Aguas Calientes</p>
            </div>

            <div className='flex w-full flex-col'>
              <p className="regular-16 text-gray-20">Start track</p>
              <h4 className="bold-20 mt-2 whitespace-nowrap">Wonorejo Pasuruan</h4>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  )
}

export default Guide