import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import BusinessPortal from './components/BusinessPortal';
import QueueDirectory from './components/QueueDirectory';
import MyQueues from './components/MyQueues';
import Profile from './components/Profile';
import Settings from './components/Settings';
import PaymentHistory from './components/PaymentHistory';
import Messages from './components/Messages';
import MyNavBar from './components/MyNavBar';
import Help from './components/Help';
import About from './components/About';

// Home component
function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <MyNavBar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to QueueAway</h1>
          <p className="text-xl text-gray-600">Manage your queues efficiently</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-3">Find Queues</h3>
            <p className="text-gray-600 mb-4">Discover and join queues near you</p>
            <button 
              onClick={() => window.location.href = '/queue-directory'}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Browse Directory
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-3">My Queues</h3>
            <p className="text-gray-600 mb-4">View and manage your current queues</p>
            <button 
              onClick={() => window.location.href = '/myqueues'}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              View My Queues
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-3">Messages</h3>
            <p className="text-gray-600 mb-4">Check your notifications and messages</p>
            <button 
              onClick={() => window.location.href = '/messages'}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              View Messages
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/business-portal" element={<BusinessPortal />} />
        <Route path="/queue-directory" element={<QueueDirectory />} />
        <Route path="/myqueues" element={<MyQueues />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/payment-history" element={<PaymentHistory />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/help" element={<Help />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;