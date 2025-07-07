import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import MainLayout from './layouts/MainLayout';
import PrivateRoute from './components/Auth/PrivateRoute';
import BusinessPrivateRoute from './components/Auth/BusinessPrivateRoute';

// Core Pages
import Home from './components/SearchBarSection';
import QueueDirectory from './components/QueueDirectory/QueueDirectory'; // Updated path
import ShopDetails from './components/ShopDetails/ShopDetails'; // Updated path
import MyQueues from './components/MyQueues';
import About from './components/About';
import Help from './components/Help';

// Auth Components
import Login from './components/Auth/Login';
import CustomerSignup from './components/Auth/CustomerSignup';
import BusinessSignup from './components/Auth/BusinessSignup';

// Dashboard Components
import CustomerDashboard from './components/Dashboard/CustomerDashboard';
import BusinessDashboard from './components/Dashboard/BusinessDashboard';

// User Components
import Profile from './components/Profile';
import Settings from './components/Settings';
import ChatUI from './components/Chat/ChatUI';

// New Components
import LegacyShopRedirect from './components/ShopDetails/LegacyShopRedirect';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<MainLayout><Home /></MainLayout>} />
          <Route path="/shops" element={<MainLayout><QueueDirectory /></MainLayout>} />
          <Route path="/shops/:shopSlug/book" element={<MainLayout><ShopDetails /></MainLayout>} />
          <Route path="/queue-directory/:shopId/book" element={<LegacyShopRedirect />} />
          <Route path="/about" element={<MainLayout><About /></MainLayout>} />
          <Route path="/help" element={<MainLayout><Help /></MainLayout>} />
          
          {/* Authentication Routes */}
          <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
          <Route path="/customer-signup" element={<MainLayout><CustomerSignup /></MainLayout>} />
          <Route path="/business-signup" element={<MainLayout><BusinessSignup /></MainLayout>} />

          {/* Protected Customer Routes */}
          <Route path="/myqueues" element={
            <PrivateRoute>
              <MainLayout><MyQueues /></MainLayout>
            </PrivateRoute>
          } />
          <Route path="/customer-dashboard" element={
            <PrivateRoute>
              <MainLayout><CustomerDashboard /></MainLayout>
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
        </Routes>
      </AuthProvider>
    </Router>
  );
}