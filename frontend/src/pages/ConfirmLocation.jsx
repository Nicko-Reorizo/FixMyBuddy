import { ArrowRight, LocateFixed, MapPin } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScreenHeader } from '../components/app/ScreenHeader';
import { MapPreview } from '../components/app/MapPreview';
import { Button } from '../components/ui/Button';
import { useApp } from '../context/useApp';
import { useGeolocation } from '../hooks/useGeolocation';
import { formatCoordinate } from '../utils/formatters';

export function ConfirmLocation() {
  const navigate = useNavigate();
  const { location, providers, setLocation } = useApp();
  const { error, requestLocation, status } = useGeolocation();
  const [address, setAddress] = useState(location.address === 'Use current location' ? '' : location.address);
  const hasCoordinates = Number.isFinite(location.latitude) && Number.isFinite(location.longitude);
  const coordinates = hasCoordinates
    ? `${formatCoordinate(location.latitude, 'N', 'S')}, ${formatCoordinate(location.longitude, 'E', 'W')}`
    : 'Coordinates pending';

  const handleUseGps = async () => {
    const nextLocation = await requestLocation();

    if (nextLocation) {
      setLocation((current) => ({
        ...current,
        ...nextLocation,
      }));
      setAddress(nextLocation.address);
    }
  };

  const handleContinue = () => {
    setLocation((current) => ({
      ...current,
      address: address.trim() || current.address,
    }));
    navigate(providers.length > 0 ? '/providers' : '/no-providers');
  };

  return (
    <section className="screen">
      <div className="mobile-column">
      <ScreenHeader title="Confirm Location" subtitle="We'll send help to this address." backTo="/app" />

      <div className="mt-7 space-y-4">
        <MapPreview />

        <div className="panel space-y-4 px-4 py-5">
          <div className="flex items-start gap-3">
            <MapPin className="mt-1 shrink-0" size={28} />
            <label className="block flex-1">
              <span className="text-xs font-bold uppercase text-slate-400">Service address</span>
              <input
                className="mt-2 w-full rounded border border-slate-700 bg-slate-900 px-3 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-amber-400"
                placeholder="Enter pickup or breakdown location"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
              <span className="mt-2 block text-[10px] leading-4 text-slate-400">{coordinates}</span>
            </label>
          </div>

          <button
            type="button"
            onClick={handleUseGps}
            className="inline-flex items-center gap-2 rounded border border-amber-400/40 px-3 py-2 text-xs font-semibold text-amber-300 transition hover:bg-amber-400/10"
          >
            <LocateFixed size={16} />
            {status === 'loading' ? 'Getting location...' : 'Use my current location'}
          </button>
          {error ? <p className="text-xs font-medium text-rose-300">{error}</p> : null}
        </div>

        <Button type="button" onClick={handleContinue}>
          Find Nearby Providers
          <ArrowRight size={22} />
        </Button>
      </div>
      </div>
    </section>
  );
}

