'use client'
import Image from 'next/image'
import Button from './Button'
import Space from './Space'
import { lightWhite, loremIpsum, transparentBlack } from '@/constants'
import { NumberTransition } from './NumberTransition'
import { Slide } from 'react-awesome-reveal'
const Hero = () => {
  return (
    <div>

      <section style={{ height: "600px"  }} className="max-container padding-container sm:flex pb-4 md:gap-10 lg:py-10 xl:flex-row">




        <Slide className="relative z-20 flex w-full " >
          <div >

            <Space h={120} />
            <h1 className="font-bold sm:text-[22px] text-[18px] lg:bold-12 text-white">Best Umrah Packages | Group Umrah Packages - Marwah Travels Umrah</h1>
            <p className="regular-16 sm:mt-3 mt-1
              text-slate-200 xl:max-w-[520px]">
              {
                "Commitment over anything"
              } </p>
   


          </div>
        </Slide>





        <div className="sm:mt-4 mt-0 flex flex-col-reverse relative z-10 inset-0  bg-coverbg-center bg-red rounded-3xl
        p-2 ">

          <div className="z-20 xl:w-[500px] sm:w-full flexBetween justify-bottom flex-row flex gap-8 rounded-3xl px-6 py-6 " style={{ backgroundColor: transparentBlack }}>
            <div className="flex flex-col gap-2">
              <p className="text-sm/[20px] xl:regular-16" style={{ color: lightWhite }}>
                Satisfied Clients
              </p>
              <NumberTransition
                start={0}
                enableScrollSpy={true}
                className="sm:bold-32  text-white"
                prefix="+"
                end={10000}
                duration={1}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flexBetween">
                <p className="text-sm/[20px] xl:regular-16 " style={{ color: lightWhite }}>
                  Successful Tours
                </p>
              </div>
              <NumberTransition
                start={0}
                enableScrollSpy={true}

                className="sm:bold-12 xl:bold-32 text-white"
                prefix="+"
                end={1400}
                duration={1}
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm/[20px] xl:regular-16 " style={{ color: lightWhite }}>
                Success Rate
              </p>
              <div className="flex flex-1">
                <NumberTransition
                  start={0}
                  enableScrollSpy={true}


                  className="text-sm/[10px] xl:bold-32 text-white"
                  end={99}
                  duration={1}
                  suffix='%'
                />

              </div>
            </div>
          </div>


        </div>



      </section>
    </div>
  )
}

export default Hero