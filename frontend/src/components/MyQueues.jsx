import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, MapPin, Users, X, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { api } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';
import Navigation from './Navigation';

const MyQueues = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [queues, setQueues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/signin');
      return;
    }
    fetchQueues();
  }, [user, navigate]);

  const fetchQueues = async () => {
    try {
      const data = await api.getMyQueues();
      setQueues(data);
    } catch (error) {
      console.error('Failed to fetch queues:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchQueues();
  };

  const handleLeaveQueue = async (queueId) => {
    if (!confirm('Are you sure you want to leave this queue?')) return;

    try {
      await api.leaveQueue(queueId);
      setQueues(queues.filter(q => q._id !== queueId));
    } catch (error) {
      console.error('Failed to leave queue:', error);
      alert('Failed to leave queue');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'waiting': return 'bg-yellow-100 text-yellow-800';
      case 'called': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center pt-32">
          <div className="animate-pulse text-muted-foreground">Loading your queues...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">My Queues</h1>
            <p className="text-muted-foreground">
              Track your current queue positions and wait times
            </p>
          </div>
          
          <Button
            onClick={handleRefresh}
            disabled={refreshing}
            variant="outline"
            className="btn-hover"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </motion.div>

        {/* Queues List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {queues.length === 0 ? (
            <Card className="p-12 text-center bg-card/50 backdrop-blur-xl border-border/50">
              <Clock className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No active queues</h3>
              <p className="text-muted-foreground mb-6">
                You're not currently in any queues. Find a business to join their queue.
              </p>
              <Button onClick={() => navigate('/directory')} className="btn-hover">
                Find Businesses
              </Button>
            </Card>
          ) : (
            <div className="space-y-6">
              {queues.map((queue, index) => (
                <motion.div
                  key={queue._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 card-hover bg-card/50 backdrop-blur-xl border-border/50">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-xl font-semibold text-foreground">
                            {queue.businessId.businessName}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(queue.status)}`}>
                            {queue.status === 'waiting' ? 'In Queue' : 
                             queue.status === 'called' ? 'Your Turn!' : queue.status}
                          </span>
                        </div>
                        
                        <p className="text-sm text-primary font-medium mb-2">
                          {queue.businessId.businessType}
                        </p>
                        
                        <div className="flex items-center text-sm text-muted-foreground mb-4">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{queue.businessId.address}</span>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="flex items-center space-x-2">
                            <Users className="w-5 h-5 text-primary" />
                            <div>
                              <p className="text-lg font-bold text-foreground">#{queue.position}</p>
                              <p className="text-xs text-muted-foreground">Position</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Clock className="w-5 h-5 text-primary" />
                            <div>
                              <p className="text-lg font-bold text-foreground">
                                ~{queue.estimatedWaitTime} min
                              </p>
                              <p className="text-xs text-muted-foreground">Est. wait</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-foreground">
                                {new Date(queue.createdAt).toLocaleTimeString()}
                              </p>
                              <p className="text-xs text-muted-foreground">Joined at</p>
                            </div>
                          </div>
                        </div>
                        
                        {queue.status === 'called' && (
                          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-xl">
                            <p className="text-green-800 font-medium text-sm">
                              🎉 It's your turn! Please proceed to the business.
                            </p>
                          </div>
                        )}
                      </div>
                      
                      <Button
                        onClick={() => handleLeaveQueue(queue._id)}
                        variant="ghost"
                        size="sm"
                        className="ml-4 text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MyQueues;