# Latin American Real Estate Aggregator

A comprehensive real estate aggregation application that searches and displays property listings across Latin America. The app provides a unified interface to browse properties from multiple countries and sources.

## Features

- Modern, responsive web interface
- Advanced property search with multiple filters
- Interactive map integration
- Property cards with images and key details
- Support for multiple Latin American countries
- Real-time currency conversion
- Mobile-optimized design

## Tech Stack

### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- React Hooks
- Leaflet/Mapbox for maps

### Backend
- Node.js
- Express
- TypeScript
- PostgreSQL
- Redis for caching

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Redis (optional, for caching)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/latin-american-real-estate.git
cd latin-american-real-estate
```

2. Install dependencies:
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Set up environment variables:
```bash
# Backend
cp backend/.env.example backend/.env
# Edit backend/.env with your database credentials

# Frontend
cp frontend/.env.example frontend/.env
```

4. Set up the database:
```bash
# Create the database
createdb real_estate_db

# Run migrations (when available)
cd backend
npm run migrate
```

5. Start the development servers:
```bash
# Start backend server
cd backend
npm run dev

# Start frontend server (in a new terminal)
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## Project Structure

```
.
├── frontend/                # Next.js frontend application
│   ├── src/
│   │   ├── app/            # Next.js app directory
│   │   ├── components/     # React components
│   │   ├── types/         # TypeScript type definitions
│   │   └── utils/         # Utility functions
│   └── public/            # Static assets
│
└── backend/               # Node.js backend application
    ├── src/
    │   ├── controllers/  # Route controllers
    │   ├── models/       # Database models
    │   ├── routes/       # API routes
    │   ├── services/     # Business logic
    │   └── utils/        # Utility functions
    └── tests/            # Backend tests
```

## API Documentation

### Property Endpoints

- `GET /api/properties/search` - Search properties with filters
- `GET /api/properties/:id` - Get property by ID
- `GET /api/properties/country/:country` - Get properties by country
- `GET /api/properties/city/:city` - Get properties by city

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Real estate data sources from various Latin American platforms
- Open source community for the amazing tools and libraries 