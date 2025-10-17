# Deployment Guide - Frontend Only

## 🚀 Vercel Deployment (Recommended)

This is now a **frontend-only React application** ready for static deployment.

### Quick Deploy to Vercel

1. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Connect your GitHub account
   - Import this repository

2. **Build Settings:**
   - Framework Preset: `Create React App`
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Root Directory: `frontend`

3. **Environment Variables:**
   - ⚠️ No environment variables needed (static site)

### Netlify Deployment
1. Build the project:
   ```bash
   cd frontend
   npm run build
   ```

2. Drag and drop the `build` folder to Netlify dashboard or connect via Git.

3. Configure build settings:
   - Build Command: `npm run build`
   - Publish Directory: `build`

## 🔧 Backend Deployment (Railway/Heroku)

### Railway Deployment
1. Install Railway CLI:
   ```bash
   npm install -g @railway/cli
   ```

2. Login to Railway:
   ```bash
   railway login
   ```

3. Deploy backend:
   ```bash
   cd backend
   railway init
   railway up
   ```

4. Set environment variables in Railway dashboard:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS`

### Heroku Deployment
1. Install Heroku CLI and login:
   ```bash
   heroku login
   ```

2. Create Heroku app:
   ```bash
   cd backend
   heroku create your-app-name
   ```

3. Set environment variables:
   ```bash
   heroku config:set MONGODB_URI="your-mongodb-uri"
   heroku config:set JWT_SECRET="your-jwt-secret"
   ```

4. Deploy:
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

## 🗄️ Database Setup (MongoDB Atlas)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)

2. Create new cluster

3. Create database user with read/write permissions

4. Get connection string and add to environment variables

5. Configure network access (allow all IPs: 0.0.0.0/0 for production)

## 📝 Environment Variables

### Backend (.env)
```env
# Production settings
NODE_ENV=production
PORT=5000

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# JWT
JWT_SECRET=your-super-secure-secret-key
JWT_EXPIRE=7d

# Email (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### Frontend
No environment variables needed for basic setup. If using custom API endpoint:

```env
# Frontend (.env)
REACT_APP_API_URL=https://your-backend-url.herokuapp.com
```

## 🔄 CI/CD Setup (GitHub Actions)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: |
          cd frontend
          npm ci
          
      - name: Build
        run: |
          cd frontend
          npm run build
          
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          working-directory: ./frontend

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy to Railway
        uses: bervProject/railway-deploy@v1.0.0
        with:
          railway_token: ${{ secrets.RAILWAY_TOKEN }}
          service: "backend"
```

## 🌐 Custom Domain Setup

### Frontend (Vercel)
1. Go to Vercel dashboard → Project → Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed

### Backend (Railway)
1. Go to Railway dashboard → Project → Settings → Domains  
2. Add custom domain
3. Configure CNAME record: `subdomain.yourdomain.com` → `railway-app-url`

## ✅ Pre-deployment Checklist

- [ ] All environment variables configured
- [ ] MongoDB Atlas database created and accessible
- [ ] Frontend build successful (`npm run build`)
- [ ] Backend starts without errors
- [ ] API endpoints tested
- [ ] CORS configured for frontend domain
- [ ] File upload directory permissions set
- [ ] Email service configured (if using contact form)
- [ ] Custom domains configured (optional)
- [ ] SSL certificates installed
- [ ] Performance optimized (code splitting, lazy loading)
- [ ] Security headers configured
- [ ] Analytics setup (Google Analytics, etc.)

## 🔍 Monitoring & Analytics

### Recommended Tools:
- **Uptime**: UptimeRobot, Pingdom
- **Analytics**: Google Analytics, Vercel Analytics
- **Error Tracking**: Sentry
- **Performance**: Google PageSpeed Insights, GTmetrix
- **SEO**: Google Search Console

## 🐛 Troubleshooting

### Common Issues:

1. **Build failures**: Check Node.js version compatibility
2. **API connection**: Verify CORS settings and API URLs
3. **Database connection**: Check MongoDB Atlas network access
4. **File uploads**: Ensure proper directory permissions
5. **Email not sending**: Verify SMTP credentials and app passwords

### Debug Commands:
```bash
# Check build locally
npm run build

# Test production build
npm install -g serve
serve -s build

# Check backend API
curl https://your-api-url.com/api/health
```