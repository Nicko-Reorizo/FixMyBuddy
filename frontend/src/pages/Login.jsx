import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export function Login() {
  return (
    <section className="container-page grid min-h-[calc(100vh-8rem)] place-items-center py-12">
      <form className="w-full max-w-md rounded border border-slate-200 bg-white p-6 shadow-soft">
        <h1 className="text-2xl font-bold text-ink">Log in</h1>
        <p className="mt-2 text-sm text-slate-600">Access your FixMyBuddy account.</p>

        <div className="mt-6 space-y-4">
          <Input id="email" label="Email" placeholder="you@example.com" type="email" />
          <Input id="password" label="Password" placeholder="Enter your password" type="password" />
        </div>

        <Button className="mt-6 w-full" type="submit">
          Log in
        </Button>
      </form>
    </section>
  );
}

