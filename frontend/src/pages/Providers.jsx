import { Navigate, useNavigate } from 'react-router-dom';
import { ScreenHeader } from '../components/app/ScreenHeader';
import { ProviderCard } from '../components/app/ProviderCard';
import { Button } from '../components/ui/Button';
import { useApp } from '../context/useApp';
import { serviceOptions } from '../data/serviceOptions';

export function Providers() {
  const navigate = useNavigate();
  const { providers, request, setSelectedProviderId, updateRequest } = useApp();
  const selectedService = serviceOptions.find((service) => service.id === request.serviceType) || serviceOptions[0];

  if (providers.length === 0) {
    return <Navigate to="/no-providers" replace />;
  }

  return (
    <section className="screen">
      <div className="mobile-column">
      <ScreenHeader
        title="Nearby Providers"
        subtitle={`${selectedService.shortLabel} · ${providers.length} available`}
        backTo="/app"
      />

      <div className="mt-6 space-y-3">
        {providers.map((provider) => (
          <ProviderCard
            key={provider.id}
            {...provider}
            issueType={request.issueType}
            onClick={() => {
              setSelectedProviderId(provider.id);
              navigate('/confirm-request');
            }}
          />
        ))}
        <Button
          type="button"
          variant="muted"
          className="mt-3"
          onClick={() => updateRequest({ searchRadiusKm: request.searchRadiusKm + 10 })}
        >
          Expand search radius
        </Button>
      </div>
      </div>
    </section>
  );
}

