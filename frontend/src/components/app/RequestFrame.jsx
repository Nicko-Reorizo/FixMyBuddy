import { tr, trTemplate } from "../../i18n/translations";
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
export function RequestFrame({
  backTo = '/app',
  title,
  subtitle,
  children
}) {
  const {
    pathname
  } = useLocation();
  const step = { '/request': 1, '/request/details': 2, '/confirm-location': 3, '/request/matching': 4 }[pathname];
  return <section className="request-shell">
    <header className="request-header">
      <Link to={backTo} className="auth-back" aria-label={backTo === '/app' ? tr("Back to home") : tr("Back to previous step")}><ArrowLeft size={22} /><span>{tr("Back")}</span></Link>
      <Link to="/app" className="request-brand">{tr("FixMyBuddy")}</Link>
      <span>{tr("ROADSIDE")}</span>
    </header>
    <div className="request-content" key={pathname}>
      {step && <p className="request-progress">{trTemplate(['Step ', ' of 4'], [step])}</p>}
      <h1>{tr(title)}</h1><p className="request-subtitle">{tr(subtitle)}</p>
      {children}
    </div>
  </section>;
}
