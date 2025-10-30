// Utility function to get the correct base URL based on environment
export const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    const isHttps = window.location.protocol === 'https:';
    const isDomain = window.location.hostname === 'mtumrah.com' || window.location.hostname === 'www.mtumrah.com';
    
    if (isHttps && isDomain) {
      return 'https://www.mtumrah.com';
    }
  }
  
  // Default to current setup
  return 'http://mtumrah.com:3000';
};

// Get the correct API base URL
export const getApiBaseUrl = () => {
  if (typeof window !== 'undefined') {
    const isHttps = window.location.protocol === 'https:';
    const isDomain = window.location.hostname === 'mtumrah.com' || window.location.hostname === 'www.mtumrah.com';
    
    if (isHttps && isDomain) {
      return 'https://www.mtumrah.com/api';
    }
  }
  
  // Default to current IP setup
  return 'http://98.82.201.1:8000/api';
};

// Get the correct backend base URL
export const getBackendBaseUrl = () => {
  if (typeof window !== 'undefined') {
    const isHttps = window.location.protocol === 'https:';
    const isDomain = window.location.hostname === 'mtumrah.com' || window.location.hostname === 'www.mtumrah.com';
    
    if (isHttps && isDomain) {
      return 'https://www.mtumrah.com/api';
    }
  }
  
  // Default to current IP setup
  return 'http://98.82.201.1:8000';
};

// Helper function to build full URLs
export const buildUrl = (path: string) => {
  return `${getBaseUrl()}${path}`;
};

// Helper function to build API URLs
export const buildApiUrl = (path: string) => {
  return `${getApiBaseUrl()}${path}`;
};
