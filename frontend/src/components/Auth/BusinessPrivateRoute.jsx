import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function BusinessPrivateRoute({ children }) {
  const { currentUser } = useAuth();
  
  // Check if user is business (you can modify this logic)
  const isBusinessUser = currentUser?.email?.endsWith('@business.com');
  
  return isBusinessUser ? children : <Navigate to="/unauthorized" replace />;
}