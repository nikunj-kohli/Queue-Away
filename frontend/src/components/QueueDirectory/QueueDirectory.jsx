import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { useEffect, useState } from 'react';
import './QueueDirectory.css';

export default function QueueDirectory() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'shops'));
        const shopsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setShops(shopsData);
      } catch (error) {
        console.error("Error fetching shops:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  if (loading) return <div className="loading">Loading shops...</div>;

  return (
    <div className="queue-directory">
      <h1>Available Shops</h1>
      <div className="shops-grid">
        {shops.map(shop => (
          <div key={shop.id} className="shop-card">
            <h2>{shop.name}</h2>
            <p className="location">{shop.location}</p>
            <p className="description">{shop.description}</p>
            <Link 
              to={`/shops/${shop.slug}/book`}
              className="book-button"
              state={{ shopData: shop }} // Pass shop data for instant loading
            >
              Book Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}