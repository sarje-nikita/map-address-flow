import React from 'react';
import { MapPin, Search, X } from 'lucide-react';
import Modal from './ui/Modal';

interface LocationPermissionModalProps {
  isOpen: boolean;
  onEnableLocation: () => void;
  onSearchManually: () => void;
}

export default function LocationPermissionModal({
  isOpen,
  onEnableLocation,
  onSearchManually,
}: LocationPermissionModalProps) {
  return (
    <Modal isOpen={isOpen}>
      <div className="relative p-6 md:p-8">
        <div className="absolute right-4 top-4">
          <button onClick={onSearchManually} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>
        
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="bg-orange-100 p-4 rounded-full">
              <MapPin className="text-orange-500 w-8 h-8" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-gray-900">Enable Location</h2>
            <p className="text-gray-600 max-w-sm mx-auto">
              Allow access to your location for better delivery service and accurate address detection
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={onEnableLocation}
              className="w-full py-3.5 px-4 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-colors"
            >
              Enable Location Services
            </button>
            
            <button
              onClick={onSearchManually}
              className="w-full py-3.5 px-4 bg-gray-50 text-gray-700 rounded-xl font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
            >
              <Search size={18} />
              Search Manually
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
