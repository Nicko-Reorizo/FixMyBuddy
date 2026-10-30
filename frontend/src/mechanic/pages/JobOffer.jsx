import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  CarFront,
  MapPin,
  Wrench,
} from 'lucide-react';

const job = {
  id: 'FMB-1042',
  customer: 'Alex Reyes',
  vehicle: 'Toyota Vios · 2021',
  issue: 'Clicking, won’t start',
  location: 'Mabolo Barangay Hall',
  distance: '2.4 km',
  estimate: 405,
};

function formatPeso(value) {
  return `₱${Number(value).toLocaleString('en-PH')}`;
}

export function JobOffer() {
  const navigate = useNavigate();
  const { jobId } = useParams();

  function acceptJob() {
    navigate(`/mechanic/jobs/${jobId || job.id}/travel`);
  }

  function declineOffer() {
    navigate('/mechanic/jobs');
  }

  return (
    <div className="pb-4">
      <div className="mb-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#1c293d] text-[#ffda45]"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="m-0 text-xl font-bold">New job offer</h1>
          <p className="mb-0 mt-1 text-xs text-[#aebbd0]">
            {jobId || job.id} · Battery · Request expires in 00:42
          </p>
        </div>
      </div>

      <section className="mb-4 flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-[#24364d] font-bold text-[#ffda45]">
          AR
        </span>
        <div>
          <strong className="block text-sm">{job.customer}</strong>
          <span className="text-xs text-[#aebbd0]">
            Customer · Verified mobile
          </span>
        </div>
      </section>

      <section className="mb-3 flex items-center gap-3 rounded-xl border border-[#34435b] bg-[#1c293d] p-3.5">
        <CarFront size={22} className="shrink-0 text-[#ffda45]" />
        <div className="min-w-0 flex-1">
          <strong className="block text-sm">{job.vehicle}</strong>
          <span className="mt-1 block text-xs text-[#aebbd0]">
            Silver · ABC 1234
          </span>
        </div>
      </section>

      <section className="rounded-xl border border-[#34435b] bg-[#1c293d] p-3">
        <div className="flex h-32 items-center justify-center rounded-lg bg-[#dce8e4] text-[#274b5d]">
          <div className="flex items-center gap-2 rounded-full bg-[#10192d] px-3 py-2 text-xs font-semibold text-white">
            <MapPin size={15} />
            {job.distance} away
          </div>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <span className="grid h-16 w-20 shrink-0 place-items-center rounded-lg bg-[#24364d] text-[#ffda45]">
            <Wrench size={24} />
          </span>
          <div className="min-w-0">
            <strong className="block text-sm">{job.issue}</strong>
            <span className="mt-1 block text-xs leading-5 text-[#aebbd0]">
              Parked near a safe shoulder.
            </span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3 text-xs">
          <span className="inline-flex items-center gap-1.5 text-[#aebbd0]">
            <MapPin size={15} />
            {job.location}
          </span>
          <strong className="shrink-0">{job.distance}</strong>
        </div>
      </section>

      <section className="mt-4 rounded-xl border border-[#34435b] bg-[#1c293d] p-3.5">
        <h2 className="m-0 text-sm font-semibold">Visit estimate</h2>
        <div className="mt-3 flex justify-between text-xs text-[#aebbd0]">
          <span>Customer visit estimate</span>
          <strong className="text-white">₱450</strong>
        </div>
        <div className="mt-2 flex justify-between text-xs text-[#aebbd0]">
          <span>Platform fee · 10%</span>
          <strong className="text-white">₱45</strong>
        </div>
        <div className="mt-3 flex justify-between border-t border-[#34435b] pt-3 text-sm">
          <span>Estimated visit earnings</span>
          <strong className="text-[#ffda45]">{formatPeso(job.estimate)}</strong>
        </div>
      </section>

      <p className="mb-0 mt-3 text-xs leading-5 text-[#aebbd0]">
        Repairs require a separate customer-approved quote.
      </p>

      <div className="mt-5 flex flex-col gap-2">
        <button
          type="button"
          onClick={acceptJob}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#ffda45] px-4 text-sm font-bold text-[#111827]"
        >
          <ArrowRight size={18} />
          Accept job
        </button>
        <button
          type="button"
          onClick={declineOffer}
          className="min-h-12 rounded-xl bg-[#1c293d] px-4 text-sm font-semibold text-white"
        >
          Decline offer
        </button>
      </div>
    </div>
  );
}