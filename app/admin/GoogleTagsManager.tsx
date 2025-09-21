'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  Snackbar,
  CircularProgress,
  Divider,
  Paper,
  Grid,
  Switch,
  FormControlLabel
} from '@mui/material';
import { Save, Refresh, ContentCopy, Visibility } from '@mui/icons-material';

interface GoogleTags {
  google_analytics_id: string;
  google_search_console_verification: string;
  google_tag_manager_id: string;
  facebook_pixel_id: string;
  is_analytics_enabled: boolean;
  is_search_console_enabled: boolean;
  is_tag_manager_enabled: boolean;
  is_facebook_pixel_enabled: boolean;
}

const GoogleTagsManager: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [googleTags, setGoogleTags] = useState<GoogleTags>({
    google_analytics_id: 'G-MJ6Y9357FT',
    google_search_console_verification: 'JQwE2Zi9f3MQTxWtjiSwENXRM2xbpdcdLuxeSRD_wjo',
    google_tag_manager_id: '',
    facebook_pixel_id: '',
    is_analytics_enabled: true,
    is_search_console_enabled: true,
    is_tag_manager_enabled: false,
    is_facebook_pixel_enabled: false
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info' | 'warning'
  });

  useEffect(() => {
    loadGoogleTags();
  }, []);

  const loadGoogleTags = async () => {
    setLoading(true);
    try {
      // For now, we'll use the default values
      // In a real implementation, you'd fetch from your API
      setGoogleTags(prev => ({
        ...prev,
        google_analytics_id: 'G-MJ6Y9357FT',
        google_search_console_verification: 'JQwE2Zi9f3MQTxWtjiSwENXRM2xbpdcdLuxeSRD_wjo'
      }));
    } catch (error) {
      showSnackbar('Error loading Google tags', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof GoogleTags, value: string | boolean) => {
    setGoogleTags(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveGoogleTags = async () => {
    setSaving(true);
    try {
      // In a real implementation, you'd save to your API
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      showSnackbar('Google tags saved successfully!', 'success');
    } catch (error) {
      showSnackbar('Error saving Google tags', 'error');
    } finally {
      setSaving(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showSnackbar('Copied to clipboard!', 'success');
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

  const generateGoogleAnalyticsCode = () => {
    if (!googleTags.is_analytics_enabled || !googleTags.google_analytics_id) {
      return '';
    }

    return `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${googleTags.google_analytics_id}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${googleTags.google_analytics_id}');
</script>`;
  };

  const generateSearchConsoleCode = () => {
    if (!googleTags.is_search_console_enabled || !googleTags.google_search_console_verification) {
      return '';
    }

    return `<meta name="google-site-verification" content="${googleTags.google_search_console_verification}" />`;
  };

  const generateTagManagerCode = () => {
    if (!googleTags.is_tag_manager_enabled || !googleTags.google_tag_manager_id) {
      return '';
    }

    return `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${googleTags.google_tag_manager_id}');</script>
<!-- End Google Tag Manager -->`;
  };

  const generateFacebookPixelCode = () => {
    if (!googleTags.is_facebook_pixel_enabled || !googleTags.facebook_pixel_id) {
      return '';
    }

    return `<!-- Facebook Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${googleTags.facebook_pixel_id}');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=${googleTags.facebook_pixel_id}&ev=PageView&noscript=1"
/></noscript>
<!-- End Facebook Pixel Code -->`;
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
        Google Tags Manager
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Manage Google Analytics, Search Console, Tag Manager, and Facebook Pixel tracking codes
      </Typography>

      <Grid container spacing={3}>
        {/* Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Tracking Settings
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <FormControlLabel
                control={
                  <Switch
                    checked={googleTags.is_analytics_enabled}
                    onChange={(e) => handleInputChange('is_analytics_enabled', e.target.checked)}
                  />
                }
                label="Enable Google Analytics"
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={googleTags.is_search_console_enabled}
                    onChange={(e) => handleInputChange('is_search_console_enabled', e.target.checked)}
                  />
                }
                label="Enable Google Search Console"
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={googleTags.is_tag_manager_enabled}
                    onChange={(e) => handleInputChange('is_tag_manager_enabled', e.target.checked)}
                  />
                }
                label="Enable Google Tag Manager"
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={googleTags.is_facebook_pixel_enabled}
                    onChange={(e) => handleInputChange('is_facebook_pixel_enabled', e.target.checked)}
                  />
                }
                label="Enable Facebook Pixel"
              />

              <Box sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={saveGoogleTags}
                  disabled={saving}
                  fullWidth
                >
                  {saving ? 'Saving...' : 'Save Settings'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* IDs */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Tracking IDs
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <TextField
                fullWidth
                label="Google Analytics ID"
                value={googleTags.google_analytics_id}
                onChange={(e) => handleInputChange('google_analytics_id', e.target.value)}
                placeholder="G-XXXXXXXXXX"
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Google Search Console Verification"
                value={googleTags.google_search_console_verification}
                onChange={(e) => handleInputChange('google_search_console_verification', e.target.value)}
                placeholder="Verification code"
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Google Tag Manager ID"
                value={googleTags.google_tag_manager_id}
                onChange={(e) => handleInputChange('google_tag_manager_id', e.target.value)}
                placeholder="GTM-XXXXXXX"
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Facebook Pixel ID"
                value={googleTags.facebook_pixel_id}
                onChange={(e) => handleInputChange('facebook_pixel_id', e.target.value)}
                placeholder="Pixel ID"
                sx={{ mb: 2 }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Generated Code */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Generated Code
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Copy and paste these codes into your HTML head section
              </Typography>
              <Divider sx={{ mb: 2 }} />

              {/* Google Analytics */}
              {googleTags.is_analytics_enabled && (
                <Paper sx={{ p: 2, mb: 2, backgroundColor: '#f5f5f5' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle2">Google Analytics</Typography>
                    <Button
                      size="small"
                      startIcon={<ContentCopy />}
                      onClick={() => copyToClipboard(generateGoogleAnalyticsCode())}
                    >
                      Copy
                    </Button>
                  </Box>
                  <pre style={{ fontSize: '12px', overflow: 'auto' }}>
                    {generateGoogleAnalyticsCode()}
                  </pre>
                </Paper>
              )}

              {/* Search Console */}
              {googleTags.is_search_console_enabled && (
                <Paper sx={{ p: 2, mb: 2, backgroundColor: '#f5f5f5' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle2">Google Search Console</Typography>
                    <Button
                      size="small"
                      startIcon={<ContentCopy />}
                      onClick={() => copyToClipboard(generateSearchConsoleCode())}
                    >
                      Copy
                    </Button>
                  </Box>
                  <pre style={{ fontSize: '12px', overflow: 'auto' }}>
                    {generateSearchConsoleCode()}
                  </pre>
                </Paper>
              )}

              {/* Tag Manager */}
              {googleTags.is_tag_manager_enabled && (
                <Paper sx={{ p: 2, mb: 2, backgroundColor: '#f5f5f5' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle2">Google Tag Manager</Typography>
                    <Button
                      size="small"
                      startIcon={<ContentCopy />}
                      onClick={() => copyToClipboard(generateTagManagerCode())}
                    >
                      Copy
                    </Button>
                  </Box>
                  <pre style={{ fontSize: '12px', overflow: 'auto' }}>
                    {generateTagManagerCode()}
                  </pre>
                </Paper>
              )}

              {/* Facebook Pixel */}
              {googleTags.is_facebook_pixel_enabled && (
                <Paper sx={{ p: 2, mb: 2, backgroundColor: '#f5f5f5' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle2">Facebook Pixel</Typography>
                    <Button
                      size="small"
                      startIcon={<ContentCopy />}
                      onClick={() => copyToClipboard(generateFacebookPixelCode())}
                    >
                      Copy
                    </Button>
                  </Box>
                  <pre style={{ fontSize: '12px', overflow: 'auto' }}>
                    {generateFacebookPixelCode()}
                  </pre>
                </Paper>
              )}

              {!googleTags.is_analytics_enabled && !googleTags.is_search_console_enabled && 
               !googleTags.is_tag_manager_enabled && !googleTags.is_facebook_pixel_enabled && (
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                  Enable at least one tracking service to see generated code
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

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

export default GoogleTagsManager;
