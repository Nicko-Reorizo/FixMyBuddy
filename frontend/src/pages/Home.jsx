import { ArrowRight, CalendarCheck, ShieldCheck, Wrench } from 'lucide-react';
import { Button } from '../components/ui/Button';

const highlights = [
  {
    icon: Wrench,
    title: 'Find trusted help',
    copy: 'Connect with local repair specialists for common home and device issues.',
  },
  {
    icon: CalendarCheck,
    title: 'Book faster',
    copy: 'Plan service requests with clear details before the backend is connected.',
  },
  {
    icon: ShieldCheck,
    title: 'Keep it organized',
    copy: 'Start with clean frontend structure that can grow with the MERN API.',
  },
];

export function Home() {
  return (
    <section className="container-page py-16 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
            Repair requests made simple
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-ink sm:text-5xl">
            Get the right buddy for the fix.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            FixMyBuddy helps users request repairs, compare services, and manage bookings from one clean dashboard.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to="/services" className="gap-2">
              View services <ArrowRight size={17} />
            </Button>
            <Button to="/register" variant="secondary">
              Create account
            </Button>
          </div>
        </div>

        <div className="rounded border border-slate-200 bg-white p-6 shadow-soft">
          <div className="rounded bg-slate-100 p-5">
            <p className="text-sm font-semibold text-slate-500">Sample request</p>
            <h2 className="mt-3 text-2xl font-bold text-ink">Aircon cleaning needed</h2>
            <p className="mt-3 text-slate-600">
              Quezon City, preferred schedule this weekend, includes diagnosis and quote.
            </p>
            <div className="mt-6 grid gap-3 text-sm text-slate-600">
              <div className="flex justify-between rounded bg-white px-4 py-3">
                <span>Status</span>
                <span className="font-semibold text-brand-700">Pending match</span>
              </div>
              <div className="flex justify-between rounded bg-white px-4 py-3">
                <span>Category</span>
                <span className="font-semibold text-slate-900">Home repair</span>
              </div>
              <div className="flex justify-between rounded bg-white px-4 py-3">
                <span>Priority</span>
                <span className="font-semibold text-slate-900">Normal</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 grid gap-4 md:grid-cols-3">
        {highlights.map((item) => (
          <article key={item.title} className="rounded border border-slate-200 bg-white p-5 shadow-sm">
            <item.icon className="text-brand-600" size={24} />
            <h2 className="mt-4 text-lg font-semibold text-ink">{item.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{item.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

