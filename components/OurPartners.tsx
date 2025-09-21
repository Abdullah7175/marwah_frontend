import Marquee from "react-fast-marquee";

export default function OurPartners() {
    return (<div className="mt-10  bg-black/80 shadow-sm shadow-white py-10">
        <h2 className="text-white mx-4 font-bold text-[40px] mb-10 w-full text-center">
            Our Partners
        </h2>



        <Marquee>
            <img width={150} height={90} className='mx-2' src='/airlines/img1.png' alt="Airline Partner 1" loading="lazy" />
            <img width={150} height={90} className='mx-2' src='/airlines/img2.png' alt="Airline Partner 2" loading="lazy" />
            <img width={150} height={90} className='mx-2' src='/airlines/img3.png' alt="Airline Partner 3" loading="lazy" />
            <img width={150} height={90} className='mx-2' src='/airlines/img4.png' alt="Airline Partner 4" loading="lazy" />
            <img width={150} height={90} className='mx-2' src='/airlines/img5.webp' alt="Airline Partner 5" loading="lazy" />
            <img width={150} height={90} className='mx-2' src='/airlines/img6.webp' alt="Airline Partner 6" loading="lazy" />
            <img width={150} height={90} className='mx-2' src='/airlines/img8.webp' alt="Airline Partner 8" loading="lazy" />
        </Marquee>
    </div>)
}