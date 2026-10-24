import { useEffect, useState } from 'react';
import { ArrowRight, Camera, ImageOff, ShieldAlert, X } from 'lucide-react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useApp } from '../context/useApp';
import { useCustomer } from '../context/useCustomer';
import { RequestFrame } from '../components/app/RequestFrame';
import { RequestVehicle } from '../components/app/RequestVehicle';
import { ACCEPTED_MEDIA, MAX_ATTACHMENTS, validateAttachment } from '../utils/attachmentValidation';
import { issuesFor } from '../data/requestIssues';

function MediaPreview({ file, onRemove }) {
  const [url, setUrl] = useState('');
  const [failed, setFailed] = useState(false);
  useEffect(() => { const value = URL.createObjectURL(file); setUrl(value); return () => URL.revokeObjectURL(value); }, [file]);
  return <figure className="request-media">
    {failed ? <div className="request-media-fallback"><ImageOff size={24} /><span>Preview unavailable</span></div> : file.type.startsWith('video/') ? <video src={url} controls preload="metadata" playsInline onError={() => setFailed(true)} /> : <img src={url} alt={file.name} onError={() => setFailed(true)} />}
    <figcaption title={file.name}>{file.name}</figcaption>
    <button type="button" onClick={onRemove} aria-label={`Remove ${file.name}`} title="Remove attachment"><X size={17} /></button>
  </figure>;
}

export function RequestDetails() {
  const { request, updateRequest, attachments, setAttachments } = useApp();
  const { selectedVehicle, vehicleStatus } = useCustomer();
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  if (vehicleStatus === 'loading') return <RequestFrame title="Your vehicle" subtitle="Loading..." />;
  if (!selectedVehicle) return <Navigate to={`/vehicles?continue=${request.serviceType}`} replace />;
  if (!issuesFor(request.serviceType).some(item => item.title === request.issueType)) return <Navigate to="/request" replace />;
  const towing = request.serviceType === 'towing';
  function addFiles(event) {
    const next = [...attachments];
    const messages = [];
    for (const file of Array.from(event.target.files || [])) {
      const problem = validateAttachment(file);
      if (problem) messages.push(`${file.name}: ${problem}`);
      else if (next.some(item => item.name === file.name && item.size === file.size && item.lastModified === file.lastModified)) messages.push(`${file.name}: Already attached.`);
      else if (next.length >= MAX_ATTACHMENTS) messages.push('You can attach up to 10 files.');
      else next.push(file);
    }
    setAttachments(next); setErrors([...new Set(messages)]); event.target.value = '';
  }
  function submit(event) {
    event.preventDefault();
    if (towing && request.destination.trim().length < 5) { setErrors(['Enter a full towing destination.']); return; }
    updateRequest({ vehicleId: selectedVehicle.id });
    navigate('/confirm-location');
  }
  return <RequestFrame backTo={`/request?service=${request.serviceType}`} title="Tell us what happened" subtitle={`Request ${request.serviceType} · Step 2 of 4`}>
    <form className="request-form" onSubmit={submit}>
      <RequestVehicle vehicle={selectedVehicle} service={request.serviceType} />
      <div className="request-selection"><span>{request.issueType} selected</span><Link to={`/request?service=${request.serviceType}`}>Change issue</Link></div>
      <label className="request-field">Issue description <span className="request-optional">Optional</span>
        <textarea rows={4} maxLength={2000} value={request.notes} onChange={event => updateRequest({ notes: event.target.value })} placeholder="What happened? What symptoms have you noticed?" />
      </label>
      {towing && <label className="request-field">Towing destination<input required minLength={5} maxLength={300} value={request.destination} onChange={event => updateRequest({ destination: event.target.value })} placeholder="Street, barangay, city or repair shop address" autoComplete="street-address" /></label>}
      <div className="request-attachment-heading"><h2>Photos & videos <span className="request-optional">Optional</span></h2><span aria-live="polite">{attachments.length} / 10</span></div>
      <div className="request-media-grid">
        {attachments.map((file, index) => <MediaPreview key={`${file.name}-${file.lastModified}-${file.size}`} file={file} onRemove={() => { setAttachments(current => current.filter((_, i) => i !== index)); setErrors([]); }} />)}
        {attachments.length < MAX_ATTACHMENTS && <label className="request-add-media"><Camera size={24} /><span>Add photos or videos</span><input className="sr-only" type="file" multiple accept={ACCEPTED_MEDIA} onChange={addFiles} /></label>}
      </div>
      <p className="auth-hint">Up to 10 files. Photos: 20 MB each. Videos: 100 MB each. JPG, PNG, WebP, HEIC, MP4, MOV or WebM.</p>
      <p className="auth-hint">Attachments stay in this tab until you leave or reload. Nothing has been uploaded.</p>
      <div className="request-safety"><ShieldAlert size={21} /><p>{request.issueType === 'Accident' ? 'If anyone is injured or in immediate danger, contact emergency services first.' : request.issueType === 'Battery' ? 'Do not touch leaking batteries or exposed wires. Wait in a safe place.' : 'Only take photos when it is safe. Stay clear of moving traffic.'}</p></div>
      {errors.length > 0 && <div className="auth-error" role="alert">{errors.map(message => <p key={message}>{message}</p>)}</div>}
      <button type="submit" className="auth-primary request-continue"><ArrowRight size={20} />Continue to location</button>
    </form>
  </RequestFrame>;
}

