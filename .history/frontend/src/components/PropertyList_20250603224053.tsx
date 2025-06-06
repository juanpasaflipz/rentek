'use client';

import { Property } from '@/types/property';
import Image from 'next/image';

interface PropertyListProps {
  properties: Property[];
  loading: boolean;
}

export default function PropertyList({ properties, loading }: PropertyListProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">No properties found</h3>
        <p className="mt-2 text-sm text-gray-500">Try adjusting your search filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <div
          key={property.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <div className="relative h-48">
            <Image
              src={property.images[0] || '/placeholder-property.jpg'}
              alt={property.description}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {property.property_type.charAt(0).toUpperCase() + property.property_type.slice(1)}
              </h3>
              <span className="text-lg font-bold text-blue-600">
                {property.price.currency} {property.price.amount.toLocaleString()}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              {property.address}, {property.city}, {property.country}
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>{property.bedrooms} beds</span>
              <span>{property.bathrooms} baths</span>
              <span>{property.area_sqm}m²</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {property.amenities.slice(0, 3).map((amenity, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {amenity}
                </span>
              ))}
            </div>
            <button
              className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={() => window.open(`/property/${property.id}`, '_blank')}
            >
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
} 