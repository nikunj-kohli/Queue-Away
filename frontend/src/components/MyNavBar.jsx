import React, { useState } from "react";
import { AiFillHome, AiOutlineInfoCircle } from "react-icons/ai";
import { MdOutlineListAlt, MdHelpOutline } from "react-icons/md";
import { FaListUl } from "react-icons/fa";
import logo from "../assets/projectlogo.png";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";

// Avatar for nav items
const NavAvatar = ({ active, label, onClick, icon, color }) => (
  <button
    className={`flex flex-col items-center mx-4 focus:outline-none group transition-transform duration-300 ${active ? 'scale-110 z-10' : 'opacity-80'} `}
    onClick={onClick}
    aria-label={label}
    style={{ background: 'none', border: 'none', minWidth: 80 }}
  >
    <span
      className={`rounded-full border-2 ${active ? 'border-indigo-500' : 'border-transparent'} shadow-md bg-white p-2 transition-all duration-300`}
      style={{ boxShadow: active ? '0 4px 20px rgba(99,102,241,0.15)' : undefined }}
    >
      {icon ? (
        <span style={{ color, fontSize: 40 }}>{icon}</span>
      ) : null}
    </span>
    <span className="mt-3 text-base font-semibold text-gray-100 dark:text-gray-200">
      {label}
    </span>
  </button>
);

function MyNavbar() {
  const initialNavItems = [
    { label: 'Home', path: '/home', color: '#4F46E5', icon: <AiFillHome /> },
    { label: 'Queue Directory', path: '/queue-directory', color: '#F59E42', icon: <MdOutlineListAlt /> },
    { label: 'My Queues', path: '/myqueues', color: '#10B981', icon: <FaListUl /> },
    { label: 'Help', path: '/help', color: '#FBBF24', icon: <MdHelpOutline /> },
    { label: 'About', path: '/about', color: '#EF4444', icon: <AiOutlineInfoCircle /> },
  ];
  const [navItems, setNavItems] = useState(initialNavItems);
  const [activeIdx, setActiveIdx] = useState(0);
  const navigate = useNavigate();

  // Rotate queue so clicked item is first, others follow in order
  const handleNavClick = (idx, path) => {
    setNavItems((prev) => {
      // Rotate array so clicked index is first
      return [...prev.slice(idx), ...prev.slice(0, idx)];
    });
    setActiveIdx(0);
    navigate(path);
  };




  return (
    <nav className="fixed top-0 left-0 w-full z-40 flex flex-col items-center pt-6 pb-4 bg-black/80 backdrop-blur-md shadow-lg min-h-[110px]">
      {/* Top row: logo (center), business login (right) */}
      <div className="w-full flex flex-row items-center justify-between mb-4 px-6">
        <div className="flex flex-row items-center justify-center mx-auto">
          <img src={logo} alt="Logo" className="w-10 h-10 rounded-full mr-3" />
          <span className="font-bold text-2xl tracking-tight text-white drop-shadow-lg">Queue Away</span>
        </div>
        <div className="ml-auto">
          <Button
            variant="outline"
            className="border-white hover:bg-white/10 business-login-btn"
            onClick={() => navigate('/business-login')}
          >
            Business Login
          </Button>
        </div>
      </div>
      {/* Queue nav avatars with animation */}
      <div className="flex flex-row items-center justify-center gap-8 relative">
        <AnimatePresence initial={false}>
          {navItems.map((item, idx) => (
            <motion.div
              key={item.label}
              layout
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: -20 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
              <NavAvatar
                active={idx === 0}
                label={item.label}
                icon={item.icon}
                color={item.color}
                onClick={() => handleNavClick(idx, item.path)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </nav>
  );
}

export default MyNavbar;