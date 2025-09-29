'use client'

import Space from "@/components/Space";
import { transparentBlack } from "@/constants";
import { Card, Divider } from "@mui/material";
import { store } from "../../state/store";
import BlogElement from "../../type/BlogElement";
import { FILE_BASE_URL } from "../../db/Routes";
import { Slide } from "react-awesome-reveal";
import { getUserFrame } from "@/app/layout";
import Head from "next/head";
import SocialShare from "@/components/SocialShare";
import ArticleSchema from "@/components/ArticleSchema";

export default function BlogDetail() {

    const blog = store.getState().home.selectedBlog;
    const pageUrl = `https://www.mtumrah.com/pages/blog_detail`;
    
    // Fallback content if blog is not available
    const blogTitle = blog?.title || "Umrah Travel Guide | Marwah Travels";
    const blogDescription = blog?.elements?.[0]?.value?.toString()?.slice(0, 150) ?? "Expert Umrah travel insights and spiritual journey guidance from Marwah Travels. Read our comprehensive guides for your pilgrimage.";
    const blogImage = blog?.image || "/logo2.png";

    function getElementTS(s: string) {
        if (s == "heading") {
            return 25;
        }
        if (s == 'subheading') {
            return 20
        }
        return 14;
    }
    function buildElement(element: BlogElement) {
        var res: any = '';
        if (element.element_type.includes('heading')) {
            res = <div className={`text-white text-[${getElementTS(element.element_type)}px] ${element.element_type.includes('heading') ? 'font-bold' : ''}`}>{element.value}</div>
        } else if (element.element_type == 'divider') {
            res = (
                <div className={`text-[14px] text-white w-full px-5 bg-gray-300 h-[1px] `}>
                </div>
            );
        } else {
            res = (
                <div className={`text-[14px] text-white`} style={{ whiteSpace: 'pre-wrap' }}>
                    {element.value}
                </div>
            );
        }

        return <Slide>{res}</Slide>;
    }

    return (
        <>
            <Head>
                <title>{blogTitle}</title>
                <meta name="description" content={blogDescription} />
                <meta name="keywords" content="umrah blog, umrah guide, spiritual journey, pilgrimage tips, makkah madina travel, umrah insights" />
                <meta name="author" content="Marwah Travels" />
                <meta name="robots" content="index, follow" />
                
                {/* Open Graph */}
                <meta property="og:type" content="article" />
                <meta property="og:title" content={blogTitle} />
                <meta property="og:description" content={blogDescription} />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:image" content={`https://www.mtumrah.com${blogImage}`} />
                <meta property="og:site_name" content="Marwah Travels Umrah" />
                
                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={blogTitle} />
                <meta name="twitter:description" content={blogDescription} />
                <meta name="twitter:image" content={`https://www.mtumrah.com${blogImage}`} />
                
                {/* Canonical */}
                <link rel="canonical" href={pageUrl} />
            </Head>
            <ArticleSchema
                title={blogTitle}
                description={blogDescription}
                author="Marwah Travels"
                datePublished={blog?.created_at ? new Date(blog.created_at).toISOString() : new Date().toISOString()}
                dateModified={blog?.updated_at ? new Date(blog.updated_at).toISOString() : new Date().toISOString()}
                image={`https://www.mtumrah.com${blogImage}`}
                url={pageUrl}
            />
            {getUserFrame(<Card className=" p-10" sx={{ borderRadius: 1, backgroundColor: transparentBlack }} elevation={4}>
                <Slide>
                    {/* <img src={FILE_BASE_URL + blog.image ?? "/kaba_image.jpg"} width={920} height={600} alt={blog.title+" main image"} className="w-full" /> */}
                </Slide>
                <Slide direction="right">
                    <div className="px-4 mt-4   ">
                        <div className="flex flex-col">
                            <h1 className='text-bold text-[20px] mb-2 text-slate-100 pt-2 font-bold'>
                                {blogTitle}
                            </h1>
                            <Divider sx={{ backgroundColor: 'white' }} />
                            {blog?.elements?.map((e) => buildElement(e))}
                            <Space h={10} />
                            <SocialShare url={pageUrl} title={blogTitle} description={blogDescription} />
                        </div>
                    </div>
                </Slide>
            </Card>)}
        </>
    )
}