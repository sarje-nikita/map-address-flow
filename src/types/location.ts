export interface Location {
  address: string;
  lat: number;
  lng: number;
  placeId?: string;
}

export type AddressType = 'home' | 'work' | 'other';

export interface SavedAddress extends Location {
  id: string;
  label: string;
  type: AddressType;
}
