import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Check, Clock3, Wrench, Star, LoaderCircle, RefreshCw } from 'lucide-react';
import { RequestFrame } from '../components/app/RequestFrame';
import { ProviderIdentity } from '../components/app/ProviderIdentity';
import { VisitEstimate } from '../components/app/VisitEstimate';
import { useApp } from '../context/useApp';
import { getProvider } from '../services/providerService';
import { validEstimate } from '../utils/bookingValidation';
export function ProviderProfile() {
  const { providerId } = useParams();
  const { request, location, providers, setSearchProviders, setSelectedProviderId } = useApp();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [retry, setRetry] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const controller = new AbortController(); setProfile(null); setError('');
    getProvider(providerId, { request, location }, controller.signal).then(provider => {
      if (controller.signal.aborted) return;
      setProfile(provider);
      setSearchProviders(current => [...current.filter(item => String(item.id) !== String(provider.id)), provider]);
    }).catch(problem => { if (!controller.signal.aborted) setError(problem.message); });
    return () => controller.abort();
  }, [providerId, request, location, retry, setSearchProviders]);
  const provider = profile || providers.find(item => String(item.id) === String(providerId));
  return <RequestFrame title={request.serviceType === 'towing' ? 'Meet your towing buddy' : 'Meet your mechanic'} subtitle="Get to know your provider before booking." backTo="/providers">
    <div className="request-form">
      {error && <div className="provider-empty" role="status"><h2>Could not load this profile</h2><p>{error}</p><button className="auth-secondary" type="button" onClick={() => setRetry(value => value + 1)}><RefreshCw size={18} />Try again</button></div>}
      {!profile && !error && <p className="provider-loading" role="status"><LoaderCircle size={24} className="auth-spin" />Loading profile and current estimate...</p>}
      {provider && <><section className="provider-profile-summary"><ProviderIdentity provider={provider} />
        <dl><div><dt><Clock3 size={18} />Estimated arrival{Number.isFinite(provider.distanceKm) ? ` · ${provider.distanceKm} km away` : ''}</dt><dd>{Number.isFinite(provider.etaMinutes) ? `${provider.etaMinutes} min` : 'Pending'}</dd></div>
        {Number.isFinite(provider.jobsCompleted) && <div><dt><Wrench size={18} />Jobs completed</dt><dd>{provider.jobsCompleted}</dd></div>}</dl>
        {provider.verified === true && Array.isArray(provider.credentials) && <p className="provider-credentials">{provider.credentials.join(' · ')}</p>}
      </section>
      {Array.isArray(provider.specialties) && <div className="provider-tools">{provider.specialties.map(item => <span className="provider-chip" key={item}>{item}</span>)}</div>}
      <VisitEstimate estimate={provider.estimate} service={request.serviceType} />
      <section className="provider-reviews"><h2>What customers say</h2>
        {Array.isArray(provider.customerReviews) && provider.customerReviews.length ? provider.customerReviews.map((review, index) => <article key={review.id || index}><header><span>{review.authorName || 'Customer'}{review.createdAt && Number.isFinite(Date.parse(review.createdAt)) ? ` · ${new Date(review.createdAt).toLocaleDateString('en-PH')}` : ''}</span>{Number.isFinite(review.rating) && <strong>{review.rating.toFixed(1)} <Star size={13} /></strong>}</header><p>{review.text}</p></article>) : <p className="auth-hint">No customer reviews have been returned for this profile.</p>}
      </section></>}
      <button type="button" className="auth-primary request-continue" disabled={!profile || !validEstimate(profile.estimate)} onClick={() => { setSelectedProviderId(profile.id); navigate('/confirm-request'); }}><Check size={20} />Review booking</button>
      {profile && !validEstimate(profile.estimate) && <p className="auth-hint">A current visit estimate is required before booking.</p>}
      <Link className="provider-text-link" to="/providers">See other buddies</Link>
    </div>
  </RequestFrame>;
}

