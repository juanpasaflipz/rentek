import { Pool } from 'pg';
import { Property } from '../models/property.model';

export class PropertyService {
  private pool: Pool | null = null;
  private useMockData: boolean;

  constructor() {
    this.useMockData = !process.env.DB_USER || !process.env.DB_HOST;
    
    if (!this.useMockData) {
      this.pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: parseInt(process.env.DB_PORT || '5432'),
      });
    }
  }

  private getMockProperties(): Property[] {
    return [
      {
        id: '1',
        source: 'test',
        country: 'Mexico',
        state_province: 'Quintana Roo',
        city: 'Cancun',
        neighborhood: 'Centro',
        postal_code: '77500',
        address: '123 Main St',
        coordinates: { lat: 21.1619, lng: -86.8515 },
        transaction_type: 'sale',
        price: { amount: 250000, currency: 'USD' },
        property_type: 'apartment',
        bedrooms: 2,
        bathrooms: 2,
        area_sqm: 120,
        lot_size_sqm: 0,
        amenities: ['pool', 'gym', 'parking'],
        images: ['/placeholder-property.svg'],
        description: 'Beautiful apartment in Cancun',
        contact_info: 'contact@example.com',
        listing_date: new Date().toISOString(),
        last_updated: new Date().toISOString()
      },
      {
        id: '2',
        source: 'test',
        country: 'Brazil',
        state_province: 'São Paulo',
        city: 'São Paulo',
        neighborhood: 'Vila Mariana',
        postal_code: '04101',
        address: '456 Rua Example',
        coordinates: { lat: -23.5505, lng: -46.6333 },
        transaction_type: 'rent',
        price: { amount: 3000, currency: 'BRL' },
        property_type: 'house',
        bedrooms: 3,
        bathrooms: 2,
        area_sqm: 200,
        lot_size_sqm: 300,
        amenities: ['garden', 'garage'],
        images: [],
        description: 'Spacious house for rent',
        contact_info: 'contact@example.com',
        listing_date: new Date().toISOString(),
        last_updated: new Date().toISOString()
      }
    ];
  }

  async searchProperties(filters: any): Promise<Property[]> {
    if (this.useMockData) {
      let properties = this.getMockProperties();
      
      // Apply filters to mock data
      if (filters.country) {
        properties = properties.filter(p => p.country === filters.country);
      }
      if (filters.city) {
        properties = properties.filter(p => p.city.toLowerCase().includes(filters.city.toLowerCase()));
      }
      if (filters.transactionType) {
        properties = properties.filter(p => p.transaction_type === filters.transactionType);
      }
      if (filters.minPrice) {
        properties = properties.filter(p => p.price.amount >= parseFloat(filters.minPrice));
      }
      if (filters.maxPrice) {
        properties = properties.filter(p => p.price.amount <= parseFloat(filters.maxPrice));
      }
      if (filters.propertyType) {
        properties = properties.filter(p => p.property_type === filters.propertyType);
      }
      if (filters.minBedrooms) {
        properties = properties.filter(p => p.bedrooms >= parseInt(filters.minBedrooms));
      }
      if (filters.minBathrooms) {
        properties = properties.filter(p => p.bathrooms >= parseInt(filters.minBathrooms));
      }
      
      return properties;
    }

    const query = `
      SELECT * FROM properties
      WHERE ($1::text IS NULL OR country = $1)
      AND ($2::text IS NULL OR city = $2)
      AND ($3::text IS NULL OR transaction_type = $3)
      AND ($4::numeric IS NULL OR price >= $4)
      AND ($5::numeric IS NULL OR price <= $5)
      AND ($6::text IS NULL OR property_type = $6)
      AND ($7::int IS NULL OR bedrooms >= $7)
      AND ($8::int IS NULL OR bathrooms >= $8)
      LIMIT 50
    `;

    const values = [
      filters.country,
      filters.city,
      filters.transactionType,
      filters.minPrice,
      filters.maxPrice,
      filters.propertyType,
      filters.minBedrooms,
      filters.minBathrooms,
    ];

    const result = await this.pool!.query(query, values);
    return result.rows;
  }

  async getPropertyById(id: string): Promise<Property | null> {
    if (this.useMockData) {
      const properties = this.getMockProperties();
      return properties.find(p => p.id === id) || null;
    }

    const query = 'SELECT * FROM properties WHERE id = $1';
    const result = await this.pool!.query(query, [id]);
    return result.rows[0] || null;
  }

  async getPropertiesByCountry(country: string): Promise<Property[]> {
    if (this.useMockData) {
      const properties = this.getMockProperties();
      return properties.filter(p => p.country === country);
    }

    const query = 'SELECT * FROM properties WHERE country = $1 LIMIT 50';
    const result = await this.pool!.query(query, [country]);
    return result.rows;
  }

  async getPropertiesByCity(city: string): Promise<Property[]> {
    if (this.useMockData) {
      const properties = this.getMockProperties();
      return properties.filter(p => p.city === city);
    }

    const query = 'SELECT * FROM properties WHERE city = $1 LIMIT 50';
    const result = await this.pool!.query(query, [city]);
    return result.rows;
  }
} 