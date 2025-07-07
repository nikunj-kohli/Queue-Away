import { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import './ShopDetails.css';

export default function ShopDetails() {
  const { shopSlug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [shop, setShop] = useState(location.state?.shopData || null);
  const [loading, setLoading] = useState(!location.state?.shopData);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (shop) return;

    const fetchShop = async () => {
      try {
        // Extract ID fragment from slug (last part after last hyphen)
        const idFragment = shopSlug.split('-').pop();
        
        // Query shops collection for matching ID fragment
        const shopRef = doc(db, 'shops', idFragment);
        const docSnap = await getDoc(shopRef);
        
        if (docSnap.exists()) {
          setShop({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError('Shop not found');
          navigate('/shops', { replace: true });
        }
      } catch (err) {
        setError('Failed to load shop details');
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchShop();
  }, [shopSlug, shop, navigate]);

  if (loading) return <div className="loading">Loading shop details...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="shop-details">
      <div className="shop-header">
        <h1>{shop?.name}</h1>
        <p className="location">{shop?.location}</p>
      </div>
      
      <div className="shop-content">
        <div className="shop-image">
          <img src={shop?.imageUrl || '/default-shop.jpg'} alt={shop?.name} />
        </div>
        
        <div className="booking-form">
          {/* Your booking form implementation */}
          <h2>Book Appointment</h2>
          {/* Form fields would go here */}
        </div>
      </div>
    </div>
  );
}