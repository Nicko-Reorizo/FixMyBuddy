import { useState } from 'react';
import { Mail, Phone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AccountLink,
  AuthField,
  AuthHeading,
  AuthNotice,
  AuthSubmit,
  LegalLinks,
  PasswordField,
} from '../../components/auth/AuthControls';
import { useAuth } from '../../context/useAuth';
import { authService } from '../../services/authService';
import { isEmail, normalizePhone } from '../../utils/authValidation';

export function SignIn() {
  const [mode, setMode] = useState('phone');
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const { phone, setPhone, setChallenge, acceptUser } = useAuth();
  const navigate = useNavigate();

  async function submit(event) {
    event.preventDefault();
    if (busy) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const nextErrors = {};
    if (mode === 'phone' && !normalizePhone(phone))
      nextErrors.phone = 'Enter a valid Philippine mobile number.';
    if (mode === 'email' && !isEmail(data.get('email') || ''))
      nextErrors.email = 'Enter a valid email address.';
    setErrors(nextErrors);
    setError('');
    if (Object.keys(nextErrors).length) {
      form.elements.namedItem(Object.keys(nextErrors)[0])?.focus();
      return;
    }
    setBusy(true);
    try {
      if (mode === 'phone') {
        const normalized = normalizePhone(phone);
        const challenge = await authService.phone(normalized);
        setPhone(normalized);
        setChallenge({ ...challenge, flow: 'login' });
        navigate('/verify');
      } else {
        const user = await authService.login(
          data.get('email').trim(),
          data.get('password'),
        );
        acceptUser(user);
        navigate('/app');
      }
    } catch (failure) {
      setError(failure.message);
    } finally {
      setBusy(false);
      if (mode === 'email') form.elements.password.value = '';
    }
  }

  return (
    <div className="auth-page">
      <AuthHeading eyebrow="GOOD TO HAVE YOU HERE" title="Your roadside buddy.">
        When your ride stops, we get you moving.
      </AuthHeading>
      <div className="auth-segments" role="group" aria-label="Sign-in method">
        <button
          type="button"
          aria-pressed={mode === 'phone'}
          onClick={() => {
            setMode('phone');
            setErrors({});
            setError('');
          }}
          disabled={busy}
        >
          <Phone size={16} /> Mobile number
        </button>
        <button
          type="button"
          aria-pressed={mode === 'email'}
          onClick={() => {
            setMode('email');
            setErrors({});
            setError('');
          }}
          disabled={busy}
        >
          <Mail size={16} /> Email
        </button>
      </div>
      <form onSubmit={submit} className="auth-form" key={mode}>
        {mode === 'phone' ? (
          <>
            <AuthField
              id="phone"
              name="phone"
              label="Mobile number"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="09XX XXX XXXX"
              required
              icon={Phone}
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              error={errors.phone}
              hint="We'll send a one-time code to verify it's you."
            />
          </>
        ) : (
          <>
            <AuthField
              id="email"
              name="email"
              label="Email address"
              type="email"
              autoComplete="email"
              required
              icon={Mail}
              error={errors.email}
            />
            <PasswordField />
            <Link to="/forgot-password" className="auth-forgot">
              Forgot password?
            </Link>
          </>
        )}
        {error && <AuthNotice error>{error}</AuthNotice>}
        <div className="auth-actions">
          <AuthSubmit busy={busy}>
            {mode === 'phone' ? 'Continue with phone' : 'Sign in'}
          </AuthSubmit>
          <Link to="/signup" className="auth-secondary">
            Create an account
          </Link>
        </div>
      </form>
      <p className="auth-legal">
        By continuing, you agree to our <LegalLinks />.
      </p>
      <AccountLink to="/app" label="Browse first">
        Need a look around?
      </AccountLink>
    </div>
  );
}
