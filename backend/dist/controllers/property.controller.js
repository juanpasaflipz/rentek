"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyController = void 0;
const property_service_1 = require("../services/property.service");
class PropertyController {
    constructor() {
        this.searchProperties = async (req, res) => {
            try {
                const filters = req.query;
                const properties = await this.propertyService.searchProperties(filters);
                res.json(properties);
            }
            catch (error) {
                res.status(500).json({ error: 'Error searching properties' });
            }
        };
        this.getPropertyById = async (req, res) => {
            try {
                const { id } = req.params;
                const property = await this.propertyService.getPropertyById(id);
                if (!property) {
                    return res.status(404).json({ error: 'Property not found' });
                }
                res.json(property);
            }
            catch (error) {
                res.status(500).json({ error: 'Error fetching property' });
            }
        };
        this.getPropertiesByCountry = async (req, res) => {
            try {
                const { country } = req.params;
                const properties = await this.propertyService.getPropertiesByCountry(country);
                res.json(properties);
            }
            catch (error) {
                res.status(500).json({ error: 'Error fetching properties by country' });
            }
        };
        this.getPropertiesByCity = async (req, res) => {
            try {
                const { city } = req.params;
                const properties = await this.propertyService.getPropertiesByCity(city);
                res.json(properties);
            }
            catch (error) {
                res.status(500).json({ error: 'Error fetching properties by city' });
            }
        };
        this.propertyService = new property_service_1.PropertyService();
    }
}
exports.PropertyController = PropertyController;
