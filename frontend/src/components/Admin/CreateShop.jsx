import { useState } from 'react';
import { createOrUpdateShop } from '../../utils/shopHelpers';
import './CreateShop.css';

export default function CreateShop() {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    imageUrl: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const slug = await createOrUpdateShop(formData);
      setSuccess(`Shop created! URL: /shops/${slug}/book`);
      setFormData({
        name: '',
        location: '',
        description: '',
        imageUrl: ''
      });
    } catch (error) {
      console.error('Error creating shop:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="create-shop-container">
      <h2>Create New Shop</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Shop Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label>Image URL</label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Shop'}
        </button>
        
        {success && <div className="success-message">{success}</div>}
      </form>
    </div>
  );
}