'use client'
import Image from 'next/image'
import Button from './Button'
import Space from './Space'
import { lightWhite, loremIpsum, transparentBlack } from '@/constants'
import { NumberTransition } from './NumberTransition'
import { Slide } from 'react-awesome-reveal'
import Navbar from './Navbar'

const AboutUsSection = () => {
  return (
    <div  >
      <Navbar />

      <section  style={{height:"800px"}} className="max-container padding-container flex flex-col  pb-10 md:gap-10 lg:py-10 xl:flex-row">




        <Slide className="relative z-20 flex w-full flex-col " >
          <div >

            <Space h={120} />
            <h2 className="font-bold text-[30px]  mt-10 text-white">Welcome to Marwah Travels Umrah <br /> Your Official Agent To Makkah and Madina</h2>
            <p className="regular-16 mt-3
 text-slate-200 xl:max-w-[520px] ">
              {
                "Commitment over anything"
              } </p>
{/* 
            <div className="my-11 flex flex-wrap gap-5">
              <div className="flex items-center gap-2">
                {Array(5).fill(1).map((_, index) => (
                  <img
                    src="/star.svg"
                    key={index}
                    alt="star"
                    width={24}
                    height={24}
                  />
                ))}
              </div>

              <p className="bold-16 lg:bold-20 text-white">
                18
                <span className="regular-16 lg:regular-20 ml-1">Excellent Reviews</span>
              </p>
            </div> */}

        
          </div>
        </Slide>





        <div  className="flex flex-col-reverse relative z-10 inset-0  bg-coverbg-center bg-red rounded-3xl
       xl:w-1/2  sm:w-full p-2 ">
   
          <div className="z-20 xl:w-[500px] sm:w-full flexBetween justify-bottom flex-row flex   gap-8 rounded-3xl px-6 py-6" style={{ backgroundColor: transparentBlack }}>
            <div className="flex flex-col gap-2">
              <p className="text-sm/[20px] xl:regular-16" style={{ color: lightWhite }}>
                Satisfied Clients
              </p>
              <NumberTransition
                start={0}
                enableScrollSpy={true}
                className="sm:bold-12 xl:bold-32 text-white"
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

export default AboutUsSection