import React, { useState, useEffect } from 'react';
import { Home, Briefcase, Users, ChevronLeft } from 'lucide-react';
import type { AddressType, Location } from '../types/location';

interface AddressFormProps {
  selectedLocation?: Location;
  onSubmit: (data: {
    houseNumber: string;
    area: string;
    landmark: string;
    type: AddressType;
  }) => void;
  onBack?: () => void;
}

export default function AddressForm({ selectedLocation, onSubmit, onBack }: AddressFormProps) {
  const [formData, setFormData] = useState({
    houseNumber: '',
    area: '',
    landmark: '',
    type: 'home' as AddressType,
  });

  useEffect(() => {
    if (selectedLocation) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ placeId: selectedLocation.placeId }, (results, status) => {
        if (status === 'OK' && results?.[0]) {
          const addressComponents = results[0].address_components;
          
          const streetNumber = addressComponents.find(c => 
            c.types.includes('street_number'))?.long_name || '';
          const route = addressComponents.find(c => 
            c.types.includes('route'))?.long_name || '';
          const area = addressComponents.find(c => 
            c.types.includes('sublocality_level_1'))?.long_name || '';
          
          setFormData(prev => ({
            ...prev,
            houseNumber: streetNumber,
            area: `${route}${area ? `, ${area}` : ''}`.trim(),
          }));
        }
      });
    }
  }, [selectedLocation]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex items-center">
        {onBack && (
          <button 
            onClick={onBack}
            className="p-2 -ml-2 mr-2 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <ChevronLeft size={20} className="text-gray-500" />
          </button>
        )}
        <h2 className="text-lg font-semibold text-gray-900">Add New Address</h2>
      </div>
      
      <form onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }} className="p-6 space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="houseNumber" className="block text-sm font-medium text-gray-700 mb-1">
              House/Flat/Block No.
            </label>
            <input
              type="text"
              id="houseNumber"
              value={formData.houseNumber}
              onChange={(e) => setFormData(prev => ({ ...prev, houseNumber: e.target.value }))}
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-100 focus:border-orange-500 transition-all"
              required
            />
          </div>

          <div>
            <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-1">
              Apartment/Road/Area
            </label>
            <input
              type="text"
              id="area"
              value={formData.area}
              onChange={(e) => setFormData(prev => ({ ...prev, area: e.target.value }))}
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-100 focus:border-orange-500 transition-all"
              required
            />
          </div>

          <div>
            <label htmlFor="landmark" className="block text-sm font-medium text-gray-700 mb-1">
              Landmark (Optional)
            </label>
            <input
              type="text"
              id="landmark"
              value={formData.landmark}
              onChange={(e) => setFormData(prev => ({ ...prev, landmark: e.target.value }))}
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-100 focus:border-orange-500 transition-all"
              placeholder="e.g., Near Park, Next to Mall"
            />
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700 mb-3">Save as</p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { type: 'home' as const, icon: Home, label: 'Home' },
              { type: 'work' as const, icon: Briefcase, label: 'Work' },
              { type: 'other' as const, icon: Users, label: 'Other' },
            ].map(({ type, icon: Icon, label }) => (
              <button
                key={type}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, type }))}
                className={`p-4 rounded-xl border ${
                  formData.type === type
                    ? 'border-orange-500 bg-orange-50 text-orange-600'
                    : 'border-gray-200 hover:border-gray-300 text-gray-600'
                } transition-all`}
              >
                <div className="flex flex-col items-center gap-1">
                  <Icon size={20} />
                  <span className="text-sm font-medium">{label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-colors"
        >
          Save Address
        </button>
      </form>
    </div>
  );
}
