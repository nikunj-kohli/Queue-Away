import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export default function LegacyShopRedirect() {
  const { shopId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const redirectToNewUrl = async () => {
      try {
        const shopRef = doc(db, 'shops', shopId);
        const shopSnap = await getDoc(shopRef);
        
        if (shopSnap.exists()) {
          const { slug } = shopSnap.data();
          navigate(`/shops/${slug}/book`, { replace: true });
        } else {
          navigate('/shops', { replace: true });
        }
      } catch (error) {
        console.error("Redirect error:", error);
        navigate('/error', { state: { error }, replace: true });
      }
    };

    redirectToNewUrl();
  }, [shopId, navigate]);

  return (
    <div className="redirect-message">
      <p>Updating shop link...</p>
    </div>
  );
}