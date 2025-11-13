# Production Setup Guide

## Prerequisites
- Docker and Docker Compose installed
- Environment variables configured

## Environment Setup

### 1. Create `.env` file in Server directory
Copy the template and fill in your actual values:
```bash
cp Server/.env.example Server/.env
```

Edit `Server/.env` and update:
- `MONGO_URI` - Your MongoDB connection string
- `JWT_SECRET` - A strong random secret key
- `FRONTEND_URL` - Your production domain
- `BACKEND_URL` - Your backend API URL
- All API keys for third-party services (Google, Facebook, Stability, etc.)

## Security Checklist

- [ ] JWT_SECRET is a strong random string (minimum 32 characters)
- [ ] MONGO_URI uses proper credentials
- [ ] FRONTEND_URL points to your production domain
- [ ] All API keys are properly set
- [ ] GOOGLE_CALLBACK_URL matches your OAuth app configuration
- [ ] `.env` file is in `.gitignore` and NOT committed
- [ ] Sensitive credentials are not logged

## Building & Running

### Using Docker Compose (Recommended)

```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# View logs
docker-compose logs -f server
docker-compose logs -f client

# Stop services
docker-compose down
```

### Manual Setup

#### Server
```bash
cd Server
npm ci --only=production
NODE_ENV=production npm start
```

#### Client
```bash
# The client is served through Nginx by Docker
# Or manually serve the static files with any web server
```

## Deployment Checklist

- [ ] All environment variables configured
- [ ] `npm ci` used instead of `npm install` for production
- [ ] NODE_ENV=production set
- [ ] Security headers enabled (Helmet middleware)
- [ ] CORS properly configured with frontend domain
- [ ] MongoDB connection tested and accessible
- [ ] All API keys validated
- [ ] SSL/TLS certificate configured (via reverse proxy like Nginx)
- [ ] Error logging configured
- [ ] Backup strategy in place

## Production Improvements Made

1. **Server Binding**: Changed from localhost to 0.0.0.0 for Docker compatibility
2. **Security Headers**: Added Helmet middleware for XSS, CSRF protection
3. **CORS Configuration**: Restricted to frontend URL only
4. **Request Size**: Increased limits for JSON/file uploads
5. **Docker Optimization**: 
   - Using alpine images for smaller footprint
   - npm ci for reproducible builds
   - Healthchecks added
6. **Nginx Configuration**: 
   - Gzip compression enabled
   - Static asset caching
   - Security headers
   - SPA routing support

## Monitoring & Maintenance

### Health Checks
- Server health endpoint: GET /
- Docker healthchecks are configured to auto-restart failed services

### Logs
View logs for debugging:
```bash
docker-compose logs server
docker-compose logs client
```

### Scaling
For production scale, consider:
- Load balancer (Nginx, HAProxy)
- Multiple server instances
- Session management across instances
- MongoDB replica set for high availability
