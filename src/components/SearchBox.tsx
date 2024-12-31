import React, { useEffect, useRef } from 'react';
import { Search, MapPin } from 'lucide-react';
import type { Location } from '../types/location';

interface SearchBoxProps {
  onPlaceSelected: (location: Location) => void;
  selectedLocation: Location | null;
}

export default function SearchBox({ onPlaceSelected, selectedLocation }: SearchBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    if (!inputRef.current) return;

    autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, {
      componentRestrictions: { country: 'IN' },
      fields: ['address_components', 'geometry', 'formatted_address', 'place_id'],
      types: ['geocode']
    });

    autocompleteRef.current.addListener('place_changed', () => {
      const place = autocompleteRef.current?.getPlace();
      
      if (place?.geometry?.location && place.formatted_address) {
        onPlaceSelected({
          address: place.formatted_address,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          placeId: place.place_id
        });
      }
    });

    return () => {
      google.maps.event.clearInstanceListeners(autocompleteRef.current!);
    };
  }, [onPlaceSelected]);

  useEffect(() => {
    if (inputRef.current && selectedLocation) {
      inputRef.current.value = selectedLocation.address;
    }
  }, [selectedLocation]);

  return (
    <div className="relative w-full max-w-3xl mx-auto px-4">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for a location..."
          className="w-full pl-12 pr-4 py-4 bg-white rounded-xl shadow-sm border border-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none text-gray-800"
        />
        <button 
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-gray-50 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
          onClick={() => inputRef.current?.focus()}
        >
          <MapPin size={18} />
        </button>
      </div>
    </div>
  );
}
