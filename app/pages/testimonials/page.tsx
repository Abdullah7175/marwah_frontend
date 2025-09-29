'use client'
import { BACKEND_BASE_URL, FILE_BASE_URL, GET_REVIEWS } from "@/app/db/Routes";
import { ApiCallProps, makeGetCall } from "@/app/db/api";
import { getUserFrame } from "@/app/layout";
import { Review } from "@/app/type/Review";
import { Star } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import ReactPlayer from "react-player";
import Head from "next/head";

export default function TestimonialsPage() {
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

    return (
        <>
            <Head>
                <title>Umrah Testimonials | Real Customer Experiences - Marwah Travels Umrah</title>
                <meta name="description" content="Read firsthand testimonials from pilgrims who trusted Marwah Travels Umrah. Discover stories of seamless support, 24/7 guidance, hotel convenience, and stress-free spiritual journeys." />
                <meta name="keywords" content="umrah testimonials, customer reviews, umrah experiences, pilgrimage reviews, marwah travels reviews" />
                <link rel="canonical" href="https://www.mtumrah.com/pages/testimonials" />
                
                {/* Open Graph */}
                <meta property="og:title" content="Umrah Testimonials | Real Customer Experiences - Marwah Travels Umrah" />
                <meta property="og:description" content="Read firsthand testimonials from pilgrims who trusted Marwah Travels Umrah. Discover stories of seamless support, 24/7 guidance, hotel convenience, and stress-free spiritual journeys." />
                <meta property="og:url" content="https://www.mtumrah.com/pages/testimonials" />
                
                {/* Twitter */}
                <meta name="twitter:title" content="Umrah Testimonials | Real Customer Experiences - Marwah Travels Umrah" />
                <meta name="twitter:description" content="Read firsthand testimonials from pilgrims who trusted Marwah Travels Umrah. Discover stories of seamless support, 24/7 guidance, hotel convenience, and stress-free spiritual journeys." />
            </Head>
            {getUserFrame(
                <div className="mt-10  shadow-sm shadow-white py-10">
                    <h1 className="text-white font-bold text-2xl sm:text-3xl md:text-4xl mb-10 w-full text-center">
                        Our Testimonials
                    </h1>

                    <Grid container spacing={2} className="px-4 sm:px-10 flex flex-col sm:flex-row gap-4 items-center justify-center">
                        {reviews?.map((e, index) => (
                            <Grid key={index} item xs={12} sm={6} md={4}>
                                <div className="flex flex-col rounded-xl w-full max-w-sm bg-white p-4 shadow-lg">
                                    <ReactPlayer
                                        width="100%"
                                        style={{ borderRadius: 10 }}
                                        height={200}
                                        url={FILE_BASE_URL + e.video_url}
                                        controls
                                    />
                                    <span className="font-bold mt-3 text-lg">{e.user_name}</span>
                                    <div className="flex gap-1 mt-1">
                                        <Star fontSize="medium" htmlColor="orange" />
                                        <Star fontSize="medium" htmlColor="orange" />
                                        <Star fontSize="medium" htmlColor="orange" />
                                        <Star fontSize="medium" htmlColor="orange" />
                                        <Star fontSize="medium" htmlColor="orange" />
                                    </div>
                                    <div className="mt-2 text-sm text-gray-700">
                                        <Marquee pauseOnClick speed={30}>
                                            <span>{e.detail}</span>
                                        </Marquee>
                                    </div>
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            )}
        </>
    );
}
