import { Request, Response } from 'express';
import { PropertyService } from '../services/property.service';

export class PropertyController {
  private propertyService: PropertyService;

  constructor() {
    this.propertyService = new PropertyService();
  }

  searchProperties = async (req: Request, res: Response) => {
    try {
      const filters = req.query;
      const properties = await this.propertyService.searchProperties(filters);
      res.json(properties);
    } catch (error) {
      res.status(500).json({ error: 'Error searching properties' });
    }
  };

  getPropertyById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const property = await this.propertyService.getPropertyById(id);
      if (!property) {
        return res.status(404).json({ error: 'Property not found' });
      }
      res.json(property);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching property' });
    }
  };

  getPropertiesByCountry = async (req: Request, res: Response) => {
    try {
      const { country } = req.params;
      const properties = await this.propertyService.getPropertiesByCountry(country);
      res.json(properties);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching properties by country' });
    }
  };

  getPropertiesByCity = async (req: Request, res: Response) => {
    try {
      const { city } = req.params;
      const properties = await this.propertyService.getPropertiesByCity(city);
      res.json(properties);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching properties by city' });
    }
  };
} 