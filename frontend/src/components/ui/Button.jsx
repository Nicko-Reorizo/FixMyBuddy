import { Link } from 'react-router-dom';

const variants = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700',
  secondary: 'bg-slate-900 text-white hover:bg-slate-800',
  ghost: 'bg-transparent text-slate-700 hover:bg-slate-100',
};

export function Button({
  children,
  className = '',
  to,
  type = 'button',
  variant = 'primary',
  ...props
}) {
  const classes = `inline-flex h-10 items-center justify-center rounded px-4 text-sm font-semibold transition ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link className={classes} to={to} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} type={type} {...props}>
      {children}
    </button>
  );
}

