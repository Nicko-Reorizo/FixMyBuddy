import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CameraOff, CheckCircle2, ChevronDown, XCircle } from 'lucide-react';
import { LocationCard } from '../components/app/LocationCard';
import { Button } from '../components/ui/Button';
import { useApp } from '../context/useApp';
import { issueOptions } from '../data/issues';
import { serviceOptions } from '../data/serviceOptions';

export function RequestAssistance() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { request, updateRequest } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');
  const selectedService = serviceOptions.find((service) => service.id === request.serviceType) || serviceOptions[0];
  const ServiceIcon = selectedService.icon;
  const step = useMemo(() => (request.issueType ? '3 / 4' : isOpen ? '2 / 4' : '1 / 4'), [isOpen, request.issueType]);

  useEffect(() => {
    const service = searchParams.get('service');

    if (serviceOptions.some((option) => option.id === service)) {
      updateRequest({ serviceType: service });
    }
  }, [searchParams, updateRequest]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!request.issueType) {
      setError('Choose the issue type before finding a provider.');
      setIsOpen(true);
      return;
    }

    setError('');
    navigate('/confirm-location');
  };

  return (
    <section className="screen">
      <form onSubmit={handleSubmit} className="mobile-column">
      <header className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-3">
          <Link
            to="/app"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/80 text-white transition hover:bg-white/10"
            aria-label="Back to home"
          >
            <ArrowLeft size={22} />
          </Link>
          <div className="flex items-center gap-2 text-sm font-bold">
            <ServiceIcon size={17} strokeWidth={2} />
            <span>FixMyBuddy</span>
          </div>
        </div>
        <span className="text-xs text-slate-400">{step}</span>
      </header>

      <div className="mt-6">
        <h1 className="text-2xl font-extrabold leading-tight">
          {request.issueType ? 'Issue details ready' : 'Describe Vehicle Issue'}
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          {`Tell us what happened so we can match the right ${selectedService.shortLabel.toLowerCase()} provider.`}
        </p>
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <p className="mb-2 text-xs font-bold uppercase text-white">Issue type</p>
          <button
            type="button"
            onClick={() => setIsOpen((value) => !value)}
            className={`panel flex h-12 w-full items-center justify-between px-4 text-left text-sm ${
              isOpen ? 'border-amber-400' : ''
            }`}
          >
            <span className={request.issueType ? 'text-white' : 'text-slate-400'}>
              {request.issueType || 'Choose an issue'}
            </span>
            <ChevronDown className={isOpen ? 'rotate-180 transition' : 'transition'} size={18} />
          </button>

          {isOpen ? (
            <div className="mt-4 overflow-hidden rounded-lg border border-amber-400 bg-slate-800">
              {issueOptions.map((issue) => (
                <button
                  key={issue}
                  type="button"
                  onClick={() => {
                    updateRequest({ issueType: issue });
                    setIsOpen(false);
                    setError('');
                  }}
                  className="flex w-full items-center justify-between border-b border-slate-700 px-4 py-4 text-left text-sm text-white last:border-b-0 hover:bg-slate-700/70"
                >
                  <span>{issue}</span>
                  {request.issueType === issue ? <XCircle size={17} className="text-white" /> : null}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        {!isOpen ? (
          <>
            <div>
              <p className="mb-2 text-xs font-bold uppercase text-white">Add a photo</p>
              <label className="panel flex min-h-[118px] cursor-pointer flex-col items-center justify-center border-dashed px-4 text-center transition hover:border-slate-500">
                <input
                  className="sr-only"
                  type="file"
                  accept="image/png,image/jpeg"
                  onChange={(event) => updateRequest({ photoName: event.target.files?.[0]?.name || '' })}
                />
                {request.photoName ? (
                  <>
                    <CheckCircle2 className="text-teal-300" size={28} />
                    <span className="mt-3 text-sm font-bold text-teal-300">Photo ready</span>
                    <span className="mt-1 max-w-full truncate text-xs text-slate-400">{request.photoName}</span>
                  </>
                ) : (
                  <>
                    <CameraOff className="text-white" size={30} />
                    <span className="mt-3 text-sm font-bold text-white">Take photo or choose from gallery</span>
                    <span className="mt-2 text-xs text-slate-400">JPG or PNG · up to 10 MB</span>
                  </>
                )}
              </label>
            </div>

            <div>
              <p className="mb-2 text-xs font-bold uppercase text-white">Short notes · Optional</p>
              <textarea
                className="panel min-h-[70px] w-full resize-none px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400 focus:border-amber-400"
                placeholder="Add anything that may help the provider..."
                value={request.notes}
                onChange={(event) => updateRequest({ notes: event.target.value })}
              />
            </div>
          </>
        ) : (
          <p className="text-xs leading-5 text-slate-400">
            Choose the closest match. You can add more detail and a photo next.
          </p>
        )}

        <LocationCard />

        {error ? <p className="text-sm font-semibold text-rose-300">{error}</p> : null}

        {request.issueType && !isOpen ? (
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase text-teal-300">
            <CheckCircle2 size={18} />
            Ready to submit
          </div>
        ) : null}

        <Button type="submit">
          Find a Provider
          <ArrowRight size={22} />
        </Button>
      </div>
      </form>
    </section>
  );
}

