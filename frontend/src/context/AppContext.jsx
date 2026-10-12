import { useCallback, useEffect, useMemo, useState } from 'react';
import { initialHistory } from '../data/providers';
import { getNearbyProviders } from '../services/providerService';
import { AppContext } from './appContextValue';

const defaultLocation = {
  latitude: null,
  longitude: null,
  city: '',
  address: 'Use current location',
  source: 'GPS pending',
};

const defaultRequest = {
  serviceType: 'mechanic',
  issueType: '',
  photoName: '',
  notes: '',
  searchRadiusKm: 5,
};

const STORAGE_KEY = 'fixmybuddy-state';

function readStoredState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function AppProvider({ children }) {
  const storedState = readStoredState();
  const [request, setRequest] = useState(storedState?.request || defaultRequest);
  const [location, setLocation] = useState(storedState?.location || defaultLocation);
  const [selectedProviderId, setSelectedProviderId] = useState(storedState?.selectedProviderId || '');
  const [history, setHistory] = useState(storedState?.history || initialHistory);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        request,
        location,
        selectedProviderId,
        history,
      }),
    );
  }, [history, location, request, selectedProviderId]);

  const updateRequest = useCallback((nextFields) => {
    setRequest((current) => ({ ...current, ...nextFields }));
  }, []);

  const resetRequest = useCallback((serviceType = 'mechanic') => {
    setRequest({ ...defaultRequest, serviceType });
    setSelectedProviderId('');
  }, []);

  const providers = useMemo(() => {
    return getNearbyProviders({
      serviceType: request.serviceType,
      radiusKm: request.searchRadiusKm,
    });
  }, [request.searchRadiusKm, request.serviceType]);

  const selectedProvider = useMemo(
    () => providers.find((provider) => provider.id === selectedProviderId) || null,
    [providers, selectedProviderId],
  );

  const confirmRequest = () => {
    if (!selectedProvider || !request.issueType) {
      return false;
    }

    const completedRequest = {
      id: `history-${Date.now()}`,
      providerName: selectedProvider.name,
      serviceType: request.serviceType,
      issueType: request.issueType,
      amount: selectedProvider.priceMin,
      completedAt: 'Just now',
      rating: selectedProvider.rating,
    };

    setHistory((items) => [completedRequest, ...items]);
    resetRequest(request.serviceType);
    return true;
  };

  const value = {
    confirmRequest,
    history,
    location,
    providers,
    request,
    resetRequest,
    selectedProvider,
    selectedProviderId,
    setLocation,
    setSelectedProviderId,
    updateRequest,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

