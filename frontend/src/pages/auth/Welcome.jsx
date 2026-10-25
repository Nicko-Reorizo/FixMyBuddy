import { tr } from "../../i18n/translations";
import { useEffect } from 'react';
import { ArrowRight, LocateFixed, LoaderCircle, MapPin, Navigation, ReceiptText, ShieldCheck, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/useApp';
export function PickupPreview({
  onLocate,
  locating = false,
  compact = false
}) {
  const {
    location
  } = useApp();
  const hasLocation = Number.isFinite(location.latitude) && Number.isFinite(location.longitude);
  const bounds = hasLocation ? [location.longitude - 0.008, location.latitude - 0.008, location.longitude + 0.008, location.latitude + 0.008].join(',') : '';
  return <figure className="landing-map">
      <div className="landing-map-canvas">
        {hasLocation ? <iframe title={tr("Your selected pickup location")} src={`https://www.openstreetmap.org/export/embed.html?bbox=${bounds}&layer=mapnik&marker=${location.latitude},${location.longitude}`} loading="lazy" referrerPolicy="no-referrer" /> : <div className="landing-map-art" role="img" aria-label={tr("Illustrative street map. No pickup location or provider has been selected.")}>
            <span className="map-park map-park-one" />
            <span className="map-park map-park-two" />
            <span className="map-block map-block-one" />
            <span className="map-block map-block-two" />
            <span className="map-road map-road-one" />
            <span className="map-road map-road-two" />
            <span className="map-road map-road-three" />
            <span className="map-road map-road-four" />
            <span className="map-river" />
            <span className="map-illustration-label">{tr("Map illustration")}</span>
            <span className="map-location-symbol">
              <MapPin size={25} />
            </span>
          </div>}
        {!hasLocation && <span className="landing-map-badge">
            <MapPin size={13} />{tr("Your journey starts here")}</span>}
        {onLocate && <button type="button" className="customer-map-locate" onClick={onLocate} disabled={locating} aria-label={tr("Use my current location")} title={tr("Use my current location")}>
            {locating ? <LoaderCircle size={21} className="auth-spin" /> : <LocateFixed size={21} />}
          </button>}
      </div>
      {!compact && <figcaption>
          <Navigation size={15} />
          <span>
            {hasLocation ? tr("Your selected location. Change it before booking.") : tr("Set your pickup location when you request help.")}
          </span>
        </figcaption>}
    </figure>;
}
const benefits = [{
  icon: Wrench,
  title: 'Mechanic or towing, in one place',
  text: 'Find the right help for your ride.'
}, {
  icon: ShieldCheck,
  title: 'Your roadside buddy, your choice',
  text: 'Choose a provider or let us find a match.'
}, {
  icon: ReceiptText,
  title: 'Know the estimate before you go',
  text: 'Review costs before you book.'
}];
export function Welcome() {
  const providerPortal = import.meta.env.VITE_PROVIDER_PORTAL_URL;
  useEffect(() => {
    document.title = 'FixMyBuddy | Your roadside buddy';
    window.scrollTo(0, 0);
  }, []);
  return <main className="auth-root customer-landing">
      <a className="auth-skip" href="#landing-content">{tr("Skip to content")}</a>
      <div className="landing-shell">
        <header className="landing-header">
          <Link to="/" className="auth-brand" aria-label={tr("FixMyBuddy home")}>
            <span className="auth-brand-icon">
              <Wrench size={21} />
            </span>
            <span>{tr("FixMyBuddy")}</span>
          </Link>
          <span className="auth-customer-tag">{tr("ROADSIDE")}</span>
        </header>
        <div id="landing-content" className="landing-content" tabIndex={-1}>
          <h1>{tr("Roadside trouble?")}<br />{tr("You've got a buddy.")}</h1>
          <p className="landing-intro">{tr("Find a mechanic or a tow near you.")}<br />{tr("Less worry. More getting on with your day.")}</p>
          <PickupPreview />
          <div className="landing-benefits">
            {benefits.map(({
            icon: Icon,
            title,
            text
          }) => <div key={title}>
                <span className="landing-benefit-icon">
                  <Icon size={21} />
                </span>
                <div>
                  <h2>{tr(title)}</h2>
                  <p>{text}</p>
                </div>
              </div>)}
          </div>
        </div>
        <footer className="landing-actions">
          <Link to="/signup" className="auth-primary">
            <ArrowRight size={21} />{tr("Get started")}</Link>
          <Link to="/login" className="auth-secondary">{tr("Sign in")}</Link>
          <p className="landing-guest">{tr("Just looking around?")}<Link to="/app">{tr("Browse first")}</Link>
          </p>
          {providerPortal && <p className="landing-pro">{tr("Are you a mechanic?")} {' '}
              <a href={providerPortal}>{tr("Join FixMyBuddy Pro")}</a>
            </p>}
        </footer>
      </div>
    </main>;
}
