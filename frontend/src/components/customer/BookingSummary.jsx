import { CalendarDays, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatters';

export function BookingSummary({ booking }) {
  const date = booking.scheduledAt || booking.createdAt;
  const parsed = date ? new Date(date) : null;
  const formatted =
    parsed && !Number.isNaN(parsed.getTime())
      ? parsed.toLocaleString('en-PH', {
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          timeZone: 'Asia/Manila',
        })
      : '';
  const amount =
    typeof booking.quotedAmount === 'number'
      ? formatCurrency(booking.quotedAmount)
      : 'Quote pending';
  return (
    <Link
      to={`/history?booking=${encodeURIComponent(booking.id)}`}
      className="customer-booking"
    >
      <div>
        <CalendarDays size={21} />
        <h3>
          {booking.issueType ||
            (booking.serviceType === 'towing'
              ? 'Towing assistance'
              : 'Mechanic assistance')}
        </h3>
        <span className="customer-status">
          {(booking.status || 'pending').replaceAll('_', ' ')}
        </span>
      </div>
      <p>
        {[formatted, booking.vehicleLabel].filter(Boolean).join(' · ') ||
          'Request details'}
      </p>
      <p>
        {[booking.providerName, amount].filter(Boolean).join(' · ')}
        <ChevronRight size={15} />
      </p>
    </Link>
  );
}
