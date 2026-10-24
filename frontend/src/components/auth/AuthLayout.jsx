import { useEffect } from 'react';
import { ArrowLeft, ArrowUpRight, Wrench } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const steps = ['/signup', '/verify', '/permissions', '/profile'];
const titles = {
  '/start': 'Welcome',
  '/login': 'Sign in',
  '/signup': 'Create account',
  '/verify': 'Verify number',
  '/permissions': 'Your preferences',
  '/profile': 'Safety contact',
  '/forgot-password': 'Reset password',
};

export function AuthLayout() {
  const { pathname } = useLocation();
  const step = steps.indexOf(pathname);
  const backTo =
    {
      '/start': '/',
      '/login': '/',
      '/signup': '/',
      '/verify': '/login',
      '/permissions': '/app',
      '/profile': '/permissions',
      '/forgot-password': '/login',
    }[pathname] || '/';

  useEffect(() => {
    document.title = `${titles[pathname] || 'Account'} | FixMyBuddy`;
    window.scrollTo(0, 0);
    return () => {
      document.title = 'FixMyBuddy';
    };
  }, [pathname]);

  return (
    <div className="auth-root">
      <a href="#auth-main" className="auth-skip">
        Skip to form
      </a>
      <header className="auth-nav">
        <Link to="/" className="auth-brand" aria-label="FixMyBuddy home">
          <span className="auth-brand-icon">
            <Wrench size={21} />
          </span>
          <span>
            FixMyBuddy
            <span className="auth-brand-caption">YOUR ROADSIDE BUDDY</span>
          </span>
        </Link>
        <Link to="/app" className="auth-browse">
          Browse first <ArrowUpRight size={16} />
        </Link>
      </header>
      <div className="auth-workspace">
        <main id="auth-main" className="auth-main" tabIndex={-1}>
          <div className="auth-form-wrap" key={pathname}>
            <div className="auth-form-top">
              <Link to={backTo} className="auth-back">
                <ArrowLeft size={18} /> Back
              </Link>
              <span className="auth-customer-tag">CUSTOMER</span>
            </div>
            {step >= 0 && (
              <div
                className="auth-progress"
                aria-label={`Onboarding step ${step + 1} of 4`}
              >
                <div className="auth-progress-bars">
                  {steps.map((path, index) => (
                    <span
                      key={path}
                      className={index <= step ? 'is-current' : ''}
                    />
                  ))}
                </div>
                <span>{step + 1} / 4</span>
              </div>
            )}
            <Outlet />
          </div>
          <footer className="auth-footer">
            <Wrench size={13} /> FixMyBuddy{' '}
            <span>Here for your next move.</span>
          </footer>
        </main>
      </div>
    </div>
  );
}
