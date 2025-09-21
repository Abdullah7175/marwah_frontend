'use client'
import { transparentBlack } from "@/constants";
import {
    HotelOutlined,
    Hotel,
    Camera,
    PermIdentityTwoTone,
    FreeBreakfast,
    DinnerDiningRounded,
    AirplaneTicket,
    RoundaboutRightTwoTone,
    SupportAgent,
    Call,
    Email,
    Link,
    WhatsApp,
} from "@mui/icons-material";
import { UmrahPackage } from "../../type/UmrahPackage";
import { useState, useEffect } from "react";
import { BACKEND_BASE_URL,FILE_BASE_URL, GET_PACKAGES } from "../../db/Routes";
import { ApiCallProps, makeGetCall } from "../../db/api";
import PacksResponse from "../../type/PacksResponse";
import Space from "@/components/Space";
import { Grid, Card, Divider } from "@mui/material";
import Image from "next/image";
import { Fade, Slide } from "react-awesome-reveal";
import { store } from "../../state/store";
import { getUserFrame } from "@/app/layout";

export default function PackageDetail() {
    function buildComponents(p: UmrahPackage) {
        const arr = [];
        if (p.hotel_madina_enabled) {
            arr.push(
                <div className="  flex-center my-1 items-center">
                    <HotelOutlined sx={{ color: "white" }} />
                    <span className="text-[13px] text-white mx-3 ">
                        {p.hotel_madina_name}
                    </span>
                </div>
            );
        }
        if (p.hotel_makkah_enabled) {
            arr.push(
                <div className=" flex my-1 items-center">
                    <Hotel sx={{ color: "white" }} />
                    <span className="text-[13px] text-white mx-3">
                        {p.hotel_makkah_name}
                    </span>
                </div>
            );
        }
        if (p.ziyarat) {
            arr.push(
                <div className="flex flex-center my-1 items-center">
                    <Camera sx={{ color: "white" }} />
                    <span className="text-[13px] text-white mx-3">Ziyarat Included</span>
                </div>
            );
        }
        if (p.visa_enabled) {
            arr.push(
                <div className="flex flex-center my-1 items-center">
                    <PermIdentityTwoTone sx={{ color: "white" }} />
                    <span className="text-[13px] text-white mx-3">Visa Included</span>
                </div>
            );
        }

        if (p.breakfast_enabled) {
            arr.push(
                <div className="flex flex-center my-1 items-center">
                    <FreeBreakfast sx={{ color: "white" }} />
                    <span className="text-[13px] text-white mx-3">
                        Breakfast Included
                    </span>
                </div>
            );
        }

        if (p.dinner_enabled) {
            arr.push(
                <div className="flex flex-center my-1 items-center">
                    <DinnerDiningRounded sx={{ color: "white" }} />
                    <span className="text-[13px] text-white mx-3">Dinner Included</span>
                </div>
            );
        }

        if (p.ticket_enabled) {
            arr.push(
                <div className="flex flex-center my-1 items-center">
                    <AirplaneTicket sx={{ color: "white" }} />
                    <span className="text-[13px] text-white mx-3">
                        {"Ticket Included"}
                    </span>
                </div>
            );
        }
        if (p.is_roundtrip && p.ticket_enabled) {
            arr.push(
                <div className="flex flex-center my-1 items-center">
                    <RoundaboutRightTwoTone sx={{ color: "white" }} />
                    <span className="text-[13px] text-white mx-3">Roundtrip Ticket</span>
                </div>
            );
        }
        if (p.guide) {
            arr.push(
                <div className="flex flex-center my-1 items-center">
                    <SupportAgent sx={{ color: "white" }} />
                    <span className="text-[13px] text-white mx-3">Free Umrah Guide</span>
                </div>
            );
        }

        return arr;
    }

    const packageToView = store.getState().home.selectedPackage;



    return getUserFrame(
        <div className="w-full flex text-white">
             <div className="w-full">
                    <Card
                        className="w-full  "
                        sx={{ borderRadius: 2 ,backgroundColor:transparentBlack}}
                        elevation={4}
                    >
                        <Slide>
                            <img
                                src={FILE_BASE_URL + (packageToView.package_image ?? "")}
                                width={720}
                                height={300}
                                alt={`${packageToView.name} package cover image`}
                                className="w-full cursor-pointer"
                            />
                        </Slide>
                        <div className=" grid sm:grid-cols-6 grid-cols-2 px-3 p-2">
                            {" "}
                            {...buildComponents(packageToView)}
                        </div>

                        <div className="pt-4 sm:px-10 px-4 hover:cursor-pointer ">
                            <div className="flex flex-col text-white">
                                <Slide>
                                    <h2 className="text-bold text-[34px] text-white pt-1 font-bold">
                                       {packageToView.name}
                                    </h2>
                                </Slide>
                                
                                <Slide direction="right">
                                    <span>
                                        <strong>
                                        <p className="text-green-600 text-md whitespace-pre-wrap leading-8">
                                            <span className="text-white">Double: </span>${packageToView.price_double}/-
                                        </p>
                                        </strong>
                                    </span>
                                </Slide>
                                <Slide direction="right">
                                    <span>
                                        <strong>
                                        <p className="text-green-600 text-md whitespace-pre-wrap leading-8">
                                            <span className="text-white">Tripple: </span>${packageToView.price_tripple}/-
                                        </p>
                                        </strong>
                                    </span>
                                </Slide>
                                <Slide direction="right">
                                    <span >
                                        <strong>
                                        <p className="text-green-600 text-md whitespace-pre-wrap leading-8">
                                            <span className="text-white">Quad: </span>${packageToView.price_quad}/-
                                        </p>
                                        </strong>
                                    </span>
                                </Slide>
                                <Slide direction="right">
                                    <span className="mt-2 ms-2">
                                        <p className="text-white text-md whitespace-pre-wrap leading-8">
                                            {packageToView.main_points}
                                        </p>
                                    </span>
                                </Slide>
                                <Slide>
                                    <h1 className="text-bold text-[30px] text-white pt-4 font-bold">
                                        {"What to Expect?"}
                                    </h1>
                                </Slide>

                                <Slide direction="right">
                                    <span className="mt-2 ms-2">
                                        <p className="text-white text-md whitespace-pre-wrap leading-8">
                                            {packageToView.what_to_expect}
                                        </p>
                                    </span>
                                </Slide>

                                {packageToView && packageToView.hotel_makkah_enabled && (
                                    <Slide>
                                        <div className="flex sm:flex-between sm:flex-row flex-col  mt-10">
                                            <div
                                                style={{ height: "auto" }}
                                                className="sm:mx-5 p-4  flex    flex-col rounded-xl  w-full "
                                            >
                                                <span className="font-bold font-serif text-yellow-50 text-[14px]">
                                                    {"Hotel In Makkah"}
                                                </span>
                                                <span className="font-bold  text-[30px]">
                                                    {packageToView.hotel_makkah_name}
                                                </span>
                                                <span className="leading-7 ps-[5px] text-[14px]">
                                                    {packageToView.hotel_makkah_detail}
                                                </span>
                                            </div>

                                            {packageToView.hotel_makkah_image && (
                                                <img
                                                    className="rounded-xl"
                                                    src={
                                                        FILE_BASE_URL + (packageToView.hotel_makkah_image ?? "")
                                                    }
                                                    alt={`${packageToView.hotel_makkah_name} hotel in Makkah`}
                                                    width={400}
                                                    height={300}
                                                />
                                            )}
                                        </div>
                                    </Slide>
                                )}
                                {packageToView && packageToView.hotel_madina_enabled && (
                                    <Slide direction="right">
                                        <div className="flex sm:flex-between sm:flex-row flex-col  mt-10">
                                            {packageToView.hotel_madina_image && (
                                                <img
                                                    className="rounded-xl"
                                                    src={
                                                        FILE_BASE_URL + (packageToView.hotel_madina_image ?? "")
                                                    }
                                                    alt={`${packageToView.hotel_madina_name} hotel in Madinah`}
                                                    width={400}
                                                    height={300}
                                                />
                                            )}

                                            <div
                                                style={{ height: "auto" }}
                                                className="sm:mx-5 p-4  flex   flex-col rounded-xl  w-full "
                                            >
                                                <span className="font-bold font-serif text-yellow-50 text-[14px]">
                                                    {"Hotel In Madinah"}
                                                </span>
                                                <span className="font-bold text-[30px]">
                                                    {packageToView.hotel_madina_name}
                                                </span>
                                                <span className="leading-7 ps-[5px] text-[14px]">
                                                    {packageToView.hotel_madina_detail}
                                                </span>
                                            </div>
                                        </div>
                                    </Slide>
                                )}
                                {packageToView && packageToView.transport_enabled && (
                                    <Slide >
                                        <div className="flex sm:flex-between sm:flex-row flex-col  mt-10">
                                            <div
                                                style={{ height: "auto" }}
                                                className="sm:mx-5 p-4  flex   flex-col rounded-xl  w-full "
                                            >
                                                <span className="font-bold font-serif text-yellow-50 text-[14px]">
                                                    {"Transportation In Saudi"}
                                                </span>
                                                <span className="font-bold text-[30px]">
                                                    {packageToView.trans_title}
                                                </span>
                                                <span className="leading-7 ps-[5px] text-[14px]">
                                                    {packageToView.trans_detail}
                                                </span>
                                            </div>
                                            {packageToView.trans_image && (
                                                <img
                                                    className="rounded-xl"
                                                    src={
                                                        FILE_BASE_URL + (packageToView.trans_image ?? "")
                                                        
                                                    }
                                                    alt={`${packageToView.trans_title} transportation image`}
                                                    width={400}
                                                    height={300}
                                                />
                                            )}
                                        </div>
                                    </Slide>
                                )}

                                {packageToView && packageToView.visa_enabled && (
                                    <Slide direction="right">
                                        <div className="flex sm:flex-between sm:flex-row flex-col  mt-10">
                                            {packageToView.visa_image && (
                                                <img
                                                    className="rounded-xl"
                                                    src={
                                                        FILE_BASE_URL + (packageToView.visa_image ?? "")
                                                       
                                                    }
                                                    alt={`${packageToView.visa_title} visa service image`}
                                                    width={400}
                                                    height={300}
                                                />
                                            )}

                                            <div
                                                style={{ height: "auto" }}
                                                className="sm:mx-5 p-4  flex   flex-col rounded-xl  w-full "
                                            >
                                                <span className="font-bold font-serif text-yellow-50 text-[14px]">
                                                    {"Visa Services"}
                                                </span>
                                                <span className="font-bold text-[30px]">
                                                    {packageToView.visa_title}
                                                </span>
                                                
                                                <span className="leading-7 ps-[5px] text-[14px]">
                                                    {packageToView.visa_detail}
                                                </span>
                                            </div>
                                        </div>
                                    </Slide>
                                )}

                                <Divider />
                                <Space h={10} />

                                <Space h={20} />

                                <Space h={10} />
                            </div>
                            <Fade>
                                <div className="flexBetween mx-2 pb-10 text-white">
                                    <div
                                        onClick={() =>
                                            window.open("tel:+" + packageToView.phone, "_blank")
                                        }
                                        className="hover:bg-green-700 bg-green-600 cursor-pointer  hover:shadow-3xl  p-3 rounded-full shadow-sm"
                                    >
                                        <Call style={{ color: "white" }} />
                                    </div>
                                    <div
                                        onClick={() =>
                                            window.open("mailto:" + packageToView.email, "_blank")
                                        }
                                        className=" bg-orange-500  hover:bg-orange-600 p-3 cursor-pointer rounded-full shadow-sm"
                                    >
                                        <Email style={{ color: "white" }} /> 
                                    </div>
                                    <div
                                        onClick={() =>
                                            window.open(
                                                "https://api.whatsapp.com/send?phone=" +
                                                packageToView.whatsapp,
                                                "_blank"
                                            )
                                        }
                                        className="bg-white cursor-pointer hover:bg-slate-200  text-black p-3 rounded-full shadow-sm"
                                    >
                                        <WhatsApp style={{ color: "black" }} /> 
                                    </div>
                                </div>
                            </Fade>
                        </div>
                    </Card>
                </div>
        </div>
    );
}
