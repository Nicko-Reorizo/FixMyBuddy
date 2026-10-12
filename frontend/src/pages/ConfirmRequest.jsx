import { ArrowRight, Check, Clock3, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { LocationCard } from '../components/app/LocationCard';
import { ProviderCard } from '../components/app/ProviderCard';
import { ScreenHeader } from '../components/app/ScreenHeader';
import { Button } from '../components/ui/Button';
import { useApp } from '../context/useApp';
import { serviceOptions } from '../data/serviceOptions';

export function ConfirmRequest() {
  const navigate = useNavigate();
  const { confirmRequest, request, selectedProvider } = useApp();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const selectedService = serviceOptions.find((service) => service.id === request.serviceType) || serviceOptions[0];

  if (!selectedProvider) {
    return <Navigate to="/providers" replace />;
  }

  const handleConfirm = () => {
    if (!isConfirmed) {
      return;
    }

    if (confirmRequest()) {
      navigate('/history');
    }
  };

  return (
    <section className="screen">
      <div className="mobile-column">
        <ScreenHeader title="Confirm your request" subtitle={selectedService.shortLabel} backTo="/app" />

        <div className="mt-6 space-y-4">
          <div className="panel border-teal-400 px-4 py-5">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Estimated response</p>
            <div className="mt-2 flex items-center gap-3">
              <Clock3 className="text-white" size={26} />
              <div>
                <p className="text-xl font-extrabold">{selectedProvider.etaMinutes} minutes</p>
                <p className="text-xs font-semibold text-teal-300">Provider selected</p>
              </div>
            </div>
          </div>

          <div className="panel p-4">
            <p className="mb-3 text-xs font-bold uppercase text-slate-400">Selected provider</p>
            <ProviderCard {...selectedProvider} issueType={request.issueType} />
          </div>

          <div className="panel p-4">
            <p className="text-xs font-bold uppercase text-slate-400">Request summary</p>
            <h2 className="mt-3 text-lg font-bold text-white">{request.issueType}</h2>
            {request.notes ? <p className="mt-2 text-sm leading-6 text-slate-300">{request.notes}</p> : null}
            {request.photoName ? <p className="mt-2 text-xs font-semibold text-teal-300">Photo attached</p> : null}
          </div>

          <LocationCard compact />

          <div className="panel flex gap-3 px-4 py-4 text-sm leading-6 text-slate-300">
            <ShieldCheck className="mt-1 shrink-0 text-white" size={22} />
            <p>Stay in a safe place. Your provider can contact you once backend messaging is connected.</p>
          </div>

          <label className="flex cursor-pointer items-center gap-3 text-xs text-slate-400">
            <input
              type="checkbox"
              checked={isConfirmed}
              onChange={(event) => setIsConfirmed(event.target.checked)}
              className="h-5 w-5 rounded border-slate-600 bg-slate-900 accent-teal-400"
            />
            I confirm these request details are correct.
          </label>

          <Button
            type="button"
            onClick={handleConfirm}
            className={!isConfirmed ? 'opacity-60' : ''}
            aria-disabled={!isConfirmed}
          >
            <Check size={20} />
            Confirm Request
            <ArrowRight size={22} />
          </Button>
        </div>
      </div>
    </section>
  );
}

