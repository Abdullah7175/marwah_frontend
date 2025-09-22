import { BACKEND_BASE_URL, FILE_BASE_URL, GET_REVIEWS } from "@/app/db/Routes";
import { ApiCallProps, makeGetCall } from "@/app/db/api";
import { Review } from "@/app/type/Review";
import { Star } from "@mui/icons-material";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import ReactPlayer from "react-player";

export default function OurTestimonials() {
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState<Array<Review>>();
    function loadReviews() {
        const props: ApiCallProps = {
            postUrl: GET_REVIEWS,
            data: undefined,
            onStart: function (): void {
                setLoading(true);
            },
            onProgressEnd: function (): void {
                setLoading(false);
            },
            onSuccess: function (res: any) {
                console.log(res);
                setReviews(res.map((inquiry: any) => Review.fromJson(inquiry)));
            },
            onUnexpected: function (res: any) {
                console.log("Unexpected Result:", res);
            },
        };
        makeGetCall(props);
    }

    useEffect(loadReviews, []);

    // Debug logging
    console.log("Testimonials - Reviews:", reviews);
    console.log("Testimonials - Loading:", loading);
    console.log("Testimonials - Reviews length:", reviews?.length);

    return (
        <div className="mt-10  shadow-sm shadow-white py-10">
            <h1 className="text-white  font-bold text-[30px] mb-10 w-full text-center ">
                Our Testimonials
            </h1>

            <div className="sm:px-10 flex sm:flex-row flex-col gap-2 items-center justify-center">
                {loading ? (
                    <div className="text-white text-center">
                        <p>Loading testimonials...</p>
                    </div>
                ) : reviews && reviews.length > 0 ? (
                    reviews.slice(0,3).map((e, index) => (
                        <div key={index} className="flex  flex-col rounded-xl w-80   bg-black/60 p-3">
                            <ReactPlayer
                                width={300}
                                
                                style={{ borderRadius: 10 }}
                                height={200}
                                url={FILE_BASE_URL + e.video_url}
                                controls
                            />
                            <span className="font-bold mt-2 text-white">{e.user_name}</span>
                            <div className="w-36">
                                <Star fontSize="medium" htmlColor="orange" />
                                <Star fontSize="medium" htmlColor="orange" />
                                <Star fontSize="medium" htmlColor="orange" />
                                <Star fontSize="medium" htmlColor="orange" />
                                <Star fontSize="medium" htmlColor="orange" />
                            </div>
                            <Marquee pauseOnClick className="mt-1 text-white">
                                <span>{e.detail}</span>
                            </Marquee>


                        </div>
                    ))
                ) : (
                    <div className="text-white text-center">
                        <h3 className="text-xl font-bold mb-2">No Testimonials Available</h3>
                        <p>We're currently updating our testimonials. Please check back soon!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
