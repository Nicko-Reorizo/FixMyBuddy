const PROVIDERS_KEY = 'fixmybuddy-providers';

function readProviders() {
  try {
    const storedProviders = localStorage.getItem(PROVIDERS_KEY);
    return storedProviders ? JSON.parse(storedProviders) : [];
  } catch {
    return [];
  }
}

export function getNearbyProviders({ serviceType, radiusKm }) {
  return readProviders()
    .filter((provider) => provider.type === serviceType)
    .filter((provider) => Number(provider.distanceKm) <= radiusKm)
    .sort((first, second) => Number(first.etaMinutes) - Number(second.etaMinutes));
}

