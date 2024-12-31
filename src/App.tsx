import React, { useState, useEffect } from 'react';
import LocationSearch from './components/LocationSearch';
import LocationPicker from './components/LocationPicker';
import AddressForm from './components/AddressForm';
import AddressManager from './components/AddressManager';
import LocationPermissionModal from './components/LocationPermissionModal';
import { useGeolocation } from './hooks/useGeolocation';
import type { Location, SavedAddress, AddressType } from './types/location';
import { MapPin } from 'lucide-react';

// Mock saved addresses
const mockAddresses: SavedAddress[] = [
  {
    id: '1',
    label: 'Home',
    type: 'home',
    address: '123 Home Street, New Delhi',
    lat: 28.6139,
    lng: 77.2090,
  },
  {
    id: '2',
    label: 'Office',
    type: 'work',
    address: '456 Work Avenue, New Delhi',
    lat: 28.6304,
    lng: 77.2177,
  },
];

function App() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>(mockAddresses);
  const [showPermissionModal, setShowPermissionModal] = useState(true);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showAddressManager, setShowAddressManager] = useState(false);
  const { loading, error, coords, getLocation } = useGeolocation();

  // Close modal when coordinates are retrieved
  useEffect(() => {
    if (coords) {
      setShowPermissionModal(false);
    }
  }, [coords]);

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    setShowAddressForm(true);
  };

  const handleAddressSubmit = (data: { houseNumber: string; area: string; type: AddressType }) => {
    if (!selectedLocation) return;

    const newAddress: SavedAddress = {
      id: Date.now().toString(),
      label: data.type === 'home' ? 'Home' : data.type === 'work' ? 'Office' : 'Other',
      type: data.type,
      address: `${data.houseNumber}, ${data.area}`,
      lat: selectedLocation.lat,
      lng: selectedLocation.lng,
    };

    setSavedAddresses(prev => [...prev, newAddress]);
    setShowAddressForm(false);
    setSelectedLocation(null);
  };

  const handleDeleteAddress = (id: string) => {
    setSavedAddresses(prev => prev.filter(address => address.id !== id));
  };

  const handleEnableLocation = () => {
    getLocation();
  };

  const handleSearchManually = () => {
    setIsSearchMode(true);
    setShowPermissionModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <MapPin className="text-blue-500" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Choose Delivery Location</h1>
          <p className="text-gray-600 mt-2">Search for your address or choose from saved locations</p>
        </header>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {error}
          </div>
        )}

        {showAddressManager ? (
          <AddressManager
            addresses={savedAddresses}
            onSelectAddress={(address) => {
              setSelectedLocation(address);
              setShowAddressManager(false);
            }}
            onAddNewAddress={() => {
              setShowAddressManager(false);
              setIsSearchMode(true);
            }}
            onDeleteAddress={handleDeleteAddress}
          />
        ) : (
          <>
            {(isSearchMode || coords || selectedLocation) && (
              <div className="space-y-6">
                <LocationSearch
                  onLocationSelect={handleLocationSelect}
                  initialCoords={coords}
                />

                {selectedLocation && !showAddressForm && (
                  <LocationPicker
                    location={selectedLocation}
                    onLocationChange={setSelectedLocation}
                  />
                )}

                {showAddressForm && selectedLocation && (
                  <AddressForm onSubmit={handleAddressSubmit} />
                )}

                <button
                  onClick={() => setShowAddressManager(true)}
                  className="w-full py-2 px-4 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Manage Saved Addresses
                </button>
              </div>
            )}
          </>
        )}

        <LocationPermissionModal
          isOpen={showPermissionModal && !coords}
          onEnableLocation={handleEnableLocation}
          onSearchManually={handleSearchManually}
        />
      </div>
    </div>
  );
}

export default App;
