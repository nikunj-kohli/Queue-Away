
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation Header */}
      <nav className="absolute top-0 w-full z-10 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">Q</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Queue Away
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className="text-gray-600 hover:text-blue-600"
              onClick={() => navigate('/signin')}
            >
              Sign In
            </Button>
            <Button 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl"
              onClick={() => navigate('/signup')}
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative flex items-center justify-center min-h-screen px-4">
        <div className="max-w-6xl mx-auto text-center pt-20">
          {/* Main Heading */}
          <div className="mb-12">
            <h1 className="text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-8 leading-tight">
              Skip The Wait
            </h1>
            <p className="text-2xl md:text-3xl text-gray-700 mb-6 font-light">
              Join digital queues for salons, clinics & restaurants
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
              Save hours of your time with our smart queue management system. 
              Book appointments, track live status, and never stand in line again.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="group">
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/30 hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">⚡</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Instant Booking</h3>
                <p className="text-gray-600 leading-relaxed">Book your spot in seconds with real-time availability</p>
              </div>
            </div>
            
            <div className="group">
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/30 hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">📍</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Live Tracking</h3>
                <p className="text-gray-600 leading-relaxed">Get real-time updates on your queue position</p>
              </div>
            </div>
            
            <div className="group">
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/30 hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">💎</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Premium Experience</h3>
                <p className="text-gray-600 leading-relaxed">iOS-quality interface with smooth interactions</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/40 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to save time?</h2>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-4 rounded-2xl text-xl font-semibold shadow-lg transform hover:scale-105 transition-all"
                onClick={() => navigate('/signup')}
              >
                Join as Customer
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-10 py-4 rounded-2xl text-xl font-semibold transform hover:scale-105 transition-all"
                onClick={() => navigate('/signin')}
              >
                Sign In
              </Button>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <p className="text-gray-600 mb-4 text-lg">Business Owner?</p>
              <Button 
                variant="ghost"
                className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 font-semibold text-lg px-6 py-3 rounded-xl"
                onClick={() => navigate('/business')}
              >
                Business Portal →
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/50 backdrop-blur-xl border-t border-white/30 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-600">© 2024 Queue Away. Making waiting a thing of the past.</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
