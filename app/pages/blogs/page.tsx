'use client'

import { GET_BLOGS,FILE_BASE_URL,BACKEND_BASE_URL } from "@/app/db/Routes";
import { ApiCallProps, makeGetCall } from "@/app/db/api";
import { getUserFrame } from "@/app/layout";
import { store, selectBlog } from "@/app/state/store";
import { Blog } from "@/app/type/Blog";
import BlogElement from "@/app/type/BlogElement";
import Space from "@/components/Space";
import { transparentBlack } from "@/constants";

import { Button, Card, CircularProgress, Divider, Grid } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Head from "next/head";
import SocialShare from "@/components/SocialShare";

export default function Blogs() {
  const [blogs, setBlogs] = useState<Array<Blog>>();
  const [loading, setLoading] = useState(true);

  const parseData = (data: any[]) => {
    const parsed = data.map((d: any) => Blog.fromJson(d));

    setBlogs(parsed);
  };

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
      parseData(res);
    },
    onUnexpected: function (res: any) {
      console.log("Unexpected Result:", res);
    },
  };

  useEffect(() => {
    makeGetCall(props);
  }, []);

  function getElementTS(s: string) {
    if (s == "heading") {
      return 25;
    }
    if (s == "subheading") {
      return 20;
    }
    return 14;
  }
  function buildElement(element: BlogElement) {
    var res: any = "";
    if (element.element_type.includes("heading")) {
      res = (
        <div
          className={`text-white text-[${getElementTS(
            element.element_type
          )}px] ${element.element_type.includes("heading") ? "font-bold" : ""}`}
        >
          {element.value}
        </div>
      );
    } else if (element.element_type == "divider") {
      res = (
        <div
          className={`text-[14px] text-white w-full px-5 bg-gray-300 h-[1px] `}
        ></div>
      );
    } else {
      res = (
        <div
          className={`text-[14px] text-white`}
          style={{ whiteSpace: "pre-wrap" }}
        >
          {element.value}
        </div>
      );
    }

    return res;
  }

  function getBlogImageUrl(image: string | any): string {
    if (!image) return '/images/kaba1.jpg';
    
    // If it's already a full URL (http/https)
    if (typeof image === 'string' && (image.startsWith('http://') || image.startsWith('https://'))) {
      return image;
    }
    
    // If it's a base64 data URL
    if (typeof image === 'string' && image.startsWith('data:')) {
      return image;
    }
    
    // If it contains blogs_images path, use FILE_BASE_URL
    if (typeof image === 'string' && image.includes('blogs_images')) {
      return FILE_BASE_URL + image;
    }
    
    // Fallback to FILE_BASE_URL if it's a path
    if (typeof image === 'string' && image.length > 0) {
      return FILE_BASE_URL + image;
    }
    
    // Default fallback
    return '/images/kaba1.jpg';
  }
  return (
    <>
      <Head>
        <title>Umrah Travel Insights & Tips Blog | Marwah Travels Umrah</title>
        <meta name="description" content="Stay informed with Marwah Travels Umrah's blog—your source for expert Umrah tips, spiritual travel insights, visa guidance, and pilgrimage preparation. Read now." />
        <meta name="keywords" content="umrah blog, umrah tips, spiritual travel, umrah guidance, pilgrimage preparation, umrah insights" />
        <link rel="canonical" href="https://www.mtumrah.com/pages/blogs" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Umrah Travel Insights & Tips Blog | Marwah Travels Umrah" />
        <meta property="og:description" content="Stay informed with Marwah Travels Umrah's blog—your source for expert Umrah tips, spiritual travel insights, visa guidance, and pilgrimage preparation. Read now." />
        <meta property="og:url" content="https://www.mtumrah.com/pages/blogs" />
        
        {/* Twitter */}
        <meta name="twitter:title" content="Umrah Travel Insights & Tips Blog | Marwah Travels Umrah" />
        <meta name="twitter:description" content="Stay informed with Marwah Travels Umrah's blog—your source for expert Umrah tips, spiritual travel insights, visa guidance, and pilgrimage preparation. Read now." />
      </Head>
      {getUserFrame(
        <div className="w-full p-4 sm:p-6 flex flex-col items-center">
          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <CircularProgress
                size={90}
                sx={{
                  color: "white",
                  borderRadius: 20,
                  borderWidth: 3,
                  padding: 1,
                }}
              />
            </div>
          ) : (
            <Grid container spacing={2} className="max-w-7xl">
              {blogs?.map((blog, id) => (
                <Grid key={id} item xs={12} sm={6} md={4}>
                  <Link href="/pages/blog_detail">
                    <Card
                      onClick={() => {
                        store.dispatch(selectBlog(blog));
                      }}
                      className="hover:cursor-pointer hover:border-white hover:border-2 hover:shadow-white hover:shadow-xl transition-all duration-300"
                      sx={{ borderRadius: 1, backgroundColor: transparentBlack }}
                      elevation={4}
                    >
                      {blog.image && (
                        <img
                          src={getBlogImageUrl(blog.image)}
                          width={720}
                          height={500}
                          alt={blog.title}
                          className="w-full h-68 object-cover"
                          onError={(e) => {
                            const img = e.target as HTMLImageElement;
                            img.src = '/images/kaba1.jpg';
                          }}
                        />
                      )}

                      <div className="p-4">
                        <div className="flex flex-col h-full">
                          <h2 className="text-lg sm:text-xl font-bold mb-3 text-slate-100 pt-2 line-clamp-2">
                            {blog.title}
                          </h2>

                          <div className="mt-auto">
                            <Button
                              variant="contained"
                              sx={{
                                borderRadius: 10,
                                backgroundColor: "white",
                                color: "black",
                                width: "100%",
                                mb: 2
                              }}
                            >
                              Read More
                            </Button>
                            <SocialShare 
                              url={`https://www.mtumrah.com/pages/blog_detail`}
                              title={blog.title}
                              description="Read this Umrah travel guide from Marwah Travels"
                            />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </Grid>
              ))}
            </Grid>
          )}
        </div>
      )}
    </>
  );
}
