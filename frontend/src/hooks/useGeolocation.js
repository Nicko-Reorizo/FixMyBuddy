import { useCallback, useState } from 'react';

export function useGeolocation() {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setStatus('unsupported');
      setError('Geolocation is not supported by this browser.');
      return Promise.resolve(null);
    }

    setStatus('loading');

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus('ready');
          setError('');
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            updatedAt: new Date(position.timestamp).toISOString(),
            address: 'Current GPS location',
            source: 'GPS active',
          });
        },
        () => {
          setStatus('error');
          setError('Location permission was denied or unavailable.');
          resolve(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        },
      );
    });
  }, []);

  return { error, requestLocation, status };
}

