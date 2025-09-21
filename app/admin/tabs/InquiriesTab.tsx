import { GET_DELETE_INQUIRY, GET_INQUIRIES } from "@/app/db/Routes";
import { ApiCallProps, makeGetCall } from "@/app/db/api";
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
} from "@mui/material";
import { IconUserCircle } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export function InquiriesTab() {
  const [inquires, setInquiries] = useState<Array<Inquiry>>();
  const [loading, setLoading] = useState(true);

  function loadInquiries() {
    const props: ApiCallProps = {
      postUrl: GET_INQUIRIES,
      data: undefined,
      onStart: function (): void {
        setLoading(true);
      },
      onProgressEnd: function (): void {
        setLoading(false);
      },
      onSuccess: function (res: any) {
        setInquiries(res.map((inquiry: any) => Inquiry.fromJson(inquiry)));
      },
      onUnexpected: function (res: any) {
        console.log("Unexpected Result:", res);
      },
    };
    makeGetCall(props);
  }

  const [inquiryToView, setInquiryToView] = useState<Inquiry>();

  useEffect(() => {
    loadInquiries();
  }, []);

  function deleteInquiry(id: string) {
    const props: ApiCallProps = {
      postUrl: GET_DELETE_INQUIRY + id,
      data: null,
      onStart: function (): void {
        setLoading(true);
      },
      onProgressEnd: function (): void {
        setLoading(false);
      },
      onSuccess: function (res: any) {
        loadInquiries();
      },
      onUnexpected: function (res: any) {
        console.log("Unexpected Result:", res);
      },
    };
    setInquiryToView(undefined);
    toast.promise(makeGetCall(props), {
      loading: "Deleting...",
      success: <b>Inquiry Deleted Successfully...</b>,
      error: <b>Something went wrong!.</b>,
    });
  }

  function getInquiryViewDialog() {
    return (
      <Dialog open={inquiryToView != undefined} fullScreen>
        <DialogTitle className="bg-yellow-50 font-bold text-[25px]">
          Inquiry Details
        </DialogTitle>
        <DialogContent sx={{ padding: 0 }}>
          <Card
            className="center flex w-full gap-1 flex-col items-center p-3"
            sx={{
              borderRadius: "2px",

              width: window.innerWidth,
              height: 300,
            }}
          >
            <div className="flex  flex-row items-center">
              <h1 className=" text-center text-black-800  text-[20px]">
                {inquiryToView?.name}
              </h1>
            </div>

            <div className="flex  flex-row items-center">
              <Smartphone sx={{ width: 18, height: 18 }} />

              <h1 className=" text-center text-green-800  text-[20px]">
                {inquiryToView?.phone}
              </h1>
            </div>
            <div className="flex flex-row items-center">
              <Email sx={{ width: 18, height: 18 }} />
              <h1 className="ms-1 text-center text-green-800  text-[20px]">
                {inquiryToView?.email}
              </h1>
            </div>
            <h1 className="w-full text-center font-bold text-[20px]">
              {inquiryToView?.created_at.replace("T", " ").split(".")[0]}
            </h1>
            <div className=" flex flex-1 border-width-2px p-1 w-full border-gray-200 rounded-xl border-[2px]">
              <h1 className=" m-2 overflow-auto text-black  text-[15px]">
                {inquiryToView?.message}
              </h1>
            </div>
          </Card>
        </DialogContent>
        <DialogActions sx={{ paddingBottom: 3 }}>
          <Button
            onClick={() => deleteInquiry(inquiryToView?.id ?? "")}
            sx={{ borderRadius: 10, paddingX: 6 }}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
          <Button
            onClick={() => setInquiryToView(undefined)}
            sx={{ borderRadius: 10, paddingX: 6, backgroundColor: "orange" }}
            variant="contained"
          >
            Dismiss
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <div
      className="w-full flex flex-col bg-gray-100 overflow-auto"
      style={{ height: "800px" }}
    >
      <Toaster position="bottom-center" />

      {inquiryToView && getInquiryViewDialog()}

      <h1 className="font-bold text-black text-2xl px-5 bg-yellow-50 py-5 ">
        User Inquiries
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
      {!loading && inquires?.length == 0 && (
        <div className="w-full text-center h-[500px] flex flex-col items-center  ">
          <h1 className="w-full h-full self-center mt-64 text-gray-20 font-bold text-[30px] text-center">
            No Inquiries Found
          </h1>
        </div>
      )}

      {!loading && (
        <Grid container>
          {inquires?.map((inquiry: Inquiry) => (
            <Grid md={2.6} padding={3}>
              <Card
                onClick={() => setInquiryToView(inquiry)}
                className="center flex w-full gap-1 flex-col items-center hover:cursor-pointer hover:shadow-xl hover:shadow-gray-300"
                sx={{
                  borderRadius: "16px",

                  width: 220,
                  height: 300,
                }}
              >
                <h1 className="w-full text-center text-white font-bold  bg-black p-2 text-[15px]">
                  {inquiry.name}
                </h1>
                <IconUserCircle
                  size={"100px"}
                  stroke={1}
                  className="rounded-full text-yellow-500  w-full"
                />

                <div className="flex  flex-row items-center">
                  <Smartphone sx={{ width: 18, height: 18 }} />

                  <h1 className=" text-center text-green-800  text-[15px]">
                    {inquiry.phone}
                  </h1>
                </div>
                <div className="flex flex-row items-center">
                  <Email sx={{ width: 18, height: 18 }} />
                  <h1 className="ms-1 text-center text-green-800  text-[15px]">
                    {inquiry.email}
                  </h1>
                </div>
                <h1 className="w-full text-center font-bold text-[12px]">
                  {inquiry.created_at.replace("T", " ").split(".")[0]}
                </h1>
                <div className="flex flex-1 border-width-2px w-full  border-gray-200 rounded-xl border-[2px]">
                  <h1 className="text-center p-2 text-black  text-[15px]">
                    {inquiry.message.length > 40
                      ? inquiry.message.substring(0, 45)
                      : inquiry.message}
                    <br />
                    {inquiry.message.length > 40 && (
                      <span className="font-bold cursor-pointer">
                        read more
                      </span>
                    )}
                  </h1>
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}
