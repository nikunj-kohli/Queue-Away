import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import { AuthProvider } from './contexts/AuthContext';
import LandingPage from './components/LandingPage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import QueueDirectory from './components/QueueDirectory';
import BusinessDetail from './components/BusinessDetail';
import MyQueues from './components/MyQueues';
import Profile from './components/Profile';
import Messages from './components/Messages';
import InteractiveBackground from './components/InteractiveBackground';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-background text-foreground">
            <InteractiveBackground />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/directory" element={<QueueDirectory />} />
              <Route path="/business/:id" element={<BusinessDetail />} />
              <Route path="/my-queues" element={<MyQueues />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/messages" element={<Messages />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;