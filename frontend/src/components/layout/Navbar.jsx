import { Menu, Wrench } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Button } from '../ui/Button';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
];

export function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="container-page flex h-16 items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2 font-semibold text-ink">
          <span className="grid h-9 w-9 place-items-center rounded bg-brand-600 text-white">
            <Wrench size={19} />
          </span>
          <span>FixMyBuddy</span>
        </NavLink>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium ${
                  isActive ? 'text-brand-700' : 'text-slate-600 hover:text-slate-950'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Button to="/login" variant="ghost">
            Log in
          </Button>
          <Button to="/register">Get started</Button>
        </div>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded border border-slate-200 text-slate-700 md:hidden"
          aria-label="Open navigation"
        >
          <Menu size={20} />
        </button>
      </nav>
    </header>
  );
}

