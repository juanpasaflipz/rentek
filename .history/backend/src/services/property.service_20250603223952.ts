import { Pool } from 'pg';
import { Property } from '../models/property.model';

export class PropertyService {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT || '5432'),
    });
  }

  async searchProperties(filters: any): Promise<Property[]> {
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

    const result = await this.pool.query(query, values);
    return result.rows;
  }

  async getPropertyById(id: string): Promise<Property | null> {
    const query = 'SELECT * FROM properties WHERE id = $1';
    const result = await this.pool.query(query, [id]);
    return result.rows[0] || null;
  }

  async getPropertiesByCountry(country: string): Promise<Property[]> {
    const query = 'SELECT * FROM properties WHERE country = $1 LIMIT 50';
    const result = await this.pool.query(query, [country]);
    return result.rows;
  }

  async getPropertiesByCity(city: string): Promise<Property[]> {
    const query = 'SELECT * FROM properties WHERE city = $1 LIMIT 50';
    const result = await this.pool.query(query, [city]);
    return result.rows;
  }
} 