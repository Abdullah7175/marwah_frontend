# SSL and Domain Migration Guide

## Current Setup (IP-based)
- **Frontend**: `http://98.82.201.1:3000` or `http://mtumrah.com:3000`
- **Backend**: `http://98.82.201.1:8000`
- **API**: `http://98.82.201.1:8000/api`

## Target Setup (HTTPS Domain)
- **Frontend**: `https://mtumrah.com`
- **Backend**: `https://mtumrah.com/api/`
- **API**: `https://mtumrah.com/api/`

## Changes Made

### 1. Dynamic URL Configuration
- Updated `app/db/Routes.ts` to automatically detect environment and use appropriate URLs
- Created `utils/urlConfig.ts` and `config/environment.ts` for centralized URL management
- Updated `components/DynamicMetaTags.tsx` to use dynamic URLs

### 2. Next.js Configuration
- Updated `next.config.js` to support both domains and HTTPS
- Added image domains for both IP and domain
- Added rewrite rules for API calls
- Added HTTPS redirect rules for production

### 3. API Configuration
- Backend URLs now automatically switch based on current environment
- Maintains backward compatibility with current IP setup
- Ready for HTTPS domain without code changes

## Deployment Steps

### For Current Setup (No Changes Needed)
The website will continue to work exactly as before:
- Frontend: `http://98.82.201.1:3000` or `http://mtumrah.com:3000`
- Backend: `http://98.82.201.1:8000`

### For SSL Domain Setup
1. **Configure SSL Certificate**
   - Install SSL certificate for `mtumrah.com`
   - Ensure both `mtumrah.com` and `www.mtumrah.com` are covered

2. **Update Backend Configuration**
   - Configure your backend server to serve on `https://mtumrah.com/api/`
   - Ensure CORS is configured for the new domain

3. **Update DNS**
   - Point `mtumrah.com` to your server IP
   - Point `www.mtumrah.com` to your server IP

4. **Deploy Frontend**
   - Deploy frontend to serve on `https://mtumrah.com`
   - No code changes needed - URLs will automatically switch

5. **Test**
   - Verify frontend loads on `https://mtumrah.com`
   - Verify API calls work with new domain
   - Check all meta tags and canonical URLs

## Environment Variables (Optional)
You can set these environment variables for more control:

```bash
# For production with SSL
USE_HTTPS=true
NODE_ENV=production

# For development
USE_HTTPS=false
NODE_ENV=development
```

## Backward Compatibility
- The system automatically detects the current environment
- No manual configuration needed
- Works with both current IP setup and future HTTPS domain
- All URLs (meta tags, canonical, Open Graph, etc.) will automatically use the correct domain

## Testing Checklist
- [ ] Frontend loads correctly on current IP
- [ ] API calls work with current backend
- [ ] Meta tags show correct URLs
- [ ] After SSL setup: Frontend loads on HTTPS domain
- [ ] After SSL setup: API calls work with HTTPS backend
- [ ] After SSL setup: All URLs automatically use HTTPS domain

## Notes
- The configuration is completely automatic
- No code changes needed when switching to SSL
- Maintains SEO-friendly URLs in all scenarios
- Supports both development and production environments
