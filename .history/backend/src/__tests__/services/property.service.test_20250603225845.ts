import { PropertyService } from '../../services/property.service';
import { Pool } from 'pg';

// Mock the pg Pool
jest.mock('pg', () => {
  const mockPool = {
    query: jest.fn(),
  };
  return {
    Pool: jest.fn(() => mockPool),
  };
});

describe('PropertyService', () => {
  let propertyService: PropertyService;
  let mockPool: jest.Mocked<Pool>;

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    
    // Create a new instance of the service
    propertyService = new PropertyService();
    mockPool = new Pool() as jest.Mocked<Pool>;
  });

  describe('searchProperties', () => {
    it('should return properties matching search criteria', async () => {
      const mockProperties = [
        {
          id: '1',
          source: 'test',
          country: 'Mexico',
          city: 'Mexico City',
          transaction_type: 'sale',
          price_amount: 100000,
          price_currency: 'USD',
          property_type: 'apartment',
          bedrooms: 2,
          bathrooms: 2,
          area_sqm: 100,
        },
      ];

      mockPool.query.mockResolvedValueOnce({ rows: mockProperties });

      const filters = {
        country: 'Mexico',
        city: 'Mexico City',
        transactionType: 'sale',
        minPrice: '50000',
        maxPrice: '200000',
        propertyType: 'apartment',
        minBedrooms: '2',
        minBathrooms: '2',
      };

      const result = await propertyService.searchProperties(filters);

      expect(mockPool.query).toHaveBeenCalled();
      expect(result).toEqual(mockProperties);
    });

    it('should handle empty search results', async () => {
      mockPool.query.mockResolvedValueOnce({ rows: [] });

      const filters = {
        country: 'NonExistentCountry',
      };

      const result = await propertyService.searchProperties(filters);

      expect(mockPool.query).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('getPropertyById', () => {
    it('should return a property when found', async () => {
      const mockProperty = {
        id: '1',
        source: 'test',
        country: 'Mexico',
        city: 'Mexico City',
      };

      mockPool.query.mockResolvedValueOnce({ rows: [mockProperty] });

      const result = await propertyService.getPropertyById('1');

      expect(mockPool.query).toHaveBeenCalledWith(
        'SELECT * FROM properties WHERE id = $1',
        ['1']
      );
      expect(result).toEqual(mockProperty);
    });

    it('should return null when property not found', async () => {
      mockPool.query.mockResolvedValueOnce({ rows: [] });

      const result = await propertyService.getPropertyById('non-existent');

      expect(mockPool.query).toHaveBeenCalled();
      expect(result).toBeNull();
    });
  });

  describe('getPropertiesByCountry', () => {
    it('should return properties for a given country', async () => {
      const mockProperties = [
        {
          id: '1',
          country: 'Mexico',
          city: 'Mexico City',
        },
        {
          id: '2',
          country: 'Mexico',
          city: 'Guadalajara',
        },
      ];

      mockPool.query.mockResolvedValueOnce({ rows: mockProperties });

      const result = await propertyService.getPropertiesByCountry('Mexico');

      expect(mockPool.query).toHaveBeenCalledWith(
        'SELECT * FROM properties WHERE country = $1 LIMIT 50',
        ['Mexico']
      );
      expect(result).toEqual(mockProperties);
    });
  });

  describe('getPropertiesByCity', () => {
    it('should return properties for a given city', async () => {
      const mockProperties = [
        {
          id: '1',
          country: 'Mexico',
          city: 'Mexico City',
        },
      ];

      mockPool.query.mockResolvedValueOnce({ rows: mockProperties });

      const result = await propertyService.getPropertiesByCity('Mexico City');

      expect(mockPool.query).toHaveBeenCalledWith(
        'SELECT * FROM properties WHERE city = $1 LIMIT 50',
        ['Mexico City']
      );
      expect(result).toEqual(mockProperties);
    });
  });
}); 