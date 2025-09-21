'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
  Grid,
  Alert,
  Snackbar,
  CircularProgress,
  Divider,
  Chip
} from '@mui/material';
import { Save, Refresh, Delete } from '@mui/icons-material';

interface SeoSettings {
  id?: number;
  page_name: string;
  meta_title: string;
  meta_description: string;
  meta_keywords?: string;
  og_title?: string;
  og_description?: string;
  og_image?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;
  structured_data?: any;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`seo-tabpanel-${index}`}
      aria-labelledby={`seo-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const SeoManager: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [seoSettings, setSeoSettings] = useState<SeoSettings[]>([]);
  const [currentSettings, setCurrentSettings] = useState<SeoSettings>({
    page_name: '',
    meta_title: '',
    meta_description: '',
    meta_keywords: '',
    og_title: '',
    og_description: '',
    og_image: '',
    twitter_title: '',
    twitter_description: '',
    twitter_image: ''
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info' | 'warning'
  });

  const pages = [
    { name: 'home', label: 'Home Page' },
    { name: 'luxury-umrah-packages', label: 'Luxury Umrah Packages' },
    { name: 'blogs', label: 'Blogs' },
    { name: 'testimonials', label: 'Testimonials' },
    { name: 'about-us', label: 'About Us' }
  ];

  useEffect(() => {
    loadSeoSettings();
  }, []);

  const loadSeoSettings = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/seo/all');
      const data = await response.json();
      if (data.success) {
        setSeoSettings(data.data);
        if (data.data.length > 0) {
          setCurrentSettings(data.data[0]);
        }
      }
    } catch (error) {
      showSnackbar('Error loading SEO settings', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    if (seoSettings[newValue]) {
      setCurrentSettings(seoSettings[newValue]);
    } else {
      setCurrentSettings({
        page_name: pages[newValue].name,
        meta_title: '',
        meta_description: '',
        meta_keywords: '',
        og_title: '',
        og_description: '',
        og_image: '',
        twitter_title: '',
        twitter_description: '',
        twitter_image: ''
      });
    }
  };

  const handleInputChange = (field: keyof SeoSettings, value: string) => {
    setCurrentSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveSeoSettings = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/seo/page/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentSettings),
      });

      const data = await response.json();
      if (data.success) {
        showSnackbar('SEO settings saved successfully!', 'success');
        loadSeoSettings(); // Reload to get updated data
      } else {
        showSnackbar(data.message || 'Error saving SEO settings', 'error');
      }
    } catch (error) {
      showSnackbar('Error saving SEO settings', 'error');
    } finally {
      setSaving(false);
    }
  };

  const showSnackbar = (message: string, severity: 'success' | 'error' | 'info' | 'warning') => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        SEO Manager
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Manage meta tags, Open Graph, and Twitter Card settings for your website pages
      </Typography>

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="SEO page tabs">
              {pages.map((page, index) => (
                <Tab key={page.name} label={page.label} />
              ))}
            </Tabs>
          </Box>

          {pages.map((page, index) => (
            <TabPanel key={page.name} value={tabValue} index={index}>
              <Grid container spacing={3}>
                {/* Basic SEO */}
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Basic SEO
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Meta Title"
                    value={currentSettings.meta_title}
                    onChange={(e) => handleInputChange('meta_title', e.target.value)}
                    helperText="Maximum 60 characters"
                    inputProps={{ maxLength: 60 }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Meta Keywords"
                    value={currentSettings.meta_keywords || ''}
                    onChange={(e) => handleInputChange('meta_keywords', e.target.value)}
                    helperText="Comma separated keywords"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Meta Description"
                    value={currentSettings.meta_description}
                    onChange={(e) => handleInputChange('meta_description', e.target.value)}
                    helperText="Maximum 160 characters"
                    inputProps={{ maxLength: 160 }}
                  />
                </Grid>

                {/* Open Graph */}
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                    Open Graph (Facebook)
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="OG Title"
                    value={currentSettings.og_title || ''}
                    onChange={(e) => handleInputChange('og_title', e.target.value)}
                    helperText="Leave empty to use Meta Title"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="OG Image"
                    value={currentSettings.og_image || ''}
                    onChange={(e) => handleInputChange('og_image', e.target.value)}
                    helperText="Image URL for social sharing"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="OG Description"
                    value={currentSettings.og_description || ''}
                    onChange={(e) => handleInputChange('og_description', e.target.value)}
                    helperText="Leave empty to use Meta Description"
                  />
                </Grid>

                {/* Twitter Cards */}
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                    Twitter Cards
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Twitter Title"
                    value={currentSettings.twitter_title || ''}
                    onChange={(e) => handleInputChange('twitter_title', e.target.value)}
                    helperText="Leave empty to use OG Title"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Twitter Image"
                    value={currentSettings.twitter_image || ''}
                    onChange={(e) => handleInputChange('twitter_image', e.target.value)}
                    helperText="Leave empty to use OG Image"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Twitter Description"
                    value={currentSettings.twitter_description || ''}
                    onChange={(e) => handleInputChange('twitter_description', e.target.value)}
                    helperText="Leave empty to use OG Description"
                  />
                </Grid>

                {/* Actions */}
                <Grid item xs={12}>
                  <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                    <Button
                      variant="contained"
                      startIcon={<Save />}
                      onClick={saveSeoSettings}
                      disabled={saving}
                    >
                      {saving ? 'Saving...' : 'Save SEO Settings'}
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<Refresh />}
                      onClick={loadSeoSettings}
                    >
                      Refresh
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </TabPanel>
          ))}
        </CardContent>
      </Card>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SeoManager;
