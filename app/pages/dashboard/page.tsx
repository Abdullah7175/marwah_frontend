'use client'
import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import { IconBlob, IconMailQuestion, IconPackage, IconQuestionMark, IconUsb, IconUser, IconUserCircle } from '@tabler/icons-react';
import { Category, DocumentScanner, HotelSharp, MedicalInformation, PostAdd } from '@mui/icons-material';
import PackagesTab from '../../admin/tabs/PackagesTab';
import CategoriesTab from '../../admin/tabs/CategoriesTab';
import { InquiriesTab } from '../../admin/tabs/InquiriesTab';
import { BlogsTab } from '../../admin/tabs/BlogsTab';
import HotelsTab from '../../admin/tabs/HotelsTab';
import { CustomPackagesTab } from '../../admin/tabs/CustomPackagesTab';
import { ReviewsTab } from '../../admin/tabs/ReviewsTab';
import { getAdminFrame, getUserFrame } from '@/app/layout';
import TabPanel from '@/app/type/TabPanel';

const index: React.FC = () => {
    const [value, setValue] = useState(6);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


    const tabs = [
        <Tab sx={{ textTransform: 'none', padding: 0, marginX: 1 }} component="h1" icon={
            <div className={`w-full flex-row items-center flex-center flex rounded-3xl ${value == 1 ? 'bg-yellow-500 text-white' : ' text-slate-200'} px-6 py-2  text-[20px]`} >
                <Category />
                <span className='mx-2 mt-1'>Categories</span>
            </div>
        } className='flex flex-row flex-1' />,
        <Tab sx={{ textTransform: 'none', padding: 0, marginX: 1 }} component="h1" icon={
            <div className={`w-full flex-row items-center flex-center flex rounded-3xl ${value == 2 ? 'bg-yellow-500 text-white' : ' text-slate-200'} px-6 py-2  text-[20px]`} >
                <IconPackage />
                <span className='mx-2 mt-1'>Packages</span>
            </div>
        } className='flex flex-row flex-1' />,
        <Tab sx={{ textTransform: 'none', padding: 0, marginX: 1 }} component="h1" icon={
            <div className={`w-full flex-row items-center flex-center flex rounded-3xl ${value == 3 ? 'bg-yellow-500 text-white' : ' text-slate-200'} px-6 py-2  text-[20px]`} >
                <IconMailQuestion />
                <span className='mx-2 mt-1'>Inquiries</span>
            </div>
        } className='flex flex-row flex-1' />,
        <Tab sx={{ textTransform: 'none', padding: 0, marginX: 1 }} component="h1" icon={
            <div className={`w-full flex-row items-center flex-center flex rounded-3xl ${value == 4 ? 'bg-yellow-500 text-white' : ' text-slate-200'} px-6 py-2  text-[20px]`} >
                <PostAdd />
                <span className='mx-2 mt-1'>Blogs</span>
            </div>
        } className='flex flex-row flex-1' />,
        <Tab sx={{ textTransform: 'none', padding: 0, marginX: 1 }} component="h1" icon={
            <div className={`w-full flex-row items-center flex-center flex rounded-3xl ${value == 5 ? 'bg-yellow-500 text-white' : ' text-slate-200'} px-6 py-2  text-[20px]`} >
                <HotelSharp />
                <span className='mx-2 mt-1'>Hotels</span>
            </div>
        } className='flex flex-row flex-1' />,
        <Tab sx={{ textTransform: 'none', padding: 0, marginX: 1 }} component="h1" icon={
            <div className={`w-full flex-row items-center flex-center flex rounded-3xl ${value == 6 ? 'bg-yellow-500 text-white' : ' text-slate-200'} px-6 py-2  text-[20px]`} >
                <DocumentScanner />
                <span className='mx-2 mt-1'>Testimonials</span>
            </div>
        } className='flex flex-row flex-1' />,
        <Tab sx={{ textTransform: 'none', padding: 0, marginX: 1 }} component="h1" icon={
            <div className={`w-full flex-row items-center flex-center flex rounded-3xl ${value == 7 ? 'bg-yellow-500 text-white' : ' text-slate-200'} px-6 py-2  text-[20px]`} >
                <IconPackage />
                <span className='mx-2 text-[17px]'>Custom Packages</span>
            </div>
        } className='flex flex-row flex-1' />


    ]
    const panels = [
        <TabPanel value={value} index={1}>
            <CategoriesTab />
        </TabPanel>,
        <TabPanel value={value} index={2}>
            <PackagesTab />
        </TabPanel>,
        <TabPanel value={value} index={3}>
            <InquiriesTab />
        </TabPanel>,
        <TabPanel value={value} index={4}>
            <BlogsTab />
        </TabPanel>,
        <TabPanel value={value} index={5}>
            <HotelsTab />
        </TabPanel>,
        <TabPanel value={value} index={6}>
            <ReviewsTab />
        </TabPanel>,
        <TabPanel value={value} index={7}>
            <CustomPackagesTab />
        </TabPanel>
    ]


    return getUserFrame(
        <div style={{ display: 'flex' }} >
            <Tabs

                orientation="vertical"
                value={value}
                onChange={handleChange}
                className='flex-1/2 shadow-xl'

                style={{ borderRight: '1px solid #e0e0e0', backgroundColor: 'black', height: "800px" }}
            >

                <div className='w-64 h-72 flex items-center flex-center flex-col'>
                    <IconUserCircle size={'170px'} stroke={1} className='mt-10 rounded-full self-center text-yellow-500  w-full' />
                    <span className='w-full text-white font-bold text-[18px] text-center'>Admin Dashboard</span>
                </div>

                {...tabs}


            </Tabs>
            <div className='flex-1 '>
                {
                    ...panels
                }
            </div>
        </div>
    );
};




export default index;
