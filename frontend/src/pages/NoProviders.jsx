import { AlertCircle } from 'lucide-react';
import { ScreenHeader } from '../components/app/ScreenHeader';
import { Button } from '../components/ui/Button';
import { useApp } from '../context/useApp';
import { serviceOptions } from '../data/serviceOptions';

export function NoProviders() {
  const { request, updateRequest } = useApp();
  const selectedService = serviceOptions.find((service) => service.id === request.serviceType) || serviceOptions[0];

  return (
    <section className="screen flex flex-col">
      <div className="mobile-column flex min-h-[calc(100vh-3.5rem)] flex-col lg:min-h-0">
      <ScreenHeader title="No Providers Nearby" backTo="/app" />

      <div className="flex flex-1 flex-col justify-center pb-20 text-center">
        <div className="mx-auto grid h-24 w-24 place-items-center rounded-full border-2 border-rose-400/60 bg-rose-400/10 text-rose-300">
          <AlertCircle size={42} />
        </div>

        <h1 className="mt-7 text-2xl font-extrabold text-white">No providers nearby</h1>
        <p className="mx-auto mt-4 max-w-sm text-base font-medium leading-7 text-blue-200">
          {`No verified ${selectedService.shortLabel.toLowerCase()} providers were found within ${request.searchRadiusKm} km. You can expand your search or try again after providers are available.`}
        </p>

        <div className="mt-16 space-y-3">
          <Button type="button" onClick={() => updateRequest({ searchRadiusKm: request.searchRadiusKm + 10 })}>
            Expand to {request.searchRadiusKm + 10} km
          </Button>
          <Button to="/providers" variant="muted">
            Retry Search
          </Button>
          <Button to="/" variant="ghost" className="mx-auto text-xs text-slate-500">
            Back to home
          </Button>
        </div>
      </div>
      </div>
    </section>
  );
}

