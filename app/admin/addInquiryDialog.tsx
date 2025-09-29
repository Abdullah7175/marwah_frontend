'use client'

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { createInquiry } from "../db/api";

interface AddInquiryDialogProps {
    inquiryToAdd: any;
    setInquiryToAdd: (inquiry: any) => void;
    refreshInquiries: () => void;
}

export default function AddInquiryDialog({ inquiryToAdd, setInquiryToAdd, refreshInquiries }: AddInquiryDialogProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        // Basic validation
        if (!formData.name.trim()) {
            toast.error('Name is required');
            return;
        }
        if (!formData.email.trim()) {
            toast.error('Email is required');
            return;
        }
        if (!formData.phone.trim()) {
            toast.error('Phone is required');
            return;
        }
        if (!formData.message.trim()) {
            toast.error('Message is required');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            toast.error('Please enter a valid email address');
            return;
        }

        createInquiry(
            formData,
            () => setLoading(true),
            () => setLoading(false),
            (result) => {
                console.log('Inquiry created successfully:', result);
                toast.success('Inquiry created successfully!');
                setInquiryToAdd(undefined);
                setFormData({ name: '', email: '', phone: '', message: '' });
                refreshInquiries();
            },
            (error) => {
                console.error('Error creating inquiry:', error);
                toast.error('Failed to create inquiry. Please try again.');
            }
        );
    };

    const handleClose = () => {
        setInquiryToAdd(undefined);
        setFormData({ name: '', email: '', phone: '', message: '' });
    };

    return (
        <>
            <Dialog open={inquiryToAdd != null && inquiryToAdd != undefined} maxWidth="md" fullWidth>
                <DialogTitle>
                    Add New Inquiry
                </DialogTitle>
                <DialogContent>
                    <div className="flex flex-col gap-4 p-4">
                        <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            label="Phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            label="Message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                            multiline
                            rows={4}
                            variant="outlined"
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={handleClose} 
                        disabled={loading}
                        sx={{ borderRadius: 10, paddingX: 6 }} 
                        variant="outlined"
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleSubmit} 
                        disabled={loading}
                        sx={{ borderRadius: 10, paddingX: 6 }} 
                        variant="contained" 
                        color="primary"
                    >
                        {loading ? 'Creating...' : 'Create Inquiry'}
                    </Button>
                </DialogActions>
            </Dialog>
            <Toaster position="bottom-center" />
        </>
    );
}
