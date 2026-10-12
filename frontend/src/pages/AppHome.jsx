import { Clock3, Crosshair, History as HistoryIcon, LifeBuoy, MapPinned, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LocationCard } from '../components/app/LocationCard';
import { Button } from '../components/ui/Button';
import { useApp } from '../context/useApp';
import { serviceOptions } from '../data/serviceOptions';

export function AppHome() {
  const { resetRequest } = useApp();

  return (
    <section className="screen web-grid">
      <div className="mobile-column flex min-h-[calc(100vh-3.5rem)] flex-col lg:min-h-0">
        <header className="flex items-start justify-between pt-5 lg:pt-0">
          <div>
            <div className="flex items-center gap-2 text-sm font-bold">
              <Wrench size={16} strokeWidth={2} />
              <span>FixMyBuddy</span>
            </div>
            <p className="mt-1 inline-flex rounded bg-slate-700/50 px-1.5 py-0.5 text-xs italic text-slate-400">
              Roadside assistance
            </p>
          </div>
          <Button to="/history" variant="ghost" className="h-10 w-10 rounded-full p-0" aria-label="History">
            <Clock3 size={22} strokeWidth={2} />
          </Button>
        </header>

        <div className="flex flex-1 flex-col justify-center py-10">
          <div className="mx-auto grid h-36 w-36 place-items-center rounded-full border border-white/10 bg-slate-800/50 text-amber-300">
            <Crosshair size={72} strokeWidth={1.8} />
          </div>

          <div className="mx-auto mt-8 max-w-xs text-center">
            <h1 className="text-3xl font-extrabold leading-tight">Need Roadside Assistance?</h1>
            <p className="mt-3 text-sm italic leading-5 text-slate-200">
              When your ride stops, we get you moving.
            </p>
          </div>

          <div className="mt-8">
            <LocationCard compact />
          </div>
        </div>

        <div className="space-y-4 pb-8 lg:pb-0">
          {serviceOptions.map((service, index) => (
            <Button
              key={service.id}
              to={`/request?service=${service.id}`}
              variant={index === 0 ? 'primary' : 'secondary'}
              className="text-lg"
              onClick={() => resetRequest(service.id)}
            >
              <service.icon size={28} strokeWidth={2} />
              {service.label}
            </Button>
          ))}

          <div className="grid grid-cols-3 gap-4">
            <Button to="/history" variant="secondary" className="h-[76px] flex-col gap-1 rounded-lg text-xs">
              <HistoryIcon size={23} strokeWidth={2} />
              History
            </Button>
            <Button to="/confirm-location" variant="secondary" className="h-[76px] flex-col gap-1 rounded-lg text-xs">
              <MapPinned size={23} strokeWidth={2} />
              Location
            </Button>
            <Button to="/no-providers" variant="secondary" className="h-[76px] flex-col gap-1 rounded-lg text-xs">
              <LifeBuoy size={23} strokeWidth={2} />
              Search
            </Button>
          </div>
        </div>
      </div>

      <aside className="hidden lg:block">
        <div className="rounded-2xl border border-white/10 bg-slate-900/45 p-7">
          <p className="text-sm font-semibold uppercase tracking-wide text-amber-300">Responsive app flow</p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight">Fast help request flow for stranded motorists.</h2>
          <p className="mt-4 text-sm leading-6 text-slate-300">
            Choose the service, describe the issue, confirm the location, and search for available providers.
          </p>

          <div className="mt-6 grid gap-3">
            {serviceOptions.map((service) => (
              <Link
                key={service.id}
                to={`/request?service=${service.id}`}
                onClick={() => resetRequest(service.id)}
                className="rounded-xl border border-white/10 bg-slate-800/70 p-4 transition hover:border-amber-300/60"
              >
                <div className="flex items-center gap-3">
                  <service.icon className="text-amber-300" size={22} strokeWidth={2} />
                  <span className="font-bold text-white">{service.shortLabel}</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-400">{service.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </section>
  );
}

