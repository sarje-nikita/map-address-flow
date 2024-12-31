import React from 'react';
import { Home, Briefcase, MapPin, Trash } from 'lucide-react';
import type { SavedAddress } from '../types/location';

interface SavedAddressesProps {
  addresses: SavedAddress[];
  onSelectAddress: (address: SavedAddress) => void;
  onDeleteAddress?: (id: string) => void;
  showActions?: boolean;
}

export default function SavedAddresses({
  addresses,
  onSelectAddress,
  onDeleteAddress,
  showActions = false,
}: SavedAddressesProps) {
  const getIcon = (type: SavedAddress['type']) => {
    switch (type) {
      case 'home':
        return <Home className="text-orange-500" size={22} />;
      case 'work':
        return <Briefcase className="text-blue-500" size={22} />;
      default:
        return <MapPin className="text-purple-500" size={22} />;
    }
  };

  return (
    <div className="space-y-2">
      {addresses.map((address) => (
        <div
          key={address.id}
          className="group bg-white rounded-xl border border-gray-100 hover:border-gray-200 transition-all"
        >
          <button
            onClick={() => onSelectAddress(address)}
            className="w-full flex items-start p-4"
          >
            <div className="p-2 bg-gray-50 rounded-lg mr-3">
              {getIcon(address.type)}
            </div>
            <div className="flex-1 text-left">
              <div className="font-medium text-gray-900">{address.label}</div>
              <div className="text-sm text-gray-500 mt-0.5 line-clamp-2">{address.address}</div>
            </div>
            
            {showActions && onDeleteAddress && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteAddress(address.id);
                }}
                className="p-2 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all"
                title="Delete address"
              >
                <Trash size={18} />
              </button>
            )}
          </button>
        </div>
      ))}
    </div>
  );
}
