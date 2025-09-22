
import { AirplaneTicket, Call, Camera, Category, DinnerDining, DinnerDiningRounded, Email, FreeBreakfast, Hotel, HotelOutlined, PermIdentityTwoTone, RoundaboutRightTwoTone, SupportAgent, WhatsApp } from "@mui/icons-material";
import { Card, CircularProgress, Divider, Grid } from "@mui/material";
import Image from "next/image";
import Space from "./Space";
import { transparentBlack } from "@/constants";
import { useEffect, useState } from "react";
import {FILE_BASE_URL, GET_PACKAGES } from "@/app/db/Routes";
import { ApiCallProps as ApiCallProps, makeGetCall, makePostCall } from "@/app/db/api";
import PacksResponse from "@/app/type/PacksResponse";
import { UmrahPackage } from "@/app/type/UmrahPackage";

import { selectUmrahPackage, store } from "@/app/state/store";
import Link from "next/link";




function buildComponents(p: UmrahPackage) {

    const arr = [];
    if (p.hotel_madina_enabled) {
        arr.push(
            <div className="flex flex-center my-1 items-center">
                <HotelOutlined sx={{ color: transparentBlack }} />
                <span className="text-[13px] mx-3 ">{p.hotel_madina_name}</span>
            </div>
        )
    }
    if (p.hotel_makkah_enabled) {
        arr.push(
            <div className="flex flex-center my-1 items-center">
                <Hotel sx={{ color: transparentBlack }} />
                <span className="text-[13px] mx-3">{p.hotel_makkah_name}</span>
            </div>
        )
    }
    if (p.ziyarat) {
        arr.push(
            <div className="flex flex-center my-1 items-center">
                <Camera sx={{ color: transparentBlack }} />
                <span className="text-[13px] mx-3">Ziyarat Included</span>
            </div>
        )
    }
    if (p.visa_enabled) {
        arr.push(
            <div className="flex flex-center my-1 items-center">
                <PermIdentityTwoTone sx={{ color: transparentBlack }} />
                <span className="text-[13px] mx-3">Visa Included</span>
            </div>
        )
    }

    if (p.breakfast_enabled) {
        arr.push(
            <div className="flex flex-center my-1 items-center">
                <FreeBreakfast sx={{ color: transparentBlack }} />
                <span className="text-[13px] mx-3">Breakfast Included</span>
            </div>
        )
    }

    if (p.dinner_enabled) {
        arr.push(
            <div className="flex flex-center my-1 items-center">
                <DinnerDiningRounded sx={{ color: transparentBlack }} />
                <span className="text-[13px] mx-3">Dinner Included</span>
            </div>
        )
    }

    if (p.ticket_enabled) {
        arr.push(
            <div className="flex flex-center my-1 items-center">
                <AirplaneTicket sx={{ color: transparentBlack }} />
                <span className="text-[13px] mx-3">{"Ticket Included"}</span>
            </div>
        )
    }
    if (p.is_roundtrip && p.ticket_enabled) {
        arr.push(
            <div className="flex flex-center my-1 items-center">
                <RoundaboutRightTwoTone sx={{ color: transparentBlack }} />
                <span className="text-[13px] mx-3">Roundtrip Ticket</span>
            </div>
        )
    }
    if (p.guide) {
        arr.push(
            <div className="flex flex-center my-1 items-center">
                <SupportAgent sx={{ color: transparentBlack }} />
                <span className="text-[13px] mx-3">Free Umrah Guide</span>
            </div>
        )
    }





    return arr;

}

function getPackageFeatures(p: UmrahPackage): string[] {
    const features: string[] = [];
    
    if (p.hotel_madina_enabled) {
        features.push(p.hotel_madina_name);
    }
    if (p.hotel_makkah_enabled) {
        features.push(p.hotel_makkah_name);
    }
    if (p.ziyarat) {
        features.push("Ziyarat Included");
    }
    if (p.visa_enabled) {
        features.push("Visa Included");
    }
    if (p.breakfast_enabled) {
        features.push("Breakfast Included");
    }
    if (p.dinner_enabled) {
        features.push("Dinner Included");
    }
    if (p.ticket_enabled) {
        features.push("Ticket Included");
    }
    if (p.is_roundtrip && p.ticket_enabled) {
        features.push("Roundtrip Ticket");
    }
    if (p.guide) {
        features.push("Free Umrah Guide");
    }
    
    return features;
}

const a = [1, 2, 3]
export default function PackagesSection() {


    function parseData(data: any) {
        const packsResponse: PacksResponse = data.map((category: any) => ({
            id: category.id,
            name: category.name,
            status: category.status,
            created_at: category.created_at,
            updated_at: category.updated_at,
            list: category.list.map((pack: any) => UmrahPackage.fromJson(pack)),
        }));

        setPacks(packsResponse);

        console.log(packsResponse);

    }
    const [packs, setPacks] = useState<PacksResponse>();
    const [loading, setLoading] = useState(true);




    const props: ApiCallProps = {
        postUrl: GET_PACKAGES,
        data: undefined,
        onStart: function (): void {
            setLoading(true);
        },
        onProgressEnd: function (): void {
            setLoading(false);
        },
        onSuccess: function (res: any) {
            console.log("API Success - Received data:", res);
            console.log("Data length:", res?.length);
            parseData(res);
        },
        onUnexpected: function (res: any) {
            console.log("Unexpected Result:", res);
            console.log("API URL:", GET_PACKAGES);
            setLoading(false);
        }
    }

    useEffect(() => {
        makeGetCall(props)
    }, []);

    // Debug logging
    console.log("Rendering packs:", packs);
    console.log("Packs length:", packs?.length);
    console.log("Loading state:", loading);


    return (
        <div id='packages' className={`w-full flex flex-col items-center py-16 ${loading ? "h-[800px]" : ""}`}>
            {loading ? <div>

                <CircularProgress size={90} sx={{ color: "white", borderRadius: 20, borderWidth: 3, padding: 1 }} className="mt-48" />

            </div> : <div className="w-full  flex flex-col items-center">
                {packs && packs.length > 0 ? packs.map((cat, id) => (
                    <div
                        onClick={() => { }}
                        className="w-full  flex flex-col items-center" key={id}>
                    <h2 className='text-white pt-10 text-center font-bold text-4xl mb-8'>
                        {cat.name}
                    </h2>

                        <Grid className="my-10" justifyContent={'center'} container gap={4}>
                            {cat?.list?.map((pack: UmrahPackage, i: any) =>
                                <Grid key={i} item sm={2.2}>
                                    
                                <Link href="/pages/package_detail">
                                    <Card
                                     onClick={() => {
                                        store.dispatch(selectUmrahPackage(pack));
                                      }}
                                    className="hover:border-white hover:border-2 hover:shadow-white hover:shadow-xl overflow-hidden" 
                                    sx={{ 
                                        backgroundColor: 'transparent', 
                                        borderRadius: 3,
                                        background: 'linear-gradient(135deg, #2d5016 0%, #3a5f1a 50%, #2d5016 100%)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        backdropFilter: 'blur(10px)'
                                    }} 
                                    elevation={8}>
                                        
                                        {/* Background Image Section */}
                                        <div className="relative w-full h-48 overflow-hidden">
                                            <img 
                                                src={FILE_BASE_URL + (pack.package_image ?? "/images/kaba1.jpg")} 
                                                alt={`${pack.name} Umrah package image`} 
                                                className="w-full h-full object-cover filter blur-sm scale-110" 
                                                onError={(e) => {
                                                    e.currentTarget.src = '/images/kaba1.jpg';
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                                        </div>

                                        {/* Content Section */}
                                        <div className="p-6 text-white">
                                            <div className="flex flex-col space-y-4">
                                                {/* Package Title */}
                                                <h3 className='text-xl font-bold text-white leading-tight'>
                                                    {pack.name}
                                                </h3>
                                                
                                                {/* Price */}
                                                <div className="text-center">
                                                    <span className="text-2xl font-bold text-white">
                                                        ${pack.price_quad}/- Per Person
                                                    </span>
                                                </div>

                                                {/* Features List */}
                                                <div className="space-y-2">
                                                    {getPackageFeatures(pack).map((feature, index) => (
                                                        <div key={index} className="flex items-center space-x-3">
                                                            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                                <span className="text-white text-xs font-bold">✓</span>
                                                            </div>
                                                            <span className="text-white text-sm">{feature || 'Feature'}</span>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Contact Us Button */}
                                                <div className="pt-4">
                                                    <button 
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            window.open("tel:+" + pack.phone, "_blank");
                                                        }}
                                                        className="w-full bg-amber-600 hover:bg-amber-700 text-black font-bold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg"
                                                    >
                                                        Contact Us
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                    </Card>
                                </Link>
                                </Grid>
                            )}


                        </Grid>
                    </div>
                )) : <div className="text-white text-center mt-20">
                    <h2 className="text-2xl font-bold mb-4">No Packages Available</h2>
                    <p>We're currently updating our packages. Please check back soon!</p>
                </div>}
            </div>

                            }        </div>
    )
}