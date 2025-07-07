import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function BusinessPrivateRoute({ children }) {
  const { currentUser } = useAuth();
  // Add your business user check logic here
  const isBusinessUser = currentUser?.email?.endsWith('@business.com');
  return isBusinessUser ? children : <Navigate to="/unauthorized" replace />;
}