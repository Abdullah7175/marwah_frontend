import { BACKEND_BASE_URL, FILE_BASE_URL, GET_BLOGS, GET_DELETE_BLOG, GET_DELETE_INQUIRY, GET_DELETE_PACKAGE, GET_DELETE_REVIEW, GET_REVIEWS } from "@/app/db/Routes";
import { ApiCallProps, createBlog, makeGetCall, updateBlogCloud } from "@/app/db/api";
import { Blog } from "@/app/type/Blog";
import BlogElement from "@/app/type/BlogElement";
import ReactPlayer from 'react-player'
import '../../../app/globals.css'

import { Email, Height, NoAdultContent, Phone, PlayArrow, Smartphone } from "@mui/icons-material";
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
import AddBlogDialog from "../addBlogDialog";
import EditBlogDialog from "../editBlogDialog";
import { Review } from "@/app/type/Review";
import ReviewDialog from "../addReviewDialog";

export function ReviewsTab() {
  const [reviews, setReviews] = useState<Array<Review>>();
  const [loading, setLoading] = useState(true);



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



  useEffect(() => {
    loadReviews();
  }, []);



  const imagePicker = useRef<HTMLInputElement | null>(null);

  function addBlog(p: Blog) {
    if (!p.image) {
      toast.error("Please Select Blog Main Photo", {
        style: {
          borderRadius: "20px",
          background: "black",
          color: "white",
        },
        duration: 3000,
      });

      return;
    }
    if (
      p.title === "" ||
      p.elements.length == 0
    ) {
      // Handle empty fields, maybe show an error message or prevent form submission

      toast.error("Please Fill Blog Data Accurately", {
        style: {
          borderRadius: "20px",
          background: "black",
          color: "white",
        },
        duration: 3000,
      });
      return;


    }




    toast.promise(createBlog(
      p,
      function (): void {
        //start
        setLoading(true);
      },
      function (): void {
        //end
        setLoading(false);
      },
      function (res: any) {
        //result

        loadReviews();
      },
      function (e: any) {
        //error
        console.log("Unexpected Result:", e);
      }
    ), {
      loading: "Creating...",
      success: <b>Blog Created Succesfully...</b>,
      error: <b>Something went wrong!.</b>,
    });
    setReviewToAdd(undefined);
  }



  function deleteBlog(blog: Review | undefined) {
    if (blog instanceof Review) {
      const props: ApiCallProps = {
        postUrl: GET_DELETE_REVIEW + blog.id,
        data: null,
        onStart: function (): void {
          setLoading(true);
        },
        onProgressEnd: function (): void {
          setLoading(false);
          loadReviews()
        },
        onSuccess: function (res: any) {
          console.log(res);
          loadReviews();
        },
        onUnexpected: function (res: any) {
          console.log("Unexpected Result:", res);
        },
      };

      toast.promise(makeGetCall(props), {
        loading: "Deleting...",
        success: <b> Deleted Successfully...</b>,
        error: <b>Something went wrong!.</b>,
      });

    }
  }




  function getAddNewReviewDialog() {
    return (
      <ReviewDialog
        open={reviewToAdd != null && reviewToAdd != undefined}
        handleClose={() => {setReviewToAdd(undefined);loadReviews()}}
      />
    );
  }




  const [reviewToAdd, setReviewToAdd] = useState<Blog>();
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const blog = reviewToAdd;
        blog?.elements.push(new BlogElement(-1, 'image', reader.result, -1, null, null));
        setReviewToAdd(blog);
        console.log(reviewToAdd);
      };
      reader.readAsDataURL(file);
    }
  };

  const [videoUrl, setVideoUrl] = useState<string>();

  return (
    <div
      className="w-full flex flex-col bg-gray-100 overflow-auto"
      style={{ height: "800px" }}
    >
      <input
        className="w-full h-[200px] hidden"
        ref={imagePicker}
        type="file"
        accept="image/*"
        onChange={(e) => handleImageChange(e)}
      />
      <div className="fixed top-3 right-10 shadow-sm z-20">
        <h1
          onClick={() => {
            setReviewToAdd(Blog.getInitial());
          }}
          className="hover:cursor-pointer hover:shadow-md hover:shadow-gray-600  rounded-full bg-white px-6 py-3 text-black "
        >
          Add New Review
        </h1>
      </div>
      {videoUrl && <Dialog open={videoUrl != null && videoUrl != undefined}>
        <DialogTitle>
          Playing Video
        </DialogTitle>
        <DialogContent>
          <div className="w-full flex">
            <ReactPlayer controls url={videoUrl} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button sx={{ borderRadius: 10 }} variant="contained" color="error" onClick={() => setVideoUrl(undefined)}>
            Close
          </Button>
        </DialogActions>

      </Dialog>}
      <Toaster position="bottom-center" />

      {reviewToAdd && getAddNewReviewDialog()}


      <h1 className="font-bold text-black text-xl px-5 bg-yellow-50 py-5 ">
        Testimonials
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
      {!loading && reviews?.length == 0 && (
        <div className="w-full  text-center h-[500px] flex flex-col items-center  ">
          <h1 className="w-full h-full self-center mt-64 text-gray-20 font-bold text-[30px] text-center">
            No Reviews Found
          </h1>
        </div>
      )}


      {!loading && (
        <Grid className="" container>
          {reviews?.map((inquiry: Review) => (
            <Grid md={3} padding={1}>
              <Card

                className="center flex w-full gap-1 flex-col items-center hover:cursor-pointer hover:shadow-md hover:shadow-gray-300"
                sx={{
                  borderRadius: "4px",


                  height: 350,
                }}
              >

                <h1 className="w-full text-center bg-black text-[14px] font-bold py-2 text-white">
                  {inquiry.created_at.toString()}
                </h1>

                <div onClick={() => setVideoUrl(FILE_BASE_URL + inquiry.video_url)} className="w-full flex items-center justify-center h-44">
                  <PlayArrow fontSize="large" />
                </div>

                <h1 className="w-full text-center text-[16px] font-bold text-black mt-2">
                  {inquiry.user_name}
                </h1>
                <h1 className="h-28 w-full mb-3 text-center text-[15px] text-black mt-2">
                  {inquiry.detail}
                </h1>
                <div className="rounded-full px-10 w-full text-center text-white mx-5  py-2 bg-red-600" onClick={()=>deleteBlog(inquiry)}>
                  Delete
                </div>

              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}
