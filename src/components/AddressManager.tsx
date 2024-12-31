import React, { useState } from 'react';
import { Search, Plus, ArrowLeft } from 'lucide-react';
import type { SavedAddress } from '../types/location';
import SavedAddresses from './SavedAddresses';

interface AddressManagerProps {
  addresses: SavedAddress[];
  onSelectAddress: (address: SavedAddress) => void;
  onAddNewAddress: () => void;
  onDeleteAddress: (id: string) => void;
  onBack?: () => void;
}

export default function AddressManager({
  addresses,
  onSelectAddress,
  onAddNewAddress,
  onDeleteAddress,
  onBack,
}: AddressManagerProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAddresses = addresses.filter(address =>
    address.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    address.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="p-4 border-b border-gray-100 flex items-center gap-3">
        {onBack && (
          <button 
            onClick={onBack}
            className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-500" />
          </button>
        )}
        <h2 className="text-lg font-semibold text-gray-900">Saved Addresses</h2>
      </div>

      <div className="p-4 space-y-4">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search saved addresses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-100 focus:border-orange-500 transition-all"
            />
          </div>
          <button
            onClick={onAddNewAddress}
            className="px-4 py-2.5 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors flex items-center gap-2"
          >
            <Plus size={20} />
            <span className="hidden sm:inline">Add New</span>
          </button>
        </div>

        {filteredAddresses.length > 0 ? (
          <SavedAddresses
            addresses={filteredAddresses}
            onSelectAddress={onSelectAddress}
            onDeleteAddress={onDeleteAddress}
            showActions
          />
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No addresses found</p>
          </div>
        )}
      </div>
    </div>
  );
}
