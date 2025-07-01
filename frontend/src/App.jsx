
import React from 'react';
import QueueBackground from './components/QueueBackground';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ThreeBackground from "./components/ThreeBackground";
import MyNavbar from "./components/MyNavBar";
import SearchBarSection from "./components/SearchBarSection";
import QueueDirectory from "./components/QueueDirectory";
import ShopDetails from "./components/ShopDetails";
import MyQueues from "./components/MyQueues";
import BusinessLogin from "./components/BusinessLogin";
import About from "./components/About";
import Help from "./components/Help";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import PaymentHistory from "./components/PaymentHistory";
import Messages from "./components/Messages";
import Queue3DHorizontalBackground from './components/Queue3DHorizontalBackground';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <ThreeBackground />
        <div className="relative z-10">
          <MyNavbar />
          <Routes>
            <Route path="/" element={
              <div>
                <SearchBarSection />
                <QueueDirectory />
              </div>
            } />
            <Route path="/shop/:id" element={<ShopDetails />} />
            <Route path="/my-queues" element={<MyQueues />} />
            <Route path="/business-login" element={<BusinessLogin />} />
            <Route path="/about" element={<About />} />
            <Route path="/help" element={<Help />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/payment-history" element={<PaymentHistory />} />
            <Route path="/messages" element={<Messages />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
