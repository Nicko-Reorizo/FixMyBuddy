import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
export function RequestFrame({ backTo = '/app', title, subtitle, children }) {
  const { pathname } = useLocation();
  return <section className="request-shell">
    <header className="request-header">
      <Link to={backTo} className="auth-back" aria-label={backTo === '/app' ? 'Back to home' : 'Back to previous step'} title="Back"><ArrowLeft size={22} /></Link>
      <Link to="/app" className="request-brand">FixMyBuddy</Link>
      <span>ROADSIDE</span>
    </header>
    <div className="request-content" key={pathname}>
      <h1>{title}</h1><p className="request-subtitle">{subtitle}</p>
      {children}
    </div>
  </section>;
}

