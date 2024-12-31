import React, { useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import type { Location } from '../types/location';
import Map from './Map';
import SearchBox from './SearchBox';

const libraries: ["places"] = ["places"];
const defaultCenter = { lat: 28.6139, lng: 77.2090 }; // New Delhi

interface LocationSearchProps {
  onLocationSelect: (location: Location) => void;
  initialCoords?: { lat: number; lng: number } | null;
}

export default function LocationSearch({ onLocationSelect, initialCoords }: LocationSearchProps) {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    onLocationSelect(location);
  };

  const handleMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          const geocoder = new google.maps.Geocoder();
          geocoder.geocode({ location: coords }, (results, status) => {
            if (status === 'OK' && results?.[0]) {
              handleLocationSelect({
                address: results[0].formatted_address,
                lat: coords.lat,
                lng: coords.lng,
                placeId: results[0].place_id,
              });
            }
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps...</div>;
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <SearchBox 
        onPlaceSelected={handleLocationSelect}
        selectedLocation={selectedLocation}
      />
      
      <Map
        center={selectedLocation || initialCoords || defaultCenter}
        selectedLocation={selectedLocation}
        onLocationSelect={handleLocationSelect}
        onMyLocation={handleMyLocation}
      />
    </div>
  );
}
