import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Calendar, Settings, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || ''
  });

  const handleSave = () => {
    // TODO: Implement profile update API call
    setEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-gradient-to-r from-primary to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              {user?.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <span className="text-3xl text-white font-bold">
                  {user?.name?.charAt(0)?.toUpperCase()}
                </span>
              )}
            </div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-background"></div>
          </div>
          <h1 className="text-2xl font-bold text-foreground">{user?.name}</h1>
          <p className="text-muted-foreground">{user?.email}</p>
        </motion.div>

        {/* Profile Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          <Card className="p-6 bg-card/80 backdrop-blur-xl border-border/50">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-foreground">Personal Information</h2>
              <Button
                onClick={() => editing ? handleSave() : setEditing(true)}
                variant="outline"
                className="btn-hover"
              >
                {editing ? 'Save' : 'Edit'}
              </Button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-muted-foreground" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-foreground mb-1">Name</label>
                  {editing ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                    />
                  ) : (
                    <p className="text-foreground">{user?.name}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-foreground mb-1">Email</label>
                  <p className="text-foreground">{user?.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-muted-foreground" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-foreground mb-1">Phone</label>
                  {editing ? (
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                      placeholder="Enter phone number"
                    />
                  ) : (
                    <p className="text-foreground">{user?.phone || 'Not provided'}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-muted-foreground" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-foreground mb-1">Member since</label>
                  <p className="text-foreground">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6 bg-card/80 backdrop-blur-xl border-border/50">
            <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start btn-hover"
                onClick={() => navigate('/my-queues')}
              >
                <User className="w-4 h-4 mr-3" />
                View My Queues
              </Button>
              
              <Button
                variant="outline"
                className="w-full justify-start btn-hover"
                onClick={() => navigate('/messages')}
              >
                <Mail className="w-4 h-4 mr-3" />
                Messages
              </Button>
              
              <Button
                variant="outline"
                className="w-full justify-start btn-hover"
              >
                <Settings className="w-4 h-4 mr-3" />
                Settings
              </Button>
            </div>
          </Card>

          {/* Logout */}
          <Card className="p-6 bg-card/80 backdrop-blur-xl border-border/50">
            <Button
              onClick={handleLogout}
              variant="destructive"
              className="w-full btn-hover"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Sign Out
            </Button>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;