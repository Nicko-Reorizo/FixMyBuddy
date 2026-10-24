import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CustomerHeading({ title, children, backTo }) {
  return (
    <div className="customer-heading">
      {backTo && (
        <Link to={backTo} className="auth-back">
          <ArrowLeft size={17} /> Back
        </Link>
      )}
      <h1>{title}</h1>
      {children && <p>{children}</p>}
    </div>
  );
}
