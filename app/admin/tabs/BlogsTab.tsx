import { BACKEND_BASE_URL,FILE_BASE_URL, GET_BLOGS, GET_DELETE_BLOG, GET_DELETE_INQUIRY, GET_DELETE_PACKAGE } from "@/app/db/Routes";
import { ApiCallProps, createBlog, makeGetCall, updateBlogCloud } from "@/app/db/api";
import { Blog } from "@/app/type/Blog";
import BlogElement from "@/app/type/BlogElement";
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
import AddBlogDialog from "../addBlogDialog";
import EditBlogDialog from "../editBlogDialog";

export function BlogsTab() {
  const [inquires, setBlogs] = useState<Array<Blog>>();
  const [loading, setLoading] = useState(true);



  function loadBlogs() {
    const props: ApiCallProps = {
      postUrl: GET_BLOGS,
      data: undefined,
      onStart: function (): void {
        setLoading(true);
      },
      onProgressEnd: function (): void {
        setLoading(false);
      },
      onSuccess: function (res: any) {
        console.log(res);
        setBlogs(res.map((inquiry: any) => Blog.fromJson(inquiry)));
      },
      onUnexpected: function (res: any) {
        console.log("Unexpected Result:", res);
      },
    };
    makeGetCall(props);
  }

  const [blogToEdit, setBlogToEdit] = useState<Blog>();

  useEffect(() => {
    loadBlogs();
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

        loadBlogs();
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
    setBlogToAdd(undefined);
  }



  function deleteBlog(blog:Blog | undefined) {
    if (blog instanceof Blog) {
      const props: ApiCallProps = {
        postUrl: GET_DELETE_BLOG + blog.id,
        data: null,
        onStart: function (): void {
          setLoading(true);
        },
        onProgressEnd: function (): void {
          setLoading(false);
        },
        onSuccess: function (res: any) {
          console.log(res);
          loadBlogs();
        },
        onUnexpected: function (res: any) {
          console.log("Unexpected Result:", res);
        },
      };

      toast.promise(makeGetCall(props), {
        loading: "Deleting...",
        success: <b>Blog Deleted Successfully...</b>,
        error: <b>Something went wrong!.</b>,
      });
    
    }
  }

  function updateBlog(p: Blog) {
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



    
    toast.promise(
      updateBlogCloud(
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
          console.log(res);
          loadBlogs()
        },
        function (e: any) {
          //error
          console.log("Unexpected Result:", e);
        }
      )
      ,
      {
      

        loading: 'Saving Changes',
        success: <b> Blog's Changes Saved...</b>,
        error: <b>Something went wrong!.</b>,

      }
      
    );
    setBlogToEdit(undefined);
  }
  function getAddNewBlogDialog() {
    return (
      <AddBlogDialog
        blogToAdd={blogToAdd}
        setBlogToAdd={setBlogToAdd}
        addBlog={addBlog}
      />
    );
  }



  function getEditBlogDialog() {
    if (blogToEdit instanceof Blog) {
      return (
        <EditBlogDialog
          blogToEdit={blogToEdit}
          setBlogToEdit={setBlogToEdit}
          updateBlog={updateBlog}
          onDelete={deleteBlog}
        />
      );
    }

    return '';
  }
  const [blogToAdd, setBlogToAdd] = useState<Blog>();
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const blog = blogToAdd;
        blog?.elements.push(new BlogElement(-1, 'image', reader.result, -1, null, null));
        setBlogToAdd(blog);
        console.log(blogToAdd);
      };
      reader.readAsDataURL(file);
    }
  };

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
            setBlogToAdd(Blog.getInitial());
          }}
          className="hover:cursor-pointer hover:shadow-md hover:shadow-gray-600  rounded-full bg-white px-6 py-3 text-black "
        >
          Add New Blog
        </h1>
      </div>
      <Toaster position="bottom-center" />

      {blogToAdd && getAddNewBlogDialog()}
      {blogToEdit && getEditBlogDialog()}

      <h1 className="font-bold text-black text-xl px-5 bg-yellow-50 py-5 ">
        User Blogs
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
        <div className="w-full  text-center h-[500px] flex flex-col items-center  ">
          <h1 className="w-full h-full self-center mt-64 text-gray-20 font-bold text-[30px] text-center">
            No Blogs Found
          </h1>
        </div>
      )}


      {!loading && (
        <Grid className="" container>
          {inquires?.map((inquiry: Blog) => (
            <Grid md={3} padding={1}>
              <Card
                onClick={() => setBlogToEdit(inquiry)}
                className="center flex w-full gap-1 flex-col items-center hover:cursor-pointer hover:shadow-md hover:shadow-gray-300"
                sx={{
                  borderRadius: "4px",


                  height: 300,
                }}
              >

                <h1 className="w-full text-center bg-black text-[14px] font-bold py-2 text-white">
                  {inquiry.created_at.replace('T', ' ').split('.')[0]}
                </h1>

                {/* <img alt="blog image" className="h-48" src={BACKEND_BASE_URL + inquiry.image ?? "/kaba_image.jpg"} width={200} height={300} /> */}


                <h1 className="w-full text-center text-[13px] font-bold text-black mt-2">
                  {inquiry.title}
                </h1>

              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}
