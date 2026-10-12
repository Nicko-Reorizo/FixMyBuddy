import { MapPin, Pencil } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/useApp';
import { formatCoordinate } from '../../utils/formatters';

export function LocationCard({ compact = false }) {
  const { location } = useApp();
  const hasCoordinates = Number.isFinite(location.latitude) && Number.isFinite(location.longitude);
  const coordinates = hasCoordinates
    ? `${formatCoordinate(location.latitude, 'N', 'S')}, ${formatCoordinate(location.longitude, 'E', 'W')}`
    : 'Coordinates pending';

  return (
    <div className="panel flex items-center justify-between gap-3 px-4 py-4">
      <div className="flex items-center gap-3">
        <MapPin className="text-slate-950" size={22} />
        <div>
          <p className="font-bold leading-tight text-white">{location.address || 'Use current location'}</p>
          <p className="text-xs font-medium text-teal-300">
            {compact ? location.source : `Current location - ${location.source}`}
          </p>
          {!compact ? <p className="mt-1 text-[10px] text-slate-500">{coordinates}</p> : null}
        </div>
      </div>
      <Link
        to="/confirm-location"
        className="grid h-9 w-9 place-items-center rounded-md text-amber-300 transition hover:bg-white/5"
        aria-label="Edit location"
      >
        <Pencil size={18} />
      </Link>
    </div>
  );
}

