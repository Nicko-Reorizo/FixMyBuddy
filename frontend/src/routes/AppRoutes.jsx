import { Navigate, Route, Routes } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { AppHome } from '../pages/AppHome';
import { ConfirmLocation } from '../pages/ConfirmLocation';
import { ConfirmRequest } from '../pages/ConfirmRequest';
import { History } from '../pages/History';
import { Home } from '../pages/Home';
import { NoProviders } from '../pages/NoProviders';
import { NotFound } from '../pages/NotFound';
import { Providers } from '../pages/Providers';
import { RequestAssistance } from '../pages/RequestAssistance';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="app" element={<AppHome />} />
        <Route path="request" element={<RequestAssistance />} />
        <Route path="confirm-location" element={<ConfirmLocation />} />
        <Route path="confirm-request" element={<ConfirmRequest />} />
        <Route path="providers" element={<Providers />} />
        <Route path="no-providers" element={<NoProviders />} />
        <Route path="history" element={<History />} />
        <Route path="services" element={<Navigate to="/app" replace />} />
        <Route path="login" element={<Navigate to="/" replace />} />
        <Route path="register" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

