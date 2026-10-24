import { useState } from 'react';
import { CalendarDays } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { AuthNotice } from '../components/auth/AuthControls';
import { BookingSummary } from '../components/customer/BookingSummary';
import { CustomerHeading } from '../components/customer/CustomerHeading';
import { useAuth } from '../context/useAuth';
import { useCustomer } from '../context/useCustomer';
import { BookingPayment } from '../components/customer/BookingPayment';

export function History() {
  const { user } = useAuth();
  const { bookings, bookingStatus, refreshData } = useCustomer();
  const [params] = useSearchParams();
  const [filter, setFilter] = useState('all');
  const filtered = bookings.filter(
    (item) =>
      filter === 'all' ||
      (filter === 'upcoming'
        ? !['completed', 'cancelled', 'rejected'].includes(item.status)
        : item.status === filter),
  );
  const focused = bookings.find((item) => item.id === params.get('booking'));
  return (
    <>
      <CustomerHeading title="Service history" backTo="/app">
        Your past and upcoming assistance.
      </CustomerHeading>
      <div
        className="customer-history-filters"
        role="group"
        aria-label="Filter bookings"
      >
        {[
          ['all', 'All'],
          ['upcoming', 'Upcoming'],
          ['completed', 'Completed'],
          ['cancelled', 'Cancelled'],
        ].map(([value, label]) => (
          <button
            key={value}
            type="button"
            aria-pressed={filter === value}
            onClick={() => setFilter(value)}
          >
            {label}
          </button>
        ))}
      </div>
      {bookingStatus === 'loading' ? (
        <p role="status" className="customer-muted">
          Loading bookings...
        </p>
      ) : bookingStatus === 'error' ? (
        <AuthNotice error>
          Could not load bookings.{' '}
          <button
            type="button"
            onClick={refreshData}
            className="customer-text-button"
          >
            Try again
          </button>
        </AuthNotice>
      ) : focused ? (
        <section className="customer-booking-detail">
          <div className="customer-section-heading">
            <h2>Booking details</h2>
            <Link to="/history">Show all</Link>
          </div>
          <BookingSummary booking={focused} />
          {focused.notes && <p className="customer-muted">{focused.notes}</p>}
          <BookingPayment key={`${focused.id}-${focused.repairEstimate?.id}-${focused.repairEstimate?.version}`} booking={focused} onRefresh={refreshData} />
        </section>
      ) : filtered.length ? (
        <div className="customer-history-list">
          {filtered.map((item) => (
            <BookingSummary key={item.id} booking={item} />
          ))}
        </div>
      ) : (
        <div className="customer-empty">
          <CalendarDays size={33} />
          <h2>
            {user
              ? 'No bookings here yet'
              : 'Keep your roadside history together'}
          </h2>
          <p>
            {user
              ? 'Your confirmed requests will appear here. A request is only completed when the service is finished.'
              : 'Sign in to view your scheduled and past assistance.'}
          </p>
          <Link to={user ? '/app' : '/login'} className="auth-secondary">
            {user ? 'Request assistance' : 'Sign in'}
          </Link>
        </div>
      )}
    </>
  );
}
