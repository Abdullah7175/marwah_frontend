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
    const pageUrl = `https://www.mtumrah.com/pages/blog_detail`; // if blog has slug, replace accordingly

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
                <title>{blog.title}</title>
                <meta name="description" content={blog?.elements?.[0]?.value?.toString()?.slice(0, 150) ?? "Umrah blog article by Marwah Travels"} />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={blog.title} />
                <meta property="og:description" content={blog?.elements?.[0]?.value?.toString()?.slice(0, 150) ?? "Umrah blog article by Marwah Travels"} />
                <meta property="og:url" content={pageUrl} />
                <meta name="twitter:title" content={blog.title} />
                <meta name="twitter:description" content={blog?.elements?.[0]?.value?.toString()?.slice(0, 150) ?? "Umrah blog article by Marwah Travels"} />
                <link rel="canonical" href={pageUrl} />
            </Head>
            <ArticleSchema
                title={blog.title}
                description={blog?.elements?.[0]?.value?.toString()?.slice(0, 150) ?? "Umrah blog article by Marwah Travels"}
                author="Marwah Travels"
                datePublished={new Date().toISOString()}
                dateModified={new Date().toISOString()}
                image={`https://www.mtumrah.com/logo2.png`}
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
                                {blog.title}
                            </h1>
                            <Divider sx={{ backgroundColor: 'white' }} />
                            {...blog.elements.map((e) => buildElement(e))}
                            <Space h={10} />
                            <SocialShare url={pageUrl} title={blog.title} description={blog?.elements?.[0]?.value?.toString()?.slice(0, 150) ?? "Umrah blog article by Marwah Travels"} />
                        </div>
                    </div>
                </Slide>
            </Card>)}
        </>
    )
}