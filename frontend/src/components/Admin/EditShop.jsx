import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { createOrUpdateShop } from '../../utils/shopHelpers';
import './EditShop.css';

export default function EditShop() {
  const { shopId } = useParams();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchShop = async () => {
      const docRef = doc(db, 'shops', shopId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setFormData(docSnap.data());
      }
      setLoading(false);
    };
    
    fetchShop();
  }, [shopId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const slug = await createOrUpdateShop({
        ...formData,
        id: shopId
      });
      setSuccess(`Shop updated! New URL: /shops/${slug}/book`);
    } catch (error) {
      console.error('Error updating shop:', error);
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

  if (loading) return <div>Loading shop data...</div>;
  if (!formData) return <div>Shop not found</div>;

  return (
    <div className="edit-shop-container">
      <h2>Edit Shop: {formData.name}</h2>
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
          {loading ? 'Updating...' : 'Update Shop'}
        </button>
        
        {success && <div className="success-message">{success}</div>}
      </form>
    </div>
  );
}