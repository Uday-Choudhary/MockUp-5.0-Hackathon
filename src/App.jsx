import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Onboarding from './pages/Onboarding/Onboarding';
import Cockpit from './pages/Cockpit/Cockpit';
import CockpitNews from './pages/CockpitNews/CockpitNews';
import Paddock from './pages/Paddock/Paddock';
import RiderProfile from './pages/RiderProfile/RiderProfile';
import Store from './pages/Store/Store';
import PurpleSector from './pages/PurpleSector/PurpleSector';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/cockpit" element={<Cockpit />} />
        <Route path="/cockpit/news" element={<CockpitNews />} />
        <Route path="/paddock" element={<Paddock />} />
        <Route path="/rider/:id" element={<RiderProfile />} />
        <Route path="/store" element={<Store />} />
        <Route path="/purple-sector" element={<PurpleSector />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
