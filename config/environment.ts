// Environment Configuration for SSL and Domain Migration

export interface EnvironmentConfig {
  APP_URL: string;
  API_URL: string;
  BACKEND_URL: string;
  USE_HTTPS: boolean;
  NODE_ENV: string;
}

// Get environment configuration based on current setup
export const getEnvironmentConfig = (): EnvironmentConfig => {
  // Check if we're in production with HTTPS
  const isHttps = typeof window !== 'undefined' && window.location.protocol === 'https:';
  const isDomain = typeof window !== 'undefined' && 
    (window.location.hostname === 'mtumrah.com' || window.location.hostname === 'www.mtumrah.com');
  
  // Production with SSL
  if (isHttps && isDomain) {
    return {
      APP_URL: 'https://mtumrah.com',
      API_URL: 'https://mtumrah.com/api',
      BACKEND_URL: 'https://mtumrah.com/api',
      USE_HTTPS: true,
      NODE_ENV: 'production'
    };
  }
  
  // Development/Current setup
  return {
    APP_URL: 'http://mtumrah.com:3000',
    API_URL: 'http://98.82.201.1:8000/api',
    BACKEND_URL: 'http://98.82.201.1:8000',
    USE_HTTPS: false,
    NODE_ENV: 'development'
  };
};

// Export current configuration
export const config = getEnvironmentConfig();

// Helper functions
export const getAppUrl = () => config.APP_URL;
export const getApiUrl = () => config.API_URL;
export const getBackendUrl = () => config.BACKEND_URL;
export const isHttpsEnabled = () => config.USE_HTTPS;
export const isProduction = () => config.NODE_ENV === 'production';

// Build URLs
export const buildUrl = (path: string) => `${config.APP_URL}${path}`;
export const buildApiUrl = (path: string) => `${config.API_URL}${path}`;
