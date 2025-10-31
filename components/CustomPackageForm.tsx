"use client";
import {
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Select,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { LegacyRef, useEffect, useRef, useState } from "react";
import {
  ArrowBackIos,
  BreakfastDining,
  Check,
  DinnerDining,
  LocationCity,
  Map,
  Star,
} from "@mui/icons-material";
import CustomTextFieldComponent from "./cTF";
import { loremIpsum, transparentBlack } from "@/constants";
import { ApiCallProps, makeGetCall, submitCustomPackage } from "@/app/db/api";
import { FILE_BASE_URL, GET_HOTELS } from "@/app/db/Routes";
import { Hotel } from "@/app/type/Hotel";

import Marquee from "react-fast-marquee";
import SignatureCanvas from "react-signature-canvas";
import CustomPackage from "@/app/type/CustomPackage";
import toast, { Toaster } from "react-hot-toast";
import TabPanel from "@/app/type/TabPanel";

const CustomPackageForm = () => {
  const [step, setStep] = useState(1);
  interface FormData {
    name: string;
    tourDays: string;
    flightFrom: string;
    country: string;
    city: string;
    numberOfTravelers: string;
    numberOfNightsMakkah: string;
    numberOfNightsMadinah: string;
    phone: string;
    email: string;
    departureDate: Date | null;
    returnDate: Date | null;
    additionalComments: string;
  }
  const [formData, setFormData] = useState<FormData>({
    name: "",
    tourDays: "",
    flightFrom: "",
    country: "",
    city: "",
    numberOfTravelers: "",
    numberOfNightsMakkah: "",
    numberOfNightsMadinah: "",
    phone: "",
    email: "",
    additionalComments: "",
    departureDate: null,
    returnDate: null,
  });
  function resetForm() {
    setStep(1);
    setVisaInfos([]);
    setAccepetTerms(false);
    setFormData({
      name: "",
      tourDays: "",
      flightFrom: "",
      country: "",
      city: "",
      numberOfTravelers: "",
      numberOfNightsMakkah: "",
      numberOfNightsMadinah: "",
      phone: "",
      email: "",
      additionalComments: "",
      departureDate: null,
      returnDate: null,
    });
  }

  const handleChange = (field: keyof FormData, value: string | number) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    // Handle form submission here
    console.log(formData);
  };
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  function checkNextButton() {
    var check = false;
    check =
      formData.city == "" ||
      formData.country == "" ||
      formData.flightFrom == "" ||
      formData.email == "" ||
      formData.name == "" ||
      formData.numberOfNightsMadinah == "" ||
      formData.numberOfNightsMakkah == "" ||
      formData.phone == "" ||
      formData.tourDays == "" ||
      formData.numberOfTravelers == "";
    console.log(formData);
    return !check;
  }

  const [hotels, setHotels] = useState<Array<Hotel>>();

  function loadHotels() {
    const props: ApiCallProps = {
      postUrl: GET_HOTELS,
      data: undefined,
      onStart: function (): void {
        //(true);
      },
      onProgressEnd: function (): void {
        //setLoading(false);
      },
      onSuccess: function (res: any) {
        console.log(res);
        setHotels(res.map((hotel: any) => Hotel.fromJSON(hotel)));
      },
      onUnexpected: function (res: any) {
        console.log("Unexpected Result:", res);
      },
    };

    makeGetCall(props);
  }

  useEffect(loadHotels, []);

  const [madinaSelectedHotel, setMadinaSelectedHotel] = useState<Hotel>();
  const [makkahSelectedHotel, setMakkahSelectedHotel] = useState<Hotel>();
  function formatNumber(num: number): string {
    const suffixes = ["", "K", "M", "B", "T"];
    const magnitude = Math.floor(Math.log10(Math.abs(num)) / 3);
    const rounded = num / Math.pow(10, magnitude * 3);
    const suffix = suffixes[magnitude];

    return rounded.toFixed(1) + suffix;
  }
  function getHotelTotal(e: Hotel, isMakkah: boolean) {
    // Use correct nights based on hotel location
    var nights = isMakkah 
      ? parseInt(formData.numberOfNightsMakkah || "0")
      : parseInt(formData.numberOfNightsMadinah || "0");
    var travelers = parseInt(formData.numberOfTravelers || "0");
    
    // Handle charges - convert to string first, then parse
    var chargesValue: number | string = e.charges || 0;
    var chargesStr: string = String(chargesValue);
    var charges = parseFloat(chargesStr.replace(/[^0-9.-]+/g, '')) || 0;
    
    var value = nights * travelers * charges;
    if (isNaN(value) || value < 0) value = 0;
    return value.toFixed(2) + " " + (e.currency || "USD");
  }

  const [pad, setPad] = useState<SignatureCanvas>();

  function getStats() {
    var value = 0.0;
    var expression = "";
    
    // Calculate Madinah hotel total
    if (madinaSelectedHotel != undefined) {
      var madinahNights = parseFloat(formData.numberOfNightsMadinah || "0");
      var travelers = parseFloat(formData.numberOfTravelers || "0");
      
      // Handle charges - convert to string first, then parse (handles both number and string)
      var chargesValue: number | string = madinaSelectedHotel.charges || 0;
      var chargesStr: string = String(chargesValue);
      // Remove currency symbols and parse
      var madinahCharges = parseFloat(chargesStr.replace(/[^0-9.-]+/g, '')) || 0;
      
      var madinahTotal = madinahNights * travelers * madinahCharges;
      if (!isNaN(madinahTotal) && madinahTotal > 0) {
        value += madinahTotal;
        console.log(`Madinah: ${madinahNights} nights × ${travelers} travelers × ${madinahCharges} = ${madinahTotal}`);
      }
    }
    
    // Calculate Makkah hotel total
    if (makkahSelectedHotel != undefined) {
      var makkahNights = parseFloat(formData.numberOfNightsMakkah || "0");
      var makkahTravelers = parseFloat(formData.numberOfTravelers || "0");
      
      // Handle charges - convert to string first, then parse (handles both number and string)
      var chargesValue: number | string = makkahSelectedHotel.charges || 0;
      var chargesStr: string = String(chargesValue);
      // Remove currency symbols and parse
      var makkahCharges = parseFloat(chargesStr.replace(/[^0-9.-]+/g, '')) || 0;
      
      var makkahTotal = makkahNights * makkahTravelers * makkahCharges;
      if (!isNaN(makkahTotal) && makkahTotal > 0) {
        value += makkahTotal;
        console.log(`Makkah: ${makkahNights} nights × ${makkahTravelers} travelers × ${makkahCharges} = ${makkahTotal}`);
      }
    }

    // Ensure value is never NaN
    if (isNaN(value) || value < 0) {
      value = 0.0;
    }

    console.log(`Total calculation: ${value.toFixed(2)}`);
    return { total: parseFloat(value.toFixed(2)), expression: expression };
  }

  const [termsDialog, setTermsDialog] = useState(false);
  const [acceptedTerms, setAccepetTerms] = useState(false);

  const [visasInfo, setVisaInfos] = useState<Array<string>>([]);
  const [passportInfoDone, setPassportInfo] = useState(false);
  const [passportInfoDialog, setPassportInfoDialog] = useState(false);

  function generateVisaDropdowns() {
    var n = Number(formData.numberOfTravelers);
    var array = [];
    for (var i = 0; i < n; i++) {

      array.push(<div className="w-full gap-2 items-center flex flex-row">
        <span>T#{i + 1}</span>
        <Select
          fullWidth
          labelId="Passport Type"
          id={"passport_type" + i}
          value={visasInfo[i]}
          onChange={(e) => {
            visasInfo[i] = e.target.value.toString();
            setVisaInfos(visasInfo)
            console.log(visasInfo);
          }}
        >
          <MenuItem value="Green">Green</MenuItem>
          <MenuItem value="Red">Red</MenuItem>
        </Select>
      </div>)
    }

    return array;
  }

  return (
    <div className="flex w-full  flex-col">
      {/* ------------------------------------------------------------------------------------------------ */}
      {/* Basic Layout */}
      {/* ------------------------------------------------------------------------------------------------ */}

      <Dialog
        PaperProps={{
          sx: {
            borderRadius: 10,
            padding: 2,
          },
        }}
        open={termsDialog}
      >
        <DialogTitle>Terms & Conditions</DialogTitle>
        <DialogContent>
          <Typography>{loremIpsum}</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setTermsDialog(false);
              setAccepetTerms(true);
            }}
            variant="contained"
            color="success"
          >
            Agree
          </Button>
          <Button
            onClick={() => {
              setTermsDialog(false);
              setAccepetTerms(false);
            }}
            variant="outlined"
            color="error"
          >
            Dismiss
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        PaperProps={{
          sx: {
            borderRadius: 10,
            padding: 2,
          },
        }}
        open={passportInfoDialog}
      >
        <DialogTitle className="font-bold">Traveler's Passport Information</DialogTitle>
        <DialogContent>
          <Typography>Please Select Passport Type of each traveler</Typography>

          <div className="flex flex-col gap-1">
            {
              generateVisaDropdowns()
            }
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setPassportInfoDialog(false);

            }}
            variant="contained"
            color="success"
            sx={{ borderRadius: 10 }}
          >
            Continue
          </Button>

        </DialogActions>
      </Dialog>
      <div className="flex gap-4 mb-4 ">
        {step != 1 && step != 4 && (
          <div
            onClick={() => setStep(step - 1)}
            className="w-10 h-10 mb-3 center flex items-center justify-center px-2 py-1 hover:shadow-md hover:cursor-pointer hover:shadow-white hover:text-black rounded-lg border-white border-[2px]"
          >
            <ArrowBackIos htmlColor="white" />
          </div>
        )}
        <span className=" text-white  w-full">
          {step == 1 ? (
            <span className="bold-54 font-bold text-3xl">Enter Details </span>
          ) : (
            ""
          )}
          {step == 2 ? (
            <div className=" ">
              <span className="bold-54 font-bold sm:text-3xl text-2xl">
                Select Hotels
              </span>
            </div>
          ) : (
            ""
          )}
          {step == 3 ? (
            <div className=" flexBetween ">
              <span className="bold-54 font-bold sm:text-3xl text-2xl">
                Submit Now
              </span>
            </div>
          ) : (
            ""
          )}

          {step == 4 ? (
            <div className=" flexBetween ">
              <span className="bold-54 font-bold sm:text-3xl text-2xl">
                Submitted Succesfully
              </span>
            </div>
          ) : (
            ""
          )}
        </span>
      </div>

      {step == 1 && (
        <Grid container spacing={2}>
          {/* 1 */}

          <Grid item sm={8}>
            <CustomTextFieldComponent
              label="Your Name"
              textColor="white"
              backgroundColor={transparentBlack}
              hintColor="white"
              onChange={(e) => handleChange("name", e)}
              val={formData.name}
            />
          </Grid>
          <Grid item sm={4}>
            <CustomTextFieldComponent
              label="Tour Days"
              textColor="white"
              backgroundColor={transparentBlack}
              hintColor="white"
              onChange={(e) => handleChange("tourDays", e)}
              val={formData.tourDays}
            />
          </Grid>
          <Grid item sm={4}>
            <CustomTextFieldComponent
              label="Flight From (Airport Name)"
              textColor="white"
              backgroundColor={transparentBlack}
              hintColor="white"
              onChange={(e) => handleChange("flightFrom", e)}
              val={formData.flightFrom}
            />
          </Grid>
          <Grid item sm={4}>
            <CustomTextFieldComponent
              label="Your Country"
              textColor="white"
              backgroundColor={transparentBlack}
              hintColor="white"
              onChange={(e) => handleChange("country", e)}
              val={formData.country}
            />
          </Grid>
          <Grid item sm={4}>
            <CustomTextFieldComponent
              label="Your City"
              textColor="white"
              backgroundColor={transparentBlack}
              hintColor="white"
              onChange={(e) => handleChange("city", e)}
              val={formData.city}
            />
          </Grid>
          <Grid item sm={4}>
            <CustomTextFieldComponent
              label="Number Of Travelers"
              textColor="white"
              backgroundColor={transparentBlack}
              hintColor="white"
              onChange={(e) => handleChange("numberOfTravelers", e)}
              val={formData.numberOfTravelers}
            />
          </Grid>
          <Grid item sm={4}>
            <CustomTextFieldComponent
              label="No. Of Nights (In Makkah)"
              textColor="white"
              backgroundColor={transparentBlack}
              hintColor="white"
              onChange={(e) => handleChange("numberOfNightsMakkah", e)}
              val={formData.numberOfNightsMakkah}
            />
          </Grid>
          <Grid item sm={4}>
            <CustomTextFieldComponent
              label="No. Of Nights (In Madinah)"
              textColor="white"
              backgroundColor={transparentBlack}
              hintColor="white"
              onChange={(e) => handleChange("numberOfNightsMadinah", e)}
              val={formData.numberOfNightsMadinah}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CustomTextFieldComponent
              label="Your Phone"
              textColor="white"
              backgroundColor={transparentBlack}
              hintColor="white"
              onChange={(e) => handleChange("phone", e)}
              val={formData.phone}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextFieldComponent
              label="Your Email"
              textColor="white"
              backgroundColor={transparentBlack}
              onChange={(e) => handleChange("email", e)}
              val={formData.email}
              hintColor="white"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <CustomTextFieldComponent
              label="Comments (i.e any special passport?)"
              textColor="white"

              backgroundColor={transparentBlack}
              onChange={(e) => handleChange("additionalComments", e)}
              val={formData.additionalComments}
              hintColor="white"
            />
          </Grid>

          <Grid item xs={12} sm={3}></Grid>
          <Grid item xs={12} sm={12}>
            <div
              onClick={() => {
                if (checkNextButton()) {
                  setStep(step + 1);
                  var n = Number(formData.numberOfTravelers);
                  setVisaInfos([]);
                  for (let index = 0; index < n; index++) {
                    visasInfo.push("Green");
                  }
                  setVisaInfos(visasInfo);
                }
              }}
              className="hover:cursor-pointer hover:shadow-white hover:shadow-sm bg-white rounded-lg px-3 py-2 w-44 text-center "
            >
              NEXT
            </div>
          </Grid>
        </Grid>
      )}
      {step == 2 && (
        <div>
          {false && (
            <div className="w-full h-40 justify-center flex flex-col items-center  ">
              <CircularProgress
                size={70}
                sx={{
                  color: "orange",
                  borderRadius: 20,
                  borderWidth: 3,
                  padding: 1,
                }}
              />
            </div>
          )}
          {true && (
            <div className="w-full mb-10 ">
              <Tabs onChange={handleTabChange}>
                <Tab
                  sx={{ textTransform: "none", padding: 0, marginX: 1 }}
                  component="h1"
                  icon={
                    <div
                      className={`  items-center flex-center flex rounded-md ${tabValue == 0
                        ? "bg-white text-black"
                        : " text-slate-200"
                        } sm:px-6 py-2  sm:text-[20px]`}
                    >
                      <span className="mx-2 ">In Makkah</span>
                    </div>
                  }
                  className="flex flex-row"
                />
                <Tab
                  sx={{ textTransform: "none", padding: 0, marginX: 1 }}
                  component="h1"
                  icon={
                    <div
                      className={` flex-row items-center flex-center flex rounded-md ${tabValue == 1
                        ? "bg-white text-black"
                        : " text-slate-200"
                        } sm:px-6 py-2  sm:text-[20px]`}
                    >
                      <span className="mx-2 ">In Madina</span>
                    </div>
                  }
                  className="flex flex-row "
                />
              </Tabs>
              <div>
                <TabPanel value={tabValue} index={0}>
                  <div className="flex flex-col mt-2">
                    {hotels != null
                      ? hotels!
                        .filter(
                          (e) =>
                            e.location.includes("makkah") ||
                            e.location.includes("Makkah") ||
                            e.location.includes("macca") ||
                            e.location.includes("meccah")
                        )
                        .map((e) => (
                          <div className="w-full sm:flex-row flex-col flex gap-4 my-2 font-bold sm:mx-4 bg-white rounded-xl p-2 ">
                            <div className="flex sm:flex-row flex-col gap-3">
                              <img
                                className="sm:w-62 sm:h-44 rounded-xl"
                                src={FILE_BASE_URL + e.image}
                                onError={(evt) => {
                                  const target = evt.target as HTMLImageElement;
                                  target.src = '/images/kaba1.jpg';
                                }}
                                alt={e.name}
                              />
                              <div className="gap-2 flex-col">
                                <span className="sm:text-[25px] text-[20px]">
                                  {e.name}
                                </span>
                                <div className="gap-2 flex ">
                                  <span className="font-normal sm:text-[20px] text-[14px]">
                                    {parseFloat(e.rating.toString()).toFixed(
                                      1
                                    ) + "/5.0 Ratings"}
                                  </span>
                                </div>
                                <span className="sm:text-[25px] text-[18px] text-red-500 font-bold">
                                  {e.currency + e.charges}
                                </span>{" "}
                                <span className="font-normal ">
                                  Per Night
                                </span>
                                <div className="flex flex-row   sm:gap-2 gap-1 mt-2 h-8">
                                  <div className="flex flex-row gap-2 font-normal text-white  sm:text-[14px] text-[11px] justify-center bg-sky-600 rounded-full sm:py-1 sm:px-4 px-2 items-center">
                                    <span>Dinner</span>
                                  </div>
                                  <div className="flex flex-row gap-2 font-normal text-white  sm:text-[14px] text-[11px] justify-center bg-green-600 rounded-full sm:py-1 sm:px-4 px-2 items-center">
                                    <span>Breakfast</span>
                                  </div>
                                  <div className="sm:display hidden sm:flex flex-row gap-2 font-normal text-white text-[11px] bg-indigo-400 rounded-full py-1 px-4">
                                    <span>Wifi</span>
                                  </div>
                                  <div
                                    onClick={() =>
                                      window.open("tel:+" + e.phone)
                                    }
                                    className="sm:display hidden sm:flex flex-row gap-2 font-normal hover:cursor-pointer text-white text-[14px] bg-black rounded-full py-1 px-4"
                                  >
                                    <span>Helpline</span>
                                  </div>
                                  <a
                                    target="_top"
                                    href={"mailto:" + e.email}
                                    className="sm:display hidden sm:flex  flex-row gap-2 font-normal hover:cursor-pointer text-white text-[14px] bg-orange-500 rounded-full py-1 px-4"
                                  >
                                    Email
                                  </a>
                                </div>
                                <div className="flex flex-row gap-2 mt-2">
                                  <Marquee>{e.description}</Marquee>
                                </div>
                              </div>
                            </div>

                            <div
                              onClick={() => {
                                if (
                                  makkahSelectedHotel != null &&
                                  e.id == makkahSelectedHotel.id
                                ) {
                                  setMakkahSelectedHotel(undefined);
                                  return;
                                }
                                setMakkahSelectedHotel(e);
                              }}
                              className=" flex h-[40px] hover:cursor-pointer hover:shadow-white hover:shadow-sm bg-black text-white rounded-lg px-3 py-2  text-center "
                            >
                              {makkahSelectedHotel == null
                                ? "SELECT"
                                : makkahSelectedHotel.id == e.id
                                  ? getHotelTotal(e, true)
                                  : "SELECT"}
                            </div>
                          </div>
                        ))
                      : ""}
                  </div>
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                  <div className="flex flex-col mt-2">
                    {hotels != null
                      ? hotels!
                        .filter(
                          (e) => {
                            const loc = e.location.toLowerCase();
                            return loc.includes("madina") || 
                                   loc.includes("madinah") || 
                                   loc.includes("medina") ||
                                   loc.includes("medinah");
                          }
                        )
                        .map((e) => (
                          <div className="w-full sm:flex-row flex-col flex gap-4 my-2 font-bold sm:mx-4 bg-white rounded-xl p-2 ">
                            <div className="flex sm:flex-row flex-col gap-3">
                              <img
                                className="sm:w-62 sm:h-44 rounded-xl"
                                src={FILE_BASE_URL + e.image}
                                onError={(evt) => {
                                  const target = evt.target as HTMLImageElement;
                                  target.src = '/images/kaba1.jpg';
                                }}
                                alt={e.name}
                              />
                              <div className="gap-2 flex-col">
                                <span className="sm:text-[25px] text-[20px]">
                                  {e.name}
                                </span>
                                <div className="gap-2 flex ">
                                  <span className="font-normal sm:text-[20px] text-[14px]">
                                    {parseFloat(e.rating.toString()).toFixed(
                                      1
                                    ) + "/5.0 Ratings"}
                                  </span>
                                </div>
                                <span className="sm:text-[25px] text-[18px] text-red-500 font-bold">
                                  {e.currency + e.charges}
                                </span>{" "}
                                <span className="font-normal ">
                                  Per Night
                                </span>
                                <div className="flex flex-row   sm:gap-2 gap-1 mt-2 h-8">
                                  <div className="flex flex-row gap-2 font-normal text-white  sm:text-[14px] text-[11px] justify-center bg-sky-600 rounded-full sm:py-1 sm:px-4 px-2 items-center">
                                    <span>Dinner</span>
                                  </div>
                                  <div className="flex flex-row gap-2 font-normal text-white  sm:text-[14px] text-[11px] justify-center bg-green-600 rounded-full sm:py-1 sm:px-4 px-2 items-center">
                                    <span>Breakfast</span>
                                  </div>
                                  <div className="sm:display hidden sm:flex flex-row gap-2 font-normal text-white text-[11px] bg-indigo-400 rounded-full py-1 px-4">
                                    <span>Wifi</span>
                                  </div>
                                  <div
                                    onClick={() =>
                                      window.open("tel:+" + e.phone)
                                    }
                                    className="sm:display hidden sm:flex flex-row gap-2 font-normal hover:cursor-pointer text-white text-[14px] bg-black rounded-full py-1 px-4"
                                  >
                                    <span>Helpline</span>
                                  </div>
                                  <a
                                    target="_top"
                                    href={"mailto:" + e.email}
                                    className="sm:display hidden sm:flex  flex-row gap-2 font-normal hover:cursor-pointer text-white text-[14px] bg-orange-500 rounded-full py-1 px-4"
                                  >
                                    Email
                                  </a>
                                </div>
                                <div className="flex flex-row gap-2 mt-2">
                                  <Marquee>{e.description}</Marquee>
                                </div>
                              </div>
                            </div>

                            <div
                              onClick={() => {
                                if (
                                  madinaSelectedHotel != null &&
                                  e.id == madinaSelectedHotel.id
                                ) {
                                  setMadinaSelectedHotel(undefined);
                                  return;
                                }
                                setMadinaSelectedHotel(e);
                              }}
                              className=" flex h-[40px] hover:cursor-pointer hover:shadow-white hover:shadow-sm bg-black text-white rounded-lg px-3 py-2  text-center "
                            >
                              {madinaSelectedHotel == null
                                ? "SELECT"
                                : madinaSelectedHotel.id == e.id
                                  ? getHotelTotal(e, false)
                                  : "SELECT"}
                            </div>
                          </div>
                        ))
                      : ""}
                  </div>
                </TabPanel>
              </div>
            </div>
          )}

          <div className="">
            {(makkahSelectedHotel || madinaSelectedHotel) && (
              <div className="flex flex-col bg-white rounded-xl p-2 m-2">
                {makkahSelectedHotel && (
                  <div className="text-[16px] font-normal flex gap-2 mb-2">
                    <span className="w-52 flex font-semibold">Makkah Hotel:</span>
                    <span className="flex-1">{makkahSelectedHotel.name}</span>
                  </div>
                )}
                {madinaSelectedHotel && (
                  <div className="text-[16px] font-normal flex gap-2 mb-2">
                    <span className="w-52 flex font-semibold">Madinah Hotel:</span>
                    <span className="flex-1">{madinaSelectedHotel.name}</span>
                  </div>
                )}
                <div className="border-t border-gray-300 my-2"></div>
                <div className="text-[16px] font-normal flex gap-2">
                  <span className="w-52 flex">Nights In Makkah</span>
                  <span>{formData.numberOfNightsMakkah || "0"}</span>
                </div>
                <div className="text-[16px] font-normal flex gap-2">
                  <span className="w-44 flex">Nights In Madinah</span>
                  <span>{formData.numberOfNightsMadinah || "0"}</span>
                </div>
                <div className="text-[16px] font-normal flex gap-2">
                  <span className="w-44 flex">Travelers</span>
                  <span>{formData.numberOfTravelers || "0"}</span>
                </div>
                <div className="border-t border-gray-300 my-2"></div>
                <div className="text-[16px] font-bold flex gap-2">
                  <span className="w-44">Total</span>
                  <span className="font-bold sm:text-[20px] text-[15px] text-red-600">
                    {(makkahSelectedHotel?.currency || madinaSelectedHotel?.currency || "USD")} {getStats().total.toFixed(2)}
                  </span>
                </div>
              </div>
            )}
          </div>
          <div
            onClick={() => {
              setStep(3);
            }}
            className="hover:cursor-pointer hover:shadow-white hover:shadow-sm bg-white rounded-lg px-3 py-2 w-44 text-center "
          >
            NEXT
          </div>
        </div>
      )}
      {step == 3 && (
        <div>
          {true && (
            <div className="flex flex-col text-white">
              {" Please draw your signature Below to  "}
              <div className="w-full justify-center  flex flex-col items-center  gap-2 ">
                <SignatureCanvas
                  ref={(ref: any) => {
                    setPad(ref);
                  }}
                
            
                  canvasProps={{
                    className: "sigCanvas w-full h-72 bg-white rounded-xl",
                  }}
                />
              </div>

              <div
                onClick={() => {
                  if (pad != undefined) {
                    pad!.clear();
                  }
                }}
                className="my-4 cursor-pointer rounded-xl justify-center items-center center h-[40px] w-44 bg-red-500 text-white px-5 py-2"
              >
                RESET
              </div>
            </div>
          )}

          <div className="">
            {(makkahSelectedHotel || madinaSelectedHotel) && (
              <div className="flex flex-col bg-white rounded-xl p-2 m-2">
                {makkahSelectedHotel && (
                  <div className="text-[16px] font-normal flex gap-2 mb-2">
                    <span className="w-52 flex font-semibold">Makkah Hotel:</span>
                    <span className="flex-1">{makkahSelectedHotel.name}</span>
                  </div>
                )}
                {madinaSelectedHotel && (
                  <div className="text-[16px] font-normal flex gap-2 mb-2">
                    <span className="w-52 flex font-semibold">Madinah Hotel:</span>
                    <span className="flex-1">{madinaSelectedHotel.name}</span>
                  </div>
                )}
                <div className="border-t border-gray-300 my-2"></div>
                <div className="text-[16px] font-normal flex gap-2">
                  <span className="w-52 flex">Nights In Makkah</span>
                  <span>{formData.numberOfNightsMakkah || "0"}</span>
                </div>
                <div className="text-[16px] font-normal flex gap-2">
                  <span className="w-44 flex">Nights In Madinah</span>
                  <span>{formData.numberOfNightsMadinah || "0"}</span>
                </div>
                <div className="text-[16px] font-normal flex gap-2">
                  <span className="w-44 flex">Travelers</span>
                  <span>{formData.numberOfTravelers || "0"}</span>
                </div>
                <div className="border-t border-gray-300 my-2"></div>
                <div className="text-[16px] font-bold flex gap-2">
                  <span className="w-44">Total</span>
                  <span className="font-bold sm:text-[20px] text-[15px] text-red-600">
                    {(makkahSelectedHotel?.currency || madinaSelectedHotel?.currency || "USD")} {getStats().total.toFixed(2)}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-row  text-white  my-5 items-center ">
            <span
              className="cursor-pointer text-blue-300"
              onClick={() => setTermsDialog(true)}
            >
              Agree to Terms & Conditions{" "}
            </span>
            {acceptedTerms && <div className="text-white bg-white mx-5 p-1 rounded-full ">
              <Check color={acceptedTerms ? "success" : "error"} />
            </div>}
          </div>

          <div
            onClick={() => {





              if (!acceptedTerms) {
                setTermsDialog(true);
                return;
              }
              if (pad != undefined && !pad!.isEmpty()) {


                const dataURL = pad!.toDataURL();
                var hotel_madina_id: string = "-1";
                var hotel_makkah_id: string = "-1";
                if (madinaSelectedHotel != null && madinaSelectedHotel != undefined) {
                  hotel_madina_id = madinaSelectedHotel.id.toString();
                }
                if (makkahSelectedHotel != null && makkahSelectedHotel != undefined) {
                  hotel_makkah_id = makkahSelectedHotel.id.toString();
                }

                // Wrap submitCustomPackage in a Promise so toast.promise can properly track success/error
                const submitPromise = new Promise<void>((resolve, reject) => {
                  submitCustomPackage(
                    new CustomPackage({
                      id: -1,
                      user_name: formData.name,
                      country: formData.country,
                      city: formData.city,
                      additional_comments: formData.additionalComments,
                      tour_days: Number(formData.tourDays),
                      phone: formData.phone,
                      email: formData.email,
                      hotel_madina_id: hotel_madina_id,
                      hotel_makkah_id: hotel_makkah_id,
                      no_of_travelers: parseInt(formData.numberOfTravelers),
                      nights_in_madina: parseInt(formData.numberOfNightsMadinah),
                      nights_in_makkah: parseInt(formData.numberOfNightsMakkah),
                      created_at: undefined,
                      updated_at: undefined,
                      travelers_visa_details: "",
                      flight_from: formData.flightFrom,
                      total_amount_hotels: (getStats().total || 0).toString(),
                      signature_image_url: dataURL,
                    }),
                    function (): void {
                      //start

                    },
                    function (): void {
                      //end - don't set step here, only set on actual success
                    },
                    function (res: any) {
                      //success - resolve promise and set step
                      setStep(4);
                      resolve();
                    },
                    function (e: any) {
                      //error - reject promise, don't set step
                      console.error("Custom package submission error:", e);
                      reject(e);
                    }
                  );
                });

                toast.promise(
                  submitPromise,
                  {


                    loading: 'Submitting Your Details',
                    success: <b>Custom Package Submitted Successfully!</b>,
                    error: <b>Failed to submit. Please try again or contact support.</b>,

                  }

                );

              }
            }}
            className="hover:cursor-pointer hover:shadow-white hover:shadow-sm bg-white rounded-lg px-3 py-2 w-44 text-center "
          >
            <Toaster position="bottom-center" />

            Submit
          </div>
        </div>
      )}
      {step == 4 && (
        <div>
          {true && (
            <div className="flex flex-col text-white w-full justify-center items-center ">
              {" Your package submitted our team will reach your after verification "}
              <div className="w-22 my-10 h-22 p-4  justify-center bg-white rounded-full  flex flex-col items-center  gap-2 ">
                <Check htmlColor="green" fontSize="large" />
              </div>


            </div>
          )}




          <div
            onClick={() => {

              //pad!.clear();
              resetForm();
            }}
            className="hover:cursor-pointer hover:shadow-white hover:shadow-sm bg-white rounded-lg px-3 py-2 w-44 text-center "
          >
            {/* <Toaster position="bottom-center" /> */}

            Start Over
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomPackageForm;
