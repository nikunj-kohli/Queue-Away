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


import Queue3DHorizontalBackground from './components/Queue3DHorizontalBackground';

function App() {
  return (
    <div className="bg-black min-h-screen w-full">
      <Queue3DHorizontalBackground />
      <Router>
        <MyNavbar />
        <Routes>
          <Route path="/" element={<SearchBarSection />} />
          <Route path="/home" element={<SearchBarSection />} />
          <Route path="/queue-directory" element={<QueueDirectory />} />
          <Route path="/queue-directory/:shopId/book" element={<ShopDetails />} />
          <Route path="/myqueues" element={<MyQueues />} />
          <Route path="/business-login" element={<BusinessLogin />} />
          <Route path="/about" element={<About />} />
          <Route path="/help" element={<Help />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;