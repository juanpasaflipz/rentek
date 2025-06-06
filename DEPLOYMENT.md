# Deployment Guide for Rentek

This guide covers various deployment options for the Rentek property search application.

## Prerequisites

- Node.js 18+ installed
- Docker and Docker Compose installed (for containerized deployment)
- PostgreSQL 14+ database
- A domain name (for production deployment)
- SSL certificates (for HTTPS)

## Environment Variables

Create a `.env` file based on `.env.example`:

```bash
# Database
DB_USER=your_db_user
DB_PASSWORD=your_secure_password
DB_NAME=properties_db
DB_HOST=your_db_host
DB_PORT=5432

# Frontend
FRONTEND_URL=https://yourdomain.com
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
SCRAPER_API_KEY=your_scraper_api_key

# Security
NODE_ENV=production
```

## Deployment Options

### Option 1: Docker Compose (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/rentek.git
   cd rentek
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your production values
   ```

3. **Build and start services**
   ```bash
   docker-compose up -d --build
   ```

4. **Run database migrations**
   ```bash
   docker-compose exec backend npm run migrate
   ```

5. **Check service health**
   ```bash
   docker-compose ps
   curl http://localhost:3001/health
   ```

### Option 2: PM2 on VPS

1. **Install dependencies**
   ```bash
   # Install Node.js 18
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # Install PM2
   npm install -g pm2

   # Install PostgreSQL
   sudo apt-get install postgresql postgresql-contrib
   ```

2. **Setup database**
   ```bash
   sudo -u postgres createuser --interactive
   sudo -u postgres createdb properties_db
   ```

3. **Clone and build**
   ```bash
   git clone https://github.com/yourusername/rentek.git
   cd rentek

   # Backend
   cd backend
   npm install
   npm run build
   npm run migrate

   # Frontend
   cd ../frontend
   npm install
   npm run build
   ```

4. **Start with PM2**
   ```bash
   cd ..
   pm2 start ecosystem.config.js --env production
   pm2 save
   pm2 startup
   ```

### Option 3: Platform-as-a-Service

#### Vercel (Frontend) + Railway/Render (Backend)

1. **Deploy Frontend to Vercel**
   ```bash
   cd frontend
   npm install -g vercel
   vercel --prod
   ```

2. **Deploy Backend to Railway**
   - Connect GitHub repository
   - Add environment variables
   - Deploy with Dockerfile

#### Heroku

1. **Create Heroku apps**
   ```bash
   heroku create rentek-backend
   heroku create rentek-frontend
   ```

2. **Add PostgreSQL**
   ```bash
   heroku addons:create heroku-postgresql:hobby-dev -a rentek-backend
   ```

3. **Deploy**
   ```bash
   git push heroku main
   ```

## Production Checklist

- [ ] Set strong database passwords
- [ ] Configure CORS for your domain
- [ ] Set up SSL certificates
- [ ] Configure firewall rules
- [ ] Set up monitoring (e.g., UptimeRobot, Datadog)
- [ ] Configure log rotation
- [ ] Set up automated backups
- [ ] Configure rate limiting
- [ ] Set up CDN for static assets
- [ ] Enable gzip compression
- [ ] Configure security headers

## Monitoring

1. **Application logs**
   ```bash
   # Docker
   docker-compose logs -f backend
   docker-compose logs -f frontend

   # PM2
   pm2 logs
   ```

2. **Health checks**
   - Backend: `https://api.yourdomain.com/health`
   - Frontend: `https://yourdomain.com`

## Troubleshooting

### Database connection issues
```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Test connection
psql -h localhost -U your_user -d properties_db
```

### Port conflicts
```bash
# Check what's using a port
sudo lsof -i :3000
sudo lsof -i :3001
```

### Docker issues
```bash
# Clean up containers
docker-compose down
docker system prune -a

# Rebuild without cache
docker-compose build --no-cache
```

## Backup and Recovery

### Database backup
```bash
# Manual backup
pg_dump -h localhost -U your_user properties_db > backup_$(date +%Y%m%d).sql

# Restore
psql -h localhost -U your_user properties_db < backup_20240101.sql
```

### Automated backups
Add to crontab:
```bash
0 2 * * * pg_dump -h localhost -U your_user properties_db > /backups/db_$(date +\%Y\%m\%d).sql
```

## Security Recommendations

1. **Use environment variables** for all sensitive data
2. **Enable HTTPS** with SSL certificates
3. **Set up a firewall** (ufw, iptables)
4. **Regular updates** of dependencies
5. **Monitor for vulnerabilities** with GitHub Dependabot
6. **Use strong passwords** and consider 2FA
7. **Limit database access** to application only
8. **Regular security audits** with `npm audit`

## Support

For issues or questions:
- Check logs first
- Review environment variables
- Ensure all services are running
- Check network connectivity
- Verify database migrations