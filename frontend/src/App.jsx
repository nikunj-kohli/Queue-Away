
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import BusinessPortal from "./components/BusinessPortal";
import MyNavbar from "./components/MyNavBar";
import SearchBarSection from "./components/SearchBarSection";
import QueueDirectory from "./components/QueueDirectory";
import ShopDetails from "./components/ShopDetails";
import MyQueues from "./components/MyQueues";
import About from "./components/About";
import Help from "./components/Help";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import PaymentHistory from "./components/PaymentHistory";
import Messages from "./components/Messages";

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Landing and Auth Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/business" element={<BusinessPortal />} />
          
          {/* Main App Routes (with navbar) */}
          <Route path="/dashboard" element={
            <div>
              <MyNavbar />
              <div className="pt-28">
                <SearchBarSection />
                <QueueDirectory />
              </div>
            </div>
          } />
          <Route path="/shop/:id" element={
            <div>
              <MyNavbar />
              <div className="pt-28">
                <ShopDetails />
              </div>
            </div>
          } />
          <Route path="/my-queues" element={
            <div>
              <MyNavbar />
              <div className="pt-28">
                <MyQueues />
              </div>
            </div>
          } />
          <Route path="/about" element={
            <div>
              <MyNavbar />
              <div className="pt-28">
                <About />
              </div>
            </div>
          } />
          <Route path="/help" element={
            <div>
              <MyNavbar />
              <div className="pt-28">
                <Help />
              </div>
            </div>
          } />
          <Route path="/profile" element={
            <div>
              <MyNavbar />
              <div className="pt-28">
                <Profile />
              </div>
            </div>
          } />
          <Route path="/settings" element={
            <div>
              <MyNavbar />
              <div className="pt-28">
                <Settings />
              </div>
            </div>
          } />
          <Route path="/payment-history" element={
            <div>
              <MyNavbar />
              <div className="pt-28">
                <PaymentHistory />
              </div>
            </div>
          } />
          <Route path="/messages" element={
            <div>
              <MyNavbar />
              <div className="pt-28">
                <Messages />
              </div>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
