import { ArrowRight, CheckCircle2, MapPinned, ShieldCheck, Wrench } from 'lucide-react';
import { Button } from '../components/ui/Button';

const benefits = [
  'Share your live location or enter an address.',
  'Request towing or mechanic assistance.',
  'Review request details before searching.',
];

export function Home() {
  return (
    <section className="screen overflow-hidden">
      <div className="flex min-h-[calc(100vh-3.5rem)] flex-col">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-bold">
            <Wrench className="text-amber-300" size={18} strokeWidth={2} />
            <span>FixMyBuddy</span>
          </div>
          <Button to="/app" variant="ghost" className="h-10 px-4">
            Open App
          </Button>
        </header>

        <div className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-2xl">
            <p className="inline-flex rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-sm font-semibold text-amber-200">
              On-demand towing and mechanic assistance
            </p>
            <h1 className="mt-6 text-5xl font-extrabold leading-tight text-white sm:text-6xl lg:text-7xl">
              When your ride stops, <span className="text-amber-300">we get you moving.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              FixMyBuddy helps motorists start a roadside assistance request, confirm their location, and search for available towing or mechanic providers.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button to="/app" className="sm:w-auto">
                Get help now
                <ArrowRight size={20} />
              </Button>
              <Button to="/request?service=towing" variant="secondary" className="sm:w-auto">
                Request towing
              </Button>
            </div>

            <div className="mt-8 grid gap-3 text-sm text-slate-300">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <CheckCircle2 className="text-teal-300" size={18} />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[2rem] border border-amber-300/10 bg-amber-300/5 blur-2xl" />
            <div className="relative mx-auto max-w-sm rounded-[2rem] border border-white/10 bg-slate-900/70 p-5 shadow-2xl shadow-black/30">
              <div className="rounded-[1.5rem] bg-[#151a30] p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-bold">
                    <Wrench size={16} />
                    <span>FixMyBuddy</span>
                  </div>
                  <span className="rounded-full bg-lime-400/15 px-3 py-1 text-xs font-bold text-lime-300">GPS ready</span>
                </div>

                <div className="mt-12 text-center">
                  <div className="mx-auto grid h-28 w-28 place-items-center rounded-full border border-white/10 bg-slate-800 text-amber-300">
                    <MapPinned size={50} strokeWidth={1.8} />
                  </div>
                  <h2 className="mt-6 text-2xl font-extrabold">Roadside request</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    Choose service, describe the issue, confirm location.
                  </p>
                </div>

                <div className="mt-8 space-y-3">
                  <div className="rounded-lg bg-amber-300 px-4 py-4 text-center font-bold text-slate-950">
                    Request Mechanic
                  </div>
                  <div className="rounded-lg bg-slate-700 px-4 py-4 text-center font-bold text-white">
                    Request Towing
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-slate-800 px-4 py-4 text-sm text-slate-300">
                    <ShieldCheck className="text-teal-300" size={20} />
                    <span>Review details before searching.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

