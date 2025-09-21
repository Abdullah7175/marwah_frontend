import { PEOPLE_URL, loremIpsum } from "@/constants";
import Image from "next/image";
import { Slide } from "react-awesome-reveal";

interface CampProps {
  backgroundImage: string;
  title: string;
  subtitle: string;
  peopleJoined: string;
}

const CampSite = ({ backgroundImage, title, subtitle, peopleJoined }: CampProps) => {
  return (
    <Slide style={{ backgroundImage: `url(${backgroundImage})` }} className={`h-full w-full min-w-[1100px]  bg-cover bg-no-repeat lg:rounded-r-5xl 2xl:rounded-5xl`}>
      <div className="flex h-full flex-col items-start justify-between p-6 lg:px-20 lg:py-10">
        <div className="flexCenter gap-4">
          <div className="rounded-full bg-green-50 p-4">
            <img
              src="/folded-map.svg"
              alt="map"
              width={28}
              height={28}
            />
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="bold-18 text-white">{title}</h4>
            <p className="regular-14 text-white ">{subtitle}</p>
          </div>
        </div>

        <div className="flexCenter gap-6">
          <span className="flex -space-x-4 overflow-hidden">
            {PEOPLE_URL.map((url) => (
              <img
                className="inline-block h-10 w-10 rounded-full"
                src={url}
                key={url}
                alt="person"
                width={52}
                height={52}
              />
            ))}
          </span>
          <p className="bold-16 md:bold-20 text-white">{peopleJoined}</p>
        </div>
      </div>
    </Slide>
  )
}

const Camp = () => {
  return (
    <section className="2xl:max-container relative flex flex-col py-10 lg:mb-10 lg:py-20 xl:mb-2">
      <div className="hide-scrollbar flex h-[340px] w-full items-start justify-start gap-8 overflow-x-auto lg:h-[400px] xl:h-[640px]">
        <CampSite
          backgroundImage="makkah_map.png"
          title="Makkah"
          subtitle="Saudi Arabia"
          peopleJoined="2100+ Visitors"
        />
        <CampSite
          backgroundImage="madina_map.png"
          title="Medina"
          subtitle=" Saudi Arabia"
          peopleJoined="1000+ Visitors"
        />

      </div>

      <div className="flexEnd mt-10 px-6 lg:-mt-[230px] lg:mr-6">
        <Slide direction="right">
          <div className="bg-green-50 p-8 lg:max-w-[500px] xl:max-w-[734px] xl:rounded-5xl xl:px-8 xl:py-10 relative w-full overflow-hidden rounded-3xl">
            <h2 className="regular-24 md:regular-32 2xl:regular-64 capitalize text-white">
              <strong>Welcome</strong> to Marwah Travels
            </h2>
            <p className="regular-14 xl:regular-16 mt-5 text-white">
              Commitment over anything
            </p>
            <img
              src="/quote.svg"
              alt="camp-2"
              width={186}
              height={219}
              className="camp-quote"
            />
          </div>
        </Slide>
      </div>
    </section>
  )
}

export default Camp