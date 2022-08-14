import { Route, Routes } from 'react-router-dom';
import { ProtectedRouteRoles, ROUTES } from './common';
import { ProtectedRoute } from './components';
import Layout from './components/Layuot/Layuot';
import {
  AboutTeam,
  AudioCall,
  Auth,
  Dictionary,
  Games,
  Home,
  Listbook,
  Settings,
  Sprint,
  Statistic,
  Textbook,
} from './pages';

function App() {
  return (
    <Routes>
      <Route path={ROUTES.main.url} element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={ROUTES.aboutTeam.url} element={<AboutTeam />} />

        <Route element={<ProtectedRoute allowedRoles={ProtectedRouteRoles.ALLOWED} />}>
          <Route path={ROUTES.statistics.url} element={<Statistic />} />
          <Route path={ROUTES.settings.url} element={<Settings />} />
          <Route path={ROUTES.dictionary.url} element={<Dictionary />} />
          <Route path={ROUTES.textbook.url} element={<Textbook />} />
          <Route path={ROUTES.textbook.pages.list.url} element={<Listbook />} />
          <Route path={ROUTES.games.url} element={<Games />} />
          <Route path={ROUTES.games.pages.sprint.url} element={<Sprint />} />
          <Route path={ROUTES.games.pages.audiocall.url} element={<AudioCall />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={ProtectedRouteRoles.NOT_ALLOWED} />}>
          <Route path={ROUTES.auth.url} element={<Auth />} />
        </Route>

        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
