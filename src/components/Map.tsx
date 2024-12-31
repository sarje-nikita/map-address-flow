import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { MapPin } from 'lucide-react';
import type { Location } from '../types/location';
import DeliveryPinMessage from './DeliveryPinMessage';

interface MapProps {
  center: google.maps.LatLngLiteral;
  selectedLocation: Location | null;
  onLocationSelect: (location: Location) => void;
  onMyLocation: () => void;
}

export default function Map({ center, selectedLocation, onLocationSelect, onMyLocation }: MapProps) {
  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;
    
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: e.latLng.toJSON() }, (results, status) => {
      if (status === 'OK' && results?.[0]) {
        onLocationSelect({
          address: results[0].formatted_address,
          lat: e.latLng!.lat(),
          lng: e.latLng!.lng(),
          placeId: results[0].place_id,
        });
      }
    });
  };

  return (
    <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg">
      {selectedLocation && <DeliveryPinMessage />}
      
      <GoogleMap
        zoom={15}
        center={center}
        mapContainerClassName="w-full h-full"
        options={{
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
        onClick={handleMapClick}
      >
        {selectedLocation && (
          <Marker
            position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
            draggable
            animation={google.maps.Animation.DROP}
            onDragEnd={(e) => {
              if (e.latLng) {
                const geocoder = new google.maps.Geocoder();
                geocoder.geocode({ location: e.latLng.toJSON() }, (results, status) => {
                  if (status === 'OK' && results?.[0]) {
                    onLocationSelect({
                      address: results[0].formatted_address,
                      lat: e.latLng!.lat(),
                      lng: e.latLng!.lng(),
                      placeId: results[0].place_id,
                    });
                  }
                });
              }
            }}
          />
        )}
      </GoogleMap>
      
      <button
        onClick={onMyLocation}
        className="absolute bottom-4 right-4 px-4 py-2 bg-white rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2"
      >
        <MapPin size={18} className="text-orange-500" />
        <span className="text-sm font-medium text-gray-700">My Location</span>
      </button>
    </div>
  );
}
