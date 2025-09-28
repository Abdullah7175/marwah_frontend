'use client'
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { IconBlob, IconMailQuestion, IconPackage, IconQuestionMark, IconUsb, IconUser, IconUserCircle } from '@tabler/icons-react';

// Dynamically import Material-UI components to avoid SSR issues
const Tabs = dynamic(() => import('@mui/material').then(mod => ({ default: mod.Tabs })), { ssr: false });
const Tab = dynamic(() => import('@mui/material').then(mod => ({ default: mod.Tab })), { ssr: false });
const Box = dynamic(() => import('@mui/material').then(mod => ({ default: mod.Box })), { ssr: false });
const Typography = dynamic(() => import('@mui/material').then(mod => ({ default: mod.Typography })), { ssr: false });
const Category = dynamic(() => import('@mui/icons-material').then(mod => ({ default: mod.Category })), { ssr: false });
const DocumentScanner = dynamic(() => import('@mui/icons-material').then(mod => ({ default: mod.DocumentScanner })), { ssr: false });
const HotelSharp = dynamic(() => import('@mui/icons-material').then(mod => ({ default: mod.HotelSharp })), { ssr: false });
const MedicalInformation = dynamic(() => import('@mui/icons-material').then(mod => ({ default: mod.MedicalInformation })), { ssr: false });
const PostAdd = dynamic(() => import('@mui/icons-material').then(mod => ({ default: mod.PostAdd })), { ssr: false });
import PackagesTab from '../../admin/tabs/PackagesTab';
import CategoriesTab from '../../admin/tabs/CategoriesTab';
import { InquiriesTab } from '../../admin/tabs/InquiriesTab';
import { BlogsTab } from '../../admin/tabs/BlogsTab';
import HotelsTab from '../../admin/tabs/HotelsTab';
import { CustomPackagesTab } from '../../admin/tabs/CustomPackagesTab';
import { ReviewsTab } from '../../admin/tabs/ReviewsTab';
import { getAdminFrame, getUserFrame } from '@/app/layout';
import AuthGuard from '../../../components/AuthGuard';
import TabPanel from '@/app/type/TabPanel';

const index: React.FC = () => {
    const [value, setValue] = useState(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


    const tabs = [
        <Tab 
            key={1}
            sx={{ textTransform: 'none', padding: 0, marginX: 1 }} 
            label={
                <div className={`w-full flex-row items-center flex-center flex rounded-3xl ${value == 1 ? 'bg-yellow-500 text-white' : ' text-slate-200'} px-6 py-2  text-[20px]`} >
                    <Category />
                    <span className='mx-2 mt-1'>Categories</span>
                </div>
            } 
            className='flex flex-row flex-1' 
        />,
        <Tab 
            key={2}
            sx={{ textTransform: 'none', padding: 0, marginX: 1 }} 
            label={
                <div className={`w-full flex-row items-center flex-center flex rounded-3xl ${value == 2 ? 'bg-yellow-500 text-white' : ' text-slate-200'} px-6 py-2  text-[20px]`} >
                    <IconPackage />
                    <span className='mx-2 mt-1'>Packages</span>
                </div>
            } 
            className='flex flex-row flex-1' 
        />,
        <Tab 
            key={3}
            sx={{ textTransform: 'none', padding: 0, marginX: 1 }} 
            label={
                <div className={`w-full flex-row items-center flex-center flex rounded-3xl ${value == 3 ? 'bg-yellow-500 text-white' : ' text-slate-200'} px-6 py-2  text-[20px]`} >
                    <IconMailQuestion />
                    <span className='mx-2 mt-1'>Inquiries</span>
                </div>
            } 
            className='flex flex-row flex-1' 
        />,
        <Tab 
            key={4}
            sx={{ textTransform: 'none', padding: 0, marginX: 1 }} 
            label={
                <div className={`w-full flex-row items-center flex-center flex rounded-3xl ${value == 4 ? 'bg-yellow-500 text-white' : ' text-slate-200'} px-6 py-2  text-[20px]`} >
                    <PostAdd />
                    <span className='mx-2 mt-1'>Blogs</span>
                </div>
            } 
            className='flex flex-row flex-1' 
        />,
        <Tab 
            key={5}
            sx={{ textTransform: 'none', padding: 0, marginX: 1 }} 
            label={
                <div className={`w-full flex-row items-center flex-center flex rounded-3xl ${value == 5 ? 'bg-yellow-500 text-white' : ' text-slate-200'} px-6 py-2  text-[20px]`} >
                    <HotelSharp />
                    <span className='mx-2 mt-1'>Hotels</span>
                </div>
            } 
            className='flex flex-row flex-1' 
        />,
        <Tab 
            key={6}
            sx={{ textTransform: 'none', padding: 0, marginX: 1 }} 
            label={
                <div className={`w-full flex-row items-center flex-center flex rounded-3xl ${value == 6 ? 'bg-yellow-500 text-white' : ' text-slate-200'} px-6 py-2  text-[20px]`} >
                    <DocumentScanner />
                    <span className='mx-2 mt-1'>Testimonials</span>
                </div>
            } 
            className='flex flex-row flex-1' 
        />,
        <Tab 
            key={7}
            sx={{ textTransform: 'none', padding: 0, marginX: 1 }} 
            label={
                <div className={`w-full flex-row items-center flex-center flex rounded-3xl ${value == 7 ? 'bg-yellow-500 text-white' : ' text-slate-200'} px-6 py-2  text-[20px]`} >
                    <IconPackage />
                    <span className='mx-2 text-[17px]'>Custom Packages</span>
                </div>
            } 
            className='flex flex-row flex-1' 
        />
    ]
    const panels = [
        <TabPanel key={1} value={value} index={1}>
            <CategoriesTab />
        </TabPanel>,
        <TabPanel key={2} value={value} index={2}>
            <PackagesTab />
        </TabPanel>,
        <TabPanel key={3} value={value} index={3}>
            <InquiriesTab />
        </TabPanel>,
        <TabPanel key={4} value={value} index={4}>
            <BlogsTab />
        </TabPanel>,
        <TabPanel key={5} value={value} index={5}>
            <HotelsTab />
        </TabPanel>,
        <TabPanel key={6} value={value} index={6}>
            <ReviewsTab />
        </TabPanel>,
        <TabPanel key={7} value={value} index={7}>
            <CustomPackagesTab />
        </TabPanel>
    ]


    if (!mounted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading Dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-layout">
            <AuthGuard>
                <div style={{ display: 'flex' }} >
                    <Tabs
                        orientation="vertical"
                        value={value}
                        onChange={handleChange}
                        variant="standard"
                        sx={{ 
                            borderRight: '1px solid #e0e0e0', 
                            backgroundColor: 'black', 
                            height: "800px",
                            width: '256px',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                            '& .MuiTabs-indicator': {
                                display: 'none'
                            },
                            '& .MuiTabs-flexContainer': {
                                flexDirection: 'column'
                            }
                        }}
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
            </AuthGuard>
        </div>
    );
};




export default index;
