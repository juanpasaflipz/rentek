"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertyRoutes = void 0;
const express_1 = require("express");
const property_controller_1 = require("../controllers/property.controller");
const router = (0, express_1.Router)();
const propertyController = new property_controller_1.PropertyController();
// Search properties with filters
router.get('/search', propertyController.searchProperties);
// Get property by ID
router.get('/:id', propertyController.getPropertyById);
// Get properties by country
router.get('/country/:country', propertyController.getPropertiesByCountry);
// Get properties by city
router.get('/city/:city', propertyController.getPropertiesByCity);
exports.propertyRoutes = router;
