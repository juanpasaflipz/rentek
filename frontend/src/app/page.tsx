'use client';

import { useState } from 'react';
import PropertySearch from '@/components/PropertySearch';
import PropertyList from '@/components/PropertyList';
import { PropertySearchFilters } from '@/types/property';
import { MockProperty } from '@/types/mockProperty';
import { PropertyListing, SearchResponse } from '@/types/api';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Home() {
  const [properties, setProperties] = useState<MockProperty[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (filters: PropertySearchFilters) => {
    setLoading(true);
    try {
      // Convert filters to URLSearchParams, filtering out empty values
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          queryParams.append(key, value);
        }
      });
      const response = await fetch(`/api/search?${queryParams}`);
      const data: SearchResponse = await response.json();
      
      console.log('API Response:', data); // Debug log
      
      // Map API response to MockProperty format
      const mappedProperties = (data.listings || []).map((listing: PropertyListing, index: number) => ({
        id: parseInt(listing.id) || index + 1, // Convert string ID to number or use index
        title: listing.title,
        price: listing.price,
        bedrooms: listing.bedrooms,
        bathrooms: listing.bathrooms,
        type: listing.propertyType,
        location: listing.location.city,
        country: listing.location.country,
        transactionType: listing.transactionType,
        image: listing.imageUrl || '/placeholder-property.svg',
      }));
      setProperties(mappedProperties);
    } catch (error) {
      console.error('Error searching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">RenTek</h1>
        <ThemeToggle />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <PropertySearch onSearch={handleSearch} />
        </div>
        <div className="lg:col-span-3">
          <PropertyList properties={properties} loading={loading} />
        </div>
      </div>
    </main>
  );
}
