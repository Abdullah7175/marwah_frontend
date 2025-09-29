'use client'
import Image from 'next/image'
import Button from './Button'
import Space from './Space'
import { lightWhite, loremIpsum, transparentBlack } from '@/constants'

const Hero = () => {
  return (
    <div>
      <section style={{ minHeight: "600px" }} className="max-container padding-container sm:flex pb-4 md:gap-10 lg:py-10 xl:flex-row">
        <div className="relative z-20 flex w-full">
          <div className="w-full">
            <Space h={120} />
            <h1 className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white leading-tight">
              Best Umrah Packages | Group Umrah Packages - Marwah Travels Umrah
            </h1>
            <p className="text-sm sm:text-base md:text-lg mt-3 text-slate-200 max-w-[520px]">
              Commitment over anything
            </p>
          </div>
        </div>





        <div className="sm:mt-4 mt-0 flex flex-col-reverse relative z-10 inset-0  bg-coverbg-center bg-red rounded-3xl
        p-2 ">

          <div className="z-20 w-full flex flex-col sm:flex-row gap-4 sm:gap-8 rounded-3xl px-4 sm:px-6 py-4 sm:py-6" style={{ backgroundColor: transparentBlack }}>
            <div className="flex flex-col gap-2 text-center sm:text-left">
              <p className="text-xs sm:text-sm text-slate-300">
                Satisfied Clients
              </p>
              <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white">+10000</span>
            </div>
            <div className="flex flex-col gap-2 text-center sm:text-left">
              <p className="text-xs sm:text-sm text-slate-300">
                Successful Tours
              </p>
              <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white">+1400</span>
            </div>
            <div className="flex flex-col gap-2 text-center sm:text-left">
              <p className="text-xs sm:text-sm text-slate-300">
                Success Rate
              </p>
              <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white">99%</span>
            </div>
          </div>


        </div>



      </section>
    </div>
  )
}

export default Hero