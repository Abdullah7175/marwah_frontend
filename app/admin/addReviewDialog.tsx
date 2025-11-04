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
  LinearProgress,
  Box,
  Typography,
  Alert,
  Chip,
} from '@mui/material';
import { URL_POST_CREATE_REVIEW } from '../db/Routes';
import toast from 'react-hot-toast';

type ReviewDialogProps={
    open:boolean;
    handleClose:()=>void;
}

const ReviewDialog = ({ open, handleClose }:ReviewDialogProps) => {
  const [userName, setUserName] = useState('');
  const [detail, setDetail] = useState('');
  const [video, setVideo] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleVideoChange = (event:any) => {
    const file = event.target.files[0];
    if (file) {
      // Check file size (1GB = 1073741824 bytes)
      if (file.size > 1073741824) {
        setError('File size exceeds 1GB limit. Please choose a smaller file.');
        setVideo(null);
        return;
      }
      
      setVideo(file);
      setError(null);
    }
  };

  const handleSubmit = async () => {
    // Validation
    if (!userName.trim()) {
      toast.error('Please enter user name');
      return;
    }
    
    if (!detail.trim()) {
      toast.error('Please enter review details');
      return;
    }
    
    if (!video) {
      toast.error('Please select a video file');
      return;
    }

    const formData = new FormData();
    formData.append('user_name', userName);
    formData.append('detail', detail);
    formData.append('video', video);

    setUploading(true);
    setUploadProgress(0);
    setError(null);

    try {
        const myHeaders = new Headers();
        const token = localStorage.getItem('admin_token');
        if (token) {
            myHeaders.append("Authorization", `Bearer ${token}`);
        }

        // Create XMLHttpRequest for upload progress
        const xhr = new XMLHttpRequest();

        // Upload progress
        xhr.upload.addEventListener('progress', (e) => {
          if (e.lengthComputable) {
            const percentComplete = Math.round((e.loaded / e.total) * 100);
            setUploadProgress(percentComplete);
          }
        });

        // Setup promise to handle response
        const uploadPromise = new Promise<any>((resolve, reject) => {
          xhr.addEventListener('load', () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              try {
                const result = JSON.parse(xhr.responseText);
                resolve(result);
              } catch (e) {
                reject(new Error('Invalid response format'));
              }
            } else {
              try {
                const error = JSON.parse(xhr.responseText);
                reject(new Error(error.message || 'Upload failed'));
              } catch (e) {
                reject(new Error(`Upload failed with status ${xhr.status}`));
              }
            }
          });

          xhr.addEventListener('error', () => {
            reject(new Error('Network error during upload'));
          });

          xhr.addEventListener('timeout', () => {
            reject(new Error('Upload timeout. Please try again with a smaller file.'));
          });

          xhr.open('POST', URL_POST_CREATE_REVIEW);
          
          // Set timeout to 10 minutes (600000 ms)
          xhr.timeout = 600000;
          
          // Set authorization header
          if (token) {
            xhr.setRequestHeader('Authorization', `Bearer ${token}`);
          }

          xhr.send(formData);
        });

        await toast.promise(uploadPromise, {
          loading: 'Uploading video... This may take a few minutes for large files.',
          success: 'Review created successfully!',
          error: (err) => err.message || 'Failed to upload review',
        });

        // Success - reset form and close
        setUserName('');
        setDetail('');
        setVideo(null);
        setUploadProgress(0);
        handleClose();
    } catch (error: any) {
      console.error('Error uploading review:', error);
      setError(error.message || 'Failed to upload review');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onClose={!uploading ? handleClose : undefined} maxWidth="sm" fullWidth>
      <DialogTitle>Create New Testimonial</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Upload a video testimonial (up to 1GB). All video formats supported.
        </DialogContentText>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          autoFocus
          margin="dense"
          label="User Name"
          type="text"
          fullWidth
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          disabled={uploading}
          required
        />
        <TextField
          margin="dense"
          label="Review Details"
          type="text"
          fullWidth
          multiline
          rows={4}
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          disabled={uploading}
          required
        />
        
        <FormControl fullWidth margin="dense">
          <Button
            variant="outlined"
            component="label"
            disabled={uploading}
            sx={{ mt: 1 }}
          >
            {video ? 'Change Video' : 'Select Video'}
            <Input
              id="video-upload"
              type="file"
              inputProps={{ 
                accept: 'video/*',
                style: { display: 'none' }
              }}
              onChange={handleVideoChange}
              sx={{ display: 'none' }}
            />
          </Button>
          
          {video && (
            <Box sx={{ mt: 2, p: 2, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Selected File:
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                {video.name}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Chip 
                  label={formatFileSize(video.size)} 
                  size="small" 
                  color={video.size > 524288000 ? 'warning' : 'success'}
                />
                <Chip 
                  label={video.type || 'Video'} 
                  size="small" 
                  variant="outlined"
                />
              </Box>
              {video.size > 524288000 && (
                <Typography variant="caption" color="warning.main" sx={{ mt: 1, display: 'block' }}>
                  Large file detected. Upload may take several minutes.
                </Typography>
              )}
            </Box>
          )}
        </FormControl>

        {uploading && (
          <Box sx={{ mt: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Uploading...
              </Typography>
              <Typography variant="body2" color="primary" fontWeight="bold">
                {uploadProgress}%
              </Typography>
            </Box>
            <LinearProgress variant="determinate" value={uploadProgress} />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Please don't close this window. Large files may take several minutes.
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={uploading}>
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          color="primary"
          disabled={uploading || !video || !userName.trim() || !detail.trim()}
        >
          {uploading ? 'Uploading...' : 'Submit'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReviewDialog;
