import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MapPin, Filter, Clock, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { api } from '../lib/api';
import Navigation from './Navigation';

const QueueDirectory = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [
    'All',
    'Salon & Spa',
    'Medical Clinic',
    'Dental Clinic',
    'Restaurant',
    'Barber Shop',
    'Beauty Parlour',
    'Bank',
    'Other'
  ];

  useEffect(() => {
    fetchBusinesses();
  }, [searchQuery, location, selectedCategory]);

  const fetchBusinesses = async () => {
    try {
      setLoading(true);
      const params = {};
      
      if (searchQuery) params.search = searchQuery;
      if (location) params.location = location;
      if (selectedCategory && selectedCategory !== 'All') params.category = selectedCategory;

      const data = await api.getBusinesses(params);
      setBusinesses(data);
    } catch (error) {
      console.error('Failed to fetch businesses:', error);
      setBusinesses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBusinesses();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-foreground mb-4">Find Businesses</h1>
          <p className="text-xl text-muted-foreground">
            Discover and join queues at your favorite places
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSearch}
          className="max-w-4xl mx-auto mb-8"
        >
          <Card className="p-4 bg-card/80 backdrop-blur-xl border-border/50">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for businesses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary text-foreground"
                />
              </div>
              
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full md:w-48 pl-10 pr-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary text-foreground"
                />
              </div>
              
              <Button type="submit" className="px-8 py-3 btn-hover">
                Search
              </Button>
            </div>
          </Card>
        </motion.form>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category || (category === 'All' && !selectedCategory) ? "default" : "outline"}
                onClick={() => setSelectedCategory(category === 'All' ? '' : category)}
                className="btn-hover"
              >
                {category}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-pulse text-muted-foreground">Loading businesses...</div>
            </div>
          ) : businesses.length === 0 ? (
            <Card className="p-12 text-center bg-card/50 backdrop-blur-xl border-border/50">
              <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No businesses found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or browse all categories
              </p>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {businesses.map((business) => (
                <motion.div
                  key={business._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card 
                    className="p-6 cursor-pointer card-hover bg-card/50 backdrop-blur-xl border-border/50"
                    onClick={() => navigate(`/business/${business._id}`)}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg text-foreground mb-1">
                          {business.businessName}
                        </h3>
                        <p className="text-sm text-primary font-medium">
                          {business.businessType}
                        </p>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Star className="w-4 h-4 mr-1 fill-current text-yellow-500" />
                        4.5
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="truncate">{business.address}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-green-600">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>Available now</span>
                      </div>
                      <Button size="sm" className="btn-hover">
                        View Details
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

export default QueueDirectory;