
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card } from './ui/card';

function LandingPage() {
  const navigate = useNavigate();
  const [nearbyShops, setNearbyShops] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          // Fetch nearby shops based on location
          fetchNearbyShops(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.log('Location access denied');
          // Load default shops
          fetchNearbyShops(28.6139, 77.2090); // Default to Delhi
        }
      );
    }
  }, []);

  const fetchNearbyShops = async (lat, lng) => {
    try {
      const response = await fetch(`/api/shops/nearby?lat=${lat}&lng=${lng}`);
      const data = await response.json();
      setNearbyShops(data.slice(0, 6)); // Show only 6 shops
    } catch (error) {
      // Mock data for demonstration
      setNearbyShops([
        { _id: '1', name: 'City Hospital', category: 'Healthcare', waitTime: '15 min', rating: 4.5 },
        { _id: '2', name: 'Tech Solutions', category: 'Services', waitTime: '8 min', rating: 4.2 },
        { _id: '3', name: 'Food Corner', category: 'Restaurant', waitTime: '22 min', rating: 4.7 },
        { _id: '4', name: 'Bank Branch', category: 'Banking', waitTime: '12 min', rating: 4.1 },
        { _id: '5', name: 'Salon & Spa', category: 'Beauty', waitTime: '30 min', rating: 4.6 },
        { _id: '6', name: 'Auto Service', category: 'Automotive', waitTime: '45 min', rating: 4.3 }
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img src="/src/assets/projectlogo.png" alt="QueueAway" className="h-8 w-8 mr-3" />
              <span className="text-xl font-bold text-gray-900">QueueAway</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/signin')}>
                Sign In
              </Button>
              <Button onClick={() => navigate('/signup')}>
                Get Started
              </Button>
              <Button variant="outline" onClick={() => navigate('/business-portal')}>
                For Business
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Skip the Wait,<br />
              <span className="text-blue-600">Live Your Life</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              QueueAway revolutionizes how you interact with businesses. Join virtual queues, 
              track wait times in real-time, and never waste time standing in line again.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="px-8 py-4 text-lg bg-blue-600 hover:bg-blue-700"
                onClick={() => navigate('/signup')}
              >
                Start Queuing Smart
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-4 text-lg"
                onClick={() => navigate('/business-portal')}
              >
                Join as Business
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How QueueAway Works</h2>
            <p className="text-xl text-gray-600">Simple, efficient, and time-saving</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">📍</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Find & Join</h3>
              <p className="text-gray-600">
                Discover businesses near you and join their virtual queues instantly. 
                No more physical waiting in crowded spaces.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">⏱️</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Track Real-time</h3>
              <p className="text-gray-600">
                Get live updates on your queue position and estimated wait time. 
                Plan your schedule accordingly.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Arrive on Time</h3>
              <p className="text-gray-600">
                Receive notifications when it's almost your turn. 
                Arrive just in time and get served immediately.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Nearby Shops Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Near You</h2>
            <p className="text-xl text-gray-600">Join queues at these trending businesses</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nearbyShops.map((shop) => (
              <Card key={shop._id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{shop.name}</h3>
                    <p className="text-gray-600">{shop.category}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-green-600">
                      ⭐ {shop.rating}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Wait time</span>
                  <span className="font-medium text-blue-600">{shop.waitTime}</span>
                </div>
                <Button 
                  className="w-full mt-4" 
                  variant="outline"
                  onClick={() => navigate('/signup')}
                >
                  Join Queue
                </Button>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/signup')}
            >
              View All Businesses
            </Button>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-blue-200">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-200">Partner Businesses</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">2.5hrs</div>
              <div className="text-blue-200">Average Time Saved</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-blue-200">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <img src="/src/assets/projectlogo.png" alt="QueueAway" className="h-8 w-8 mr-3" />
                <span className="text-xl font-bold">QueueAway</span>
              </div>
              <p className="text-gray-400">
                Making waiting a thing of the past. Join the future of queue management.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">For Business</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Status</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 QueueAway. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
