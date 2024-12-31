import { useState, useCallback } from 'react';

interface GeolocationState {
  loading: boolean;
  error: string | null;
  coords: { lat: number; lng: number } | null;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    loading: false,
    error: null,
    coords: null,
  });

  const getLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setState(prev => ({ ...prev, error: 'Geolocation is not supported by your browser' }));
      return;
    }

    setState(prev => ({ ...prev, loading: true }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          loading: false,
          error: null,
          coords: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });
      },
      (error) => {
        setState({
          loading: false,
          error: 'Failed to get your location. Please try again.',
          coords: null,
        });
      }
    );
  }, []);

  return { ...state, getLocation };
}
