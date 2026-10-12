import { Outlet } from 'react-router-dom';

export function MainLayout() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto min-h-screen w-full max-w-6xl bg-[#151a30] shadow-2xl shadow-black/30 lg:my-8 lg:min-h-[calc(100vh-4rem)] lg:rounded-[2rem] lg:border lg:border-white/10">
        <Outlet />
      </div>
    </main>
  );
}

