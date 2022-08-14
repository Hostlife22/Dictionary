import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ProtectedRouteRoles, ROUTES } from '../../common';
import { useAuth } from '../../hooks/useAuth';
import { LocationParams } from '../../pages/Auth/Auth.interface';
import { ProtectedRouteProps } from './ProtectedRoute.interface';

function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { auth } = useAuth();
  const location = useLocation() as LocationParams;
  const from = location.state?.from?.pathname || ROUTES.main.url;

  if (allowedRoles === ProtectedRouteRoles.ALLOWED) {
    return auth ? <Outlet /> : <Navigate to={ROUTES.auth.url} state={{ from: location }} />;
  }

  return auth ? <Navigate to={from} state={{ from: location }} /> : <Outlet />;
}

export default ProtectedRoute;
