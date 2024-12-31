import React from 'react';
import { MapPin } from 'lucide-react';

export default function DeliveryPinMessage() {
  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 max-w-[90%] z-10">
      <MapPin size={18} className="text-orange-500 flex-shrink-0" />
      <p className="text-sm text-gray-700 truncate">
        Your order will be delivered here. Move pin to your exact location
      </p>
    </div>
  );
}
