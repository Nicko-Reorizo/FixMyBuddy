import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Eye, EyeOff, Mail } from 'lucide-react';
import { MechanicHeader } from '../components/MechanicHeader';

export function SignIn() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    navigate('/mechanic/availability');
  }

  return (
    <div className="flex min-h-[calc(100dvh-160px)] flex-col">
      <MechanicHeader />

      <div className="mt-4">
        <h1 className="m-0 text-2xl font-bold">Put your skills to work.</h1>
        <p className="mb-0 mt-1 text-sm text-[#aebbd0]">
          FixMyBuddy Pro · Your roadside workspace
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <label className="flex flex-col gap-2 text-xs font-medium text-[#c4cede]">
          Mobile or email
          <span className="flex min-h-12 items-center gap-2 rounded-xl border border-[#34435b] bg-[#1c293d] px-3 focus-within:border-[#ffda45]">
            <input
              type="text"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@example.com"
              className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-[#718097]"
              required
            />
            <Mail size={17} className="text-[#aebbd0]" aria-hidden="true" />
          </span>
        </label>

        <label className="flex flex-col gap-2 text-xs font-medium text-[#c4cede]">
          Password
          <span className="flex min-h-12 items-center gap-2 rounded-xl border border-[#34435b] bg-[#1c293d] px-3 focus-within:border-[#ffda45]">
            <input
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-[#718097]"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="grid h-9 w-9 place-items-center text-[#aebbd0]"
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </span>
        </label>

        <div className="flex justify-between gap-3 text-xs text-[#aebbd0]">
          <span>Secure provider login</span>
          <Link to="/forgot-password" className="font-semibold text-[#ffda45]">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#ffda45] px-4 text-sm font-bold text-[#111827]"
        >
          <ArrowRight size={18} />
          Sign in to Pro
        </button>
      </form>

      <section className="mt-6 rounded-xl border border-[#34435b] bg-[#1c293d] p-4">
        <h2 className="m-0 text-sm font-semibold">New to the network?</h2>
        <p className="mb-0 mt-1 text-xs leading-5 text-[#aebbd0]">
          Get verified before accepting your first job.
        </p>
        <ol className="mb-0 mt-4 flex list-none flex-col gap-3 p-0 text-xs">
          <li className="flex items-center justify-between gap-3">
            <span>Verify identity and mobile</span>
            <span className="text-[#ffda45]">Now</span>
          </li>
          <li className="text-[#aebbd0]">Upload TESDA or trade credentials</li>
          <li className="text-[#aebbd0]">Review vehicle and service capability</li>
        </ol>
      </section>
    </div>
  );
}