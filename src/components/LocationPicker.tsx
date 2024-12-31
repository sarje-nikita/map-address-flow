import React, { useState, useCallback } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { Crosshair } from 'lucide-react';
import type { Location } from '../types/location';

interface LocationPickerProps {
  location: Location;
  onLocationChange: (location: Location) => void;
}

export default function LocationPicker({ location, onLocationChange }: LocationPickerProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const handleLocateMe = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          map?.panTo(newLocation);
          
          // Reverse geocode the coordinates
          const geocoder = new google.maps.Geocoder();
          geocoder.geocode({ location: newLocation }, (results, status) => {
            if (status === 'OK' && results?.[0]) {
              onLocationChange({
                ...newLocation,
                address: results[0].formatted_address,
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
  }, [map, onLocationChange]);

  const handleMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;

    const newLocation = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: newLocation }, (results, status) => {
      if (status === 'OK' && results?.[0]) {
        onLocationChange({
          ...newLocation,
          address: results[0].formatted_address,
          placeId: results[0].place_id,
        });
      }
    });
  }, [onLocationChange]);

  const handleDragEnd = useCallback((e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;

    const newLocation = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: newLocation }, (results, status) => {
      if (status === 'OK' && results?.[0]) {
        onLocationChange({
          ...newLocation,
          address: results[0].formatted_address,
          placeId: results[0].place_id,
        });
      }
    });
  }, [onLocationChange]);

  return (
    <div className="relative h-[400px] rounded-lg overflow-hidden">
      <GoogleMap
        onLoad={setMap}
        zoom={16}
        center={location}
        mapContainerClassName="w-full h-full"
        onClick={handleMapClick}
        options={{
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        <Marker
          position={location}
          draggable
          onDragEnd={handleDragEnd}
        />
      </GoogleMap>

      <button
        onClick={handleLocateMe}
        className="absolute bottom-4 right-4 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center gap-2"
      >
        <Crosshair size={20} />
        My Location
      </button>
    </div>
  );
}
