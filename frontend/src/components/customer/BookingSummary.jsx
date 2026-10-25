import { tr } from "../../i18n/translations";
import { CalendarDays, ChevronRight, Truck, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatters';
import { hasReceipt, terminalStatuses } from '../../utils/historyValidation';
export function BookingSummary({
  booking,
  detailed = false
}) {
  const date = booking.scheduledAt || booking.createdAt;
  const parsed = date ? new Date(date) : null;
  const formatted = parsed && !Number.isNaN(parsed.getTime()) ? parsed.toLocaleString('en-PH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'Asia/Manila'
  }) : '';
  const paid = booking.payment?.status === 'verified' && Number.isFinite(booking.paidAmount);
  const amount = paid ? formatCurrency(booking.paidAmount) : Number.isFinite(booking.quotedAmount) ? `${formatCurrency(booking.quotedAmount)} estimate` : 'Quote pending';
  const Icon = detailed ? booking.serviceType === 'towing' ? Truck : Wrench : CalendarDays;
  return <Link to={`/history?booking=${encodeURIComponent(booking.id)}`} className="customer-booking history-booking">
    <div><Icon size={21} /><h3>{booking.issueType || (booking.serviceType === 'towing' ? tr("Towing assistance") : tr("Mechanic assistance"))}</h3><span className="customer-status">{(booking.status || 'Status pending').replaceAll('_', ' ')}</span></div>
    <p>{[formatted, detailed ? booking.reference : booking.vehicleLabel].filter(Boolean).join(' · ') || tr("Request details")}</p>
    <p><span>{booking.providerName || booking.towing?.provider?.name || tr("Provider pending")}</span><strong className="history-amount">{amount}</strong></p>
    {detailed && booking.vehicleLabel && <p>{booking.vehicleLabel}</p>}
    {detailed && booking.serviceType === 'towing' && booking.destination && <p>{tr("Destination:")} {booking.destination}</p>}
    <p><span>{hasReceipt(booking) ? tr("Receipt available") : paid ? tr("Payment verified") : tr("Payment not verified")}</span><span className="history-manage">{terminalStatuses.has(booking.status) ? tr("View / rebook") : tr("Manage")} <ChevronRight size={15} /></span></p>
  </Link>;
}
