import { BACKEND_BASE_URL, GET_CUSTOM_PACKAGES, GET_DELETE_CUSTOM_PACKAGES } from "@/app/db/Routes";
import { ApiCallProps, makeGetCall } from "@/app/db/api";
import CustomPackage from "@/app/type/CustomPackage";
import Inquiry from "@/app/type/Inquiry";
import { Email, NoAdultContent, Phone, Smartphone } from "@mui/icons-material";
import {
  Button,
  Card,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Icon,
  TextField,
} from "@mui/material";
import { IconUserCircle } from "@tabler/icons-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export function CustomPackagesTab() {
  const [packages, setPackages] = useState<Array<CustomPackage>>();
  const [loading, setLoading] = useState(true);

  function loadCustomPackages() {
    const props: ApiCallProps = {
      postUrl: GET_CUSTOM_PACKAGES,
      data: undefined,
      onStart: function (): void {
        setLoading(true);
      },
      onProgressEnd: function (): void {
        setLoading(false);
      },
      onSuccess: function (res: any) {
        console.log(res);
        setPackages(res.map((inquiry: any) => CustomPackage.fromJson(inquiry)));
      },
      onUnexpected: function (res: any) {
        console.log("Unexpected Result:", res);
      },
    };
    makeGetCall(props);
  }

  const [CustomPackageToEdit, setCustomPackageToEdit] =
    useState<CustomPackage>();

  useEffect(() => {
    loadCustomPackages();
  }, []);

  const imagePicker = useRef<HTMLInputElement | null>(null);

  function deleteCustomPackage(p: CustomPackage | undefined) {
    if (p instanceof CustomPackage) {
      const props: ApiCallProps = {
        postUrl: GET_DELETE_CUSTOM_PACKAGES + p.id,
        data: null,
        onStart: function (): void {
          setLoading(true);
        },
        onProgressEnd: function (): void {
          setLoading(false);
          loadCustomPackages();

        },
        onSuccess: function (res: any) {
          console.log(res);
          loadCustomPackages();
        },
        onUnexpected: function (res: any) {
          console.log("Unexpected Result:", res);
        },
      };

      toast.promise(makeGetCall(props), {
        loading: "Deleting...",
        success: <b>CustomPackage Deleted Successfully...</b>,
        error: <b>Something went wrong!.</b>,
      });
    }
  }








  return (
    <div
      className="w-full flex flex-col bg-gray-100 overflow-auto"
      style={{ height: "800px" }}
    >


      <Toaster position="bottom-center" />



      <h1 className="font-bold text-black text-xl px-5 bg-yellow-50 py-5 ">
        Custom Packages
      </h1>

      {loading && (
        <div className="w-[900px]   flex flex-col items-center  ">
          <CircularProgress
            size={70}
            sx={{
              color: "orange",
              borderRadius: 20,
              borderWidth: 3,
              padding: 1,
            }}
            className="mt-48"
          />
        </div>
      )}
      {!loading && packages?.length == 0 && (
        <div className="w-full  text-center h-[500px] flex flex-col items-center  ">
          <h1 className="w-full h-full self-center mt-64 text-gray-20 font-bold text-[30px] text-center">
            No CustomPackages Found
          </h1>
        </div>
      )}

      {!loading && (
        <Grid className="" container>
          {packages?.map((pack: CustomPackage) => (
            <Grid md={6} padding={1}>
              <Card
                onClick={() => setCustomPackageToEdit(pack)}
                className="center flex p-2 w-full gap-1 flex-col items-center hover:cursor-pointer hover:shadow-md hover:shadow-gray-300"
                sx={{
                  borderRadius: "4px",
                }}
              >
                <div className="w-full flex ">
                  <span className="w-52 font-bold">Username</span>
                  <span>{pack.user_name}</span>
                </div>
                <div className="w-full flex ">
                  <span className="w-52 font-bold">Flight Form (Airport)</span>
                  <span>{pack.flight_from}</span>
                </div>
                <div className="w-full flex ">
                  <span className="w-52 font-bold">Country</span>
                  <span>{pack.country}</span>
                </div>
                <div className="w-full flex ">
                  <span className="w-52 font-bold">City</span>
                  <span>{pack.city}</span>
                </div>
                <div className="w-full flex ">
                  <span className="w-52 font-bold">Phone</span>
                  <span>{pack.phone}</span>
                </div>
                <div className="w-full flex ">
                  <span className="w-52 font-bold">Email</span>
                  <span>{pack.email}</span>
                </div>
                {pack.hotel_madina_id!='-1' && <div className="w-full flex ">
                  <span className="w-52 font-bold">Hotel Name (Madina)</span>
                  <span>{pack.hotel_madina_id}</span>
                </div>}
                {pack.hotel_madina_id!='-1' && <div className="w-full flex ">
                  <span className="w-52 font-bold">Hotel Name (Makkah)</span>
                  <span>{pack.hotel_makkah_id}</span>
                </div>}
               
                <div className="w-full flex ">
                  <span className="w-52 font-bold">No Of Travelers</span>
                  <span>{pack.no_of_travelers}</span>
                </div>
                <div className="w-full flex ">
                  <span className="w-52 font-bold">Tour Days</span>
                  <span>{pack.tour_days}</span>
                </div>

                <div className="w-full flex ">
                  <span className="w-52 font-bold">Nights In Madina</span>
                  <span>{pack.nights_in_madina}</span>
                </div>
                <div className="w-full flex ">
                  <span className="w-52 font-bold">Nights In Makkah</span>
                  <span>{pack.nights_in_makkah}</span>
                </div>
                <div className="w-full flex ">
                  <span className="w-52 font-bold">Approximate Total</span>
                  <span>{pack.total_amount_hotels + " USD"}</span>
                </div>
                {pack.additional_comments && <div className="w-full flex ">
                  <span className="w-52 font-bold">Additional Info</span>
                  <span>{pack.additional_comments + ""}</span>
                </div>}
                <div className="w-full flex flex-col ">
                  <span className="w-52 font-bold">E-Signature</span>

                  <img
                    alt="CustomPackage image"
                    className=" w-full rounded-xl"
                    // src={BACKEND_BASE_URL + pack.signature_image_url ?? "/kaba_image.jpg"}
                    width={200}
                    height={300}
                  />
                </div>




                <h1 className="w-full text-center text-[13px] font-bold text-black mt-2">
                  {pack.created_at!?.toString()}
                </h1>

                <Button onClick={()=>deleteCustomPackage(pack)} variant="contained" color="error" sx={{marginBottom:5 ,marginTop:5,borderRadius:10 ,width:300}}>
                  DELETE
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}
