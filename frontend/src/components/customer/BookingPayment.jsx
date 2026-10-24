import { useState } from 'react';
import { Check, QrCode, ShieldCheck } from 'lucide-react';
import { customerService } from '../../services/customerService';
import { safeMediaUrl, validEstimate } from '../../utils/bookingValidation';
import { VisitEstimate } from '../app/VisitEstimate';
export function BookingPayment({ booking, onRefresh }) {
  const [busy, setBusy] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [reference, setReference] = useState('');
  const [approved, setApproved] = useState(false);
  const [qrFailed, setQrFailed] = useState(false);
  const [reported, setReported] = useState(false);
  const payment = booking.payment;
  const qrUrl = safeMediaUrl(payment?.qrUrl);
  async function report() {
    if (busy) return;
    setBusy('payment'); setError(''); setNotice('');
    try {
      const result = await customerService.reportPayment(booking.id, { reference: reference.trim() || undefined });
      if (result?.payment?.status !== 'pending_verification') throw new Error('Could not confirm the payment report. Refresh your booking before retrying.');
      setReported(true);
      setNotice('Payment reported. Waiting for the provider to confirm receipt.'); onRefresh();
    } catch (problem) { setError(problem.message); } finally { setBusy(''); }
  }
  async function approveRepair(event) {
    event.preventDefault(); if (!approved || busy) return;
    setBusy('repair'); setError(''); setNotice('');
    try {
      await customerService.approveRepairs(booking.id, { estimateId: booking.repairEstimate.id, estimateVersion: booking.repairEstimate.version });
      setNotice('Repair estimate approval saved.'); setApproved(false); onRefresh();
    } catch (problem) { setError(problem.message); } finally { setBusy(''); }
  }
  return <div className="booking-followup">
    {booking.repairApprovalStatus === 'awaiting_customer' && validEstimate(booking.repairEstimate) && <form className="request-form" onSubmit={approveRepair}>
      <h2>Review repair costs</h2><VisitEstimate estimate={booking.repairEstimate} service="repair" />
      <label className="provider-consent"><input type="checkbox" checked={approved} onChange={event => setApproved(event.target.checked)} /><span>I approve this separate repair estimate.</span></label>
      <button type="submit" className="auth-primary" disabled={!approved || Boolean(busy)}><Check size={18} />{busy === 'repair' ? 'Saving approval...' : 'Approve repair estimate'}</button>
    </form>}
    <h2><QrCode size={21} />Provider QR payment</h2>
    {payment?.status === 'verified' ? <p className="customer-save-status"><ShieldCheck size={18} />Payment receipt confirmed by provider.</p> : payment?.status === 'pending_verification' || reported ? <p className="auth-hint">Payment reported. Waiting for provider confirmation.</p> : qrUrl && !qrFailed ? <>
      <img className="provider-payment-qr" src={qrUrl} alt={`Payment QR supplied by ${booking.providerName || 'your provider'}`} referrerPolicy="no-referrer" onError={() => setQrFailed(true)} />
      {payment.payeeName && <p className="customer-muted">Payee: {payment.payeeName}</p>}
      <p className="auth-hint">Check the payee and amount in GCash before sending. Reporting payment does not verify it.</p>
      {payment.reportable === true && <><label className="request-field">Payment reference <span className="request-optional">Optional</span><input maxLength={100} value={reference} onChange={event => setReference(event.target.value)} /></label>
        <button type="button" className="auth-secondary" disabled={Boolean(busy) || reported} onClick={report}>{busy === 'payment' ? 'Reporting...' : 'I have sent payment'}</button></>}
    </> : <p className="auth-hint">{qrFailed ? 'The provider QR could not be loaded. Refresh the booking before paying.' : 'No payment QR has been supplied for this booking yet.'}</p>}
    {notice && <p role="status" className="customer-save-status">{notice}</p>}{error && <p className="auth-error" role="alert">{error}</p>}
  </div>;
}

