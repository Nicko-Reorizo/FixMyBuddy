import { UserRound } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export function ProviderCard({
  name,
  etaMinutes,
  distanceKm,
  priceMin,
  priceMax,
  rating = 5,
  reviews = 0,
  completedPrice,
  issueType,
  onClick,
}) {
  const content = (
    <>
      <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full text-white">
        <UserRound size={52} strokeWidth={1.8} />
      </div>
      <div className="min-w-0 flex-1">
        <h2 className="truncate text-base font-bold text-white">{name}</h2>
        <p className="text-[10px] font-semibold text-white">{issueType || 'Verified Provider'}</p>
        <p className="mt-2 text-[10px] font-semibold text-white">
          <span className="text-amber-300">★ {rating.toFixed(1)}</span> ({reviews}) · {distanceKm} km
        </p>
      </div>
      <div className="text-right">
        {completedPrice ? (
          <>
            <p className="text-xl font-bold text-green-400">{formatCurrency(completedPrice)}</p>
            <span className="rounded border border-green-500 px-2 py-0.5 text-[9px] uppercase text-green-400">
              Completed
            </span>
          </>
        ) : (
          <>
            <p className="text-base font-semibold text-white">{etaMinutes} min</p>
            <p className="text-[10px] font-semibold text-white">ETA</p>
            <p className="mt-3 text-[10px] font-bold text-amber-300">
              {formatCurrency(priceMin)} - {formatCurrency(priceMax)}
            </p>
          </>
        )}
      </div>
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="panel flex min-h-[110px] w-full items-center gap-4 px-5 py-5 text-left transition hover:border-amber-300/70 hover:bg-slate-800"
      >
        {content}
      </button>
    );
  }

  return (
    <article className="panel flex min-h-[110px] items-center gap-4 px-5 py-5">
      {content}
    </article>
  );
}

