import { MonitorSmartphone, Paintbrush, PlugZap, Wrench } from 'lucide-react';

const services = [
  {
    icon: Wrench,
    name: 'Home repair',
    description: 'General fixes, installation help, and maintenance requests.',
  },
  {
    icon: PlugZap,
    name: 'Electrical',
    description: 'Lights, switches, outlets, appliances, and wiring support.',
  },
  {
    icon: MonitorSmartphone,
    name: 'Device support',
    description: 'Setup, troubleshooting, cleanup, and basic tech assistance.',
  },
  {
    icon: Paintbrush,
    name: 'Cleaning and upkeep',
    description: 'Small home refresh tasks and recurring service bookings.',
  },
];

export function Services() {
  return (
    <section className="container-page py-14">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold text-ink">Services</h1>
        <p className="mt-3 text-slate-600">
          Starter service categories for the frontend. These can later come from MongoDB through the Express API.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {services.map((service) => (
          <article key={service.name} className="rounded border border-slate-200 bg-white p-5 shadow-sm">
            <service.icon className="text-brand-600" size={24} />
            <h2 className="mt-4 text-lg font-semibold text-ink">{service.name}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

