import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../config/auth';

const ProtectedRoute = () => {
  const { currentUser } = useAuth();
  
  return currentUser ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
