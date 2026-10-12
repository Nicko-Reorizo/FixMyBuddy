import { ScreenHeader } from '../components/app/ScreenHeader';
import { ProviderCard } from '../components/app/ProviderCard';
import { Button } from '../components/ui/Button';
import { useApp } from '../context/useApp';

export function History() {
  const { history } = useApp();

  return (
    <section className="screen">
      <div className="mobile-column">
        <ScreenHeader title="Service History" subtitle="Completed requests" backTo="/app" />

        <div className="mt-6 space-y-3">
          {history.length > 0 ? (
            history.map((item) => (
              <ProviderCard
                key={item.id}
                name={item.providerName}
                issueType={item.issueType}
                distanceKm={0}
                rating={item.rating}
                reviews={0}
                completedPrice={item.amount}
              />
            ))
          ) : (
            <div className="panel px-5 py-8 text-center">
              <h2 className="text-lg font-bold text-white">No completed requests yet</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Confirmed service requests will appear here.
              </p>
              <Button to="/" className="mt-6">
                Start a request
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

