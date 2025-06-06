'use client';

import { useState } from 'react';
import PropertySearch from '@/components/PropertySearch';
import PropertyList from '@/components/PropertyList';
import { Property, PropertySearchFilters } from '@/types/property';

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
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
      const response = await fetch(`http://localhost:3000/api/properties/search?${queryParams}`);
      const data = await response.json();
      setProperties(data);
    } catch (error) {
      console.error('Error searching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Latin American Real Estate</h1>
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
