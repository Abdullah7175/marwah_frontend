// src/components/ReviewDialog.js
import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  InputLabel,
  FormControl,
  Input,
} from '@mui/material';
import { URL_POST_CREATE_REVIEW } from '../db/Routes';

type ReviewDialogProps={
    open:boolean;
    handleClose:()=>void;
}

const ReviewDialog = ({ open, handleClose }:ReviewDialogProps) => {
  const [userName, setUserName] = useState('');
  const [detail, setDetail] = useState('');
  const [video, setVideo] = useState(null);

  const handleVideoChange = (event:any) => {
    setVideo(event.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('user_name', userName);
    formData.append('detail', detail);
    if(video==null){
        
        return;
    }
    formData.append('video', video);

    try {
        const response = await fetch(URL_POST_CREATE_REVIEW, {
            method: 'POST',
            body: formData,
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          const result = await response.json();
          console.log(result);
          handleClose();
    } catch (error) {
      console.error('Error uploading review:', error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create New Review</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please fill in the details below to create a new review.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="User Name"
          type="text"
          fullWidth
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Detail"
          type="text"
          fullWidth
          multiline
          rows={4}
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel htmlFor="video-upload">Upload Video</InputLabel>
          <Input
            id="video-upload"
            type="file"
            inputProps={{ accept: 'video/*' }}
            onChange={handleVideoChange}
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReviewDialog;
