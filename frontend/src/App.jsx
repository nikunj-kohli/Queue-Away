import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import MainLayout from './layouts/MainLayout';
import PrivateRoute from './components/Auth/PrivateRoute';
import BusinessPrivateRoute from './components/Auth/BusinessPrivateRoute';

// Auth Components
import Login from './components/Auth/Login';
import CustomerSignup from './components/Auth/CustomerSignup';
import BusinessSignup from './components/Auth/BusinessSignup';

// Core Pages
import Home from './components/Home';
import QueueDirectory from './components/QueueDirectory';
import ShopDetails from './components/ShopDetails';
import MyQueues from './components/MyQueues';
import About from './components/About';
import Help from './components/Help';

// Dashboard Pages
import CustomerDashboard from './components/Dashboard/CustomerDashboard';
import BusinessDashboard from './components/Dashboard/BusinessDashboard';

// User Pages
import Profile from './components/Profile';
import Settings from './components/Settings';
import ChatUI from './components/Chat/ChatUI';

// Error Pages
import NotFound from './components/Errors/NotFound';
import Unauthorized from './components/Errors/Unauthorized';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes with MainLayout */}
          <Route path="/" element={<MainLayout><Home /></MainLayout>} />
          <Route path="/queue-directory" element={<MainLayout><QueueDirectory /></MainLayout>} />
          <Route path="/queue-directory/:shopId" element={<MainLayout><ShopDetails /></MainLayout>} />
          <Route path="/about" element={<MainLayout><About /></MainLayout>} />
          <Route path="/help" element={<MainLayout><Help /></MainLayout>} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
          <Route path="/customer-signup" element={<MainLayout><CustomerSignup /></MainLayout>} />
          <Route path="/business-signup" element={<MainLayout><BusinessSignup /></MainLayout>} />

          {/* Protected Customer Routes */}
          <Route path="/customer-dashboard" element={
            <PrivateRoute>
              <MainLayout><CustomerDashboard /></MainLayout>
            </PrivateRoute>
          } />
          <Route path="/myqueues" element={
            <PrivateRoute>
              <MainLayout><MyQueues /></MainLayout>
            </PrivateRoute>
          } />

          {/* Protected Business Routes */}
          <Route path="/business-dashboard" element={
            <BusinessPrivateRoute>
              <MainLayout><BusinessDashboard /></MainLayout>
            </BusinessPrivateRoute>
          } />
          <Route path="/chat/:businessId" element={
            <BusinessPrivateRoute>
              <MainLayout><ChatUI /></MainLayout>
            </BusinessPrivateRoute>
          } />

          {/* User Account Routes */}
          <Route path="/profile" element={
            <PrivateRoute>
              <MainLayout><Profile /></MainLayout>
            </PrivateRoute>
          } />
          <Route path="/settings" element={
            <PrivateRoute>
              <MainLayout><Settings /></MainLayout>
            </PrivateRoute>
          } />

          {/* Error Handling */}
          <Route path="/unauthorized" element={<MainLayout><Unauthorized /></MainLayout>} />
          <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}