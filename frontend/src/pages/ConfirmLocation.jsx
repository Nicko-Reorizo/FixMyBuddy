import { useState } from 'react';
import { MapPin, LocateFixed, ArrowRight } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';
import { RequestFrame } from '../components/app/RequestFrame';
import { PickupPreview } from './auth/Welcome';
import { useApp } from '../context/useApp';
import { useCustomer } from '../context/useCustomer';
import { useGeolocation } from '../hooks/useGeolocation';

export function ConfirmLocation() {
  const { request, updateRequest, location, setLocation } = useApp();
  const { selectedVehicle, vehicleStatus } = useCustomer();
  const { requestLocation, status, error: gpsError } = useGeolocation();
  const [address, setAddress] = useState(location.address === 'Use current location' ? '' : location.address);
  const [coordinates, setCoordinates] = useState(false);
  const [latitude, setLatitude] = useState(location.latitude ?? '');
  const [longitude, setLongitude] = useState(location.longitude ?? '');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const hasCoordinates = Number.isFinite(location.latitude) && Number.isFinite(location.longitude);
  if (vehicleStatus === 'loading') return <RequestFrame title="Your vehicle" subtitle="Loading..." />;
  if (!selectedVehicle || !request.issueType || (request.serviceType === 'towing' && request.destination.trim().length < 5)) return <Navigate to="/request" replace />;
  async function locate() {
    const result = await requestLocation();
    if (result) { setLocation(result); setAddress(result.address); setLatitude(result.latitude); setLongitude(result.longitude); setCoordinates(false); setError(''); }
  }
  function applyCoordinates() {
    const lat = Number(latitude), lng = Number(longitude);
    if (String(latitude).trim() === '' || String(longitude).trim() === '' || !Number.isFinite(lat) || !Number.isFinite(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180) { setError('Enter latitude between -90 and 90 and longitude between -180 and 180.'); return; }
    setLocation({ latitude: lat, longitude: lng, address: address.trim() || 'Selected coordinates', source: 'Coordinates selected', updatedAt: new Date().toISOString() });
    setError(''); setCoordinates(false);
  }
  function submit(event) {
    event.preventDefault();
    if (coordinates) { setError('Apply your coordinates or cancel editing before continuing.'); return; }
    if (!hasCoordinates && address.trim().length < 5) { setError('Use GPS or enter a full pickup address.'); return; }
    setLocation(current => ({ ...current, address: address.trim() || 'Selected coordinates' }));
    updateRequest({ vehicleId: selectedVehicle.id });
    navigate('/request/matching');
  }
  return <RequestFrame backTo="/request/details" title="Confirm your location" subtitle="We'll send your buddy to this spot.">
    <form className="request-form" onSubmit={submit}>
      <PickupPreview compact onLocate={locate} locating={status === 'loading'} />
      <label className="request-field"><span className="request-label-icon"><MapPin size={19} />Pickup location</span>
        <input value={address} maxLength={300} placeholder="Street, barangay and city" autoComplete="street-address" onChange={event => { setAddress(event.target.value); setLocation({ address: event.target.value, latitude: null, longitude: null, source: 'Manual address' }); setError(''); }} />
      </label>
      {hasCoordinates && <p className="request-location-status">{location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}{Number.isFinite(location.accuracy) ? ` · GPS accuracy ±${Math.round(location.accuracy)} m` : ''}{location.updatedAt ? ` · Captured ${new Date(location.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : ''}</p>}
      <div className="request-location-actions"><button type="button" className="auth-secondary" onClick={locate} disabled={status === 'loading'}><LocateFixed size={18} />{status === 'loading' ? 'Locating...' : 'Use GPS'}</button><button type="button" className="auth-secondary" onClick={() => { setCoordinates(value => !value); setError(''); }}>{coordinates ? 'Cancel editing' : 'Edit coordinates'}</button></div>
      {coordinates && <div className="request-coordinate-editor">
        <label className="request-field">Latitude<input type="number" step="any" value={latitude} onChange={event => setLatitude(event.target.value)} /></label>
        <label className="request-field">Longitude<input type="number" step="any" value={longitude} onChange={event => setLongitude(event.target.value)} /></label>
        <button type="button" className="auth-secondary" onClick={applyCoordinates}>Apply coordinates</button>
      </div>}
      {!hasCoordinates && <p className="auth-hint">A typed address has no confirmed map pin. Check the full address carefully, or use GPS for exact coordinates.</p>}
      <label className="request-field">Landmark / instructions <span className="request-optional">Optional</span><textarea rows={3} maxLength={500} value={request.landmark} placeholder="Nearby landmark, road side, or access instructions" onChange={event => updateRequest({ landmark: event.target.value })} /></label>
      <p className="auth-hint">Check your pickup location and stay clear of moving traffic.</p>
      {(error || gpsError) && <p className="auth-error" role="alert">{error || gpsError}</p>}
      <button type="submit" className="auth-primary request-continue"><ArrowRight size={20} />Confirm & find providers</button>
    </form>
  </RequestFrame>;
}

