'use client'
import { Grid, InputAdornment, TextField, duration } from '@mui/material';
import React, { useEffect, useState } from 'react';

import Button from './Button';
import CustomTextFieldComponent from './cTF';
import { transparentBlack } from '@/constants';
import Inquiry from '@/app/type/Inquiry';
import { ApiCallProps, makePostCall } from '@/app/db/api';
import { POST_SUBMIT_INQUIRY } from '@/app/db/Routes';
import toast, { Toaster } from 'react-hot-toast';

const InquiryForm = () => {

  const [loading, setLoading] = useState(true);

  const [inquiry, setInquiry] = useState<Inquiry>(Inquiry.getDummy());
  function isValidEmail(email: string) {
    // Regular expression for validating email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }



  function submitInquiry() {

    if (inquiry.email == "" || inquiry.message == "" || inquiry.name == "" || inquiry.phone == "") {
      toast.error("Please Fill All Fields", {


        style: {
          borderRadius: '20px',
          background: 'white',
          color: 'black',
        },
        duration: 2000
      })


      return;
    }

    if (!isValidEmail(inquiry.email)) {
      toast.error("Please Enter Valid Email", {


        style: {
          borderRadius: '20px',
          background: 'white',
          color: 'black',
        },
        duration: 2000
      })
      return;


    }



    const raw = JSON.stringify(inquiry.toJson());
    const props: ApiCallProps = {
      postUrl: POST_SUBMIT_INQUIRY,
      data: raw,
      onStart: function (): void {
        setLoading(true);
      },
      onProgressEnd: function (): void {
        setLoading(false);
      },
      onSuccess: function (res: any) {
        console.log(res);
      },
      onUnexpected: function (res: any) {
        console.log("Unexpected Result:", res);
      }
    }

    toast.promise(
      makePostCall(props)
      ,
      {
        
        loading: 'Submitting...',
        success: <b>Inquiry Submitted Our Agent will contact you shortly!</b>,
        error: <b>Something went wrong!.</b>,
      
      }
    );


  }


  return (



    <div className='w-full'>

      <Grid container spacing={2} >
        {/* 1 */}
        <Toaster position='bottom-right'  />

        <Grid item xs={12} sm={12}>
          <span className='bold-54 text-white font-bold sm:text-3xl text-xl'>
            Quick Inquiry Form
          </span>
        </Grid>

        <Grid item xs={12} sm={12}>
          <CustomTextFieldComponent onChange={(e) => { inquiry.name = e; }} label='Enter Your Name' textColor='white' backgroundColor={transparentBlack} hintColor='white' />
        </Grid>
        <Grid item xs={12} sm={12}>
          <CustomTextFieldComponent onChange={(e) => { inquiry.email = e; }} label='Enter Your Email' textColor='white' backgroundColor={transparentBlack} hintColor='white' />
        </Grid>
        <Grid item xs={12} sm={12}>
          <CustomTextFieldComponent onChange={(e) => { inquiry.phone = e; }} label='Enter Your Phone' textColor='white' backgroundColor={transparentBlack} hintColor='white' />
        </Grid>

        <Grid item xs={12} sm={12}>
          <CustomTextFieldComponent onChange={(e) => { inquiry.message = e; }} label='Enter Your Message' textColor='white' backgroundColor={transparentBlack} hintColor='white' />
        </Grid>







        <Grid item xs={12} sm={3}></Grid>
        <Grid item xs={12} sm={12}>
          <Button
            type="button"
            title='Submit Query'
            variant="btn_white" onClick={submitInquiry} />
        </Grid>
      </Grid>



    </div>
  );
};

export default InquiryForm;
