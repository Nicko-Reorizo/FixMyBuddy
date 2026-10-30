import { Navigate, Route, Routes } from 'react-router-dom';

import { MechanicLayout } from '../mechanic/layout/MechanicLayout';
import { Welcome } from '../mechanic/pages/Welcome';
import { SignIn } from '../mechanic/pages/SignIn';
import { Availability } from '../mechanic/pages/Availability';
import { Jobs } from '../mechanic/pages/Jobs';
import { JobOffer } from '../mechanic/pages/JobOffer';
import { JobTravel } from '../mechanic/pages/JobTravel';
import { VerifyArrival } from '../mechanic/pages/VerifyArrival';
import { Diagnosis } from '../mechanic/pages/Diagnosis';
import { Quote } from '../mechanic/pages/Quote';
import { RepairProgress } from '../mechanic/pages/RepairProgress';
import { TowingHandover } from '../mechanic/pages/TowingHandover';
import { JobComplete } from '../mechanic/pages/JobComplete';
import { Earnings } from '../mechanic/pages/Earnings';
import { Updates } from '../mechanic/pages/Updates';
import { Account } from '../mechanic/pages/Account';
import { NotFound } from '../pages/NotFound';

export function MechanicRoutes() {
  return (
    <Routes>
      <Route index element={<Welcome />} />
      <Route path="sign-in" element={<SignIn />} />

      <Route element={<MechanicLayout />}>
        <Route path="availability" element={<Availability />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="jobs/:jobId" element={<JobOffer />} />
        <Route path="jobs/:jobId/travel" element={<JobTravel />} />
        <Route path="jobs/:jobId/arrival" element={<VerifyArrival />} />
        <Route path="jobs/:jobId/diagnosis" element={<Diagnosis />} />
        <Route path="jobs/:jobId/quote" element={<Quote />} />
        <Route path="jobs/:jobId/progress" element={<RepairProgress />} />
        <Route path="jobs/:jobId/handover" element={<TowingHandover />} />
        <Route path="jobs/:jobId/complete" element={<JobComplete />} />
        <Route path="earnings" element={<Earnings />} />
        <Route path="updates" element={<Updates />} />
        <Route path="account" element={<Account />} />
        <Route index element={<Navigate to="jobs" replace />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}