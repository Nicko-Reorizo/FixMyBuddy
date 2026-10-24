import { useState } from 'react';
import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  AuthField,
  AuthHeading,
  AuthNotice,
  AuthSubmit,
} from '../../components/auth/AuthControls';
import { authService } from '../../services/authService';

export function ForgotPassword() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  async function submit(event) {
    event.preventDefault();
    if (busy) return;
    const email = new FormData(event.currentTarget).get('email').trim();
    setBusy(true);
    setError('');
    try {
      await authService.reset(email);
      setSent(true);
    } catch (failure) {
      setError(failure.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="auth-page">
      <AuthHeading title="Let's get you back in.">
        Enter your account email to request a password reset link.
      </AuthHeading>
      {sent ? (
        <>
          <AuthNotice>
            If an account exists for that email, you will receive reset
            instructions. Check your inbox and spam folder.
          </AuthNotice>
          <div className="auth-actions">
            <Link className="auth-primary" to="/login">
              Back to sign in
            </Link>
          </div>
        </>
      ) : (
        <form className="auth-form" onSubmit={submit}>
          <AuthField
            id="reset-email"
            name="email"
            label="Email address"
            type="email"
            autoComplete="email"
            required
            icon={Mail}
          />
          {error && <AuthNotice error>{error}</AuthNotice>}
          <div className="auth-actions">
            <AuthSubmit busy={busy}>Send reset link</AuthSubmit>
          </div>
        </form>
      )}
    </div>
  );
}
