'use client'
import { Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import Button from './Button';
import { transparentBlack } from '@/constants';
import { ApiCallProps, makePostCall } from '@/app/db/api';
import { POST_SUBMIT_INQUIRY } from '@/app/db/Routes';
import toast, { Toaster } from 'react-hot-toast';
import { UmrahPackage } from '@/app/type/UmrahPackage';

interface PackageInquiryFormProps {
  packageData: UmrahPackage;
}

const PackageInquiryForm: React.FC<PackageInquiryFormProps> = ({ packageData }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  function isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function submitInquiry() {
    // Validation
    if (!name || !email || !phone || !message) {
      toast.error("Please Fill All Fields", {
        style: {
          borderRadius: '20px',
          background: 'white',
          color: 'black',
        },
        duration: 2000
      });
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Please Enter Valid Email", {
        style: {
          borderRadius: '20px',
          background: 'white',
          color: 'black',
        },
        duration: 2000
      });
      return;
    }

    // Prepare inquiry data with package details
    const inquiryData = {
      name,
      email,
      phone,
      message,
      // Package details
      package_name: packageData.name,
      price_double: packageData.price_double,
      price_triple: packageData.price_tripple,
      price_quad: packageData.price_quad,
      currency: packageData.currency || 'USD',
      nights_makkah: packageData.nights_makkah?.toString(),
      nights_madina: packageData.nights_madina?.toString(),
      total_nights: packageData.nights?.toString(),
      hotel_makkah_name: packageData.hotel_makkah_enabled ? packageData.hotel_makkah_name : null,
      hotel_madina_name: packageData.hotel_madina_enabled ? packageData.hotel_madina_name : null,
      transportation_title: packageData.transport_enabled ? packageData.trans_title : null,
      visa_title: packageData.visa_enabled ? packageData.visa_title : null,
      breakfast_included: packageData.breakfast_enabled,
      dinner_included: packageData.dinner_enabled,
      visa_included: packageData.visa_enabled,
      ticket_included: packageData.ticket_enabled,
      roundtrip: packageData.is_roundtrip,
      ziyarat_included: packageData.ziyarat,
      guide_included: packageData.guide,
    };

    const raw = JSON.stringify(inquiryData);

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
        // Reset form
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
      },
      onUnexpected: function (res: any) {
        console.log("Unexpected Result:", res);
      }
    };

    toast.promise(
      makePostCall(props),
      {
        loading: 'Submitting inquiry for ' + packageData.name + '...',
        success: <b>Inquiry Submitted! Our agent will contact you shortly about {packageData.name}.</b>,
        error: <b>Something went wrong! Please try again.</b>,
      }
    );
  }

  return (
    <div className='w-full bg-white/95 p-6 rounded-xl shadow-2xl border-2 border-orange-400'>
      <Toaster position='bottom-right' />
      
      <h3 className='text-gray-900 font-bold text-2xl mb-2'>
        Inquire About This Package
      </h3>
      <p className='text-gray-700 text-sm mb-4'>
        Interested in <strong className='text-orange-600'>{packageData.name}</strong>? Fill out the form below and our team will contact you with details.
      </p>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Your Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            required
            sx={{
              backgroundColor: 'white',
              borderRadius: 1,
              '& .MuiOutlinedInput-root': {
                color: '#1a1a1a',
                '& fieldset': { borderColor: '#d1d5db' },
                '&:hover fieldset': { borderColor: '#fb923c' },
                '&.Mui-focused fieldset': { borderColor: '#ea580c', borderWidth: '2px' },
              },
              '& .MuiInputLabel-root': { color: '#6b7280' },
              '& .MuiInputLabel-root.Mui-focused': { color: '#ea580c', fontWeight: 'bold' },
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Your Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
            sx={{
              backgroundColor: 'white',
              borderRadius: 1,
              '& .MuiOutlinedInput-root': {
                color: '#1a1a1a',
                '& fieldset': { borderColor: '#d1d5db' },
                '&:hover fieldset': { borderColor: '#fb923c' },
                '&.Mui-focused fieldset': { borderColor: '#ea580c', borderWidth: '2px' },
              },
              '& .MuiInputLabel-root': { color: '#6b7280' },
              '& .MuiInputLabel-root.Mui-focused': { color: '#ea580c', fontWeight: 'bold' },
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Your Phone"
            variant="outlined"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={loading}
            required
            sx={{
              backgroundColor: 'white',
              borderRadius: 1,
              '& .MuiOutlinedInput-root': {
                color: '#1a1a1a',
                '& fieldset': { borderColor: '#d1d5db' },
                '&:hover fieldset': { borderColor: '#fb923c' },
                '&.Mui-focused fieldset': { borderColor: '#ea580c', borderWidth: '2px' },
              },
              '& .MuiInputLabel-root': { color: '#6b7280' },
              '& .MuiInputLabel-root.Mui-focused': { color: '#ea580c', fontWeight: 'bold' },
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Your Message"
            variant="outlined"
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={loading}
            required
            placeholder="Tell us about your travel plans or any specific requirements..."
            sx={{
              backgroundColor: 'white',
              borderRadius: 1,
              '& .MuiOutlinedInput-root': {
                color: '#1a1a1a',
                '& fieldset': { borderColor: '#d1d5db' },
                '&:hover fieldset': { borderColor: '#fb923c' },
                '&.Mui-focused fieldset': { borderColor: '#ea580c', borderWidth: '2px' },
              },
              '& .MuiInputLabel-root': { color: '#6b7280' },
              '& .MuiInputLabel-root.Mui-focused': { color: '#ea580c', fontWeight: 'bold' },
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            type="button"
            title={loading ? 'Submitting...' : 'Submit Inquiry'}
            variant="btn_white"
            onClick={submitInquiry}
            full
          />
        </Grid>
      </Grid>

      <div className='mt-4 text-center'>
        <p className='text-gray-600 text-xs'>
          By submitting this form, you agree to be contacted by our team regarding the <strong className='text-orange-600'>{packageData.name}</strong> package.
        </p>
      </div>
    </div>
  );
};

export default PackageInquiryForm;

