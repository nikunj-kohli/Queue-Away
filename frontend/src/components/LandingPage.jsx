
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Logo and Title */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Queue Away
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Skip the wait, join the queue digitally. Perfect for salons, clinics, restaurants and more.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/20">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⏰</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Save Time</h3>
            <p className="text-gray-600">No more standing in long queues</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/20">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📱</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Live Updates</h3>
            <p className="text-gray-600">Real-time queue status tracking</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/20">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Easy Booking</h3>
            <p className="text-gray-600">Simple appointment management</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg"
              onClick={() => navigate('/signup')}
            >
              Get Started - Sign Up
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-2xl text-lg font-semibold"
              onClick={() => navigate('/signin')}
            >
              Already have account? Sign In
            </Button>
          </div>
          
          <div className="mt-8">
            <p className="text-gray-500 mb-4">Are you a business owner?</p>
            <Button 
              variant="ghost"
              className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 font-semibold"
              onClick={() => navigate('/business')}
            >
              Business Portal →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
