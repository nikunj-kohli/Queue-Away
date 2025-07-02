import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Clock, Users, Star, Phone, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { api } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';
import Navigation from './Navigation';

const BusinessDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [business, setBusiness] = useState(null);
  const [queueStatus, setQueueStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    fetchBusinessDetails();
  }, [id]);

  const fetchBusinessDetails = async () => {
    try {
      const [businessData, queueData] = await Promise.all([
        api.getBusiness(id),
        api.getBusinessQueue(id)
      ]);
      
      setBusiness(businessData);
      setQueueStatus(queueData);
    } catch (error) {
      console.error('Failed to fetch business details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinQueue = async () => {
    if (!user) {
      navigate('/signin');
      return;
    }

    try {
      setJoining(true);
      await api.joinQueue(id, 'general', '');
      navigate('/my-queues');
    } catch (error) {
      console.error('Failed to join queue:', error);
      alert(error.message || 'Failed to join queue');
    } finally {
      setJoining(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center pt-32">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 pt-32 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Business not found</h1>
          <Button onClick={() => navigate('/directory')}>
            Back to Directory
          </Button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'text-green-600 bg-green-100';
      case 'moderate': return 'text-yellow-600 bg-yellow-100';
      case 'busy': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/directory')}
          className="flex items-center text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Directory
        </motion.button>

        {/* Business Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="p-8 bg-card/80 backdrop-blur-xl border-border/50">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {business.businessName}
                </h1>
                <p className="text-lg text-primary font-medium mb-2">
                  {business.businessType}
                </p>
                <div className="flex items-center text-muted-foreground mb-2">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{business.address}</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 mr-1 fill-current text-yellow-500" />
                  <span className="text-foreground font-medium">4.5</span>
                  <span className="text-muted-foreground ml-1">(124 reviews)</span>
                </div>
              </div>
              
              <div className="text-right">
                {queueStatus && (
                  <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(queueStatus.status)}`}>
                    {queueStatus.status === 'available' && 'Available Now'}
                    {queueStatus.status === 'moderate' && 'Moderate Wait'}
                    {queueStatus.status === 'busy' && 'Busy'}
                  </div>
                )}
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Queue Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="p-6 bg-card/80 backdrop-blur-xl border-border/50 mb-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Queue Status</h2>
              
              {queueStatus && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        {queueStatus.currentQueueLength}
                      </p>
                      <p className="text-sm text-muted-foreground">People in queue</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        {queueStatus.estimatedWaitTime} min
                      </p>
                      <p className="text-sm text-muted-foreground">Estimated wait</p>
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* Business Information */}
            <Card className="p-6 bg-card/80 backdrop-blur-xl border-border/50">
              <h2 className="text-xl font-semibold text-foreground mb-4">About</h2>
              <p className="text-muted-foreground mb-4">
                Welcome to {business.businessName}! We provide excellent {business.businessType.toLowerCase()} services 
                with a focus on customer satisfaction and quality.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-muted-foreground mr-3" />
                  <span className="text-foreground">Open: 9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-muted-foreground mr-3" />
                  <span className="text-foreground">{business.phone || '+91 98765 43210'}</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Join Queue Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 bg-card/80 backdrop-blur-xl border-border/50 sticky top-24">
              <h3 className="text-lg font-semibold text-foreground mb-4">Join Queue</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Current position:</span>
                  <span className="font-medium text-foreground">
                    {queueStatus ? queueStatus.currentQueueLength + 1 : 1}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated wait:</span>
                  <span className="font-medium text-foreground">
                    {queueStatus ? queueStatus.estimatedWaitTime + 15 : 15} min
                  </span>
                </div>
              </div>
              
              <Button
                onClick={handleJoinQueue}
                disabled={joining}
                className="w-full py-3 btn-hover"
              >
                {joining ? 'Joining...' : 'Join Queue'}
              </Button>
              
              <p className="text-xs text-muted-foreground mt-3 text-center">
                You'll receive notifications when it's almost your turn
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetail;