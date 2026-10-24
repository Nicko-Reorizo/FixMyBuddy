import { Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AuthNotice } from '../components/auth/AuthControls';
import { CustomerHeading } from '../components/customer/CustomerHeading';
import { useAuth } from '../context/useAuth';
import { useCustomer } from '../context/useCustomer';

export function Updates() {
  const { user } = useAuth();
  const { updates, updatesStatus, refreshData } = useCustomer();
  return (
    <>
      <CustomerHeading title="Your updates" backTo="/app">
        Booking news and provider updates.
      </CustomerHeading>
      {updatesStatus === 'loading' ? (
        <p role="status" className="customer-muted">
          Loading updates...
        </p>
      ) : updatesStatus === 'error' ? (
        <AuthNotice error>
          Could not load updates.{' '}
          <button
            type="button"
            onClick={refreshData}
            className="customer-text-button"
          >
            Try again
          </button>
        </AuthNotice>
      ) : updates.length ? (
        <div className="customer-update-list">
          {updates.map((item) => (
            <article key={item.id}>
              <Bell size={20} />
              <div>
                <h2>{item.title}</h2>
                <p>{item.message}</p>
                {item.bookingId && (
                  <Link
                    to={`/history?booking=${encodeURIComponent(item.bookingId)}`}
                  >
                    View booking
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="customer-empty">
          <Bell size={33} />
          <h2>
            {user ? "You're all caught up" : 'Your updates will appear here'}
          </h2>
          <p>
            {user
              ? 'New booking and provider updates will be shown here.'
              : 'Sign in to view updates for your assistance requests.'}
          </p>
          {!user && (
            <Link to="/login" className="auth-secondary">
              Sign in
            </Link>
          )}
        </div>
      )}
    </>
  );
}
