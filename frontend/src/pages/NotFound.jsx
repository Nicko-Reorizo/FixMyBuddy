import { Button } from '../components/ui/Button';

export function NotFound() {
  return (
    <section className="container-page grid min-h-[calc(100vh-8rem)] place-items-center py-12 text-center">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">404</p>
        <h1 className="mt-3 text-3xl font-bold text-ink">Page not found</h1>
        <p className="mt-3 text-slate-600">The page you are looking for does not exist.</p>
        <Button to="/" className="mt-6">
          Go home
        </Button>
      </div>
    </section>
  );
}

