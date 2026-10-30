import { Link } from 'react-router-dom';
import { CalendarDays, MapPin } from 'lucide-react';
import { JobCard } from '../components/JobCard';
import { MechanicHeader } from '../components/MechanicHeader';

const sampleJob = {
  id: 'FMB-1042',
  service: 'Incoming · Battery',
  customer: 'Alex Reyes',
  vehicle: 'Toyota Vios',
  description: 'Mabolo Road · Clicking, won’t start',
  location: 'Mabolo Barangay Hall',
  distance: '2.4 km',
  estimatedNet: 405,
  status: 'New offer',
};

export function Jobs() {
  return (
    <div>
      <MechanicHeader
        title="Let’s get Naga moving."
        subtitle="Good morning, Miguel · Online · 15 km radius"
      />

      <section className="mb-5 rounded-2xl border border-[#34435b] bg-[#1c293d] p-3">
        <div className="flex min-h-24 items-center justify-between rounded-xl bg-[#dce8e4] px-4 text-[#1c293d]">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#10192d] px-3 py-1.5 text-xs font-semibold text-white">
            <MapPin size={15} />
            3 requests nearby
          </span>
          <span className="text-xs font-medium">Naga City</span>
        </div>
      </section>

      <div className="mb-3 flex items-center justify-between">
        <h2 className="m-0 text-sm font-semibold">New job offer</h2>
        <span className="text-xs text-[#aebbd0]">Today</span>
      </div>

      <JobCard job={sampleJob} to={`/mechanic/jobs/${sampleJob.id}`} />

      <div className="mb-3 mt-6 flex items-center justify-between">
        <h2 className="m-0 text-sm font-semibold">Scheduled next</h2>
        <Link
          to="/mechanic/jobs"
          className="text-xs font-semibold text-[#ffda45]"
        >
          View schedule
        </Link>
      </div>

      <article className="flex items-center gap-3 rounded-xl border border-[#34435b] bg-[#1c293d] p-3.5">
        <CalendarDays
          size={19}
          className="shrink-0 text-[#aebbd0]"
          aria-hidden="true"
        />
        <div className="min-w-0 flex-1">
          <strong className="block text-xs font-medium">
            Alex · Battery check
          </strong>
          <span className="mt-1 block text-xs text-[#aebbd0]">
            9:00 AM · FMB-1051 · ₱450 visit
          </span>
        </div>
        <span className="shrink-0 text-xs text-[#aebbd0]">21 Oct</span>
      </article>
    </div>
  );
}