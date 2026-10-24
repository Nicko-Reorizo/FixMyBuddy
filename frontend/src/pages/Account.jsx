import {
  CarFront,
  ChevronRight,
  LogIn,
  MapPin,
  ShieldCheck,
  UserRound,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { CustomerHeading } from '../components/customer/CustomerHeading';
import { useAuth } from '../context/useAuth';
import { useCustomer } from '../context/useCustomer';

export function Account() {
  const { user } = useAuth();
  const { vehicles, localGarage } = useCustomer();
  return (
    <>
      <CustomerHeading title="Your account">
        The details that keep your ride moving.
      </CustomerHeading>
      <div className="customer-account-person">
        <span>
          <UserRound size={25} />
        </span>
        <div>
          <h2>{user?.name || 'Browsing as a guest'}</h2>
          <p>{user?.email || 'Sign in to access your customer account.'}</p>
        </div>
      </div>
      {!user && (
        <Link to="/login" className="auth-primary customer-account-login">
          <LogIn size={18} /> Sign in
        </Link>
      )}
      <div className="customer-account-links">
        <Link to="/vehicles">
          <CarFront size={23} />
          <span>
            <strong>My vehicles</strong>
            <small>
              {vehicles.length
                ? `${vehicles.length} saved ${vehicles.length === 1 ? 'vehicle' : 'vehicles'}`
                : 'Add the ride that needs a buddy'}
            </small>
          </span>
          <ChevronRight size={19} />
        </Link>
        <Link to="/location">
          <MapPin size={23} />
          <span>
            <strong>Pickup location</strong>
            <small>Update where you need help</small>
          </span>
          <ChevronRight size={19} />
        </Link>
        <Link to="/profile">
          <ShieldCheck size={23} />
          <span>
            <strong>Profile & safety contact</strong>
            <small>Manage your account and emergency contact</small>
          </span>
          <ChevronRight size={19} />
        </Link>
      </div>
      {localGarage && (
        <p className="auth-hint">
          Vehicles you add here are stored on this device. Your booking and
          account details require sign-in.
        </p>
      )}
      <Link to="/" className="customer-landing-link">
        Back to landing page
      </Link>
    </>
  );
}
