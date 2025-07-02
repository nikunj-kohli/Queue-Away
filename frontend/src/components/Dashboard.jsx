import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, MapPin, Users, Plus, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../lib/api';
import Navigation from './Navigation';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [myQueues, setMyQueues] = useState([]);
  const [nearbyBusinesses, setNearbyBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/signin');
      return;
    }
    fetchDashboardData();
  }, [user, navigate]);

  const fetchDashboardData = async () => {
    try {
      // Fetch user's queues
      const queuesData = await api.getMyQueues();
      setMyQueues(queuesData);

      // Fetch nearby businesses
      const businessData = await api.getBusinesses();
      setNearbyBusinesses(businessData.slice(0, 6));
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-muted-foreground">
            Manage your queues and discover new businesses
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-3 gap-4 mb-8"
        >
          <Button
            onClick={() => navigate('/directory')}
            className="h-16 justify-start space-x-3 btn-hover"
            variant="outline"
          >
            <Search className="w-5 h-5" />
            <span>Find Businesses</span>
          </Button>
          
          <Button
            onClick={() => navigate('/my-queues')}
            className="h-16 justify-start space-x-3 btn-hover"
            variant="outline"
          >
            <Clock className="w-5 h-5" />
            <span>My Queues ({myQueues.length})</span>
          </Button>
          
          <Button
            onClick={() => navigate('/messages')}
            className="h-16 justify-start space-x-3 btn-hover"
            variant="outline"
          >
            <Users className="w-5 h-5" />
            <span>Messages</span>
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Current Queues */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <h2 className="text-xl font-semibold text-foreground mb-4">Current Queues</h2>
            
            {myQueues.length === 0 ? (
              <Card className="p-8 text-center bg-card/50 backdrop-blur-xl border-border/50">
                <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No active queues</h3>
                <p className="text-muted-foreground mb-4">
                  Join a queue at your favorite business to get started
                </p>
                <Button onClick={() => navigate('/directory')} className="btn-hover">
                  <Plus className="w-4 h-4 mr-2" />
                  Find Businesses
                </Button>
              </Card>
            ) : (
              <div className="space-y-4">
                {myQueues.map((queue) => (
                  <Card key={queue._id} className="p-6 card-hover bg-card/50 backdrop-blur-xl border-border/50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          {queue.businessId.businessName}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {queue.businessId.address}
                        </p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="flex items-center text-primary">
                            <Users className="w-4 h-4 mr-1" />
                            Position {queue.position}
                          </span>
                          <span className="flex items-center text-muted-foreground">
                            <Clock className="w-4 h-4 mr-1" />
                            ~{queue.estimatedWaitTime} min
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          queue.status === 'waiting' ? 'bg-yellow-100 text-yellow-800' :
                          queue.status === 'called' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {queue.status}
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </motion.div>

          {/* Nearby Businesses */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl font-semibold text-foreground mb-4">Nearby Businesses</h2>
            
            <div className="space-y-4">
              {nearbyBusinesses.map((business) => (
                <Card 
                  key={business._id} 
                  className="p-4 cursor-pointer card-hover bg-card/50 backdrop-blur-xl border-border/50"
                  onClick={() => navigate(`/business/${business._id}`)}
                >
                  <h3 className="font-medium text-foreground mb-1">
                    {business.businessName}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {business.businessType}
                  </p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span className="truncate">{business.address}</span>
                  </div>
                </Card>
              ))}
              
              <Button
                variant="outline"
                className="w-full btn-hover"
                onClick={() => navigate('/directory')}
              >
                View All Businesses
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;