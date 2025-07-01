# E-commerce MVP

A complete e-commerce platform built with Laravel, Angular, Ionic, Redis, and Elasticsearch.

## Tech Stack

- **Backend**: Laravel 11 (PHP 8.2+)
- **Frontend**: Angular 17
- **Mobile**: Ionic 7 with Angular
- **Database**: MySQL 8.0
- **Cache**: Redis 7
- **Search**: Elasticsearch 8.8
- **Authentication**: Laravel Sanctum

## Features

### Backend (Laravel API)
- ✅ User authentication (register, login, logout)
- ✅ Product catalog with categories
- ✅ Shopping cart management
- ✅ Order processing
- ✅ Redis caching for performance
- ✅ Elasticsearch integration for search
- ✅ RESTful API with proper responses

### Frontend (Angular Web App)
- ✅ Responsive design with Bootstrap
- ✅ Product browsing and search
- ✅ User authentication
- ✅ Shopping cart functionality
- ✅ Order management
- ✅ Category filtering

### Mobile (Ionic App)
- ✅ Native mobile experience
- ✅ Same functionality as web app
- ✅ Offline cart storage
- ✅ Cross-platform compatibility (iOS/Android)

## Quick Start

### Prerequisites
- PHP 8.2+
- Composer
- Node.js 18+
- Docker & Docker Compose
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/poppycalifornia56/ecommerce-mvp
cd ecommerce-mvp
```

2. **Start services**
```bash
npm run start:services
```

3. **Install dependencies**
```bash
npm run install:all
```

4. **Setup backend**
```bash
cd backend
cp .env.example .env
php artisan key:generate
php artisan jwt:secret
```

5. **Setup database**
```bash
npm run setup:database
npm run setup:search
```

6. **Start development servers**
```bash
# Terminal 1: Backend API (http://localhost:8000)
npm run start:backend

# Terminal 2: Frontend Web (http://localhost:4200)
npm run start:frontend

# Terminal 3: Mobile App (http://localhost:8100)
npm run start:mobile
```

## Development

### Available Scripts

```bash
# Start all services
npm run start:services

# Install all dependencies
npm run install:all

# Start development servers
npm run start:backend    # Laravel API
npm run start:frontend   # Angular web app
npm run start:mobile     # Ionic mobile app

# Database operations
npm run setup:database   # Run migrations and seeders
npm run setup:search     # Index products in Elasticsearch

# Build for production
npm run build:frontend   # Build Angular app
npm run build:mobile     # Build Ionic app

# Mobile deployment
npm run deploy:mobile:android  # Build Android app
npm run deploy:mobile:ios      # Build iOS app

# Testing
npm run test:backend     # Run Laravel tests
npm run test:frontend    # Run Angular tests

# Cleanup
npm run clean           # Clean all projects
```

### Environment Configuration

#### Backend (.env)
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ecommerce_mvp

REDIS_HOST=127.0.0.1
REDIS_PORT=6379

ELASTICSEARCH_HOST=localhost:9200
SCOUT_DRIVER=elasticsearch

CACHE_DRIVER=redis
SESSION_DRIVER=redis
QUEUE_CONNECTION=redis
```

#### Frontend (environment.ts)
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api'
};
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/user` - Get current user

### Products
- `GET /api/products` - List products (with pagination)
- `GET /api/products/{id}` - Get product details
- `GET /api/products/search?q={query}` - Search products

### Categories
- `GET /api/categories` - List all categories

### Cart (Authenticated)
- `GET /api/cart` - Get cart contents
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update/{id}` - Update cart item
- `DELETE /api/cart/remove/{id}` - Remove item from cart
- `DELETE /api/cart/clear` - Clear entire cart

### Orders (Authenticated)
- `GET /api/orders` - List user orders
- `POST /api/orders` - Create new order
- `GET /api/orders/{id}` - Get order details

## Architecture

```
ecommerce-mvp/
├── backend/           # Laravel 11 API
│   ├── app/
│   ├── database/
│   ├── routes/
│   └── config/
├── frontend/          # Angular 17 Web App
│   ├── src/
│   ├── angular.json
│   └── package.json
├── mobile/            # Ionic 7 Mobile App
│   ├── src/
│   ├── capacitor.config.ts
│   └── ionic.config.json
├── docker/            # Docker configuration
│   ├── nginx/
│   └── php/
├── docker-compose.yml # Services orchestration
└── package.json       # Root scripts
```

## Production Deployment

### Backend (Laravel)
1. Set `APP_ENV=production` in `.env`
2. Run `composer install --no-dev --optimize-autoloader`
3. Run `php artisan config:cache`
4. Run `php artisan route:cache`
5. Run `php artisan view:cache`

### Frontend (Angular)
1. Run `npm run build:frontend`
2. Deploy `dist/` folder to web server

### Mobile (Ionic)
1. Run `npm run build:mobile`
2. Run `npm run deploy:mobile:android` or `npm run deploy:mobile:ios`
3. Submit to app stores

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.